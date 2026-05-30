// validate-data.mjs
// 「XX百名山」マップ データ整合性バリデータ
//
// 使い方:
//   node apps/hyakumeizan-map/validate-data.mjs
//   node apps/hyakumeizan-map/validate-data.mjs --verbose
//
// 検証対象:
//   - catalog.js（マスター山カタログ。no を持たない山の実体）
//   - lists.js（各「XX百名山」リストのメンバーシップ）
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

// ─── catalog.js / lists.js 読み込み（<script> 同様にグローバルへ展開） ───
function evalGlobal(file, constName, globalName) {
  const text = readFileSync(join(__dir, file), "utf-8");
  try {
    const transformed = text.replace(new RegExp(`\\bconst\\s+${constName}\\s*=`), `globalThis.${globalName} =`);
    eval(transformed); // eslint-disable-line no-eval
  } catch (e) {
    console.error(`[FATAL] ${file} の読み込みに失敗しました: ${e.message}`);
    process.exit(1);
  }
}

evalGlobal("catalog.js", "MOUNTAIN_CATALOG", "MOUNTAIN_CATALOG");
// lists.js は const が2つ（MOUNTAIN_LISTS / DEFAULT_LIST_ID）。両方をグローバル化する。
{
  const text = readFileSync(join(__dir, "lists.js"), "utf-8");
  try {
    const transformed = text
      .replace(/\bconst\s+MOUNTAIN_LISTS\s*=/, "globalThis.MOUNTAIN_LISTS =")
      .replace(/\bconst\s+DEFAULT_LIST_ID\s*=/, "globalThis.DEFAULT_LIST_ID =");
    eval(transformed); // eslint-disable-line no-eval
  } catch (e) {
    console.error(`[FATAL] lists.js の読み込みに失敗しました: ${e.message}`);
    process.exit(1);
  }
}

const MOUNTAIN_CATALOG = globalThis.MOUNTAIN_CATALOG;
const MOUNTAIN_LISTS = globalThis.MOUNTAIN_LISTS;
const DEFAULT_LIST_ID = globalThis.DEFAULT_LIST_ID;

// ─── カウンタ ───
let errors = 0;
let warnings = 0;
const err = (msg) => { console.error(`  [ERROR] ${msg}`); errors++; };
const warn = (msg) => { console.warn(`  [WARN]  ${msg}`); warnings++; };
const ok = (msg) => { if (verbose) console.log(`  [OK]    ${msg}`); };

// ─── 逆引き集合（enum 由来か判定する） ───
const PREF_OBJS = new Set(Object.values(PREF));
const REGION_OBJS = new Set(Object.values(REGION));
const HIRAGANA = /^[ぁ-んー]+$/;

// ════════════════ カタログ検証 ════════════════
console.log("\n── Step 1: カタログ検証 ──");
const catalogIds = new Set();
const catalogNames = new Set();

MOUNTAIN_CATALOG.forEach((m, idx) => {
  const tag = `catalog #${idx + 1} ${m.name ?? "(no name)"}`;

  // id
  if (!m.id) err(`${tag}: id がありません`);
  else if (catalogIds.has(m.id)) err(`${tag}: id が重複しています (${m.id})`);
  else catalogIds.add(m.id);

  // no を持ってはならない（リスト側で持つ）
  if ("no" in m) err(`${tag}: catalog は no を持ってはいけません（lists.js の members で持つ）`);

  // name（カタログ内ユニーク。同名・別座は識別可能名にすること）
  if (!m.name) err(`${tag}: name がありません`);
  else if (catalogNames.has(m.name)) err(`${tag}: 山名が重複しています (${m.name})。識別可能名にしてください`);
  else catalogNames.add(m.name);

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

  ok(tag);
});
ok(`カタログ ${MOUNTAIN_CATALOG.length} 座`);

// ════════════════ リスト検証 ════════════════
console.log("\n── Step 2: リスト検証 ──");
const SLUG = /^[a-z0-9-]+$/;
const listIds = new Set();
const referencedIds = new Set();

if (!Array.isArray(MOUNTAIN_LISTS) || MOUNTAIN_LISTS.length === 0) {
  err("MOUNTAIN_LISTS が空です");
}

MOUNTAIN_LISTS.forEach((list, li) => {
  const ltag = `list #${li + 1} ${list.id ?? "(no id)"}`;

  // id（スラッグ・ユニーク）
  if (!list.id) err(`${ltag}: id がありません`);
  else if (!SLUG.test(list.id)) err(`${ltag}: id がスラッグ形式(^[a-z0-9-]+$)ではありません`);
  else if (listIds.has(list.id)) err(`${ltag}: list id が重複しています (${list.id})`);
  else listIds.add(list.id);

  // label
  if (!list.label) err(`${ltag}: label がありません`);

  // members
  if (!Array.isArray(list.members) || list.members.length === 0) {
    err(`${ltag}: members が空です`);
    return;
  }

  const seenId = new Set();
  const seenNo = new Set();
  list.members.forEach((mem, i) => {
    const tag = `${ltag} member#${i + 1}`;
    // id が catalog に存在
    if (!mem.id) err(`${tag}: id がありません`);
    else if (!catalogIds.has(mem.id)) err(`${tag}: catalog に存在しない id (${mem.id})`);
    else referencedIds.add(mem.id);
    // member id 重複
    if (mem.id && seenId.has(mem.id)) err(`${tag}: member id がリスト内で重複 (${mem.id})`);
    else if (mem.id) seenId.add(mem.id);
    // no
    if (typeof mem.no !== "number") err(`${tag}: no が数値ではありません`);
    else if (seenNo.has(mem.no)) err(`${tag}: no がリスト内で重複 (${mem.no})`);
    else seenNo.add(mem.no);
  });

  // no 連番（1..members.length）
  for (let n = 1; n <= list.members.length; n++) {
    if (!seenNo.has(n)) err(`${ltag}: no=${n} が欠番です（1〜${list.members.length} が揃うべき）`);
  }

  // total（任意）
  if (list.total != null && list.total !== list.members.length) {
    err(`${ltag}: total=${list.total} と members 件数 ${list.members.length} が一致しません`);
  }

  ok(`${ltag}: ${list.members.length} 座`);
});

// ════════════════ 横断検証 ════════════════
console.log("\n── Step 3: 横断検証 ──");

// DEFAULT_LIST_ID 実在
if (!listIds.has(DEFAULT_LIST_ID)) {
  err(`DEFAULT_LIST_ID="${DEFAULT_LIST_ID}" が MOUNTAIN_LISTS に存在しません`);
} else {
  ok(`DEFAULT_LIST_ID="${DEFAULT_LIST_ID}"`);
}

// hyakumeizan 移行回帰防止: m001..m100 / no 1..100
const hyaku = MOUNTAIN_LISTS.find((l) => l.id === "hyakumeizan");
if (!hyaku) {
  warn("hyakumeizan リストが見つかりません（移行回帰チェックをスキップ）");
} else {
  let okMigration = hyaku.members.length === 100;
  if (!okMigration) err(`hyakumeizan は100座であるべきですが ${hyaku.members.length} 件です`);
  for (const mem of hyaku.members) {
    const expectId = `m${String(mem.no).padStart(3, "0")}`;
    if (mem.id !== expectId) {
      err(`hyakumeizan: no=${mem.no} は id="${expectId}" であるべきですが "${mem.id}" です`);
      okMigration = false;
    }
  }
  if (okMigration) ok("hyakumeizan は m001..m100 / no 1..100");
}

// 孤児カタログ（どのリストからも参照されない）→ warn
for (const id of catalogIds) {
  if (!referencedIds.has(id)) warn(`catalog ${id} はどのリストからも参照されていません`);
}

// ─── 結果 ───
console.log(`\n── 結果 ── エラー: ${errors} / 警告: ${warnings}`);
process.exit(errors > 0 ? 1 : 0);
