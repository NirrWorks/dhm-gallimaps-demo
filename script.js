const stations = {
  kalimati: {
    name: "Kalimati Station",
    lat: 27.7017,
    lng: 85.3039,
    status: "Heavy rainfall warning",
    rain: "82 mm",
    risk: "Warning",
    raining: true,
    detail: "Rain lens is active because the selected station is above warning threshold. Hazard overlays and evacuation route analysis are available."
  },
  balaju: {
    name: "Balaju Station",
    lat: 27.7351,
    lng: 85.3005,
    status: "Rain watch",
    rain: "48 mm",
    risk: "Watch",
    raining: true,
    detail: "Rainfall is below danger level but above watch threshold. Drainage pressure is increasing near road underpasses."
  },
  patan: {
    name: "Patan Station",
    lat: 27.6766,
    lng: 85.3166,
    status: "Light rain",
    rain: "21 mm",
    risk: "Normal",
    raining: true,
    detail: "Light rain continues. Public app can keep the weather pill active without triggering evacuation warnings."
  },
  kirtipur: {
    name: "Kirtipur Station",
    lat: 27.6788,
    lng: 85.2774,
    status: "No active rain",
    rain: "7 mm",
    risk: "Clear",
    raining: false,
    detail: "Rain lens is disabled because this station is below active rainfall threshold."
  }
};

const GALLIMAPS_ACCESS_KEY = "6a400678-745c-449e-ab31-84cf6e3f0418";
const TILE_SIZE = 256;
const TILE_URL = "https://map-init.gallimap.com/styles/light/{z}/{x}/{y}.png";

const shell = document.querySelector(".demo-shell");
const mapCanvas = document.querySelector("#mapCanvas");
const tilePane = document.querySelector("#tilePane");
const stationButtons = document.querySelectorAll(".station");
const layerButtons = document.querySelectorAll(".layer");
const modeButtons = document.querySelectorAll(".mode");
const phoneCards = document.querySelectorAll(".phone-card");
const phoneTabs = document.querySelectorAll("[data-phone-tab]");
const weatherPill = document.querySelector("#weatherPill");
const weatherCard = document.querySelector("#weatherCard");
const closeWeather = document.querySelector("#closeWeather");
const dockToggle = document.querySelector("#dockToggle");
const publicDock = document.querySelector("#publicDock");
const rainToggle = document.querySelector("#rainToggle");
const routeToggle = document.querySelector("#routeToggle");
const evacRoute = document.querySelector("#evacRoute");

const mapState = {
  centerLat: 27.7045,
  centerLng: 85.3052,
  z: 15,
  dragging: false,
  startX: 0,
  startY: 0,
  originCenter: null
};

let activeStation = "kalimati";
let rainOverride = null;
let routeActive = false;
const activeLayers = new Set(["rain", "flood", "landslide", "fire", "earthquake", "shelter"]);

const routePath = [
  { lat: 27.7017, lng: 85.3039 },
  { lat: 27.7072, lng: 85.3169 }
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function latLngToPixel(lat, lng, z) {
  const sinLat = Math.sin(lat * Math.PI / 180);
  const scale = TILE_SIZE * 2 ** z;
  return {
    x: (lng + 180) / 360 * scale,
    y: (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale
  };
}

function pixelToLatLng(x, y, z) {
  const scale = TILE_SIZE * 2 ** z;
  const lng = x / scale * 360 - 180;
  const n = Math.PI - 2 * Math.PI * y / scale;
  const lat = 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  return { lat, lng };
}

function tileUrl(z, x, y) {
  return TILE_URL.replace("{z}", z).replace("{x}", x).replace("{y}", y);
}

function currentCenterPixel() {
  return latLngToPixel(mapState.centerLat, mapState.centerLng, mapState.z);
}

function setCenterFromPixel(pixel) {
  const center = pixelToLatLng(pixel.x, pixel.y, mapState.z);
  mapState.centerLat = clamp(center.lat, -85, 85);
  mapState.centerLng = center.lng;
}

function getTopLeft(rect) {
  const center = currentCenterPixel();
  return {
    x: center.x - rect.width / 2,
    y: center.y - rect.height / 2
  };
}

function placeElement(element, lat, lng, topLeft) {
  const point = latLngToPixel(lat, lng, mapState.z);
  element.style.left = `${point.x - topLeft.x}px`;
  element.style.top = `${point.y - topLeft.y}px`;
}

function renderTiles(rect, topLeft) {
  const maxTile = 2 ** mapState.z;
  const startX = Math.floor(topLeft.x / TILE_SIZE) - 1;
  const endX = Math.floor((topLeft.x + rect.width) / TILE_SIZE) + 1;
  const startY = Math.floor(topLeft.y / TILE_SIZE) - 1;
  const endY = Math.floor((topLeft.y + rect.height) / TILE_SIZE) + 1;
  const fragment = document.createDocumentFragment();

  for (let x = startX; x <= endX; x += 1) {
    for (let y = startY; y <= endY; y += 1) {
      if (y < 0 || y >= maxTile) {
        continue;
      }
      const wrappedX = ((x % maxTile) + maxTile) % maxTile;
      const tile = document.createElement("img");
      tile.className = "map-tile";
      tile.alt = "";
      tile.draggable = false;
      tile.src = tileUrl(mapState.z, wrappedX, y);
      tile.style.left = `${Math.round(x * TILE_SIZE - topLeft.x)}px`;
      tile.style.top = `${Math.round(y * TILE_SIZE - topLeft.y)}px`;
      fragment.appendChild(tile);
    }
  }

  tilePane.replaceChildren(fragment);
}

function renderRoute(topLeft) {
  const start = latLngToPixel(routePath[0].lat, routePath[0].lng, mapState.z);
  const end = latLngToPixel(routePath[1].lat, routePath[1].lng, mapState.z);
  const x1 = start.x - topLeft.x;
  const y1 = start.y - topLeft.y;
  const x2 = end.x - topLeft.x;
  const y2 = end.y - topLeft.y;
  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  evacRoute.style.left = `${x1}px`;
  evacRoute.style.top = `${y1}px`;
  evacRoute.style.width = `${length}px`;
  evacRoute.style.transform = `rotate(${angle}deg)`;
}

function renderOverlays(topLeft) {
  stationButtons.forEach((button) => {
    const station = stations[button.dataset.station];
    placeElement(button, station.lat, station.lng, topLeft);
  });

  document.querySelectorAll("[data-lat][data-lng]").forEach((element) => {
    placeElement(element, Number(element.dataset.lat), Number(element.dataset.lng), topLeft);
  });

  const active = stations[activeStation];
  placeElement(document.querySelector(".pulse-ring"), active.lat, active.lng, topLeft);
  renderRoute(topLeft);
}

function renderMap() {
  const rect = mapCanvas.getBoundingClientRect();
  const topLeft = getTopLeft(rect);
  renderTiles(rect, topLeft);
  renderOverlays(topLeft);
}

function screenToLatLng(clientX, clientY, z = mapState.z) {
  const rect = mapCanvas.getBoundingClientRect();
  const center = latLngToPixel(mapState.centerLat, mapState.centerLng, z);
  const topLeft = {
    x: center.x - rect.width / 2,
    y: center.y - rect.height / 2
  };
  return pixelToLatLng(topLeft.x + clientX - rect.left, topLeft.y + clientY - rect.top, z);
}

function zoomMap(delta, anchorX, anchorY) {
  const oldZ = mapState.z;
  const nextZ = clamp(oldZ + delta, 11, 18);
  if (nextZ === oldZ) {
    return;
  }

  const rect = mapCanvas.getBoundingClientRect();
  const x = anchorX ?? rect.left + rect.width / 2;
  const y = anchorY ?? rect.top + rect.height / 2;
  const anchorLatLng = screenToLatLng(x, y, oldZ);
  mapState.z = nextZ;

  const anchorPixel = latLngToPixel(anchorLatLng.lat, anchorLatLng.lng, nextZ);
  setCenterFromPixel({
    x: anchorPixel.x - (x - rect.left - rect.width / 2),
    y: anchorPixel.y - (y - rect.top - rect.height / 2)
  });
  renderMap();
}

function resetMapView() {
  mapState.centerLat = 27.7045;
  mapState.centerLng = 85.3052;
  mapState.z = 15;
  renderMap();
}

function focusActiveStation() {
  const station = stations[activeStation];
  mapState.centerLat = station.lat;
  mapState.centerLng = station.lng;
  mapState.z = Math.max(mapState.z, 15);
  renderMap();
}

function setStation(id) {
  activeStation = id;
  const station = stations[id];
  document.querySelector("#stationName").textContent = station.name;
  document.querySelector("#stationStatus").textContent = station.status;
  document.querySelector("#stationDetail").textContent = station.detail;
  document.querySelector("#rainMetric").textContent = station.rain;
  document.querySelector("#stationHealth").textContent = station.risk;

  stationButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.station === id);
  });

  const raining = rainOverride ?? station.raining;
  rainToggle.textContent = raining ? "Rain lens on" : "Rain lens off";
  rainToggle.classList.toggle("primary", raining);
  setLayerVisibility();
}

function setLayerVisibility() {
  const station = stations[activeStation];
  const raining = activeLayers.has("rain") && (rainOverride ?? station.raining);
  shell.dataset.rain = String(raining);

  layerButtons.forEach((button) => {
    button.classList.toggle("active", activeLayers.has(button.dataset.layer));
  });

  document.querySelectorAll("[data-hazard]").forEach((element) => {
    element.hidden = !activeLayers.has(element.dataset.hazard);
  });

  document.querySelector(".zone-flood").hidden = !activeLayers.has("flood");
  document.querySelector(".zone-landslide").hidden = !activeLayers.has("landslide");
  stationButtons.forEach((button) => {
    button.hidden = !activeLayers.has("rain");
  });

  evacRoute.classList.toggle("active", routeActive);
}

stationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    rainOverride = null;
    setStation(button.dataset.station);
    focusActiveStation();
  });
});

layerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const layer = button.dataset.layer;
    if (activeLayers.has(layer)) {
      activeLayers.delete(layer);
    } else {
      activeLayers.add(layer);
    }
    setLayerVisibility();
  });
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((mode) => mode.classList.remove("active"));
    button.classList.add("active");
    if (button.dataset.mode === "public") {
      publicDock.classList.remove("collapsed");
      dockToggle.textContent = "Hide";
      dockToggle.setAttribute("aria-expanded", "true");
    }
  });
});

phoneTabs.forEach((button) => {
  button.addEventListener("click", () => {
    const index = button.dataset.phoneTab;
    phoneTabs.forEach((tab) => tab.classList.toggle("active", tab === button));
    phoneCards.forEach((card) => card.classList.toggle("active", card.dataset.phone === index));
  });
});

rainToggle.addEventListener("click", () => {
  const current = shell.dataset.rain === "true";
  rainOverride = !current;
  setStation(activeStation);
});

routeToggle.addEventListener("click", () => {
  routeActive = !routeActive;
  routeToggle.classList.toggle("primary", routeActive);
  routeToggle.textContent = routeActive ? "Route active" : "Evac route";
  setLayerVisibility();

  if (routeActive) {
    console.info("Mock evacuation route authorized with Gallimaps key ending:", GALLIMAPS_ACCESS_KEY.slice(-4));
  }
});

weatherPill.addEventListener("click", () => {
  const open = !weatherCard.classList.contains("open");
  weatherCard.classList.toggle("open", open);
  weatherPill.setAttribute("aria-expanded", String(open));
});

closeWeather.addEventListener("click", () => {
  weatherCard.classList.remove("open");
  weatherPill.setAttribute("aria-expanded", "false");
});

dockToggle.addEventListener("click", () => {
  const collapsed = !publicDock.classList.contains("collapsed");
  publicDock.classList.toggle("collapsed", collapsed);
  dockToggle.textContent = collapsed ? "Show" : "Hide";
  dockToggle.setAttribute("aria-expanded", String(!collapsed));
});

document.querySelectorAll(".time-step").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".time-step").forEach((step) => step.classList.remove("active"));
    button.classList.add("active");
  });
});

mapCanvas.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button, input, .topbar, .left-rail, .hazard-panel, .public-dock, .bottom-console, .map-tools, .weather-pill, .weather-card")) {
    return;
  }
  mapState.dragging = true;
  mapState.startX = event.clientX;
  mapState.startY = event.clientY;
  mapState.originCenter = currentCenterPixel();
  mapCanvas.classList.add("is-dragging");
  mapCanvas.setPointerCapture(event.pointerId);
});

mapCanvas.addEventListener("pointermove", (event) => {
  if (!mapState.dragging) {
    return;
  }
  setCenterFromPixel({
    x: mapState.originCenter.x - (event.clientX - mapState.startX),
    y: mapState.originCenter.y - (event.clientY - mapState.startY)
  });
  renderMap();
});

mapCanvas.addEventListener("pointerup", (event) => {
  mapState.dragging = false;
  mapCanvas.classList.remove("is-dragging");
  if (mapCanvas.hasPointerCapture(event.pointerId)) {
    mapCanvas.releasePointerCapture(event.pointerId);
  }
});

mapCanvas.addEventListener("wheel", (event) => {
  event.preventDefault();
  zoomMap(event.deltaY > 0 ? -1 : 1, event.clientX, event.clientY);
}, { passive: false });

document.querySelector("#zoomIn").addEventListener("click", () => zoomMap(1));
document.querySelector("#zoomOut").addEventListener("click", () => zoomMap(-1));
document.querySelector("#locateMap").addEventListener("click", focusActiveStation);
document.querySelector("#resetMap").addEventListener("click", resetMapView);
window.addEventListener("resize", renderMap);

setStation(activeStation);
setLayerVisibility();
renderMap();
