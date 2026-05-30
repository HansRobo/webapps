// validate-data.mjs
// 日本百名山マップ データ整合性バリデータ
//
// 使い方:
//   node apps/hyakumeizan-map/validate-data.mjs
//   node apps/hyakumeizan-map/validate-data.mjs --verbose
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

// ─── schema.js 読み込み ───
const schema = require(join(__dir, "schema.js"));
const { PREF, REGION } = schema;

// ブラウザでは <script> でグローバルになるが、Node.js では手動注入する
for (const [k, v] of Object.entries(schema)) {
  global[k] = v;
}

// ─── data.js 読み込み ───
const dataText = readFileSync(join(__dir, "data.js"), "utf-8");
try {
  const transformed = dataText.replace(/\bconst\s+MOUNTAINS\s*=/, "globalThis.MOUNTAINS =");
  eval(transformed); // eslint-disable-line no-eval
} catch (e) {
  console.error(`[FATAL] data.js の読み込みに失敗しました: ${e.message}`);
  process.exit(1);
}

const MOUNTAINS = globalThis.MOUNTAINS;

// ─── カウンタ ───
let errors = 0;
let warnings = 0;
const err = (msg) => { console.error(`  [ERROR] ${msg}`); errors++; };
const warn = (msg) => { console.warn(`  [WARN]  ${msg}`); warnings++; };
const ok = (msg) => { if (verbose) console.log(`  [OK]    ${msg}`); };

// ─── 逆引き集合（enum 由来か判定する） ───
const PREF_OBJS = new Set(Object.values(PREF));
const REGION_OBJS = new Set(Object.values(REGION));

// ─── Step 1: 件数 ───
console.log("\n── Step 1: 件数チェック ──");
if (MOUNTAINS.length !== 100) {
  err(`百名山は100座であるべきですが ${MOUNTAINS.length} 件です`);
} else {
  ok("100座");
}

// ─── Step 2: 各エントリ ───
console.log("\n── Step 2: エントリ検証 ──");
const ids = new Set();
const nos = new Set();
const names = new Set();
const HIRAGANA = /^[ぁ-んー]+$/;

MOUNTAINS.forEach((m, idx) => {
  const tag = `#${idx + 1} ${m.name ?? "(no name)"}`;

  // id
  if (!m.id) err(`${tag}: id がありません`);
  else if (ids.has(m.id)) err(`${tag}: id が重複しています (${m.id})`);
  else ids.add(m.id);

  // no
  if (typeof m.no !== "number") err(`${tag}: no が数値ではありません`);
  else if (nos.has(m.no)) err(`${tag}: no が重複しています (${m.no})`);
  else nos.add(m.no);

  // name
  if (!m.name) err(`${tag}: name がありません`);
  else if (names.has(m.name)) err(`${tag}: 山名が重複しています (${m.name})`);
  else names.add(m.name);

  // reading（ひらがな）
  if (!m.reading) err(`${tag}: reading がありません`);
  else if (!HIRAGANA.test(m.reading)) warn(`${tag}: reading がひらがなではありません (${m.reading})`);

  // elevation
  if (typeof m.elevation !== "number" || m.elevation <= 0) {
    err(`${tag}: elevation が正の数ではありません (${m.elevation})`);
  }

  // prefectures（PREF 由来か）
  if (!Array.isArray(m.prefectures) || m.prefectures.length === 0) {
    err(`${tag}: prefectures が空です`);
  } else {
    m.prefectures.forEach((p) => {
      if (!PREF_OBJS.has(p)) err(`${tag}: prefectures に schema.PREF 以外の値があります`);
    });
  }

  // region（REGION 由来か）
  if (!REGION_OBJS.has(m.region)) err(`${tag}: region が schema.REGION の値ではありません`);

  // 座標（日本国内レンジ）
  if (typeof m.lat !== "number" || m.lat < 24 || m.lat > 46) {
    err(`${tag}: lat が日本国内の範囲(24〜46)外です (${m.lat})`);
  }
  if (typeof m.lng !== "number" || m.lng < 122 || m.lng > 154) {
    err(`${tag}: lng が日本国内の範囲(122〜154)外です (${m.lng})`);
  }

  // source
  if (!m.source) warn(`${tag}: source がありません`);

  if (!verbose) return;
  ok(tag);
});

// ─── Step 3: no の連番 ───
console.log("\n── Step 3: no 連番チェック ──");
for (let i = 1; i <= 100; i++) {
  if (!nos.has(i)) err(`no=${i} が欠番です`);
}
if (errors === 0) ok("1〜100 が揃っています");

// ─── 結果 ───
console.log(`\n── 結果 ── エラー: ${errors} / 警告: ${warnings}`);
process.exit(errors > 0 ? 1 : 0);
