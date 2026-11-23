let sites = [];
let routes = {};
let faq = [];

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
}

function renderMap() {
  const map = document.getElementById("route-map");
  map.innerHTML = '<div class="route-line"></div>' + sites.map(site => `
    <button class="route-node" data-id="${site.id}" style="--node:${site.accent}" aria-label="Ver ${site.name}">
      ${site.number}
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
      <span class="site-badge">${site.icon}</span>
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
        <span class="site-badge" style="background:${site.accent}">${site.icon}</span>
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
    ? `<span class="message-avatar">CG</span><p>${text}</p>`
    : `<p>${text}</p>`;
  messages.appendChild(message);
  message.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

document.getElementById("reset-chat").addEventListener("click", () => {
  document.getElementById("chat-messages").innerHTML = `
    <div class="message guide"><span class="message-avatar">CG</span><p>¿Qué te gustaría resolver?</p></div>
  `;
  document.querySelectorAll(".help-button").forEach(item => item.classList.remove("active"));
  document.getElementById("reset-chat").hidden = true;
});

document.getElementById("offline-button").addEventListener("click", event => {
  event.currentTarget.innerHTML = "<span></span> Caché activo";
});

loadData();
