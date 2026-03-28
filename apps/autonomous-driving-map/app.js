document.addEventListener("DOMContentLoaded", () => {
  let activeFilter = { status: "", prefecture: "" };
  let selectedId = null;
  let markers = {};

  const experimentList = document.getElementById("experimentList");
  const experimentCount = document.getElementById("experimentCount");
  const statusFilter = document.getElementById("statusFilter");
  const prefectureFilter = document.getElementById("prefectureFilter");
  const detailOverlay = document.getElementById("detailOverlay");
  const detailTitle = document.getElementById("detailTitle");
  const detailStatus = document.getElementById("detailStatus");
  const detailLocation = document.getElementById("detailLocation");
  const detailBody = document.getElementById("detailBody");
  const closeDetail = document.getElementById("closeDetail");

  const map = L.map("map", {
    center: [36.5, 137.0],
    zoom: 6,
    zoomControl: true,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  const prefectures = [...new Set(EXPERIMENTS.map((e) => e.prefecture.value))].sort();
  prefectures.forEach((pref) => {
    const opt = document.createElement("option");
    opt.value = pref;
    opt.textContent = pref;
    prefectureFilter.appendChild(opt);
  });

  const ICON_DEFAULT = L.divIcon({
    className: "custom-marker",
    html: `<div class="custom-marker__dot"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
  });

  const ICON_ACTIVE = L.divIcon({
    className: "custom-marker custom-marker--active",
    html: `<div class="custom-marker__dot"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
  });

  EXPERIMENTS.forEach((exp) => {
    const marker = L.marker([exp.location.lat, exp.location.lng], {
      icon: ICON_DEFAULT,
      title: exp.name.value,
    });

    marker.bindPopup(`
      <div class="map-popup">
        <div class="map-popup__name">${escHtml(exp.name.value)}</div>
        <div class="map-popup__location">${escHtml(exp.location.value)}</div>
        <div class="map-popup__footer">
          <span class="status-badge" data-status="${escAttr(exp.status.value)}">${escHtml(exp.status.value)}</span>
          <span class="map-popup__detail-hint">クリックで詳細 →</span>
        </div>
      </div>`, { maxWidth: 300 });

    marker.on("click", () => selectExperiment(exp.id));
    marker.addTo(map);
    markers[exp.id] = marker;
  });

  function filteredExperiments() {
    return EXPERIMENTS.filter((exp) => {
      if (activeFilter.status && exp.status.value !== activeFilter.status) return false;
      if (activeFilter.prefecture && exp.prefecture.value !== activeFilter.prefecture) return false;
      return true;
    });
  }

  function renderList() {
    const list = filteredExperiments();
    experimentCount.textContent = `${list.length}件`;
    experimentList.innerHTML = "";

    list.forEach((exp) => {
      const li = document.createElement("li");
      li.className = `experiment-list-item${selectedId === exp.id ? " active" : ""}`;
      li.setAttribute("role", "button");
      li.setAttribute("tabindex", "0");
      li.dataset.id = exp.id;
      li.innerHTML = `
        <div class="experiment-list-item__header">
          <span class="experiment-list-item__name">${escHtml(exp.name.value)}</span>
          <span class="experiment-list-item__prefecture">${escHtml(exp.prefecture.value)}</span>
        </div>
        <div>${buildBadge(exp.status.value)}</div>
        <div class="experiment-list-item__period">${escHtml(exp.period.value)}</div>`;

      li.addEventListener("click", () => selectExperiment(exp.id));
      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") selectExperiment(exp.id);
      });
      experimentList.appendChild(li);
    });

    const visibleIds = new Set(list.map((e) => e.id));
    EXPERIMENTS.forEach((exp) => {
      const marker = markers[exp.id];
      if (visibleIds.has(exp.id)) {
        if (!map.hasLayer(marker)) marker.addTo(map);
      } else {
        if (map.hasLayer(marker)) map.removeLayer(marker);
      }
    });
  }

  function selectExperiment(id) {
    if (selectedId && markers[selectedId]) {
      markers[selectedId].setIcon(ICON_DEFAULT);
    }
    selectedId = id;

    const exp = EXPERIMENTS.find((e) => e.id === id);
    if (markers[id] && exp) {
      markers[id].setIcon(ICON_ACTIVE);
      map.setView([exp.location.lat, exp.location.lng], Math.max(map.getZoom(), 10), { animate: true });
      markers[id].openPopup();
    }

    renderList();
    if (exp) openDetail(exp);
  }

  function openDetail(exp) {
    detailTitle.textContent = exp.name.value;
    detailStatus.textContent = exp.status.value;
    detailStatus.setAttribute("data-status", exp.status.value);
    detailLocation.innerHTML = `<span class="material-symbols-outlined" style="font-size:14px">location_on</span>${escHtml(exp.location.value)}`;
    detailBody.innerHTML = buildDetailBody(exp);
    detailOverlay.removeAttribute("hidden");
    document.body.style.overflow = "hidden";

    const activeItem = experimentList.querySelector(`[data-id="${exp.id}"]`);
    if (activeItem) activeItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function closeDetailPanel() {
    detailOverlay.setAttribute("hidden", "");
    document.body.style.overflow = "";

    if (selectedId) {
      if (markers[selectedId]) markers[selectedId].setIcon(ICON_DEFAULT);
      const activeItem = experimentList.querySelector(`[data-id="${selectedId}"]`);
      if (activeItem) activeItem.classList.remove("active");
      selectedId = null;
    }
  }

  closeDetail.addEventListener("click", closeDetailPanel);
  detailOverlay.addEventListener("click", (e) => {
    if (e.target === detailOverlay) closeDetailPanel();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !detailOverlay.hasAttribute("hidden")) closeDetailPanel();
  });

  function buildDetailBody(exp) {
    const refLink = (refs) => {
      if (!refs || refs.length === 0) return "";
      const links = refs.map((r) => `<a href="#ref-${exp.id}-${r}" title="参考文献${r}">${r}</a>`).join("");
      return `<span class="ref-sup">${links}</span>`;
    };

    const field = (label, fieldObj, extra = "") =>
      `<div class="detail-field"${extra}>
        <span class="detail-field__label">${label}</span>
        <span class="detail-field__value">${escHtml(fieldObj.value)}${refLink(fieldObj.refs)}</span>
      </div>`;

    return `
      <div class="detail-section">
        <div class="detail-section__title">
          <span class="material-symbols-outlined">info</span>基本情報
        </div>
        ${field("実施期間", exp.period)}
        ${field("運行形態", exp.operationType)}
        ${field("使用車両", exp.vehicleType)}
        ${field("ルート", exp.route)}
        ${field("概要", exp.description, ' style="grid-template-columns: 140px 1fr"')}
      </div>

      <div class="detail-section">
        <div class="detail-section__title">
          <span class="material-symbols-outlined">groups</span>ステークホルダー
        </div>
        <table class="stakeholders-table">
          <thead>
            <tr>
              <th>役割</th>
              <th>組織名</th>
              <th style="width:60px;text-align:center">出典</th>
            </tr>
          </thead>
          <tbody>
            ${exp.stakeholders.map((s) => `
              <tr>
                <td><span class="role-chip">${escHtml(s.role)}</span></td>
                <td>${escHtml(s.name)}</td>
                <td style="text-align:center">${refLink(s.refs)}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>

      <div class="detail-section">
        <div class="detail-section__title">
          <span class="material-symbols-outlined">menu_book</span>参考文献
        </div>
        <ul class="references-list">
          ${exp.references.map((ref) => `
            <li class="reference-item" id="ref-${escHtml(exp.id)}-${ref.id}">
              <span class="reference-item__num">${ref.id}</span>
              <div class="reference-item__content">
                <a class="reference-item__title" href="${escAttr(ref.url)}" target="_blank" rel="noopener noreferrer">
                  ${escHtml(ref.title)}
                </a>
                <div class="reference-item__meta">${escHtml(ref.source)} · ${escHtml(ref.date)}</div>
              </div>
            </li>`).join("")}
        </ul>
      </div>`;
  }

  statusFilter.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    statusFilter.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    activeFilter.status = chip.dataset.value;
    renderList();
  });

  prefectureFilter.addEventListener("change", () => {
    activeFilter.prefecture = prefectureFilter.value;
    renderList();
  });

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

  function buildBadge(status) {
    return `<span class="status-badge" data-status="${escAttr(status)}">${escHtml(status)}</span>`;
  }

  renderList();
});
