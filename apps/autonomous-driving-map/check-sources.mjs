// check-sources.mjs
// 自動運転実証実験マップ 参考文献の死活チェック・鮮度監査
//
// 使い方:
//   node apps/autonomous-driving-map/check-sources.mjs             # URL確認あり
//   node apps/autonomous-driving-map/check-sources.mjs --no-fetch  # 構造チェックのみ
//   node apps/autonomous-driving-map/check-sources.mjs --stale 12  # 最終確認が12ヶ月以上前、または日時なしを検出
//   node apps/autonomous-driving-map/check-sources.mjs --exp exp-001  # 単体確認

import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const args = process.argv.slice(2);
const noFetch   = args.includes("--no-fetch");
const staleIdx  = args.indexOf("--stale");
const staleMonths = staleIdx >= 0 ? parseInt(args[staleIdx + 1], 10) : 18;
const expIdx    = args.indexOf("--exp");
const targetExp = expIdx >= 0 ? args[expIdx + 1] : null;

// schema.js 読み込み
const schema = require(join(__dir, "schema.js"));
for (const [k, v] of Object.entries(schema)) global[k] = v;

// data.js 読み込み
const dataText = readFileSync(join(__dir, "data.js"), "utf-8");
eval(dataText.replace(/\bconst\s+EXPERIMENTS\s*=/, "globalThis.EXPERIMENTS =")); // eslint-disable-line no-eval

const experiments = globalThis.EXPERIMENTS ?? [];
const targets = targetExp ? experiments.filter((e) => e.id === targetExp) : experiments;

if (targetExp && targets.length === 0) {
  console.error(`[ERROR] exp "${targetExp}" が見つかりません`);
  process.exit(1);
}

// ─── ヘルパー ─────────────────────────────────────────────────────────────────

function monthsAgo(dateStr) {
  if (!dateStr) return Infinity;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return Infinity;
  const now = new Date();
  return (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
}

async function checkUrl(url, timeout = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { method: "HEAD", signal: controller.signal, redirect: "manual" });
    clearTimeout(timer);
    return { status: res.status, ok: res.ok, redirect: [301, 302, 307, 308].includes(res.status) };
  } catch (e) {
    clearTimeout(timer);
    return { status: 0, ok: false, error: e.name === "AbortError" ? "timeout" : e.message };
  }
}

// ─── 集計 ─────────────────────────────────────────────────────────────────────

const urlMap = new Map(); // url → [{expId, refId}]
const staleRefs = [];
const missingCheckedAtRefs = [];
const missingDateRefs = [];

for (const exp of targets) {
  for (const ref of (exp.references ?? [])) {
    if (ref.url) {
      if (!urlMap.has(ref.url)) urlMap.set(ref.url, []);
      urlMap.get(ref.url).push({ expId: exp.id, refId: ref.id });
    }
    const age = monthsAgo(ref.checkedAt);
    if (age > staleMonths) staleRefs.push({ expId: exp.id, refId: ref.id, checkedAt: ref.checkedAt, age, url: ref.url });
    if (!ref.checkedAt) missingCheckedAtRefs.push({ expId: exp.id, refId: ref.id });
    if (!ref.date) missingDateRefs.push({ expId: exp.id, refId: ref.id });
  }
}

console.log(`\n── 参考文献 URL チェック (${targets.length} 件の実験 / ${urlMap.size} 件のURL) ──\n`);

// ─── URL 死活チェック ──────────────────────────────────────────────────────────

const results = { ok: [], redirect: [], notFound: [], error: [] };

if (!noFetch) {
  const CONCURRENCY = 5;
  const urls = [...urlMap.keys()];
  let i = 0;
  process.stdout.write("URL確認中");

  async function worker() {
    while (i < urls.length) {
      const url = urls[i++];
      const res = await checkUrl(url);
      const refs = urlMap.get(url);
      const entry = { url, refs, ...res };
      if (res.redirect) results.redirect.push(entry);
      else if (res.ok) results.ok.push(entry);
      else if (res.status === 404 || res.status === 410) results.notFound.push(entry);
      else results.error.push(entry);
      process.stdout.write(".");
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(" 完了\n");

  if (results.notFound.length > 0) {
    console.log(`[404/410] ${results.notFound.length} 件のURLが無効です:`);
    for (const { url, refs, status } of results.notFound) {
      console.log(`  ${status} ${url}`);
      refs.forEach(({ expId, refId }) => console.log(`    → ${expId} ref[${refId}]`));
    }
  }
  if (results.redirect.length > 0) {
    console.log(`\n[REDIRECT] ${results.redirect.length} 件のURLがリダイレクトされています:`);
    for (const { url, refs, status } of results.redirect) {
      console.log(`  ${status} ${url}`);
      refs.forEach(({ expId, refId }) => console.log(`    → ${expId} ref[${refId}]`));
    }
  }
  if (results.error.length > 0) {
    console.log(`\n[ERROR] ${results.error.length} 件のURLでエラーが発生しました:`);
    for (const { url, refs, error, status } of results.error) {
      console.log(`  ${status || error} ${url}`);
      refs.forEach(({ expId, refId }) => console.log(`    → ${expId} ref[${refId}]`));
    }
  }
  console.log(`\n[OK] ${results.ok.length} 件 / リダイレクト ${results.redirect.length} 件 / 無効 ${results.notFound.length} 件 / エラー ${results.error.length} 件`);
} else {
  console.log(`[SKIP] --no-fetch 指定のため URL チェックをスキップします（${urlMap.size} 件）`);
}

// ─── 鮮度チェック ─────────────────────────────────────────────────────────────

if (staleRefs.length > 0) {
  console.log(`\n── 要チェック参照（最終確認が ${staleMonths}ヶ月以上前、または日時なし）: ${staleRefs.length} 件 ──`);
  staleRefs.sort((a, b) => b.age - a.age);
  for (const { expId, refId, checkedAt, age } of staleRefs.slice(0, 20)) {
    console.log(`  ${expId} ref[${refId}]: ${checkedAt ?? "チェック日時なし"} (${age === Infinity ? "要チェック" : age + "ヶ月前"})`);
  }
  if (staleRefs.length > 20) console.log(`  ... 他 ${staleRefs.length - 20} 件`);
}

if (missingCheckedAtRefs.length > 0) {
  console.log(`\n── チェック日時なしの参照: ${missingCheckedAtRefs.length} 件 ──`);
  for (const { expId, refId } of missingCheckedAtRefs.slice(0, 10)) {
    console.log(`  ${expId} ref[${refId}]`);
  }
  if (missingCheckedAtRefs.length > 10) console.log(`  ... 他 ${missingCheckedAtRefs.length - 10} 件`);
}

if (missingDateRefs.length > 0) {
  console.log(`\n── 公開日なしの参照: ${missingDateRefs.length} 件 ──`);
  for (const { expId, refId } of missingDateRefs.slice(0, 10)) {
    console.log(`  ${expId} ref[${refId}]`);
  }
}

// ─── エージェント向けアクションリスト ────────────────────────────────────────

console.log("\n════════════════════════════════════════════");
console.log("  エージェントへのアクションリスト");
console.log("════════════════════════════════════════════");

const actions = [];

if (!noFetch) {
  results.notFound.forEach(({ refs }) =>
    refs.forEach(({ expId }) => actions.push(`[要修正] ${expId}: 404/410 URLを新しいリンクに更新`))
  );
  results.error.forEach(({ refs }) =>
    refs.forEach(({ expId }) => actions.push(`[要確認] ${expId}: URL取得エラー（手動確認が必要）`))
  );
}

missingCheckedAtRefs.slice(0, 10).forEach(({ expId, refId }) =>
  actions.push(`[要チェック] ${expId} ref[${refId}]: 一次情報を確認し checkedAt を更新`)
);

staleRefs.filter(({ checkedAt }) => checkedAt).slice(0, 10).forEach(({ expId, refId }) =>
  actions.push(`[鮮度更新] ${expId} ref[${refId}]: ${staleMonths}ヶ月以上前に確認した一次情報を再確認`)
);

missingDateRefs.slice(0, 10).forEach(({ expId, refId }) =>
  actions.push(`[公開日追加] ${expId} ref[${refId}]: date フィールドを追加`)
);

if (actions.length === 0) {
  console.log("  対応が必要なアクションはありません。");
} else {
  const unique = [...new Set(actions)];
  unique.forEach((a) => console.log(`  • ${a}`));
}
console.log("════════════════════════════════════════════\n");
