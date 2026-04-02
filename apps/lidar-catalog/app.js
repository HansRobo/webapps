// LiDARカタログ アプリロジック
// schema.js と data.js が先にロード済みであることを前提とする

// ─────────────────────────────────────────────
// 定数・設定
// ─────────────────────────────────────────────

const SRC_TYPE_LABELS = {
  "product-page":  "公式製品ページ",
  "datasheet":     "データシート",
  "spec-sheet":    "スペックシート",
  "press-release": "プレスリリース",
  "news":          "ニュース",
  "patent":        "特許",
  "other":         "その他",
};

const CAT_BADGE_CLASS = {
  "auto-long":  "cat-auto-long",
  "auto-short": "cat-auto-short",
  "industrial": "cat-industrial",
  "robotics":   "cat-robotics",
  "research":   "cat-research",
  "software":   "cat-software",
};

// 2D比較の軸オプション
const COMPARE_AXES = [
  { id: "maxRange",   label: "最大距離",       unit: "m",   type: "numeric", getter: item => specValueToNumeric(item.raw.specs.maxRange?.value) },
  { id: "channels",   label: "チャンネル数",   unit: "ch",  type: "numeric", getter: item => specValueToNumeric(item.raw.specs.channels?.value) },
  { id: "fovH",       label: "FOV 水平",       unit: "°",   type: "numeric", getter: item => specValueToNumeric(item.raw.specs.fovH?.value) },
  { id: "fovV",       label: "FOV 垂直",       unit: "°",   type: "numeric", getter: item => specValueToNumeric(item.raw.specs.fovV?.value) },
  { id: "beamDivergence", label: "ビーム広がり角", unit: "°", type: "numeric", getter: item => specValueToNumeric(item.raw.specs.beamDivergence?.value) },
  { id: "pointRate",  label: "点群レート",     unit: "kpt/s", type: "numeric", getter: item => specValueToNumeric(item.raw.specs.pointRate?.value) },
  { id: "power",      label: "消費電力",       unit: "W",   type: "numeric", getter: item => specValueToNumeric(item.raw.specs.power?.value) },
  { id: "weight",     label: "重量",           unit: "g",   type: "numeric", getter: item => specValueToNumeric(item.raw.specs.weight?.value) },
  { id: "manufacturer", label: "メーカー",     unit: "",    type: "category", getter: item => item.raw.manufacturer.name },
  { id: "scanMethod", label: "走査方式",       unit: "",    type: "category", getter: item => item.raw.scanningMethod.labelJa },
  { id: "wavelength", label: "波長",           unit: "",    type: "category", getter: item => item.raw.wavelength.label },
  { id: "category",   label: "カテゴリ",       unit: "",    type: "category", getter: item => item.raw.category.labelJa },
];

// ─────────────────────────────────────────────
// データ正規化 + インデックス
// ─────────────────────────────────────────────

function normalize(lidar) {
  return {
    raw: lidar,
    id: lidar.id,
    displayName: `${lidar.manufacturer.name} ${lidar.name}`,
    manufacturerId: lidar.manufacturer.id,
    categoryId: lidar.category.id,
    scanId: lidar.scanningMethod.id,
    waveId: lidar.wavelength.id,
    discontinued: !!lidar.discontinued,
    maxRange: specValueToNumeric(lidar.specs.maxRange?.value),
    channels: specValueToNumeric(lidar.specs.channels?.value),
    searchText: [
      lidar.name,
      lidar.manufacturer.name,
      lidar.manufacturer.nameJa,
      lidar.manufacturer.country,
      lidar.category.labelJa,
      lidar.scanningMethod.labelJa,
      lidar.useCases ?? "",
    ].join(" ").toLowerCase(),
  };
}

const ALL = LIDARS.map(normalize);

const RANGE_DOMAIN = (() => {
  const values = ALL.map(item => item.maxRange).filter(v => v !== null);
  if (values.length === 0) return { min: 0, max: 0 };
  return { min: Math.min(...values), max: Math.max(...values) };
})();

function waveNm(waveId) {
  const n = parseInt(waveId);
  return Number.isFinite(n) ? n : null;
}

function parseCountryList(countryField) {
  if (!countryField) return [];
  const spaceIdx = countryField.indexOf(" ");
  if (spaceIdx === -1) return [{ key: countryField, flag: countryField, name: countryField }];
  const flagsPart = countryField.slice(0, spaceIdx);
  const namesPart = countryField.slice(spaceIdx + 1);
  const names = namesPart.split("/");
  const cps = Array.from(flagsPart);
  return names.map((name, i) => {
    const flag = (cps[i * 2] ?? "") + (cps[i * 2 + 1] ?? "");
    return { key: `${flag} ${name.trim()}`, flag, name: name.trim() };
  });
}

const ALL_COUNTRIES = (() => {
  const seen = new Map();
  for (const item of ALL) {
    for (const c of parseCountryList(item.raw.manufacturer.country)) {
      if (!seen.has(c.key)) seen.set(c.key, c);
    }
  }
  return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name, "ja"));
})();

const WAVE_NM_DOMAIN = (() => {
  const values = ALL.map(item => waveNm(item.waveId)).filter(v => v !== null);
  if (values.length === 0) return { min: 0, max: 0 };
  return { min: Math.min(...values), max: Math.max(...values) };
})();

// 逆引きインデックス
const BY_MFR  = {};
const BY_SCAN = {};
const BY_WAVE = {};
const BY_CAT  = {};

for (const item of ALL) {
  (BY_MFR[item.manufacturerId]  ??= []).push(item);
  (BY_SCAN[item.scanId]         ??= []).push(item);
  (BY_WAVE[item.waveId]         ??= []).push(item);
  (BY_CAT[item.categoryId]      ??= []).push(item);
}

// ID → エンティティ直引き（O(1)ルックアップ）
const M_BY_ID    = Object.fromEntries(Object.values(M).map(m => [m.id, m]));
const SCAN_BY_ID = Object.fromEntries(Object.values(SCAN).map(s => [s.id, s]));
const WAVE_BY_ID = Object.fromEntries(Object.values(WAVE).map(w => [w.id, w]));
const CAT_BY_ID  = Object.fromEntries(Object.values(CAT).map(c => [c.id, c]));

// ─────────────────────────────────────────────
// products フィルタ定義
// ─────────────────────────────────────────────

const FILTER_OPERATOR_OPTIONS = {
  text: [
    { id: "contains", label: "含む" },
    { id: "notContains", label: "含まない" },
    { id: "equals", label: "一致" },
    { id: "notEquals", label: "不一致" },
    { id: "startsWith", label: "先頭一致" },
    { id: "endsWith", label: "末尾一致" },
    { id: "empty", label: "空" },
    { id: "notEmpty", label: "空でない" },
  ],
  enum: [
    { id: "equals", label: "一致" },
    { id: "notEquals", label: "不一致" },
    { id: "empty", label: "空" },
    { id: "notEmpty", label: "空でない" },
  ],
  number: [
    { id: "equals", label: "=" },
    { id: "notEquals", label: "≠" },
    { id: "lt", label: "<" },
    { id: "lte", label: "≤" },
    { id: "gt", label: ">" },
    { id: "gte", label: "≥" },
    { id: "empty", label: "空" },
    { id: "notEmpty", label: "空でない" },
  ],
  boolean: [
    { id: "equals", label: "である" },
    { id: "notEquals", label: "でない" },
  ],
};

function buildEnumOptions(items, labelFn) {
  return [...new Set(items)]
    .map(value => ({ value, label: labelFn(value) }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

const FILTER_FIELDS = [
  { id: "id", label: "製品ID", group: "基本情報", type: "text", getter: item => item.id },
  { id: "name", label: "製品名", group: "基本情報", type: "text", getter: item => item.raw.name },
  {
    id: "manufacturer",
    label: "メーカー",
    group: "基本情報",
    type: "enum",
    getter: item => item.manufacturerId,
    options: buildEnumOptions(ALL.map(item => item.manufacturerId), id => M_BY_ID[id]?.name ?? id),
    valueLabel: value => M_BY_ID[value]?.name ?? value,
  },
  {
    id: "manufacturerCountry",
    label: "メーカー国",
    group: "基本情報",
    type: "text",
    getter: item => item.raw.manufacturer.country,
  },
  {
    id: "category",
    label: "カテゴリ",
    group: "基本情報",
    type: "enum",
    getter: item => item.categoryId,
    options: buildEnumOptions(ALL.map(item => item.categoryId), id => CAT_BY_ID[id]?.labelJa ?? id),
    valueLabel: value => CAT_BY_ID[value]?.labelJa ?? value,
  },
  {
    id: "scanMethod",
    label: "走査方式",
    group: "基本情報",
    type: "enum",
    getter: item => item.scanId,
    options: buildEnumOptions(ALL.map(item => item.scanId), id => SCAN_BY_ID[id]?.labelJa ?? id),
    valueLabel: value => SCAN_BY_ID[value]?.labelJa ?? value,
  },
  { id: "wavelength", label: "波長", group: "基本情報", type: "number", unit: "nm", getter: item => waveNm(item.waveId) },
  {
    id: "discontinued",
    label: "廃番・統合済み",
    group: "基本情報",
    type: "boolean",
    getter: item => item.discontinued,
    valueLabel: value => String(value) === "true" ? "はい" : "いいえ",
  },
  { id: "release", label: "リリース", group: "基本情報", type: "text", getter: item => item.raw.release?.value ?? null },
  { id: "useCases", label: "用途", group: "基本情報", type: "text", getter: item => item.raw.useCases ?? null },

  { id: "channels", label: "チャンネル数", group: "基本性能", type: "number", unit: "ch", getter: item => item.raw.specs.channels?.value ?? null },
  { id: "maxRange", label: "最大検知距離", group: "基本性能", type: "number", unit: "m", getter: item => item.raw.specs.maxRange?.value ?? null },
  { id: "peakRange", label: "ピーク距離", group: "基本性能", type: "number", unit: "m", getter: item => item.raw.specs.peakRange?.value ?? null },
  { id: "minRange", label: "最小検知距離", group: "基本性能", type: "number", unit: "m", getter: item => item.raw.specs.minRange?.value ?? null },
  { id: "accuracy", label: "精度", group: "基本性能", type: "number", unit: "mm", getter: item => getAccuracyPrecisionNumericValue(item.raw.specs.accuracy) },
  { id: "precision", label: "ばらつき / Precision", group: "基本性能", type: "number", unit: "mm", getter: item => getAccuracyPrecisionNumericValue(item.raw.specs.precision) },

  { id: "fovH", label: "FOV 水平", group: "光学・走査", type: "number", unit: "°", getter: item => item.raw.specs.fovH?.value ?? null },
  { id: "fovV", label: "FOV 垂直", group: "光学・走査", type: "number", unit: "°", getter: item => item.raw.specs.fovV?.value ?? null },
  { id: "resH", label: "角度分解能（水平）", group: "光学・走査", type: "text", getter: item => item.raw.specs.resH?.value ?? null },
  { id: "resV", label: "角度分解能（垂直）", group: "光学・走査", type: "text", getter: item => item.raw.specs.resV?.value ?? null },
  { id: "pointRate", label: "点群レート", group: "光学・走査", type: "number", unit: "pts/s", getter: item => item.raw.specs.pointRate?.value ?? null },
  { id: "returnModes", label: "リターンモード", group: "光学・走査", type: "text", getter: item => item.raw.specs.returnModes?.value ?? null },
  { id: "beamDivergence", label: "ビーム広がり角", group: "光学・走査", type: "number", unit: "°", getter: item => item.raw.specs.beamDivergence?.value ?? null },
  { id: "sunlightImmunity", label: "耐外乱光性能", group: "光学・走査", type: "number", unit: "lux", getter: item => item.raw.specs.sunlightImmunity?.value ?? null },

  { id: "interface", label: "インタフェース", group: "システム統合", type: "text", getter: item => item.raw.specs.interface?.value ?? null },
  { id: "timeSynchronization", label: "時刻同期方式", group: "システム統合", type: "text", getter: item => item.raw.specs.timeSynchronization?.value ?? null },
  { id: "imuBuiltIn", label: "内蔵IMU", group: "システム統合", type: "text", getter: item => item.raw.specs.imuBuiltIn?.value ?? null },
  { id: "supportedSoftware", label: "ソフトウェアサポート", group: "システム統合", type: "text", getter: item => item.raw.specs.supportedSoftware?.value ?? null },

  { id: "power", label: "消費電力", group: "物理仕様", type: "number", unit: "W", getter: item => item.raw.specs.power?.value ?? null },
  { id: "powerMax", label: "最大消費電力", group: "物理仕様", type: "number", unit: "W", getter: item => item.raw.specs.powerMax?.value ?? null },
  { id: "size", label: "サイズ", group: "物理仕様", type: "text", getter: item => item.raw.specs.size?.value ?? null },
  { id: "weight", label: "重量", group: "物理仕様", type: "number", unit: "g", getter: item => item.raw.specs.weight?.value ?? null },
  { id: "protection", label: "保護等級", group: "物理仕様", type: "text", getter: item => item.raw.specs.protection?.value ?? null },
  { id: "operatingTemperature", label: "動作温度", group: "物理仕様", type: "text", getter: item => item.raw.specs.operatingTemperature?.value ?? null },
  { id: "shockVibration", label: "耐衝撃・耐振動", group: "物理仕様", type: "text", getter: item => item.raw.specs.shockVibration?.value ?? null },
];

const FILTER_FIELD_BY_ID = Object.fromEntries(FILTER_FIELDS.map(field => [field.id, field]));
const FILTER_FIELD_GROUPS = [...new Set(FILTER_FIELDS.map(field => field.group))].map(group => ({
  group,
  fields: FILTER_FIELDS.filter(field => field.group === group),
}));

const PARAMETER_FIELD_IDS = [
  "channels",
  "maxRange",
  "peakRange",
  "minRange",
  "accuracy",
  "precision",
  "fovH",
  "fovV",
  "resH",
  "resV",
  "pointRate",
  "returnModes",
  "beamDivergence",
  "sunlightImmunity",
  "interface",
  "timeSynchronization",
  "imuBuiltIn",
  "supportedSoftware",
  "power",
  "powerMax",
  "size",
  "weight",
  "protection",
  "operatingTemperature",
  "shockVibration",
];

const PARAMETER_GROUP_ORDER = ["基本性能", "光学・走査", "システム統合", "物理仕様"];

const PARAMETER_TEXT_OVERRIDES = {
  channels: "レーザー本数や受光系の数を表します。点群密度や角度分解能に関係します。",
  maxRange: "10%反射率などの条件付き最大距離です。比較時は条件の表記に注意します。",
  peakRange: "高反射率条件などで到達しうる参考距離です。最大距離とは条件が異なることがあります。",
  minRange: "近距離での死角や測距開始距離の目安です。短いほど近接対象に強くなります。",
  accuracy: "距離精度の目安です。単位や条件表記がメーカーごとに異なります。",
  precision: "再現性やばらつきの目安です。Accuracy と区別して読む必要があります。",
  fovH: "水平にどれだけ広く見えるかを示します。車載前方監視では重要な比較軸です。",
  fovV: "垂直方向の見える範囲です。路面や高低差の取り込みに効きます。",
  resH: "水平角度分解能です。小さいほど細かい対象を区別しやすくなります。",
  resV: "垂直角度分解能です。小さいほど上下方向の密度が上がります。",
  pointRate: "1秒あたりの点群生成数です。高いほど密度の高い点群を得やすくなります。",
  returnModes: "Single / Dual / Triple などの戻り光取得モードです。用途に応じて見ます。",
  beamDivergence: "レーザーの広がり角です。水平・垂直の2成分で表す場合があります。",
  sunlightImmunity: "外乱光に対する耐性の目安です。高いほど屋外条件に強い傾向があります。",
  interface: "Ethernet や CAN などの通信インタフェースです。車両・機器統合時に重要です。",
  timeSynchronization: "PTP / gPTP などの時刻同期方式です。複数センサ統合で重要になります。",
  imuBuiltIn: "内蔵 IMU の有無や仕様です。自己位置推定や補正に関係します。",
  supportedSoftware: "ROS や SDK などのソフトウェア対応です。開発環境の相性に直結します。",
  power: "通常動作時の消費電力です。放熱や電源設計に影響します。",
  powerMax: "最大消費電力です。起動時やヒーター込みの上限確認に使います。",
  size: "外形寸法です。搭載スペースやブラケット設計に関わります。",
  weight: "重量です。車両搭載や可動部への負荷を考えるときに見ます。",
  protection: "IP 等級などの保護性能です。防塵・防水の観点で重要です。",
  operatingTemperature: "動作温度範囲です。車載・屋外用途では特に重要です。",
  shockVibration: "耐衝撃・耐振動の規格です。車載や産業用途で確認します。",
};

const PARAMETER_FIELDS = PARAMETER_FIELD_IDS
  .map(id => FILTER_FIELD_BY_ID[id])
  .filter(Boolean)
  .map(field => ({
    ...field,
    summary: PARAMETER_TEXT_OVERRIDES[field.id] ?? "",
  }));

const PARAMETER_BY_ID = Object.fromEntries(PARAMETER_FIELDS.map(field => [field.id, field]));

const PARAMETER_FACETS = [
  { id: "all", label: "全製品", getter: () => ({ key: "all", label: "全製品" }) },
  { id: "manufacturer", label: "メーカー", getter: item => ({ key: item.manufacturerId, label: item.raw.manufacturer.name }) },
  { id: "category", label: "カテゴリ", getter: item => ({ key: item.categoryId, label: item.raw.category.labelJa }) },
  { id: "scanMethod", label: "走査方式", getter: item => ({ key: item.scanId, label: item.raw.scanningMethod.labelJa }) },
  { id: "wavelength", label: "波長", getter: item => ({ key: item.waveId, label: item.raw.wavelength.label }) },
];

const PARAMETER_FACET_BY_ID = Object.fromEntries(PARAMETER_FACETS.map(f => [f.id, f]));

const PARAMETER_GROUP_LABELS = {
  "基本性能": {
    icon: "tune",
    description: "LiDAR の用途適合を判断する中核指標です。距離、分解能、点群量のバランスを見ます。",
  },
  "光学・走査": {
    icon: "radar",
    description: "視野、分解能、戻り光取得など、実際の点群の出方に直結する項目です。",
  },
  "システム統合": {
    icon: "settings_ethernet",
    description: "車両・ロボットへの組み込みや時刻同期、開発環境の相性を確認する項目です。",
  },
  "物理仕様": {
    icon: "straighten",
    description: "搭載性、筐体設計、耐環境性など、量産導入時に効く項目です。",
  },
};

const PARAMETER_GROUP_ICON_FALLBACK = "schema";

const CHART_PALETTE = [
  "#0d5fd8",
  "#18a58a",
  "#e07a2f",
  "#8b5cf6",
  "#d94f70",
  "#2ca7ff",
  "#7a6cf0",
  "#0f9f8f",
];

function getParameterMeta(id) {
  return PARAMETER_BY_ID[id] ?? null;
}

function getParameterGroupMeta(group) {
  return PARAMETER_GROUP_LABELS[group] ?? { icon: PARAMETER_GROUP_ICON_FALLBACK, description: "" };
}

function getParameterValue(item, field) {
  return item.raw.specs?.[field.id]?.value ?? null;
}

function getNormalizedSpecNumericValue(spec) {
  if (!spec) return null;
  if (typeof spec.numericValue === "number" && Number.isFinite(spec.numericValue)) {
    return spec.numericValue;
  }
  return specValueToNumeric(spec.value);
}

function getAccuracyPrecisionNumericValue(spec) {
  if (!spec) return null;
  const normalized = getNormalizedSpecNumericValue(spec);
  if (normalized !== null) return normalized;

  const raw = spec.value;
  if (typeof raw !== "string") return null;
  const text = raw.trim();
  const cmToMm = n => Number(n) * 10;
  const mm = n => Number(n);
  let match;

  if ((match = text.match(/^±\s*([0-9]+(?:\.[0-9]+)?)\s*(mm|cm)$/i))) {
    return match[2].toLowerCase() === "cm" ? cmToMm(match[1]) : mm(match[1]);
  }
  if ((match = text.match(/^<?\s*([0-9]+(?:\.[0-9]+)?)\s*(mm|cm)$/i))) {
    return match[2].toLowerCase() === "cm" ? cmToMm(match[1]) : mm(match[1]);
  }
  if ((match = text.match(/^([0-9]+(?:\.[0-9]+)?)\s*(mm|cm)\s*(?:\((?:1σ|typical)\)|1σ|@.*)?$/i))) {
    return match[2].toLowerCase() === "cm" ? cmToMm(match[1]) : mm(match[1]);
  }
  if ((match = text.match(/^([0-9]+(?:\.[0-9]+)?)\s*(mm|cm)@1σ$/i))) {
    return match[2].toLowerCase() === "cm" ? cmToMm(match[1]) : mm(match[1]);
  }
  if ((match = text.match(/^1σ\s*@\s*[0-9.]+m\s*[≤<]\s*([0-9]+(?:\.[0-9]+)?)\s*(mm|cm)$/i))) {
    return match[2].toLowerCase() === "cm" ? cmToMm(match[1]) : mm(match[1]);
  }
  if ((match = text.match(/^1σ\s*@\s*[0-9.]+m\s*([0-9]+(?:\.[0-9]+)?)\s*(mm|cm)$/i))) {
    return match[2].toLowerCase() === "cm" ? cmToMm(match[1]) : mm(match[1]);
  }
  if ((match = text.match(/^0\.5\s*cm\s*1σ$/i) || text.match(/^0\.5\s*cm@1σ$/i))) {
    return 5;
  }
  if (text === "1 cm@1σ" || text === "1 cm (typical)") return 10;
  if (text === "2 cm (1σ)") return 20;
  return null;
}

function getParameterDisplayText(item, field) {
  const spec = item.raw.specs?.[field.id];
  if (!spec) return null;
  if (field.id === "beamDivergence") {
    const display = formatBeamDivergenceDisplay(spec, { includeUnit: field.type === "number" });
    return display.isMissing ? null : display.text;
  }
  const display = formatSpecDisplay(spec, { includeUnit: field.type === "number" });
  return display.isMissing ? null : display.text;
}

function getNumericParameterValue(item, field) {
  const spec = item.raw.specs?.[field.id];
  if (!spec) return null;
  if (field.id === "accuracy" || field.id === "precision") {
    return getAccuracyPrecisionNumericValue(spec);
  }
  return specValueToNumeric(spec.value);
}

function getFacetEntry(item, facetId) {
  const facet = PARAMETER_FACET_BY_ID[facetId] ?? PARAMETER_FACET_BY_ID.all;
  return facet.getter(item);
}

function getFacetGroups(items, facetId, limit = 6) {
  const facet = PARAMETER_FACET_BY_ID[facetId] ?? PARAMETER_FACET_BY_ID.all;
  const counts = new Map();
  for (const item of items) {
    const entry = facet.getter(item);
    const key = entry.key ?? "unknown";
    const prev = counts.get(key) ?? { key, label: entry.label ?? String(key), count: 0 };
    prev.count++;
    counts.set(key, prev);
  }

  const sorted = [...counts.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "ja"));
  if (sorted.length === 0) {
    return [{ key: "all", label: "全製品", count: items.length, color: CHART_PALETTE[0] }];
  }

  const visible = sorted.slice(0, Math.max(1, limit - 1));
  const hidden = sorted.slice(Math.max(1, limit - 1));
  if (hidden.length > 0) {
    visible.push({
      key: "__other__",
      label: "その他",
      count: hidden.reduce((sum, entry) => sum + entry.count, 0),
      color: "#9aa7bd",
      hiddenItems: hidden,
    });
  }

  return visible.map((entry, index) => ({
    ...entry,
    color: entry.color ?? CHART_PALETTE[index % CHART_PALETTE.length],
  }));
}

function buildHistogramBuckets(values, desiredBins = 8) {
  if (values.length === 0) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (min === max) {
    return [{ label: formatAxisRange(min, max), min, max, count: values.length, entries: values }];
  }

  const bins = Math.max(4, Math.min(desiredBins, Math.ceil(Math.sqrt(values.length))));
  const width = (max - min) / bins;
  const buckets = Array.from({ length: bins }, (_, index) => ({
    label: "",
    min: min + index * width,
    max: index === bins - 1 ? max : min + (index + 1) * width,
    count: 0,
    values: [],
  }));

  for (const value of values) {
    let idx = Math.floor((value - min) / width);
    if (!Number.isFinite(idx)) idx = 0;
    if (idx < 0) idx = 0;
    if (idx >= bins) idx = bins - 1;
    buckets[idx].count++;
    buckets[idx].values.push(value);
  }

  for (const bucket of buckets) {
    bucket.label = formatAxisRange(bucket.min, bucket.max);
  }
  return buckets;
}

function formatAxisRange(min, max) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return "—";
  if (min === max) return formatAxisValue(min);
  return `${formatAxisValue(min)}–${formatAxisValue(max)}`;
}

function formatAxisValue(value) {
  if (!Number.isFinite(value)) return "—";
  if (Math.abs(value) >= 1000) return String(Math.round(value));
  if (Math.abs(value) >= 100) return String(Math.round(value));
  if (Math.abs(value) >= 10) return String(Math.round(value * 10) / 10);
  return String(Math.round(value * 100) / 100);
}

function buildTextBuckets(items, field) {
  const counts = new Map();
  for (const item of items) {
    const text = getParameterDisplayText(item, field);
    if (!text) continue;
    counts.set(text, (counts.get(text) ?? 0) + 1);
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ja"));
  if (sorted.length <= 12) {
    return sorted.map(([label, count]) => ({ label, count }));
  }
  const visible = sorted.slice(0, 11).map(([label, count]) => ({ label, count }));
  const other = sorted.slice(11).reduce((sum, [, count]) => sum + count, 0);
  visible.push({ label: "その他", count: other });
  return visible;
}

function calcSummaryStats(values) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((acc, value) => acc + value, 0);
  const median = sorted.length % 2 === 1
    ? sorted[(sorted.length - 1) / 2]
    : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
  return {
    count: values.length,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    mean: sum / values.length,
    median,
  };
}

function sampleRepresentativeItems(field, items) {
  const numericItems = items
    .map(item => ({ item, value: getNumericParameterValue(item, field) }))
    .filter(entry => entry.value !== null)
    .sort((a, b) => a.value - b.value);

  if (field.type === "number") {
    if (numericItems.length === 0) return [];
    if (numericItems.length <= 3) return numericItems.map(entry => entry.item);
    const picks = [
      numericItems[0],
      numericItems[Math.floor((numericItems.length - 1) / 2)],
      numericItems[numericItems.length - 1],
    ];
    const quartiles = [
      numericItems[Math.floor((numericItems.length - 1) * 0.25)],
      numericItems[Math.floor((numericItems.length - 1) * 0.75)],
    ];
    return [...new Map([...picks, ...quartiles].map(entry => [entry.item.id, entry.item])).values()].slice(0, 6);
  }

  const textCounts = new Map();
  for (const item of items) {
    const text = getParameterDisplayText(item, field);
    if (!text) continue;
    textCounts.set(text, (textCounts.get(text) ?? 0) + 1);
  }
  const popularValues = [...textCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([label]) => label);
  const picked = [];
  for (const label of popularValues) {
    const match = items.find(item => getParameterDisplayText(item, field) === label);
    if (match && !picked.some(item => item.id === match.id)) picked.push(match);
  }
  for (const item of items) {
    if (!picked.some(p => p.id === item.id) && picked.length < 6) picked.push(item);
  }
  return picked;
}

function renderChartLegend(facetGroups) {
  return `
    <div class="parameter-chart__legend">
      ${facetGroups.map(group => `
        <div class="parameter-chart__legend-item">
          <span class="parameter-chart__legend-dot" style="background:${group.color}"></span>
          <span>${esc(group.label)}</span>
          <strong>${group.count}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderStackedBars(buckets, facetGroups, { bucketLabelClass = "", xAxisLabel = "" } = {}) {
  const maxCount = Math.max(1, ...buckets.map(bucket => bucket.count));
  const chartBars = buckets.map(bucket => {
    const segments = facetGroups
      .map(group => ({
        ...group,
        count: bucket.counts?.[group.key] ?? 0,
      }))
      .filter(segment => segment.count > 0);
    const total = bucket.count || 0;
    const barSegments = segments.map(segment => `
      <div class="parameter-chart__segment"
           title="${esc(bucket.label)} / ${esc(segment.label)}: ${segment.count}"
           style="flex:${segment.count};background:${segment.color}"></div>
    `).join("");
    return `
      <div class="parameter-chart__bar-wrap">
        <div class="parameter-chart__bar"
             style="height:${Math.max(4, Math.round((bucket.count / maxCount) * 160))}px">
          <div class="parameter-chart__stack">${barSegments}</div>
        </div>
        <div class="parameter-chart__bar-label ${bucketLabelClass}">${esc(bucket.label)}</div>
        <div class="parameter-chart__bar-count">${total}</div>
      </div>
    `;
  }).join("");

  return `
    <div class="parameter-chart">
      <div class="parameter-chart__bars">
        ${chartBars}
      </div>
      ${xAxisLabel ? `<div class="parameter-chart__axis">${esc(xAxisLabel)}</div>` : ""}
      ${renderChartLegend(facetGroups)}
    </div>
  `;
}

function renderDotPlot(points, facetGroups, { xAxisLabel = "" } = {}) {
  if (points.length === 0) {
    return `<div class="parameter-empty">このパラメータの数値分布を作成できませんでした。</div>`;
  }

  const values = points.map(point => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const facetMap = new Map(facetGroups.map(group => [group.key, group]));
  const slotCount = Math.min(96, Math.max(24, Math.round(Math.sqrt(points.length) * 8)));
  const slotWidth = 100 / slotCount;
  const slotOccupancy = Array.from({ length: slotCount }, () => 0);
  const sortedPoints = [...points].sort((a, b) => a.value - b.value || a.label.localeCompare(b.label, "ja"));

  const dots = sortedPoints.map(point => {
    const percent = min === max ? 50 : ((point.value - min) / (max - min)) * 100;
    const slot = Math.min(slotCount - 1, Math.max(0, Math.floor(percent / slotWidth)));
    const lane = slotOccupancy[slot]++;
    const facetKey = facetMap.has(point.facet.key) ? point.facet.key : "__other__";
    const facet = facetMap.get(facetKey) ?? facetGroups[0];
    const axisLabel = `${formatAxisValue(point.value)}${point.unit ? ` ${point.unit}` : ""}`;
    return `
      <span class="parameter-dotplot__dot"
            title="${esc(axisLabel)} / ${esc(facet.label)}"
            aria-label="${esc(axisLabel)} / ${esc(facet.label)}"
            style="left:${percent}%; bottom:${10 + (lane * 13)}px; --dot-color:${facet.color};"></span>
    `;
  }).join("");

  const maxLane = Math.max(0, ...slotOccupancy.map(count => count - 1));
  const plotHeight = Math.max(92, 32 + ((maxLane + 1) * 13));
  const minLabel = `${formatAxisValue(min)}${points[0].unit ? ` ${points[0].unit}` : ""}`;
  const maxLabel = `${formatAxisValue(max)}${points[0].unit ? ` ${points[0].unit}` : ""}`;

  return `
    <div class="parameter-chart parameter-dotplot">
      <div class="parameter-dotplot__plot" style="height:${plotHeight}px">
        <div class="parameter-dotplot__baseline"></div>
        ${dots}
      </div>
      <div class="parameter-dotplot__axis">
        ${min === max
          ? `<span class="parameter-dotplot__axis-label parameter-dotplot__axis-label--single">${esc(minLabel)}</span>`
          : `
            <span class="parameter-dotplot__axis-label parameter-dotplot__axis-label--min">${esc(minLabel)}</span>
            <span class="parameter-dotplot__axis-label parameter-dotplot__axis-label--max">${esc(maxLabel)}</span>
          `
        }
      </div>
      ${xAxisLabel ? `<div class="parameter-chart__axis">${esc(xAxisLabel)}</div>` : ""}
      ${renderChartLegend(facetGroups)}
    </div>
  `;
}

function renderParameterDistribution(field, items, facetId) {
  const visibleItems = items.filter(item => getParameterDisplayText(item, field) !== null);

  if (visibleItems.length === 0) {
    return `<div class="parameter-empty">このパラメータは現在のデータセットでは値がありません。</div>`;
  }

  const facetGroups = getFacetGroups(visibleItems, facetId);
  const facetMap = new Map(facetGroups.map(group => [group.key, group]));

  if (field.type === "number") {
    const numericItems = visibleItems.map(item => ({
      item,
      value: getNumericParameterValue(item, field),
      facet: getFacetEntry(item, facetId),
    })).filter(entry => entry.value !== null);

    if (numericItems.length === 0) {
      const textBuckets = buildTextBuckets(visibleItems, field);
      const buckets = textBuckets.map(bucket => ({
        label: bucket.label,
        count: bucket.count,
        counts: Object.fromEntries(facetGroups.map(group => [group.key, 0])),
      }));
      for (const item of visibleItems) {
        const text = getParameterDisplayText(item, field);
        if (!text) continue;
        const bucket = buckets.find(entry => entry.label === text) ?? buckets.find(entry => entry.label === "その他");
        if (!bucket) continue;
        const facet = getFacetEntry(item, facetId);
        const key = facetMap.has(facet.key) ? facet.key : "__other__";
        bucket.counts[key] = (bucket.counts[key] ?? 0) + 1;
      }
      for (const bucket of buckets) {
        bucket.count = Object.values(bucket.counts).reduce((sum, value) => sum + value, 0);
      }
      return renderStackedBars(buckets, facetGroups, { bucketLabelClass: "parameter-chart__bar-label--text" });
    }

    const plot = renderDotPlot(
      numericItems.map(entry => ({
        value: entry.value,
        facet: entry.facet,
        label: entry.facet.label,
        unit: field.unit ?? "",
      })),
      facetGroups,
      { xAxisLabel: `数値分布 ${field.unit ? `(${field.unit})` : ""}`.trim() }
    );
    const excludedCount = visibleItems.length - numericItems.length;
    return excludedCount > 0
      ? `${plot}<div class="parameter-empty">条件付き表現のため ${excludedCount} 件は数値分布から除外しました。</div>`
      : plot;
  }

  const textBuckets = buildTextBuckets(visibleItems, field);
  const buckets = textBuckets.map(bucket => ({
    label: bucket.label,
    count: bucket.count,
    counts: Object.fromEntries(facetGroups.map(group => [group.key, 0])),
  }));
  for (const item of visibleItems) {
    const text = getParameterDisplayText(item, field);
    if (!text) continue;
    const bucket = buckets.find(entry => entry.label === text) ?? buckets.find(entry => entry.label === "その他");
    if (!bucket) continue;
    const facet = getFacetEntry(item, facetId);
    const key = facetMap.has(facet.key) ? facet.key : "__other__";
    bucket.counts[key] = (bucket.counts[key] ?? 0) + 1;
  }
  for (const bucket of buckets) {
    bucket.count = Object.values(bucket.counts).reduce((sum, value) => sum + value, 0);
  }

  return renderStackedBars(buckets, facetGroups, { bucketLabelClass: "parameter-chart__bar-label--text" });
}

function buildParameterDetailSummary(field, items) {
  const numericValues = field.type === "number"
    ? items.map(item => getNumericParameterValue(item, field)).filter(value => value !== null)
    : [];
  const stats = numericValues.length > 0 ? calcSummaryStats(numericValues) : null;
  const total = items.filter(item => getParameterDisplayText(item, field) !== null).length;
  const covered = field.type === "number"
    ? numericValues.length
    : total;
  const coveragePct = total === 0 ? 0 : Math.round((covered / total) * 100);

  if (field.type === "number" && stats) {
    return `
      <div class="parameter-summary-grid">
        <div class="parameter-summary-card"><span>数値化済み</span><strong>${stats.count}件</strong></div>
        <div class="parameter-summary-card"><span>対象総数</span><strong>${total}件</strong></div>
        <div class="parameter-summary-card"><span>中央値</span><strong>${formatAxisValue(stats.median)}${field.unit ? ` ${field.unit}` : ""}</strong></div>
        <div class="parameter-summary-card"><span>最小</span><strong>${formatAxisValue(stats.min)}${field.unit ? ` ${field.unit}` : ""}</strong></div>
        <div class="parameter-summary-card"><span>最大</span><strong>${formatAxisValue(stats.max)}${field.unit ? ` ${field.unit}` : ""}</strong></div>
        <div class="parameter-summary-card"><span>平均</span><strong>${formatAxisValue(stats.mean)}${field.unit ? ` ${field.unit}` : ""}</strong></div>
        <div class="parameter-summary-card"><span>数値カバー率</span><strong>${coveragePct}%</strong></div>
      </div>
    `;
  }

  const buckets = buildTextBuckets(items, field);
  const top = buckets.slice(0, 3).map(bucket => `${bucket.label} (${bucket.count}件)`).join(" / ");
  return `
    <div class="parameter-summary-grid">
      <div class="parameter-summary-card"><span>有効値</span><strong>${covered}件</strong></div>
      <div class="parameter-summary-card"><span>カバー率</span><strong>${coveragePct}%</strong></div>
      <div class="parameter-summary-card parameter-summary-card--wide"><span>上位の表記</span><strong>${top || "—"}</strong></div>
    </div>
  `;
}

function buildParameterCards(field, items) {
  return items
    .map(item => {
      let value;
      if (field.id === "beamDivergence" || field.type !== "number") {
        value = getParameterDisplayText(item, field);
      } else {
        const numericValue = getNumericParameterValue(item, field);
        value = numericValue !== null
          ? `${formatAxisValue(numericValue)}${field.unit ? ` ${field.unit}` : ""}`
          : getParameterDisplayText(item, field);
      }
      if (value === null) return null;
      return `
        <a href="#/products/${item.id}" class="entity-card parameter-product-card">
          <div class="entity-card__top">
            <div class="entity-card__icon">
              <span class="material-symbols-outlined">sensors</span>
            </div>
            <div>
              <div class="entity-card__name">${esc(item.raw.name)}</div>
              <div class="entity-card__name-sub">${esc(item.raw.manufacturer.name)}</div>
            </div>
          </div>
          <div class="entity-card__desc">${esc(value)}</div>
          <div class="entity-card__stats">
            <span class="entity-card__stat"><strong>${esc(item.raw.category.labelJa)}</strong></span>
            <span class="entity-card__stat">${esc(item.raw.scanningMethod.labelJa)}</span>
          </div>
        </a>
      `;
    })
    .filter(Boolean)
    .slice(0, 6)
    .join("");
}

function renderParametersGrid() {
  const container = document.getElementById("viewContainer");
  const cards = PARAMETER_GROUP_ORDER.map(group => {
    const groupMeta = getParameterGroupMeta(group);
    const params = PARAMETER_FIELDS.filter(field => field.group === group);
    return `
      <section class="entity-view__section parameter-group-block">
        <div class="entity-view__section-head">
          <div class="entity-view__section-title-wrap">
            <div class="entity-view__section-title"><span class="material-symbols-outlined">${groupMeta.icon}</span>${esc(group)}</div>
            <p class="entity-view__section-sub">${esc(groupMeta.description)}</p>
          </div>
          <span class="count-pill">${params.length}項目</span>
        </div>
        <div class="entity-grid parameter-grid">
          ${params.map(field => {
            const covered = ALL.filter(item => getParameterValue(item, field) !== null && getParameterValue(item, field) !== undefined).length;
            return `
              <a href="#/parameters/${field.id}" class="entity-card parameter-card">
                <div class="entity-card__top">
                  <div class="entity-card__icon parameter-card__icon">
                    <span class="material-symbols-outlined">${field.type === "number" ? "show_chart" : "text_fields"}</span>
                  </div>
                  <div>
                    <div class="entity-card__name">${esc(field.label)}</div>
                    <div class="entity-card__name-sub">${esc(field.group)}</div>
                  </div>
                </div>
                <div class="entity-card__desc">${esc(field.summary || "この項目の説明ページです。")}</div>
                <div class="entity-card__stats">
                  <span class="entity-card__stat"><strong>${covered}</strong> / ${ALL.length}</span>
                  <span class="entity-card__stat">${esc(field.unit ?? "text")}</span>
                </div>
              </a>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }).join("");

  container.innerHTML = `
    <div class="entity-detail parameter-list-page">
      <a href="#/products" class="entity-detail__back">
        <span class="material-symbols-outlined">arrow_back</span>製品一覧へ
      </a>
      <div class="entity-detail__body">
        <div class="entity-detail__hero">
          <div class="entity-detail__hero-icon">
            <span class="material-symbols-outlined">tune</span>
          </div>
          <div>
            <h2 class="entity-detail__hero-title">パラメータ説明</h2>
            <p class="entity-detail__hero-sub">主要スペック項目を、意味・分布・代表製品つきで確認できます。</p>
          </div>
        </div>
        <div class="parameter-intro">
          <p class="entity-detail__desc">各ページでは、そのパラメータが何を表すか、どのように読むか、そして全体の分布がどうなっているかを確認できます。</p>
          <div class="parameter-facet-hint">
            <span>集計切替</span>
            <strong>全製品 / メーカー / カテゴリ / 走査方式 / 波長</strong>
          </div>
        </div>
        ${cards}
      </div>
    </div>
  `;
}

function renderParameterDetail(id) {
  const field = getParameterMeta(id);
  if (!field) { window.location.hash = "#/parameters"; return; }
  const products = ALL.filter(item => getParameterValue(item, field) !== null && getParameterValue(item, field) !== undefined);
  const facetId = PARAMETER_FACETS.some(facet => facet.id === "category") ? "category" : "all";
  const groupMeta = getParameterGroupMeta(field.group);
  const relatedFields = PARAMETER_FIELDS.filter(other => other.group === field.group && other.id !== field.id).slice(0, 4);
  const representativeItems = sampleRepresentativeItems(field, products);

  const summaries = buildParameterDetailSummary(field, products);
  const distribution = renderParameterDistribution(field, products, facetId);

  const container = document.getElementById("viewContainer");
  container.innerHTML = `
    <div class="entity-detail parameter-detail">
      <a href="#/parameters" class="entity-detail__back">
        <span class="material-symbols-outlined">arrow_back</span>パラメータ一覧へ
      </a>
      <div class="entity-detail__body">
        <div class="entity-detail__hero">
          <div class="entity-detail__hero-icon">
            <span class="material-symbols-outlined">${groupMeta.icon}</span>
          </div>
          <div>
            <h2 class="entity-detail__hero-title">${esc(field.label)}</h2>
            <p class="entity-detail__hero-sub">${esc(field.group)}${field.unit ? ` · 単位: ${esc(field.unit)}` : ""}</p>
          </div>
        </div>

        <div class="parameter-detail__summary">
          <div class="parameter-detail__summary-text">
            <p class="entity-detail__desc">${esc(field.summary || groupMeta.description || "このパラメータの説明ページです。")}</p>
            <div class="parameter-detail__chips">
              <span class="badge badge--scan">${esc(field.type === "number" ? "数値パラメータ" : "文字列パラメータ")}</span>
              <span class="badge badge--wave-1550">${esc(field.group)}</span>
            </div>
          </div>
          <div class="parameter-detail__summary-note">
            <strong>見方</strong>
            <span>公開条件や測定方法がメーカーごとに異なる場合があります。必ず一次情報の注記も確認してください。</span>
          </div>
        </div>

        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">insights</span>概要</div>
          ${summaries}
        </div>

        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">bar_chart</span>分布</div>
          <div class="parameter-facet-switcher" id="parameterFacetSwitcher">
            ${PARAMETER_FACETS.map(facet => `
              <button type="button" class="parameter-facet-switcher__btn${facet.id === facetId ? " active" : ""}" data-facet="${facet.id}">${esc(facet.label)}</button>
            `).join("")}
          </div>
          <div id="parameterDistribution">${distribution}</div>
        </div>

        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">sensors</span>代表製品</div>
          <div class="entity-grid parameter-products-grid">
            ${buildParameterCards(field, representativeItems)}
          </div>
        </div>

        ${relatedFields.length > 0 ? `
        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">link</span>同じグループの他の項目</div>
          <div class="related-chips">
            ${relatedFields.map(other => `<a href="#/parameters/${other.id}" class="chip-button">${esc(other.label)}</a>`).join("")}
          </div>
        </div>` : ""}

        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">info</span>対象製品数</div>
          <p class="entity-detail__desc">${products.length}件の製品に値があります。欠損値は分布から除外しています。</p>
        </div>
      </div>
    </div>
  `;

  const facetSwitchers = container.querySelectorAll(".parameter-facet-switcher__btn");
  const distributionRoot = container.querySelector("#parameterDistribution");
  facetSwitchers.forEach(button => {
    button.addEventListener("click", () => {
      const nextFacet = button.dataset.facet ?? "all";
      facetSwitchers.forEach(btn => btn.classList.toggle("active", btn === button));
      distributionRoot.innerHTML = renderParameterDistribution(field, products, nextFacet);
    });
  });
}

// ─────────────────────────────────────────────
// 共通ユーティリティ
// ─────────────────────────────────────────────

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatSpecValue(value, joiner = " / ") {
  if (value === null || value === undefined) {
    return { text: "—", isMissing: true };
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return { text: "—", isMissing: true };
    return {
      text: value.map(v => v === null || v === undefined ? "不明" : String(v)).join(joiner),
      isMissing: false,
    };
  }
  return { text: String(value), isMissing: false };
}

function formatSpecDisplay(spec, { includeUnit = true, joiner = null } = {}) {
  if (!spec) return { text: "—", isMissing: true };
  const value = formatSpecValue(spec.value, joiner ?? spec.joiner ?? " / ");
  if (value.isMissing) return value;
  const unit = includeUnit && spec.unit ? ` ${spec.unit}` : "";
  return {
    text: `${value.text}${unit}`,
    isMissing: false,
  };
}

function formatBeamDivergenceDisplay(spec, { includeUnit = true } = {}) {
  if (!spec) return { text: "—", isMissing: true };
  const raw = spec.value;
  if (raw == null) return { text: "—", isMissing: true };

  const horizontal = Array.isArray(raw) ? (raw[0] ?? null) : raw;
  const vertical   = Array.isArray(raw) ? (raw[1] ?? null) : raw;

  const formatPart = (label, value) => {
    if (value == null) return `${label} —`;
    return `${label} ${String(value)}${includeUnit && spec.unit ? spec.unit : ""}`;
  };

  const text = `${formatPart("水平", horizontal)} / ${formatPart("垂直", vertical)}`;
  return { text, isMissing: false };
}

function specValueToNumeric(value) {
  if (value === null || value === undefined) return null;
  if (Array.isArray(value)) {
    const numericValues = value
      .map(v => Number(v))
      .filter(v => Number.isFinite(v));
    if (numericValues.length === 0) return null;
    return Math.max(...numericValues);
  }
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function countPill(n, unit = "件") {
  return `<span class="count-pill">${n}${unit}</span>`;
}

function renderDistributionBars(items, keyFn, labelFn, colorClass = "") {
  const counts = {};
  for (const item of items) {
    const k = keyFn(item);
    counts[k] = (counts[k] ?? 0) + 1;
  }
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = entries[0]?.[1] ?? 1;
  return `<div class="distribution-bar-list">${
    entries.map(([k, n]) => `
      <div class="distribution-bar-item">
        <div class="distribution-bar-item__label">${esc(labelFn(k))}</div>
        <div class="distribution-bar-item__bar-wrap">
          <div class="distribution-bar-item__bar${colorClass ? " " + colorClass : ""}"
               style="width:${Math.round((n / max) * 100)}%"></div>
        </div>
        <div class="distribution-bar-item__count">${n}</div>
      </div>`).join("")
  }</div>`;
}

function parseHashRoute(hash) {
  const raw = String(hash ?? "");
  const qIndex = raw.indexOf("?");
  const path = qIndex === -1 ? raw : raw.slice(0, qIndex);
  const query = new URLSearchParams(qIndex === -1 ? "" : raw.slice(qIndex + 1));
  return { path: path || "#/products", query };
}

function buildHashRoute(path, params = {}) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    query.set(key, String(value));
  }
  const queryString = query.toString();
  return queryString ? path + "?" + queryString : path;
}

function replaceHashSilently(hash) {
  const next = hash.startsWith("#") ? hash : "#" + hash;
  if (location.hash === next) return;
  try {
    history.replaceState(null, "", next);
  } catch {
    location.hash = next;
  }
}

// ─────────────────────────────────────────────
// ルーター
// ─────────────────────────────────────────────

const Router = {
  routes: [
    { pattern: /^#\/products\/(.+)$/,      view: "products",      handler: (m) => { renderProductsView(); openDetailById(m[1]); } },
    { pattern: /^#\/products$/,            view: "products",      handler: () => renderProductsView() },
    { pattern: /^#\/manufacturers\/(.+)$/, view: "manufacturers", handler: (m) => renderManufacturerDetail(m[1]) },
    { pattern: /^#\/manufacturers$/,       view: "manufacturers", handler: () => renderManufacturersGrid() },
    { pattern: /^#\/scan-methods\/(.+)$/,  view: "scan-methods",  handler: (m) => renderScanMethodDetail(m[1]) },
    { pattern: /^#\/scan-methods$/,        view: "scan-methods",  handler: () => renderScanMethodsGrid() },
    { pattern: /^#\/wavelengths\/(.+)$/,   view: "wavelengths",   handler: (m) => renderWavelengthDetail(m[1]) },
    { pattern: /^#\/wavelengths$/,         view: "wavelengths",   handler: () => renderWavelengthsGrid() },
    { pattern: /^#\/categories\/(.+)$/,    view: "categories",    handler: (m) => renderCategoryDetail(m[1]) },
    { pattern: /^#\/categories$/,          view: "categories",    handler: () => renderCategoriesGrid() },
    { pattern: /^#\/parameters\/(.+)$/,     view: "parameters",    handler: (m) => renderParameterDetail(m[1]) },
    { pattern: /^#\/parameters$/,          view: "parameters",    handler: () => renderParametersGrid() },
    { pattern: /^#\/compare$/,             view: "compare",       handler: (_, query) => renderCompareView(query) },
    { pattern: /^#\/graph$/,               view: "graph",         handler: (_, query) => renderGraphView(query) },
  ],

  currentView: null,

  navigate(hash) {
    if (!hash || hash === "#" || hash === "") hash = "#/products";
    const { path, query } = parseHashRoute(hash);
    for (const route of this.routes) {
      const match = path.match(route.pattern);
      if (match) {
        this.updateNav(route.view);
        // products以外はドロワーを閉じる
        if (route.view !== "products") closeDetail();
        // モバイルドック表示制御
        const dock = document.getElementById("mobileDock");
        if (dock) dock.style.display = route.view === "products" ? "" : "none";
        const disclaimer = document.getElementById("dataDisclaimer");
        if (disclaimer) disclaimer.hidden = route.view !== "products";
        this.currentView = route.view;
        route.handler(match, query);
        return;
      }
    }
    replaceHashSilently("#/products");
    this.navigate("#/products");
  },

  updateNav(activeView) {
    document.querySelectorAll(".nav-tab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.view === activeView);
    });
  },

  init() {
    window.addEventListener("hashchange", () => this.navigate(location.hash));
    this.navigate(location.hash);
    // 詳細ドロワーのイベント登録（全ビュー共通）
    document.getElementById("closeDetail").addEventListener("click", () => {
      closeDetail();
      if (this.currentView === "products") {
        history.pushState(null, "", "#/products");
      }
    });
    document.getElementById("detailOverlay").addEventListener("click", e => {
      if (e.target === e.currentTarget) {
        closeDetail();
        if (this.currentView === "products") history.pushState(null, "", "#/products");
      }
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && !document.getElementById("detailOverlay").hidden) {
        closeDetail();
        if (this.currentView === "products") history.pushState(null, "", "#/products");
      }
    });
  },
};

// ─────────────────────────────────────────────
// 製品ビュー
// ─────────────────────────────────────────────

const state = {
  query: "",
  categories: new Set(),
  scans: new Set(),
  countries: new Set(),
  manufacturers: new Set(),
  rangeMin: "",
  rangeMax: "",
  waveMin: "",
  waveMax: "",
  rules: [],
  hideDiscontinued: false,
  sort: "default",
  activeId: null,
  nextRuleId: 1,
  _eventsSetup: false,
};

function renderProductsView() {
  const container = document.getElementById("viewContainer");
  const needsShell = !document.getElementById("lidarGrid") || !document.getElementById("controlPanel");

  if (needsShell) {
    container.innerHTML = `
      <div class="app-layout">
        <aside class="control-panel" id="controlPanel">
          <div class="panel-header">
            <h2>絞り込み</h2>
            <button class="ghost-button" id="clearFiltersButton" type="button">全解除</button>
          </div>
          <div class="quick-search">
            <span class="material-symbols-outlined">search</span>
            <input id="queryInput" type="search" placeholder="製品名・メーカーで検索" autocomplete="off" />
          </div>
          <div class="panel-scroll">
            <section class="filter-block">
              <div class="filter-block__title">カテゴリ</div>
              <select id="categoryFilterSelect" class="filter-select filter-select--facet">
                <option value="">すべて</option>
              </select>
            </section>
            <section class="filter-block">
              <div class="filter-block__title">走査方式</div>
              <select id="scanFilterSelect" class="filter-select filter-select--facet">
                <option value="">すべて</option>
              </select>
            </section>
            <section class="filter-block">
              <div class="filter-block__title">波長</div>
              <div class="range-control">
                <div class="range-control__head">
                  <span id="waveFilterLabel">すべて</span>
                  <button class="ghost-button" id="clearWaveButton" type="button">解除</button>
                </div>
                <div class="range-control__slider-shell" id="waveSlider">
                  <div class="range-control__track"></div>
                  <div class="range-control__fill" id="waveFill"></div>
                  <button class="range-thumb range-thumb--min" id="waveMinThumb" type="button" aria-label="最小波長"></button>
                  <button class="range-thumb range-thumb--max" id="waveMaxThumb" type="button" aria-label="最大波長"></button>
                </div>
                <div class="range-control__scale">
                  <span id="waveMinValue">${WAVE_NM_DOMAIN.min} nm</span>
                  <span id="waveMaxValue">${WAVE_NM_DOMAIN.max} nm</span>
                </div>
              </div>
            </section>
            <section class="filter-block">
              <div class="filter-block__title">メーカー</div>
              <div class="chip-group" id="manufacturerFilterGroup"></div>
            </section>
            <section class="filter-block">
              <div class="filter-block__title">国</div>
              <div class="chip-group" id="countryFilterGroup"></div>
            </section>
            <section class="filter-block">
              <div class="filter-block__title">最大検知距離</div>
              <div class="range-control">
                <div class="range-control__head">
                  <span id="rangeFilterLabel">すべて</span>
                  <button class="ghost-button" id="clearRangeButton" type="button">解除</button>
                </div>
                <div class="range-control__slider-shell" id="rangeSlider">
                  <div class="range-control__track"></div>
                  <div class="range-control__fill" id="rangeFill"></div>
                  <button class="range-thumb range-thumb--min" id="rangeMinThumb" type="button" aria-label="最小値"></button>
                  <button class="range-thumb range-thumb--max" id="rangeMaxThumb" type="button" aria-label="最大値"></button>
                </div>
                <div class="range-control__scale">
                  <span id="rangeMinValue">${RANGE_DOMAIN.min} m</span>
                  <span id="rangeMaxValue">${RANGE_DOMAIN.max} m</span>
                </div>
              </div>
            </section>
            <section class="filter-block">
              <div class="filter-block__title">全プロパティ</div>
              <div class="filter-builder__toolbar">
                <button class="ghost-button" id="addFilterRuleButton" type="button">条件を追加</button>
              </div>
              <div class="filter-builder" id="filterBuilder"></div>
              <div class="filter-builder__empty" id="filterBuilderEmpty">
                条件を追加して、製品の任意プロパティで絞り込めます。
              </div>
            </section>
            <div class="filter-block filter-block--checkbox">
              <label class="checkbox-label">
                <input type="checkbox" id="hideDiscontinued" />
                <span>廃番・統合済み製品を除外</span>
              </label>
            </div>
          </div>
        </aside>
        <main class="catalog-stage" id="catalogStage">
          <div class="catalog-header">
            <div class="catalog-stats">
              <span class="count-pill" id="resultCount">0件</span>
              <span class="catalog-stats__total" id="totalCount"></span>
            </div>
            <div class="sort-row">
              <label for="sortSelect">並び替え</label>
              <select id="sortSelect" class="filter-select">
                <option value="default">メーカー順</option>
                <option value="range-desc">最大距離（遠い順）</option>
                <option value="range-asc">最大距離（近い順）</option>
                <option value="name-asc">製品名順</option>
              </select>
            </div>
          </div>
          <div class="active-filters" id="activeFilters"></div>
          <div class="empty-hint" id="emptyHint" hidden>
            条件に一致するLiDARが見つかりません。フィルタを一部解除するか、キーワードを変更してください。
          </div>
          <div class="lidar-grid" id="lidarGrid" role="list"></div>
        </main>
      </div>
    `;
    buildFilterChips();
    setupProductsEvents();
  }

  // フィルタ状態をUIへ同期
  syncFacetControls();
  renderFilterBuilder();
  renderProductResults();
}

function syncFacetControls() {
  const categorySelect = document.getElementById("categoryFilterSelect");
  const scanSelect = document.getElementById("scanFilterSelect");

  if (categorySelect) categorySelect.value = state.categories.values().next().value ?? "";
  if (scanSelect) scanSelect.value = state.scans.values().next().value ?? "";

  const rangeBounds = getRenderedRangeBounds();
  const rMinPct = rangeValueToPercent(rangeBounds.min);
  const rMaxPct = rangeValueToPercent(rangeBounds.max);
  const rangeMinThumb = document.getElementById("rangeMinThumb");
  const rangeMaxThumb = document.getElementById("rangeMaxThumb");
  const rangeFill = document.getElementById("rangeFill");
  if (rangeMinThumb) {
    rangeMinThumb.style.left = `${rMinPct}%`;
    rangeMinThumb.setAttribute("aria-valuenow", String(rangeBounds.min));
    rangeMinThumb.setAttribute("aria-valuemin", String(RANGE_DOMAIN.min));
    rangeMinThumb.setAttribute("aria-valuemax", String(rangeBounds.max));
  }
  if (rangeMaxThumb) {
    rangeMaxThumb.style.left = `${rMaxPct}%`;
    rangeMaxThumb.setAttribute("aria-valuenow", String(rangeBounds.max));
    rangeMaxThumb.setAttribute("aria-valuemin", String(rangeBounds.min));
    rangeMaxThumb.setAttribute("aria-valuemax", String(RANGE_DOMAIN.max));
  }
  if (rangeFill) {
    rangeFill.hidden = !rangeBounds.active;
    rangeFill.style.left = `${rMinPct}%`;
    rangeFill.style.width = `${Math.max(0, rMaxPct - rMinPct)}%`;
  }
  const rangeMinValue = document.getElementById("rangeMinValue");
  const rangeMaxValue = document.getElementById("rangeMaxValue");
  if (rangeMinValue) rangeMinValue.textContent = `${rangeBounds.min} m`;
  if (rangeMaxValue) rangeMaxValue.textContent = `${rangeBounds.max} m`;
  const rangeLabel = document.getElementById("rangeFilterLabel");
  if (rangeLabel) rangeLabel.textContent = getRangeSummaryLabel();

  const waveBounds = getRenderedWaveBounds();
  const wMinPct = waveValueToPercent(waveBounds.min);
  const wMaxPct = waveValueToPercent(waveBounds.max);
  const waveMinThumb = document.getElementById("waveMinThumb");
  const waveMaxThumb = document.getElementById("waveMaxThumb");
  const waveFill = document.getElementById("waveFill");
  if (waveMinThumb) {
    waveMinThumb.style.left = `${wMinPct}%`;
    waveMinThumb.setAttribute("aria-valuenow", String(waveBounds.min));
    waveMinThumb.setAttribute("aria-valuemin", String(WAVE_NM_DOMAIN.min));
    waveMinThumb.setAttribute("aria-valuemax", String(waveBounds.max));
  }
  if (waveMaxThumb) {
    waveMaxThumb.style.left = `${wMaxPct}%`;
    waveMaxThumb.setAttribute("aria-valuenow", String(waveBounds.max));
    waveMaxThumb.setAttribute("aria-valuemin", String(waveBounds.min));
    waveMaxThumb.setAttribute("aria-valuemax", String(WAVE_NM_DOMAIN.max));
  }
  if (waveFill) {
    waveFill.hidden = !waveBounds.active;
    waveFill.style.left = `${wMinPct}%`;
    waveFill.style.width = `${Math.max(0, wMaxPct - wMinPct)}%`;
  }
  const waveMinValue = document.getElementById("waveMinValue");
  const waveMaxValue = document.getElementById("waveMaxValue");
  if (waveMinValue) waveMinValue.textContent = `${waveBounds.min} nm`;
  if (waveMaxValue) waveMaxValue.textContent = `${waveBounds.max} nm`;
  const waveLabel = document.getElementById("waveFilterLabel");
  if (waveLabel) waveLabel.textContent = getWaveSummaryLabel();

  document.querySelectorAll(".country-flag-btn").forEach(btn => {
    btn.classList.toggle("active", state.countries.has(btn.dataset.countryKey));
  });

  const qInput = document.getElementById("queryInput");
  if (qInput) qInput.value = state.query;
  const hdCheck = document.getElementById("hideDiscontinued");
  if (hdCheck) hdCheck.checked = state.hideDiscontinued;
  const sortSel = document.getElementById("sortSelect");
  if (sortSel) sortSel.value = state.sort;
}

function applyFilters() {
  const rangeBounds = getNormalizedRangeBounds();
  const waveBounds = getNormalizedWaveBounds();
  let result = ALL.filter(item => {
    if (state.hideDiscontinued && item.discontinued) return false;
    if (state.query && !item.searchText.includes(normalizeText(state.query))) return false;
    if (state.categories.size > 0 && !state.categories.has(item.categoryId)) return false;
    if (state.scans.size > 0 && !state.scans.has(item.scanId)) return false;
    if (state.manufacturers.size > 0 && !state.manufacturers.has(item.manufacturerId)) return false;
    if (state.countries.size > 0) {
      const itemCountries = parseCountryList(item.raw.manufacturer.country).map(c => c.key);
      if (!itemCountries.some(k => state.countries.has(k))) return false;
    }
    if (rangeBounds.min !== null || rangeBounds.max !== null) {
      if (item.maxRange === null) return false;
      if (rangeBounds.min !== null && item.maxRange < rangeBounds.min) return false;
      if (rangeBounds.max !== null && item.maxRange > rangeBounds.max) return false;
    }
    if (waveBounds.min !== null || waveBounds.max !== null) {
      const nm = waveNm(item.waveId);
      if (nm === null) return false;
      if (waveBounds.min !== null && nm < waveBounds.min) return false;
      if (waveBounds.max !== null && nm > waveBounds.max) return false;
    }
    for (const rule of state.rules) {
      if (!matchesFilterRule(item, rule)) return false;
    }
    return true;
  });

  if (state.sort === "range-desc") {
    result.sort((a, b) => {
      if (a.maxRange === null && b.maxRange === null) return 0;
      if (a.maxRange === null) return 1;
      if (b.maxRange === null) return -1;
      return b.maxRange - a.maxRange;
    });
  } else if (state.sort === "range-asc") {
    result.sort((a, b) => {
      if (a.maxRange === null && b.maxRange === null) return 0;
      if (a.maxRange === null) return 1;
      if (b.maxRange === null) return -1;
      return a.maxRange - b.maxRange;
    });
  } else if (state.sort === "name-asc") {
    result.sort((a, b) => a.raw.name.localeCompare(b.raw.name));
  } else {
    result.sort((a, b) => {
      const mCmp = a.raw.manufacturer.name.localeCompare(b.raw.manufacturer.name);
      return mCmp !== 0 ? mCmp : a.raw.name.localeCompare(b.raw.name);
    });
  }
  return result;
}

function renderGrid(items) {
  const grid = document.getElementById("lidarGrid");
  const emptyHint = document.getElementById("emptyHint");
  const resultCount = document.getElementById("resultCount");
  const totalCount = document.getElementById("totalCount");

  resultCount.textContent = `${items.length}件`;
  totalCount.textContent = `/ 全${ALL.length}件`;

  if (items.length === 0) {
    emptyHint.hidden = false;
    grid.innerHTML = "";
    return;
  }
  emptyHint.hidden = true;
  grid.innerHTML = "";
  for (const item of items) {
    grid.appendChild(buildCard(item));
  }
}

function buildCard(item) {
  const li = document.createElement("div");
  li.className = "lidar-card" + (item.discontinued ? " discontinued" : "");
  if (item.id === state.activeId) li.classList.add("active");
  li.setAttribute("role", "listitem");
  li.setAttribute("tabindex", "0");
  li.dataset.id = item.id;

  const catClass = CAT_BADGE_CLASS[item.categoryId] ?? "cat-research";
  const range = formatSpecDisplay(item.raw.specs.maxRange);
  const ch = formatSpecDisplay(item.raw.specs.channels, { includeUnit: false });
  const fovH = formatSpecDisplay(item.raw.specs.fovH, { includeUnit: false });
  const fovV = formatSpecDisplay(item.raw.specs.fovV, { includeUnit: false });
  const fovDisplay = (fovH.isMissing && fovV.isMissing)
    ? "—"
    : `${fovH.isMissing ? "—" : fovH.text + "°"} × ${fovV.isMissing ? "—" : fovV.text + "°"}`;
  const power = formatSpecDisplay(item.raw.specs.power, { includeUnit: false });

  const wave = item.raw.wavelength;
  const waveHtml = wave.id !== "unknown"
    ? `<span class="badge badge--wave-1550">${wave.label}</span>`
    : "";

  li.innerHTML = `
    <div class="lidar-card__header">
      <div>
        <div class="lidar-card__name">${esc(item.raw.name)}</div>
        <div class="lidar-card__manufacturer">${esc(item.raw.manufacturer.name)} ${esc(item.raw.manufacturer.country)}</div>
      </div>
      <div class="lidar-card__badges">
        <span class="badge badge--cat-${catClass}">${esc(item.raw.category.labelJa)}</span>
        ${item.discontinued ? '<span class="badge badge--discontinued">廃番 / 統合</span>' : ""}
      </div>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px;">
      <span class="badge badge--scan">${esc(item.raw.scanningMethod.labelJa)}</span>
      ${waveHtml}
    </div>
    <div class="lidar-card__specs">
      <div class="spec-item${range.isMissing ? " spec-item--na" : ""}">
        <div class="spec-item__label">最大距離</div>
        <div class="spec-item__value">${range.text}</div>
      </div>
      <div class="spec-item${ch.isMissing ? " spec-item--na" : ""}">
        <div class="spec-item__label">チャンネル数</div>
        <div class="spec-item__value">${ch.isMissing ? "—" : ch.text + '<span class="spec-item__unit"> ch</span>'}</div>
      </div>
      <div class="spec-item${fovDisplay === "—" ? " spec-item--na" : ""}">
        <div class="spec-item__label">FOV（H × V）</div>
        <div class="spec-item__value">${fovDisplay}</div>
      </div>
      <div class="spec-item${power.isMissing ? " spec-item--na" : ""}">
        <div class="spec-item__label">消費電力</div>
        <div class="spec-item__value">${power.isMissing ? "—" : power.text + '<span class="spec-item__unit"> W</span>'}</div>
      </div>
    </div>
  `;

  li.addEventListener("click", () => openDetail(item));
  li.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDetail(item); }
  });
  return li;
}

function renderProductResults() {
  const items = applyFilters();
  renderGrid(items);
  renderActiveFilters();
  syncFacetControls();
}

function buildFilterChips() {
  const categorySelect = document.getElementById("categoryFilterSelect");
  const scanSelect = document.getElementById("scanFilterSelect");

  if (categorySelect) {
    categorySelect.innerHTML = `
      <option value="">すべて</option>
      ${[...new Set(ALL.map(i => i.raw.category.id))]
        .map(catId => CAT_BY_ID[catId])
        .filter(Boolean)
        .sort((a, b) => a.labelJa.localeCompare(b.labelJa))
        .map(cat => `<option value="${esc(cat.id)}">${esc(cat.labelJa)}</option>`)
        .join("")}
    `;
  }

  if (scanSelect) {
    scanSelect.innerHTML = `
      <option value="">すべて</option>
      ${[...new Set(ALL.map(i => i.raw.scanningMethod.id))]
        .map(scanId => SCAN_BY_ID[scanId])
        .filter(Boolean)
        .sort((a, b) => a.labelJa.localeCompare(b.labelJa))
        .map(scan => `<option value="${esc(scan.id)}">${esc(scan.labelJa)}</option>`)
        .join("")}
    `;
  }

  const usedMfrs = [...new Set(ALL.map(i => i.raw.manufacturer.id))].sort((a, b) =>
    (M_BY_ID[a]?.name ?? a).localeCompare(M_BY_ID[b]?.name ?? b)
  );
  const mfrGroup = document.getElementById("manufacturerFilterGroup");
  mfrGroup.innerHTML = "";
  for (const mfrId of usedMfrs) {
    const mfr = M_BY_ID[mfrId];
    if (!mfr) continue;
    const btn = makeChipBtn(mfr.name, () => toggleFilter(state.manufacturers, mfrId, btn));
    mfrGroup.appendChild(btn);
  }

  const countryGroup = document.getElementById("countryFilterGroup");
  countryGroup.innerHTML = "";
  for (const c of ALL_COUNTRIES) {
    const btn = document.createElement("button");
    btn.className = "chip-button country-flag-btn";
    btn.type = "button";
    btn.textContent = c.flag;
    btn.title = c.name;
    btn.dataset.countryKey = c.key;
    btn.classList.toggle("active", state.countries.has(c.key));
    countryGroup.appendChild(btn);
  }
}

function makeChipBtn(label, onClick) {
  const btn = document.createElement("button");
  btn.className = "chip-button";
  btn.type = "button";
  btn.textContent = label;
  btn.addEventListener("click", onClick);
  return btn;
}

function toggleFilter(set, key, btn) {
  if (set.has(key)) { set.delete(key); btn.classList.remove("active"); }
  else { set.add(key); btn.classList.add("active"); }
  renderProductResults();
}

function setExclusiveFilter(set, key) {
  set.clear();
  if (key) set.add(key);
}

function parseRangeInputValue(value) {
  if (value === "" || value === null || value === undefined) return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function getNormalizedRangeBounds() {
  const min = parseRangeInputValue(state.rangeMin);
  const max = parseRangeInputValue(state.rangeMax);
  if (min === null && max === null) return { min: null, max: null };
  if (min !== null && max !== null && min > max) return { min: max, max: min };
  if (min === RANGE_DOMAIN.min && max === RANGE_DOMAIN.max) return { min: null, max: null };
  return { min, max };
}

function formatRangeSummaryLabel(bounds) {
  if (bounds.min === null && bounds.max === null) return "すべて";
  if (bounds.min !== null && bounds.max !== null) return `${bounds.min}〜${bounds.max} m`;
  if (bounds.min !== null) return `${bounds.min} m以上`;
  return `${bounds.max} m以下`;
}

function getRangeSummaryLabel() {
  return formatRangeSummaryLabel(getNormalizedRangeBounds());
}

function rangeValueToPercent(value) {
  if (RANGE_DOMAIN.max === RANGE_DOMAIN.min) return 0;
  return ((value - RANGE_DOMAIN.min) / (RANGE_DOMAIN.max - RANGE_DOMAIN.min)) * 100;
}

function rangePercentToValue(percent) {
  const clamped = Math.min(100, Math.max(0, percent));
  const raw = RANGE_DOMAIN.min + (clamped / 100) * (RANGE_DOMAIN.max - RANGE_DOMAIN.min);
  return Math.round(raw);
}

function setRangeBounds(minValue, maxValue) {
  if (minValue === RANGE_DOMAIN.min && maxValue === RANGE_DOMAIN.max) {
    state.rangeMin = "";
    state.rangeMax = "";
    return;
  }
  state.rangeMin = String(minValue);
  state.rangeMax = String(maxValue);
}

function getRenderedRangeBounds() {
  const bounds = getNormalizedRangeBounds();
  return {
    min: bounds.min ?? RANGE_DOMAIN.min,
    max: bounds.max ?? RANGE_DOMAIN.max,
    active: bounds.min !== null || bounds.max !== null,
  };
}

function chooseRangeThumb(clientX) {
  const bounds = getRenderedRangeBounds();
  const shell = document.getElementById("rangeSlider");
  if (!shell) return "min";
  const rect = shell.getBoundingClientRect();
  const value = rangePercentToValue(((clientX - rect.left) / rect.width) * 100);
  const minDistance = Math.abs(value - bounds.min);
  const maxDistance = Math.abs(value - bounds.max);
  if (minDistance === maxDistance) {
    return clientX < rect.left + rect.width / 2 ? "min" : "max";
  }
  return minDistance < maxDistance ? "min" : "max";
}

function updateRangeFromClientX(clientX, thumb) {
  const shell = document.getElementById("rangeSlider");
  if (!shell) return;
  const rect = shell.getBoundingClientRect();
  const value = rangePercentToValue(((clientX - rect.left) / rect.width) * 100);
  const bounds = getRenderedRangeBounds();

  if (thumb === "min") {
    setRangeBounds(Math.min(value, bounds.max), bounds.max);
  } else {
    setRangeBounds(bounds.min, Math.max(value, bounds.min));
  }
}

function handleRangeThumbKeydown(thumb, event) {
  const bounds = getRenderedRangeBounds();
  const current = thumb === "min" ? bounds.min : bounds.max;
  const minLimit = RANGE_DOMAIN.min;
  const maxLimit = RANGE_DOMAIN.max;
  let next = current;

  if (event.key === "ArrowLeft" || event.key === "ArrowDown") next -= 1;
  else if (event.key === "ArrowRight" || event.key === "ArrowUp") next += 1;
  else if (event.key === "PageDown") next -= 10;
  else if (event.key === "PageUp") next += 10;
  else if (event.key === "Home") next = thumb === "min" ? minLimit : bounds.min;
  else if (event.key === "End") next = thumb === "min" ? bounds.max : maxLimit;
  else return;

  event.preventDefault();
  next = Math.max(minLimit, Math.min(maxLimit, next));
  if (thumb === "min") {
    setRangeBounds(Math.min(next, bounds.max), bounds.max);
  } else {
    setRangeBounds(bounds.min, Math.max(next, bounds.min));
  }
  renderProductResults();
}

function getNormalizedWaveBounds() {
  const min = parseRangeInputValue(state.waveMin);
  const max = parseRangeInputValue(state.waveMax);
  if (min === null && max === null) return { min: null, max: null };
  if (min !== null && max !== null && min > max) return { min: max, max: min };
  if (min === WAVE_NM_DOMAIN.min && max === WAVE_NM_DOMAIN.max) return { min: null, max: null };
  return { min, max };
}

function getRenderedWaveBounds() {
  const bounds = getNormalizedWaveBounds();
  return {
    min: bounds.min ?? WAVE_NM_DOMAIN.min,
    max: bounds.max ?? WAVE_NM_DOMAIN.max,
    active: bounds.min !== null || bounds.max !== null,
  };
}

function setWaveBounds(minValue, maxValue) {
  if (minValue === WAVE_NM_DOMAIN.min && maxValue === WAVE_NM_DOMAIN.max) {
    state.waveMin = "";
    state.waveMax = "";
    return;
  }
  state.waveMin = String(minValue);
  state.waveMax = String(maxValue);
}

function waveValueToPercent(value) {
  if (WAVE_NM_DOMAIN.max === WAVE_NM_DOMAIN.min) return 0;
  return ((value - WAVE_NM_DOMAIN.min) / (WAVE_NM_DOMAIN.max - WAVE_NM_DOMAIN.min)) * 100;
}

function wavePercentToValue(percent) {
  const clamped = Math.min(100, Math.max(0, percent));
  const raw = WAVE_NM_DOMAIN.min + (clamped / 100) * (WAVE_NM_DOMAIN.max - WAVE_NM_DOMAIN.min);
  return Math.round(raw);
}

function formatWaveSummaryLabel(bounds) {
  if (bounds.min === null && bounds.max === null) return "すべて";
  if (bounds.min !== null && bounds.max !== null) return `${bounds.min}〜${bounds.max} nm`;
  if (bounds.min !== null) return `${bounds.min} nm以上`;
  return `${bounds.max} nm以下`;
}

function getWaveSummaryLabel() {
  return formatWaveSummaryLabel(getNormalizedWaveBounds());
}

function chooseWaveThumb(clientX) {
  const bounds = getRenderedWaveBounds();
  const shell = document.getElementById("waveSlider");
  if (!shell) return "min";
  const rect = shell.getBoundingClientRect();
  const value = wavePercentToValue(((clientX - rect.left) / rect.width) * 100);
  const minDistance = Math.abs(value - bounds.min);
  const maxDistance = Math.abs(value - bounds.max);
  if (minDistance === maxDistance) {
    return clientX < rect.left + rect.width / 2 ? "min" : "max";
  }
  return minDistance < maxDistance ? "min" : "max";
}

function updateWaveFromClientX(clientX, thumb) {
  const shell = document.getElementById("waveSlider");
  if (!shell) return;
  const rect = shell.getBoundingClientRect();
  const value = wavePercentToValue(((clientX - rect.left) / rect.width) * 100);
  const bounds = getRenderedWaveBounds();
  if (thumb === "min") {
    setWaveBounds(Math.min(value, bounds.max), bounds.max);
  } else {
    setWaveBounds(bounds.min, Math.max(value, bounds.min));
  }
}

function handleWaveThumbKeydown(thumb, event) {
  const bounds = getRenderedWaveBounds();
  const current = thumb === "min" ? bounds.min : bounds.max;
  let next = current;

  if (event.key === "ArrowLeft" || event.key === "ArrowDown") next -= 1;
  else if (event.key === "ArrowRight" || event.key === "ArrowUp") next += 1;
  else if (event.key === "PageDown") next -= 10;
  else if (event.key === "PageUp") next += 10;
  else if (event.key === "Home") next = thumb === "min" ? WAVE_NM_DOMAIN.min : bounds.min;
  else if (event.key === "End") next = thumb === "min" ? bounds.max : WAVE_NM_DOMAIN.max;
  else return;

  event.preventDefault();
  next = Math.max(WAVE_NM_DOMAIN.min, Math.min(WAVE_NM_DOMAIN.max, next));
  if (thumb === "min") {
    setWaveBounds(Math.min(next, bounds.max), bounds.max);
  } else {
    setWaveBounds(bounds.min, Math.max(next, bounds.min));
  }
  renderProductResults();
}

function clearAllFilters() {
  state.query = "";
  state.categories.clear();
  state.scans.clear();
  state.countries.clear();
  state.manufacturers.clear();
  state.rangeMin = "";
  state.rangeMax = "";
  state.waveMin = "";
  state.waveMax = "";
  state.rules = [];
  state.nextRuleId = 1;
  state.hideDiscontinued = false;
  document.getElementById("queryInput").value = "";
  document.getElementById("hideDiscontinued").checked = false;
  renderFilterBuilder();
  renderProductResults();
}

function renderActiveFilters() {
  const container = document.getElementById("activeFilters");
  container.innerHTML = "";

  function addChip(label, onRemove) {
    const chip = document.createElement("button");
    chip.className = "active-filter-chip";
    chip.type = "button";
    chip.innerHTML = `${esc(label)} <span class="material-symbols-outlined" style="font-size:14px;">close</span>`;
    chip.addEventListener("click", onRemove);
    container.appendChild(chip);
  }

  if (state.query) addChip(`"${state.query}"`, () => {
    state.query = "";
    document.getElementById("queryInput").value = "";
    renderProductResults();
  });
  for (const id of state.categories) {
    const cat = CAT_BY_ID[id];
    if (cat) addChip(cat.labelJa, () => {
      state.categories.delete(id);
      renderProductResults();
    });
  }
  for (const id of state.scans) {
    const scan = SCAN_BY_ID[id];
    if (scan) addChip(scan.labelJa, () => {
      state.scans.delete(id);
      renderProductResults();
    });
  }
  for (const id of state.manufacturers) {
    const mfr = M_BY_ID[id];
    if (mfr) addChip(mfr.name, () => {
      state.manufacturers.delete(id);
      renderProductResults();
    });
  }
  for (const key of state.countries) {
    addChip(key, () => {
      state.countries.delete(key);
      renderProductResults();
    });
  }
  const rangeBounds = getNormalizedRangeBounds();
  if (rangeBounds.min !== null || rangeBounds.max !== null) {
    addChip(`最大距離: ${formatRangeSummaryLabel(rangeBounds)}`, () => {
      state.rangeMin = "";
      state.rangeMax = "";
      renderProductResults();
    });
  }
  const waveBounds = getNormalizedWaveBounds();
  if (waveBounds.min !== null || waveBounds.max !== null) {
    addChip(`波長: ${formatWaveSummaryLabel(waveBounds)}`, () => {
      state.waveMin = "";
      state.waveMax = "";
      renderProductResults();
    });
  }

  for (const rule of state.rules) {
    const label = formatFilterRuleLabel(rule);
    if (!label) continue;
    addChip(label, () => {
      state.rules = state.rules.filter(r => r.id !== rule.id);
      renderFilterBuilder();
      renderProductResults();
    });
  }
}

function setupProductsEvents() {
  if (state._eventsSetup) return;
  state._eventsSetup = true;
  let rangePointer = null;

  document.getElementById("viewContainer").addEventListener("input", e => {
    if (e.target.id === "queryInput") {
      state.query = e.target.value.trim();
      renderProductResults();
      return;
    }
    if (e.target.classList.contains("filter-rule__value")) {
      const ruleId = Number(e.target.closest(".filter-rule")?.dataset.ruleId);
      const rule = state.rules.find(r => r.id === ruleId);
      if (!rule) return;
      rule.value = e.target.value;
      renderProductResults();
    }
  });
  document.getElementById("viewContainer").addEventListener("change", e => {
    if (e.target.id === "sortSelect") { state.sort = e.target.value; renderProductResults(); }
    if (e.target.id === "hideDiscontinued") { state.hideDiscontinued = e.target.checked; renderProductResults(); }
    if (e.target.id === "categoryFilterSelect") {
      setExclusiveFilter(state.categories, e.target.value);
      renderProductResults();
      return;
    }
    if (e.target.id === "scanFilterSelect") {
      setExclusiveFilter(state.scans, e.target.value);
      renderProductResults();
      return;
    }
    if (e.target.classList.contains("filter-rule__field")) {
      const ruleId = Number(e.target.closest(".filter-rule")?.dataset.ruleId);
      const rule = state.rules.find(r => r.id === ruleId);
      if (!rule) return;
      rule.fieldId = e.target.value;
      rule.operator = getDefaultOperatorForField(rule.fieldId);
      rule.value = "";
      renderFilterBuilder();
      renderProductResults();
      return;
    }
    if (e.target.classList.contains("filter-rule__operator")) {
      const ruleId = Number(e.target.closest(".filter-rule")?.dataset.ruleId);
      const rule = state.rules.find(r => r.id === ruleId);
      if (!rule) return;
      rule.operator = e.target.value;
      renderFilterBuilder();
      renderProductResults();
      return;
    }
    if (e.target.classList.contains("filter-rule__value")) {
      const ruleId = Number(e.target.closest(".filter-rule")?.dataset.ruleId);
      const rule = state.rules.find(r => r.id === ruleId);
      if (!rule) return;
      rule.value = e.target.value;
      renderProductResults();
      return;
    }
  });
  document.getElementById("viewContainer").addEventListener("click", e => {
    if (e.target.closest("#clearFiltersButton")) clearAllFilters();
    if (e.target.closest("#clearRangeButton")) {
      state.rangeMin = "";
      state.rangeMax = "";
      renderProductResults();
      return;
    }
    if (e.target.closest("#clearWaveButton")) {
      state.waveMin = "";
      state.waveMax = "";
      renderProductResults();
      return;
    }
    const countryBtn = e.target.closest(".country-flag-btn");
    if (countryBtn) {
      const key = countryBtn.dataset.countryKey;
      if (state.countries.has(key)) state.countries.delete(key);
      else state.countries.add(key);
      renderProductResults();
      return;
    }
    if (e.target.closest("#addFilterRuleButton")) {
      addFilterRule();
      renderFilterBuilder();
      renderProductResults();
      return;
    }
    const removeBtn = e.target.closest(".filter-rule__remove");
    if (removeBtn) {
      const ruleId = Number(removeBtn.closest(".filter-rule")?.dataset.ruleId);
      state.rules = state.rules.filter(r => r.id !== ruleId);
      renderFilterBuilder();
      renderProductResults();
    }
  });

  const rangeSlider = document.getElementById("rangeSlider");
  rangeSlider?.addEventListener("pointerdown", e => {
    const thumb = e.target.closest(".range-thumb");
    const activeThumb = thumb?.id === "rangeMaxThumb"
      ? "max"
      : thumb?.id === "rangeMinThumb"
        ? "min"
        : chooseRangeThumb(e.clientX);
    rangePointer = { thumb: activeThumb, pointerId: e.pointerId };
    rangeSlider.setPointerCapture(e.pointerId);
    updateRangeFromClientX(e.clientX, activeThumb);
    renderProductResults();
    e.preventDefault();
  }, true);
  rangeSlider?.addEventListener("pointermove", e => {
    if (!rangePointer || rangePointer.pointerId !== e.pointerId) return;
    updateRangeFromClientX(e.clientX, rangePointer.thumb);
    syncFacetControls();
  });
  const endRangeDrag = e => {
    if (!rangePointer || rangePointer.pointerId !== e.pointerId) return;
    rangePointer = null;
    try { rangeSlider?.releasePointerCapture(e.pointerId); } catch {}
    renderProductResults();
  };
  rangeSlider?.addEventListener("pointerup", endRangeDrag);
  rangeSlider?.addEventListener("pointercancel", endRangeDrag);
  rangeSlider?.addEventListener("keydown", e => {
    const thumb = e.target.closest(".range-thumb");
    if (!thumb) return;
    handleRangeThumbKeydown(thumb.id === "rangeMaxThumb" ? "max" : "min", e);
  });

  let wavePointer = null;
  const waveSlider = document.getElementById("waveSlider");
  waveSlider?.addEventListener("pointerdown", e => {
    const thumb = e.target.closest(".range-thumb");
    const activeThumb = thumb?.id === "waveMaxThumb"
      ? "max"
      : thumb?.id === "waveMinThumb"
        ? "min"
        : chooseWaveThumb(e.clientX);
    wavePointer = { thumb: activeThumb, pointerId: e.pointerId };
    waveSlider.setPointerCapture(e.pointerId);
    updateWaveFromClientX(e.clientX, activeThumb);
    renderProductResults();
    e.preventDefault();
  }, true);
  waveSlider?.addEventListener("pointermove", e => {
    if (!wavePointer || wavePointer.pointerId !== e.pointerId) return;
    updateWaveFromClientX(e.clientX, wavePointer.thumb);
    syncFacetControls();
  });
  const endWaveDrag = e => {
    if (!wavePointer || wavePointer.pointerId !== e.pointerId) return;
    wavePointer = null;
    try { waveSlider?.releasePointerCapture(e.pointerId); } catch {}
    renderProductResults();
  };
  waveSlider?.addEventListener("pointerup", endWaveDrag);
  waveSlider?.addEventListener("pointercancel", endWaveDrag);
  waveSlider?.addEventListener("keydown", e => {
    const thumb = e.target.closest(".range-thumb");
    if (!thumb) return;
    handleWaveThumbKeydown(thumb.id === "waveMaxThumb" ? "max" : "min", e);
  });

  // モバイルドック（mobileDock は viewContainer 外なので直接バインド）
  document.getElementById("mobileShowFilters")?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("mobile-panel-filters");
    document.getElementById("mobileShowFilters").classList.toggle("active", isOpen);
    document.getElementById("mobileShowCatalog").classList.toggle("active", !isOpen);
  });
  document.getElementById("mobileShowCatalog")?.addEventListener("click", () => {
    document.body.classList.remove("mobile-panel-filters");
    document.getElementById("mobileShowFilters")?.classList.remove("active");
    document.getElementById("mobileShowCatalog")?.classList.add("active");
  });
}

function addFilterRule(fieldId = "") {
  state.rules.push({
    id: state.nextRuleId++,
    fieldId,
    operator: fieldId ? getDefaultOperatorForField(fieldId) : "",
    value: "",
  });
}

function getDefaultOperatorForField(fieldId) {
  const field = FILTER_FIELD_BY_ID[fieldId];
  return field?.type === "text" ? "contains" : "equals";
}

function getOperatorsForField(field) {
  return FILTER_OPERATOR_OPTIONS[field?.type] ?? FILTER_OPERATOR_OPTIONS.text;
}

function isValueRequired(field, operator) {
  if (!field || !operator) return false;
  return operator !== "empty" && operator !== "notEmpty";
}

function isEmptyFilterValue(value) {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value)) return value.length === 0 || value.every(isEmptyFilterValue);
  return String(value).trim() === "";
}

function normalizeText(value) {
  return String(value).trim().toLowerCase();
}

function extractComparableValues(rawValue) {
  return Array.isArray(rawValue) ? rawValue : [rawValue];
}

function matchesTextRule(rawValue, expected, operator) {
  const needle = normalizeText(expected);
  if (!needle && operator !== "empty" && operator !== "notEmpty") return true;
  const values = extractComparableValues(rawValue);
  const normalized = values
    .filter(v => !isEmptyFilterValue(v))
    .map(v => normalizeText(v));

  if (operator === "contains") return normalized.some(v => v.includes(needle));
  if (operator === "notContains") return normalized.every(v => !v.includes(needle));
  if (operator === "equals") return normalized.some(v => v === needle);
  if (operator === "notEquals") return normalized.every(v => v !== needle);
  if (operator === "startsWith") return normalized.some(v => v.startsWith(needle));
  if (operator === "endsWith") return normalized.some(v => v.endsWith(needle));
  if (operator === "empty") return normalized.length === 0;
  if (operator === "notEmpty") return normalized.length > 0;
  return true;
}

function matchesNumberRule(rawValue, expected, operator) {
  const needle = Number(expected);
  if (!Number.isFinite(needle)) {
    return operator === "empty" ? isEmptyFilterValue(rawValue) : false;
  }
  const values = extractComparableValues(rawValue)
    .map(v => Number(v))
    .filter(v => Number.isFinite(v));

  if (operator === "empty") return values.length === 0;
  if (operator === "notEmpty") return values.length > 0;
  if (values.length === 0) return false;
  if (operator === "equals") return values.some(v => v === needle);
  if (operator === "notEquals") return values.every(v => v !== needle);
  if (operator === "lt") return values.some(v => v < needle);
  if (operator === "lte") return values.some(v => v <= needle);
  if (operator === "gt") return values.some(v => v > needle);
  if (operator === "gte") return values.some(v => v >= needle);
  return true;
}

function matchesBooleanRule(rawValue, expected, operator) {
  const needle = String(expected) === "true";
  if (operator === "notEquals") return Boolean(rawValue) !== needle;
  return Boolean(rawValue) === needle;
}

function matchesFilterRule(item, rule) {
  const field = FILTER_FIELD_BY_ID[rule.fieldId];
  if (!field || !rule.operator) return true;
  if (isValueRequired(field, rule.operator) && isEmptyFilterValue(rule.value)) return true;
  const rawValue = field.getter(item);

  if (rule.operator === "empty") return isEmptyFilterValue(rawValue);
  if (rule.operator === "notEmpty") return !isEmptyFilterValue(rawValue);

  if (field.type === "number") {
    return matchesNumberRule(rawValue, rule.value, rule.operator);
  }
  if (field.type === "boolean") {
    return matchesBooleanRule(rawValue, rule.value, rule.operator);
  }
  if (field.type === "enum") {
    return matchesTextRule(rawValue, rule.value, rule.operator);
  }
  return matchesTextRule(rawValue, rule.value, rule.operator);
}

function formatFilterRuleValue(rule, field) {
  if (!field) return "";
  if (field.type === "enum") return field.valueLabel?.(rule.value) ?? rule.value;
  if (field.type === "boolean") return String(rule.value) === "true" ? "はい" : "いいえ";
  return rule.value;
}

function formatFilterRuleLabel(rule) {
  const field = FILTER_FIELD_BY_ID[rule.fieldId];
  if (!field) return "";
  const operator = getOperatorsForField(field).find(op => op.id === rule.operator);
  if (!operator) return "";
  if (isValueRequired(field, rule.operator) && isEmptyFilterValue(rule.value)) return "";
  if (rule.operator === "empty" || rule.operator === "notEmpty") {
    return `${field.label} ${operator.label}`;
  }
  const value = formatFilterRuleValue(rule, field);
  return `${field.label} ${operator.label} ${value}`;
}

function renderFilterBuilder() {
  const builder = document.getElementById("filterBuilder");
  const empty = document.getElementById("filterBuilderEmpty");
  if (!builder || !empty) return;

  empty.hidden = state.rules.length > 0;
  builder.innerHTML = state.rules.map(rule => renderFilterRuleRow(rule)).join("");
}

function renderFilterRuleRow(rule) {
  const field = FILTER_FIELD_BY_ID[rule.fieldId];
  const fieldOptions = `
    <option value="">プロパティを選択</option>
    ${FILTER_FIELD_GROUPS.map(group => `
      <optgroup label="${esc(group.group)}">
        ${group.fields.map(fieldDef => `
          <option value="${esc(fieldDef.id)}"${fieldDef.id === rule.fieldId ? " selected" : ""}>${esc(fieldDef.label)}</option>
        `).join("")}
      </optgroup>
    `).join("")}
  `;

  const operatorOptions = field
    ? getOperatorsForField(field).map(op => `<option value="${esc(op.id)}"${op.id === rule.operator ? " selected" : ""}>${esc(op.label)}</option>`).join("")
    : `<option value="">—</option>`;

  const valueControl = renderFilterRuleValueControl(rule, field);

  return `
    <div class="filter-rule" data-rule-id="${rule.id}">
      <div class="filter-rule__row">
        <select class="filter-select filter-rule__field">
          ${fieldOptions}
        </select>
        <select class="filter-select filter-rule__operator"${field ? "" : " disabled"}>
          ${operatorOptions}
        </select>
        ${valueControl}
        <button class="ghost-button filter-rule__remove" type="button">削除</button>
      </div>
    </div>
  `;
}

function renderFilterRuleValueControl(rule, field) {
  const needsValue = isValueRequired(field, rule.operator);
  if (!field) {
    return `<input class="filter-select filter-rule__value" type="text" placeholder="プロパティ選択後に入力" disabled />`;
  }
  if (!needsValue) {
    return `<div class="filter-rule__value filter-rule__value--static">値不要</div>`;
  }
  if (field.type === "enum") {
    const options = field.options.map(option => `
      <option value="${esc(option.value)}"${String(option.value) === String(rule.value) ? " selected" : ""}>${esc(option.label)}</option>
    `).join("");
    return `
      <select class="filter-select filter-rule__value">
        <option value="">選択してください</option>
        ${options}
      </select>
    `;
  }
  if (field.type === "boolean") {
    return `
      <select class="filter-select filter-rule__value">
        <option value="true"${String(rule.value) === "true" ? " selected" : ""}>はい</option>
        <option value="false"${String(rule.value) === "false" ? " selected" : ""}>いいえ</option>
      </select>
    `;
  }
  if (field.type === "number") {
    const unit = field.unit ? ` ${esc(field.unit)}` : "";
    return `
      <label class="filter-rule__number">
        <input class="filter-select filter-rule__value" type="number" step="any" value="${esc(rule.value)}" placeholder="数値を入力" />
        ${unit ? `<span class="filter-rule__unit">${unit}</span>` : ""}
      </label>
    `;
  }
  return `<input class="filter-select filter-rule__value" type="text" value="${esc(rule.value)}" placeholder="値を入力" />`;
}

// ─────────────────────────────────────────────
// 詳細ドロワー
// ─────────────────────────────────────────────

function openDetailById(id) {
  const item = ALL.find(i => i.id === id);
  if (item) openDetail(item);
}

function openDetail(item) {
  state.activeId = item.id;
  document.querySelectorAll(".lidar-card").forEach(el => {
    el.classList.toggle("active", el.dataset.id === item.id);
  });

  const overlay = document.getElementById("detailOverlay");
  document.getElementById("detailTitle").textContent = item.raw.name;
  document.getElementById("detailSubtitle").textContent =
    `${item.raw.manufacturer.name}（${item.raw.manufacturer.country}）`;

  const catClass = CAT_BADGE_CLASS[item.categoryId] ?? "cat-research";
  document.getElementById("detailBadges").innerHTML = `
    <a href="#/categories/${item.raw.category.id}" class="badge badge--cat-${catClass}" style="text-decoration:none">${esc(item.raw.category.labelJa)}</a>
    <a href="#/scan-methods/${item.raw.scanningMethod.id}" class="badge badge--scan" style="text-decoration:none">${esc(item.raw.scanningMethod.labelJa)}</a>
    ${item.raw.wavelength.id !== "unknown" ? `<a href="#/wavelengths/${item.raw.wavelength.id}" class="badge badge--wave-1550" style="text-decoration:none">${esc(item.raw.wavelength.label)}</a>` : ""}
    ${item.discontinued ? '<span class="badge badge--discontinued">廃番 / 統合済み</span>' : ""}
  `;

  document.getElementById("detailBody").innerHTML = buildDetailBody(item);
  overlay.hidden = false;
  document.getElementById("closeDetail").focus();
}

function buildDetailBody(item) {
  const r = item.raw;
  const refs = r.references;

  function refLinks(refNums) {
    if (!refNums || refNums.length === 0) return "";
    const links = refNums.map(n => {
      const ref = refs.find(rf => rf.id === n);
      if (!ref) return "";
      return `<a href="${esc(ref.url)}" target="_blank" rel="noopener" title="${esc(ref.title)}">${n}</a>`;
    }).filter(Boolean).join("");
    return links ? `<span class="ref-sup">${links}</span>` : "";
  }

  function specRow(label, spec, fieldId = null) {
    const labelHtml = fieldId && PARAMETER_BY_ID[fieldId]
      ? `<a class="spec-link" href="#/parameters/${fieldId}">${esc(label)}</a>`
      : esc(label);
    if (!spec) return `<tr><td>${labelHtml}</td><td class="spec-na">—</td></tr>`;
    const display = fieldId === "beamDivergence"
      ? formatBeamDivergenceDisplay(spec)
      : formatSpecDisplay(spec, { joiner: fieldId === "protection" ? ", " : null });
    if (display.isMissing)
      return `<tr><td>${labelHtml}</td><td class="spec-na">不明 / 非公開${refLinks(spec.refs)}</td></tr>`;
    const note = spec.note ? `<span class="spec-note">${esc(spec.note)}</span>` : "";
    return `<tr><td>${labelHtml}</td><td>${esc(display.text)}${note}${refLinks(spec.refs)}</td></tr>`;
  }

  const s = r.specs;
  let html = "";

  if (r.discontinued) {
    html += `<div class="discontinued-notice">⚠️ この製品は廃番または他社と統合済みです。最新情報はメーカーサイトをご確認ください。</div>`;
  }

  html += `
    <div class="detail-section">
      <div class="detail-section__title"><span class="material-symbols-outlined">business</span>メーカー情報</div>
      <table class="specs-table">
        <tr><td>メーカー</td><td><a href="${esc(r.manufacturer.url)}" target="_blank" rel="noopener">${esc(r.manufacturer.name)}</a>${r.manufacturer.nameJa ? ` (${esc(r.manufacturer.nameJa)})` : ""}
          &nbsp;<a href="#/manufacturers/${r.manufacturer.id}" class="entity-link" style="font-size:11px;">← メーカーページ</a></td></tr>
        <tr><td>国</td><td>${esc(r.manufacturer.country)}</td></tr>
        ${r.manufacturer.notes ? `<tr><td>概要</td><td>${esc(r.manufacturer.notes)}</td></tr>` : ""}
        ${r.release?.value ? `<tr><td>リリース</td><td>${esc(String(r.release.value))}${refLinks(r.release.refs)}</td></tr>` : ""}
        ${r.useCases ? `<tr><td>用途</td><td>${esc(r.useCases)}</td></tr>` : ""}
      </table>
    </div>
    <div class="detail-section">
      <div class="detail-section__title"><span class="material-symbols-outlined">tune</span>基本性能</div>
      <table class="specs-table">
        ${specRow("チャンネル数", s.channels, "channels")}
        ${specRow("最大距離", s.maxRange, "maxRange")}
        ${specRow("ピーク距離（参考）", s.peakRange, "peakRange")}
        ${specRow("最小検知距離", s.minRange, "minRange")}
        ${specRow("精度", s.accuracy, "accuracy")}
        ${s.precision ? specRow("ばらつき（Precision）", s.precision, "precision") : ""}
      </table>
    </div>
    <div class="detail-section">
      <div class="detail-section__title"><span class="material-symbols-outlined">radar</span>光学・走査</div>
      <table class="specs-table">
        ${specRow("FOV 水平", s.fovH, "fovH")}
        ${specRow("FOV 垂直", s.fovV, "fovV")}
        ${specRow("角度分解能（水平）", s.resH, "resH")}
        ${specRow("角度分解能（垂直）", s.resV, "resV")}
        ${specRow("点群レート", s.pointRate, "pointRate")}
        ${s.returnModes ? specRow("リターンモード", s.returnModes, "returnModes") : ""}
        ${s.beamDivergence ? specRow("ビーム広がり角", s.beamDivergence, "beamDivergence") : ""}
        ${s.sunlightImmunity ? specRow("耐外乱光性能", s.sunlightImmunity, "sunlightImmunity") : ""}
      </table>
    </div>
    <div class="detail-section">
      <div class="detail-section__title"><span class="material-symbols-outlined">settings_ethernet</span>システム統合</div>
      <table class="specs-table">
        ${specRow("インタフェース", s.interface, "interface")}
        ${s.timeSynchronization ? specRow("時刻同期方式", s.timeSynchronization, "timeSynchronization") : ""}
        ${s.imuBuiltIn ? specRow("内蔵IMU", s.imuBuiltIn, "imuBuiltIn") : ""}
        ${s.supportedSoftware ? specRow("ソフトウェアサポート", s.supportedSoftware, "supportedSoftware") : ""}
      </table>
    </div>
    <div class="detail-section">
      <div class="detail-section__title"><span class="material-symbols-outlined">straighten</span>物理仕様</div>
      <table class="specs-table">
        ${specRow("消費電力", s.power, "power")}
        ${s.powerMax ? specRow("最大消費電力", s.powerMax, "powerMax") : ""}
        ${specRow("サイズ", s.size, "size")}
        ${specRow("重量", s.weight, "weight")}
        ${specRow("保護等級", s.protection, "protection")}
        ${s.operatingTemperature ? specRow("動作温度", s.operatingTemperature, "operatingTemperature") : ""}
        ${s.shockVibration ? specRow("耐衝撃・耐振動", s.shockVibration, "shockVibration") : ""}
      </table>
    </div>
  `;

  if (refs && refs.length > 0) {
    const refItems = refs.map(ref => {
      const typeLabel = SRC_TYPE_LABELS[ref.type] ?? ref.type ?? "";
      return `
        <li class="reference-item">
          <div class="reference-item__num">${ref.id}</div>
          <div>
            <a class="reference-item__title" href="${esc(ref.url)}" target="_blank" rel="noopener">${esc(ref.title)}</a>
            <div class="reference-item__meta">
              <span>${esc(ref.source)}</span>
              ${ref.date ? `<span>${esc(ref.date)}</span>` : ""}
              ${typeLabel ? `<span class="src-type-badge">${esc(typeLabel)}</span>` : ""}
            </div>
          </div>
        </li>`;
    }).join("");
    html += `
      <div class="detail-section">
        <div class="detail-section__title"><span class="material-symbols-outlined">link</span>一次情報・参考文献</div>
        <ul class="references-list">${refItems}</ul>
      </div>
    `;
  }
  return html;
}

function closeDetail() {
  document.getElementById("detailOverlay").hidden = true;
  state.activeId = null;
  document.querySelectorAll(".lidar-card").forEach(el => el.classList.remove("active"));
}

// ─────────────────────────────────────────────
// メーカービュー
// ─────────────────────────────────────────────

function renderManufacturersGrid() {
  const manufacturers = Object.values(M).sort((a, b) => a.name.localeCompare(b.name));
  const container = document.getElementById("viewContainer");
  container.innerHTML = `
    <div class="entity-view">
      <div class="entity-view__header">
        <h2>メーカー一覧</h2>
        ${countPill(manufacturers.length, "社")}
      </div>
      <div class="entity-grid">
        ${manufacturers.map(mfr => {
          const products = BY_MFR[mfr.id] ?? [];
          const scanIds = [...new Set(products.map(p => p.scanId))];
          return `
            <a href="#/manufacturers/${mfr.id}" class="entity-card">
              <div class="entity-card__top">
                <div class="entity-card__country">${mfr.country.split(" ")[0]}</div>
                <div>
                  <div class="entity-card__name">${esc(mfr.name)}</div>
                  <div class="entity-card__name-sub">${esc(mfr.nameJa)}</div>
                </div>
              </div>
              <div class="entity-card__desc">${esc(mfr.notes)}</div>
              <div class="entity-card__stats">
                <span class="entity-card__stat"><strong>${products.length}</strong> 製品</span>
                <span class="entity-card__stat"><strong>${scanIds.length}</strong> 走査方式</span>
              </div>
            </a>`;
        }).join("")}
      </div>
    </div>`;
}

function renderManufacturerDetail(id) {
  const mfr = M_BY_ID[id];
  if (!mfr) { window.location.hash = "#/manufacturers"; return; }
  const products = BY_MFR[id] ?? [];
  const scanIds = [...new Set(products.map(p => p.scanId))];
  const waveIds = [...new Set(products.map(p => p.waveId))];

  const container = document.getElementById("viewContainer");
  container.innerHTML = `
    <div class="entity-detail">
      <a href="#/manufacturers" class="entity-detail__back">
        <span class="material-symbols-outlined">arrow_back</span>メーカー一覧へ
      </a>
      <div class="entity-detail__body">
        <div class="entity-detail__hero">
          <div style="font-size:40px;line-height:1;flex-shrink:0">${mfr.country.split(" ")[0]}</div>
          <div>
            <h2 class="entity-detail__hero-title">${esc(mfr.name)}</h2>
            <p class="entity-detail__hero-sub">${esc(mfr.nameJa)} &nbsp;·&nbsp; ${esc(mfr.country)}</p>
          </div>
        </div>

        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">info</span>概要</div>
          <p class="entity-detail__desc">${esc(mfr.notes)}</p>
          <a href="${esc(mfr.url)}" target="_blank" rel="noopener" class="entity-link">${esc(mfr.url)}</a>
        </div>

        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">radar</span>採用走査方式</div>
          <div class="related-chips">
            ${scanIds.map(sid => {
              const scan = SCAN_BY_ID[sid];
              return scan ? `<a href="#/scan-methods/${sid}" class="chip-button">${esc(scan.labelJa)}</a>` : "";
            }).join("")}
          </div>
        </div>

        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">waves</span>使用波長</div>
          <div class="related-chips">
            ${waveIds.map(wid => {
              const wave = WAVE_BY_ID[wid];
              return wave ? `<a href="#/wavelengths/${wid}" class="chip-button">${esc(wave.label)}</a>` : "";
            }).join("")}
          </div>
        </div>

        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">sensors</span>製品一覧（${products.length}件）</div>
          <div class="lidar-grid">${products.map(item => buildMiniCard(item)).join("")}</div>
        </div>
      </div>
    </div>`;

  bindMiniCardEvents(container);
}

// ─────────────────────────────────────────────
// 走査方式ビュー
// ─────────────────────────────────────────────

function renderScanMethodsGrid() {
  const scans = Object.values(SCAN);
  const container = document.getElementById("viewContainer");
  container.innerHTML = `
    <div class="entity-view">
      <div class="entity-view__header">
        <h2>走査方式一覧</h2>
        ${countPill(scans.length, "種")}
      </div>
      <div class="entity-grid">
        ${scans.map(scan => {
          const products = BY_SCAN[scan.id] ?? [];
          const mfrIds = [...new Set(products.map(p => p.manufacturerId))];
          return `
            <a href="#/scan-methods/${scan.id}" class="entity-card">
              <div class="entity-card__top">
                <div class="entity-card__icon">
                  <span class="material-symbols-outlined">${scan.icon ?? "radar"}</span>
                </div>
                <div>
                  <div class="entity-card__name">${esc(scan.labelJa)}</div>
                  <div class="entity-card__name-sub">${esc(scan.label)}</div>
                </div>
              </div>
              ${scan.descriptionJa ? `<div class="entity-card__desc">${esc(scan.descriptionJa)}</div>` : ""}
              <div class="entity-card__stats">
                <span class="entity-card__stat"><strong>${products.length}</strong> 製品</span>
                <span class="entity-card__stat"><strong>${mfrIds.length}</strong> メーカー</span>
              </div>
              ${scan.pros ? `<div class="entity-card__pros">${scan.pros.slice(0, 2).map(p => `<span>${esc(p)}</span>`).join("")}</div>` : ""}
            </a>`;
        }).join("")}
      </div>
    </div>`;
}

function renderScanMethodDetail(id) {
  const scan = SCAN_BY_ID[id];
  if (!scan) { window.location.hash = "#/scan-methods"; return; }
  const products = BY_SCAN[id] ?? [];
  const mfrIds = [...new Set(products.map(p => p.manufacturerId))];

  const container = document.getElementById("viewContainer");
  container.innerHTML = `
    <div class="entity-detail">
      <a href="#/scan-methods" class="entity-detail__back">
        <span class="material-symbols-outlined">arrow_back</span>走査方式一覧へ
      </a>
      <div class="entity-detail__body">
        <div class="entity-detail__hero">
          <div class="entity-detail__hero-icon">
            <span class="material-symbols-outlined">${scan.icon ?? "radar"}</span>
          </div>
          <div>
            <h2 class="entity-detail__hero-title">${esc(scan.labelJa)}</h2>
            <p class="entity-detail__hero-sub">${esc(scan.label)}</p>
          </div>
        </div>

        ${scan.descriptionJa ? `
        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">info</span>概要</div>
          <p class="entity-detail__desc">${esc(scan.descriptionJa)}</p>
        </div>` : ""}

        ${(scan.pros || scan.cons) ? `
        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">balance</span>特徴</div>
          <div class="pros-cons">
            ${scan.pros ? `<div class="pros-cons__col pros-cons__col--pros">
              <div class="pros-cons__label">メリット</div>
              ${scan.pros.map(p => `<div class="pros-cons__item">${esc(p)}</div>`).join("")}
            </div>` : ""}
            ${scan.cons ? `<div class="pros-cons__col pros-cons__col--cons">
              <div class="pros-cons__label">デメリット</div>
              ${scan.cons.map(c => `<div class="pros-cons__item">${esc(c)}</div>`).join("")}
            </div>` : ""}
          </div>
        </div>` : ""}

        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">business</span>採用メーカー（${mfrIds.length}社）</div>
          <div class="related-chips">
            ${mfrIds.map(mid => {
              const mfr = M_BY_ID[mid];
              return mfr ? `<a href="#/manufacturers/${mid}" class="chip-button">${mfr.country.split(" ")[0]} ${esc(mfr.name)}</a>` : "";
            }).join("")}
          </div>
        </div>

        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">sensors</span>採用製品（${products.length}件）</div>
          <div class="lidar-grid">${products.map(item => buildMiniCard(item)).join("")}</div>
        </div>

        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">bar_chart</span>カテゴリ分布</div>
          ${renderDistributionBars(products, p => p.categoryId, cid => CAT_BY_ID[cid]?.labelJa ?? cid)}
        </div>
      </div>
    </div>`;

  bindMiniCardEvents(container);
}

// ─────────────────────────────────────────────
// 波長ビュー
// ─────────────────────────────────────────────

function renderWavelengthsGrid() {
  const waves = Object.values(WAVE);
  const container = document.getElementById("viewContainer");
  container.innerHTML = `
    <div class="entity-view">
      <div class="entity-view__header">
        <h2>波長一覧</h2>
        ${countPill(waves.length, "種")}
      </div>
      <div class="entity-grid" style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))">
        ${waves.map(wave => {
          const products = BY_WAVE[wave.id] ?? [];
          return `
            <a href="#/wavelengths/${wave.id}" class="entity-card">
              <div class="entity-card__top">
                <div class="entity-card__icon" style="background:${wave.colorHex}22;color:${wave.colorHex}">
                  <span class="material-symbols-outlined">waves</span>
                </div>
                <div>
                  <div class="entity-card__name">${esc(wave.label)}</div>
                  ${wave.note ? `<div class="entity-card__name-sub">${esc(wave.note)}</div>` : ""}
                </div>
              </div>
              ${wave.descriptionJa ? `<div class="entity-card__desc">${esc(wave.descriptionJa)}</div>` : ""}
              <div class="entity-card__stats">
                <span class="entity-card__stat"><strong>${products.length}</strong> 製品</span>
                ${wave.eyeSafety ? `<span class="entity-card__stat" style="font-size:10px;max-width:140px;overflow:hidden;text-overflow:ellipsis">${esc(wave.eyeSafety)}</span>` : ""}
              </div>
            </a>`;
        }).join("")}
      </div>
    </div>`;
}

function renderWavelengthDetail(id) {
  const wave = WAVE_BY_ID[id];
  if (!wave) { window.location.hash = "#/wavelengths"; return; }
  const products = BY_WAVE[id] ?? [];
  const mfrIds = [...new Set(products.map(p => p.manufacturerId))];

  const container = document.getElementById("viewContainer");
  container.innerHTML = `
    <div class="entity-detail">
      <a href="#/wavelengths" class="entity-detail__back">
        <span class="material-symbols-outlined">arrow_back</span>波長一覧へ
      </a>
      <div class="entity-detail__body">
        <div class="entity-detail__hero">
          <div class="entity-detail__hero-icon" style="background:${wave.colorHex}22;color:${wave.colorHex}">
            <span class="material-symbols-outlined">waves</span>
          </div>
          <div>
            <h2 class="entity-detail__hero-title">${esc(wave.label)}</h2>
            ${wave.note ? `<p class="entity-detail__hero-sub">${esc(wave.note)}</p>` : ""}
          </div>
        </div>

        ${wave.descriptionJa ? `
        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">info</span>概要</div>
          <p class="entity-detail__desc">${esc(wave.descriptionJa)}</p>
        </div>` : ""}

        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">science</span>技術情報</div>
          <table class="specs-table">
            ${wave.eyeSafety ? `<tr><td>アイセーフティ</td><td>${esc(wave.eyeSafety)}</td></tr>` : ""}
            ${wave.detectorType ? `<tr><td>検出器タイプ</td><td>${esc(wave.detectorType)}</td></tr>` : ""}
          </table>
        </div>

        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">business</span>採用メーカー（${mfrIds.length}社）</div>
          <div class="related-chips">
            ${mfrIds.map(mid => {
              const mfr = M_BY_ID[mid];
              return mfr ? `<a href="#/manufacturers/${mid}" class="chip-button">${mfr.country.split(" ")[0]} ${esc(mfr.name)}</a>` : "";
            }).join("")}
          </div>
        </div>

        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">sensors</span>採用製品（${products.length}件）</div>
          <div class="lidar-grid">${products.map(item => buildMiniCard(item)).join("")}</div>
        </div>
      </div>
    </div>`;

  bindMiniCardEvents(container);
}

// ─────────────────────────────────────────────
// カテゴリビュー
// ─────────────────────────────────────────────

function renderCategoriesGrid() {
  const cats = Object.values(CAT);
  const container = document.getElementById("viewContainer");
  container.innerHTML = `
    <div class="entity-view">
      <div class="entity-view__header">
        <h2>カテゴリ一覧</h2>
        ${countPill(cats.length, "種")}
      </div>
      <div class="entity-grid">
        ${cats.map(cat => {
          const products = BY_CAT[cat.id] ?? [];
          const bc = CAT_BADGE_CLASS[cat.id] ?? "cat-research";
          return `
            <a href="#/categories/${cat.id}" class="entity-card">
              <div class="entity-card__top">
                <div class="entity-card__icon" style="background:var(--${bc}-bg);color:var(--${bc}-fg)">
                  <span class="material-symbols-outlined">${cat.icon ?? "category"}</span>
                </div>
                <div>
                  <div class="entity-card__name">${esc(cat.labelJa)}</div>
                  ${cat.typicalRange ? `<div class="entity-card__name-sub">検知距離: ${esc(cat.typicalRange)}</div>` : ""}
                </div>
              </div>
              ${cat.descriptionJa ? `<div class="entity-card__desc">${esc(cat.descriptionJa)}</div>` : ""}
              <div class="entity-card__stats">
                <span class="entity-card__stat"><strong>${products.length}</strong> 製品</span>
              </div>
            </a>`;
        }).join("")}
      </div>
    </div>`;
}

function renderCategoryDetail(id) {
  const cat = CAT_BY_ID[id];
  if (!cat) { window.location.hash = "#/categories"; return; }
  const products = BY_CAT[id] ?? [];
  const mfrIds = [...new Set(products.map(p => p.manufacturerId))];
  const bc = CAT_BADGE_CLASS[id] ?? "cat-research";

  const container = document.getElementById("viewContainer");
  container.innerHTML = `
    <div class="entity-detail">
      <a href="#/categories" class="entity-detail__back">
        <span class="material-symbols-outlined">arrow_back</span>カテゴリ一覧へ
      </a>
      <div class="entity-detail__body">
        <div class="entity-detail__hero">
          <div class="entity-detail__hero-icon" style="background:var(--${bc}-bg);color:var(--${bc}-fg)">
            <span class="material-symbols-outlined">${cat.icon ?? "category"}</span>
          </div>
          <div>
            <h2 class="entity-detail__hero-title">${esc(cat.labelJa)}</h2>
            ${cat.typicalRange ? `<p class="entity-detail__hero-sub">典型的な検知距離: ${esc(cat.typicalRange)}</p>` : ""}
          </div>
        </div>

        ${cat.descriptionJa ? `
        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">info</span>概要</div>
          <p class="entity-detail__desc">${esc(cat.descriptionJa)}</p>
        </div>` : ""}

        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">business</span>関連メーカー（${mfrIds.length}社）</div>
          <div class="related-chips">
            ${mfrIds.map(mid => {
              const mfr = M_BY_ID[mid];
              return mfr ? `<a href="#/manufacturers/${mid}" class="chip-button">${mfr.country.split(" ")[0]} ${esc(mfr.name)}</a>` : "";
            }).join("")}
          </div>
        </div>

        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">radar</span>採用走査方式分布</div>
          ${renderDistributionBars(products, p => p.scanId, sid => SCAN_BY_ID[sid]?.labelJa ?? sid)}
        </div>

        <div class="entity-detail__section">
          <div class="entity-detail__section-title"><span class="material-symbols-outlined">sensors</span>製品一覧（${products.length}件）</div>
          <div class="lidar-grid">${products.map(item => buildMiniCard(item)).join("")}</div>
        </div>
      </div>
    </div>`;

  bindMiniCardEvents(container);
}

// ─────────────────────────────────────────────
// ミニカード（エンティティ詳細内の製品リスト用）
// ─────────────────────────────────────────────

function buildMiniCard(item) {
  const catClass = CAT_BADGE_CLASS[item.categoryId] ?? "cat-research";
  const range = formatSpecDisplay(item.raw.specs.maxRange);
  return `
    <div class="lidar-card${item.discontinued ? " discontinued" : ""}"
         role="listitem" tabindex="0" data-id="${item.id}">
      <div class="lidar-card__header">
        <div>
          <div class="lidar-card__name">${esc(item.raw.name)}</div>
          <div class="lidar-card__manufacturer">${esc(item.raw.manufacturer.name)}</div>
        </div>
        <div class="lidar-card__badges">
          <span class="badge badge--cat-${catClass}">${esc(item.raw.category.labelJa)}</span>
          ${item.discontinued ? '<span class="badge badge--discontinued">廃番 / 統合</span>' : ""}
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;">
        <span class="badge badge--scan">${esc(item.raw.scanningMethod.labelJa)}</span>
        ${item.raw.wavelength.id !== "unknown" ? `<span class="badge badge--wave-1550">${esc(item.raw.wavelength.label)}</span>` : ""}
      </div>
      <div class="spec-item${range.isMissing ? " spec-item--na" : ""}">
        <div class="spec-item__label">最大距離</div>
        <div class="spec-item__value">${range.text}</div>
      </div>
    </div>`;
}

function bindMiniCardEvents(container) {
  container.querySelectorAll(".lidar-card[data-id]").forEach(card => {
    card.addEventListener("click", () => {
      const item = ALL.find(i => i.id === card.dataset.id);
      if (item) openDetail(item);
    });
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const item = ALL.find(i => i.id === card.dataset.id);
        if (item) openDetail(item);
      }
    });
  });
}

// ─────────────────────────────────────────────
// 2D 比較ビュー
// ─────────────────────────────────────────────

const compareState = {
  xAxisId: "maxRange",
  yAxisId: "channels",
  colorBy: "category",
  hoveredItem: null,
  _raf: null,
  _ro: null,
};

function compareStateToQueryParams() {
  const params = {};
  if (compareState.xAxisId !== "maxRange") params.x = compareState.xAxisId;
  if (compareState.yAxisId !== "channels") params.y = compareState.yAxisId;
  if (compareState.colorBy !== "category") params.colorBy = compareState.colorBy;
  return params;
}

function applyCompareQuery(query) {
  const axisIds = new Set(COMPARE_AXES.map(a => a.id));
  const colorByOptions = new Set(["category", "manufacturer", "scan", "wave"]);
  compareState.xAxisId = axisIds.has(query.get("x")) ? query.get("x") : "maxRange";
  compareState.yAxisId = axisIds.has(query.get("y")) ? query.get("y") : "channels";
  compareState.colorBy = colorByOptions.has(query.get("colorBy")) ? query.get("colorBy") : "category";
  compareState.hoveredItem = null;
}

function syncCompareUrl() {
  replaceHashSilently(buildHashRoute("#/compare", compareStateToQueryParams()));
}

function renderCompareView(query = new URLSearchParams()) {
  applyCompareQuery(query);
  const container = document.getElementById("viewContainer");

  const axisOptions = COMPARE_AXES.map(a =>
    `<option value="${a.id}">${esc(a.label)}</option>`
  ).join("");

  container.innerHTML = `
    <div class="compare-view">
      <div class="compare-controls">
        <div class="compare-control-group">
          <label for="compareXAxis">X軸:</label>
          <select id="compareXAxis" class="filter-select">${axisOptions}</select>
        </div>
        <div class="compare-control-group">
          <label for="compareYAxis">Y軸:</label>
          <select id="compareYAxis" class="filter-select">${axisOptions}</select>
        </div>
        <div class="compare-control-group">
          <label for="compareColorBy">色分け:</label>
          <select id="compareColorBy" class="filter-select">
            <option value="category">カテゴリ</option>
            <option value="manufacturer">メーカー</option>
            <option value="scan">走査方式</option>
            <option value="wave">波長</option>
          </select>
        </div>
      </div>
      <div class="compare-canvas-wrap" id="compareCanvasWrap">
        <canvas id="compareCanvas"></canvas>
        <div class="compare-tooltip" id="compareTooltip">
          <div class="compare-tooltip__name"></div>
          <div class="compare-tooltip__mfr"></div>
          <div class="compare-tooltip__vals"></div>
        </div>
      </div>
      <div class="compare-legend" id="compareLegend"></div>
    </div>`;

  const xSel = document.getElementById("compareXAxis");
  const ySel = document.getElementById("compareYAxis");
  const cSel = document.getElementById("compareColorBy");

  xSel.value = compareState.xAxisId;
  ySel.value = compareState.yAxisId;
  cSel.value = compareState.colorBy;

  xSel.addEventListener("change", () => { compareState.xAxisId = xSel.value; drawCompare(); syncCompareUrl(); });
  ySel.addEventListener("change", () => { compareState.yAxisId = ySel.value; drawCompare(); syncCompareUrl(); });
  cSel.addEventListener("change", () => { compareState.colorBy = cSel.value; drawCompare(); syncCompareUrl(); });

  const canvas = document.getElementById("compareCanvas");
  const wrap = document.getElementById("compareCanvasWrap");

  // リサイズ
  if (compareState._ro) compareState._ro.disconnect();
  compareState._ro = new ResizeObserver(() => {
    canvas.width = wrap.clientWidth * devicePixelRatio;
    canvas.height = wrap.clientHeight * devicePixelRatio;
    drawCompare();
  });
  compareState._ro.observe(wrap);

  // マウスインタラクション
  canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * devicePixelRatio;
    const my = (e.clientY - rect.top) * devicePixelRatio;
    handleCompareHover(mx, my, e.clientX - rect.left, e.clientY - rect.top);
  });
  canvas.addEventListener("mouseleave", () => {
    compareState.hoveredItem = null;
    document.getElementById("compareTooltip").classList.remove("visible");
    drawCompare();
  });
  canvas.addEventListener("click", e => {
    if (compareState.hoveredItem) openDetail(compareState.hoveredItem);
  });
  canvas.style.cursor = "crosshair";

  drawCompare();
  syncCompareUrl();
}

function getCompareColorPalette(colorBy) {
  if (colorBy === "category") {
    return {
      "auto-long":  "#0d5fd8",
      "auto-short": "#1a7fd4",
      "industrial": "#2a5fd8",
      "robotics":   "#16a34a",
      "research":   "#ca8a04",
      "software":   "#7c3aed",
    };
  }
  if (colorBy === "wave") {
    return Object.fromEntries(
      Object.values(WAVE).map(w => [w.id, w.colorHex])
    );
  }
  // メーカー・走査方式は自動生成
  const palette = ["#0d5fd8","#16a34a","#ca8a04","#7c3aed","#e11d48","#0891b2","#ea580c","#4338ca","#15803d","#be185d","#0369a1","#a16207"];
  return null; // nullで自動生成モードを示す
}

const _compareAutoColors = {};
let _compareColorIdx = 0;
const _PALETTE = ["#0d5fd8","#16a34a","#ca8a04","#7c3aed","#e11d48","#0891b2","#ea580c","#4338ca","#15803d","#be185d","#0369a1","#a16207"];

function getCompareColor(key, colorBy) {
  const fixed = getCompareColorPalette(colorBy);
  if (fixed && fixed[key] !== undefined) return fixed[key];
  if (!_compareAutoColors[colorBy]) _compareAutoColors[colorBy] = {};
  if (!_compareAutoColors[colorBy][key]) {
    _compareAutoColors[colorBy][key] = _PALETTE[_compareColorIdx++ % _PALETTE.length];
  }
  return _compareAutoColors[colorBy][key];
}

function getColorKey(item, colorBy) {
  if (colorBy === "category") return item.categoryId;
  if (colorBy === "manufacturer") return item.manufacturerId;
  if (colorBy === "scan") return item.scanId;
  if (colorBy === "wave") return item.waveId;
  return item.categoryId;
}

function getColorLabel(key, colorBy) {
  if (colorBy === "category") return CAT_BY_ID[key]?.labelJa ?? key;
  if (colorBy === "manufacturer") return M_BY_ID[key]?.name ?? key;
  if (colorBy === "scan") return SCAN_BY_ID[key]?.labelJa ?? key;
  if (colorBy === "wave") return WAVE_BY_ID[key]?.label ?? key;
  return key;
}

const _comparePoints = []; // 描画済み点の位置キャッシュ

function drawCompare() {
  const canvas = document.getElementById("compareCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  const dpr = devicePixelRatio;

  ctx.clearRect(0, 0, W, H);

  const xAxis = COMPARE_AXES.find(a => a.id === compareState.xAxisId);
  const yAxis = COMPARE_AXES.find(a => a.id === compareState.yAxisId);
  if (!xAxis || !yAxis) return;

  // CSSカスタムプロパティをまとめて取得（ループ内の getComputedStyle 連発を防ぐ）
  const rootStyle = getComputedStyle(document.documentElement);
  const subColor  = rootStyle.getPropertyValue("--text-sub").trim() || "#888";
  const mainColor = rootStyle.getPropertyValue("--text-main").trim() || "#000";
  const borderColor = rootStyle.getPropertyValue("--surface-border").trim();

  const PAD = { top: 30 * dpr, right: 20 * dpr, bottom: 50 * dpr, left: 60 * dpr };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  // 値取得
  const points = ALL.map(item => ({
    item,
    xVal: xAxis.getter(item),
    yVal: yAxis.getter(item),
  }));

  // 軸スケール計算
  function buildScale(axis, vals) {
    if (axis.type === "numeric") {
      const defined = vals.filter(v => v !== null);
      if (defined.length === 0) return { type: "numeric", min: 0, max: 1, categories: null };
      const min = Math.min(...defined);
      const max = Math.max(...defined);
      return { type: "numeric", min, max: max === min ? max + 1 : max, categories: null };
    } else {
      const cats = [...new Set(vals.filter(v => v !== null))].sort();
      return { type: "category", categories: cats };
    }
  }

  const xScale = buildScale(xAxis, points.map(p => p.xVal));
  const yScale = buildScale(yAxis, points.map(p => p.yVal));

  function toCanvasX(val, scale) {
    if (val === null) return PAD.left + plotW * 0.02; // null は左端
    if (scale.type === "numeric") {
      return PAD.left + ((val - scale.min) / (scale.max - scale.min)) * plotW;
    } else {
      const idx = scale.categories.indexOf(val);
      const step = plotW / (scale.categories.length + 1);
      return PAD.left + step * (idx + 1);
    }
  }

  function toCanvasY(val, scale) {
    if (val === null) return PAD.top + plotH * 0.98; // null は下端
    if (scale.type === "numeric") {
      return PAD.top + (1 - (val - scale.min) / (scale.max - scale.min)) * plotH;
    } else {
      const idx = scale.categories.indexOf(val);
      const step = plotH / (scale.categories.length + 1);
      return PAD.top + step * (idx + 1);
    }
  }

  // グリッド線
  ctx.strokeStyle = `rgba(${borderColor},0.5)`;
  ctx.lineWidth = dpr;
  ctx.setLineDash([4 * dpr, 4 * dpr]);

  // X軸目盛
  if (xScale.type === "numeric") {
    const ticks = 5;
    for (let i = 0; i <= ticks; i++) {
      const v = xScale.min + (xScale.max - xScale.min) * (i / ticks);
      const cx = toCanvasX(v, xScale);
      ctx.beginPath(); ctx.moveTo(cx, PAD.top); ctx.lineTo(cx, PAD.top + plotH); ctx.stroke();
      ctx.fillStyle = subColor;
      ctx.font = `${10 * dpr}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(Math.round(v), cx, PAD.top + plotH + 16 * dpr);
    }
  } else {
    for (const cat of xScale.categories) {
      const cx = toCanvasX(cat, xScale);
      ctx.beginPath(); ctx.moveTo(cx, PAD.top); ctx.lineTo(cx, PAD.top + plotH); ctx.stroke();
      ctx.fillStyle = subColor;
      ctx.font = `${9 * dpr}px sans-serif`;
      ctx.textAlign = "center";
      ctx.save(); ctx.translate(cx, PAD.top + plotH + 10 * dpr); ctx.rotate(-0.5);
      ctx.fillText(cat.length > 12 ? cat.slice(0, 10) + "…" : cat, 0, 0);
      ctx.restore();
    }
  }

  // Y軸目盛
  if (yScale.type === "numeric") {
    const ticks = 5;
    for (let i = 0; i <= ticks; i++) {
      const v = yScale.min + (yScale.max - yScale.min) * (i / ticks);
      const cy = toCanvasY(v, yScale);
      ctx.beginPath(); ctx.moveTo(PAD.left, cy); ctx.lineTo(PAD.left + plotW, cy); ctx.stroke();
      ctx.fillStyle = subColor;
      ctx.font = `${10 * dpr}px sans-serif`;
      ctx.textAlign = "right";
      ctx.fillText(Math.round(v), PAD.left - 6 * dpr, cy + 4 * dpr);
    }
  } else {
    for (const cat of yScale.categories) {
      const cy = toCanvasY(cat, yScale);
      ctx.beginPath(); ctx.moveTo(PAD.left, cy); ctx.lineTo(PAD.left + plotW, cy); ctx.stroke();
      ctx.fillStyle = subColor;
      ctx.font = `${9 * dpr}px sans-serif`;
      ctx.textAlign = "right";
      ctx.fillText(cat.length > 10 ? cat.slice(0, 8) + "…" : cat, PAD.left - 6 * dpr, cy + 4 * dpr);
    }
  }

  ctx.setLineDash([]);

  // 軸ラベル
  const textColor = mainColor;
  ctx.fillStyle = textColor;
  ctx.font = `bold ${11 * dpr}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(`${xAxis.label}${xAxis.unit ? " (" + xAxis.unit + ")" : ""}`, PAD.left + plotW / 2, H - 4 * dpr);
  ctx.save();
  ctx.translate(14 * dpr, PAD.top + plotH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(`${yAxis.label}${yAxis.unit ? " (" + yAxis.unit + ")" : ""}`, 0, 0);
  ctx.restore();

  // ジッターテーブル（同値の点をずらす）
  const jitterMap = {};
  for (const p of points) {
    const k = `${p.xVal}__${p.yVal}`;
    if (!jitterMap[k]) jitterMap[k] = [];
    jitterMap[k].push(p);
  }

  // ポイントを描画してキャッシュ
  _comparePoints.length = 0;
  const R = 7 * dpr;

  for (const [k, group] of Object.entries(jitterMap)) {
    const n = group.length;
    group.forEach((p, gi) => {
      const baseCx = toCanvasX(p.xVal, xScale);
      const baseCy = toCanvasY(p.yVal, yScale);
      const jx = n > 1 ? (gi - (n - 1) / 2) * R * 1.8 : 0;
      // アイテムIDからハッシュを生成して安定した（フレームをまたいで変化しない）垂直オフセットを得る
      const idHash = p.item.id.split("").reduce((h, c) => (Math.imul(31, h) + c.charCodeAt(0)) | 0, 0);
      const jy = n > 1 ? ((idHash & 0xff) / 255 - 0.5) * R : 0;
      const cx = baseCx + jx;
      const cy = baseCy + jy;

      const colorKey = getColorKey(p.item, compareState.colorBy);
      const color = getCompareColor(colorKey, compareState.colorBy);
      const isHovered = compareState.hoveredItem?.id === p.item.id;
      const isNull = p.xVal === null || p.yVal === null;

      ctx.beginPath();
      ctx.arc(cx, cy, isHovered ? R * 1.5 : R, 0, Math.PI * 2);
      ctx.fillStyle = isNull
        ? "rgba(150,150,150,0.4)"
        : isHovered
          ? color
          : color + "cc";
      ctx.fill();
      if (isHovered) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2 * dpr;
        ctx.stroke();
      }

      _comparePoints.push({ item: p.item, cx, cy, r: R });
    });
  }

  // 凡例を更新
  const colorKeys = [...new Set(ALL.map(item => getColorKey(item, compareState.colorBy)))];
  const legend = document.getElementById("compareLegend");
  if (legend) {
    legend.innerHTML = colorKeys.map(k => `
      <div class="compare-legend-item">
        <div class="compare-legend-item__dot" style="background:${getCompareColor(k, compareState.colorBy)}"></div>
        <span>${esc(getColorLabel(k, compareState.colorBy))}</span>
      </div>`).join("");
  }
}

function handleCompareHover(mx, my, clientX, clientY) {
  let found = null;
  for (const p of _comparePoints) {
    const dx = mx - p.cx;
    const dy = my - p.cy;
    if (dx * dx + dy * dy <= (p.r * 2) * (p.r * 2)) {
      found = p.item;
      break;
    }
  }

  const tooltip = document.getElementById("compareTooltip");
  const canvas = document.getElementById("compareCanvas");
  if (!canvas) return;

  if (found !== compareState.hoveredItem) {
    compareState.hoveredItem = found;
    drawCompare();
  }

  if (found) {
    const xAxis = COMPARE_AXES.find(a => a.id === compareState.xAxisId);
    const yAxis = COMPARE_AXES.find(a => a.id === compareState.yAxisId);
    const xVal = xAxis?.getter(found);
    const yVal = yAxis?.getter(found);
    const xText = formatSpecValue(xVal).text;
    const yText = formatSpecValue(yVal).text;
    tooltip.querySelector(".compare-tooltip__name").textContent = found.raw.name;
    tooltip.querySelector(".compare-tooltip__mfr").textContent = found.raw.manufacturer.name;
    tooltip.querySelector(".compare-tooltip__vals").innerHTML = `
      <span>${xAxis?.label}: ${xText}${xText !== "—" && xAxis?.unit ? " " + xAxis.unit : ""}</span>
      <span>${yAxis?.label}: ${yText}${yText !== "—" && yAxis?.unit ? " " + yAxis.unit : ""}</span>
    `;
    const wrap = document.getElementById("compareCanvasWrap");
    const wW = wrap.clientWidth;
    const wH = wrap.clientHeight;
    let tx = clientX + 12;
    let ty = clientY - 10;
    if (tx + 200 > wW) tx = clientX - 212;
    if (ty + 90 > wH) ty = clientY - 100;
    tooltip.style.left = tx + "px";
    tooltip.style.top = ty + "px";
    tooltip.classList.add("visible");
    canvas.style.cursor = "pointer";
  } else {
    tooltip.classList.remove("visible");
    canvas.style.cursor = "crosshair";
  }
}

// ─────────────────────────────────────────────
// グラフビュー（力学シミュレーション）
// ─────────────────────────────────────────────

const graphState = {
  nodes: [],
  edges: [],
  showEdges: { manufacturer: true, scan: true, wave: false, category: false },
  springStrength: 0.03,
  repulsion: 3000,
  zoom: 1,
  panX: 0,
  panY: 0,
  dragging: null,
  panning: false,
  panStart: null,
  _raf: null,
  _running: false,
  _canvas: null,
  _ctx: null,
  _ro: null,
};

const GRAPH_NODE_COLORS = {
  product:      "#0d5fd8",
  manufacturer: "#16a34a",
  scan:         "#ca8a04",
  wave:         "#7c3aed",
  category:     "#e11d48",
};

function graphStateToQueryParams() {
  const params = {};
  if (!graphState.showEdges.manufacturer) params.mfr = "0";
  if (!graphState.showEdges.scan) params.scan = "0";
  if (graphState.showEdges.wave) params.wave = "1";
  if (graphState.showEdges.category) params.cat = "1";
  const springValue = Math.round(graphState.springStrength * 100);
  if (springValue !== 3) params.spring = String(springValue);
  return params;
}

function applyGraphQuery(query) {
  graphState.showEdges.manufacturer = query.get("mfr") !== "0";
  graphState.showEdges.scan = query.get("scan") !== "0";
  graphState.showEdges.wave = query.get("wave") === "1";
  graphState.showEdges.category = query.get("cat") === "1";

  const spring = Number.parseInt(query.get("spring") ?? "", 10);
  graphState.springStrength = Number.isFinite(spring) ? Math.max(1, Math.min(20, spring)) / 100 : 0.03;

  graphState.dragging = null;
  graphState.panning = false;
  graphState.panStart = null;
  _graphHovered = null;
}

function syncGraphUrl() {
  replaceHashSilently(buildHashRoute("#/graph", graphStateToQueryParams()));
}

function renderGraphView(query = new URLSearchParams()) {
  applyGraphQuery(query);
  const container = document.getElementById("viewContainer");
  container.innerHTML = `
    <div class="graph-view">
      <div class="graph-canvas-wrap" id="graphCanvasWrap">
        <canvas id="graphCanvas"></canvas>
      </div>
      <div class="graph-controls">
        <div class="graph-controls__title">表示エッジ</div>
        <div class="graph-controls__group">
          <label class="graph-control-label">
            <input type="checkbox" id="edgeMfr" checked> メーカー関係
          </label>
          <label class="graph-control-label">
            <input type="checkbox" id="edgeScan" checked> 走査方式関係
          </label>
          <label class="graph-control-label">
            <input type="checkbox" id="edgeWave"> 波長関係
          </label>
          <label class="graph-control-label">
            <input type="checkbox" id="edgeCat"> カテゴリ関係
          </label>
        </div>

        <div class="graph-controls__title">引力の強さ</div>
        <div class="graph-controls__group">
          <label class="graph-control-label">
            <input type="range" id="springStrength" min="1" max="20" value="3" style="width:100%">
          </label>
        </div>

        <div class="graph-controls__title">凡例</div>
        <div class="graph-legend">
          ${Object.entries(GRAPH_NODE_COLORS).map(([type, color]) => `
            <div class="graph-legend-item">
              <div class="graph-legend-dot" style="background:${color}"></div>
              <span>${{ product: "製品", manufacturer: "メーカー", scan: "走査方式", wave: "波長", category: "カテゴリ" }[type]}</span>
            </div>`).join("")}
        </div>

        <button class="graph-controls__reset-btn" id="graphReset">初期配置に戻す</button>

        <div class="graph-hint">ドラッグ: ノード移動<br>マウスホイール: ズーム<br>背景ドラッグ: パン<br>クリック: 詳細へ</div>
      </div>
    </div>`;

  document.getElementById("edgeMfr").checked = graphState.showEdges.manufacturer;
  document.getElementById("edgeScan").checked = graphState.showEdges.scan;
  document.getElementById("edgeWave").checked = graphState.showEdges.wave;
  document.getElementById("edgeCat").checked = graphState.showEdges.category;
  document.getElementById("springStrength").value = String(Math.round(graphState.springStrength * 100));

  // イベント
  document.getElementById("edgeMfr").addEventListener("change", e => {
    graphState.showEdges.manufacturer = e.target.checked;
    buildGraphEdges();
    wakeGraphSim();
    syncGraphUrl();
  });
  document.getElementById("edgeScan").addEventListener("change", e => {
    graphState.showEdges.scan = e.target.checked;
    buildGraphEdges();
    wakeGraphSim();
    syncGraphUrl();
  });
  document.getElementById("edgeWave").addEventListener("change", e => {
    graphState.showEdges.wave = e.target.checked;
    buildGraphEdges();
    wakeGraphSim();
    syncGraphUrl();
  });
  document.getElementById("edgeCat").addEventListener("change", e => {
    graphState.showEdges.category = e.target.checked;
    buildGraphEdges();
    wakeGraphSim();
    syncGraphUrl();
  });
  document.getElementById("springStrength").addEventListener("input", e => {
    graphState.springStrength = Number(e.target.value) / 100;
    wakeGraphSim();
    syncGraphUrl();
  });
  document.getElementById("graphReset").addEventListener("click", () => {
    initGraphNodes();
    buildGraphEdges();
    wakeGraphSim();
    syncGraphUrl();
  });

  const canvas = document.getElementById("graphCanvas");
  const wrap = document.getElementById("graphCanvasWrap");

  if (graphState._ro) graphState._ro.disconnect();
  graphState._ro = new ResizeObserver(() => {
    canvas.width = wrap.clientWidth * devicePixelRatio;
    canvas.height = wrap.clientHeight * devicePixelRatio;
    drawGraph();
  });
  graphState._ro.observe(wrap);

  // マウスインタラクション
  canvas.addEventListener("mousedown", onGraphMouseDown);
  canvas.addEventListener("mousemove", onGraphMouseMove);
  canvas.addEventListener("mouseup", onGraphMouseUp);
  canvas.addEventListener("mouseleave", onGraphMouseUp);
  canvas.addEventListener("wheel", onGraphWheel, { passive: false });
  canvas.addEventListener("click", onGraphClick);

  graphState._canvas = canvas;
  graphState._ctx = canvas.getContext("2d");

  initGraphNodes();
  buildGraphEdges();
  startGraphSim();
  syncGraphUrl();
}

function initGraphNodes() {
  const W = graphState._canvas?.width ?? 800;
  const H = graphState._canvas?.height ?? 600;
  const cx = W / 2, cy = H / 2;
  const dpr = devicePixelRatio;
  const nodes = [];

  // 製品ノード（小）
  for (const item of ALL) {
    const angle = Math.random() * Math.PI * 2;
    const r = 80 * dpr + Math.random() * 120 * dpr;
    nodes.push({
      id: item.id, type: "product", label: item.raw.name,
      x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r,
      vx: 0, vy: 0, fixed: false,
      r: 6 * dpr,
      item,
    });
  }

  // メーカーノード（中）
  const mfrs = [...new Set(ALL.map(i => i.manufacturerId))];
  mfrs.forEach((mid, idx) => {
    const angle = (idx / mfrs.length) * Math.PI * 2;
    const mfr = M_BY_ID[mid];
    nodes.push({
      id: "mfr:" + mid, type: "manufacturer", label: mfr?.name ?? mid,
      x: cx + Math.cos(angle) * 200 * dpr, y: cy + Math.sin(angle) * 200 * dpr,
      vx: 0, vy: 0, fixed: false, r: 12 * dpr, mfr,
    });
  });

  // 走査方式ノード（中）
  const scanIds = [...new Set(ALL.map(i => i.scanId))];
  scanIds.forEach((sid, idx) => {
    const angle = (idx / scanIds.length) * Math.PI * 2 + 0.3;
    const scan = SCAN_BY_ID[sid];
    nodes.push({
      id: "scan:" + sid, type: "scan", label: scan?.labelJa ?? sid,
      x: cx + Math.cos(angle) * 250 * dpr, y: cy + Math.sin(angle) * 250 * dpr,
      vx: 0, vy: 0, fixed: false, r: 12 * dpr, scan,
    });
  });

  // 波長ノード（中）
  const waveIds = [...new Set(ALL.map(i => i.waveId))];
  waveIds.forEach((wid, idx) => {
    const angle = (idx / waveIds.length) * Math.PI * 2 + 0.8;
    const wave = WAVE_BY_ID[wid];
    nodes.push({
      id: "wave:" + wid, type: "wave", label: wave?.label ?? wid,
      x: cx + Math.cos(angle) * 220 * dpr, y: cy + Math.sin(angle) * 220 * dpr,
      vx: 0, vy: 0, fixed: false, r: 12 * dpr, wave,
    });
  });

  // カテゴリノード（中）
  const catIds = [...new Set(ALL.map(i => i.categoryId))];
  catIds.forEach((cid, idx) => {
    const angle = (idx / catIds.length) * Math.PI * 2 + 1.2;
    const cat = CAT_BY_ID[cid];
    nodes.push({
      id: "cat:" + cid, type: "category", label: cat?.labelJa ?? cid,
      x: cx + Math.cos(angle) * 230 * dpr, y: cy + Math.sin(angle) * 230 * dpr,
      vx: 0, vy: 0, fixed: false, r: 12 * dpr, cat,
    });
  });

  graphState.nodes = nodes;
  graphState.panX = 0;
  graphState.panY = 0;
  graphState.zoom = 1;
  // nodeMap は buildGraphEdges() で再構築する
}

function buildGraphEdges() {
  // nodeMap を再構築（ノードが追加・リセットされた後も呼ばれるため）
  graphState.nodeMap = {};
  for (const n of graphState.nodes) graphState.nodeMap[n.id] = n;

  const edges = [];
  for (const item of ALL) {
    if (graphState.showEdges.manufacturer) {
      edges.push({ from: item.id, to: "mfr:" + item.manufacturerId, type: "manufacturer" });
    }
    if (graphState.showEdges.scan) {
      edges.push({ from: item.id, to: "scan:" + item.scanId, type: "scan" });
    }
    if (graphState.showEdges.wave) {
      edges.push({ from: item.id, to: "wave:" + item.waveId, type: "wave" });
    }
    if (graphState.showEdges.category) {
      edges.push({ from: item.id, to: "cat:" + item.categoryId, type: "category" });
    }
  }
  graphState.edges = edges;
}

function startGraphSim() {
  if (graphState._raf) cancelAnimationFrame(graphState._raf);
  graphState._running = true;
  let cooldown = 300;

  function step() {
    if (!document.getElementById("graphCanvas")) {
      graphState._raf = null;
      return; // ビューが変わったので停止
    }

    if (graphState._running) {
      tickGraphSim();
      graphState._running = false;
      cooldown = 200;
    } else {
      cooldown--;
    }
    drawGraph();
    if (cooldown > 0) {
      graphState._raf = requestAnimationFrame(step);
    } else {
      graphState._raf = null; // 完全停止
    }
  }
  graphState._raf = requestAnimationFrame(step);
}

// シミュレーションが停止中でも再起動できるよう呼び出す
function wakeGraphSim() {
  graphState._running = true;
  if (!graphState._raf) startGraphSim();
}

function tickGraphSim() {
  const nodes = graphState.nodes;
  const edges = graphState.edges;
  const nodeMap = graphState.nodeMap;
  const dpr = devicePixelRatio;
  const canvas = graphState._canvas;
  if (!canvas) return;
  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2, cy = H / 2;

  // リセット力
  for (const n of nodes) { n.fx = 0; n.fy = 0; }

  // 斥力（クーロン）
  const REP = graphState.repulsion * dpr * dpr;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const dx = b.x - a.x, dy = b.y - a.y;
      const dist2 = dx * dx + dy * dy + 0.01;
      const dist = Math.sqrt(dist2);
      const force = REP / dist2;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      a.fx -= fx; a.fy -= fy;
      b.fx += fx; b.fy += fy;
    }
  }

  // 引力（バネ）
  const K = graphState.springStrength;
  const REST = 80 * dpr;
  for (const e of edges) {
    const a = nodeMap[e.from], b = nodeMap[e.to];
    if (!a || !b) continue;
    const dx = b.x - a.x, dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy) + 0.01;
    const force = K * (dist - REST);
    const fx = (dx / dist) * force;
    const fy = (dy / dist) * force;
    a.fx += fx; a.fy += fy;
    b.fx -= fx; b.fy -= fy;
  }

  // 中心引力
  for (const n of nodes) {
    n.fx += (cx - n.x) * 0.002;
    n.fy += (cy - n.y) * 0.002;
  }

  // 速度・位置更新
  const DAMPING = 0.85;
  for (const n of nodes) {
    if (n.fixed) continue;
    n.vx = (n.vx + n.fx) * DAMPING;
    n.vy = (n.vy + n.fy) * DAMPING;
    n.x += n.vx;
    n.y += n.vy;
  }
}

let _graphHovered = null;

function drawGraph() {
  const canvas = graphState._canvas;
  if (!canvas || !canvas.parentElement) return;
  const ctx = graphState._ctx;
  const W = canvas.width, H = canvas.height;
  const dpr = devicePixelRatio;

  ctx.clearRect(0, 0, W, H);
  ctx.save();
  ctx.translate(graphState.panX * dpr + W / 2, graphState.panY * dpr + H / 2);
  ctx.scale(graphState.zoom, graphState.zoom);
  ctx.translate(-W / 2, -H / 2);

  const nodeMap = graphState.nodeMap ?? {};

  // エッジ描画
  const edgeColors = {
    manufacturer: GRAPH_NODE_COLORS.manufacturer + "55",
    scan: GRAPH_NODE_COLORS.scan + "55",
    wave: GRAPH_NODE_COLORS.wave + "55",
    category: GRAPH_NODE_COLORS.category + "55",
  };
  for (const e of graphState.edges) {
    const a = nodeMap[e.from], b = nodeMap[e.to];
    if (!a || !b) continue;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = edgeColors[e.type] ?? "rgba(100,100,100,0.2)";
    ctx.lineWidth = dpr;
    ctx.stroke();
  }

  // ノード描画
  for (const n of graphState.nodes) {
    const isHovered = _graphHovered?.id === n.id;
    ctx.beginPath();
    ctx.arc(n.x, n.y, isHovered ? n.r * 1.4 : n.r, 0, Math.PI * 2);
    ctx.fillStyle = GRAPH_NODE_COLORS[n.type] + (isHovered ? "ff" : "cc");
    ctx.fill();
    if (isHovered || n.type !== "product") {
      ctx.strokeStyle = GRAPH_NODE_COLORS[n.type];
      ctx.lineWidth = 1.5 * dpr;
      ctx.stroke();
    }

    // ラベル（製品以外 or ホバー時）
    if (n.type !== "product" || isHovered) {
      const label = n.label.length > 14 ? n.label.slice(0, 12) + "…" : n.label;
      ctx.fillStyle = isHovered ? GRAPH_NODE_COLORS[n.type] : "var(--text-main)";
      ctx.font = `${isHovered ? "bold " : ""}${(n.type === "product" ? 9 : 10) * dpr}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(label, n.x, n.y + n.r + 12 * dpr);
    }
  }

  ctx.restore();
}

function screenToGraph(sx, sy) {
  const canvas = graphState._canvas;
  const W = canvas.width, H = canvas.height;
  const dpr = devicePixelRatio;
  const gx = (sx * dpr - graphState.panX * dpr - W / 2) / graphState.zoom + W / 2;
  const gy = (sy * dpr - graphState.panY * dpr - H / 2) / graphState.zoom + H / 2;
  return { x: gx, y: gy };
}

function findNodeAt(gx, gy) {
  for (const n of graphState.nodes) {
    const dx = gx - n.x, dy = gy - n.y;
    if (dx * dx + dy * dy <= (n.r * 2) * (n.r * 2)) return n;
  }
  return null;
}

function onGraphMouseDown(e) {
  const rect = graphState._canvas.getBoundingClientRect();
  const g = screenToGraph(e.clientX - rect.left, e.clientY - rect.top);
  const node = findNodeAt(g.x, g.y);
  if (node) {
    graphState.dragging = { node, startGx: g.x, startGy: g.y };
    node.fixed = true;
    graphState._canvas.style.cursor = "grabbing";
  } else {
    graphState.panning = true;
    graphState.panStart = { mx: e.clientX, my: e.clientY, px: graphState.panX, py: graphState.panY };
    graphState._canvas.style.cursor = "grabbing";
  }
}

function onGraphMouseMove(e) {
  const rect = graphState._canvas.getBoundingClientRect();
  const g = screenToGraph(e.clientX - rect.left, e.clientY - rect.top);
  if (graphState.dragging) {
    graphState.dragging.node.x = g.x;
    graphState.dragging.node.y = g.y;
    graphState.dragging.node.vx = 0;
    graphState.dragging.node.vy = 0;
    drawGraph();
  } else if (graphState.panning && graphState.panStart) {
    graphState.panX = graphState.panStart.px + (e.clientX - graphState.panStart.mx);
    graphState.panY = graphState.panStart.py + (e.clientY - graphState.panStart.my);
    drawGraph();
  } else {
    const node = findNodeAt(g.x, g.y);
    if (node !== _graphHovered) {
      _graphHovered = node;
      graphState._canvas.style.cursor = node ? "pointer" : "grab";
      drawGraph();
    }
  }
}

function onGraphMouseUp(e) {
  if (graphState.dragging) {
    // ドラッグ終了後はシミュレーション継続（fixedを外す）
    graphState.dragging.node.fixed = false;
    graphState.dragging = null;
    wakeGraphSim();
  }
  graphState.panning = false;
  graphState.panStart = null;
  graphState._canvas.style.cursor = "grab";
}

function onGraphWheel(e) {
  e.preventDefault();
  const delta = e.deltaY > 0 ? 0.9 : 1.1;
  graphState.zoom = Math.max(0.3, Math.min(4, graphState.zoom * delta));
  drawGraph();
}

function onGraphClick(e) {
  if (graphState.dragging) return; // ドラッグ中はクリック無視
  const rect = graphState._canvas.getBoundingClientRect();
  const g = screenToGraph(e.clientX - rect.left, e.clientY - rect.top);
  const node = findNodeAt(g.x, g.y);
  if (!node) return;

  if (node.type === "product") {
    openDetail(node.item);
  } else if (node.type === "manufacturer") {
    window.location.hash = "#/manufacturers/" + node.mfr.id;
  } else if (node.type === "scan") {
    window.location.hash = "#/scan-methods/" + node.scan.id;
  } else if (node.type === "wave") {
    window.location.hash = "#/wavelengths/" + node.wave.id;
  } else if (node.type === "category") {
    window.location.hash = "#/categories/" + node.cat.id;
  }
}

// ─────────────────────────────────────────────
// 初期化
// ─────────────────────────────────────────────

(function init() {
  Router.init();
})();
