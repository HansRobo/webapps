#!/usr/bin/env node
// 自動運転実証実験データ バリデーションスクリプト
// 使い方: node scripts/validate-data.mjs
// 終了コード: 0=OK（警告あり可）, 1=エラーあり

import { readFileSync } from "fs";
import { createRequire } from "module";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import vm from "vm";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DATA_PATH = resolve(ROOT, "apps/autonomous-driving-map/data.js");
const ENUMS_PATH = resolve(ROOT, "apps/autonomous-driving-map/enums.js");

function loadExperiments() {
  const src = readFileSync(DATA_PATH, "utf-8");
  // constはサンドボックスオブジェクトのプロパティにならないため、
  // グローバル変数として扱われるようvar宣言に置き換えてから実行する
  const patched = src.replace(/^\s*const\s+EXPERIMENTS\s*=/m, "var EXPERIMENTS =");
  const sandbox = { EXPERIMENTS: undefined };
  vm.runInNewContext(patched, sandbox);
  return sandbox.EXPERIMENTS;
}

const require = createRequire(import.meta.url);
function loadEnums() {
  return require(ENUMS_PATH);
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function validateExperiments(experiments, enums) {
  const errors = [];
  const warnings = [];
  const err = (id, msg) => errors.push(`[ERROR] ${id}: ${msg}`);
  const warn = (id, msg) => warnings.push(`[WARN]  ${id}: ${msg}`);

  const seenIds = new Set();
  for (const exp of experiments) {
    if (!exp.id) { err("(不明)", "idフィールドがありません"); continue; }
    if (seenIds.has(exp.id)) err(exp.id, `ID "${exp.id}" が重複しています`);
    seenIds.add(exp.id);
  }

  for (const exp of experiments) {
    const id = exp.id ?? "(不明)";

    const requiredValueFields = ["name", "location", "prefecture", "period", "status", "description", "vehicleType", "route", "operationType"];
    for (const f of requiredValueFields) {
      if (!exp[f]) { err(id, `フィールド "${f}" がありません`); continue; }
      if (typeof exp[f].value !== "string" || exp[f].value.trim() === "")
        err(id, `${f}.value が空または文字列ではありません`);
      if (!Array.isArray(exp[f].refs))
        err(id, `${f}.refs が配列ではありません`);
      else if (exp[f].refs.some((r) => typeof r !== "number"))
        err(id, `${f}.refs に数値以外の値が含まれています`);
    }

    if (exp.location) {
      const { lat, lng } = exp.location;
      if (typeof lat !== "number" || lat < 24 || lat > 46)
        err(id, `location.lat "${lat}" は日本の緯度範囲 [24, 46] 外です`);
      if (typeof lng !== "number" || lng < 122 || lng > 154)
        err(id, `location.lng "${lng}" は日本の経度範囲 [122, 154] 外です`);
    }

    if (exp.status?.value && !enums.STATUS.includes(exp.status.value))
      err(id, `status.value "${exp.status.value}" は許可されたenum値ではありません。許可値: ${enums.STATUS.join(", ")}`);

    if (exp.prefecture?.value && !enums.PREFECTURES.includes(exp.prefecture.value))
      err(id, `prefecture.value "${exp.prefecture.value}" は47都道府県に含まれません`);

    if (!Array.isArray(exp.stakeholders) || exp.stakeholders.length === 0) {
      warn(id, "stakeholders が空または配列ではありません");
    } else {
      for (const [i, s] of exp.stakeholders.entries()) {
        const prefix = `stakeholders[${i}]`;
        if (typeof s.role !== "string" || s.role.trim() === "")
          err(id, `${prefix}.role が空または文字列ではありません`);
        if (typeof s.name !== "string" || s.name.trim() === "")
          err(id, `${prefix}.name が空または文字列ではありません`);
        if (!Array.isArray(s.refs))
          err(id, `${prefix}.refs が配列ではありません`);

        if (s.role && !enums.STAKEHOLDER_ROLES.includes(s.role))
          warn(id, `${prefix}.role "${s.role}" は既知の役割リストにありません（新規役割の場合はenums.jsに追加してください）`);

        if (s.name) {
          const orgs = s.name.split("、").map((o) => o.trim());
          for (const org of orgs) {
            if (!enums.ORGANIZATIONS.includes(org)) {
              const similar = enums.ORGANIZATIONS.filter(
                (known) => levenshtein(org, known) <= 3 && org.length >= 3
              );
              if (similar.length > 0)
                warn(id, `${prefix}.name 内 "${org}" は既知の組織名にありません。表記ゆれの可能性: ${similar.join(" / ")}`);
              else
                warn(id, `${prefix}.name 内 "${org}" は既知の組織名にありません（新規組織の場合はenums.jsに追加してください）`);
            }
          }
        }
      }
    }

    if (!Array.isArray(exp.references) || exp.references.length === 0) {
      warn(id, "references が空または配列ではありません");
    } else {
      const refIds = new Set();
      for (const [i, ref] of exp.references.entries()) {
        const prefix = `references[${i}]`;
        if (typeof ref.id !== "number")
          err(id, `${prefix}.id が数値ではありません`);
        else if (refIds.has(ref.id))
          err(id, `${prefix}.id "${ref.id}" が重複しています`);
        else
          refIds.add(ref.id);

        if (typeof ref.title !== "string" || ref.title.trim() === "")
          err(id, `${prefix}.title が空または文字列ではありません`);
        if (typeof ref.url !== "string" || ref.url.trim() === "")
          err(id, `${prefix}.url が空または文字列ではありません`);
        if (typeof ref.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(ref.date))
          err(id, `${prefix}.date "${ref.date}" は YYYY-MM-DD 形式ではありません`);
        if (typeof ref.source !== "string" || ref.source.trim() === "")
          warn(id, `${prefix}.source が空または文字列ではありません`);
      }

      for (const f of ["name", "location", "prefecture", "period", "status", "description", "vehicleType", "route", "operationType"]) {
        for (const r of (exp[f]?.refs ?? [])) {
          if (!refIds.has(r))
            err(id, `${f}.refs に参照番号 ${r} がありますが、references[].id に存在しません`);
        }
      }
      for (const [i, s] of (exp.stakeholders ?? []).entries()) {
        for (const r of (s.refs ?? [])) {
          if (!refIds.has(r))
            err(id, `stakeholders[${i}].refs に参照番号 ${r} がありますが、references[].id に存在しません`);
        }
      }
    }
  }

  return { errors, warnings };
}

function main() {
  let experiments, enums;

  try {
    experiments = loadExperiments();
  } catch (e) {
    console.error(`[FATAL] data.js の読み込みに失敗しました: ${e.message}`);
    process.exit(1);
  }

  try {
    enums = loadEnums();
  } catch (e) {
    console.error(`[FATAL] enums.js の読み込みに失敗しました: ${e.message}`);
    process.exit(1);
  }

  if (!Array.isArray(experiments)) {
    console.error("[FATAL] data.js の EXPERIMENTS が配列ではありません");
    process.exit(1);
  }

  console.log(`バリデーション開始: ${experiments.length} 件の実験データ\n`);

  const { errors, warnings } = validateExperiments(experiments, enums);

  if (warnings.length > 0) {
    warnings.forEach((w) => console.warn(w));
    console.log(`\n警告: ${warnings.length} 件`);
  }

  if (errors.length > 0) {
    console.log("");
    errors.forEach((e) => console.error(e));
    console.log(`\nエラー: ${errors.length} 件`);
    console.log("バリデーション失敗");
    process.exit(1);
  }

  console.log(warnings.length === 0 ? "バリデーション成功: エラー・警告なし" : "\nバリデーション成功（警告あり）");
}

main();
