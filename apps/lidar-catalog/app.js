// LiDARカタログ アプリロジック
// schema.js と data.js が先にロード済みであることを前提とする

// ─────────────────────────────────────────────
// 定数・設定
// ─────────────────────────────────────────────

const RANGE_FILTERS = [
  { id: "lt100",     label: "〜100 m",    test: v => v !== null && v < 100  },
  { id: "100-200",   label: "100〜200 m", test: v => v !== null && v >= 100 && v <= 200 },
  { id: "200-300",   label: "200〜300 m", test: v => v !== null && v > 200 && v <= 300 },
  { id: "gt300",     label: "300 m〜",    test: v => v !== null && v > 300  },
  { id: "unknown",   label: "不明",        test: v => v === null },
];

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

function formatSpecDisplay(spec, { includeUnit = true } = {}) {
  if (!spec) return { text: "—", isMissing: true };
  const value = formatSpecValue(spec.value);
  if (value.isMissing) return value;
  const unit = includeUnit && spec.unit ? ` ${spec.unit}` : "";
  return {
    text: `${value.text}${unit}`,
    isMissing: false,
  };
}

function specValueToNumeric(value) {
  if (Array.isArray(value)) return null;
  if (value === null || value === undefined) return null;
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
    { pattern: /^#\/compare$/,             view: "compare",       handler: () => renderCompareView() },
    { pattern: /^#\/graph$/,               view: "graph",         handler: () => renderGraphView() },
  ],

  currentView: null,

  navigate(hash) {
    if (!hash || hash === "#" || hash === "") hash = "#/products";
    for (const route of this.routes) {
      const match = hash.match(route.pattern);
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
        route.handler(match);
        return;
      }
    }
    window.location.hash = "#/products";
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
  waves: new Set(),
  manufacturers: new Set(),
  ranges: new Set(),
  hideDiscontinued: false,
  sort: "default",
  activeId: null,
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
              <div class="chip-group" id="categoryFilterGroup"></div>
            </section>
            <section class="filter-block">
              <div class="filter-block__title">走査方式</div>
              <div class="chip-group" id="scanFilterGroup"></div>
            </section>
            <section class="filter-block">
              <div class="filter-block__title">波長</div>
              <div class="chip-group" id="waveFilterGroup"></div>
            </section>
            <section class="filter-block">
              <div class="filter-block__title">メーカー</div>
              <div class="chip-group" id="manufacturerFilterGroup"></div>
            </section>
            <section class="filter-block">
              <div class="filter-block__title">最大検知距離</div>
              <div class="chip-group" id="rangeFilterGroup"></div>
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

  // フィルタ状態を復元（chip の active クラス）
  restoreChipActiveState();
  renderAll();
}

function restoreChipActiveState() {
  document.querySelectorAll("#categoryFilterGroup .chip-button").forEach(b => {
    const cat = Object.values(CAT).find(c => c.labelJa === b.textContent);
    if (cat) b.classList.toggle("active", state.categories.has(cat.id));
  });
  document.querySelectorAll("#scanFilterGroup .chip-button").forEach(b => {
    const scan = Object.values(SCAN).find(s => s.labelJa === b.textContent);
    if (scan) b.classList.toggle("active", state.scans.has(scan.id));
  });
  document.querySelectorAll("#waveFilterGroup .chip-button").forEach(b => {
    const wave = Object.values(WAVE).find(w => w.label === b.textContent);
    if (wave) b.classList.toggle("active", state.waves.has(wave.id));
  });
  document.querySelectorAll("#manufacturerFilterGroup .chip-button").forEach(b => {
    const mfr = Object.values(M).find(m => m.name === b.textContent);
    if (mfr) b.classList.toggle("active", state.manufacturers.has(mfr.id));
  });
  document.querySelectorAll("#rangeFilterGroup .chip-button").forEach(b => {
    const rf = RANGE_FILTERS.find(r => r.label === b.textContent);
    if (rf) b.classList.toggle("active", state.ranges.has(rf.id));
  });
  const qInput = document.getElementById("queryInput");
  if (qInput) qInput.value = state.query;
  const hdCheck = document.getElementById("hideDiscontinued");
  if (hdCheck) hdCheck.checked = state.hideDiscontinued;
  const sortSel = document.getElementById("sortSelect");
  if (sortSel) sortSel.value = state.sort;
}

function applyFilters() {
  let result = ALL.filter(item => {
    if (state.hideDiscontinued && item.discontinued) return false;
    if (state.query && !item.searchText.includes(state.query.toLowerCase())) return false;
    if (state.categories.size > 0 && !state.categories.has(item.categoryId)) return false;
    if (state.scans.size > 0 && !state.scans.has(item.scanId)) return false;
    if (state.waves.size > 0 && !state.waves.has(item.waveId)) return false;
    if (state.manufacturers.size > 0 && !state.manufacturers.has(item.manufacturerId)) return false;
    if (state.ranges.size > 0) {
      const rf = RANGE_FILTERS.filter(r => state.ranges.has(r.id));
      if (!rf.some(r => r.test(item.maxRange))) return false;
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

function renderAll() {
  const items = applyFilters();
  renderGrid(items);
  renderActiveFilters();
}

function buildFilterChips() {
  const usedCats = [...new Set(ALL.map(i => i.raw.category.id))];
  const catGroup = document.getElementById("categoryFilterGroup");
  catGroup.innerHTML = "";
  for (const catId of usedCats) {
    const cat = CAT_BY_ID[catId];
    if (!cat) continue;
    const btn = makeChipBtn(cat.labelJa, () => toggleFilter(state.categories, catId, btn));
    catGroup.appendChild(btn);
  }

  const usedScans = [...new Set(ALL.map(i => i.raw.scanningMethod.id))];
  const scanGroup = document.getElementById("scanFilterGroup");
  scanGroup.innerHTML = "";
  for (const scanId of usedScans) {
    const scan = SCAN_BY_ID[scanId];
    if (!scan) continue;
    const btn = makeChipBtn(scan.labelJa, () => toggleFilter(state.scans, scanId, btn));
    scanGroup.appendChild(btn);
  }

  const usedWaves = [...new Set(ALL.map(i => i.raw.wavelength.id))];
  const waveGroup = document.getElementById("waveFilterGroup");
  waveGroup.innerHTML = "";
  for (const waveId of usedWaves) {
    const wave = WAVE_BY_ID[waveId];
    if (!wave) continue;
    const btn = makeChipBtn(wave.label, () => toggleFilter(state.waves, waveId, btn));
    waveGroup.appendChild(btn);
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

  const rangeGroup = document.getElementById("rangeFilterGroup");
  rangeGroup.innerHTML = "";
  for (const rf of RANGE_FILTERS) {
    const btn = makeChipBtn(rf.label, () => toggleFilter(state.ranges, rf.id, btn));
    rangeGroup.appendChild(btn);
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
  renderAll();
}

function clearAllFilters() {
  state.query = "";
  state.categories.clear();
  state.scans.clear();
  state.waves.clear();
  state.manufacturers.clear();
  state.ranges.clear();
  state.hideDiscontinued = false;
  document.getElementById("queryInput").value = "";
  document.getElementById("hideDiscontinued").checked = false;
  document.querySelectorAll(".chip-button.active").forEach(b => b.classList.remove("active"));
  renderAll();
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
    renderAll();
  });
  for (const id of state.categories) {
    const cat = CAT_BY_ID[id];
    if (cat) addChip(cat.labelJa, () => {
      state.categories.delete(id);
      document.querySelectorAll("#categoryFilterGroup .chip-button").forEach(b => {
        if (b.textContent === cat.labelJa) b.classList.remove("active");
      });
      renderAll();
    });
  }
  for (const id of state.scans) {
    const scan = SCAN_BY_ID[id];
    if (scan) addChip(scan.labelJa, () => {
      state.scans.delete(id);
      document.querySelectorAll("#scanFilterGroup .chip-button").forEach(b => {
        if (b.textContent === scan.labelJa) b.classList.remove("active");
      });
      renderAll();
    });
  }
  for (const id of state.waves) {
    const wave = WAVE_BY_ID[id];
    if (wave) addChip(wave.label, () => {
      state.waves.delete(id);
      document.querySelectorAll("#waveFilterGroup .chip-button").forEach(b => {
        if (b.textContent === wave.label) b.classList.remove("active");
      });
      renderAll();
    });
  }
  for (const id of state.manufacturers) {
    const mfr = M_BY_ID[id];
    if (mfr) addChip(mfr.name, () => {
      state.manufacturers.delete(id);
      document.querySelectorAll("#manufacturerFilterGroup .chip-button").forEach(b => {
        if (b.textContent === mfr.name) b.classList.remove("active");
      });
      renderAll();
    });
  }
  for (const id of state.ranges) {
    const rf = RANGE_FILTERS.find(r => r.id === id);
    if (rf) addChip(`距離: ${rf.label}`, () => {
      state.ranges.delete(id);
      document.querySelectorAll("#rangeFilterGroup .chip-button").forEach(b => {
        if (b.textContent === rf.label) b.classList.remove("active");
      });
      renderAll();
    });
  }
}

function setupProductsEvents() {
  if (state._eventsSetup) return;
  state._eventsSetup = true;

  document.getElementById("viewContainer").addEventListener("input", e => {
    if (e.target.id === "queryInput") { state.query = e.target.value.trim(); renderAll(); }
  });
  document.getElementById("viewContainer").addEventListener("change", e => {
    if (e.target.id === "sortSelect") { state.sort = e.target.value; renderAll(); }
    if (e.target.id === "hideDiscontinued") { state.hideDiscontinued = e.target.checked; renderAll(); }
  });
  document.getElementById("viewContainer").addEventListener("click", e => {
    if (e.target.closest("#clearFiltersButton")) clearAllFilters();
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

  function specRow(label, spec) {
    if (!spec) return `<tr><td>${label}</td><td class="spec-na">—</td></tr>`;
    const display = formatSpecDisplay(spec);
    if (display.isMissing)
      return `<tr><td>${label}</td><td class="spec-na">不明 / 非公開${refLinks(spec.refs)}</td></tr>`;
    const note = spec.note ? `<span class="spec-note">${esc(spec.note)}</span>` : "";
    return `<tr><td>${label}</td><td>${esc(display.text)}${note}${refLinks(spec.refs)}</td></tr>`;
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
        ${specRow("チャンネル数", s.channels)}
        ${specRow("最大距離", s.maxRange)}
        ${specRow("ピーク距離（参考）", s.peakRange)}
        ${specRow("最小検知距離", s.minRange)}
        ${specRow("精度", s.accuracy)}
        ${s.precision ? specRow("ばらつき（Precision）", s.precision) : ""}
      </table>
    </div>
    <div class="detail-section">
      <div class="detail-section__title"><span class="material-symbols-outlined">radar</span>光学・走査</div>
      <table class="specs-table">
        ${specRow("FOV 水平", s.fovH)}
        ${specRow("FOV 垂直", s.fovV)}
        ${specRow("角度分解能（水平）", s.resH)}
        ${specRow("角度分解能（垂直）", s.resV)}
        ${specRow("点群レート", s.pointRate)}
        ${s.returnModes ? specRow("リターンモード", s.returnModes) : ""}
        ${s.beamDivergence ? specRow("ビーム広がり角", s.beamDivergence) : ""}
        ${s.sunlightImmunity ? specRow("耐外乱光性能", s.sunlightImmunity) : ""}
      </table>
    </div>
    <div class="detail-section">
      <div class="detail-section__title"><span class="material-symbols-outlined">settings_ethernet</span>システム統合</div>
      <table class="specs-table">
        ${specRow("インタフェース", s.interface)}
        ${s.timeSynchronization ? specRow("時刻同期方式", s.timeSynchronization) : ""}
        ${s.imuBuiltIn ? specRow("内蔵IMU", s.imuBuiltIn) : ""}
        ${s.supportedSoftware ? specRow("ソフトウェアサポート", s.supportedSoftware) : ""}
      </table>
    </div>
    <div class="detail-section">
      <div class="detail-section__title"><span class="material-symbols-outlined">straighten</span>物理仕様</div>
      <table class="specs-table">
        ${specRow("消費電力", s.power)}
        ${s.powerMax ? specRow("最大消費電力", s.powerMax) : ""}
        ${specRow("サイズ", s.size)}
        ${specRow("重量", s.weight)}
        ${specRow("保護等級", s.protection)}
        ${s.operatingTemperature ? specRow("動作温度", s.operatingTemperature) : ""}
        ${s.shockVibration ? specRow("耐衝撃・耐振動", s.shockVibration) : ""}
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

function renderCompareView() {
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

  xSel.addEventListener("change", () => { compareState.xAxisId = xSel.value; drawCompare(); });
  ySel.addEventListener("change", () => { compareState.yAxisId = ySel.value; drawCompare(); });
  cSel.addEventListener("change", () => { compareState.colorBy = cSel.value; drawCompare(); });

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

function renderGraphView() {
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

  // イベント
  document.getElementById("edgeMfr").addEventListener("change", e => {
    graphState.showEdges.manufacturer = e.target.checked;
    buildGraphEdges();
    wakeGraphSim();
  });
  document.getElementById("edgeScan").addEventListener("change", e => {
    graphState.showEdges.scan = e.target.checked;
    buildGraphEdges();
    wakeGraphSim();
  });
  document.getElementById("edgeWave").addEventListener("change", e => {
    graphState.showEdges.wave = e.target.checked;
    buildGraphEdges();
    wakeGraphSim();
  });
  document.getElementById("edgeCat").addEventListener("change", e => {
    graphState.showEdges.category = e.target.checked;
    buildGraphEdges();
    wakeGraphSim();
  });
  document.getElementById("springStrength").addEventListener("input", e => {
    graphState.springStrength = Number(e.target.value) / 100;
    wakeGraphSim();
  });
  document.getElementById("graphReset").addEventListener("click", () => {
    initGraphNodes();
    buildGraphEdges();
    wakeGraphSim();
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
