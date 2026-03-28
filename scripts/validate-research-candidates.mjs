#!/usr/bin/env node

import { existsSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DEFAULT_CANDIDATES = resolve(ROOT, "apps/autonomous-driving-map/research/candidates.json");

const PRIMARY_SOURCE_DOMAINS = [
  /(^|\.)go\.jp$/,
  /(^|\.)lg\.jp$/,
  /(^|\.)mlit\.go\.jp$/,
  /(^|\.)meti\.go\.jp$/,
  /(^|\.)soumu\.go\.jp$/,
  /(^|\.)npa\.go\.jp$/,
];

function usage() {
  console.log("Usage: node scripts/validate-research-candidates.mjs [path-to-candidates.json]");
}

function parseDomain(url) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function isPrimarySource(url) {
  const host = parseDomain(url);
  if (!host) return false;
  return PRIMARY_SOURCE_DOMAINS.some((re) => re.test(host));
}

function main() {
  const target = process.argv[2] ? resolve(process.cwd(), process.argv[2]) : DEFAULT_CANDIDATES;
  if (!existsSync(target)) {
    console.error(`[FATAL] candidates file not found: ${target}`);
    usage();
    process.exit(1);
  }

  let rows;
  try {
    rows = JSON.parse(readFileSync(target, "utf-8"));
  } catch (e) {
    console.error(`[FATAL] invalid JSON: ${e.message}`);
    process.exit(1);
  }

  if (!Array.isArray(rows)) {
    console.error("[FATAL] top-level JSON must be an array");
    process.exit(1);
  }

  let errors = 0;
  let warnings = 0;

  for (const [index, row] of rows.entries()) {
    const id = row.prefecture || `row-${index + 1}`;

    if (typeof row.prefecture !== "string" || row.prefecture.trim() === "") {
      console.error(`[ERROR] ${id}: prefecture is required`);
      errors += 1;
    }

    if (!Array.isArray(row.candidates) || row.candidates.length === 0) {
      console.warn(`[WARN]  ${id}: no candidates`);
      warnings += 1;
      continue;
    }

    for (const [i, cand] of row.candidates.entries()) {
      const prefix = `${id}.candidates[${i}]`;
      if (typeof cand.url !== "string" || cand.url.trim() === "") {
        console.error(`[ERROR] ${prefix}: url is required`);
        errors += 1;
      }
      if (typeof cand.title !== "string" || cand.title.trim() === "") {
        console.warn(`[WARN]  ${prefix}: title is empty`);
        warnings += 1;
      }
      if (typeof cand.sourceType !== "string") {
        console.warn(`[WARN]  ${prefix}: sourceType missing`);
        warnings += 1;
      }
      if (!isPrimarySource(cand.url) && cand.sourceType !== "primary") {
        console.warn(`[WARN]  ${prefix}: non-primary domain (${parseDomain(cand.url)})`);
        warnings += 1;
      }
      if (cand.date && !/^\d{4}-\d{2}-\d{2}$/.test(cand.date)) {
        console.error(`[ERROR] ${prefix}: date must be YYYY-MM-DD`);
        errors += 1;
      }
      if (!["new", "update", "exclude", "pending"].includes(cand.decision || "pending")) {
        console.error(`[ERROR] ${prefix}: decision must be one of new/update/exclude/pending`);
        errors += 1;
      }
    }
  }

  console.log(`Checked ${rows.length} prefectures`);
  console.log(`Warnings: ${warnings}`);
  if (errors > 0) {
    console.error(`Errors: ${errors}`);
    process.exit(1);
  }
  console.log("Validation OK");
}

main();
