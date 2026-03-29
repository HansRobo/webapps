#!/usr/bin/env node
// check-sources.mjs — 参考文献URLの死活チェック・鮮度レポート
//
// 使い方:
//   node apps/lidar-catalog/check-sources.mjs                  # 全エントリ
//   node apps/lidar-catalog/check-sources.mjs --product hesai-at128
//   node apps/lidar-catalog/check-sources.mjs --stale 12       # 12ヶ月以上前を旧情報として扱う
//   node apps/lidar-catalog/check-sources.mjs --no-fetch       # URL確認をスキップ（構造チェックのみ）
//
// 出力:
//   - 404 / リダイレクト が発生した参考文献の一覧
//   - 指定した月数より古い参考文献の一覧（エージェントが優先的に再確認すべき対象）
//   - 出典が product-page でない（優先度低い可能性）参考文献の一覧
//
// エージェント向け注意:
//   このスクリプトの出力を参考に、一次情報ページ（type: "product-page"）を
//   manufacturer.url から辿って最新スペックを確認すること。

import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";
import https from "https";
import http from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const args = process.argv.slice(2);
const productFilter = args.includes("--product") ? args[args.indexOf("--product") + 1] : null;
const staleMonths = args.includes("--stale") ? parseInt(args[args.indexOf("--stale") + 1], 10) : 18;
const noFetch = args.includes("--no-fetch");

// schema.js をロード
const schema = require(path.join(__dirname, "schema.js"));
const { M, SCAN, CAT, WAVE, SRC_TYPE } = schema;
Object.assign(global, { M, SCAN, CAT, WAVE, SRC_TYPE });

const { LIDARS } = require(path.join(__dirname, "data.js"));

// ────────────────────────────────────────────
// ユーティリティ
// ────────────────────────────────────────────

function fetchHead(url, timeout = 8000) {
  return new Promise((resolve) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.request(url, { method: "HEAD", timeout }, res => {
      resolve({ status: res.statusCode, redirected: res.statusCode >= 300 && res.statusCode < 400 });
    });
    req.on("error", () => resolve({ status: "ERROR", redirected: false }));
    req.on("timeout", () => { req.destroy(); resolve({ status: "TIMEOUT", redirected: false }); });
    req.end();
  });
}

function monthsAgo(dateStr) {
  if (!dateStr) return Infinity;
  const [year, month] = dateStr.split("-").map(Number);
  if (!year) return Infinity;
  const ref = new Date(year, (month ?? 1) - 1, 1);
  const now = new Date();
  return (now.getFullYear() - ref.getFullYear()) * 12 + (now.getMonth() - ref.getMonth());
}

// ────────────────────────────────────────────
// メイン処理
// ────────────────────────────────────────────

const targets = productFilter ? LIDARS.filter(l => l.id === productFilter) : LIDARS;

if (targets.length === 0) {
  console.error(`❌ 製品が見つかりません: ${productFilter}`);
  process.exit(1);
}

console.log(`\n🔗 LiDARカタログ 参考文献チェック`);
console.log(`   対象: ${targets.length}件のLiDAR（全${LIDARS.length}件中）`);
console.log(`   旧情報判定: ${staleMonths}ヶ月以上前`);
if (noFetch) console.log("   ⚠️  --no-fetch モード: URL確認をスキップ\n");

// 全参考文献を収集（重複URLをまとめる）
const allRefs = [];
for (const lidar of targets) {
  for (const ref of (lidar.references ?? [])) {
    allRefs.push({ ...ref, lidarId: lidar.id, lidarName: lidar.name, manufacturer: lidar.manufacturer.name });
  }
}

const uniqueUrls = [...new Set(allRefs.map(r => r.url))];
console.log(`   参考文献URL: ${allRefs.length}件（ユニーク: ${uniqueUrls.length}件）\n`);

// URL死活チェック
const urlResults = {};
if (!noFetch) {
  console.log("── URL死活チェック中...");
  for (const url of uniqueUrls) {
    process.stdout.write(`  ${url.substring(0, 60).padEnd(60)} `);
    const result = await fetchHead(url);
    urlResults[url] = result;
    if (result.status === 200) {
      process.stdout.write(`✓ ${result.status}\n`);
    } else if (result.status === "ERROR" || result.status === "TIMEOUT") {
      process.stdout.write(`✗ ${result.status}\n`);
    } else {
      process.stdout.write(`! ${result.status}\n`);
    }
  }
}

// ────────────────────────────────────────────
// レポート生成
// ────────────────────────────────────────────

console.log("\n" + "═".repeat(60));
console.log("📊 チェック結果レポート");
console.log("═".repeat(60));

// 1. 問題あるURL
const problemRefs = allRefs.filter(ref => {
  const r = urlResults[ref.url];
  return r && r.status !== 200 && r.status !== undefined;
});

if (!noFetch && problemRefs.length > 0) {
  console.log(`\n❌ 問題のある参考文献URL (${problemRefs.length}件):`);
  for (const ref of problemRefs) {
    const r = urlResults[ref.url];
    console.log(`  [${ref.lidarId}] ${ref.title}`);
    console.log(`    URL:    ${ref.url}`);
    console.log(`    Status: ${r.status}${r.redirected ? " (リダイレクト)" : ""}`);
    console.log(`    代替:   ${ref.manufacturer}公式サイトで再検索してください`);
  }
} else if (!noFetch) {
  console.log("\n✅ 問題のある参考文献URL: なし");
}

// 2. 古い参考文献
const staleRefs = allRefs.filter(ref => monthsAgo(ref.date) >= staleMonths);
if (staleRefs.length > 0) {
  console.log(`\n⏰ 旧情報の可能性（${staleMonths}ヶ月以上前）: ${staleRefs.length}件`);
  console.log("   エージェントが優先的に再確認すべき参考文献:");
  for (const ref of staleRefs.sort((a, b) => monthsAgo(b.date) - monthsAgo(a.date))) {
    const ago = monthsAgo(ref.date);
    console.log(`  [${ref.lidarId}] (${ref.date ?? "日付不明"} / 約${ago}ヶ月前)`);
    console.log(`    ${ref.title}`);
    console.log(`    → ${ref.url}`);
    console.log(`    → 再確認起点: ${ref.manufacturer}公式サイト`);
  }
} else {
  console.log(`\n✅ 旧情報（${staleMonths}ヶ月以上前）: なし`);
}

// 3. product-page 以外が主な参考文献になっているエントリ
const nonPrimaryRefs = targets.filter(lidar => {
  const refs = lidar.references ?? [];
  return refs.length > 0 && !refs.some(r => r.type === SRC_TYPE.PRODUCT_PAGE || r.type === SRC_TYPE.DATASHEET || r.type === SRC_TYPE.SPEC_SHEET);
});
if (nonPrimaryRefs.length > 0) {
  console.log(`\n⚠️  一次情報なし（product-page/datasheet/spec-sheet が未登録）: ${nonPrimaryRefs.length}件`);
  for (const lidar of nonPrimaryRefs) {
    console.log(`  [${lidar.id}] ${lidar.manufacturer.name} ${lidar.name}`);
    console.log(`    → 公式製品ページ: ${lidar.manufacturer.url}`);
  }
} else {
  console.log("\n✅ 全エントリに一次情報参照あり");
}

// 4. references が空のエントリ
const noRefs = targets.filter(lidar => !lidar.references || lidar.references.length === 0);
if (noRefs.length > 0) {
  console.log(`\n⚠️  参考文献が空のエントリ: ${noRefs.length}件`);
  for (const lidar of noRefs) {
    console.log(`  [${lidar.id}] ${lidar.manufacturer.name} ${lidar.name}`);
    console.log(`    → 追加起点: ${lidar.manufacturer.url}`);
  }
}

// 5. 統計サマリー
console.log("\n" + "─".repeat(60));
console.log("📈 統計サマリー");
console.log(`  総エントリ数:         ${targets.length}件`);
console.log(`  総参考文献数:         ${allRefs.length}件`);
console.log(`  product-page 参照数:  ${allRefs.filter(r => r.type === SRC_TYPE.PRODUCT_PAGE).length}件`);
console.log(`  datasheet 参照数:     ${allRefs.filter(r => r.type === SRC_TYPE.DATASHEET).length}件`);
console.log(`  press-release 参照数: ${allRefs.filter(r => r.type === SRC_TYPE.PRESS_RELEASE).length}件`);

// エージェント向けアクションリスト
console.log("\n" + "═".repeat(60));
console.log("🤖 エージェント向け優先アクションリスト");
console.log("─".repeat(60));
const actions = [];

if (!noFetch && problemRefs.length > 0) {
  actions.push(`1. 問題URLを修正: ${problemRefs.map(r => r.lidarId).join(", ")}`);
}
if (staleRefs.length > 0) {
  const topStale = staleRefs.slice(0, 5).map(r => r.lidarId).join(", ");
  actions.push(`${actions.length + 1}. 旧情報を再確認 (優先): ${topStale}${staleRefs.length > 5 ? ` 他${staleRefs.length - 5}件` : ""}`);
}
if (noRefs.length > 0) {
  actions.push(`${actions.length + 1}. 参考文献追加: ${noRefs.map(l => l.id).join(", ")}`);
}

if (actions.length === 0) {
  console.log("  ✅ 現時点で優先アクションなし");
} else {
  for (const action of actions) {
    console.log(`  ${action}`);
  }
}
console.log("");
