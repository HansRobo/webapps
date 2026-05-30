// 日本百名山マップ 登頂記録ストア
//
// 永続化レイヤー。記録データ構造:
//   { [mountainId]: { history: [ { date, note, url }, ... ], planned: boolean } }
//   状態の優先順位: 登頂済み(history.length>0) > 計画中(planned) > 未登頂
//   - date が null でも「登頂済み・日付不明」を表現できる
//   - planned は「これから登る予定」フラグ（登頂済みになると表示上は登頂済みが優先）
//   - url は登山記録（YAMAP 等）への任意リンク
//
// 優先順位:
//   1. localStorage（訪問者自身の記録 / 主ストア）
//   2. オーナーの公開 Gist（config.js の OWNER_GIST_ID、デフォルト表示）
//   3. 空（全て未登頂）
//
// 外部同期は GitHub Gist（PAT 方式・読み書き）。PAT を貼り付けると GIST_FILENAME を持つ
// 自分の Gist を探して読み書きする（無ければ public Gist として新規作成）。

const AscentStore = (function () {
  const STORAGE_KEY = "hyakumeizan-ascents";
  const TOKEN_KEY = "hyakumeizan-gh-token";
  const cfg = typeof HYAKUMEIZAN_CONFIG !== "undefined"
    ? HYAKUMEIZAN_CONFIG
    : { OWNER_GIST_ID: "", GIST_FILENAME: "hyakumeizan-ascents.json" };

  let records = {};   // 現在有効な記録
  let defaults = {};  // オーナー Gist 由来のデフォルト記録
  let hasLocal = false;

  // ── 正規化 ──
  function normalize(obj) {
    const out = {};
    if (!obj || typeof obj !== "object") return out;
    const src = obj.records && typeof obj.records === "object" ? obj.records : obj;
    for (const [id, val] of Object.entries(src)) {
      if (!val) continue;
      const rawHistory = Array.isArray(val.history)
        ? val.history
        : Array.isArray(val) ? val : [];
      const history = rawHistory.map((h) => ({
        date: h && h.date ? String(h.date) : null,
        note: h && h.note ? String(h.note) : "",
        url: h && h.url ? String(h.url) : "",
      }));
      const planned = !!(val && val.planned);
      if (history.length || planned) out[id] = { history, planned };
    }
    return out;
  }

  const clone = (x) => JSON.parse(JSON.stringify(x));

  // ── localStorage ──
  function loadLocal() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        records = normalize(JSON.parse(raw));
        hasLocal = true;
      }
    } catch (e) {
      console.warn("[store] localStorage 読み込みに失敗:", e);
    }
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      hasLocal = true;
    } catch (e) {
      console.warn("[store] localStorage 保存に失敗:", e);
    }
  }

  // ── GitHub Gist 共通 ──
  function authHeaders(token) {
    return {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    };
  }

  async function findOwnGist(token) {
    const res = await fetch("https://api.github.com/gists?per_page=100", {
      headers: authHeaders(token),
    });
    if (!res.ok) throw new Error(`Gist 一覧の取得に失敗しました (HTTP ${res.status})`);
    const list = await res.json();
    return list.find((g) => g.files && g.files[cfg.GIST_FILENAME]) || null;
  }

  // ── 公開 API ──
  return {
    /** localStorage を読み込む（同期）。起動直後に呼ぶ。 */
    init() {
      loadLocal();
      return records;
    },

    /**
     * オーナーの公開 Gist をデフォルトとして取得（非同期・認証不要）。
     * localStorage に記録が無ければ取得結果を現在記録に反映する。
     * @returns {Promise<boolean>} デフォルトを反映したら true
     */
    async loadDefaults() {
      if (!cfg.OWNER_GIST_ID) return false;
      try {
        const res = await fetch(`https://api.github.com/gists/${cfg.OWNER_GIST_ID}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const g = await res.json();
        const file = g.files && g.files[cfg.GIST_FILENAME];
        defaults = file ? normalize(JSON.parse(file.content)) : {};
      } catch (e) {
        console.warn("[store] オーナー Gist の取得に失敗:", e);
        return false;
      }
      if (!hasLocal) {
        records = clone(defaults);
        return true;
      }
      return false;
    },

    getAll() {
      return records;
    },

    getEntry(id) {
      return records[id] || { history: [], planned: false };
    },

    isAscended(id) {
      return !!(records[id] && records[id].history.length);
    },

    isPlanned(id) {
      const e = records[id];
      return !!(e && e.planned && !e.history.length);
    },

    /** 山の状態を返す: "done" | "planned" | "todo" */
    status(id) {
      const e = records[id];
      if (e && e.history.length) return "done";
      if (e && e.planned) return "planned";
      return "todo";
    },

    /** 計画中フラグの設定。 */
    setPlanned(id, planned) {
      if (planned) {
        const e = records[id] || (records[id] = { history: [], planned: false });
        e.planned = true;
      } else {
        const e = records[id];
        if (!e) return;
        e.planned = false;
        if (!e.history.length) delete records[id];
      }
      persist();
    },

    /** 最新（最も新しい日付）の登頂日を返す。日付不明・未登頂は null。 */
    latestDate(id) {
      const e = records[id];
      if (!e || !e.history.length) return null;
      const dates = e.history.map((h) => h.date).filter(Boolean).sort();
      return dates.length ? dates[dates.length - 1] : null;
    },

    addAscent(id, { date = null, note = "", url = "" } = {}) {
      const entry = records[id] || (records[id] = { history: [] });
      entry.history.push({ date: date || null, note: note || "", url: url || "" });
      persist();
    },

    updateAscent(id, index, { date = null, note = "", url = "" } = {}) {
      const entry = records[id];
      if (!entry || !entry.history[index]) return;
      entry.history[index] = { date: date || null, note: note || "", url: url || "" };
      persist();
    },

    removeAscent(id, index) {
      const entry = records[id];
      if (!entry) return;
      entry.history.splice(index, 1);
      if (!entry.history.length && !entry.planned) delete records[id];
      persist();
    },

    /** 登頂済みトグル。true で日付不明エントリを1件作成、false で全履歴を削除（計画中も解除）。 */
    setAscended(id, ascended) {
      if (ascended) {
        if (!this.isAscended(id)) this.addAscent(id, { date: null, note: "" });
      } else {
        const entry = records[id];
        if (entry) {
          entry.history = [];
          delete records[id];
          persist();
        }
      }
    },

    /** localStorage をクリアし、オーナー Gist のデフォルトへ戻す。 */
    resetToOwner() {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.warn("[store] localStorage クリアに失敗:", e);
      }
      hasLocal = false;
      records = clone(defaults);
    },

    hasLocalData() {
      return hasLocal;
    },

    // ── JSON 入出力 ──
    exportJSON() {
      return JSON.stringify({ app: "hyakumeizan", records }, null, 2);
    },

    importJSON(text) {
      const parsed = JSON.parse(text);
      records = normalize(parsed);
      persist();
      return records;
    },

    // ── GitHub PAT ──
    getToken() {
      try {
        return localStorage.getItem(TOKEN_KEY) || "";
      } catch (e) {
        return "";
      }
    },

    setToken(token) {
      try {
        if (token) localStorage.setItem(TOKEN_KEY, token);
        else localStorage.removeItem(TOKEN_KEY);
      } catch (e) {
        console.warn("[store] トークン保存に失敗:", e);
      }
    },

    // ── Gist 同期（PAT・読み書き） ──
    /** 現在記録を自分の Gist へ保存（無ければ public で作成）。 */
    async pushToGist() {
      const token = this.getToken();
      if (!token) throw new Error("GitHub の Personal Access Token が設定されていません");
      const content = JSON.stringify(records, null, 2);
      const existing = await findOwnGist(token);
      if (existing) {
        const res = await fetch(`https://api.github.com/gists/${existing.id}`, {
          method: "PATCH",
          headers: authHeaders(token),
          body: JSON.stringify({ files: { [cfg.GIST_FILENAME]: { content } } }),
        });
        if (!res.ok) throw new Error(`Gist の更新に失敗しました (HTTP ${res.status})`);
        return { id: existing.id, created: false };
      }
      const res = await fetch("https://api.github.com/gists", {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify({
          description: "日本百名山 登頂記録",
          public: true,
          files: { [cfg.GIST_FILENAME]: { content } },
        }),
      });
      if (!res.ok) throw new Error(`Gist の作成に失敗しました (HTTP ${res.status})`);
      const g = await res.json();
      return { id: g.id, created: true };
    },

    /** 自分の Gist から記録を取得して現在記録を上書き。 */
    async pullFromGist() {
      const token = this.getToken();
      if (!token) throw new Error("GitHub の Personal Access Token が設定されていません");
      const found = await findOwnGist(token);
      if (!found) throw new Error("同期先の Gist が見つかりませんでした");
      const res = await fetch(`https://api.github.com/gists/${found.id}`, {
        headers: authHeaders(token),
      });
      if (!res.ok) throw new Error(`Gist の取得に失敗しました (HTTP ${res.status})`);
      const g = await res.json();
      const file = g.files && g.files[cfg.GIST_FILENAME];
      if (!file) throw new Error("Gist 内に対象ファイルがありません");
      records = normalize(JSON.parse(file.content));
      persist();
      return { id: found.id };
    },
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = { AscentStore };
}
