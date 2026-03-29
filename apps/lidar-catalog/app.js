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

// ─────────────────────────────────────────────
// データ正規化
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
    maxRange: lidar.specs.maxRange?.value ?? null,    // 数値 or null
    channels: lidar.specs.channels?.value ?? null,    // 数値/文字列 or null
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

// ─────────────────────────────────────────────
// フィルタ状態
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
};

// ─────────────────────────────────────────────
// フィルタリング・ソート
// ─────────────────────────────────────────────

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
    // default: メーカー名 → 製品名
    result.sort((a, b) => {
      const mCmp = a.raw.manufacturer.name.localeCompare(b.raw.manufacturer.name);
      return mCmp !== 0 ? mCmp : a.raw.name.localeCompare(b.raw.name);
    });
  }

  return result;
}

// ─────────────────────────────────────────────
// レンダリング - カタロググリッド
// ─────────────────────────────────────────────

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
    const card = buildCard(item);
    grid.appendChild(card);
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
  const rangeDisplay = item.maxRange !== null ? `${item.maxRange} m` : "—";
  const chDisplay = (() => {
    const v = item.raw.specs.channels?.value;
    if (v === null || v === undefined) return "—";
    return String(v);
  })();
  const fovDisplay = (() => {
    const h = item.raw.specs.fovH?.value;
    const v = item.raw.specs.fovV?.value;
    if (h !== null && h !== undefined && v !== null && v !== undefined) return `${h}° × ${v}°`;
    if (h !== null && h !== undefined) return `${h}°`;
    return "—";
  })();

  const wave = item.raw.wavelength;
  const waveHtml = wave.id !== "unknown"
    ? `<span class="badge badge--wave-1550">${wave.label}</span>`
    : "";

  li.innerHTML = `
    <div class="lidar-card__header">
      <div>
        <div class="lidar-card__name">${item.raw.name}</div>
        <div class="lidar-card__manufacturer">${item.raw.manufacturer.name} ${item.raw.manufacturer.country}</div>
      </div>
      <div class="lidar-card__badges">
        <span class="badge badge--cat-${catClass}">${item.raw.category.labelJa}</span>
        ${item.discontinued ? '<span class="badge badge--discontinued">廃番/統合</span>' : ""}
      </div>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px;">
      <span class="badge badge--scan">${item.raw.scanningMethod.labelJa}</span>
      ${waveHtml}
    </div>
    <div class="lidar-card__specs">
      <div class="spec-item${item.maxRange === null ? " spec-item--na" : ""}">
        <div class="spec-item__label">最大距離</div>
        <div class="spec-item__value">${rangeDisplay}${item.maxRange !== null ? "" : ""}</div>
      </div>
      <div class="spec-item${chDisplay === "—" ? " spec-item--na" : ""}">
        <div class="spec-item__label">チャンネル数</div>
        <div class="spec-item__value">${chDisplay}${chDisplay !== "—" ? '<span class="spec-item__unit"> ch</span>' : ""}</div>
      </div>
      <div class="spec-item${fovDisplay === "—" ? " spec-item--na" : ""}">
        <div class="spec-item__label">FOV（H × V）</div>
        <div class="spec-item__value">${fovDisplay}</div>
      </div>
      <div class="spec-item${item.raw.specs.power?.value === null ? " spec-item--na" : ""}">
        <div class="spec-item__label">消費電力</div>
        <div class="spec-item__value">${item.raw.specs.power?.value !== null && item.raw.specs.power?.value !== undefined ? item.raw.specs.power.value + '<span class="spec-item__unit"> W</span>' : "—"}</div>
      </div>
    </div>
  `;

  li.addEventListener("click", () => openDetail(item));
  li.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDetail(item); } });

  return li;
}

// ─────────────────────────────────────────────
// 詳細ドロワー
// ─────────────────────────────────────────────

function openDetail(item) {
  state.activeId = item.id;
  // カードのactiveクラスを更新
  document.querySelectorAll(".lidar-card").forEach(el => {
    el.classList.toggle("active", el.dataset.id === item.id);
  });

  const overlay = document.getElementById("detailOverlay");
  const titleEl = document.getElementById("detailTitle");
  const subtitleEl = document.getElementById("detailSubtitle");
  const badgesEl = document.getElementById("detailBadges");
  const bodyEl = document.getElementById("detailBody");

  titleEl.textContent = item.raw.name;
  subtitleEl.textContent = `${item.raw.manufacturer.name}（${item.raw.manufacturer.country}）`;

  const catClass = CAT_BADGE_CLASS[item.categoryId] ?? "cat-research";
  badgesEl.innerHTML = `
    <span class="badge badge--cat-${catClass}">${item.raw.category.labelJa}</span>
    <span class="badge badge--scan">${item.raw.scanningMethod.labelJa}</span>
    ${item.raw.wavelength.id !== "unknown" ? `<span class="badge badge--wave-1550">${item.raw.wavelength.label}</span>` : ""}
    ${item.discontinued ? '<span class="badge badge--discontinued">廃番 / 統合済み</span>' : ""}
  `;

  bodyEl.innerHTML = buildDetailBody(item);
  overlay.hidden = false;

  // フォーカス管理
  document.getElementById("closeDetail").focus();
}

function buildDetailBody(item) {
  const r = item.raw;
  const refs = r.references;

  function refLinks(refNums) {
    if (!refNums || refNums.length === 0) return "";
    const links = refNums
      .map(n => {
        const ref = refs.find(rf => rf.id === n);
        if (!ref) return "";
        return `<a href="${ref.url}" target="_blank" rel="noopener" title="${ref.title}">${n}</a>`;
      })
      .filter(Boolean)
      .join("");
    return links ? `<span class="ref-sup">${links}</span>` : "";
  }

  function specRow(label, spec) {
    if (!spec) return `<tr><td>${label}</td><td class="spec-na">—</td></tr>`;
    const val = spec.value;
    if (val === null || val === undefined) {
      return `<tr><td>${label}</td><td class="spec-na">不明 / 非公開${refLinks(spec.refs)}</td></tr>`;
    }
    const unit = spec.unit ? ` ${spec.unit}` : "";
    const note = spec.note ? `<span class="spec-note">${spec.note}</span>` : "";
    return `<tr><td>${label}</td><td>${val}${unit}${note}${refLinks(spec.refs)}</td></tr>`;
  }

  const s = r.specs;
  let html = "";

  // 廃番通知
  if (r.discontinued) {
    html += `<div class="discontinued-notice">⚠️ この製品は廃番または他社と統合済みです。最新情報はメーカーサイトをご確認ください。</div>`;
  }

  // メーカー情報
  html += `
    <div class="detail-section">
      <div class="detail-section__title"><span class="material-symbols-outlined">business</span>メーカー情報</div>
      <table class="specs-table">
        <tr><td>メーカー</td><td><a href="${r.manufacturer.url}" target="_blank" rel="noopener">${r.manufacturer.name}</a>${r.manufacturer.nameJa ? ` (${r.manufacturer.nameJa})` : ""}</td></tr>
        <tr><td>国</td><td>${r.manufacturer.country}</td></tr>
        ${r.manufacturer.notes ? `<tr><td>概要</td><td>${r.manufacturer.notes}</td></tr>` : ""}
        ${r.release?.value ? `<tr><td>リリース</td><td>${r.release.value}${refLinks(r.release.refs)}</td></tr>` : ""}
        ${r.useCases ? `<tr><td>用途</td><td>${r.useCases}</td></tr>` : ""}
      </table>
    </div>
  `;

  // スペック詳細
  html += `
    <div class="detail-section">
      <div class="detail-section__title"><span class="material-symbols-outlined">tune</span>スペック詳細</div>
      <table class="specs-table">
        ${specRow("チャンネル数", s.channels)}
        ${specRow("最大距離", s.maxRange)}
        ${specRow("ピーク距離（参考）", s.peakRange)}
        ${specRow("FOV 水平", s.fovH)}
        ${specRow("FOV 垂直", s.fovV)}
        ${specRow("角度分解能（水平）", s.resH)}
        ${specRow("角度分解能（垂直）", s.resV)}
        ${specRow("点群レート", s.pointRate)}
        ${specRow("精度", s.accuracy)}
        ${specRow("最小検知距離", s.minRange)}
        ${specRow("消費電力", s.power)}
        ${specRow("サイズ", s.size)}
        ${specRow("重量", s.weight)}
        ${specRow("保護等級", s.protection)}
        ${specRow("インタフェース", s.interface)}
      </table>
    </div>
  `;

  // 参考文献
  if (refs && refs.length > 0) {
    const refItems = refs.map(ref => {
      const typeLabel = SRC_TYPE_LABELS[ref.type] ?? ref.type ?? "";
      return `
        <li class="reference-item">
          <div class="reference-item__num">${ref.id}</div>
          <div>
            <a class="reference-item__title" href="${ref.url}" target="_blank" rel="noopener">${ref.title}</a>
            <div class="reference-item__meta">
              <span>${ref.source}</span>
              ${ref.date ? `<span>${ref.date}</span>` : ""}
              ${typeLabel ? `<span class="src-type-badge">${typeLabel}</span>` : ""}
            </div>
          </div>
        </li>
      `;
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
// フィルタチップ描画
// ─────────────────────────────────────────────

function buildFilterChips() {
  // カテゴリ（使用されているものだけ）
  const usedCats = [...new Set(ALL.map(i => i.raw.category.id))];
  const catGroup = document.getElementById("categoryFilterGroup");
  catGroup.innerHTML = "";
  for (const catId of usedCats) {
    const cat = Object.values(CAT).find(c => c.id === catId);
    if (!cat) continue;
    const btn = makeChipBtn(cat.labelJa, () => toggleFilter(state.categories, catId, btn));
    catGroup.appendChild(btn);
  }

  // 走査方式
  const usedScans = [...new Set(ALL.map(i => i.raw.scanningMethod.id))];
  const scanGroup = document.getElementById("scanFilterGroup");
  scanGroup.innerHTML = "";
  for (const scanId of usedScans) {
    const scan = Object.values(SCAN).find(s => s.id === scanId);
    if (!scan) continue;
    const btn = makeChipBtn(scan.labelJa, () => toggleFilter(state.scans, scanId, btn));
    scanGroup.appendChild(btn);
  }

  // 波長
  const usedWaves = [...new Set(ALL.map(i => i.raw.wavelength.id))];
  const waveGroup = document.getElementById("waveFilterGroup");
  waveGroup.innerHTML = "";
  for (const waveId of usedWaves) {
    const wave = Object.values(WAVE).find(w => w.id === waveId);
    if (!wave) continue;
    const btn = makeChipBtn(wave.label, () => toggleFilter(state.waves, waveId, btn));
    waveGroup.appendChild(btn);
  }

  // メーカー（アルファベット順）
  const usedMfrs = [...new Set(ALL.map(i => i.raw.manufacturer.id))].sort((a, b) => {
    const na = Object.values(M).find(m => m.id === a)?.name ?? a;
    const nb = Object.values(M).find(m => m.id === b)?.name ?? b;
    return na.localeCompare(nb);
  });
  const mfrGroup = document.getElementById("manufacturerFilterGroup");
  mfrGroup.innerHTML = "";
  for (const mfrId of usedMfrs) {
    const mfr = Object.values(M).find(m => m.id === mfrId);
    if (!mfr) continue;
    const btn = makeChipBtn(mfr.name, () => toggleFilter(state.manufacturers, mfrId, btn));
    mfrGroup.appendChild(btn);
  }

  // 距離レンジ
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
  if (set.has(key)) {
    set.delete(key);
    btn.classList.remove("active");
  } else {
    set.add(key);
    btn.classList.add("active");
  }
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

// ─────────────────────────────────────────────
// アクティブフィルター表示
// ─────────────────────────────────────────────

function renderActiveFilters() {
  const container = document.getElementById("activeFilters");
  container.innerHTML = "";

  function addChip(label, onRemove) {
    const chip = document.createElement("button");
    chip.className = "active-filter-chip";
    chip.type = "button";
    chip.innerHTML = `${label} <span class="material-symbols-outlined" style="font-size:14px;">close</span>`;
    chip.addEventListener("click", onRemove);
    container.appendChild(chip);
  }

  if (state.query) {
    addChip(`"${state.query}"`, () => {
      state.query = "";
      document.getElementById("queryInput").value = "";
      renderAll();
    });
  }

  for (const id of state.categories) {
    const cat = Object.values(CAT).find(c => c.id === id);
    if (cat) addChip(cat.labelJa, () => {
      state.categories.delete(id);
      document.querySelectorAll("#categoryFilterGroup .chip-button").forEach(b => {
        if (b.textContent === cat.labelJa) b.classList.remove("active");
      });
      renderAll();
    });
  }

  for (const id of state.scans) {
    const scan = Object.values(SCAN).find(s => s.id === id);
    if (scan) addChip(scan.labelJa, () => {
      state.scans.delete(id);
      document.querySelectorAll("#scanFilterGroup .chip-button").forEach(b => {
        if (b.textContent === scan.labelJa) b.classList.remove("active");
      });
      renderAll();
    });
  }

  for (const id of state.waves) {
    const wave = Object.values(WAVE).find(w => w.id === id);
    if (wave) addChip(wave.label, () => {
      state.waves.delete(id);
      document.querySelectorAll("#waveFilterGroup .chip-button").forEach(b => {
        if (b.textContent === wave.label) b.classList.remove("active");
      });
      renderAll();
    });
  }

  for (const id of state.manufacturers) {
    const mfr = Object.values(M).find(m => m.id === id);
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

// ─────────────────────────────────────────────
// 全体再描画
// ─────────────────────────────────────────────

function renderAll() {
  const items = applyFilters();
  renderGrid(items);
  renderActiveFilters();
}

// ─────────────────────────────────────────────
// イベント登録
// ─────────────────────────────────────────────

function setupEvents() {
  // 検索
  document.getElementById("queryInput").addEventListener("input", e => {
    state.query = e.target.value.trim();
    renderAll();
  });

  // ソート
  document.getElementById("sortSelect").addEventListener("change", e => {
    state.sort = e.target.value;
    renderAll();
  });

  // フィルタ全解除
  document.getElementById("clearFiltersButton").addEventListener("click", clearAllFilters);

  // 廃番除外
  document.getElementById("hideDiscontinued").addEventListener("change", e => {
    state.hideDiscontinued = e.target.checked;
    renderAll();
  });

  // 詳細閉じる
  document.getElementById("closeDetail").addEventListener("click", closeDetail);

  document.getElementById("detailOverlay").addEventListener("click", e => {
    if (e.target === e.currentTarget) closeDetail();
  });

  // Escape で詳細を閉じる
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !document.getElementById("detailOverlay").hidden) {
      closeDetail();
    }
  });

  // モバイルドック
  document.getElementById("mobileShowFilters")?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("mobile-panel-filters");
    document.getElementById("mobileShowFilters").classList.toggle("active", isOpen);
    document.getElementById("mobileShowCatalog").classList.toggle("active", !isOpen);
  });

  document.getElementById("mobileShowCatalog")?.addEventListener("click", () => {
    document.body.classList.remove("mobile-panel-filters");
    document.getElementById("mobileShowFilters").classList.remove("active");
    document.getElementById("mobileShowCatalog").classList.add("active");
  });
}

// ─────────────────────────────────────────────
// 初期化
// ─────────────────────────────────────────────

(function init() {
  buildFilterChips();
  setupEvents();
  renderAll();
})();
