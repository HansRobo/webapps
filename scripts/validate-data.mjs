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
const DATA_PATH   = resolve(ROOT, "apps/autonomous-driving-map/data.js");
const SCHEMA_PATH = resolve(ROOT, "apps/autonomous-driving-map/schema.js");

const require = createRequire(import.meta.url);

function loadSchema() {
  return require(SCHEMA_PATH);
}

function loadExperiments(schema) {
  const src = readFileSync(DATA_PATH, "utf-8");
  // constはサンドボックスオブジェクトのプロパティにならないため、var宣言に置き換えてから実行する
  const patched = src.replace(/\bconst\s+EXPERIMENTS\s*=/, "var EXPERIMENTS =");
  // schema.js の定数（STATUS/PREF/VEH/ADS）をサンドボックスに注入する
  const sandbox = {
    EXPERIMENTS: undefined,
    STATUS: schema.STATUS,
    PREF:   schema.PREF,
    VEH:    schema.VEH,
    ADS:    schema.ADS,
  };
  vm.runInNewContext(patched, sandbox);
  return sandbox.EXPERIMENTS;
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

function normalizeRole(role) {
  return String(role)
    .replace(/[ 　]/g, "")
    .replace(/（[^）]*）/g, "")
    .trim();
}

function normalizeOrgName(name) {
  return String(name)
    .replace(/[ 　]/g, "")
    .replace(/（[^）]*）/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/株式会社|（株）|有限会社|一般財団法人|一般社団法人|国立研究開発法人/g, "")
    .trim();
}

function validateExperiments(experiments, schema) {
  const errors = [];
  const warnings = [];
  const err = (id, msg) => errors.push(`[ERROR] ${id}: ${msg}`);
  const warn = (id, msg) => warnings.push(`[WARN]  ${id}: ${msg}`);

  // schema.js の enum オブジェクトから Set を構築（同一性チェック用）
  const validStatuses = new Set(Object.values(schema.STATUS));
  const validPrefs    = new Set(Object.values(schema.PREF));
  const validVehs     = new Set(Object.values(schema.VEH));
  const validAds      = new Set(Object.values(schema.ADS));

  // 文字列値フィールド（value が string のもの）
  const stringValueFields = ["name", "location", "period", "description", "route", "operationType"];
  // enum オブジェクト参照フィールド（value がオブジェクトのもの）
  const enumValueFields = ["status", "prefecture"];

  const knownRoles = Array.isArray(schema.KNOWN_ROLES) ? schema.KNOWN_ROLES : [];
  const knownOrgs  = Array.isArray(schema.KNOWN_ORGS)  ? schema.KNOWN_ORGS  : [];

  const roleNormToKnown = new Map();
  for (const r of knownRoles) {
    const n = normalizeRole(r);
    if (!roleNormToKnown.has(n)) roleNormToKnown.set(n, []);
    roleNormToKnown.get(n).push(r);
  }

  const orgNormToKnown = new Map();
  for (const o of knownOrgs) {
    const n = normalizeOrgName(o);
    if (!orgNormToKnown.has(n)) orgNormToKnown.set(n, []);
    orgNormToKnown.get(n).push(o);
  }

  // ID 重複チェック
  const seenIds = new Set();
  for (const exp of experiments) {
    if (!exp.id) { err("(不明)", "idフィールドがありません"); continue; }
    if (seenIds.has(exp.id)) err(exp.id, `ID "${exp.id}" が重複しています`);
    seenIds.add(exp.id);
  }

  for (const exp of experiments) {
    const id = exp.id ?? "(不明)";

    // 文字列値フィールドのチェック
    for (const f of stringValueFields) {
      if (!exp[f]) { err(id, `フィールド "${f}" がありません`); continue; }
      if (typeof exp[f].value !== "string" || exp[f].value.trim() === "")
        err(id, `${f}.value が空または文字列ではありません`);
      if (!Array.isArray(exp[f].refs))
        err(id, `${f}.refs が配列ではありません`);
      else if (exp[f].refs.some((r) => typeof r !== "number"))
        err(id, `${f}.refs に数値以外の値が含まれています`);
    }

    // enum オブジェクト参照フィールドのチェック
    for (const f of enumValueFields) {
      if (!exp[f]) { err(id, `フィールド "${f}" がありません`); continue; }
      if (!Array.isArray(exp[f].refs))
        err(id, `${f}.refs が配列ではありません`);
      else if (exp[f].refs.some((r) => typeof r !== "number"))
        err(id, `${f}.refs に数値以外の値が含まれています`);
    }

    // GPS 範囲チェック
    if (exp.location) {
      const { lat, lng } = exp.location;
      if (typeof lat !== "number" || lat < 24 || lat > 46)
        err(id, `location.lat "${lat}" は日本の緯度範囲 [24, 46] 外です`);
      if (typeof lng !== "number" || lng < 122 || lng > 154)
        err(id, `location.lng "${lng}" は日本の経度範囲 [122, 154] 外です`);
    }

    // status: schema.js の STATUS オブジェクトへの参照かチェック
    if (exp.status?.value !== undefined) {
      if (!validStatuses.has(exp.status.value))
        err(id, `status.value が STATUS に存在しないオブジェクトです（文字列リテラルを使っていませんか？）: ${JSON.stringify(exp.status.value)}`);
    }

    // prefecture: schema.js の PREF オブジェクトへの参照かチェック
    if (exp.prefecture?.value !== undefined) {
      if (!validPrefs.has(exp.prefecture.value))
        err(id, `prefecture.value が PREF に存在しないオブジェクトです: ${JSON.stringify(exp.prefecture.value)}`);
    }

    // adSystem のチェック
    const adSystemItems = Array.isArray(exp.adSystem) ? exp.adSystem : exp.adSystem ? [exp.adSystem] : [];
    if (adSystemItems.length === 0) {
      err(id, 'フィールド "adSystem" がありません');
    } else {
      for (const a of adSystemItems) {
        if (!a || typeof a !== "object" || !("value" in a)) {
          err(id, "adSystem エントリが {value, refs} 形式ではありません"); continue;
        }
        if (!Array.isArray(a.refs))
          err(id, "adSystem.refs が配列ではありません");
        else if (a.refs.some((r) => typeof r !== "number"))
          err(id, "adSystem.refs に数値以外の値が含まれています");
        if (a.value !== undefined && !validAds.has(a.value))
          err(id, `adSystem.value が ADS に存在しないオブジェクトです（文字列リテラルを使っていませんか？）: ${JSON.stringify(a.value)}`);
      }
    }

    // vehicle のチェック
    const vehicleItems = Array.isArray(exp.vehicle) ? exp.vehicle : exp.vehicle ? [exp.vehicle] : [];
    if (vehicleItems.length === 0) {
      err(id, 'フィールド "vehicle" がありません');
    } else {
      for (const v of vehicleItems) {
        if (!v || typeof v !== "object" || !("value" in v)) {
          err(id, "vehicle エントリが {value, refs} 形式ではありません"); continue;
        }
        if (!Array.isArray(v.refs))
          err(id, "vehicle.refs が配列ではありません");
        else if (v.refs.some((r) => typeof r !== "number"))
          err(id, "vehicle.refs に数値以外の値が含まれています");
        if (v.value !== undefined && !validVehs.has(v.value))
          err(id, `vehicle.value が VEH に存在しないオブジェクトです（文字列リテラルを使っていませんか？）: ${JSON.stringify(v.value)}`);
      }
    }

    // stakeholders のチェック
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

        if (s.role && !knownRoles.includes(s.role)) {
          const normalizedRole = normalizeRole(s.role);
          const normalizedMatches = roleNormToKnown.get(normalizedRole) ?? [];
          if (normalizedMatches.length === 1) {
            err(id, `${prefix}.role "${s.role}" は既存表記 "${normalizedMatches[0]}" と表記ゆれがあります（正規表記に統一してください）`);
          } else if (normalizedMatches.length > 1) {
            err(id, `${prefix}.role "${s.role}" は既存表記に複数候補があります: ${normalizedMatches.join(" / ")}`);
          }
        }

        if (s.name) {
          const orgs = s.name.split("、").map((o) => o.trim());
          for (const org of orgs) {
            if (!knownOrgs.includes(org)) {
              const normalizedOrg = normalizeOrgName(org);
              const normalizedMatches = orgNormToKnown.get(normalizedOrg) ?? [];
              if (normalizedMatches.length === 1) {
                err(id, `${prefix}.name 内 "${org}" は既存表記 "${normalizedMatches[0]}" と表記ゆれがあります（正規表記に統一してください）`);
              } else if (normalizedMatches.length > 1) {
                err(id, `${prefix}.name 内 "${org}" は既存表記に複数候補があります: ${normalizedMatches.join(" / ")}`);
              }
            }
          }
        }
      }
    }

    // references のチェック
    if (!Array.isArray(exp.references) || exp.references.length === 0) {
      warn(id, "references が空または配列ではありません");
    } else {
      const refIds = new Set();
      const refUrls = new Map();
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
        else if (!/^https?:\/\//.test(ref.url))
          err(id, `${prefix}.url "${ref.url}" は http:// または https:// で始まる URL ではありません`);
        else if (refUrls.has(ref.url))
          warn(id, `${prefix}.url "${ref.url}" は references[${refUrls.get(ref.url)}] と同じ URL です（重複参照）`);
        else
          refUrls.set(ref.url, i);
        if (typeof ref.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(ref.date))
          err(id, `${prefix}.date "${ref.date}" は YYYY-MM-DD 形式ではありません`);
        if (typeof ref.source !== "string" || ref.source.trim() === "")
          warn(id, `${prefix}.source が空または文字列ではありません`);
      }

      function checkRefs(label, refs) {
        const seen = new Set();
        for (const r of refs) {
          if (!refIds.has(r))
            err(id, `${label} に参照番号 ${r} がありますが、references[].id に存在しません`);
          if (seen.has(r))
            warn(id, `${label} に参照番号 ${r} が重複して含まれています`);
          seen.add(r);
        }
      }
      for (const f of [...stringValueFields, ...enumValueFields]) checkRefs(`${f}.refs`, exp[f]?.refs ?? []);
      for (const [i, a] of adSystemItems.entries()) checkRefs(`adSystem[${i}].refs`, a.refs ?? []);
      for (const [i, v] of vehicleItems.entries()) checkRefs(`vehicle[${i}].refs`, v.refs ?? []);
      for (const [i, s] of (exp.stakeholders ?? []).entries()) checkRefs(`stakeholders[${i}].refs`, s.refs ?? []);

      const citedIds = new Set([
        ...[...stringValueFields, ...enumValueFields].flatMap((f) => exp[f]?.refs ?? []),
        ...adSystemItems.flatMap((a) => a.refs ?? []),
        ...vehicleItems.flatMap((v) => v.refs ?? []),
        ...(exp.stakeholders ?? []).flatMap((s) => s.refs ?? []),
      ]);
      for (const ref of exp.references) {
        if (typeof ref.id === "number" && !citedIds.has(ref.id))
          warn(id, `references id=${ref.id}（"${ref.title}"）はどのフィールドの refs にも引用されていません`);
      }
    }
  }

  return { errors, warnings };
}

function main() {
  let schema, experiments;

  try {
    schema = loadSchema();
  } catch (e) {
    console.error(`[FATAL] schema.js の読み込みに失敗しました: ${e.message}`);
    process.exit(1);
  }

  try {
    experiments = loadExperiments(schema);
  } catch (e) {
    console.error(`[FATAL] data.js の読み込みに失敗しました: ${e.message}`);
    process.exit(1);
  }

  if (!Array.isArray(experiments)) {
    console.error("[FATAL] data.js の EXPERIMENTS が配列ではありません");
    process.exit(1);
  }

  console.log(`バリデーション開始: ${experiments.length} 件の実験データ\n`);

  const { errors, warnings } = validateExperiments(experiments, schema);

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
