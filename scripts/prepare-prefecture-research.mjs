#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { createRequire } from "module";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import vm from "vm";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DATA_PATH = resolve(ROOT, "apps/autonomous-driving-map/data.js");
const ENUMS_PATH = resolve(ROOT, "apps/autonomous-driving-map/enums.js");
const OUT_DIR = resolve(ROOT, "apps/autonomous-driving-map/research");
const OUT_JSON = resolve(OUT_DIR, "prefecture-research-plan.json");
const OUT_MD = resolve(OUT_DIR, "prefecture-research-plan.md");

const WEAK_REF_YEAR = "2023-01-01";

function loadExperiments() {
  const src = readFileSync(DATA_PATH, "utf-8");
  const patched = src.replace(/^\s*const\s+EXPERIMENTS\s*=/m, "var EXPERIMENTS =");
  const sandbox = { EXPERIMENTS: undefined };
  vm.runInNewContext(patched, sandbox);
  return sandbox.EXPERIMENTS;
}

const require = createRequire(import.meta.url);
function loadEnums() {
  return require(ENUMS_PATH);
}

function isWeakUrl(url) {
  const value = String(url ?? "").trim();
  if (!value) return true;

  return (
    /^https?:\/\/[^/]+\/?$/.test(value) ||
    /\/(news|press|corp\/news)\/?$/.test(value) ||
    /\.(?:top|index)\/?$/i.test(value)
  );
}

function priorityScore(stats) {
  let score = 0;
  score += stats.weakRefs * 5;
  if (stats.count < 3) score += (3 - stats.count) * 4;
  if (!stats.latest || stats.latest < "2024-01-01") score += 3;
  if (stats.oldRefs > 0) score += 2;
  return score;
}

function queryTemplates(prefecture) {
  return [
    `${prefecture} 自動運転 実証実験 2023..2026`,
    `${prefecture} 自動運転 レベル4 実証`,
    `${prefecture} 自動運転 国土交通省 自治体`,
    `${prefecture} 自動運転 バス タクシー 実証`,
  ];
}

function pickRepresentativeExperiments(experiments, prefecture, maxItems = 3) {
  return experiments
    .filter((exp) => exp.prefecture?.value === prefecture)
    .slice(0, maxItems)
    .map((exp) => ({
      id: exp.id,
      name: exp.name?.value ?? "",
      period: exp.period?.value ?? "",
      status: exp.status?.value ?? "",
    }));
}

function buildPlan(experiments, enums) {
  const byPrefecture = new Map();

  for (const pref of enums.PREFECTURES) {
    byPrefecture.set(pref, {
      prefecture: pref,
      count: 0,
      latest: "",
      weakRefs: 0,
      oldRefs: 0,
      totalRefs: 0,
      representativeExperiments: [],
      queries: queryTemplates(pref),
    });
  }

  for (const exp of experiments) {
    const pref = exp.prefecture?.value;
    if (!pref || !byPrefecture.has(pref)) continue;

    const s = byPrefecture.get(pref);
    s.count += 1;

    for (const ref of exp.references ?? []) {
      s.totalRefs += 1;
      const date = String(ref.date ?? "");
      if (date && (!s.latest || date > s.latest)) s.latest = date;
      if (date && date < WEAK_REF_YEAR) s.oldRefs += 1;
      if (isWeakUrl(ref.url)) s.weakRefs += 1;
    }
  }

  const rows = [];
  for (const pref of enums.PREFECTURES) {
    const s = byPrefecture.get(pref);
    s.representativeExperiments = pickRepresentativeExperiments(experiments, pref);
    s.priority = priorityScore(s);
    s.oldRefRatio = s.totalRefs === 0 ? 0 : Number(((s.oldRefs / s.totalRefs) * 100).toFixed(1));
    rows.push(s);
  }

  rows.sort((a, b) => b.priority - a.priority || a.prefecture.localeCompare(b.prefecture, "ja"));

  const batches = [];
  for (let i = 0; i < rows.length; i += 4) {
    batches.push({
      batchId: `batch-${String(Math.floor(i / 4) + 1).padStart(2, "0")}`,
      prefectures: rows.slice(i, i + 4).map((row) => row.prefecture),
    });
  }

  const generatedAt = new Date().toISOString();

  return {
    generatedAt,
    weakRefYear: WEAK_REF_YEAR,
    policy: {
      scope: "自動運転実証のみ",
      sourcePreference: "一次情報優先（go.jp / lg.jp / 企業公式）",
      includePlanned: true,
      dateWindow: "2023-01-01以降中心",
    },
    batches,
    prefectures: rows,
  };
}

function buildMarkdown(plan) {
  const lines = [];
  lines.push("# 都道府県別 実証実験再探索プラン");
  lines.push("");
  lines.push(`- generatedAt: ${plan.generatedAt}`);
  lines.push(`- weakRefYear: ${plan.weakRefYear}`);
  lines.push(`- 対象: ${plan.policy.scope}`);
  lines.push(`- ソース方針: ${plan.policy.sourcePreference}`);
  lines.push(`- 計画案件: ${plan.policy.includePlanned ? "含む（status=計画中）" : "含まない"}`);
  lines.push("");
  lines.push("## 並列バッチ（4県単位）");
  lines.push("");
  for (const batch of plan.batches) {
    lines.push(`- ${batch.batchId}: ${batch.prefectures.join(" / ")}`);
  }
  lines.push("");
  lines.push("## 都道府県チェックリスト");
  lines.push("");

  for (const row of plan.prefectures) {
    lines.push(`### ${row.prefecture}`);
    lines.push(`- 優先度: ${row.priority}`);
    lines.push(`- 既存件数: ${row.count}`);
    lines.push(`- 最新参照日: ${row.latest || "なし"}`);
    lines.push(`- 弱い参照: ${row.weakRefs}/${row.totalRefs}（old=${row.oldRefRatio}%）`);
    if (row.representativeExperiments.length > 0) {
      lines.push(`- 既存代表: ${row.representativeExperiments.map((x) => `${x.id} ${x.name}`).join(" / ")}`);
    }
    lines.push(`- 検索クエリ: ${row.queries.join(" | ")}`);
    lines.push("- 追加候補URL: ");
    lines.push("- 判定: 新規 / 既存更新 / 除外");
    lines.push("- data.js更新メモ: ");
    lines.push("");
  }

  return lines.join("\n");
}

function main() {
  const experiments = loadExperiments();
  const enums = loadEnums();

  if (!Array.isArray(experiments)) {
    throw new Error("EXPERIMENTS is not an array");
  }

  if (!Array.isArray(enums.PREFECTURES) || enums.PREFECTURES.length !== 47) {
    throw new Error("PREFECTURES enum must include 47 prefectures");
  }

  const plan = buildPlan(experiments, enums);
  const markdown = buildMarkdown(plan);

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_JSON, `${JSON.stringify(plan, null, 2)}\n`, "utf-8");
  writeFileSync(OUT_MD, `${markdown}\n`, "utf-8");

  console.log(`Wrote: ${OUT_JSON}`);
  console.log(`Wrote: ${OUT_MD}`);
  console.log(`Prefectures: ${plan.prefectures.length}, batches: ${plan.batches.length}`);
}

main();
