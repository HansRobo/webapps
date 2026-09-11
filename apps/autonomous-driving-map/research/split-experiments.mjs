// split-experiments.mjs
// experiments-extract.json を 1実験=1ファイルに分割し research/exp/<id>.json に書き出す。
// 検証ワークフローの各エージェントが自分の担当1件だけを Read できるようにする。
//
// 使い方: node apps/autonomous-driving-map/research/split-experiments.mjs

import { fileURLToPath } from "node:url";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));
const extract = JSON.parse(readFileSync(join(__dir, "experiments-extract.json"), "utf-8"));
const outDir = join(__dir, "exp");
mkdirSync(outDir, { recursive: true });

for (const e of extract) {
  writeFileSync(join(outDir, `${e.id}.json`), JSON.stringify(e, null, 2), "utf-8");
}
console.log(`分割完了: ${extract.length} 件を ${outDir}/<id>.json に書き出しました`);
