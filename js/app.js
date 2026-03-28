document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("app-grid");
  const searchInput = document.getElementById("search");
  let apps = [];

  fetch("manifest.json")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      apps = data.apps || [];
      render(apps);
    })
    .catch(() => {
      grid.innerHTML =
        '<div class="empty-state"><div class="icon">⚠️</div><p>manifest.json の読み込みに失敗しました</p></div>';
    });

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = apps.filter(
      (app) =>
        app.name.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query) ||
        (app.tags || []).some((t) => t.toLowerCase().includes(query))
    );
    render(filtered);
  });

  function render(list) {
    if (list.length === 0 && apps.length === 0) {
      grid.innerHTML =
        '<div class="empty-state"><div class="icon">📦</div><p>ミニアプリはまだ登録されていません</p></div>';
      return;
    }
    if (list.length === 0) {
      grid.innerHTML =
        '<div class="empty-state"><div class="icon">🔍</div><p>一致するアプリが見つかりません</p></div>';
      return;
    }
    grid.innerHTML = list.map((app) => createCard(app)).join("");
  }

  function createCard(app) {
    const tags = (app.tags || [])
      .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
      .join("");
    return `
      <a class="app-card" href="${escapeAttr(app.path)}">
        <div class="icon">${escapeHtml(app.icon || "📱")}</div>
        <div class="name">${escapeHtml(app.name)}</div>
        <div class="description">${escapeHtml(app.description)}</div>
        ${tags ? `<div class="tags">${tags}</div>` : ""}
      </a>`;
  }

  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  function escapeAttr(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
});
