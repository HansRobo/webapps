#!/usr/bin/env node
// 自動運転実証実験データ バリデーションスクリプト
// 使い方: node apps/autonomous-driving-map/validate-data.mjs
// 終了コード: 0=OK（警告あり可）, 1=エラーあり

import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const SCHEMA_PATH = join(__dirname, "schema.js");
const DATA_PATH = join(__dirname, "data.js");
const ENUM_NAMES = ["STATUS", "LV4_APPROVAL", "PREF", "VEH", "ADS"];
const STRING_VALUE_FIELDS = ["name", "location", "period", "description", "route", "operationType"];
const ENUM_VALUE_FIELDS = ["status", "prefecture", "lv4Approval"];
const ID_PATTERN = /^exp-\d{3}$/;
const LAT_MIN = 24;
const LAT_MAX = 46;
const LNG_MIN = 122;
const LNG_MAX = 154;
const EDIT_GUIDANCE = [
  "── データ編集時の検証ガイダンス ──",
  "既存エントリを更新する前に、別年度・別期間・別ルート・別車両・別事業者・別実証フェーズなど、独立した実験である可能性を幅広く確認してください。",
  "一次情報を照合してあらゆる合理的な可能性を検討し、別実験と判断できる場合は既存エントリを上書きせず、新しい exp-XXX エントリとして分離してください。",
  "checkedAt は、参照先の存在だけでなく、対象エントリの内容と一次情報の整合性を確認した後に更新してください。",
].join("\n");

export function loadSchema() {
  delete require.cache[require.resolve(SCHEMA_PATH)];
  return require(SCHEMA_PATH);
}

export function loadExperiments(schema, dataPath = DATA_PATH) {
  const src = readFileSync(dataPath, "utf-8");
  // const はサンドボックスオブジェクトのプロパティにならないため、var 宣言に置き換える。
  const patched = src.replace(/\bconst\s+EXPERIMENTS\s*=/, "var EXPERIMENTS =");
  const sandbox = Object.fromEntries(ENUM_NAMES.map((name) => [name, schema[name]]));
  sandbox.EXPERIMENTS = undefined;
  vm.runInNewContext(patched, sandbox, { filename: dataPath });
  return sandbox.EXPERIMENTS;
}

function normalizeRole(role) {
  return String(role).replace(/[ 　]/g, "").replace(/（[^）]*）/g, "").trim();
}

function normalizeOrgName(name) {
  return String(name)
    .replace(/[ 　]/g, "")
    .replace(/（[^）]*）/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/株式会社|（株）|有限会社|一般財団法人|一般社団法人|国立研究開発法人/g, "")
    .trim();
}

function groupNormalized(values, normalize) {
  const groups = new Map();
  for (const value of values) {
    const normalized = normalize(value);
    if (!groups.has(normalized)) groups.set(normalized, []);
    groups.get(normalized).push(value);
  }
  return groups;
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function isValidDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day;
}

function isHttpUrl(value) {
  if (typeof value !== "string" || value.trim() !== value || value === "") return false;
  try {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:") && url.hostname !== "";
  } catch {
    return false;
  }
}

function isValidCheckedAt(value) {
  if (value === null) return true;
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})$/.test(value)) return false;
  return isValidDate(value.slice(0, 10)) && !Number.isNaN(Date.parse(value));
}

function addDuplicateErrors(values, label, err) {
  if (!Array.isArray(values)) {
    err(`${label} が配列ではありません`);
    return;
  }
  const seen = new Set();
  for (const [index, value] of values.entries()) {
    if (typeof value !== "string" || value.trim() === "") {
      err(`${label}[${index}] が空または文字列ではありません`);
    } else if (seen.has(value)) {
      err(`${label}: "${value}" が重複しています`);
    }
    seen.add(value);
  }
}

export function validateSchema(schema) {
  const errors = [];
  const warnings = [];
  const err = (msg) => errors.push(`[ERROR] schema: ${msg}`);

  if (!schema || typeof schema !== "object") {
    err("schema.js がオブジェクトを公開していません");
    return { errors, warnings };
  }

  for (const enumName of ENUM_NAMES) {
    const enumObject = schema[enumName];
    if (!enumObject || typeof enumObject !== "object" || Array.isArray(enumObject)) {
      err(`${enumName} がオブジェクトではありません`);
      continue;
    }
    const ids = new Set();
    const labels = new Set();
    for (const [key, value] of Object.entries(enumObject)) {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        err(`${enumName}.${key} がオブジェクトではありません`);
        continue;
      }
      for (const field of ["id", "label"]) {
        if (typeof value[field] !== "string" || value[field].trim() === "") {
          err(`${enumName}.${key}.${field} が空または文字列ではありません`);
        }
      }
      if (typeof value.id === "string" && ids.has(value.id)) err(`${enumName}: id "${value.id}" が重複しています`);
      if (typeof value.label === "string" && labels.has(value.label)) err(`${enumName}: label "${value.label}" が重複しています`);
      ids.add(value.id);
      labels.add(value.label);
    }
  }

  addDuplicateErrors(schema.KNOWN_ORGS, "KNOWN_ORGS", err);
  addDuplicateErrors(schema.KNOWN_ROLES, "KNOWN_ROLES", err);
  return { errors, warnings };
}

export function validateExperiments(experiments, schema) {
  const errors = [];
  const warnings = [];
  const err = (id, msg) => errors.push(`[ERROR] ${id}: ${msg}`);
  const warn = (id, msg) => warnings.push(`[WARN]  ${id}: ${msg}`);

  if (!Array.isArray(experiments)) {
    err("(全体)", "EXPERIMENTS が配列ではありません");
    return { errors, warnings };
  }
  if (experiments.length === 0) err("(全体)", "EXPERIMENTS が空です");

  const validStatuses = new Set(Object.values(schema.STATUS ?? {}));
  const validLv4Approvals = new Set(Object.values(schema.LV4_APPROVAL ?? {}));
  const validPrefs = new Set(Object.values(schema.PREF ?? {}));
  const validVehs = new Set(Object.values(schema.VEH ?? {}));
  const validAds = new Set(Object.values(schema.ADS ?? {}));
  const knownRoles = Array.isArray(schema.KNOWN_ROLES) ? schema.KNOWN_ROLES : [];
  const knownOrgs = Array.isArray(schema.KNOWN_ORGS) ? schema.KNOWN_ORGS : [];
  const roleNormToKnown = groupNormalized(knownRoles, normalizeRole);
  const orgNormToKnown = groupNormalized(knownOrgs, normalizeOrgName);
  const seenIds = new Set();

  function checkRefs(id, label, refs) {
    if (!Array.isArray(refs)) {
      err(id, `${label} が配列ではありません`);
      return false;
    }
    if (refs.some((ref) => !isPositiveInteger(ref))) err(id, `${label} に正の整数以外の値が含まれています`);
    return true;
  }

  function checkEnumValue(id, field, item, validValues, { nullable = false } = {}) {
    if (nullable && item === null) return;
    if (!item || typeof item !== "object" || Array.isArray(item) || !("value" in item)) {
      err(id, `${field} が {value, refs} 形式ではありません`);
      return;
    }
    if (!validValues.has(item.value)) err(id, `${field}.value が schema.js の定数を参照していません: ${JSON.stringify(item.value)}`);
    checkRefs(id, `${field}.refs`, item.refs);
  }

  for (const exp of experiments) {
    if (!exp || typeof exp !== "object" || Array.isArray(exp)) {
      err("(不明)", "実験エントリがオブジェクトではありません");
      continue;
    }
    const id = typeof exp.id === "string" && exp.id !== "" ? exp.id : "(不明)";
    if (!ID_PATTERN.test(id)) err(id, 'id は "exp-XXX" 形式ではありません');
    if (seenIds.has(id)) err(id, `ID "${id}" が重複しています`);
    seenIds.add(id);

    for (const field of STRING_VALUE_FIELDS) {
      const item = exp[field];
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        err(id, `${field} が {value, refs} 形式ではありません`);
        continue;
      }
      if (typeof item.value !== "string" || item.value.trim() === "") err(id, `${field}.value が空または文字列ではありません`);
      checkRefs(id, `${field}.refs`, item.refs);
    }

    checkEnumValue(id, "status", exp.status, validStatuses);
    checkEnumValue(id, "prefecture", exp.prefecture, validPrefs);
    checkEnumValue(id, "lv4Approval", exp.lv4Approval, validLv4Approvals);

    if (exp.location && typeof exp.location === "object") {
      const { lat, lng } = exp.location;
      if (!Number.isFinite(lat) || lat < LAT_MIN || lat > LAT_MAX) err(id, `location.lat "${lat}" は日本の緯度範囲 [${LAT_MIN}, ${LAT_MAX}] 外です`);
      if (!Number.isFinite(lng) || lng < LNG_MIN || lng > LNG_MAX) err(id, `location.lng "${lng}" は日本の経度範囲 [${LNG_MIN}, ${LNG_MAX}] 外です`);
    }

    const vehicleItems = Array.isArray(exp.vehicle) ? exp.vehicle : exp.vehicle ? [exp.vehicle] : [];
    if (vehicleItems.length === 0) err(id, 'フィールド "vehicle" がありません');
    for (const [index, item] of vehicleItems.entries()) checkEnumValue(id, `vehicle[${index}]`, item, validVehs);

    if (!("adSystem" in exp)) {
      err(id, 'フィールド "adSystem" がありません');
    } else {
      const adSystemItems = Array.isArray(exp.adSystem) ? exp.adSystem : [exp.adSystem];
      if (adSystemItems.length === 0) err(id, "adSystem が空の配列です。不明な場合は null を指定してください");
      for (const [index, item] of adSystemItems.entries()) checkEnumValue(id, `adSystem[${index}]`, item, validAds, { nullable: true });
    }

    const stakeholders = Array.isArray(exp.stakeholders) ? exp.stakeholders : [];
    if (stakeholders.length === 0) {
      warn(id, "stakeholders が空または配列ではありません");
    } else {
      for (const [index, stakeholder] of stakeholders.entries()) {
        const prefix = `stakeholders[${index}]`;
        if (!stakeholder || typeof stakeholder !== "object" || Array.isArray(stakeholder)) {
          err(id, `${prefix} がオブジェクトではありません`);
          continue;
        }
        if (typeof stakeholder.role !== "string" || stakeholder.role.trim() === "") err(id, `${prefix}.role が空または文字列ではありません`);
        if (typeof stakeholder.name !== "string" || stakeholder.name.trim() === "") err(id, `${prefix}.name が空または文字列ではありません`);
        checkRefs(id, `${prefix}.refs`, stakeholder.refs);

        if (typeof stakeholder.role === "string" && stakeholder.role !== "" && !knownRoles.includes(stakeholder.role)) {
          const matches = roleNormToKnown.get(normalizeRole(stakeholder.role)) ?? [];
          if (matches.length > 0) err(id, `${prefix}.role "${stakeholder.role}" は既存表記 "${matches.join(" / ")}" と表記ゆれがあります`);
          else warn(id, `${prefix}.role "${stakeholder.role}" が KNOWN_ROLES に未登録です`);
        }
        if (typeof stakeholder.name === "string") {
          for (const org of stakeholder.name.split(/[、,，/／]/).map((value) => value.trim()).filter(Boolean)) {
            if (knownOrgs.includes(org)) continue;
            const matches = orgNormToKnown.get(normalizeOrgName(org)) ?? [];
            if (matches.length > 0) err(id, `${prefix}.name 内 "${org}" は既存表記 "${matches.join(" / ")}" と表記ゆれがあります`);
            else warn(id, `${prefix}.name 内 "${org}" が KNOWN_ORGS に未登録です`);
          }
        }
      }
    }

    if (!Array.isArray(exp.references) || exp.references.length === 0) {
      err(id, "references が空または配列ではありません");
      continue;
    }

    const refIds = new Set();
    const refUrls = new Map();
    for (const [index, ref] of exp.references.entries()) {
      const prefix = `references[${index}]`;
      if (!ref || typeof ref !== "object" || Array.isArray(ref)) {
        err(id, `${prefix} がオブジェクトではありません`);
        continue;
      }
      if (!isPositiveInteger(ref.id)) err(id, `${prefix}.id が正の整数ではありません`);
      else if (refIds.has(ref.id)) err(id, `${prefix}.id "${ref.id}" が重複しています`);
      else refIds.add(ref.id);
      if (typeof ref.title !== "string" || ref.title.trim() === "") err(id, `${prefix}.title が空または文字列ではありません`);
      if (!isHttpUrl(ref.url)) err(id, `${prefix}.url "${ref.url}" は有効な http(s) URL ではありません`);
      else if (refUrls.has(ref.url)) warn(id, `${prefix}.url "${ref.url}" は references[${refUrls.get(ref.url)}] と同じ URL です（重複参照）`);
      else refUrls.set(ref.url, index);
      if (!isValidDate(ref.date)) err(id, `${prefix}.date "${ref.date}" は実在する YYYY-MM-DD 形式の日付ではありません`);
      if (typeof ref.source !== "string" || ref.source.trim() === "") warn(id, `${prefix}.source が空または文字列ではありません`);
      if (!("checkedAt" in ref)) warn(id, `${prefix}.checkedAt がありません。一次情報の要チェック候補として扱われます`);
      else if (!isValidCheckedAt(ref.checkedAt)) err(id, `${prefix}.checkedAt "${ref.checkedAt}" は null またはタイムゾーン付き ISO 8601 日時ではありません`);
    }

    const citedIds = new Set();
    function inspectRefs(label, refs) {
      if (!Array.isArray(refs)) return;
      const seen = new Set();
      for (const ref of refs) {
        citedIds.add(ref);
        if (!refIds.has(ref)) err(id, `${label} に参照番号 ${ref} がありますが、references[].id に存在しません`);
        if (seen.has(ref)) warn(id, `${label} に参照番号 ${ref} が重複して含まれています`);
        seen.add(ref);
      }
    }
    for (const field of [...STRING_VALUE_FIELDS, ...ENUM_VALUE_FIELDS]) inspectRefs(`${field}.refs`, exp[field]?.refs);
    for (const [index, item] of vehicleItems.entries()) inspectRefs(`vehicle[${index}].refs`, item?.refs);
    const adSystemItems = Array.isArray(exp.adSystem) ? exp.adSystem : exp.adSystem === null || exp.adSystem === undefined ? [] : [exp.adSystem];
    for (const [index, item] of adSystemItems.entries()) inspectRefs(`adSystem[${index}].refs`, item?.refs);
    for (const [index, item] of stakeholders.entries()) inspectRefs(`stakeholders[${index}].refs`, item?.refs);
    for (const ref of exp.references) {
      if (isPositiveInteger(ref?.id) && !citedIds.has(ref.id)) warn(id, `references id=${ref.id}（"${ref.title}"）はどのフィールドの refs にも引用されていません`);
    }
  }

  return { errors, warnings };
}

export function runValidation(schema = loadSchema(), experiments = loadExperiments(schema)) {
  const schemaResult = validateSchema(schema);
  const dataResult = validateExperiments(experiments, schema);
  return {
    errors: [...schemaResult.errors, ...dataResult.errors],
    warnings: [...schemaResult.warnings, ...dataResult.warnings],
  };
}

export function main() {
  let schema;
  let experiments;
  try {
    schema = loadSchema();
  } catch (error) {
    console.error(`[FATAL] schema.js の読み込みに失敗しました: ${error.message}`);
    process.exitCode = 1;
    return;
  }
  try {
    experiments = loadExperiments(schema);
  } catch (error) {
    console.error(`[FATAL] data.js の読み込みに失敗しました: ${error.message}`);
    process.exitCode = 1;
    return;
  }

  console.log(`${EDIT_GUIDANCE}\n`);
  console.log(`バリデーション開始: ${Array.isArray(experiments) ? experiments.length : 0} 件の実験データ\n`);
  const { errors, warnings } = runValidation(schema, experiments);
  if (warnings.length > 0) {
    warnings.forEach((warning) => console.warn(warning));
    console.log(`\n警告: ${warnings.length} 件`);
  }
  if (errors.length > 0) {
    console.log("");
    errors.forEach((error) => console.error(error));
    console.log(`\nエラー: ${errors.length} 件`);
    console.log("バリデーション失敗");
    process.exitCode = 1;
    return;
  }
  console.log(warnings.length === 0 ? "バリデーション成功: エラー・警告なし" : "\nバリデーション成功（警告あり）");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
