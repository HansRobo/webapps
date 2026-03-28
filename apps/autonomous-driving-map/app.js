document.addEventListener("DOMContentLoaded", () => {
  const escEl = document.createElement("div");

  function escHtml(str) {
    escEl.textContent = String(str ?? "");
    return escEl.innerHTML;
  }

  function escAttr(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  const statusPriority = {
    "実施中": 0,
    "実施中・一部計画中": 1,
    "実施中・開発中": 2,
    "計画中": 3,
    "完了": 4,
  };

  const ROUTE_TAG_PATTERNS = [
    { tag: "専用道", pattern: /専用道/ },
    { tag: "一般道", pattern: /一般道/ },
    { tag: "循環ルート", pattern: /循環/ },
    { tag: "BRT", pattern: /BRT/ },
    { tag: "山間・厳環境", pattern: /山岳|山間|急勾配|急カーブ|積雪/ },
    { tag: "観光地", pattern: /温泉|観光|旅館/ },
    { tag: "駅・交通拠点", pattern: /駅|空港|ターミナル/ },
  ];

  const experiments = EXPERIMENTS.map((raw) => normalizeExperiment(raw));
  const experimentById = new Map(experiments.map((exp) => [exp.id, exp]));

  const dom = {
    queryInput: document.getElementById("queryInput"),
    orgQueryInput: document.getElementById("orgQueryInput"),
    municipalityQueryInput: document.getElementById("municipalityQueryInput"),
    clearFiltersButton: document.getElementById("clearFiltersButton"),
    advancedToggle: document.getElementById("advancedToggle"),
    advancedFilters: document.getElementById("advancedFilters"),
    statusFilterGroup: document.getElementById("statusFilterGroup"),
    levelFilterGroup: document.getElementById("levelFilterGroup"),
    vehicleFilterGroup: document.getElementById("vehicleFilterGroup"),
    adSystemFilterGroup: document.getElementById("adSystemFilterGroup"),
    routeTagFilterGroup: document.getElementById("routeTagFilterGroup"),
    prefectureSelect: document.getElementById("prefectureSelect"),
    prefectureAddButton: document.getElementById("prefectureAddButton"),
    prefectureSelected: document.getElementById("prefectureSelected"),
    yearFromSelect: document.getElementById("yearFromSelect"),
    yearToSelect: document.getElementById("yearToSelect"),
    sortSelect: document.getElementById("sortSelect"),
    activeFilters: document.getElementById("activeFilters"),
    resultCount: document.getElementById("resultCount"),
    filteredCountMain: document.getElementById("filteredCountMain"),
    mapBoundsCount: document.getElementById("mapBoundsCount"),
    emptyHint: document.getElementById("emptyHint"),
    experimentList: document.getElementById("experimentList"),
    detailOverlay: document.getElementById("detailOverlay"),
    detailTitle: document.getElementById("detailTitle"),
    detailStatus: document.getElementById("detailStatus"),
    detailLocation: document.getElementById("detailLocation"),
    detailBody: document.getElementById("detailBody"),
    closeDetail: document.getElementById("closeDetail"),
    mobileShowFilters: document.getElementById("mobileShowFilters"),
    mobileShowResults: document.getElementById("mobileShowResults"),
    mobileHidePanels: document.getElementById("mobileHidePanels"),
  };

  const state = {
    query: "",
    orgQuery: "",
    municipalityQuery: "",
    statuses: new Set(),
    prefectures: new Set(),
    levels: new Set(),
    vehicles: new Set(),
    adSystems: new Set(),
    routeTags: new Set(),
    yearFrom: null,
    yearTo: null,
    sortBy: "relevance",
    selectedId: null,
    mobilePanel: "results",
  };

  const markers = {};
  let lastResult = [];

  const map = L.map("map", {
    center: [36.5, 137.0],
    zoom: 6,
    zoomControl: true,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  const ICON_DEFAULT = L.divIcon({
    className: "custom-marker",
    html: '<div class="custom-marker__dot"></div>',
    iconSize: [26, 26],
    iconAnchor: [13, 26],
    popupAnchor: [0, -28],
  });

  const ICON_ACTIVE = L.divIcon({
    className: "custom-marker custom-marker--active",
    html: '<div class="custom-marker__dot"></div>',
    iconSize: [26, 26],
    iconAnchor: [13, 26],
    popupAnchor: [0, -28],
  });

  buildFilterChoices();
  initializeMarkers();
  bindEvents();
  setMobilePanel("results");
  renderAll();

  map.on("moveend zoomend", updateMapBoundsCount);

  function normalizeExperiment(raw) {
    const status = raw.status.value;
    const levels = extractLevels(raw.operationType.value);
    const years = extractYears(raw.period.value);
    const startYear = years.length ? Math.min(...years) : null;
    const endYear = years.length ? Math.max(...years) : null;
    const ongoing = /継続|運行開始|営業運行開始|〜$/.test(raw.period.value) || /継続中|実施中/.test(raw.period.value);
    const orgNames = [...new Set(raw.stakeholders.flatMap((s) => splitOrganizations(s.name)).filter(Boolean))];
    const municipalities = [...new Set(orgNames.filter((name) => /（.+?[都道府県]）/.test(name)))];
    const routeTags = deriveRouteTags(raw.route.value, raw.description.value, raw.location.value);
    const vehicleArr = Array.isArray(raw.vehicle) ? raw.vehicle : raw.vehicle ? [raw.vehicle] : [];
    const vehicles = vehicleArr.map((v) => v.value).filter(Boolean);
    const adSystem = raw.adSystem?.value ?? null;
    const searchableText = [
      raw.name.value,
      raw.location.value,
      raw.prefecture.value,
      raw.period.value,
      raw.status.value,
      raw.description.value,
      raw.operationType.value,
      raw.route.value,
      orgNames.join(" "),
      municipalities.join(" "),
      vehicles.join(" "),
      adSystem ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return {
      raw,
      id: raw.id,
      name: raw.name.value,
      location: raw.location.value,
      lat: raw.location.lat,
      lng: raw.location.lng,
      prefecture: raw.prefecture.value,
      period: raw.period.value,
      status,
      description: raw.description.value,
      vehicles,
      adSystem,
      operationType: raw.operationType.value,
      route: raw.route.value,
      stakeholders: raw.stakeholders,
      references: raw.references,
      levels,
      primaryLevel: levels[0] || "その他",
      startYear,
      endYear,
      ongoing,
      orgNames,
      municipalities,
      routeTags,
      searchableText,
    };
  }

  function splitOrganizations(text) {
    return String(text)
      .split(/[、,，/／]/)
      .map((v) => v.trim())
      .filter(Boolean);
  }

  function extractLevels(text) {
    const levels = [...new Set((String(text).match(/レベル\s*([234])/g) || []).map((m) => `L${m.replace(/\D/g, "")}`))];
    if (levels.length === 0) {
      return ["その他"];
    }
    return levels.sort();
  }

  function extractYears(text) {
    return [...new Set((String(text).match(/\b(20\d{2})\b/g) || []).map((y) => Number(y)))].filter((y) => y >= 2000 && y <= 2100);
  }

  function deriveRouteTags(route, description, location) {
    const blob = `${route} ${description} ${location}`;
    return ROUTE_TAG_PATTERNS.filter(({ pattern }) => pattern.test(blob)).map(({ tag }) => tag);
  }

  function buildFilterChoices() {
    const statuses = [...new Set(experiments.map((exp) => exp.status))].sort((a, b) => (statusPriority[a] ?? 99) - (statusPriority[b] ?? 99));
    const levels = [...new Set(experiments.flatMap((exp) => exp.levels))].sort();
    const vehicles = [...new Set(experiments.flatMap((exp) => exp.vehicles))].sort((a, b) => a.localeCompare(b, "ja"));
    const adSystems = [...new Set(experiments.map((exp) => exp.adSystem).filter((v) => v !== null))].sort((a, b) => a.localeCompare(b, "ja"));
    const prefectures = [...new Set(experiments.map((exp) => exp.prefecture))].sort();
    const years = [...new Set(experiments.map((exp) => exp.startYear).filter((v) => v !== null))].sort((a, b) => a - b);

    dom.statusFilterGroup.innerHTML = statuses.map((status) => renderToggleChip("statuses", status)).join("");
    dom.levelFilterGroup.innerHTML = levels.map((level) => renderToggleChip("levels", level)).join("");
    dom.vehicleFilterGroup.innerHTML = vehicles.map((v) => renderToggleChip("vehicles", v)).join("");
    dom.adSystemFilterGroup.innerHTML = adSystems.map((s) => renderToggleChip("adSystems", s)).join("");
    dom.routeTagFilterGroup.innerHTML = ROUTE_TAG_PATTERNS.map(({ tag }) => renderToggleChip("routeTags", tag)).join("");

    prefectures.forEach((prefecture) => {
      const option = document.createElement("option");
      option.value = prefecture;
      option.textContent = prefecture;
      dom.prefectureSelect.appendChild(option);
    });

    years.forEach((year) => {
      addYearOption(dom.yearFromSelect, year);
      addYearOption(dom.yearToSelect, year);
    });
  }

  function addYearOption(select, year) {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = String(year);
    select.appendChild(option);
  }

  function renderToggleChip(key, value) {
    return `<button class="chip-button" type="button" data-filter-key="${escAttr(key)}" data-filter-value="${escAttr(value)}">${escHtml(value)}</button>`;
  }

  function initializeMarkers() {
    experiments.forEach((exp) => {
      const marker = L.marker([exp.lat, exp.lng], {
        icon: ICON_DEFAULT,
        title: exp.name,
      });
      marker.bindPopup(
        `<div class="map-popup">
          <div class="map-popup__name">${escHtml(exp.name)}</div>
          <div class="map-popup__location">${escHtml(exp.location)}</div>
          <div class="map-popup__meta">
            <span class="status-badge" data-status="${escAttr(exp.status)}">${escHtml(exp.status)}</span>
            <span class="meta-chip">${escHtml(exp.primaryLevel)}</span>
            ${exp.vehicles.map((v) => `<span class="meta-chip">${escHtml(v)}</span>`).join("")}
          </div>
        </div>`,
        { maxWidth: 320 }
      );
      marker.on("click", () => selectExperiment(exp.id));
      marker.addTo(map);
      markers[exp.id] = marker;
    });
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const chip = event.target.closest(".chip-button[data-filter-key]");
      if (!chip) return;
      const key = chip.dataset.filterKey;
      const value = chip.dataset.filterValue;
      if (!state[key] || !(state[key] instanceof Set)) return;
      if (state[key].has(value)) {
        state[key].delete(value);
      } else {
        state[key].add(value);
      }
      renderAll();
    });

    dom.prefectureAddButton.addEventListener("click", () => {
      if (!dom.prefectureSelect.value) return;
      state.prefectures.add(dom.prefectureSelect.value);
      dom.prefectureSelect.value = "";
      renderAll();
    });

    dom.prefectureSelected.addEventListener("click", (event) => {
      const removeButton = event.target.closest("[data-remove-prefecture]");
      if (!removeButton) return;
      state.prefectures.delete(removeButton.dataset.removePrefecture);
      renderAll();
    });

    dom.queryInput.addEventListener("input", () => {
      state.query = dom.queryInput.value.trim().toLowerCase();
      renderAll();
    });
    dom.orgQueryInput.addEventListener("input", () => {
      state.orgQuery = dom.orgQueryInput.value.trim().toLowerCase();
      renderAll();
    });
    dom.municipalityQueryInput.addEventListener("input", () => {
      state.municipalityQuery = dom.municipalityQueryInput.value.trim().toLowerCase();
      renderAll();
    });

    dom.yearFromSelect.addEventListener("change", () => {
      state.yearFrom = dom.yearFromSelect.value ? Number(dom.yearFromSelect.value) : null;
      if (state.yearTo !== null && state.yearFrom !== null && state.yearFrom > state.yearTo) {
        state.yearTo = state.yearFrom;
        dom.yearToSelect.value = String(state.yearTo);
      }
      renderAll();
    });

    dom.yearToSelect.addEventListener("change", () => {
      state.yearTo = dom.yearToSelect.value ? Number(dom.yearToSelect.value) : null;
      if (state.yearFrom !== null && state.yearTo !== null && state.yearTo < state.yearFrom) {
        state.yearFrom = state.yearTo;
        dom.yearFromSelect.value = String(state.yearFrom);
      }
      renderAll();
    });

    dom.sortSelect.addEventListener("change", () => {
      state.sortBy = dom.sortSelect.value;
      renderAll();
    });

    dom.clearFiltersButton.addEventListener("click", () => {
      resetFilters();
      renderAll();
    });

    dom.advancedToggle.addEventListener("click", () => {
      const expanded = dom.advancedToggle.getAttribute("aria-expanded") === "true";
      dom.advancedToggle.setAttribute("aria-expanded", expanded ? "false" : "true");
      dom.advancedFilters.hidden = expanded;
    });

    dom.activeFilters.addEventListener("click", (event) => {
      const removeButton = event.target.closest("[data-remove-filter]");
      if (!removeButton) return;
      const kind = removeButton.dataset.filterType;
      const value = removeButton.dataset.filterValue;
      removeFilterBadge(kind, value);
      renderAll();
    });

    dom.mobileShowFilters.addEventListener("click", () => setMobilePanel("filters"));
    dom.mobileShowResults.addEventListener("click", () => setMobilePanel("results"));
    dom.mobileHidePanels.addEventListener("click", () => setMobilePanel("map"));

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        document.body.classList.remove("mobile-panel-filters", "mobile-panel-results");
      } else {
        setMobilePanel(state.mobilePanel);
      }
      map.invalidateSize();
    });

    dom.experimentList.addEventListener("click", (event) => {
      const li = event.target.closest("[data-id]");
      if (li) selectExperiment(li.dataset.id);
    });
    dom.experimentList.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const li = event.target.closest("[data-id]");
      if (!li) return;
      event.preventDefault();
      selectExperiment(li.dataset.id);
    });

    dom.closeDetail.addEventListener("click", closeDetailPanel);
    dom.detailOverlay.addEventListener("click", (event) => {
      if (event.target === dom.detailOverlay) closeDetailPanel();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !dom.detailOverlay.hasAttribute("hidden")) closeDetailPanel();
    });
  }

  function removeFilterBadge(kind, value) {
    if (kind === "query") state.query = "";
    if (kind === "orgQuery") state.orgQuery = "";
    if (kind === "municipalityQuery") state.municipalityQuery = "";
    if (kind === "yearFrom") state.yearFrom = null;
    if (kind === "yearTo") state.yearTo = null;
    if (kind === "statuses") state.statuses.delete(value);
    if (kind === "prefectures") state.prefectures.delete(value);
    if (kind === "levels") state.levels.delete(value);
    if (kind === "vehicles") state.vehicles.delete(value);
    if (kind === "adSystems") state.adSystems.delete(value);
    if (kind === "routeTags") state.routeTags.delete(value);

    dom.queryInput.value = state.query;
    dom.orgQueryInput.value = state.orgQuery;
    dom.municipalityQueryInput.value = state.municipalityQuery;
    dom.yearFromSelect.value = state.yearFrom === null ? "" : String(state.yearFrom);
    dom.yearToSelect.value = state.yearTo === null ? "" : String(state.yearTo);
  }

  function resetFilters() {
    state.query = "";
    state.orgQuery = "";
    state.municipalityQuery = "";
    state.statuses.clear();
    state.prefectures.clear();
    state.levels.clear();
    state.vehicles.clear();
    state.adSystems.clear();
    state.routeTags.clear();
    state.yearFrom = null;
    state.yearTo = null;
    dom.queryInput.value = "";
    dom.orgQueryInput.value = "";
    dom.municipalityQueryInput.value = "";
    dom.prefectureSelect.value = "";
    dom.yearFromSelect.value = "";
    dom.yearToSelect.value = "";
  }

  function setMobilePanel(panel) {
    state.mobilePanel = panel;
    dom.mobileShowFilters.classList.toggle("active", panel === "filters");
    dom.mobileShowResults.classList.toggle("active", panel === "results");
    dom.mobileHidePanels.classList.toggle("active", panel === "map");
    document.body.classList.toggle("mobile-panel-filters", panel === "filters");
    document.body.classList.toggle("mobile-panel-results", panel === "results");
  }

  function renderAll() {
    lastResult = getFilteredAndSortedExperiments();
    renderFilterSelectionUI();
    renderActiveFilters();
    renderList(lastResult);
    updateMarkerVisibility(lastResult);
    updateCounters(lastResult.length);
    updateMapBoundsCount();
    ensureSelectionVisibility(lastResult);
  }

  function getFilteredAndSortedExperiments() {
    const queryTokens = state.query ? state.query.split(/\s+/).filter(Boolean) : [];
    const filtered = experiments.filter((exp) => matchExperiment(exp, queryTokens));
    return filtered.sort((a, b) => compareExperiments(a, b, queryTokens));
  }

  function matchExperiment(exp, queryTokens) {
    if (queryTokens.length > 0) {
      if (!queryTokens.every((token) => exp.searchableText.includes(token))) return false;
    }

    if (state.statuses.size > 0 && !state.statuses.has(exp.status)) return false;
    if (state.prefectures.size > 0 && !state.prefectures.has(exp.prefecture)) return false;
    if (state.levels.size > 0 && !exp.levels.some((level) => state.levels.has(level))) return false;
    if (state.vehicles.size > 0 && !exp.vehicles.some((v) => state.vehicles.has(v))) return false;
    if (state.adSystems.size > 0 && !state.adSystems.has(exp.adSystem)) return false;
    if (state.routeTags.size > 0 && !exp.routeTags.some((tag) => state.routeTags.has(tag))) return false;

    if (state.yearFrom !== null || state.yearTo !== null) {
      if (exp.startYear === null) return false;
      if (state.yearFrom !== null && exp.startYear < state.yearFrom) return false;
      if (state.yearTo !== null && exp.startYear > state.yearTo) return false;
    }

    if (state.orgQuery) {
      const hit = exp.orgNames.some((name) => name.toLowerCase().includes(state.orgQuery));
      if (!hit) return false;
    }

    if (state.municipalityQuery) {
      const target = exp.municipalities.length > 0 ? exp.municipalities : exp.orgNames;
      const hit = target.some((name) => name.toLowerCase().includes(state.municipalityQuery));
      if (!hit) return false;
    }

    return true;
  }

  function compareExperiments(a, b, queryTokens) {
    if (state.sortBy === "recent") {
      return (b.startYear || 0) - (a.startYear || 0) || a.name.localeCompare(b.name, "ja");
    }
    if (state.sortBy === "prefecture") {
      return a.prefecture.localeCompare(b.prefecture, "ja") || a.name.localeCompare(b.name, "ja");
    }
    if (state.sortBy === "status") {
      return (statusPriority[a.status] ?? 99) - (statusPriority[b.status] ?? 99) || a.name.localeCompare(b.name, "ja");
    }
    return relevanceScore(b, queryTokens) - relevanceScore(a, queryTokens) || (statusPriority[a.status] ?? 99) - (statusPriority[b.status] ?? 99);
  }

  function relevanceScore(exp, queryTokens) {
    let score = 0;
    if (queryTokens.length > 0) {
      queryTokens.forEach((token) => {
        if (exp.name.toLowerCase().includes(token)) score += 6;
        if (exp.location.toLowerCase().includes(token)) score += 4;
        if (exp.orgNames.some((name) => name.toLowerCase().includes(token))) score += 3;
        if (exp.description.toLowerCase().includes(token)) score += 2;
      });
    } else {
      score += 2;
    }
    if (exp.ongoing) score += 1.2;
    if (exp.startYear) score += (exp.startYear - 2010) / 30;
    return score;
  }

  function renderFilterSelectionUI() {
    document.querySelectorAll(".chip-button[data-filter-key]").forEach((chip) => {
      const key = chip.dataset.filterKey;
      const value = chip.dataset.filterValue;
      const active = state[key] instanceof Set && state[key].has(value);
      chip.classList.toggle("active", active);
    });

    const prefChips = [...state.prefectures]
      .sort((a, b) => a.localeCompare(b, "ja"))
      .map(
        (pref) =>
          `<button class="selected-chip" type="button" data-remove-prefecture="${escAttr(pref)}">${escHtml(pref)}<span>×</span></button>`
      )
      .join("");
    dom.prefectureSelected.innerHTML = prefChips || '<span class="muted-text">追加した都道府県はここに表示されます</span>';
  }

  function renderActiveFilters() {
    const badges = [];
    if (state.query) badges.push(renderFilterBadge("キーワード", state.query, "query"));
    if (state.orgQuery) badges.push(renderFilterBadge("主体組織", state.orgQuery, "orgQuery"));
    if (state.municipalityQuery) badges.push(renderFilterBadge("自治体", state.municipalityQuery, "municipalityQuery"));
    if (state.yearFrom !== null) badges.push(renderFilterBadge("開始年From", String(state.yearFrom), "yearFrom"));
    if (state.yearTo !== null) badges.push(renderFilterBadge("開始年To", String(state.yearTo), "yearTo"));
    badges.push(...[...state.statuses].map((v) => renderFilterBadge("ステータス", v, "statuses", v)));
    badges.push(...[...state.prefectures].map((v) => renderFilterBadge("都道府県", v, "prefectures", v)));
    badges.push(...[...state.levels].map((v) => renderFilterBadge("運行レベル", v, "levels", v)));
    badges.push(...[...state.vehicles].map((v) => renderFilterBadge("使用車両", v, "vehicles", v)));
    badges.push(...[...state.adSystems].map((v) => renderFilterBadge("ADシステム", v, "adSystems", v)));
    badges.push(...[...state.routeTags].map((v) => renderFilterBadge("ルート特性", v, "routeTags", v)));
    dom.activeFilters.innerHTML = badges.length ? badges.join("") : '<span class="muted-text">フィルタは未設定です</span>';
  }

  function renderFilterBadge(label, value, type, rawValue = "") {
    return `<button class="active-filter-chip" type="button" data-remove-filter="1" data-filter-type="${escAttr(type)}" data-filter-value="${escAttr(rawValue)}">
      <span>${escHtml(label)}: ${escHtml(value)}</span><span>×</span>
    </button>`;
  }

  function renderList(list) {
    dom.resultCount.textContent = `${list.length}件`;
    dom.emptyHint.hidden = list.length !== 0;
    dom.experimentList.innerHTML = list
      .map(
        (exp) => `
      <li class="experiment-list-item${state.selectedId === exp.id ? " active" : ""}" role="button" tabindex="0" data-id="${escAttr(exp.id)}">
        <div class="experiment-list-item__header">
          <span class="experiment-list-item__name">${escHtml(exp.name)}</span>
          <span class="experiment-list-item__prefecture">${escHtml(exp.prefecture)}</span>
        </div>
        <div class="experiment-list-item__meta">
          <span class="status-badge" data-status="${escAttr(exp.status)}">${escHtml(exp.status)}</span>
          <span class="meta-chip">${escHtml(exp.primaryLevel)}</span>
          ${exp.vehicle ? `<span class="meta-chip">${escHtml(exp.vehicle)}</span>` : ""}
        </div>
        <div class="experiment-list-item__period">${escHtml(exp.period)}</div>
      </li>`
      )
      .join("");
  }

  function selectExperiment(id) {
    const prevId = state.selectedId;
    if (prevId && markers[prevId]) markers[prevId].setIcon(ICON_DEFAULT);
    state.selectedId = id;
    const exp = experimentById.get(id);
    if (!exp) return;

    const prevLi = prevId ? dom.experimentList.querySelector(`[data-id="${escAttr(prevId)}"]`) : null;
    if (prevLi) prevLi.classList.remove("active");
    const newLi = dom.experimentList.querySelector(`[data-id="${escAttr(id)}"]`);
    if (newLi) newLi.classList.add("active");

    if (markers[id]) {
      markers[id].setIcon(ICON_ACTIVE);
      map.setView([exp.lat, exp.lng], Math.max(map.getZoom(), 9), { animate: true });
      markers[id].openPopup();
    }
    openDetail(exp.raw);
  }

  function ensureSelectionVisibility(list) {
    if (!state.selectedId) return;
    const exists = list.some((exp) => exp.id === state.selectedId);
    if (exists) return;
    if (markers[state.selectedId]) markers[state.selectedId].setIcon(ICON_DEFAULT);
    state.selectedId = null;
    if (!dom.detailOverlay.hasAttribute("hidden")) closeDetailPanel();
  }

  function updateMarkerVisibility(list) {
    const visibleIds = new Set(list.map((exp) => exp.id));
    experiments.forEach((exp) => {
      const marker = markers[exp.id];
      if (!marker) return;
      if (visibleIds.has(exp.id)) {
        if (!map.hasLayer(marker)) marker.addTo(map);
      } else if (map.hasLayer(marker)) {
        map.removeLayer(marker);
      }
    });
  }

  function updateCounters(filteredCount) {
    dom.filteredCountMain.textContent = `${filteredCount}件`;
  }

  function updateMapBoundsCount() {
    const bounds = map.getBounds();
    const count = lastResult.filter((exp) => bounds.contains([exp.lat, exp.lng])).length;
    dom.mapBoundsCount.textContent = `${count}件`;
  }

  function openDetail(exp) {
    dom.detailTitle.textContent = exp.name.value;
    dom.detailStatus.textContent = exp.status.value;
    dom.detailStatus.setAttribute("data-status", exp.status.value);
    dom.detailLocation.innerHTML = `<span class="material-symbols-outlined">location_on</span>${escHtml(exp.location.value)}`;
    dom.detailBody.innerHTML = buildDetailBody(exp);
    dom.detailOverlay.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    const activeItem = dom.experimentList.querySelector(`[data-id="${exp.id}"]`);
    if (activeItem) activeItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function closeDetailPanel() {
    dom.detailOverlay.setAttribute("hidden", "");
    document.body.style.overflow = "";
  }

  function buildDetailBody(exp) {
    const refLink = (refs) => {
      if (!refs || refs.length === 0) return "";
      const links = refs.map((ref) => `<a href="#ref-${exp.id}-${ref}" title="参考文献${ref}">${ref}</a>`).join("");
      return `<span class="ref-sup">${links}</span>`;
    };

    const field = (label, fieldObj, extra = "") =>
      `<div class="detail-field"${extra}>
        <span class="detail-field__label">${label}</span>
        <span class="detail-field__value">${escHtml(fieldObj.value)}${refLink(fieldObj.refs)}</span>
      </div>`;

    return `
      <div class="detail-section">
        <div class="detail-section__title"><span class="material-symbols-outlined">info</span>基本情報</div>
        ${field("実施期間", exp.period)}
        ${field("運行形態", exp.operationType)}
        ${(Array.isArray(exp.vehicle) ? exp.vehicle : exp.vehicle ? [exp.vehicle] : []).map((v) => `<div class="detail-field"><span class="detail-field__label">車両名</span><span class="detail-field__value">${escHtml(v.value)}${refLink(v.refs ?? [])}</span></div>`).join("")}
        ${exp.adSystem?.value ? `<div class="detail-field"><span class="detail-field__label">自動運転システム</span><span class="detail-field__value">${escHtml(exp.adSystem.value)}${refLink(exp.adSystem.refs ?? [])}</span></div>` : ""}
        ${field("ルート", exp.route)}
        ${field("概要", exp.description, ' style="grid-template-columns: 140px 1fr"')}
      </div>

      <div class="detail-section">
        <div class="detail-section__title"><span class="material-symbols-outlined">groups</span>ステークホルダー</div>
        <table class="stakeholders-table">
          <thead>
            <tr><th>役割</th><th>組織名</th><th style="width:60px;text-align:center">出典</th></tr>
          </thead>
          <tbody>
            ${exp.stakeholders
              .map(
                (s) => `
              <tr>
                <td><span class="role-chip">${escHtml(s.role)}</span></td>
                <td>${escHtml(s.name)}</td>
                <td style="text-align:center">${refLink(s.refs)}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <div class="detail-section">
        <div class="detail-section__title"><span class="material-symbols-outlined">menu_book</span>参考文献</div>
        <ul class="references-list">
          ${exp.references
            .map(
              (ref) => `
            <li class="reference-item" id="ref-${escHtml(exp.id)}-${ref.id}">
              <span class="reference-item__num">${ref.id}</span>
              <div class="reference-item__content">
                <a class="reference-item__title" href="${escAttr(ref.url)}" target="_blank" rel="noopener noreferrer">
                  ${escHtml(ref.title)}
                </a>
                <div class="reference-item__meta">${escHtml(ref.source)} · ${escHtml(ref.date)}</div>
              </div>
            </li>`
            )
            .join("")}
        </ul>
      </div>`;
  }
});
