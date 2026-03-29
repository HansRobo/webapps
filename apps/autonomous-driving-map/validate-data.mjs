// validate-data.mjs
// 自動運転実証実験マップ データ整合性バリデータ
//
// 使い方:
//   node apps/autonomous-driving-map/validate-data.mjs
//   node apps/autonomous-driving-map/validate-data.mjs --verbose
//
// 終了コード:
//   0 = エラーなし（警告があっても OK）
//   1 = エラーあり

import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const verbose = process.argv.includes("--verbose");

// ─── schema.js 読み込み ─────────────────────────────────────────────────────

const schema = require(join(__dir, "schema.js"));
const { STATUS, PREF, VEH, ADS, KNOWN_ORGS, KNOWN_ROLES } = schema;

// ─── data.js 読み込み（Node.js 環境での globals 注入） ───────────────────────

// ブラウザでは schema.js が <script> で先にロードされグローバルになるが、
// Node.js では global に手動で注入する
for (const [k, v] of Object.entries(schema)) {
  global[k] = v;
}

const dataText = readFileSync(join(__dir, "data.js"), "utf-8");
// eval で EXPERIMENTS グローバルを生成
// const は eval スコープに閉じるため、globalThis への代入に変換してから eval する
try {
  const transformed = dataText.replace(/\bconst\s+EXPERIMENTS\s*=/, "globalThis.EXPERIMENTS =");
  eval(transformed); // eslint-disable-line no-eval
} catch (e) {
  console.error(`[FATAL] data.js の読み込みに失敗しました: ${e.message}`);
  process.exit(1);
}

// ─── カウンタ ────────────────────────────────────────────────────────────────

let errors = 0;
let warnings = 0;

function err(msg)  { console.error(`  [ERROR] ${msg}`); errors++; }
function warn(msg) { if (verbose || true) console.warn(`  [WARN]  ${msg}`); warnings++; }
function ok(msg)   { if (verbose) console.log(`  [OK]    ${msg}`); }

// ─── Step 1: スキーマ定義チェック ───────────────────────────────────────────

console.log("\n── Step 1: スキーマ定義チェック ──");

function checkEnumDef(enumObj, name) {
  const ids = new Set();
  for (const [key, val] of Object.entries(enumObj)) {
    if (!val || typeof val !== "object") { err(`${name}.${key}: オブジェクトではありません`); continue; }
    if (!val.id)    err(`${name}.${key}: id が未定義`);
    if (!val.label) err(`${name}.${key}: label が未定義`);
    if (val.id && ids.has(val.id)) err(`${name}: id "${val.id}" が重複しています`);
    if (val.id) ids.add(val.id);
  }
  ok(`${name}: ${Object.keys(enumObj).length} 件 定義済み`);
}

checkEnumDef(STATUS, "STATUS");
checkEnumDef(PREF, "PREF");
checkEnumDef(VEH, "VEH");
checkEnumDef(ADS, "ADS");

// ─── Step 2: エントリ構造チェック ───────────────────────────────────────────

console.log("\n── Step 2: エントリ構造チェック ──");

const validStatuses = new Set(Object.values(STATUS));
const validPrefs    = new Set(Object.values(PREF));
const validVehs     = new Set(Object.values(VEH));
const validAds      = new Set(Object.values(ADS));

const experimentIds = new Set();

const REQUIRED_FIELDS = ["id", "name", "location", "prefecture", "period", "status",
  "description", "vehicle", "adSystem", "route", "operationType", "stakeholders", "references"];

// eslint-disable-next-line no-undef
const experiments = typeof EXPERIMENTS !== "undefined" ? EXPERIMENTS : [];
if (experiments.length === 0) {
  err("EXPERIMENTS が空または未定義です");
}

for (const exp of experiments) {
  const tag = exp.id ?? "(id不明)";

  // 必須フィールドの存在確認
  for (const f of REQUIRED_FIELDS) {
    if (!(f in exp)) err(`${tag}: 必須フィールド "${f}" がありません`);
  }

  // ID の重複チェック
  if (experimentIds.has(exp.id)) err(`${tag}: ID が重複しています`);
  experimentIds.add(exp.id);

  // status のオブジェクト同一性チェック
  if (exp.status && typeof exp.status === "object" && "value" in exp.status) {
    if (!validStatuses.has(exp.status.value)) {
      err(`${tag}: status.value が STATUS に存在しないオブジェクトです（文字列リテラル？）: ${JSON.stringify(exp.status.value)}`);
    }
    if (!Array.isArray(exp.status.refs)) err(`${tag}: status.refs が配列ではありません`);
  } else {
    err(`${tag}: status が {value, refs} 形式ではありません`);
  }

  // prefecture のオブジェクト同一性チェック
  if (exp.prefecture && typeof exp.prefecture === "object" && "value" in exp.prefecture) {
    if (!validPrefs.has(exp.prefecture.value)) {
      err(`${tag}: prefecture.value が PREF に存在しないオブジェクトです: ${JSON.stringify(exp.prefecture.value)}`);
    }
    if (!Array.isArray(exp.prefecture.refs)) err(`${tag}: prefecture.refs が配列ではありません`);
  } else {
    err(`${tag}: prefecture が {value, refs} 形式ではありません`);
  }

  // vehicle のチェック（単一 or 配列）
  const vehicleArr = Array.isArray(exp.vehicle) ? exp.vehicle : exp.vehicle ? [exp.vehicle] : [];
  if (vehicleArr.length === 0) warn(`${tag}: vehicle が空です`);
  for (const v of vehicleArr) {
    if (!v || typeof v !== "object" || !("value" in v)) {
      err(`${tag}: vehicle エントリが {value, refs} 形式ではありません`);
      continue;
    }
    if (!validVehs.has(v.value)) {
      err(`${tag}: vehicle.value が VEH に存在しないオブジェクトです: ${JSON.stringify(v.value)}`);
    }
    if (!Array.isArray(v.refs)) err(`${tag}: vehicle.refs が配列ではありません`);
  }

  // adSystem のチェック（null / 単一 / 配列）
  if (exp.adSystem !== null && exp.adSystem !== undefined) {
    const adsArr = Array.isArray(exp.adSystem) ? exp.adSystem : [exp.adSystem];
    for (const a of adsArr) {
      if (!a || typeof a !== "object" || !("value" in a)) {
        err(`${tag}: adSystem エントリが {value, refs} 形式ではありません`);
        continue;
      }
      if (!validAds.has(a.value)) {
        err(`${tag}: adSystem.value が ADS に存在しないオブジェクトです: ${JSON.stringify(a.value)}`);
      }
      if (!Array.isArray(a.refs)) err(`${tag}: adSystem.refs が配列ではありません`);
    }
  }
}

console.log(`  ${experiments.length} 件チェック完了`);

// ─── Step 3: 参照整合性チェック ──────────────────────────────────────────────

console.log("\n── Step 3: 参照整合性チェック ──");

function collectAllRefs(obj, refsSet, path) {
  if (obj === null || obj === undefined) return;
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => collectAllRefs(item, refsSet, `${path}[${i}]`));
    return;
  }
  if (typeof obj === "object") {
    for (const [key, val] of Object.entries(obj)) {
      if (key === "refs" && Array.isArray(val)) {
        val.forEach((id) => refsSet.add(id));
      } else if (key !== "references") {
        collectAllRefs(val, refsSet, `${path}.${key}`);
      }
    }
  }
}

let refErrors = 0;
let unusedTotal = 0;
let emptyRefsTotal = 0;

for (const exp of experiments) {
  const tag = exp.id ?? "(id不明)";
  const refIds = new Set((exp.references ?? []).map((r) => r.id));

  // reference の重複ID チェック
  const seenRefIds = new Set();
  for (const ref of (exp.references ?? [])) {
    if (seenRefIds.has(ref.id)) { err(`${tag}: references[].id ${ref.id} が重複しています`); refErrors++; }
    seenRefIds.add(ref.id);
    if (!ref.url || !/^https?:\/\//.test(ref.url)) warn(`${tag}: ref[${ref.id}] の url が不正です: ${ref.url}`);
    if (!ref.title) warn(`${tag}: ref[${ref.id}] に title がありません`);
    if (!ref.source) warn(`${tag}: ref[${ref.id}] に source がありません`);
    if (!ref.date) warn(`${tag}: ref[${ref.id}] に date がありません`);
  }

  // 全 refs の収集（references フィールド自体を除く）
  const usedRefs = new Set();
  collectAllRefs(exp, usedRefs, tag);

  // 存在しない ref への参照チェック
  for (const id of usedRefs) {
    if (!refIds.has(id)) { err(`${tag}: refs に ${id} があるが references に存在しません`); refErrors++; }
  }

  // 未使用 references の検出
  for (const id of refIds) {
    if (!usedRefs.has(id)) { warn(`${tag}: references[${id}] が参照されていません（未使用）`); unusedTotal++; }
  }

  // 空 refs の検出
  function findEmptyRefs(obj, path) {
    if (!obj || typeof obj !== "object") return;
    if (Array.isArray(obj)) { obj.forEach((v, i) => findEmptyRefs(v, `${path}[${i}]`)); return; }
    for (const [key, val] of Object.entries(obj)) {
      if (key === "references") continue;
      if (key === "refs" && Array.isArray(val) && val.length === 0) {
        // 値があるのに refs が空の場合のみ警告
        const parentValue = obj.value;
        if (parentValue !== null && parentValue !== undefined) {
          warn(`${tag}: ${path}.refs が空です（出典なし）`);
          emptyRefsTotal++;
        }
      } else {
        findEmptyRefs(val, `${path}.${key}`);
      }
    }
  }
  findEmptyRefs(exp, tag);
}

if (refErrors === 0) ok("参照整合性: エラーなし");

// ─── Step 4: データ品質監査（警告レベル） ────────────────────────────────────

console.log("\n── Step 4: データ品質監査 ──");

const knownOrgsSet  = new Set(KNOWN_ORGS);
const knownRolesSet = new Set(KNOWN_ROLES);
let unknownOrgs  = 0;
let unknownRoles = 0;

// Japan の緯度経度の大まかな範囲
const LAT_MIN = 20, LAT_MAX = 46, LNG_MIN = 122, LNG_MAX = 154;

for (const exp of experiments) {
  const tag = exp.id ?? "(id不明)";

  // GPS 範囲チェック
  if (exp.location) {
    const { lat, lng } = exp.location;
    if (typeof lat !== "number" || lat < LAT_MIN || lat > LAT_MAX) warn(`${tag}: lat=${lat} が日本の範囲外です`);
    if (typeof lng !== "number" || lng < LNG_MIN || lng > LNG_MAX) warn(`${tag}: lng=${lng} が日本の範囲外です`);
  }

  // ステークホルダー組織名チェック
  for (const s of (exp.stakeholders ?? [])) {
    const names = String(s.name ?? "").split(/[、,，/／]/).map((v) => v.trim()).filter(Boolean);
    for (const name of names) {
      if (!knownOrgsSet.has(name)) {
        warn(`${tag}: stakeholder.name "${name}" が KNOWN_ORGS に未登録です（新規組織の場合は schema.js に追加してください）`);
        unknownOrgs++;
      }
    }
    if (s.role && !knownRolesSet.has(s.role)) {
      warn(`${tag}: stakeholder.role "${s.role}" が KNOWN_ROLES に未登録です`);
      unknownRoles++;
    }
  }
}

if (unknownOrgs === 0) ok("KNOWN_ORGS: すべての組織名が登録済みです");
if (unknownRoles === 0) ok("KNOWN_ROLES: すべての役割が登録済みです");

// ─── 結果サマリー ────────────────────────────────────────────────────────────

console.log("\n═══════════════════════════════════════");
console.log(`  エントリ数:    ${experiments.length} 件`);
console.log(`  エラー:        ${errors} 件`);
console.log(`  警告:          ${warnings} 件`);
if (unusedTotal > 0)   console.log(`    うち 未使用 references:  ${unusedTotal} 件`);
if (emptyRefsTotal > 0) console.log(`    うち 空 refs フィールド: ${emptyRefsTotal} 件`);
if (unknownOrgs > 0)   console.log(`    うち 未登録組織名:        ${unknownOrgs} 件`);
if (unknownRoles > 0)  console.log(`    うち 未登録役割:           ${unknownRoles} 件`);
console.log("═══════════════════════════════════════\n");

if (errors > 0) {
  console.error(`[FAIL] ${errors} 件のエラーがあります。data.js または schema.js を修正してください。`);
  process.exit(1);
} else {
  console.log("[OK] バリデーション通過。エラーはありません。");
  process.exit(0);
}
