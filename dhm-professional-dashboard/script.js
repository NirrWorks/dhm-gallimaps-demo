const ACCESS_TOKEN = "6a400678-745c-449e-ab31-84cf6e3f0418";
const API_BASE = "https://route-init.gallimap.com/api/v1";
const ROUTE_API = `${API_BASE}/routing`;
const TILE = 256;
const TILE_URL = "https://map-init.gallimap.com/styles/light/{z}/{x}/{y}.png";

const stations = {
  bhaktapur: { name: "Bhaktapur Station", lat: 27.6716, lng: 85.4256, rainMm: 82, air: "Moderate", status: "Heavy rain", detail: "Heavy rain is falling. Avoid low roads near the river." },
  nepalgunj: { name: "Nepalgunj Station", lat: 28.05, lng: 81.62, rainMm: 67, air: "Poor", status: "Heavy rain", detail: "Heavy rain is likely to create waterlogging in low areas." },
  pokhara: { name: "Pokhara Station", lat: 28.2096, lng: 83.9856, rainMm: 43, air: "Good", status: "Rain watch", detail: "Steady rain. Watch small streams and steep slopes." },
  janakpur: { name: "Janakpur Station", lat: 26.7288, lng: 85.9263, rainMm: 24, air: "Moderate", status: "Light rain", detail: "Light rain. Roads are mostly open." },
  biratnagar: { name: "Biratnagar Station", lat: 26.4525, lng: 87.2718, rainMm: 19, air: "Moderate", status: "Light rain", detail: "Light drizzle. No major warning." },
  jumla: { name: "Jumla Station", lat: 29.2747, lng: 82.1838, rainMm: 5, air: "Good", status: "No rain", detail: "No active rain lens for this station." },
  dadeldhura: { name: "Dadeldhura Station", lat: 29.2984, lng: 80.5806, rainMm: 38, air: "Good", status: "Rain watch", detail: "Moderate rain in far west hills." },
  kirtipur: { name: "Kirtipur Station", lat: 27.6788, lng: 85.2774, rainMm: 7, air: "Moderate", status: "No active rain", detail: "Rain is below the active lens level." },
  dharan: { name: "Dharan Station", lat: 26.8125, lng: 87.2835, rainMm: 28, air: "Good", status: "Light rain", detail: "Light rain in eastern hills." },
  simara: { name: "Simara Station", lat: 27.1595, lng: 84.9801, rainMm: 56, air: "Moderate", status: "Heavy rain", detail: "Heavy rain near highway corridor." },
  dhangadhi: { name: "Dhangadhi Station", lat: 28.7056, lng: 80.5754, rainMm: 74, air: "Moderate", status: "Heavy rain", detail: "Heavy rain in far west. Watch low roads and drains." },
  butwal: { name: "Butwal Station", lat: 27.7006, lng: 83.4484, rainMm: 62, air: "Moderate", status: "Heavy rain", detail: "Heavy rain near Tinau corridor. Avoid flooded underpasses." },
  chitwan: { name: "Chitwan Station", lat: 27.5291, lng: 84.3542, rainMm: 71, air: "Good", status: "Heavy rain", detail: "Heavy rain near Narayani lowlands. Keep evacuation route ready." },
  ilam: { name: "Ilam Station", lat: 26.9116, lng: 87.9237, rainMm: 52, air: "Good", status: "Heavy rain", detail: "Heavy rain in eastern hills. Landslide watch on steep roads." },
  hetauda: { name: "Hetauda Station", lat: 27.4284, lng: 85.0322, rainMm: 48, air: "Moderate", status: "Rain watch", detail: "Rain watch near Rapti corridor. Drive carefully." },
  taplejung: { name: "Taplejung Station", lat: 27.3546, lng: 87.6698, rainMm: 35, air: "Good", status: "Rain watch", detail: "Moderate rain in mountain roads. Watch slope movement." }
};

const cityWeather = {
  kathmandu: { name: "Kathmandu", lat: 27.7172, lng: 85.324, temp: 24, aqi: 82, air: "Moderate", condition: "Partly cloudy", rainMm: 18, forecast: [["Now", "24 C", "Cloudy"], ["3 PM", "25 C", "Light rain"], ["6 PM", "23 C", "Rain"], ["9 PM", "21 C", "Cloudy"], ["12 AM", "20 C", "Cloudy"]] },
  pokhara: { name: "Pokhara", lat: 28.2096, lng: 83.9856, temp: 26, aqi: 48, air: "Good", condition: "Cloudy", rainMm: 43, forecast: [["Now", "26 C", "Cloudy"], ["3 PM", "25 C", "Rain"], ["6 PM", "24 C", "Rain"], ["9 PM", "22 C", "Cloudy"], ["12 AM", "21 C", "Light rain"]] },
  biratnagar: { name: "Biratnagar", lat: 26.4525, lng: 87.2718, temp: 27, aqi: 94, air: "Moderate", condition: "Humid", rainMm: 19, forecast: [["Now", "27 C", "Humid"], ["3 PM", "28 C", "Cloudy"], ["6 PM", "27 C", "Drizzle"], ["9 PM", "25 C", "Cloudy"], ["12 AM", "24 C", "Cloudy"]] },
  nepalgunj: { name: "Nepalgunj", lat: 28.05, lng: 81.62, temp: 31, aqi: 128, air: "Poor", condition: "Hot", rainMm: 67, forecast: [["Now", "31 C", "Hot"], ["3 PM", "32 C", "Storm"], ["6 PM", "29 C", "Heavy rain"], ["9 PM", "27 C", "Rain"], ["12 AM", "26 C", "Cloudy"]] },
  dhangadhi: { name: "Dhangadhi", lat: 28.7056, lng: 80.5754, temp: 30, aqi: 118, air: "Poor", condition: "Heavy rain", rainMm: 74, forecast: [["Now", "30 C", "Rain"], ["3 PM", "29 C", "Heavy rain"], ["6 PM", "27 C", "Rain"], ["9 PM", "26 C", "Cloudy"], ["12 AM", "25 C", "Cloudy"]] },
  janakpur: { name: "Janakpur", lat: 26.7288, lng: 85.9263, temp: 29, aqi: 102, air: "Moderate", condition: "Warm", rainMm: 24, forecast: [["Now", "29 C", "Warm"], ["3 PM", "30 C", "Cloudy"], ["6 PM", "28 C", "Light rain"], ["9 PM", "26 C", "Cloudy"], ["12 AM", "25 C", "Cloudy"]] },
  butwal: { name: "Butwal", lat: 27.7006, lng: 83.4484, temp: 28, aqi: 88, air: "Moderate", condition: "Rain", rainMm: 62, forecast: [["Now", "28 C", "Rain"], ["3 PM", "27 C", "Heavy rain"], ["6 PM", "26 C", "Rain"], ["9 PM", "24 C", "Cloudy"], ["12 AM", "23 C", "Cloudy"]] },
  dharan: { name: "Dharan", lat: 26.8125, lng: 87.2835, temp: 25, aqi: 57, air: "Good", condition: "Cloudy", rainMm: 28, forecast: [["Now", "25 C", "Cloudy"], ["3 PM", "25 C", "Light rain"], ["6 PM", "23 C", "Cloudy"], ["9 PM", "22 C", "Cloudy"], ["12 AM", "21 C", "Fog"]] }
};

const stationToCity = {
  bhaktapur: "kathmandu",
  nepalgunj: "nepalgunj",
  pokhara: "pokhara",
  janakpur: "janakpur",
  biratnagar: "biratnagar",
  dharan: "dharan",
  dhangadhi: "dhangadhi",
  butwal: "butwal",
  chitwan: "butwal",
  simara: "janakpur",
  hetauda: "kathmandu",
  kirtipur: "kathmandu",
  dadeldhura: "dhangadhi",
  ilam: "dharan",
  taplejung: "dharan",
  jumla: "nepalgunj"
};

const hazards = {
  flood: {
    title: "Flood",
    lat: 27.6716,
    lng: 85.4256,
    status: "Hanumante Khola red alert",
    detail: "Hanumante Khola is likely under flood risk. Avoid river roads and move to higher ground if water rises.",
    risk: "Red",
    rainText: "River",
    rainValue: "High",
    air: "Normal"
  },
  landslide: {
    title: "Landslide",
    lat: 28.2096,
    lng: 83.9856,
    status: "Landslide watch",
    detail: "Slope is wet after rain. Avoid steep road sections and check road blocks before travel.",
    risk: "Watch",
    rainText: "Slope",
    rainValue: "Wet",
    air: "Normal"
  },
  fire: {
    title: "Forest fire",
    lat: 27.1595,
    lng: 84.9801,
    status: "Smoke nearby",
    detail: "Smoke may affect breathing. Avoid outdoor activity if sensitive.",
    risk: "Medium",
    rainText: "Smoke",
    rainValue: "Active",
    air: "Poor"
  },
  earthquake: {
    title: "Earthquake",
    lat: 29.2747,
    lng: 82.1838,
    status: "Recent shaking",
    detail: "Check open spaces, hospitals and blocked roads.",
    risk: "Alert",
    rainText: "Shake",
    rainValue: "M4.8",
    air: "Normal"
  },
  shelter: {
    title: "Shelter",
    lat: 26.736,
    lng: 85.919,
    status: "Shelter available",
    detail: "Nearest open shelter is available for evacuation.",
    risk: "Ready",
    rainText: "Shelter",
    rainValue: "Open",
    air: "Normal"
  },
  publicAlerts: {
    title: "Public alert",
    lat: 27.7172,
    lng: 85.324,
    status: "Heavy rain message",
    detail: "Send short local alerts to schools, health posts and ward offices.",
    risk: "Send",
    rainText: "Reach",
    rainValue: "Ward",
    air: "Normal"
  },
  thunderstorm: {
    title: "Thunderstorm",
    lat: 27.4284,
    lng: 85.0322,
    status: "Thunderstorm warning",
    detail: "Lightning and short heavy rain are likely. Avoid open fields and exposed ridges.",
    risk: "Alert",
    rainText: "Storm",
    rainValue: "Likely",
    air: "Normal"
  },
  heavyRain: {
    title: "Heavy rain",
    lat: 27.7006,
    lng: 83.4484,
    status: "Heavy rain warning",
    detail: "Heavy rainfall is likely. Check drains, rivers and low roads before travel.",
    risk: "High",
    rainText: "Rain",
    rainValue: "Heavy",
    air: "Normal"
  }
};

const shelters = [
  { name: "Lalitpur Open Space", lat: 27.6851, lng: 85.3424 },
  { name: "Bhaktapur Shelter", lat: 27.6768, lng: 85.4148 },
  { name: "Nepalgunj Safe Site", lat: 28.058, lng: 81.616 },
  { name: "Pokhara Open Ground", lat: 28.214, lng: 83.982 },
  { name: "Janakpur Shelter", lat: 26.736, lng: 85.919 },
  { name: "Biratnagar Shelter", lat: 26.461, lng: 87.274 },
  { name: "Jumla Safe Site", lat: 29.281, lng: 82.187 },
  { name: "Dadeldhura Shelter", lat: 29.305, lng: 80.587 },
  { name: "Dharan Open Space", lat: 26.819, lng: 87.279 },
  { name: "Simara Shelter", lat: 27.166, lng: 84.986 },
  { name: "Dhangadhi Safe Ground", lat: 28.712, lng: 80.581 },
  { name: "Butwal Open Ground", lat: 27.705, lng: 83.455 },
  { name: "Chitwan Shelter", lat: 27.535, lng: 84.362 },
  { name: "Ilam Open Space", lat: 26.918, lng: 87.916 },
  { name: "Hetauda Shelter", lat: 27.434, lng: 85.037 },
  { name: "Taplejung Safe Site", lat: 27.361, lng: 87.664 }
];

const forecasts = {
  now: [
    ["Now", "Heavy rain", "82 mm at selected station"],
    ["Next hour", "Still raining", "Low roads may flood"],
    ["Evening", "Rain weakens", "Keep shelter ready"]
  ],
  "3h": [
    ["1 hour", "Heavy rain", "Avoid river roads"],
    ["2 hours", "Moderate rain", "Check drains"],
    ["3 hours", "Light rain", "Travel slowly"]
  ],
  "24h": [
    ["Morning", "Cloudy", "Light rain possible"],
    ["Afternoon", "Rain returns", "Some roads slippery"],
    ["Night", "Watch rivers", "Low areas at risk"]
  ],
  "7d": [
    ["Mon-Tue", "Wet", "Higher river level"],
    ["Wed-Thu", "Cloudy", "Light rain"],
    ["Fri-Sun", "More rain", "Prepare local alerts"]
  ]
};

const features = {
  weather: {
    title: "Live weather layer",
    text: "Real-time weather and air quality on the map for any location in Nepal.",
    cards: [["Temperature", "26 C", "Kathmandu now"], ["Air quality", "Moderate", "Simple public wording"], ["Rain", "82 mm", "Station-based animation"], ["GalliMaps", "Search ready", "Place APIs connected"]]
  },
  hazard: {
    title: "Hazard map",
    text: "Flood, landslide, forest fire, earthquake and shelter points are visible together by default, with single-layer controls when needed.",
    cards: [["Flood", "Red alert", "Hanumante Khola"], ["Landslide", "Watch", "Wet slopes"], ["Fire", "Smoke", "Avoid exposure"], ["Shelter", "Open", "Nearest safe point"]]
  },
  route: {
    title: "Route weather",
    text: "Evacuation and travel routes can show rain, wind and hazard warnings along the journey.",
    cards: [["Route", "GalliMaps API", "Uses returned line"], ["Distance", "API ready", "Fallback in demo"], ["Rain chance", "60%", "Along route"], ["Wind", "10 km/h", "Simple summary"]]
  },
  trekking: {
    title: "Trekking weather",
    text: "Mountain routes can show snow chance, low temperature and safe stops for trekkers.",
    cards: [["Everest area", "-2 C", "Snow chance 20%"], ["Tomorrow", "-3 C", "Cloudy"], ["Trail", "Risk watch", "High altitude"], ["DHM value", "Safety", "Official guidance"]]
  },
  flood: {
    title: "Flood alert map",
    text: "River alerts can sit directly on the map so people understand which river reach is risky.",
    cards: [["Hanumante", "Red", "Likely flood risk"], ["Narayani", "Watch", "Rising"], ["Koshi", "Alert", "Low roads"], ["Action", "Move early", "Use safe route"]]
  },
  alerts: {
    title: "School and public alerts",
    text: "DHM warnings can be pushed to schools, health posts, ward offices and the public.",
    cards: [["Schools", "Notify", "Heavy rain"], ["Health posts", "Notify", "Flood watch"], ["Ward offices", "Prepare", "Open shelter"], ["Public", "Share", "Short alert"]]
  },
  city: {
    title: "Smart city dashboard",
    text: "City teams can combine weather, river levels, alerts and reports for daily operations.",
    cards: [["Weather", "24 C", "Partly cloudy"], ["Rain 24h", "18 mm", "Moderate"], ["River", "Hanumante", "Red alert"], ["Reports", "Live", "Ward dashboard"]]
  }
};

const routeWeatherPoints = [
  { name: "Pokhara", lat: 28.2096, lng: 83.9856, temp: "24 C", rain: "60%" },
  { name: "Damauli", lat: 27.975, lng: 84.266, temp: "23 C", rain: "70%" },
  { name: "Mugling", lat: 27.852, lng: 84.56, temp: "22 C", rain: "60%" },
  { name: "Dhading", lat: 27.867, lng: 84.916, temp: "21 C", rain: "55%" },
  { name: "Kathmandu", lat: 27.7172, lng: 85.324, temp: "24 C", rain: "40%" }
];

const pokharaKathmanduRoute = [
  { lat: 28.2096, lng: 83.9856 },
  { lat: 28.06, lng: 84.08 },
  { lat: 27.975, lng: 84.266 },
  { lat: 27.852, lng: 84.56 },
  { lat: 27.867, lng: 84.916 },
  { lat: 27.7172, lng: 85.324 }
];

const trekkingRoute = [
  { lat: 27.9881, lng: 86.925 },
  { lat: 27.995, lng: 86.91 },
  { lat: 28.002, lng: 86.895 },
  { lat: 28.0043, lng: 86.8578 }
];

const riverSegments = [
  { level: "normal", from: { lat: 27.690, lng: 85.405 }, to: { lat: 27.682, lng: 85.418 } },
  { level: "watch", from: { lat: 27.682, lng: 85.418 }, to: { lat: 27.676, lng: 85.429 } },
  { level: "alert", from: { lat: 27.676, lng: 85.429 }, to: { lat: 27.669, lng: 85.442 } },
  { level: "danger", from: { lat: 27.669, lng: 85.442 }, to: { lat: 27.662, lng: 85.456 } }
];

const fallbackRoute = [
  { lat: 27.6716, lng: 85.4256 },
  { lat: 27.6728, lng: 85.4135 },
  { lat: 27.6768, lng: 85.3969 },
  { lat: 27.6819, lng: 85.3742 },
  { lat: 27.6851, lng: 85.3424 }
];

const dashboard = document.querySelector(".dashboard");
const map = document.querySelector("#map");
const tiles = document.querySelector("#tiles");
const leftPanel = document.querySelector(".left-panel");
const layerPanel = document.querySelector(".layer-panel");
const forecastBar = document.querySelector(".forecast-bar");
const route = document.querySelector("#routeLine");
const riverLine = document.querySelector("#riverLine");
const routeStatus = document.querySelector("#routeStatus");
const stationButtons = document.querySelectorAll(".station");
const layerButtons = document.querySelectorAll(".layer");
const hazardButtons = document.querySelectorAll("[data-hazard]");
const featureButtons = document.querySelectorAll(".feature");
const hazardLayerNames = ["flood", "landslide", "fire", "earthquake", "shelter", "publicAlerts", "thunderstorm", "heavyRain"];
let activeStation = "bhaktapur";
let activeSelection = { type: "station", id: "bhaktapur" };
let activeFeature = "map";
let weatherDisplay = "weather";
let rainOverride = null;
let routeActive = false;
let riverActive = false;
let routePoints = fallbackRoute;
const layers = new Set();
const state = { centerLat: 28.15, centerLng: 84.25, z: 7, dragging: false, startX: 0, startY: 0, origin: null };

function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
function rainMode(mm) { if (mm < 5) return "none"; if (mm < 20) return "drizzle"; if (mm < 50) return "mid"; return "heavy"; }
function rainLabel(mode) { return mode === "none" ? "Rain off" : mode === "drizzle" ? "Very light drizzle" : mode === "mid" ? "Mid rain" : "Heavy rain"; }
function riskWord(mm) { if (mm < 10) return "Clear"; if (mm < 50) return "Watch"; return "High"; }
function llp(lat, lng, z) {
  const s = Math.sin(lat * Math.PI / 180), scale = TILE * 2 ** z;
  return { x: (lng + 180) / 360 * scale, y: (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * scale };
}
function pll(x, y, z) {
  const scale = TILE * 2 ** z, lng = x / scale * 360 - 180, n = Math.PI - 2 * Math.PI * y / scale;
  return { lat: 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))), lng };
}
function centerPixel() { return llp(state.centerLat, state.centerLng, state.z); }
function setCenter(p) { const c = pll(p.x, p.y, state.z); state.centerLat = clamp(c.lat, -85, 85); state.centerLng = c.lng; }
function topLeft(rect) { const c = centerPixel(); return { x: c.x - rect.width / 2, y: c.y - rect.height / 2 }; }
function tileUrl(z, x, y) { return TILE_URL.replace("{z}", z).replace("{x}", x).replace("{y}", y); }
function place(el, lat, lng, tl) { const p = llp(lat, lng, state.z); el.style.left = `${p.x - tl.x}px`; el.style.top = `${p.y - tl.y}px`; }
function selectedOrigin() {
  return activeSelection.type === "hazard" ? hazards[activeSelection.id] : stations[activeStation];
}
function apiUrl(path, params) {
  const search = new URLSearchParams({ accessToken: ACCESS_TOKEN, ...params });
  return `${API_BASE}${path}?${search.toString()}`;
}
async function galliGet(path, params, signal) {
  const response = await fetch(apiUrl(path, params), { signal });
  if (!response.ok) throw new Error(`GalliMaps API ${response.status}`);
  return response.json();
}
function withTimeout(ms = 2500) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  return { controller, done: () => clearTimeout(timeout) };
}

function renderTiles(rect, tl) {
  const max = 2 ** state.z, sx = Math.floor(tl.x / TILE) - 1, ex = Math.floor((tl.x + rect.width) / TILE) + 1, sy = Math.floor(tl.y / TILE) - 1, ey = Math.floor((tl.y + rect.height) / TILE) + 1;
  const frag = document.createDocumentFragment();
  for (let x = sx; x <= ex; x += 1) {
    for (let y = sy; y <= ey; y += 1) {
      if (y < 0 || y >= max) continue;
      const img = document.createElement("img");
      img.className = "tile"; img.alt = ""; img.draggable = false; img.src = tileUrl(state.z, ((x % max) + max) % max, y);
      img.style.left = `${Math.round(x * TILE - tl.x)}px`; img.style.top = `${Math.round(y * TILE - tl.y)}px`;
      frag.appendChild(img);
    }
  }
  tiles.replaceChildren(frag);
}

function renderRoute(tl) {
  route.replaceChildren();
  routePoints.slice(0, -1).forEach((point, index) => {
    const next = routePoints[index + 1], a = llp(point.lat, point.lng, state.z), b = llp(next.lat, next.lng, state.z);
    const x1 = a.x - tl.x, y1 = a.y - tl.y, x2 = b.x - tl.x, y2 = b.y - tl.y;
    const segment = document.createElement("i");
    segment.style.left = `${x1}px`; segment.style.top = `${y1}px`; segment.style.width = `${Math.hypot(x2 - x1, y2 - y1)}px`;
    segment.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI}deg)`;
    route.appendChild(segment);
  });
}

function renderRiver(tl) {
  riverLine.replaceChildren();
  riverSegments.forEach(segmentData => {
    const a = llp(segmentData.from.lat, segmentData.from.lng, state.z), b = llp(segmentData.to.lat, segmentData.to.lng, state.z);
    const x1 = a.x - tl.x, y1 = a.y - tl.y, x2 = b.x - tl.x, y2 = b.y - tl.y;
    const segment = document.createElement("i");
    segment.className = segmentData.level;
    segment.style.left = `${x1}px`; segment.style.top = `${y1}px`; segment.style.width = `${Math.hypot(x2 - x1, y2 - y1)}px`;
    segment.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI}deg)`;
    riverLine.appendChild(segment);
  });
}

function render() {
  const rect = map.getBoundingClientRect(), tl = topLeft(rect);
  renderTiles(rect, tl);
  document.querySelectorAll("[data-lat][data-lng]").forEach(el => place(el, +el.dataset.lat, +el.dataset.lng, tl));
  stationButtons.forEach(btn => { const s = stations[btn.dataset.station]; place(btn, s.lat, s.lng, tl); });
  renderRoute(tl);
  renderRiver(tl);
}

function screenLL(cx, cy, z = state.z) {
  const r = map.getBoundingClientRect(), c = llp(state.centerLat, state.centerLng, z), tl = { x: c.x - r.width / 2, y: c.y - r.height / 2 };
  return pll(tl.x + cx - r.left, tl.y + cy - r.top, z);
}
function zoom(d, cx, cy) {
  const old = state.z, next = clamp(old + d, 6, 18);
  if (next === old) return;
  const r = map.getBoundingClientRect(), x = cx ?? r.left + r.width / 2, y = cy ?? r.top + r.height / 2, anchor = screenLL(x, y, old);
  state.z = next;
  const ap = llp(anchor.lat, anchor.lng, next);
  setCenter({ x: ap.x - (x - r.left - r.width / 2), y: ap.y - (y - r.top - r.height / 2) });
  render();
}

function setStation(id) {
  leftPanel.hidden = false;
  forecastBar.hidden = false;
  activeStation = id;
  activeSelection = { type: "station", id };
  const s = stations[id], mode = rainMode(s.rainMm);
  const city = cityWeather[stationToCity[id]] || cityWeather.kathmandu;
  document.querySelector("#selectionType").textContent = "Selected station";
  document.querySelector("#rainText").previousElementSibling.textContent = "Rain";
  if (activeFeature === "weather") {
    document.querySelector("#stationName").textContent = city.name;
    document.querySelector("#stationStatus").textContent = `${city.temp} C, ${city.condition}`;
    document.querySelector("#stationDetail").textContent = weatherDisplay === "air" ? `Air quality is ${city.air}. AQI ${city.aqi}. Sensitive people should reduce long outdoor activity if needed.` : `Today in ${city.name}: ${city.forecast.map(item => `${item[0]} ${item[1]}`).join(", ")}.`;
    document.querySelector("#rainText").textContent = `${city.rainMm} mm`;
    document.querySelector("#airText").textContent = city.air;
    document.querySelector("#riskText").textContent = weatherDisplay === "air" ? `AQI ${city.aqi}` : `${city.temp} C`;
  } else {
    document.querySelector("#stationName").textContent = s.name;
    document.querySelector("#stationStatus").textContent = s.status;
    document.querySelector("#stationDetail").textContent = s.detail;
    document.querySelector("#rainText").textContent = `${s.rainMm} mm`;
    document.querySelector("#airText").textContent = s.air;
    document.querySelector("#riskText").textContent = riskWord(s.rainMm);
  }
  stationButtons.forEach(b => b.classList.toggle("active", b.dataset.station === id));
  document.querySelector("#rainToggle").textContent = rainLabel(mode);
  document.querySelector("#rainToggle").disabled = false;
  document.querySelector("#routeToggle").hidden = true;
  routeStatus.textContent = "";
  updateForecast(document.querySelector(".timeline .active")?.dataset.forecast || "now");
  setVisibility();
}

function setHazardInfo(type) {
  const h = hazards[type];
  if (!h) return;
  leftPanel.hidden = false;
  forecastBar.hidden = true;
  activeSelection = { type: "hazard", id: type };
  document.querySelector("#selectionType").textContent = "Selected hazard";
  document.querySelector("#stationName").textContent = h.title;
  document.querySelector("#stationStatus").textContent = h.status;
  document.querySelector("#stationDetail").textContent = h.detail;
  document.querySelector("#rainText").textContent = h.rainValue;
  document.querySelector("#rainText").previousElementSibling.textContent = h.rainText;
  document.querySelector("#airText").textContent = h.air;
  document.querySelector("#riskText").textContent = h.risk;
  document.querySelector("#rainMode").textContent = type === "flood" ? "River warning" : type === "fire" ? "Smoke warning" : "Hazard warning";
  document.querySelector("#rainToggle").textContent = type === "flood" ? "View river alert" : type === "fire" ? "View smoke zone" : "View hazard";
  document.querySelector("#rainToggle").disabled = true;
  document.querySelector("#routeToggle").textContent = type === "fire" ? "Route around fire" : "Show safe route";
  document.querySelector("#routeToggle").hidden = false;
  routeStatus.textContent = "Route will start from this selected hazard.";
}

function setVisibility() {
  const s = stations[activeStation];
  const mode = rainOverride === false || activeSelection.type === "hazard" || !layers.has("rain") ? "none" : rainMode(s.rainMm);
  dashboard.dataset.rain = layers.has("rain") ? mode : "none";
  document.querySelector("#rainToggle").classList.toggle("primary", activeSelection.type === "station" && mode !== "none");
  if (activeSelection.type === "station") document.querySelector("#rainMode").textContent = mode === "none" ? "No rain lens" : rainLabel(mode);
  layerButtons.forEach(b => {
    if (b.id === "predictionToggle") return;
    if (b.dataset.layer === "hazards") {
      b.classList.toggle("active", hazardLayerNames.every(name => layers.has(name)));
      return;
    }
    b.classList.toggle("active", layers.has(b.dataset.layer));
  });
  document.querySelectorAll("[data-hazard]").forEach(el => { el.hidden = !layers.has(el.dataset.hazard); });
  document.querySelector(".flood-zone").hidden = !layers.has("flood");
  document.querySelector(".slide-zone").hidden = !layers.has("landslide");
  stationButtons.forEach(b => {
    const city = cityWeather[stationToCity[b.dataset.station]];
    b.hidden = !(layers.has("rain") || activeFeature === "weather");
    b.classList.toggle("weather-city", activeFeature === "weather");
    b.classList.remove("air-good", "air-moderate", "air-poor");
    if (activeFeature === "weather" && city) {
      b.innerHTML = weatherDisplay === "air" ? `<b>${city.name}</b><small>AQI ${city.aqi} ${city.air}</small>` : `<b>${city.name}</b><small>${city.temp} C ${city.condition}</small>`;
      b.classList.add(city.aqi < 60 ? "air-good" : city.aqi < 110 ? "air-moderate" : "air-poor");
    } else {
      const station = stations[b.dataset.station];
      b.textContent = station.rainMm;
    }
  });
  route.classList.toggle("active", routeActive);
  riverLine.classList.toggle("active", riverActive);
  dashboard.classList.toggle("satellite-mode", activeFeature === "trekking");
  if (activeFeature !== "city") document.querySelector("#cityPin").hidden = true;
  layerPanel.classList.toggle("weather-only", activeFeature === "weather");
  layerPanel.classList.toggle("hazard-only", activeFeature === "hazard");
}

function collectCoordinates(value) {
  if (!value) return null;
  if (typeof value === "object" && !Array.isArray(value)) {
    const lat = value.lat ?? value.latitude;
    const lng = value.lng ?? value.lon ?? value.longitude;
    if (typeof lat === "number" && typeof lng === "number") return [[lng, lat]];
  }
  if (Array.isArray(value) && value.length > 1 && typeof value[0] === "number" && typeof value[1] === "number") return [value];
  if (Array.isArray(value)) {
    const nested = value.flatMap(item => collectCoordinates(item) || []);
    return nested.length ? nested : null;
  }
  if (typeof value === "object") {
    for (const key of Object.keys(value)) {
      const found = collectCoordinates(value[key]);
      if (found) return found;
    }
  }
  return null;
}

function normalizeRoutePoint(pair) {
  const a = pair[0], b = pair[1];
  if (a >= 26 && a <= 31 && b >= 80 && b <= 89) return { lat: a, lng: b };
  return { lat: b, lng: a };
}

async function getGallimapsRoute(signal) {
  const origin = selectedOrigin();
  const destination = nearestShelter(origin);
  const params = new URLSearchParams({
    mode: "driving",
    srcLat: origin.lat,
    srcLng: origin.lng,
    dstLat: destination.lat,
    dstLng: destination.lng,
    accessToken: ACCESS_TOKEN
  });
  const response = await fetch(`${ROUTE_API}?${params.toString()}`, { signal });
  if (!response.ok) throw new Error(`Route API ${response.status}`);
  const data = await response.json();
  const coords = collectCoordinates(data);
  if (!coords || coords.length < 2) throw new Error("No route line found");
  return coords.map(normalizeRoutePoint).filter(p => Number.isFinite(p.lat) && Number.isFinite(p.lng));
}

function nearestShelter(origin) {
  return shelters.reduce((best, shelter) => {
    const d = Math.hypot(origin.lat - shelter.lat, origin.lng - shelter.lng);
    return d < best.d ? { ...shelter, d } : best;
  }, { ...shelters[0], d: Infinity });
}

function fallbackRouteForStation() {
  const origin = selectedOrigin();
  const destination = nearestShelter(origin);
  return [
    { lat: origin.lat, lng: origin.lng },
    { lat: (origin.lat * 0.66) + (destination.lat * 0.34), lng: (origin.lng * 0.72) + (destination.lng * 0.28) },
    { lat: (origin.lat * 0.34) + (destination.lat * 0.66), lng: (origin.lng * 0.38) + (destination.lng * 0.62) },
    { lat: destination.lat, lng: destination.lng }
  ];
}

async function showRoute() {
  routeActive = !routeActive;
  if (!routeActive) {
    routeStatus.textContent = "Safe route uses GalliMaps routing API.";
    setVisibility(); render(); return;
  }
  await buildRouteForSelectedStation();
}

async function buildRouteForSelectedStation() {
  const origin = selectedOrigin();
  const destination = nearestShelter(origin);
  state.centerLat = (origin.lat + destination.lat) / 2;
  state.centerLng = (origin.lng + destination.lng) / 2;
  state.z = Math.max(state.z, 12);
  routePoints = fallbackRouteForStation();
  routeStatus.textContent = "Getting route from GalliMaps...";
  setVisibility(); render();
  const timer = withTimeout();
  try {
    routePoints = await getGallimapsRoute(timer.controller.signal);
    const distance = await getGallimapsDistance(origin, destination);
    routeStatus.textContent = `Safe route from GalliMaps is shown. ${distance}`;
  } catch (error) {
    routePoints = fallbackRouteForStation();
    routeStatus.textContent = "GalliMaps route could not load here, so selected-point mock route is shown.";
  } finally {
    timer.done();
  }
  setVisibility(); render();
}

async function getGallimapsDistance(origin, destination) {
  const timer = withTimeout(1800);
  try {
    const data = await galliGet("/routing/distance", {
      mode: "driving",
      srcLat: origin.lat,
      srcLng: origin.lng,
      dstLat: destination.lat,
      dstLng: destination.lng
    }, timer.controller.signal);
    const flat = JSON.stringify(data);
    const match = flat.match(/([0-9]+(?:\.[0-9]+)?)\s*(km|m|min|hr)/i);
    return match ? `Distance API: ${match[0]}.` : "Distance API ready.";
  } catch (error) {
    return "Distance API fallback.";
  } finally {
    timer.done();
  }
}

function updateForecast(key) {
  const s = stations[activeStation];
  const stationForecasts = {
    now: [
      ["Now", s.status, `${s.rainMm} mm at ${s.name.replace(" Station", "")}`],
      ["Next hour", s.rainMm >= 50 ? "Heavy rain" : s.rainMm >= 10 ? "Light rain" : "Mostly dry", s.rainMm >= 50 ? "Avoid low roads" : "Roads mostly open"],
      ["Evening", s.rainMm >= 50 ? "Rain weakens" : "Cloudy", "Keep checking alerts"]
    ],
    "3h": [
      ["1 hour", s.rainMm >= 50 ? "Heavy rain" : "Light rain", s.rainMm >= 50 ? "Use safe route" : "Drive carefully"],
      ["2 hours", s.rainMm >= 50 ? "Moderate rain" : "Drizzle", "Watch local drains"],
      ["3 hours", "Lower chance", "Review shelter status"]
    ],
    "24h": [
      ["Morning", "Cloudy", "Light rain possible"],
      ["Afternoon", s.rainMm >= 35 ? "Rain likely" : "Small chance", "Plan field checks"],
      ["Night", "River watch", "Low areas may be affected"]
    ],
    "7d": [
      ["Mon-Tue", "Wet", "Higher river level possible"],
      ["Wed-Thu", "Cloudy", "Some light rain"],
      ["Fri-Sun", "More rain", "Prepare local alerts"]
    ]
  };
  document.querySelectorAll(".timeline button").forEach(b => b.classList.toggle("active", b.dataset.forecast === key));
  document.querySelector("#forecastPanel").innerHTML = stationForecasts[key].map(item => `<div><span>${item[0]}</span><b>${item[1]}</b><small>${item[2]}</small></div>`).join("");
}

stationButtons.forEach(b => b.addEventListener("click", () => {
  rainOverride = null;
  setStation(b.dataset.station);
  const s = stations[b.dataset.station];
  state.centerLat = s.lat; state.centerLng = s.lng; state.z = b.dataset.station === "bhaktapur" ? 13 : 9;
  render();
  reverseSelectedPoint();
  if (routeActive) buildRouteForSelectedStation();
}));
layerButtons.forEach(b => b.addEventListener("click", () => {
  if (b.id === "predictionToggle") { togglePrediction(); return; }
  if (b.dataset.layer === "hazards") {
    const allOn = hazardLayerNames.every(name => layers.has(name));
    hazardLayerNames.forEach(name => allOn ? layers.delete(name) : layers.add(name));
    if (!allOn) layers.add("hazards"); else layers.delete("hazards");
    setVisibility();
    return;
  }
  layers.has(b.dataset.layer) ? layers.delete(b.dataset.layer) : layers.add(b.dataset.layer);
  if (hazardLayerNames.every(name => layers.has(name))) layers.add("hazards"); else layers.delete("hazards");
  if (layers.has(b.dataset.layer) && b.dataset.layer !== "rain") setHazardInfo(b.dataset.layer);
  setVisibility();
}));
hazardButtons.forEach(b => b.addEventListener("click", () => {
  const type = b.dataset.hazard;
  layers.add(type);
  if (hazardLayerNames.every(name => layers.has(name))) layers.add("hazards");
  setHazardInfo(type);
  setVisibility();
  reverseSelectedPoint();
}));
document.querySelector("#rainToggle").addEventListener("click", () => {
  if (activeSelection.type !== "station") return;
  rainOverride = dashboard.dataset.rain === "none";
  setVisibility();
});
document.querySelector("#routeToggle").addEventListener("click", showRoute);
document.querySelector("#weatherPill").addEventListener("click", () => document.querySelector("#weatherCard").classList.toggle("open"));
document.querySelector("#closeWeather").addEventListener("click", () => document.querySelector("#weatherCard").classList.remove("open"));
document.querySelectorAll(".timeline button").forEach(b => b.addEventListener("click", () => updateForecast(b.dataset.forecast)));
document.querySelectorAll("[data-month]").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll("[data-month]").forEach(x => x.classList.toggle("active", x === b));
  const month = b.dataset.month;
  document.querySelector("#predictionMonth").textContent = month === "july" ? "July" : "August";
  document.querySelector("#predictionMap").src = month === "july" ? "assets/predicted-rainfall-july.png" : "assets/predicted-rainfall-august.png";
}));
function togglePrediction() {
  const panel = document.querySelector("#predictionPanel");
  panel.classList.toggle("collapsed");
  document.querySelector("#predictionToggle").classList.toggle("active", !panel.classList.contains("collapsed"));
}

function setFeature(id) {
  const feature = features[id];
  if (!feature) return;
  activeFeature = id;
  layerPanel.hidden = false;
  riverActive = false;
  if (id !== "route" && id !== "trekking") routeActive = false;
  featureButtons.forEach(b => b.classList.toggle("active", b.dataset.feature === id));
  if (id === "weather") setWeatherMode();
  else if (id === "hazard") setHazardMode();
  else if (id === "route") setRouteWeatherMode();
  else if (id === "trekking") setTrekkingMode();
  else if (id === "flood") setFloodMode();
  else if (id === "alerts") setAlertsMode();
  else if (id === "city") setSmartCityMode();
  setVisibility();
  render();
}

function setMenuTitle(label) {
  document.querySelector(".layer-panel .panel-title span").textContent = "Map menu";
  document.querySelector(".layer-panel .panel-title b").textContent = label;
}

function setWeatherMode() {
  setMenuTitle("Live weather");
  layers.clear();
  state.centerLat = 28.15;
  state.centerLng = 84.25;
  state.z = 7;
  activeSelection = { type: "map", id: "weather" };
  leftPanel.hidden = true;
  forecastBar.hidden = true;
}

function setHazardMode() {
  setMenuTitle("Hazard map");
  layers.clear();
  hazardLayerNames.concat(["thunderstorm", "heavyRain"]).forEach(name => layers.add(name));
  layers.add("hazards");
  state.centerLat = 28.15;
  state.centerLng = 84.25;
  state.z = 7;
  setHazardInfo("landslide");
}

function setRouteWeatherMode() {
  setMenuTitle("Route weather");
  layers.clear();
  layers.add("rain");
  routeActive = true;
  routePoints = pokharaKathmanduRoute;
  state.centerLat = 27.96;
  state.centerLng = 84.64;
  state.z = 9;
  document.querySelector("#stationName").textContent = "Pokhara to Kathmandu";
  document.querySelector("#stationStatus").textContent = "Route weather";
  document.querySelector("#stationDetail").textContent = `Stops: ${routeWeatherPoints.map(p => `${p.name} ${p.temp}, rain ${p.rain}`).join("; ")}.`;
  routeStatus.textContent = "Route weather shows rain and temperature along Pokhara to Kathmandu.";
}

function setTrekkingMode() {
  setMenuTitle("Trekking");
  layers.clear();
  routeActive = true;
  routePoints = trekkingRoute;
  state.centerLat = 27.997;
  state.centerLng = 86.89;
  state.z = 12;
  document.querySelector("#stationName").textContent = "Everest Base Camp to Kala Patthar";
  document.querySelector("#stationStatus").textContent = "Trekking weather";
  document.querySelector("#stationDetail").textContent = "Base Camp -2 C, Kala Patthar -5 C. Snow chance and cloud risk change along the trail.";
  routeStatus.textContent = "Trekking route mock: Everest Base Camp to Kala Patthar.";
}

function setFloodMode() {
  setMenuTitle("Flood alert");
  layers.clear();
  layers.add("flood");
  riverActive = true;
  state.centerLat = 27.675;
  state.centerLng = 85.43;
  state.z = 13;
  setHazardInfo("flood");
}

function setAlertsMode() {
  setMenuTitle("Public alerts");
  layers.clear();
  layers.add("publicAlerts");
  layers.add("heavyRain");
  setHazardInfo("publicAlerts");
}

function setSmartCityMode() {
  setMenuTitle("Smart city");
  layers.clear();
  layers.add("rain");
  layers.add("flood");
  riverActive = true;
  const pin = document.querySelector("#cityPin");
  pin.hidden = false;
  pin.dataset.lat = 27.7172;
  pin.dataset.lng = 85.324;
  state.centerLat = 27.7172;
  state.centerLng = 85.324;
  state.z = 13;
  document.querySelector("#stationName").textContent = "Kathmandu pinned location";
  document.querySelector("#stationStatus").textContent = "Smart city dashboard";
  document.querySelector("#stationDetail").textContent = "Current weather 24 C, rainfall 18 mm, air quality moderate, Hanumante river alert nearby.";
}

async function runPlaceSearch(query) {
  const results = document.querySelector("#searchResults");
  const q = query.trim();
  if (!q) {
    results.hidden = true;
    return;
  }
  results.hidden = false;
  results.innerHTML = "<button type=\"button\">Searching GalliMaps...</button>";
  const timer = withTimeout(2200);
  try {
    const data = await galliGet("/search/autocomplete", {
      word: q,
      lat: state.centerLat,
      lng: state.centerLng
    }, timer.controller.signal);
    const raw = Array.isArray(data) ? data : Object.values(data).find(Array.isArray) || [];
    const items = raw.slice(0, 4).map(item => ({
      name: item.name || item.title || item.label || item.address || q,
      lat: Number(item.lat ?? item.latitude ?? item.y),
      lng: Number(item.lng ?? item.lon ?? item.longitude ?? item.x)
    }));
    renderSearchResults(items.length ? items : mockSearchResults(q));
  } catch (error) {
    renderSearchResults(mockSearchResults(q));
  } finally {
    timer.done();
  }
}

function mockSearchResults(query) {
  return [
    { name: `${query} near Kathmandu`, lat: 27.7172, lng: 85.324 },
    { name: `${query} near Bhaktapur`, lat: 27.6716, lng: 85.4256 },
    { name: `${query} near Pokhara`, lat: 28.2096, lng: 83.9856 }
  ];
}

function renderSearchResults(items) {
  const results = document.querySelector("#searchResults");
  results.innerHTML = items.map((item, index) => `<button type="button" data-result="${index}">${item.name}</button>`).join("");
  results.querySelectorAll("button").forEach((button, index) => {
    button.addEventListener("click", () => {
      const item = items[index];
      state.centerLat = item.lat;
      state.centerLng = item.lng;
      state.z = 13;
      results.hidden = true;
      document.querySelector("#apiNote").textContent = `Search selected: ${item.name}`;
      render();
    });
  });
}

async function reverseSelectedPoint() {
  const origin = selectedOrigin();
  const timer = withTimeout(1600);
  try {
    const data = await galliGet("/reverse/generalReverse", { lat: origin.lat, lng: origin.lng }, timer.controller.signal);
    const name = data.name || data.address || data.placeName || "selected point";
    document.querySelector("#apiNote").textContent = `Reverse geocoding: ${name}`;
  } catch (error) {
    document.querySelector("#apiNote").textContent = "GalliMaps APIs are wired; local run is using mock fallback.";
  } finally {
    timer.done();
  }
}

featureButtons.forEach(b => b.addEventListener("click", () => setFeature(b.dataset.feature)));
document.querySelector("#placeQuery").addEventListener("input", e => runPlaceSearch(e.target.value));
document.querySelector("#placeSearch").addEventListener("submit", async e => {
  e.preventDefault();
  const query = document.querySelector("#placeQuery").value.trim();
  if (!query) return;
  const timer = withTimeout(2200);
  try {
    const data = await galliGet("/search/currentLocation", {
      name: query,
      currentLat: state.centerLat,
      currentLng: state.centerLng
    }, timer.controller.signal);
    document.querySelector("#apiNote").textContent = `Search API used for "${query}".`;
    const coords = collectCoordinates(data);
    if (coords?.[0]) {
      const point = normalizeRoutePoint(coords[0]);
      state.centerLat = point.lat;
      state.centerLng = point.lng;
      state.z = 13;
      render();
    }
  } catch (error) {
    await runPlaceSearch(query);
  } finally {
    timer.done();
  }
});

map.addEventListener("pointerdown", e => {
  if (e.target.closest("button,.left-panel,.layer-panel,.prediction-panel,.forecast-bar,.weather-pill,.weather-card,.map-tools,.topbar")) return;
  if (activeFeature === "city") {
    const point = screenLL(e.clientX, e.clientY);
    const pin = document.querySelector("#cityPin");
    pin.hidden = false;
    pin.dataset.lat = point.lat;
    pin.dataset.lng = point.lng;
    document.querySelector("#stationName").textContent = "Pinned smart city point";
    document.querySelector("#stationStatus").textContent = `${point.lat.toFixed(3)}, ${point.lng.toFixed(3)}`;
    document.querySelector("#stationDetail").textContent = "Smart city view for this map point: current weather 24 C, local rainfall 18 mm, moderate air quality, nearest river watch.";
    render();
    return;
  }
  state.dragging = true; state.startX = e.clientX; state.startY = e.clientY; state.origin = llp(state.centerLat, state.centerLng, state.z);
  map.classList.add("dragging"); map.setPointerCapture(e.pointerId);
});
map.addEventListener("pointermove", e => {
  if (!state.dragging) return;
  setCenter({ x: state.origin.x - (e.clientX - state.startX), y: state.origin.y - (e.clientY - state.startY) });
  render();
});
map.addEventListener("pointerup", e => {
  state.dragging = false; map.classList.remove("dragging");
  if (map.hasPointerCapture(e.pointerId)) map.releasePointerCapture(e.pointerId);
});
map.addEventListener("wheel", e => { e.preventDefault(); zoom(e.deltaY > 0 ? -1 : 1, e.clientX, e.clientY); }, { passive: false });
document.querySelector("#zoomIn").addEventListener("click", () => zoom(1));
document.querySelector("#zoomOut").addEventListener("click", () => zoom(-1));
document.querySelector("#locate").addEventListener("click", () => { const s = stations[activeStation]; state.centerLat = s.lat; state.centerLng = s.lng; render(); });
document.querySelector("#reset").addEventListener("click", () => { state.centerLat = 28.15; state.centerLng = 84.25; state.z = 7; render(); });
window.addEventListener("resize", render);
document.querySelector("#weatherView").addEventListener("click", () => {
  weatherDisplay = "weather";
  document.querySelector("#weatherView").classList.add("active");
  document.querySelector("#airView").classList.remove("active");
  if (activeFeature === "weather") setStation(activeStation);
  setVisibility();
  render();
});
document.querySelector("#airView").addEventListener("click", () => {
  weatherDisplay = "air";
  document.querySelector("#airView").classList.add("active");
  document.querySelector("#weatherView").classList.remove("active");
  if (activeFeature === "weather") setStation(activeStation);
  setVisibility();
  render();
});
updateForecast("now");
setVisibility();
render();
