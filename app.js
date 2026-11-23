let sites = [];
let routes = {};
let faq = [];

const illustrations = {
  pyramid: `<svg class="premium-svg" viewBox="0 0 80 80" aria-hidden="true"><defs><linearGradient id="pyramidStone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffe98a"/><stop offset=".28" stop-color="#c99343"/><stop offset=".7" stop-color="#83602f"/><stop offset="1" stop-color="#3d3022"/></linearGradient><linearGradient id="pyramidDark" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#8e6637"/><stop offset="1" stop-color="#2b241a"/></linearGradient><filter id="pyramidShadow"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#000" flood-opacity=".7"/></filter></defs><ellipse cx="40" cy="68" rx="31" ry="7" fill="#020403" opacity=".72"/><g filter="url(#pyramidShadow)" class="isometric"><path d="M9 61L38 15l34 46z" fill="url(#pyramidStone)" stroke="#edcf72" stroke-width=".8"/><path d="M38 15l34 46H57z" fill="url(#pyramidDark)" stroke="#7e6038" stroke-width=".6"/><path d="M18 52h39M14 58h48M22 46h31M26 40h23M30 34h15M33 28h9" stroke="#f3d47a" stroke-width="2" opacity=".82"/><path d="M18 52l8 9M22 46l11 15M27 39l14 22M31 32l17 29M35 25l19 36" stroke="#60482c" stroke-width="1" opacity=".58"/><path d="M38 15l19 46" stroke="#3a2c1e" stroke-width="1.4" opacity=".65"/><rect x="34" y="11" width="8" height="5" rx="1" fill="#dba64d" stroke="#ffe48b"/><circle cx="38" cy="13" r="1.2" fill="#fff1a4"/></g><g class="floating-plant"><path d="M12 62c-5-8-2-13 3-16M12 54l-6-5M12 52l7-7" fill="none" stroke="#89a45a" stroke-width="2" stroke-linecap="round"/><circle cx="6" cy="49" r="3" fill="#668844"/><circle cx="18" cy="45" r="3.5" fill="#92a85e"/><path d="M66 61c4-7 2-12-2-15M65 53l6-5" fill="none" stroke="#78964c" stroke-width="2"/></g></svg>`,
  museum: `<svg class="premium-svg" viewBox="0 0 80 80" aria-hidden="true"><defs><linearGradient id="museumStone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f3ddbf"/><stop offset=".55" stop-color="#bd9671"/><stop offset="1" stop-color="#5d4a3b"/></linearGradient><linearGradient id="museumRoof" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#9cae78"/><stop offset=".5" stop-color="#596a48"/><stop offset="1" stop-color="#263229"/></linearGradient><filter id="museumShadow"><feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#000" flood-opacity=".72"/></filter></defs><ellipse cx="40" cy="69" rx="30" ry="6" fill="#020403" opacity=".75"/><g filter="url(#museumShadow)"><path d="M12 31L40 17l28 14-28 13z" fill="#879a63" stroke="#c5c88d" stroke-width=".8"/><path d="M12 31l28 13v8L12 39z" fill="#536245"/><path d="M40 44l28-13v8L40 52z" fill="#303c30"/><path d="M17 38l23 11v20H17z" fill="url(#museumStone)" stroke="#e3c69e" stroke-width=".7"/><path d="M40 49l23-11v31H40z" fill="#725a48" stroke="#9f8264" stroke-width=".7"/><path d="M40 49v31" stroke="#3a3028" stroke-width="1.5"/><path d="M12 31L40 17l28 14" fill="none" stroke="#dce0af" stroke-width="2"/><g fill="#302820" stroke="#b59a74"><rect x="21" y="44" width="5" height="17" rx="2"/><rect x="31" y="49" width="5" height="12" rx="2"/><rect x="45" y="48" width="5" height="13" rx="2"/><rect x="55" y="43" width="5" height="18" rx="2"/></g><path d="M20 63h41" stroke="#28231d" stroke-width="4" stroke-linecap="round"/></g><g class="museum-light"><circle cx="40" cy="39" r="2" fill="#ffd36a"/><circle cx="40" cy="39" r="7" fill="#ffd36a" opacity=".12"/></g></svg>`,
  remedies: `<svg class="premium-svg" viewBox="0 0 80 80" aria-hidden="true"><defs><linearGradient id="churchGold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff0a0"/><stop offset=".35" stop-color="#f2bd50"/><stop offset=".75" stop-color="#bd722e"/><stop offset="1" stop-color="#62391f"/></linearGradient><linearGradient id="churchWall" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffe7a2"/><stop offset="1" stop-color="#b87532"/></linearGradient><filter id="churchShadow"><feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#000" flood-opacity=".75"/></filter></defs><ellipse cx="40" cy="70" rx="34" ry="7" fill="#020403" opacity=".7"/><path d="M7 61c12-16 24-17 36-8 11-9 24-9 30 8z" fill="#3f5033"/><g filter="url(#churchShadow)" class="isometric"><path d="M24 32l16-8 16 8v31H24z" fill="url(#churchWall)" stroke="#ffe49a" stroke-width=".8"/><path d="M40 24l16 8v31H40z" fill="#9d5d2f" opacity=".75"/><path d="M18 34l22-12 22 12-3 8H21z" fill="url(#churchGold)" stroke="#ffdc77" stroke-width="1"/><circle cx="40" cy="21" r="5" fill="#64734a"/><circle cx="40" cy="21" r="2" fill="#f5d66e"/><rect x="37" y="7" width="6" height="12" rx="2" fill="#d99b38"/><path d="M40 4v8M36 8h8" stroke="#ffe5a0" stroke-width="1.4"/><path d="M30 63V50a10 10 0 0 1 20 0v13z" fill="#533722" stroke="#d79a4a" stroke-width="1"/><path d="M40 40v23M30 40h20" stroke="#ffd97a" stroke-width=".7" opacity=".6"/><circle cx="27" cy="44" r="4" fill="#5b6a43"/><circle cx="53" cy="44" r="4" fill="#4d6039"/></g><g class="church-bell"><circle cx="40" cy="21" r="1.2" fill="#fff7bb"/><circle cx="40" cy="21" r="5" fill="none" stroke="#ffe28a" stroke-width=".7" opacity=".45"/></g></svg>`,
  gabriel: `<svg class="premium-svg" viewBox="0 0 80 80" aria-hidden="true"><defs><linearGradient id="conventStone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e5dcb8"/><stop offset=".5" stop-color="#a99e78"/><stop offset="1" stop-color="#4f4b3b"/></linearGradient><linearGradient id="conventRoof" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#7e8060"/><stop offset="1" stop-color="#34372a"/></linearGradient><filter id="conventShadow"><feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#000" flood-opacity=".78"/></filter></defs><ellipse cx="40" cy="69" rx="33" ry="7" fill="#020403" opacity=".74"/><g filter="url(#conventShadow)"><path d="M7 38l33-15 33 15v28H7z" fill="url(#conventStone)" stroke="#ded6ac" stroke-width=".8"/><path d="M7 38l33 15v13H7z" fill="#c1b58f"/><path d="M40 53l33-15v28H40z" fill="#777251"/><path d="M7 38l33-15 33 15-33 15z" fill="url(#conventRoof)" stroke="#b6b184" stroke-width=".8"/><path d="M14 42l26 12v12H14z" fill="#b7ad82" stroke="#706b50" stroke-width=".7"/><path d="M40 54l26-12v24H40z" fill="#777151" stroke="#aaa17a" stroke-width=".7"/><g fill="#463e31" stroke="#d8cda3" stroke-width=".6"><path d="M18 49a5 5 0 0 1 10 0v8H18z"/><path d="M44 51a5 5 0 0 1 10 0v8H44z"/><path d="M58 44a5 5 0 0 1 10 0v8H58z"/></g><path d="M31 66V53a9 9 0 0 1 18 0v13" fill="#44392e" stroke="#d2c18f" stroke-width="1"/><path d="M40 53v13" stroke="#a59a70" stroke-width=".8"/><path d="M12 67h56" stroke="#3c3a2e" stroke-width="4"/></g><g class="convent-spark"><circle cx="49" cy="36" r="1.5" fill="#ffd66f"/><circle cx="49" cy="36" r="6" fill="#ffd66f" opacity=".1"/></g></svg>`,
  guide: `<svg class="premium-svg" viewBox="0 0 80 80" aria-hidden="true"><defs><linearGradient id="guideHat" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffe18a"/><stop offset=".5" stop-color="#d8a64e"/><stop offset="1" stop-color="#7d4931"/></linearGradient><linearGradient id="guideSuit" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#9eb472"/><stop offset=".55" stop-color="#62764d"/><stop offset="1" stop-color="#26372b"/></linearGradient><radialGradient id="guideFace"><stop stop-color="#ffe6bb"/><stop offset=".72" stop-color="#d4a96e"/><stop offset="1" stop-color="#805837"/></radialGradient><filter id="guideShadow"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#000" flood-opacity=".75"/></filter></defs><ellipse cx="40" cy="70" rx="24" ry="5" fill="#020403" opacity=".72"/><g filter="url(#guideShadow)" class="guide-bob"><path d="M22 68c1-16 7-27 18-27s17 11 18 27z" fill="url(#guideSuit)" stroke="#bdd08a" stroke-width="1"/><path d="M33 43h14l4 16H29z" fill="#d9c47c"/><circle cx="40" cy="31" r="16" fill="url(#guideFace)" stroke="#efcf91" stroke-width="1"/><path d="M25 28c2-13 10-18 20-15 7 2 10 8 10 14-10-5-20-4-30 1z" fill="#3b3228"/><path d="M20 27c10-8 30-9 40 0-12 7-29 7-40 0z" fill="url(#guideHat)" stroke="#f0ca72" stroke-width="1"/><path d="M27 20c7-9 20-10 27-1-9-2-18-2-27 1z" fill="#d9ae55"/><circle cx="34" cy="32" r="1.7" fill="#20231f"/><circle cx="46" cy="32" r="1.7" fill="#20231f"/><path d="M36 39c3 2 6 2 9 0" fill="none" stroke="#735038" stroke-width="1.5" stroke-linecap="round"/><rect x="32" y="50" width="16" height="10" rx="5" fill="#1e3025" stroke="#8aa36a"/><circle cx="40" cy="55" r="2.4" fill="#f5cf6d"/><path d="M25 60l-7 5M55 60l7 5" stroke="#78915b" stroke-width="4" stroke-linecap="round"/></g><g class="guide-spark"><circle cx="61" cy="18" r="1.5" fill="#fff0a4"/><circle cx="61" cy="18" r="6" fill="#f9d36e" opacity=".12"/></g></svg>`
};

async function loadData() {
  try {
    const response = await fetch("data/sites.json");
    if (!response.ok) throw new Error("No se pudo cargar el catálogo");
    const data = await response.json();
    sites = data.sites;
    routes = data.routes;
    faq = data.faq;
  } catch (error) {
    console.error(error);
  }
  if (!sites.length) return;
  renderMap();
  renderSiteList();
  renderHelp();
  const guideAvatar = document.querySelector(".guide-avatar");
  if (guideAvatar) guideAvatar.innerHTML = illustrations.guide;
  const initialMessageAvatar = document.querySelector(".message-avatar");
  if (initialMessageAvatar) initialMessageAvatar.innerHTML = illustrations.guide;
}

function renderMap() {
  const map = document.getElementById("route-map");
  map.innerHTML = '<div class="route-line"></div>' + sites.map(site => `
    <button class="route-node" data-id="${site.id}" style="--node:${site.accent}" aria-label="Ver ${site.name}">
      ${illustrations[site.id === "zona-arqueologica" ? "pyramid" : site.id === "museo-sitio" ? "museum" : site.id === "iglesia-remedios" ? "remedies" : "gabriel"]}
      <span class="node-label">${site.shortName}</span>
    </button>
  `).join("");

  map.querySelectorAll(".route-node").forEach(button => {
    button.addEventListener("click", () => {
      switchView("qr-view");
      openSite(button.dataset.id);
    });
  });
}

function switchView(viewId) {
  document.querySelectorAll(".view").forEach(view => view.classList.toggle("active", view.id === viewId));
  document.querySelectorAll(".nav-item").forEach(item => {
    const active = item.dataset.view === viewId;
    item.classList.toggle("active", active);
    if (active) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".nav-item").forEach(button => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

document.querySelectorAll(".route-chip").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".route-chip").forEach(chip => {
      chip.classList.remove("active");
      chip.setAttribute("aria-selected", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    const route = routes[button.dataset.route];
    document.getElementById("route-distance").textContent = route.distance;
    document.getElementById("route-time").textContent = route.time;
    document.getElementById("route-description").textContent = route.summary;
  });
});

function renderSiteList() {
  document.getElementById("site-list").innerHTML = sites.map(site => `
    <button class="site-option" data-id="${site.id}" style="--site-color:${site.accent}">
      <span class="site-badge">${illustrations[site.id === "zona-arqueologica" ? "pyramid" : site.id === "museo-sitio" ? "museum" : site.id === "iglesia-remedios" ? "remedies" : "gabriel"]}</span>
      <span>
        <strong>${site.shortName}</strong>
        <small>${site.type} · ${site.walkTime ? `${site.walkTime} min` : "Inicio"}</small>
      </span>
    </button>
  `).join("");

  document.querySelectorAll(".site-option").forEach(button => {
    button.addEventListener("click", () => openSite(button.dataset.id));
  });
}

function openSite(id) {
  const site = sites.find(item => item.id === id);
  if (!site) return;

  document.querySelectorAll(".site-option").forEach(option => {
    option.classList.toggle("active", option.dataset.id === id);
  });

  document.getElementById("site-detail").innerHTML = `
    <article class="detail-card">
      <div class="detail-head">
        <span class="site-badge" style="background:${site.accent}">${illustrations[site.id === "zona-arqueologica" ? "pyramid" : site.id === "museo-sitio" ? "museum" : site.id === "iglesia-remedios" ? "remedies" : "gabriel"]}</span>
        <div>
          <h3>${site.name}</h3>
          <p>${site.type} · ${site.distance}</p>
        </div>
      </div>
      <div class="detail-layer">
        <span class="layer-number">1</span>
        <div><h4>Resumen rápido</h4><p>${site.summary}</p></div>
      </div>
      <div class="detail-layer">
        <span class="layer-number">2</span>
        <div><h4>Dato clave del espacio</h4><p>${site.keyFact}</p></div>
      </div>
      <div class="detail-layer">
        <span class="layer-number">3</span>
        <div><h4>Tip de orientación</h4><p>${site.orientation}</p></div>
      </div>
      <div class="detail-status"><span></span>Disponible sin conexión · contenido en caché</div>
    </article>
  `;
  document.getElementById("site-detail").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

const helpIcons = ["◷", "⌖", "☀", "↗"];
function renderHelp() {
  document.getElementById("help-grid").innerHTML = faq.map((item, index) => `
    <button class="help-button" data-index="${index}">
      <span>${helpIcons[index]}</span>
      <strong>${item.question}</strong>
    </button>
  `).join("");

  document.querySelectorAll(".help-button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".help-button").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      const item = faq[Number(button.dataset.index)];
      addMessage(item.question, "user");
      setTimeout(() => addMessage(item.answer, "guide"), 220);
      document.getElementById("reset-chat").hidden = false;
    });
  });
}

function addMessage(text, type) {
  const messages = document.getElementById("chat-messages");
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.innerHTML = type === "guide"
    ? `<span class="message-avatar">${illustrations.guide}</span><p>${text}</p>`
    : `<p>${text}</p>`;
  messages.appendChild(message);
  message.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

document.getElementById("reset-chat").addEventListener("click", () => {
  document.getElementById("chat-messages").innerHTML = `
    <div class="message guide"><span class="message-avatar">${illustrations.guide}</span><p>¿Qué te gustaría resolver?</p></div>
  `;
  document.querySelectorAll(".help-button").forEach(item => item.classList.remove("active"));
  document.getElementById("reset-chat").hidden = true;
});

document.getElementById("offline-button").addEventListener("click", event => {
  event.currentTarget.innerHTML = "<span></span> Caché activo";
});

document.getElementById("chat-form").addEventListener("submit", event => {
  event.preventDefault();
  const input = document.getElementById("chat-text");
  const question = input.value.trim();
  if (!question) return;
  addMessage(question, "user");
  input.value = "";

  const lower = question.toLowerCase();
  let answer = "Te recomiendo iniciar por la zona arqueológica y seguir hacia el santuario antes del mediodía.";
  if (lower.includes("2") || lower.includes("hora") || lower.includes("tiempo")) {
    answer = faq[0].answer;
  } else if (lower.includes("caminar") || lower.includes("mover") || lower.includes("llegar")) {
    answer = faq[1].answer;
  } else if (lower.includes("sombra") || lower.includes("calor")) {
    answer = faq[2].answer;
  }
  setTimeout(() => addMessage(answer, "guide"), 220);
  document.getElementById("reset-chat").hidden = false;
});

loadData();
