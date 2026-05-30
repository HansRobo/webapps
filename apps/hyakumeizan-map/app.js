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

  // ── 山データの正規化 ──
  const mountains = MOUNTAINS.map((m) => ({
    ...m,
    prefLabels: m.prefectures.map((p) => p.label),
    prefIds: m.prefectures.map((p) => p.id),
    regionId: m.region.id,
    regionLabel: m.region.label,
  }));
  const mountainById = new Map(mountains.map((m) => [m.id, m]));
  const TOTAL = mountains.length;

  // 出現する都道府県・山域（データ駆動でフィルタ生成）
  const regionsInData = (() => {
    const order = Object.values(REGION).map((r) => r.id);
    const present = new Set(mountains.map((m) => m.regionId));
    return Object.values(REGION).filter((r) => present.has(r.id))
      .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  })();
  const prefsInData = (() => {
    const order = Object.values(PREF).map((p) => p.id);
    const present = new Set(mountains.flatMap((m) => m.prefIds));
    return Object.values(PREF).filter((p) => present.has(p.id))
      .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  })();
  const ELEV_THRESHOLDS = [1000, 1500, 2000, 2500, 3000];

  const dom = {
    queryInput: document.getElementById("queryInput"),
    clearFiltersButton: document.getElementById("clearFiltersButton"),
    ascentFilterGroup: document.getElementById("ascentFilterGroup"),
    regionFilterGroup: document.getElementById("regionFilterGroup"),
    prefectureSelect: document.getElementById("prefectureSelect"),
    prefectureAddButton: document.getElementById("prefectureAddButton"),
    prefectureSelected: document.getElementById("prefectureSelected"),
    elevFromSelect: document.getElementById("elevFromSelect"),
    elevToSelect: document.getElementById("elevToSelect"),
    sortSelect: document.getElementById("sortSelect"),
    resultCount: document.getElementById("resultCount"),
    filteredCountMain: document.getElementById("filteredCountMain"),
    emptyHint: document.getElementById("emptyHint"),
    mountainList: document.getElementById("mountainList"),
    ascendedCount: document.getElementById("ascendedCount"),
    progressFill: document.getElementById("progressFill"),
    detailOverlay: document.getElementById("detailOverlay"),
    detailTitle: document.getElementById("detailTitle"),
    detailStatus: document.getElementById("detailStatus"),
    detailLocation: document.getElementById("detailLocation"),
    detailBody: document.getElementById("detailBody"),
    closeDetail: document.getElementById("closeDetail"),
    openSync: document.getElementById("openSync"),
    syncOverlay: document.getElementById("syncOverlay"),
    closeSync: document.getElementById("closeSync"),
    tokenInput: document.getElementById("tokenInput"),
    saveToken: document.getElementById("saveToken"),
    pushGist: document.getElementById("pushGist"),
    pullGist: document.getElementById("pullGist"),
    syncStatus: document.getElementById("syncStatus"),
    exportJson: document.getElementById("exportJson"),
    importJsonBtn: document.getElementById("importJsonBtn"),
    importJsonFile: document.getElementById("importJsonFile"),
    resetOwner: document.getElementById("resetOwner"),
    agentPrompt: document.getElementById("agentPrompt"),
    copyPrompt: document.getElementById("copyPrompt"),
    copyFeedback: document.getElementById("copyFeedback"),
    mobileShowFilters: document.getElementById("mobileShowFilters"),
    mobileShowResults: document.getElementById("mobileShowResults"),
    mobileHidePanels: document.getElementById("mobileHidePanels"),
  };

  const state = {
    query: "",
    ascent: new Set(),       // "done" | "todo"
    regions: new Set(),      // region id
    prefectures: new Set(),  // pref id
    elevFrom: null,
    elevTo: null,
    sortBy: "no",
    selectedId: null,
    mobilePanel: "results",
  };

  // ── ストア初期化 ──
  AscentStore.init();

  // ════════════════ 地図 ════════════════
  const map = L.map("map", { zoomControl: true, attributionControl: true }).setView([37.5, 138.0], 6);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // 初期表示は全100座が収まる範囲にフィット（周辺諸国まで写り込まないようにする）
  const dataBounds = L.latLngBounds(mountains.map((m) => [m.lat, m.lng]));
  map.fitBounds(dataBounds, { padding: [28, 28], maxZoom: 7 });

  const markerById = new Map();

  // 登頂状態で色分けした山頂マーク（三角アイコン）。白縁＋影で地図上の視認性を確保する。
  const MARK_DONE = "#e8590c"; // 登頂済み: 鮮やかな朱
  const MARK_TODO = "#1f3a5f"; // 未登頂: 濃紺

  function peakIcon(done) {
    const fill = done ? MARK_DONE : MARK_TODO;
    return L.divIcon({
      className: `peak-marker ${done ? "peak-marker--done" : "peak-marker--todo"}`,
      html: `<svg width="28" height="26" viewBox="0 0 28 26" aria-hidden="true">
        <path d="M14 2 L26 23 H2 Z" fill="${fill}" stroke="#ffffff" stroke-width="2.2" stroke-linejoin="round"/>
        ${done ? '<path d="M14 2 L18.2 9.3 L14 11.8 L9.8 9.3 Z" fill="#ffffff" fill-opacity="0.9"/>' : ""}
      </svg>`,
      iconSize: [28, 26],
      iconAnchor: [14, 23], // 三角の底辺中央（山の麓）を座標に合わせる
      popupAnchor: [0, -22],
    });
  }

  function buildMarkers() {
    for (const m of mountains) {
      const done = AscentStore.isAscended(m.id);
      const marker = L.marker([m.lat, m.lng], { icon: peakIcon(done), title: m.name });
      marker.on("click", () => openDetail(m.id));
      markerById.set(m.id, marker);
    }
  }

  function refreshMarker(id) {
    const marker = markerById.get(id);
    if (marker) marker.setIcon(peakIcon(AscentStore.isAscended(id)));
  }

  // ════════════════ フィルタUI構築 ════════════════
  function renderToggleChip(group, value, label) {
    const active = state[group].has(value);
    return `<button type="button" class="chip ${active ? "chip--active" : ""}" data-group="${group}" data-value="${escAttr(value)}">${escHtml(label)}</button>`;
  }

  function buildFilters() {
    dom.ascentFilterGroup.innerHTML =
      renderToggleChip("ascent", "done", "登頂済み") + renderToggleChip("ascent", "todo", "未登頂");
    dom.regionFilterGroup.innerHTML = regionsInData
      .map((r) => renderToggleChip("regions", r.id, r.label))
      .join("");
    dom.prefectureSelect.innerHTML =
      '<option value="">都道府県（すべて）</option>' +
      prefsInData.map((p) => `<option value="${p.id}">${escHtml(p.label)}</option>`).join("");
    const elevOpts = ELEV_THRESHOLDS.map((v) => `<option value="${v}">${v.toLocaleString()}m</option>`).join("");
    dom.elevFromSelect.innerHTML = '<option value="">下限なし</option>' + elevOpts;
    dom.elevToSelect.innerHTML = '<option value="">上限なし</option>' + elevOpts;
  }

  function renderPrefectureChips() {
    dom.prefectureSelected.innerHTML = [...state.prefectures]
      .map((id) => {
        const p = prefsInData.find((x) => x.id === id);
        return `<span class="selected-chip" data-pref="${id}">${escHtml(p ? p.label : id)}<button type="button" data-remove-pref="${id}" aria-label="削除">×</button></span>`;
      })
      .join("");
  }

  // ════════════════ フィルタ＆ソート ════════════════
  function matches(m) {
    if (state.query) {
      const q = state.query.toLowerCase();
      if (!m.name.toLowerCase().includes(q) &&
          !(m.alias || "").toLowerCase().includes(q) &&
          !m.reading.toLowerCase().includes(q)) return false;
    }
    if (state.ascent.size) {
      const done = AscentStore.isAscended(m.id);
      const key = done ? "done" : "todo";
      if (!state.ascent.has(key)) return false;
    }
    if (state.regions.size && !state.regions.has(m.regionId)) return false;
    if (state.prefectures.size && !m.prefIds.some((id) => state.prefectures.has(id))) return false;
    if (state.elevFrom !== null && m.elevation < state.elevFrom) return false;
    if (state.elevTo !== null && m.elevation > state.elevTo) return false;
    return true;
  }

  function sortList(list) {
    const by = state.sortBy;
    const arr = list.slice();
    if (by === "no") arr.sort((a, b) => a.no - b.no);
    else if (by === "elevation-desc") arr.sort((a, b) => b.elevation - a.elevation);
    else if (by === "elevation-asc") arr.sort((a, b) => a.elevation - b.elevation);
    else if (by === "reading") arr.sort((a, b) => a.reading.localeCompare(b.reading, "ja"));
    else if (by === "ascent-recent") {
      arr.sort((a, b) => {
        const da = AscentStore.latestDate(a.id) || "";
        const db = AscentStore.latestDate(b.id) || "";
        if (da && db) return db.localeCompare(da);
        if (da) return -1;
        if (db) return 1;
        return a.no - b.no;
      });
    }
    return arr;
  }

  // ════════════════ 描画 ════════════════
  function render() {
    const filtered = sortList(mountains.filter(matches));
    const filteredIds = new Set(filtered.map((m) => m.id));

    // マーカー：フィルタ結果のみ表示
    for (const m of mountains) {
      const marker = markerById.get(m.id);
      if (filteredIds.has(m.id)) {
        if (!map.hasLayer(marker)) marker.addTo(map);
      } else if (map.hasLayer(marker)) {
        map.removeLayer(marker);
      }
    }

    dom.resultCount.textContent = `${filtered.length}座`;
    dom.filteredCountMain.textContent = `${filtered.length}座`;
    dom.emptyHint.hidden = filtered.length > 0;

    dom.mountainList.innerHTML = filtered.map(renderListItem).join("");
    renderProgress();
  }

  function renderListItem(m) {
    const done = AscentStore.isAscended(m.id);
    const latest = AscentStore.latestDate(m.id);
    const history = AscentStore.getEntry(m.id).history;
    const count = history.length;
    const badge = done
      ? `<span class="status-badge status-badge--done">登頂済み</span>`
      : `<span class="status-badge status-badge--todo">未登頂</span>`;
    const dateLine = done
      ? `<span class="meta-chip"><span class="material-symbols-outlined">event</span>${latest ? escHtml(latest) : "日付未記録"}${count > 1 ? ` 他${count - 1}回` : ""}</span>`
      : "";
    const urlEntry = history.find((h) => h.url);
    const linkLine = urlEntry
      ? `<a class="meta-chip meta-chip--link" href="${escAttr(urlEntry.url)}" target="_blank" rel="noopener noreferrer"><span class="material-symbols-outlined">hiking</span>記録</a>`
      : "";
    return `<li class="mountain-item ${done ? "is-done" : ""}" data-id="${m.id}" role="listitem">
      <div class="mountain-item__no">${m.no}</div>
      <div class="mountain-item__main">
        <div class="mountain-item__head">
          <span class="mountain-item__name">${escHtml(m.name)}</span>
          ${badge}
        </div>
        <div class="mountain-item__meta">
          <span class="meta-chip"><span class="material-symbols-outlined">straighten</span>${m.elevation.toLocaleString()}m</span>
          <span class="meta-chip">${escHtml(m.regionLabel)}</span>
          <span class="meta-chip">${escHtml(m.prefLabels.join("・"))}</span>
          ${dateLine}
          ${linkLine}
        </div>
      </div>
    </li>`;
  }

  function renderProgress() {
    const ascended = mountains.filter((m) => AscentStore.isAscended(m.id)).length;
    dom.ascendedCount.textContent = String(ascended);
    dom.progressFill.style.width = `${(ascended / TOTAL) * 100}%`;
  }

  // ════════════════ 詳細＋登頂記録エディタ ════════════════
  function openDetail(id) {
    state.selectedId = id;
    renderDetail();
    dom.detailOverlay.hidden = false;
    const m = mountainById.get(id);
    map.panTo([m.lat, m.lng]);
  }

  function closeDetail() {
    dom.detailOverlay.hidden = true;
    state.selectedId = null;
  }

  function renderDetail() {
    const m = mountainById.get(state.selectedId);
    if (!m) return;
    const done = AscentStore.isAscended(m.id);
    dom.detailStatus.className = `status-badge ${done ? "status-badge--done" : "status-badge--todo"}`;
    dom.detailStatus.textContent = done ? "登頂済み" : "未登頂";
    dom.detailTitle.textContent = `${m.no}. ${m.name}${m.alias ? `（${m.alias}）` : ""}`;
    dom.detailLocation.textContent = `${m.reading}　${m.prefLabels.join("・")}`;

    const history = AscentStore.getEntry(m.id).history;
    const historyHtml = history.length
      ? history
          .map(
            (h, i) => `<div class="ascent-entry" data-index="${i}">
              <div class="ascent-entry__row">
                <input type="date" class="ascent-date" data-action="edit" data-index="${i}" value="${h.date ? escAttr(h.date) : ""}" />
                <input type="text" class="ascent-note" data-action="edit" data-index="${i}" placeholder="メモ（ルート・天気・同行者など）" value="${escAttr(h.note)}" />
                <button class="icon-button icon-button--sm" data-action="remove" data-index="${i}" aria-label="この記録を削除">
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
              <div class="ascent-entry__row ascent-entry__url-row">
                <span class="material-symbols-outlined ascent-url-icon">link</span>
                <input type="url" class="ascent-url" data-action="edit" data-index="${i}" placeholder="登山記録URL（YAMAP など）" value="${escAttr(h.url)}" />
                ${h.url ? `<a class="ascent-url-open" href="${escAttr(h.url)}" target="_blank" rel="noopener noreferrer" aria-label="記録を開く"><span class="material-symbols-outlined">open_in_new</span></a>` : ""}
              </div>
            </div>`
          )
          .join("")
      : `<p class="ascent-empty">まだ登頂記録がありません。</p>`;

    dom.detailBody.innerHTML = `
      <dl class="info-grid">
        <div><dt>標高</dt><dd>${m.elevation.toLocaleString()} m</dd></div>
        <div><dt>山域</dt><dd>${escHtml(m.regionLabel)}</dd></div>
        <div><dt>都道府県</dt><dd>${escHtml(m.prefLabels.join("・"))}</dd></div>
        <div><dt>座標</dt><dd>${m.lat.toFixed(3)}, ${m.lng.toFixed(3)}</dd></div>
      </dl>
      <div class="ascent-section">
        <div class="ascent-section__head">
          <h3>登頂記録${history.length ? `（${history.length}回）` : ""}</h3>
          <div class="ascent-section__actions">
            <button class="chip-button" data-action="add" type="button">
              <span class="material-symbols-outlined">add</span>登頂を追加
            </button>
            ${done ? `<button class="chip-button chip-button--ghost" data-action="clear" type="button">未登頂に戻す</button>` : ""}
          </div>
        </div>
        <div class="ascent-list">${historyHtml}</div>
      </div>
      <p class="detail-source">出典: ${escHtml(m.source)}</p>
    `;
  }

  function todayStr() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }

  function afterRecordChange() {
    const id = state.selectedId;
    if (id) {
      refreshMarker(id);
      renderDetail();
    }
    render();
  }

  // 詳細ボディ内のイベント委譲
  dom.detailBody.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    const id = state.selectedId;
    if (!id) return;
    if (action === "add") {
      AscentStore.addAscent(id, { date: todayStr(), note: "" });
      afterRecordChange();
    } else if (action === "clear") {
      AscentStore.setAscended(id, false);
      afterRecordChange();
    } else if (action === "remove") {
      AscentStore.removeAscent(id, Number(btn.dataset.index));
      afterRecordChange();
    }
  });

  dom.detailBody.addEventListener("change", (e) => {
    const input = e.target.closest('[data-action="edit"]');
    if (!input) return;
    const id = state.selectedId;
    const row = input.closest(".ascent-entry");
    const index = Number(row.dataset.index);
    const date = row.querySelector(".ascent-date").value || null;
    const note = row.querySelector(".ascent-note").value || "";
    const url = row.querySelector(".ascent-url").value || "";
    AscentStore.updateAscent(id, index, { date, note, url });
    // URL 欄を編集したときは「開く」リンクの有無を反映するため詳細も再描画する
    if (input.classList.contains("ascent-url")) renderDetail();
    refreshMarker(id);
    render();
  });

  // ════════════════ イベント結線 ════════════════
  dom.queryInput.addEventListener("input", () => {
    state.query = dom.queryInput.value.trim();
    render();
  });

  function onChipGroupClick(e) {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const { group, value } = chip.dataset;
    const set = state[group];
    if (set.has(value)) set.delete(value);
    else set.add(value);
    buildFilters();
    renderPrefectureChips();
    render();
  }
  dom.ascentFilterGroup.addEventListener("click", onChipGroupClick);
  dom.regionFilterGroup.addEventListener("click", onChipGroupClick);

  dom.prefectureAddButton.addEventListener("click", () => {
    const id = dom.prefectureSelect.value;
    if (id) {
      state.prefectures.add(id);
      dom.prefectureSelect.value = "";
      renderPrefectureChips();
      render();
    }
  });
  dom.prefectureSelected.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove-pref]");
    if (!btn) return;
    state.prefectures.delete(btn.dataset.removePref);
    renderPrefectureChips();
    render();
  });

  dom.elevFromSelect.addEventListener("change", () => {
    state.elevFrom = dom.elevFromSelect.value ? Number(dom.elevFromSelect.value) : null;
    render();
  });
  dom.elevToSelect.addEventListener("change", () => {
    state.elevTo = dom.elevToSelect.value ? Number(dom.elevToSelect.value) : null;
    render();
  });
  dom.sortSelect.addEventListener("change", () => {
    state.sortBy = dom.sortSelect.value;
    render();
  });

  dom.clearFiltersButton.addEventListener("click", () => {
    state.query = "";
    state.ascent.clear();
    state.regions.clear();
    state.prefectures.clear();
    state.elevFrom = null;
    state.elevTo = null;
    dom.queryInput.value = "";
    dom.elevFromSelect.value = "";
    dom.elevToSelect.value = "";
    buildFilters();
    renderPrefectureChips();
    render();
  });

  dom.mountainList.addEventListener("click", (e) => {
    if (e.target.closest("a")) return; // 記録リンクのクリックは詳細を開かない
    const li = e.target.closest(".mountain-item");
    if (li) openDetail(li.dataset.id);
  });

  dom.closeDetail.addEventListener("click", closeDetail);
  dom.detailOverlay.addEventListener("click", (e) => {
    if (e.target === dom.detailOverlay) closeDetail();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!dom.detailOverlay.hidden) closeDetail();
      if (!dom.syncOverlay.hidden) dom.syncOverlay.hidden = true;
    }
  });

  // ── 同期モーダル ──
  function openSync() {
    dom.tokenInput.value = AscentStore.getToken();
    dom.syncStatus.textContent = "";
    dom.syncOverlay.hidden = false;
  }
  function setSyncStatus(msg, kind) {
    dom.syncStatus.textContent = msg;
    dom.syncStatus.className = `sync-status ${kind ? `sync-status--${kind}` : ""}`;
  }
  dom.openSync.addEventListener("click", openSync);
  dom.closeSync.addEventListener("click", () => (dom.syncOverlay.hidden = true));
  dom.syncOverlay.addEventListener("click", (e) => {
    if (e.target === dom.syncOverlay) dom.syncOverlay.hidden = true;
  });

  dom.saveToken.addEventListener("click", () => {
    AscentStore.setToken(dom.tokenInput.value.trim());
    setSyncStatus("トークンを保存しました。", "ok");
  });

  dom.pushGist.addEventListener("click", async () => {
    setSyncStatus("クラウドへ保存中…");
    try {
      const r = await AscentStore.pushToGist();
      setSyncStatus(r.created ? `Gist を新規作成しました（ID: ${r.id}）。` : "クラウドへ保存しました。", "ok");
    } catch (err) {
      setSyncStatus(`保存に失敗しました: ${err.message}`, "error");
    }
  });

  dom.pullGist.addEventListener("click", async () => {
    if (!confirm("クラウドの記録でこの端末の記録を上書きします。よろしいですか？")) return;
    setSyncStatus("クラウドから取得中…");
    try {
      await AscentStore.pullFromGist();
      rebuildAllMarkers();
      render();
      setSyncStatus("クラウドから取得しました。", "ok");
    } catch (err) {
      setSyncStatus(`取得に失敗しました: ${err.message}`, "error");
    }
  });

  dom.exportJson.addEventListener("click", () => {
    const blob = new Blob([AscentStore.exportJSON()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hyakumeizan-ascents.json";
    a.click();
    URL.revokeObjectURL(url);
  });
  dom.importJsonBtn.addEventListener("click", () => dom.importJsonFile.click());
  dom.importJsonFile.addEventListener("change", async () => {
    const file = dom.importJsonFile.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      AscentStore.importJSON(text);
      rebuildAllMarkers();
      render();
      setSyncStatus("インポートしました。", "ok");
    } catch (err) {
      setSyncStatus(`インポートに失敗しました: ${err.message}`, "error");
    }
    dom.importJsonFile.value = "";
  });

  dom.resetOwner.addEventListener("click", () => {
    if (!confirm("この端末の記録を消去し、オーナーのデフォルト記録に戻します。よろしいですか？")) return;
    AscentStore.resetToOwner();
    rebuildAllMarkers();
    render();
    setSyncStatus("デフォルトに戻しました。", "ok");
  });

  function rebuildAllMarkers() {
    for (const id of markerById.keys()) refreshMarker(id);
  }

  // ── AI 一括入力プロンプト（自己完結・リポジトリ不要） ──
  function buildAgentPrompt() {
    const filename = (typeof HYAKUMEIZAN_CONFIG !== "undefined" && HYAKUMEIZAN_CONFIG.GIST_FILENAME) || "hyakumeizan-ascents.json";
    const idList = mountains
      .map((m) => `${m.id}  ${m.name}${m.alias ? `（${m.alias}）` : ""}  ${m.prefLabels.join("・")}  ${m.elevation}m`)
      .join("\n");
    return `あなたはコーディングエージェントです。私の登山記録をもとに「日本百名山マップ」アプリの登頂記録 Gist を更新してください。

# ゴール
私の登山記録（YAMAP・ヤマレコ・手元のメモなど。具体的な URL や内容はこのあと私が伝えます）から日本百名山への登頂を抽出し、下記スキーマの JSON を作って、私の GitHub Gist 内のファイル「${filename}」を上書き更新してください（同名ファイルの Gist が無ければ public で新規作成）。

# ファイルのデータスキーマ
「${filename}」の中身は、山ID をキーとする JSON オブジェクトです:
{
  "<山ID>": {
    "history": [
      { "date": "YYYY-MM-DD", "note": "活動タイトルやメモ（任意）", "url": "登山記録のURL（任意）" }
    ]
  }
}
ルール:
- 登頂済み = history に1件以上ある。日付が不明なら "date": null。
- 同じ山に複数回登頂したら history に複数要素を入れる（古い順）。
- 登っていない山はキーごと省略する。
- ファイルの中身はこのオブジェクトそのもの（他のキーで包まない）。

# 山ID 一覧（山名 → ID の対応。これだけで判定できます）
${idList}

# 判定上の注意（同名・別座の取り違えに注意）
- 神奈川の大山(丹沢, 1252m) ≠ 鳥取の大山(m092)。地図名・都道府県で判別する。
- 那須の朝日岳 ≠ 山形/新潟の朝日岳(大朝日岳, m017)。
- 筑波山の男体山(峰) ≠ 日光の男体山(m036)。
- 山頂に到達した記録のみ登頂とする（「〜を望む」等の眺望のみ、未登頂の撤退は除外）。
- 日付は登山開始日（現地時間 JST）。

# Gist の更新手順（gist スコープ付き PAT もしくは認証済み gh CLI が前提）
記録オブジェクトを作ったら、それを文字列化して body.json を用意します:
  {"files":{"${filename}":{"content":"<記録オブジェクトをJSON文字列化したもの>"}}}

A) gh CLI が使える場合:
  1. 既存 Gist の ID を取得:
     gh api /gists --paginate --jq '.[] | select(.files["${filename}"]) | .id'
  2. 取得した <ID> を更新:
     gh api -X PATCH /gists/<ID> --input body.json
  3. 見つからなければ新規作成:
     gh gist create --public --filename ${filename} <記録ファイル>

B) PAT + curl の場合（TOKEN は gist スコープ付き PAT）:
     curl -s -H "Authorization: Bearer $TOKEN" "https://api.github.com/gists?per_page=100" \\
       | python3 -c "import sys,json;[print(g['id']) for g in json.load(sys.stdin) if '${filename}' in g.get('files',{})]"
     curl -X PATCH -H "Authorization: Bearer $TOKEN" https://api.github.com/gists/<ID> --data @body.json

更新できたら、「日本百名山マップ」アプリの同期パネルで同じ PAT を保存し「クラウドから取得」を押すと記録が反映されます。`;
  }

  dom.copyPrompt.addEventListener("click", async () => {
    const text = dom.agentPrompt.textContent;
    try {
      await navigator.clipboard.writeText(text);
      dom.copyFeedback.textContent = "コピーしました";
    } catch (e) {
      const r = document.createRange();
      r.selectNodeContents(dom.agentPrompt);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
      dom.copyFeedback.textContent = "選択しました（手動でコピーしてください）";
    }
    setTimeout(() => (dom.copyFeedback.textContent = ""), 2500);
  });

  // ── モバイルドック ──
  function setMobilePanel(panel) {
    state.mobilePanel = panel;
    document.body.dataset.mobilePanel = panel;
    dom.mobileShowFilters.classList.toggle("active", panel === "filters");
    dom.mobileShowResults.classList.toggle("active", panel === "results");
    dom.mobileHidePanels.classList.toggle("active", panel === "map");
    setTimeout(() => map.invalidateSize(), 200);
  }
  dom.mobileShowFilters.addEventListener("click", () => setMobilePanel("filters"));
  dom.mobileShowResults.addEventListener("click", () => setMobilePanel("results"));
  dom.mobileHidePanels.addEventListener("click", () => setMobilePanel("map"));

  // ── 初期化 ──
  buildMarkers();
  buildFilters();
  renderPrefectureChips();
  setMobilePanel("results");
  dom.agentPrompt.textContent = buildAgentPrompt();
  render();

  // オーナー Gist（デフォルト）を非同期取得。localStorage が無ければ反映して再描画。
  AscentStore.loadDefaults().then((applied) => {
    if (applied) {
      rebuildAllMarkers();
      render();
    }
  });
});
