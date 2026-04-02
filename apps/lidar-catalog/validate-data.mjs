#!/usr/bin/env node
// validate-data.mjs — データ構造・enum整合性バリデーター
//
// 使い方:
//   node apps/lidar-catalog/validate-data.mjs
//   node apps/lidar-catalog/validate-data.mjs --verbose
//
// 検証内容:
//   1. スキーマ定義（M/SCAN/CAT/WAVE/SRC_TYPE）の正当性
//   2. 各LiDARエントリのフィールド型・必須項目チェック
//   3. manufacturer/category/scanningMethod/wavelength が schema.js の定数オブジェクト参照であること
//   4. 参考文献の必須フィールド・URLフォーマット
//   5. refs 配列の参照整合性（references[].id に存在するか）
//   6. 重複ID検出
//   7. specs.*.value の配列（候補列挙）対応

import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const verbose = process.argv.includes("--verbose");

// ── schema.js をロード（グローバルに展開してから data.js をロード）
const schema = require(path.join(__dirname, "schema.js"));
const { M, SCAN, CAT, WAVE, SRC_TYPE } = schema;

// グローバルに注入（data.js が参照するため）
Object.assign(global, { M, SCAN, CAT, WAVE, SRC_TYPE });

// data.js をロード
const { LIDARS } = require(path.join(__dirname, "data.js"));

// ────────────────────────────────────────────
// ヘルパー
// ────────────────────────────────────────────

let errors = 0;
let warnings = 0;

const ALLOWED_TOP_LEVEL_KEYS = new Set([
  "id",
  "manufacturer",
  "name",
  "category",
  "scanningMethod",
  "wavelength",
  "discontinued",
  "specs",
  "release",
  "useCases",
  "references",
]);

const REQUIRED_REFERENCE_KEYS = new Set(["id", "url", "title", "date", "source", "type"]);

const REQUIRED_SPEC_KEYS = [
  "channels", "maxRange", "peakRange", "fovH", "fovV",
  "resH", "resV", "pointRate", "accuracy", "minRange",
  "power", "size", "weight", "protection", "interface",
];

const OPTIONAL_SPEC_KEYS = [
  "returnModes",
  "beamDivergence",
  "sunlightImmunity",
  "timeSynchronization",
  "imuBuiltIn",
  "supportedSoftware",
  "operatingTemperature",
  "shockVibration",
  "powerMax",
  "precision",
];

const ALL_SPEC_KEYS = new Set([...REQUIRED_SPEC_KEYS, ...OPTIONAL_SPEC_KEYS]);

const NUMERIC_HINT_KEYS = new Set([
  "channels",
  "maxRange",
  "peakRange",
  "fovH",
  "fovV",
  "resH",
  "resV",
  "pointRate",
  "minRange",
  "sunlightImmunity",
  "powerMax",
]);
const STRING_ARRAY_HINT_KEYS = new Set(["timeSynchronization", "protection"]);
const NUMBER_ARRAY_HINT_KEYS = new Set(["beamDivergence"]);

function err(msg) {
  console.error(`  ✗ ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  ⚠ WARN:  ${msg}`);
  warnings++;
}

function ok(msg) {
  if (verbose) console.log(`  ✓ ${msg}`);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function isValidHttpUrl(value) {
  if (typeof value !== "string" || value.trim() === "") return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function isYYYYMM(value) {
  return typeof value === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(value);
}

function validateStringArray(prefix, fieldName, value, required = false) {
  if (value === undefined || value === null) {
    if (required) err(`${prefix} ${fieldName} が未定義`);
    return;
  }
  if (!Array.isArray(value) || value.length === 0 || !value.every(isNonEmptyString)) {
    err(`${prefix} ${fieldName} は空でない文字列配列である必要がある`);
  }
}

function warnNumericNormalization(prefix, key, value) {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  warn(
    `${prefix} specs.${key}: 数値系フィールドに文字列表現が入っている (${text})。` +
    `可能なら value を数値/数値配列へ正規化し、補足説明は note に逃がすこと`
  );
}

function validateSpecValue(prefix, key, spec) {
  if (!Object.prototype.hasOwnProperty.call(spec, "value")) {
    err(`${prefix} specs.${key}: value プロパティが存在しない`);
    return;
  }

  const value = spec.value;
  if (value === null) {
    return;
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) err(`${prefix} specs.${key}: 数値が有限ではない`);
    if (NUMERIC_HINT_KEYS.has(key) && value < 0) err(`${prefix} specs.${key}: 数値が負である`);
    return;
  }

  if (typeof value === "string") {
    if (NUMERIC_HINT_KEYS.has(key)) warnNumericNormalization(prefix, key, value);
    return;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      err(`${prefix} specs.${key}: 配列は空にできない`);
      return;
    }
    if (NUMBER_ARRAY_HINT_KEYS.has(key) && !value.every((item) => typeof item === "number" && Number.isFinite(item))) {
      warnNumericNormalization(prefix, key, value);
    }
    if (STRING_ARRAY_HINT_KEYS.has(key) && !value.every(isNonEmptyString)) {
      err(`${prefix} specs.${key}: 文字列配列である必要がある`);
    }
    return;
  }

  err(`${prefix} specs.${key}: value が number|string|null またはそれらの配列でない`);
}

function validateSpecCommon(prefix, key, spec, required = false) {
  if (spec === undefined) {
    if (required) {
      warn(`${prefix} specs.${key} が未定義（null の場合でも { value: null, refs: [] } を明示すること）`);
    }
    return;
  }

  if (!isPlainObject(spec)) {
    err(`${prefix} specs.${key}: spec が object でない`);
    return;
  }

  validateSpecValue(prefix, key, spec);

  if (!Array.isArray(spec.refs)) {
    err(`${prefix} specs.${key}: refs が配列でない`);
  } else {
    for (const refId of spec.refs) {
      if (!isPositiveInteger(refId)) {
        err(`${prefix} specs.${key}.refs の要素が正の整数でない`);
      }
    }
    if (new Set(spec.refs).size !== spec.refs.length) {
      warn(`${prefix} specs.${key}.refs に重複がある`);
    }
  }

  if (Object.prototype.hasOwnProperty.call(spec, "unit") && spec.unit !== null && typeof spec.unit !== "string") {
    err(`${prefix} specs.${key}: unit が文字列または null でない`);
  }
  if (Object.prototype.hasOwnProperty.call(spec, "note") && typeof spec.note !== "string") {
    err(`${prefix} specs.${key}: note が文字列でない`);
  }
  if (Object.prototype.hasOwnProperty.call(spec, "joiner") && typeof spec.joiner !== "string") {
    err(`${prefix} specs.${key}: joiner が文字列でない`);
  }
  if (Object.prototype.hasOwnProperty.call(spec, "numericValue") && typeof spec.numericValue !== "number") {
    err(`${prefix} specs.${key}: numericValue が数値でない`);
  }

  const unknownKeys = Object.keys(spec).filter((k) => !["value", "refs", "unit", "note", "joiner", "numericValue"].includes(k));
  for (const unknownKey of unknownKeys) {
    warn(`${prefix} specs.${key}: 未知のプロパティ "${unknownKey}"`);
  }

  if (spec.joiner !== undefined && !Array.isArray(spec.value)) {
    warn(`${prefix} specs.${key}: joiner があるが value は配列ではない`);
  }
}

function validateReference(prefix, ref, refIds) {
  if (!isPlainObject(ref)) {
    err(`${prefix} reference が object でない`);
    return;
  }

  const refPrefix = `${prefix} references[${ref.id ?? "NO_ID"}]`;

  if (!isPositiveInteger(ref.id)) err(`${refPrefix}: id が正の整数でない`);
  else if (refIds.has(ref.id)) err(`${refPrefix}: 重複した参考文献ID ${ref.id}`);
  else refIds.add(ref.id);

  if (!isValidHttpUrl(ref.url)) {
    err(`${refPrefix}: url が http(s) の絶対URLでない → "${ref.url}"`);
  }
  if (!isNonEmptyString(ref.title)) err(`${refPrefix}: title が未定義`);
  if (!isNonEmptyString(ref.source)) err(`${refPrefix}: source が未定義`);
  if (!isYYYYMM(ref.date) && !(typeof ref.date === "string" && /^\d{4}$/.test(ref.date))) {
    err(`${refPrefix}: date が "YYYY" または "YYYY-MM" 形式でない`);
  }
  if (!isNonEmptyString(ref.type)) err(`${refPrefix}: type が未定義`);
  else if (!validSrcTypes.has(ref.type)) warn(`${refPrefix}: type "${ref.type}" が SRC_TYPE.* に存在しない`);

  for (const key of Object.keys(ref)) {
    if (!REQUIRED_REFERENCE_KEYS.has(key)) {
      warn(`${refPrefix}: 未知のプロパティ "${key}"`);
    }
  }
}

// schema定数のすべての有効オブジェクト参照を収集
const validManufacturers = new Set(Object.values(M));
const validScans = new Set(Object.values(SCAN));
const validCats = new Set(Object.values(CAT));
const validWaves = new Set(Object.values(WAVE));
const validSrcTypes = new Set(Object.values(SRC_TYPE));

// ────────────────────────────────────────────
// バリデーション実行
// ────────────────────────────────────────────

console.log(`\n🔍 LiDARカタログ データバリデーション`);
console.log(`   スキーマ: ${Object.keys(M).length}メーカー, ${Object.keys(SCAN).length}方式, ${Object.keys(CAT).length}カテゴリ`);
console.log(`   データ: ${LIDARS.length}件のLiDARエントリ\n`);

// 1. スキーマ基本チェック
console.log("── Step 1: スキーマ定義チェック");
for (const [key, mfr] of Object.entries(M)) {
  if (!isPlainObject(mfr)) {
    err(`M.${key}: object でない`);
    continue;
  }
  if (mfr.id !== key.toLowerCase()) warn(`M.${key}: id がキー名と一致しない (${mfr.id})`);
  if (!isNonEmptyString(mfr.id)) err(`M.${key}: id が未定義`);
  if (!isNonEmptyString(mfr.name)) err(`M.${key}: name が未定義`);
  if (!isNonEmptyString(mfr.nameJa)) err(`M.${key}: nameJa が未定義`);
  if (!isNonEmptyString(mfr.country)) err(`M.${key}: country が未定義`);
  if (!isValidHttpUrl(mfr.url)) err(`M.${key}: url が http(s) の絶対URLでない (${mfr.url})`);
  if (!isNonEmptyString(mfr.notes)) warn(`M.${key}: notes が未定義`);
  for (const prop of Object.keys(mfr)) {
    if (!["id", "name", "nameJa", "country", "url", "notes"].includes(prop)) {
      warn(`M.${key}: 未知のプロパティ "${prop}"`);
    }
  }
  ok(`M.${key} OK`);
}
for (const [key, scan] of Object.entries(SCAN)) {
  if (!isPlainObject(scan)) {
    err(`SCAN.${key}: object でない`);
    continue;
  }
  if (scan.id !== key.toLowerCase().replace(/_/g, "-")) warn(`SCAN.${key}: id がキー名と一致しない (${scan.id})`);
  if (!isNonEmptyString(scan.id)) err(`SCAN.${key}: id が未定義`);
  if (!isNonEmptyString(scan.label)) err(`SCAN.${key}: label が未定義`);
  if (!isNonEmptyString(scan.labelJa)) err(`SCAN.${key}: labelJa が未定義`);
  if (!isNonEmptyString(scan.icon)) err(`SCAN.${key}: icon が未定義`);
  if (!isNonEmptyString(scan.descriptionJa)) err(`SCAN.${key}: descriptionJa が未定義`);
  validateStringArray(`SCAN.${key}`, "pros", scan.pros, true);
  validateStringArray(`SCAN.${key}`, "cons", scan.cons, true);
  for (const prop of Object.keys(scan)) {
    if (!["id", "label", "labelJa", "icon", "descriptionJa", "pros", "cons"].includes(prop)) {
      warn(`SCAN.${key}: 未知のプロパティ "${prop}"`);
    }
  }
  ok(`SCAN.${key} OK`);
}
for (const [key, cat] of Object.entries(CAT)) {
  if (!isPlainObject(cat)) {
    err(`CAT.${key}: object でない`);
    continue;
  }
  if (cat.id !== key.toLowerCase().replace(/_/g, "-")) warn(`CAT.${key}: id がキー名と一致しない (${cat.id})`);
  if (!isNonEmptyString(cat.id)) err(`CAT.${key}: id が未定義`);
  if (!isNonEmptyString(cat.label)) err(`CAT.${key}: label が未定義`);
  if (!isNonEmptyString(cat.labelJa)) err(`CAT.${key}: labelJa が未定義`);
  if (!isNonEmptyString(cat.icon)) err(`CAT.${key}: icon が未定義`);
  if (!isNonEmptyString(cat.typicalRange)) err(`CAT.${key}: typicalRange が未定義`);
  if (!isNonEmptyString(cat.descriptionJa)) err(`CAT.${key}: descriptionJa が未定義`);
  for (const prop of Object.keys(cat)) {
    if (!["id", "label", "labelJa", "icon", "typicalRange", "descriptionJa"].includes(prop)) {
      warn(`CAT.${key}: 未知のプロパティ "${prop}"`);
    }
  }
  ok(`CAT.${key} OK`);
}
for (const [key, wave] of Object.entries(WAVE)) {
  if (!isPlainObject(wave)) {
    err(`WAVE.${key}: object でない`);
    continue;
  }
  if (!isNonEmptyString(wave.id)) err(`WAVE.${key}: id が未定義`);
  if (!isNonEmptyString(wave.label)) err(`WAVE.${key}: label が未定義`);
  if (!isNonEmptyString(wave.colorHex) || !/^#[0-9a-fA-F]{6}$/.test(wave.colorHex)) err(`WAVE.${key}: colorHex が #RRGGBB 形式でない`);
  if (!isNonEmptyString(wave.eyeSafety)) err(`WAVE.${key}: eyeSafety が未定義`);
  if (!isNonEmptyString(wave.detectorType)) err(`WAVE.${key}: detectorType が未定義`);
  if (!isNonEmptyString(wave.descriptionJa)) err(`WAVE.${key}: descriptionJa が未定義`);
  if (Object.prototype.hasOwnProperty.call(wave, "note") && !isNonEmptyString(wave.note)) err(`WAVE.${key}: note が文字列でない`);
  for (const prop of Object.keys(wave)) {
    if (!["id", "label", "colorHex", "eyeSafety", "detectorType", "descriptionJa", "note"].includes(prop)) {
      warn(`WAVE.${key}: 未知のプロパティ "${prop}"`);
    }
  }
  ok(`WAVE.${key} OK`);
}
for (const [key, srcType] of Object.entries(SRC_TYPE)) {
  if (!isNonEmptyString(srcType)) err(`SRC_TYPE.${key}: 値が文字列でない`);
  else ok(`SRC_TYPE.${key} OK`);
}

// 2. 重複IDチェック
console.log("\n── Step 2: 重複IDチェック");
const seenIds = new Set();
for (const lidar of LIDARS) {
  if (!lidar.id) { err("id が未定義のエントリあり"); continue; }
  if (seenIds.has(lidar.id)) err(`重複ID: "${lidar.id}"`);
  else seenIds.add(lidar.id);
}
ok(`全${LIDARS.length}エントリのIDを確認`);

// 3. 各エントリ検証
console.log("\n── Step 3: 各エントリ検証");
for (const lidar of LIDARS) {
  const prefix = `[${lidar.id ?? "NO_ID"}]`;

  for (const key of Object.keys(lidar)) {
    if (!ALLOWED_TOP_LEVEL_KEYS.has(key)) {
      warn(`${prefix} 未知のトップレベルプロパティ "${key}"`);
    }
  }

  // --- enum参照チェック（最重要）---
  if (!validManufacturers.has(lidar.manufacturer)) {
    err(`${prefix} manufacturer が schema.js の M.* 定数を参照していない（文字列リテラル等の使用が疑われる）`);
  } else if (lidar.manufacturer.id !== lidar.manufacturer.id?.toLowerCase()) {
    warn(`${prefix} manufacturer.id の形式を確認してください (${lidar.manufacturer.id})`);
  } else ok(`${prefix} manufacturer OK → ${lidar.manufacturer.name}`);

  if (!validCats.has(lidar.category)) {
    err(`${prefix} category が schema.js の CAT.* 定数を参照していない`);
  } else ok(`${prefix} category OK → ${lidar.category.id}`);

  if (!validScans.has(lidar.scanningMethod)) {
    err(`${prefix} scanningMethod が schema.js の SCAN.* 定数を参照していない`);
  } else ok(`${prefix} scanningMethod OK → ${lidar.scanningMethod.id}`);

  if (!validWaves.has(lidar.wavelength)) {
    err(`${prefix} wavelength が schema.js の WAVE.* 定数を参照していない`);
  } else ok(`${prefix} wavelength OK → ${lidar.wavelength.id}`);

  // --- 必須フィールド ---
  if (!isNonEmptyString(lidar.id)) err(`${prefix} id が文字列でない`);
  if (typeof lidar.discontinued !== "boolean") err(`${prefix} discontinued が boolean でない`);
  if (!isNonEmptyString(lidar.name)) err(`${prefix} name が文字列でない`);
  if (!isNonEmptyString(lidar.useCases)) err(`${prefix} useCases が文字列でない`);
  if (!isPlainObject(lidar.specs)) err(`${prefix} specs が object でない`);
  if (!isPlainObject(lidar.release)) err(`${prefix} release が object でない`);

  // --- specsフィールド ---
  if (isPlainObject(lidar.specs)) {
    for (const key of Object.keys(lidar.specs)) {
      if (!ALL_SPEC_KEYS.has(key)) {
        warn(`${prefix} specs.${key}: 未知のスペックキー`);
      }
    }

    for (const key of REQUIRED_SPEC_KEYS) {
      validateSpecCommon(prefix, key, lidar.specs[key], true);
    }
    for (const key of OPTIONAL_SPEC_KEYS) {
      validateSpecCommon(prefix, key, lidar.specs[key], false);
    }
  }

  // --- 参考文献 ---
  if (!Array.isArray(lidar.references)) {
    err(`${prefix} references が配列でない`);
    continue;
  }

  if (lidar.references.length === 0) {
    warn(`${prefix} references が空（最低1件の一次情報URLを追加すること）`);
  }

  const refIds = new Set();
  for (const ref of lidar.references) {
    validateReference(prefix, ref, refIds);
  }

  // refs → references[].id 整合性チェック
  for (const key of ALL_SPEC_KEYS) {
    const spec = lidar.specs?.[key];
    if (!spec?.refs) continue;
    for (const refId of spec.refs) {
      if (!refIds.has(refId)) {
        err(`${prefix} specs.${key}.refs[${refId}]: references に id=${refId} が存在しない`);
      }
    }
  }
  if (isPlainObject(lidar.release)) {
    if (lidar.release.value !== null && !isNonEmptyString(lidar.release.value)) err(`${prefix} release.value が文字列または null でない`);
    if (!Array.isArray(lidar.release.refs)) {
      err(`${prefix} release.refs が配列でない`);
    } else {
      for (const refId of lidar.release.refs) {
        if (!refIds.has(refId)) {
          err(`${prefix} release.refs[${refId}]: references に id=${refId} が存在しない`);
        }
      }
    }
    for (const key of Object.keys(lidar.release)) {
      if (!["value", "refs"].includes(key)) warn(`${prefix} release: 未知のプロパティ "${key}"`);
    }
  } else if (lidar.release !== undefined) {
    err(`${prefix} release が object でない`);
  }
}

// 4. 出典なしスペック集計
console.log("\n── Step 4: 出典なしスペック集計（要補完候補）");
const missingRefs = {};
for (const lidar of LIDARS) {
  if (!lidar.specs) continue;
  for (const key of ALL_SPEC_KEYS) {
    const spec = lidar.specs[key];
    if (!spec) continue;
    if (spec.value !== null && spec.value !== undefined && (!spec.refs || spec.refs.length === 0)) {
      missingRefs[key] = (missingRefs[key] ?? 0) + 1;
    }
  }
}
if (Object.keys(missingRefs).length > 0) {
  console.log("  値はあるが出典(refs)が空のスペック:");
  for (const [key, count] of Object.entries(missingRefs).sort((a, b) => b[1] - a[1])) {
    warn(`  specs.${key}: ${count}件が出典なし`);
  }
} else {
  ok("すべての値付きスペックに出典あり");
}

// ────────────────────────────────────────────
// 結果サマリー
// ────────────────────────────────────────────

console.log("\n" + "─".repeat(50));
if (errors > 0) {
  console.error(`\n❌ バリデーション失敗: ${errors}件のERROR, ${warnings}件のWARNING`);
  process.exit(1);
} else if (warnings > 0) {
  console.warn(`\n⚠️  バリデーション成功（要確認あり）: ${warnings}件のWARNING`);
  process.exit(0);
} else {
  console.log(`\n✅ バリデーション完全成功（ERROR: 0, WARNING: 0）`);
  process.exit(0);
}
