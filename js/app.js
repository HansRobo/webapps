document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("app-grid");
  const searchInput = document.getElementById("search");
  const topAppBar = document.querySelector(".top-app-bar");
  let apps = [];

  window.addEventListener("scroll", () => {
    topAppBar.classList.toggle("scrolled", window.scrollY > 0);
  }, { passive: true });

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
      grid.innerHTML = emptyState(
        "error",
        "読み込みエラー",
        "manifest.json の読み込みに失敗しました"
      );
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
      grid.innerHTML = emptyState(
        "inbox",
        "ミニアプリ未登録",
        "manifest.json にアプリを追加すると、ここに表示されます"
      );
      return;
    }
    if (list.length === 0) {
      grid.innerHTML = emptyState(
        "search_off",
        "見つかりません",
        "検索条件に一致するアプリがありません"
      );
      return;
    }
    grid.innerHTML = list.map((app, i) => createCard(app, i)).join("");
  }

  function createCard(app, index) {
    const tags = (app.tags || [])
      .map((t) => `<span class="app-card__tag">${escapeHtml(t)}</span>`)
      .join("");
    const delay = index * 60;
    return `
      <a class="app-card" href="${escapeAttr(app.path)}" style="animation-delay: ${delay}ms">
        <div class="app-card__icon-container">${escapeHtml(app.icon || "📱")}</div>
        <div class="app-card__name">${escapeHtml(app.name)}</div>
        <div class="app-card__description">${escapeHtml(app.description)}</div>
        ${tags ? `<div class="app-card__tags">${tags}</div>` : ""}
      </a>`;
  }

  function emptyState(icon, title, body) {
    return `
      <div class="empty-state">
        <div class="empty-state__icon">
          <span class="material-symbols-outlined">${escapeHtml(icon)}</span>
        </div>
        <div class="empty-state__title">${escapeHtml(title)}</div>
        <p class="empty-state__body">${escapeHtml(body)}</p>
      </div>`;
  }

  const escapeEl = document.createElement("div");
  function escapeHtml(str) {
    escapeEl.textContent = str;
    return escapeEl.innerHTML;
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
