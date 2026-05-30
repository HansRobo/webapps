// validate-data.mjs
// 「XX百名山」マップ データ整合性バリデータ
//
// 使い方:
//   node apps/hyakumeizan-map/validate-data.mjs
//   node apps/hyakumeizan-map/validate-data.mjs --verbose
//
// 検証対象:
//   - catalog.js（MOUNTAIN enum。山の実体。no を持たない）
//   - lists.js（各「XX百名山」リスト。members は MOUNTAIN シンボルを参照）
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
for (const [k, v] of Object.entries(schema)) global[k] = v;

// ─── catalog.js（MOUNTAIN / MOUNTAIN_CATALOG をグローバル化して eval） ───
{
  const text = readFileSync(join(__dir, "catalog.js"), "utf-8");
  try {
    // MOUNTAIN enum 定義だけを評価（MOUNTAIN_CATALOG/exports 行は切り出してグローバルから導出）
    const head = text.slice(0, text.indexOf("const MOUNTAIN_CATALOG"));
    const transformed = head.replace(/\bconst\s+MOUNTAIN\s*=/, "globalThis.MOUNTAIN =");
    eval(transformed); // eslint-disable-line no-eval
    globalThis.MOUNTAIN_CATALOG = Object.values(globalThis.MOUNTAIN);
  } catch (e) {
    console.error(`[FATAL] catalog.js の読み込みに失敗しました: ${e.message}`);
    process.exit(1);
  }
}
// ─── lists.js（MOUNTAIN_LISTS / DEFAULT_LIST_ID をグローバル化して eval） ───
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

// 注意: eval されるデータ側コードが bare 識別子 MOUNTAIN を参照するため、
// モジュール側で同名 const を宣言すると TDZ で衝突する。別名で受ける。
const ENUM = globalThis.MOUNTAIN;
const MOUNTAIN_CATALOG = globalThis.MOUNTAIN_CATALOG;
const MOUNTAIN_LISTS = globalThis.MOUNTAIN_LISTS;
const DEFAULT_LIST_ID = globalThis.DEFAULT_LIST_ID;

let errors = 0, warnings = 0;
const err = (msg) => { console.error(`  [ERROR] ${msg}`); errors++; };
const warn = (msg) => { console.warn(`  [WARN]  ${msg}`); warnings++; };
const ok = (msg) => { if (verbose) console.log(`  [OK]    ${msg}`); };

const PREF_OBJS = new Set(Object.values(PREF));
const REGION_OBJS = new Set(Object.values(REGION));
const HIRAGANA = /^[ぁ-んー]+$/;

// ════════════════ カタログ検証 ════════════════
console.log("\n── Step 1: カタログ（MOUNTAIN enum）検証 ──");
const catalogIds = new Set();
const names = new Set();          // name と alias を合わせた表記の集合（一意性）
const catalogSet = new Set(MOUNTAIN_CATALOG);

if (Object.keys(ENUM).length !== MOUNTAIN_CATALOG.length) {
  err(`MOUNTAIN のキー数 (${Object.keys(ENUM).length}) と MOUNTAIN_CATALOG 件数 (${MOUNTAIN_CATALOG.length}) が一致しません`);
}

for (const [key, m] of Object.entries(ENUM)) {
  const tag = `${key} (${m && m.name ? m.name : "?"})`;

  if (!/^[A-Z][A-Z0-9_]*$/.test(key)) err(`${tag}: enum キーが英大文字記号ではありません`);

  // id
  if (!m.id) err(`${tag}: id がありません`);
  else if (catalogIds.has(m.id)) err(`${tag}: id が重複しています (${m.id})`);
  else catalogIds.add(m.id);

  // no を持ってはならない
  if ("no" in m) err(`${tag}: catalog は no を持ってはいけません（lists.js の members で持つ）`);

  // name（主名はカタログ内で一意であること = 大山問題の防止）
  // ※ aliases は一意でなくてよい（剣ヶ峰・天狗岳・朝日岳など総称名や識別名の共有を許す）
  if (!m.name) err(`${tag}: name がありません`);
  else if (names.has(m.name)) err(`${tag}: 主名が重複しています (${m.name})。識別可能名にしてください`);
  else names.add(m.name);

  // aliases（任意。空でない文字列の配列。重複は許容＝検索用の別表記）
  if (m.aliases !== undefined) {
    if (!Array.isArray(m.aliases)) err(`${tag}: aliases が配列ではありません`);
    else m.aliases.forEach((a) => {
      if (typeof a !== "string" || !a) err(`${tag}: aliases に空でない文字列以外が含まれます`);
      else if (a === m.name) warn(`${tag}: alias "${a}" が自身の name と同じです`);
    });
  }

  // reading
  if (!m.reading) err(`${tag}: reading がありません`);
  else if (!HIRAGANA.test(m.reading)) warn(`${tag}: reading がひらがなではありません (${m.reading})`);

  // elevation
  if (typeof m.elevation !== "number" || m.elevation <= 0) err(`${tag}: elevation が正の数ではありません (${m.elevation})`);

  // prefectures
  if (!Array.isArray(m.prefectures) || m.prefectures.length === 0) err(`${tag}: prefectures が空です`);
  else m.prefectures.forEach((p) => { if (!PREF_OBJS.has(p)) err(`${tag}: prefectures に schema.PREF 以外の値があります`); });

  // region
  if (!REGION_OBJS.has(m.region)) err(`${tag}: region が schema.REGION の値ではありません`);

  // 座標（日本国内レンジ）
  if (typeof m.lat !== "number" || m.lat < 24 || m.lat > 46) err(`${tag}: lat が日本国内の範囲(24〜46)外です (${m.lat})`);
  if (typeof m.lng !== "number" || m.lng < 122 || m.lng > 154) err(`${tag}: lng が日本国内の範囲(122〜154)外です (${m.lng})`);

  if (!m.source) warn(`${tag}: source がありません`);
  ok(tag);
}
ok(`カタログ ${MOUNTAIN_CATALOG.length} 座`);

// ════════════════ リスト検証 ════════════════
console.log("\n── Step 2: リスト検証 ──");
const SLUG = /^[a-z0-9-]+$/;
const listIds = new Set();
const referenced = new Set();

if (!Array.isArray(MOUNTAIN_LISTS) || MOUNTAIN_LISTS.length === 0) err("MOUNTAIN_LISTS が空です");

MOUNTAIN_LISTS.forEach((list, li) => {
  const ltag = `list #${li + 1} ${list.id ?? "(no id)"}`;
  if (!list.id) err(`${ltag}: id がありません`);
  else if (!SLUG.test(list.id)) err(`${ltag}: id がスラッグ形式(^[a-z0-9-]+$)ではありません`);
  else if (listIds.has(list.id)) err(`${ltag}: list id が重複しています (${list.id})`);
  else listIds.add(list.id);
  if (!list.label) err(`${ltag}: label がありません`);

  if (!Array.isArray(list.members) || list.members.length === 0) { err(`${ltag}: members が空です`); return; }

  const seenId = new Set(), seenNo = new Set();
  list.members.forEach((mem, i) => {
    const tag = `${ltag} member#${i + 1}`;
    const mt = mem && mem.m;
    if (!mt || !catalogSet.has(mt)) { err(`${tag}: m が MOUNTAIN の要素を参照していません`); }
    else {
      if (seenId.has(mt.id)) err(`${tag}: member が重複 (${mt.id})`); else seenId.add(mt.id);
      referenced.add(mt.id);
    }
    if (typeof mem.no !== "number") err(`${tag}: no が数値ではありません`);
    else if (seenNo.has(mem.no)) err(`${tag}: no がリスト内で重複 (${mem.no})`); else seenNo.add(mem.no);
  });

  for (let n = 1; n <= list.members.length; n++) if (!seenNo.has(n)) err(`${ltag}: no=${n} が欠番です（1〜${list.members.length}）`);
  if (list.total != null && list.total !== list.members.length) err(`${ltag}: total=${list.total} と members 件数 ${list.members.length} が不一致`);
  ok(`${ltag}: ${list.members.length} 座`);
});

// ════════════════ 横断検証 ════════════════
console.log("\n── Step 3: 横断検証 ──");
if (!listIds.has(DEFAULT_LIST_ID)) err(`DEFAULT_LIST_ID="${DEFAULT_LIST_ID}" が MOUNTAIN_LISTS に存在しません`);
else ok(`DEFAULT_LIST_ID="${DEFAULT_LIST_ID}"`);

const hyaku = MOUNTAIN_LISTS.find((l) => l.id === "hyakumeizan");
if (!hyaku) warn("hyakumeizan リストが見つかりません");
else {
  let good = hyaku.members.length === 100;
  if (!good) err(`hyakumeizan は100座であるべきですが ${hyaku.members.length} 件です`);
  for (const mem of hyaku.members) {
    const expect = `m${String(mem.no).padStart(3, "0")}`;
    if (!mem.m || mem.m.id !== expect) { err(`hyakumeizan: no=${mem.no} は id="${expect}" であるべき`); good = false; }
  }
  if (good) ok("hyakumeizan は m001..m100 / no 1..100");
}

for (const id of catalogIds) if (!referenced.has(id)) warn(`catalog ${id} はどのリストからも参照されていません`);

console.log(`\n── 結果 ── エラー: ${errors} / 警告: ${warnings}`);
process.exit(errors > 0 ? 1 : 0);
