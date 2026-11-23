let sites = [];
let routes = {};
let faq = [];

const illustrations = {
  pyramid: `<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="py" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d9b04e"/><stop offset="1" stop-color="#9b6538"/></linearGradient></defs><ellipse cx="32" cy="54" rx="25" ry="5" fill="#55613e" opacity=".25"/><path d="M8 48L30 19l26 29z" fill="url(#py)" stroke="#775132" stroke-width="1.5"/><path d="M30 19l7-7 19 36H56z" fill="#ba8743" opacity=".75"/><path d="M18 40h29M14 46h38M22 34h20M25 29h14" stroke="#81603a" stroke-width="2"/><path d="M31 20l4 28" stroke="#e4c56e" stroke-width="1"/><circle cx="12" cy="47" r="4" fill="#66734b"/><circle cx="54" cy="47" r="5" fill="#66734b"/></svg>`,
  museum: `<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="mu" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#d9bda2"/><stop offset="1" stop-color="#9e7760"/></linearGradient></defs><ellipse cx="32" cy="54" rx="25" ry="5" fill="#55613e" opacity=".2"/><path d="M8 25h48L32 10z" fill="#65704d" stroke="#4a553b" stroke-width="1.5"/><rect x="13" y="25" width="38" height="25" rx="2" fill="url(#mu)" stroke="#72584b" stroke-width="1.5"/><path d="M20 31v19M32 31v19M44 31v19" stroke="#6d5848" stroke-width="3"/><path d="M11 50h42" stroke="#4d5940" stroke-width="4"/></svg>`,
  remedies: `<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="re" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ffd55f"/><stop offset="1" stop-color="#df9d32"/></linearGradient></defs><ellipse cx="32" cy="55" rx="27" ry="5" fill="#66734b" opacity=".25"/><path d="M9 43h46l-7-11H16z" fill="#7c8358"/><rect x="17" y="27" width="30" height="20" rx="2" fill="url(#re)" stroke="#a56732" stroke-width="1.5"/><path d="M32 27V16M27 22h10M29 16h6" stroke="#9f6632" stroke-width="2"/><circle cx="32" cy="20" r="4" fill="#63724f"/><path d="M25 47V35a7 7 0 0 1 14 0v12" fill="#6d4b35"/><circle cx="20" cy="29" r="5" fill="#5a6e49"/><circle cx="44" cy="29" r="5" fill="#5a6e49"/></svg>`,
  gabriel: `<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ded8bd"/><stop offset="1" stop-color="#ada27f"/></linearGradient></defs><ellipse cx="32" cy="55" rx="27" ry="5" fill="#55613e" opacity=".2"/><rect x="8" y="24" width="48" height="27" rx="3" fill="url(#ga)" stroke="#7d795f" stroke-width="1.5"/><path d="M8 24l24-12 24 12z" fill="#77805b" stroke="#60694c" stroke-width="1.5"/><path d="M27 51V38a5 5 0 0 1 10 0v13" fill="#7c6c56"/><path d="M14 31v9M22 31v9M42 31v9M50 31v9" stroke="#d8cfaa" stroke-width="3"/><path d="M13 51h38" stroke="#6d6a50" stroke-width="3"/></svg>`,
  guide: `<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="gHat" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f3bf55"/><stop offset="1" stop-color="#bd7047"/></linearGradient></defs><ellipse cx="32" cy="57" rx="20" ry="4" fill="#59654a" opacity=".18"/><path d="M16 42c0-11 7-18 16-18s16 7 16 18v9H16z" fill="#6f8054" stroke="#4c5b40" stroke-width="2"/><circle cx="32" cy="32" r="12" fill="#f1d2a2" stroke="#9b744f" stroke-width="1.5"/><path d="M18 27c2-11 9-15 18-14 7 1 11 6 12 12-10-4-20-3-30 2z" fill="url(#gHat)" stroke="#925c3e"/><path d="M10 28c11-6 34-6 44 0-10 6-34 6-44 0z" fill="#d09a43" stroke="#925c3e"/><circle cx="27" cy="33" r="1.5" fill="#4a3d31"/><circle cx="37" cy="33" r="1.5" fill="#4a3d31"/><path d="M28 38c3 2 6 2 9 0" fill="none" stroke="#9b744f" stroke-width="1.5"/><rect x="23" y="43" width="18" height="8" rx="4" fill="#d2ba79"/><path d="M27 47h10" stroke="#fff0b2"/></svg>`
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
