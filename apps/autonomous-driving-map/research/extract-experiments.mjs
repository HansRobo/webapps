// extract-experiments.mjs
// data.js の全実験を、enum を解決した人間可読JSONとして research/experiments-extract.json に書き出す。
// 内容整合性検証ワークフローの入力に使う。
//
// 使い方: node apps/autonomous-driving-map/research/extract-experiments.mjs

import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));
const appDir = join(__dir, "..");
const require = createRequire(import.meta.url);

// schema.js 読み込み（グローバルに展開）
const schema = require(join(appDir, "schema.js"));
for (const [k, v] of Object.entries(schema)) global[k] = v;

// data.js 読み込み
const dataText = readFileSync(join(appDir, "data.js"), "utf-8");
eval(dataText.replace(/\bconst\s+EXPERIMENTS\s*=/, "globalThis.EXPERIMENTS =")); // eslint-disable-line no-eval

const experiments = globalThis.EXPERIMENTS ?? [];

// {value, refs} または enum値の解決
function label(v) {
  if (v == null) return null;
  if (typeof v === "object" && "label" in v) return v.label;
  return v;
}
function fieldVal(f) {
  if (f == null) return null;
  if (Array.isArray(f)) return f.map((x) => ({ value: label(x.value), refs: x.refs ?? [] }));
  return { value: label(f.value), refs: f.refs ?? [] };
}

const out = experiments.map((e) => ({
  id: e.id,
  name: fieldVal(e.name),
  location: e.location
    ? { value: e.location.value, lat: e.location.lat ?? null, lng: e.location.lng ?? null, refs: e.location.refs ?? [] }
    : null,
  prefecture: fieldVal(e.prefecture),
  period: fieldVal(e.period),
  status: fieldVal(e.status),
  description: fieldVal(e.description),
  vehicle: fieldVal(e.vehicle),
  adSystem: fieldVal(e.adSystem),
  route: fieldVal(e.route),
  operationType: fieldVal(e.operationType),
  lv4Approval: fieldVal(e.lv4Approval),
  stakeholders: (e.stakeholders ?? []).map((s) => ({ role: s.role, name: s.name, refs: s.refs ?? [] })),
  references: (e.references ?? []).map((r) => ({
    id: r.id,
    title: r.title ?? null,
    url: r.url ?? null,
    date: r.date ?? null,
    source: r.source ?? null,
    checkedAt: r.checkedAt ?? null,
  })),
}));

const outPath = join(__dir, "experiments-extract.json");
writeFileSync(outPath, JSON.stringify(out, null, 2), "utf-8");
console.log(`抽出完了: ${out.length} 件の実験を ${outPath} に書き出しました`);
console.log(`総参照URL数: ${out.reduce((n, e) => n + e.references.length, 0)}`);
