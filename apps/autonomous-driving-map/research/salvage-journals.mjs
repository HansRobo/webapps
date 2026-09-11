// salvage-journals.mjs
// 中断したワークフロー journal から成功済みの検証結果を救済し、再実行(redo)が必要なexpIdを算出する。
//
// 使い方: node salvage-journals.mjs <journal1> [journal2 ...]
// 出力: research/content-verification-salvage.json （救済した {expId, verify, adversarial} 配列）
//       および完了/redo の集計を標準出力に表示

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const journals = process.argv.slice(2);
if (journals.length === 0) {
  console.error("journalファイルを1つ以上指定してください");
  process.exit(1);
}

const verifyByExp = new Map();   // expId -> verify result (最新優先)
const advByExp = new Map();      // expId -> adversarial result

for (const jf of journals) {
  const text = readFileSync(jf, "utf-8");
  for (const line of text.split("\n")) {
    if (!line.trim()) continue;
    let o;
    try { o = JSON.parse(line); } catch { continue; }
    if (o.type !== "result" && o.event !== "result") continue;
    const r = o.result;
    if (!r || typeof r !== "object" || !r.expId) continue;
    if (Array.isArray(r.fieldFindings)) {
      verifyByExp.set(r.expId, r); // verify結果
    } else if (Array.isArray(r.reviewedClaims) || Array.isArray(r.confirmedCorrections)) {
      advByExp.set(r.expId, r);    // adversarial結果
    }
  }
}

function needsAdversarial(v) {
  const hasCorr = (v.fieldFindings || []).some((f) => f.suggestedCorrection);
  const hasSplit = v.splitRecommendation && v.splitRecommendation.shouldSplit;
  const hasSrc = (v.additionalSources || []).length > 0;
  return hasCorr || hasSplit || hasSrc;
}

const salvaged = [];
const completeIds = [];
const incompleteIds = []; // verifyはあるがadversarialが必要なのに欠落

for (const [expId, v] of verifyByExp) {
  const adv = advByExp.get(expId) || null;
  const needAdv = needsAdversarial(v);
  const complete = !needAdv || !!adv;
  salvaged.push({ expId, verify: v, adversarial: adv || (needAdv ? null : { skipped: true, reason: "no changes proposed" }) });
  if (complete) completeIds.push(expId);
  else incompleteIds.push(expId);
}

salvaged.sort((a, b) => a.expId.localeCompare(b.expId, undefined, { numeric: true }));

const outPath = join(__dir, "content-verification-salvage.json");
writeFileSync(outPath, JSON.stringify(salvaged, null, 2), "utf-8");

console.log(`救済: verify結果 ${verifyByExp.size}件 / adversarial結果 ${advByExp.size}件`);
console.log(`完了(verify済+必要ならadv済): ${completeIds.length}件`);
console.log(`verifyのみ・adv欠落(redo推奨): ${incompleteIds.length}件 → ${incompleteIds.join(",")}`);
console.log(`保存: ${outPath}`);

// 完了したexpIdをカンマ区切りで出力（redo算出用）
console.log("COMPLETE_IDS=" + completeIds.sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).join(","));
