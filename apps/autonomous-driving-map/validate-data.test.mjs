import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { validateExperiments, validateSchema } from "./validate-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

function makeSchema() {
  return {
    STATUS: { ACTIVE: { id: "active", label: "実施中" } },
    LV4_APPROVAL: { UNKNOWN: { id: "unknown", label: "不明" } },
    PREF: { TOKYO: { id: "tokyo", label: "東京都" } },
    VEH: { BUS: { id: "bus", label: "テストバス" } },
    ADS: { SYSTEM: { id: "system", label: "テストシステム" } },
    KNOWN_ORGS: ["テスト市"],
    KNOWN_ROLES: ["自治体"],
  };
}

function makeExperiment(schema) {
  const field = (value) => ({ value, refs: [1] });
  return {
    id: "exp-001",
    name: field("テスト運行"),
    location: { ...field("東京都テスト市"), lat: 35.68, lng: 139.76 },
    prefecture: field(schema.PREF.TOKYO),
    period: field("2026年6月"),
    status: field(schema.STATUS.ACTIVE),
    description: field("バリデーション用データ"),
    vehicle: field(schema.VEH.BUS),
    adSystem: field(schema.ADS.SYSTEM),
    route: field("テスト駅〜市役所"),
    operationType: field("レベル2"),
    lv4Approval: field(schema.LV4_APPROVAL.UNKNOWN),
    stakeholders: [{ role: "自治体", name: "テスト市", refs: [1] }],
    references: [{ id: 1, title: "テスト資料", url: "https://example.com/source", date: "2026-06-01", source: "テスト市", checkedAt: "2026-06-02T00:00:00Z" }],
  };
}

test("正しいスキーマと実験データを受理する", () => {
  const schema = makeSchema();
  assert.deepEqual(validateSchema(schema), { errors: [], warnings: [] });
  assert.deepEqual(validateExperiments([makeExperiment(schema)], schema), { errors: [], warnings: [] });
});

test("スキーマ定数の重複 ID と組織名の重複を拒否する", () => {
  const schema = makeSchema();
  schema.STATUS.CLOSED = { id: "active", label: "終了" };
  schema.KNOWN_ORGS.push("テスト市");
  const { errors } = validateSchema(schema);
  assert(errors.some((error) => error.includes('STATUS: id "active" が重複しています')));
  assert(errors.some((error) => error.includes('KNOWN_ORGS: "テスト市" が重複しています')));
});

test("壊れた ID、座標、URL、日付、参照番号を拒否する", () => {
  const schema = makeSchema();
  const experiment = makeExperiment(schema);
  experiment.id = "invalid";
  experiment.location.lat = Number.NaN;
  experiment.name.refs = [0];
  experiment.references[0].url = "javascript:alert(1)";
  experiment.references[0].date = "2026-02-30";
  const { errors } = validateExperiments([experiment], schema);
  assert(errors.some((error) => error.includes('id は "exp-XXX" 形式ではありません')));
  assert(errors.some((error) => error.includes("location.lat")));
  assert(errors.some((error) => error.includes("name.refs に正の整数以外")));
  assert(errors.some((error) => error.includes("有効な http(s) URL")));
  assert(errors.some((error) => error.includes("実在する YYYY-MM-DD")));
});

test("adSystem は明示的な null を許可するが、未指定と空配列を拒否する", () => {
  const schema = makeSchema();
  const nullable = makeExperiment(schema);
  nullable.adSystem = null;
  assert.equal(validateExperiments([nullable], schema).errors.length, 0);

  const missing = makeExperiment(schema);
  delete missing.adSystem;
  assert(validateExperiments([missing], schema).errors.some((error) => error.includes('フィールド "adSystem" がありません')));

  const empty = makeExperiment(schema);
  empty.adSystem = [];
  assert(validateExperiments([empty], schema).errors.some((error) => error.includes("adSystem が空の配列です")));
});


test("stakeholders が配列でなくても例外を起こさず警告する", () => {
  const schema = makeSchema();
  const experiment = makeExperiment(schema);
  experiment.stakeholders = {};
  const result = validateExperiments([experiment], schema);
  assert.equal(result.errors.length, 0);
  assert(result.warnings.some((warning) => warning.includes("stakeholders が空または配列ではありません")));
});


test("checkedAt は null またはタイムゾーン付き ISO 8601 日時を受理する", () => {
  const schema = makeSchema();
  const unchecked = makeExperiment(schema);
  unchecked.references[0].checkedAt = null;
  assert.equal(validateExperiments([unchecked], schema).errors.length, 0);

  const missing = makeExperiment(schema);
  delete missing.references[0].checkedAt;
  assert(validateExperiments([missing], schema).warnings.some((warning) => warning.includes("checkedAt がありません")));

  const invalid = makeExperiment(schema);
  invalid.references[0].checkedAt = "2026-06-02";
  assert(validateExperiments([invalid], schema).errors.some((error) => error.includes("タイムゾーン付き ISO 8601 日時")));

  invalid.references[0].checkedAt = "2026-02-30T00:00:00Z";
  assert(validateExperiments([invalid], schema).errors.some((error) => error.includes("タイムゾーン付き ISO 8601 日時")));
});

test("check-sources は checkedAt が null の参照を要チェック候補に含める", () => {
  const result = spawnSync(process.execPath, [join(__dirname, "check-sources.mjs"), "--no-fetch", "--exp", "exp-004"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /要チェック参照（最終確認が 18ヶ月以上前、または日時なし）: 2 件/);
  assert.match(result.stdout, /\[要チェック\] exp-004 ref\[2\]: 一次情報を確認し checkedAt を更新/);
});
