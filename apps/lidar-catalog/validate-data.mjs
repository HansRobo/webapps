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

// schema定数のすべての有効オブジェクト参照を収集
const validManufacturers = new Set(Object.values(M));
const validScans = new Set(Object.values(SCAN));
const validCats = new Set(Object.values(CAT));
const validWaves = new Set(Object.values(WAVE));
const validSrcTypes = new Set(Object.values(SRC_TYPE));

const REQUIRED_SPEC_KEYS = [
  "channels", "maxRange", "peakRange", "fovH", "fovV",
  "resH", "resV", "pointRate", "accuracy", "minRange",
  "power", "size", "weight", "protection", "interface",
];

// ────────────────────────────────────────────
// バリデーション実行
// ────────────────────────────────────────────

console.log(`\n🔍 LiDARカタログ データバリデーション`);
console.log(`   スキーマ: ${Object.keys(M).length}メーカー, ${Object.keys(SCAN).length}方式, ${Object.keys(CAT).length}カテゴリ`);
console.log(`   データ: ${LIDARS.length}件のLiDARエントリ\n`);

// 1. スキーマ基本チェック
console.log("── Step 1: スキーマ定義チェック");
for (const [key, mfr] of Object.entries(M)) {
  if (!mfr.id)      err(`M.${key}: id が未定義`);
  if (!mfr.name)    err(`M.${key}: name が未定義`);
  if (!mfr.country) err(`M.${key}: country が未定義`);
  if (!mfr.url)     err(`M.${key}: url が未定義`);
  else if (!mfr.url.startsWith("https://")) warn(`M.${key}: url が https:// で始まっていない (${mfr.url})`);
  else ok(`M.${key} OK`);
}
for (const [key, scan] of Object.entries(SCAN)) {
  if (!scan.id)      err(`SCAN.${key}: id が未定義`);
  if (!scan.label)   err(`SCAN.${key}: label が未定義`);
  if (!scan.labelJa) err(`SCAN.${key}: labelJa が未定義`);
  else ok(`SCAN.${key} OK`);
}
for (const [key, cat] of Object.entries(CAT)) {
  if (!cat.id)       err(`CAT.${key}: id が未定義`);
  if (!cat.label)    err(`CAT.${key}: label が未定義`);
  if (!cat.labelJa)  err(`CAT.${key}: labelJa が未定義`);
  else ok(`CAT.${key} OK`);
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

  // --- enum参照チェック（最重要）---
  if (!validManufacturers.has(lidar.manufacturer)) {
    err(`${prefix} manufacturer が schema.js の M.* 定数を参照していない（文字列リテラル等の使用が疑われる）`);
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
  if (typeof lidar.discontinued !== "boolean") err(`${prefix} discontinued が boolean でない`);
  if (!lidar.name || typeof lidar.name !== "string") err(`${prefix} name が文字列でない`);
  if (!lidar.specs || typeof lidar.specs !== "object") err(`${prefix} specs が object でない`);

  // --- specsフィールド ---
  if (lidar.specs) {
    for (const key of REQUIRED_SPEC_KEYS) {
      const spec = lidar.specs[key];
      if (spec === undefined) {
        warn(`${prefix} specs.${key} が未定義（null の場合でも { value: null, refs: [] } を明示すること）`);
      } else {
        if (!Object.prototype.hasOwnProperty.call(spec, "value")) {
          err(`${prefix} specs.${key}: value プロパティが存在しない`);
        }
        if (!Array.isArray(spec.refs)) {
          err(`${prefix} specs.${key}: refs が配列でない`);
        }
      }
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
    const rp = `${prefix} references[${ref.id}]`;
    if (ref.id === undefined) err(`${rp}: id が未定義`);
    if (refIds.has(ref.id)) err(`${rp}: 重複した参考文献ID ${ref.id}`);
    else refIds.add(ref.id);

    if (!ref.url) err(`${rp}: url が未定義`);
    else if (!ref.url.startsWith("https://") && !ref.url.startsWith("http://")) {
      err(`${rp}: url が http(s) スキームでない → "${ref.url}"`);
    }

    if (!ref.title) err(`${rp}: title が未定義`);
    if (!ref.source) err(`${rp}: source が未定義`);
    if (!ref.date) warn(`${rp}: date が未定義（情報確認日を "YYYY-MM" 形式で記録すること）`);
    if (!ref.type) warn(`${rp}: type が未定義（SRC_TYPE.* を使用すること）`);
    else if (!validSrcTypes.has(ref.type)) warn(`${rp}: type "${ref.type}" が SRC_TYPE.* に存在しない`);
  }

  // refs → references[].id 整合性チェック
  for (const key of REQUIRED_SPEC_KEYS) {
    const spec = lidar.specs?.[key];
    if (!spec?.refs) continue;
    for (const refId of spec.refs) {
      if (!refIds.has(refId)) {
        err(`${prefix} specs.${key}.refs[${refId}]: references に id=${refId} が存在しない`);
      }
    }
  }
  if (lidar.release?.refs) {
    for (const refId of lidar.release.refs) {
      if (!refIds.has(refId)) {
        err(`${prefix} release.refs[${refId}]: references に id=${refId} が存在しない`);
      }
    }
  }
}

// 4. 出典なしスペック集計
console.log("\n── Step 4: 出典なしスペック集計（要補完候補）");
const missingRefs = {};
for (const lidar of LIDARS) {
  if (!lidar.specs) continue;
  for (const key of REQUIRED_SPEC_KEYS) {
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
