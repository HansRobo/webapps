// consolidate-results.mjs
// 複数の検証結果JSON（pilot/salvage/redo/batch3/batch4/adv-rerun 等）を expId でユニーク化して統合する。
// 各 expId について「最も情報が豊富な」エントリを採用する:
//   score = (verifyあり?1:0) + (実adversarialあり?1:0)、同点は後ろのファイル（引数の後方）を優先。
//
// 使い方: node consolidate-results.mjs <file1> <file2> ... （precedence 低→高の順で渡す）
// 出力: research/content-verification-all.json と、カバレッジ/adv欠落の集計

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const files = process.argv.slice(2);
if (files.length === 0) { console.error("結果JSONを1つ以上指定"); process.exit(1); }

function hasRealAdv(a) {
  return !!a && !a.skipped && (Array.isArray(a.confirmedCorrections) || Array.isArray(a.reviewedClaims));
}
function score(e) {
  return (e.verify ? 1 : 0) + (hasRealAdv(e.adversarial) ? 1 : 0);
}

const best = new Map(); // expId -> {entry, rank}
files.forEach((f, fileRank) => {
  let arr;
  try { arr = JSON.parse(readFileSync(f, "utf-8")); } catch (e) { console.error(`読み込み失敗 ${f}: ${e.message}`); return; }
  if (!Array.isArray(arr)) { console.error(`配列でない: ${f}`); return; }
  for (const e of arr) {
    if (!e || !e.expId) continue;
    const cur = best.get(e.expId);
    const cand = { entry: e, fileRank, s: score(e) };
    if (!cur || cand.s > cur.s || (cand.s === cur.s && cand.fileRank >= cur.fileRank)) {
      best.set(e.expId, cand);
    }
  }
});

const all = [...best.values()].map((x) => x.entry)
  .sort((a, b) => parseInt(a.expId.slice(4)) - parseInt(b.expId.slice(4)));

const outPath = join(__dir, "content-verification-all.json");
writeFileSync(outPath, JSON.stringify(all, null, 2), "utf-8");

const needAdv = all.filter((e) => {
  const v = e.verify; if (!v) return false;
  const need = (v.fieldFindings || []).some((f) => f.suggestedCorrection)
    || (v.splitRecommendation && v.splitRecommendation.shouldSplit)
    || (v.additionalSources || []).length > 0;
  return need && !hasRealAdv(e.adversarial);
});
const noVerify = all.filter((e) => !e.verify).map((e) => e.expId);

console.log(`統合: ${all.length} 件（ユニークexpId）`);
console.log(`verify欠落: ${noVerify.length} ${noVerify.join(",")}`);
console.log(`adv再実行が必要(変更提案あり・adv欠落): ${needAdv.length} → ${needAdv.map((e) => e.expId).join(",")}`);
console.log(`保存: ${outPath}`);
