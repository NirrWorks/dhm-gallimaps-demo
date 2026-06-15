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
  jumla: { name: "Jumla Station", lat: 29.2747, lng: 82.1838, rainMm: 0, air: "Good", status: "No rain", detail: "No rainfall recorded at this station." },
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

const stationPointOffsets = {
  bhaktapur: { x: 14, y: -8 },
  kirtipur: { x: -16, y: 12 },
  dharan: { x: -10, y: -8 },
  biratnagar: { x: 14, y: 10 }
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
    title: "Local weather",
    text: "DHM station weather, shown where people actually are.",
    cards: [["Temperature", "26 C", "Kathmandu now"], ["Air quality", "Moderate", "Simple public wording"], ["Rain", "82 mm", "Station-based animation"], ["GalliMaps", "Search ready", "Place APIs connected"]]
  },
  rainfall: {
    title: "Rainfall lens",
    text: "Live DHM rainfall intensity overlaid on the map.",
    cards: [["Very light", "Drizzle", "Low rainfall station"], ["Mid rain", "20-49 mm", "Moderate visual lens"], ["Heavy rain", "50+ mm", "Strong rain lens"], ["Prediction", "July/August", "Monthly maps"]]
  },
  prediction: {
    title: "Rainfall prediction",
    text: "Weekly rainfall forecast and next-month prediction maps for planning.",
    cards: [["Weekly", "7 days", "Light to heavy rain areas"], ["Next month", "July/August", "Prepared rainfall maps"], ["Planning", "Province view", "Where rain may increase"], ["Public", "Simple colors", "Easy to explain"]]
  },
  route: {
    title: "Route alerts",
    text: "Warn users before they enter heavy rain zones on their route.",
    cards: [["Route", "GalliMaps API", "Uses returned line"], ["Distance", "API ready", "Fallback in demo"], ["Rain chance", "60%", "Along route"], ["Wind", "10 km/h", "Simple summary"]]
  },
  disaster: {
    title: "Disaster alert",
    text: "Flood, landslide, fire, earthquake, storm and heavy-rain warnings in one hazard map.",
    cards: [["Flood", "River risk", "Low roads and river corridors"], ["Landslide", "Slope risk", "Wet hill roads"], ["Fire / quake", "Alert", "Nearby emergency updates"], ["Storm", "Weather warning", "Thunder and heavy rain"]]
  },
  flood: {
    title: "Flood alert map",
    text: "Curvy river-level warning map for major rivers and local streams.",
    cards: [["Hanumante", "Red alert", "Urban river risk"], ["Karnali", "Warning", "Western river rising"], ["River line", "Curvy", "Real-world style path"], ["Action", "Click label", "View river details"]]
  },
  city: {
    title: "Smart city",
    text: "Province-level weather, river and alert summary for city and government dashboards.",
    cards: [["Province map", "Clickable", "Tap province for details"], ["Weather", "Live", "Temperature and rainfall"], ["River", "Status", "Major river warnings"], ["Alerts", "Public", "Office-ready summary"]]
  },
  air: {
    title: "Air quality",
    text: "AQI station readings made simple for public decisions.",
    cards: [["Kathmandu", "AQI 82", "Moderate"], ["Nepalgunj", "AQI 128", "Poor"], ["Pokhara", "AQI 48", "Good"], ["Action", "Reduce exposure", "For sensitive people"]]
  },
  alerts: {
    title: "School and public alerts",
    text: "DHM warnings can be pushed to schools, health posts, ward offices and the public.",
    cards: [["Schools", "Notify", "Heavy rain"], ["Health posts", "Notify", "Flood watch"], ["Ward offices", "Prepare", "Open shelter"], ["Public", "Share", "Short alert"]]
  },
  landslide: {
    title: "Landslide risk",
    text: "GIS hazard zones for hilly terrain, translated into simple route warnings.",
    cards: [["Pokhara hills", "Watch", "Wet slope"], ["Route", "Avoid", "Steep segments"], ["Alert", "Predicted", "Rain-triggered"], ["Action", "Safe route", "Use GalliMaps routing"]]
  }
};

const routeWeatherPoints = [
  { name: "Pokhara", lat: 28.2096, lng: 83.9856, temp: "24 C", rain: "60%" },
  { name: "Damauli", lat: 27.975, lng: 84.266, temp: "23 C", rain: "70%" },
  { name: "Mugling", lat: 27.852, lng: 84.56, temp: "22 C", rain: "60%" },
  { name: "Dhading", lat: 27.867, lng: 84.916, temp: "21 C", rain: "55%" },
  { name: "Kathmandu", lat: 27.7172, lng: 85.324, temp: "24 C", rain: "40%" }
];

const routeCities = {
  nepalgunj: { name: "Nepalgunj", lat: 28.05, lng: 81.62, temp: "31 C", weather: "Heavy rain", rain: 67 },
  pokhara: { name: "Pokhara", lat: 28.2096, lng: 83.9856, temp: "26 C", weather: "Rain watch", rain: 43 },
  kathmandu: { name: "Kathmandu", lat: 27.7172, lng: 85.324, temp: "24 C", weather: "Cloudy", rain: 18 },
  butwal: { name: "Butwal", lat: 27.7006, lng: 83.4484, temp: "28 C", weather: "Heavy rain", rain: 62 },
  chitwan: { name: "Chitwan", lat: 27.5291, lng: 84.3542, temp: "29 C", weather: "Flood watch", rain: 71 },
  biratnagar: { name: "Biratnagar", lat: 26.4525, lng: 87.2718, temp: "27 C", weather: "Light drizzle", rain: 19 },
  dhangadhi: { name: "Dhangadhi", lat: 28.7056, lng: 80.5754, temp: "30 C", weather: "Heavy rain", rain: 74 }
};

const routeCorridors = {
  "nepalgunj-pokhara": [
    { lat: 28.05, lng: 81.62 },
    { lat: 27.84, lng: 82.25 },
    { lat: 27.80, lng: 82.75 },
    { lat: 27.70, lng: 83.12 },
    { lat: 27.7006, lng: 83.4484 },
    { lat: 27.89, lng: 83.67 },
    { lat: 28.2096, lng: 83.9856 }
  ],
  "pokhara-nepalgunj": [
    { lat: 28.2096, lng: 83.9856 },
    { lat: 27.89, lng: 83.67 },
    { lat: 27.7006, lng: 83.4484 },
    { lat: 27.70, lng: 83.12 },
    { lat: 27.80, lng: 82.75 },
    { lat: 27.84, lng: 82.25 },
    { lat: 28.05, lng: 81.62 }
  ]
};

let activeRouteAlerts = [];

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
  {
    river: "Hanumante Khola",
    levels: ["normal", "watch", "alert", "danger", "danger"],
    points: [
      { lat: 27.690, lng: 85.405 }, { lat: 27.686, lng: 85.413 }, { lat: 27.682, lng: 85.418 },
      { lat: 27.676, lng: 85.429 }, { lat: 27.669, lng: 85.442 }, { lat: 27.662, lng: 85.456 }
    ]
  },
  {
    river: "Karnali River",
    levels: ["normal", "watch", "alert", "watch", "normal"],
    points: [
      { lat: 28.95, lng: 81.10 }, { lat: 28.86, lng: 81.19 }, { lat: 28.78, lng: 81.16 },
      { lat: 28.70, lng: 81.29 }, { lat: 28.62, lng: 81.25 }, { lat: 28.54, lng: 81.38 }
    ]
  }
];

const riverAlerts = {
  hanumante: {
    title: "Hanumante Khola",
    status: "Red alert",
    detail: "Water level is very high near Bhaktapur. Avoid river roads and move early if water rises.",
    rainValue: "Danger",
    risk: "Red"
  },
  karnali: {
    title: "Karnali River",
    status: "Warning",
    detail: "Karnali river level is rising in the west. Watch bridges, river banks and low settlements.",
    rainValue: "Warning",
    risk: "Orange"
  }
};

const provinceStats = [
  { name: "Koshi Province", temp: "27 C", rain: "52 mm", river: "Normal", alert: "Heat and rain watch", color: "#f97316" },
  { name: "Madhesh Province", temp: "30 C", rain: "24 mm", river: "Watch", alert: "Thunderstorm possible", color: "#f59e0b" },
  { name: "Bagmati Province", temp: "24 C", rain: "82 mm", river: "Hanumante red", alert: "Flood and heavy rain", color: "#dc2626" },
  { name: "Gandaki Province", temp: "26 C", rain: "43 mm", river: "Normal", alert: "Landslide watch", color: "#a855f7" },
  { name: "Lumbini Province", temp: "28 C", rain: "62 mm", river: "Tinau watch", alert: "Heavy rain", color: "#ef4444" },
  { name: "Karnali Province", temp: "23 C", rain: "35 mm", river: "Karnali warning", alert: "River warning", color: "#0ea5e9" },
  { name: "Sudurpashchim Province", temp: "30 C", rain: "74 mm", river: "Watch", alert: "Heavy rain", color: "#2563eb" }
];

const predictionFrames = {
  fri12: [
    { lat: 28.72, lng: 80.72, level: "mid", w: 130, h: 74 },
    { lat: 28.28, lng: 83.76, level: "low", w: 118, h: 66 },
    { lat: 27.62, lng: 85.30, level: "mid", w: 142, h: 78 },
    { lat: 26.78, lng: 86.72, level: "low", w: 120, h: 68 }
  ],
  sat13: [
    { lat: 28.42, lng: 81.15, level: "low", w: 120, h: 66 },
    { lat: 27.82, lng: 83.45, level: "mid", w: 156, h: 86 },
    { lat: 27.36, lng: 85.02, level: "high", w: 138, h: 76 },
    { lat: 26.92, lng: 87.42, level: "mid", w: 148, h: 82 }
  ],
  sun14: [
    { lat: 28.65, lng: 80.85, level: "low", w: 124, h: 70 },
    { lat: 27.78, lng: 82.95, level: "mid", w: 160, h: 88 },
    { lat: 27.72, lng: 85.32, level: "high", w: 142, h: 78 },
    { lat: 26.75, lng: 86.95, level: "mid", w: 150, h: 84 },
    { lat: 27.18, lng: 87.74, level: "low", w: 114, h: 64 }
  ],
  mon15: [
    { lat: 28.20, lng: 83.98, level: "high", w: 145, h: 80 },
    { lat: 27.53, lng: 84.35, level: "mid", w: 150, h: 84 },
    { lat: 26.45, lng: 87.27, level: "low", w: 116, h: 66 },
    { lat: 29.05, lng: 82.10, level: "low", w: 112, h: 64 }
  ],
  tue16: [
    { lat: 28.70, lng: 80.57, level: "high", w: 150, h: 84 },
    { lat: 27.70, lng: 83.45, level: "mid", w: 148, h: 82 },
    { lat: 27.67, lng: 85.43, level: "mid", w: 138, h: 76 },
    { lat: 26.91, lng: 87.92, level: "low", w: 110, h: 62 }
  ],
  wed17: [
    { lat: 28.05, lng: 81.62, level: "mid", w: 150, h: 84 },
    { lat: 27.70, lng: 83.45, level: "high", w: 150, h: 84 },
    { lat: 27.43, lng: 85.03, level: "mid", w: 140, h: 78 },
    { lat: 27.35, lng: 87.67, level: "mid", w: 132, h: 74 }
  ],
  thu18: [
    { lat: 29.30, lng: 80.58, level: "low", w: 110, h: 62 },
    { lat: 28.21, lng: 83.98, level: "mid", w: 142, h: 78 },
    { lat: 27.67, lng: 85.43, level: "high", w: 150, h: 84 },
    { lat: 26.81, lng: 87.28, level: "mid", w: 136, h: 76 }
  ],
  fri19: [
    { lat: 28.70, lng: 80.57, level: "high", w: 150, h: 86 },
    { lat: 27.53, lng: 84.35, level: "high", w: 152, h: 86 },
    { lat: 26.73, lng: 85.93, level: "mid", w: 142, h: 78 },
    { lat: 26.91, lng: 87.92, level: "mid", w: 136, h: 76 }
  ]
};

const forecastMarkers = {
  now: [
    { lat: 27.7172, lng: 85.324, city: "Kathmandu", type: "cloud", text: "24 C" },
    { lat: 28.2096, lng: 83.9856, city: "Pokhara", type: "rain", text: "26 C" },
    { lat: 26.4525, lng: 87.2718, city: "Biratnagar", type: "cloud", text: "27 C" }
  ],
  "3h": [
    { lat: 27.7172, lng: 85.324, city: "Kathmandu", type: "rain", text: "60%" },
    { lat: 27.7006, lng: 83.4484, city: "Butwal", type: "heavy", text: "70%" },
    { lat: 28.05, lng: 81.62, city: "Nepalgunj", type: "heavy", text: "75%" }
  ],
  "24h": [
    { lat: 28.7056, lng: 80.5754, city: "Far west", type: "heavy", text: "High" },
    { lat: 27.5291, lng: 84.3542, city: "Chitwan", type: "rain", text: "Likely" },
    { lat: 26.9116, lng: 87.9237, city: "East hills", type: "rain", text: "Watch" }
  ],
  "7d": [
    { lat: 28.7056, lng: 80.5754, city: "Far west", type: "heavy", text: "More rain" },
    { lat: 27.7, lng: 83.4, city: "Lumbini", type: "rain", text: "Wet" },
    { lat: 26.9, lng: 87.7, city: "East", type: "rain", text: "Wet" }
  ]
};

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
const provinceLayer = document.querySelector("#provinceLayer");
const smartDetailPanel = document.querySelector("#smartDetailPanel");
const predictionMapUi = document.querySelector("#predictionMapUi");
const predictionRainOverlay = document.querySelector("#predictionRainOverlay");
const heatmapDemoPanel = document.querySelector("#heatmapDemoPanel");
const routeStatus = document.querySelector("#routeStatus");
const routeSearchCard = document.querySelector("#routeSearchCard");
const routeSearchStatus = document.querySelector("#routeSearchStatus");
const routeFrom = document.querySelector("#routeFrom");
const routeTo = document.querySelector("#routeTo");
const stationButtons = document.querySelectorAll(".station");
const layerButtons = document.querySelectorAll(".layer");
const hazardButtons = document.querySelectorAll("[data-hazard]");
const featureButtons = document.querySelectorAll(".feature");
const predictionViewButtons = document.querySelectorAll("[data-prediction-view]");
const hazardLayerNames = ["flood", "landslide", "fire", "earthquake", "shelter", "publicAlerts", "thunderstorm", "heavyRain"];
let activeStation = "bhaktapur";
let activeSelection = { type: "station", id: "bhaktapur" };
let activeFeature = "map";
let weatherDisplay = "weather";
let localWeatherLayer = "weather";
let rainOverride = null;
let routeActive = false;
let riverActive = false;
let routePoints = fallbackRoute;
let provinceData = null;
let provinceLoading = false;
let activePredictionDay = "sun14";
let activePredictionTime = "20:45";
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
function place(el, lat, lng, tl, offset = { x: 0, y: 0 }) {
  const p = llp(lat, lng, state.z);
  el.style.left = `${p.x - tl.x + offset.x}px`;
  el.style.top = `${p.y - tl.y + offset.y}px`;
}
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
    segmentData.points.slice(0, -1).forEach((point, index) => {
      const next = segmentData.points[index + 1], a = llp(point.lat, point.lng, state.z), b = llp(next.lat, next.lng, state.z);
      const x1 = a.x - tl.x, y1 = a.y - tl.y, x2 = b.x - tl.x, y2 = b.y - tl.y;
      const segment = document.createElement("i");
      const level = segmentData.levels?.[index] || segmentData.level || "normal";
      segment.className = `${level} river-${segmentData.river.toLowerCase().replace(/[^a-z]+/g, "-")}`;
      segment.style.left = `${x1}px`; segment.style.top = `${y1}px`; segment.style.width = `${Math.hypot(x2 - x1, y2 - y1)}px`;
      segment.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI}deg)`;
      riverLine.appendChild(segment);
    });
  });
}

function provinceName(feature, index) {
  const p = feature.properties || {};
  return p.name || p.province || p.ADM1_EN || p.Province || provinceStats[index]?.name || `Province ${index + 1}`;
}

function ringPath(ring, tl) {
  const step = Math.max(1, Math.ceil(ring.length / 36));
  return ring.filter((_, index) => index % step === 0 || index === ring.length - 1).map((pair, index) => {
    const p = llp(pair[1], pair[0], state.z);
    return `${index ? "L" : "M"}${(p.x - tl.x).toFixed(1)} ${(p.y - tl.y).toFixed(1)}`;
  }).join(" ") + " Z";
}

function ringArea(ring) {
  let area = 0;
  for (let i = 0; i < ring.length - 1; i += 1) area += (ring[i][0] * ring[i + 1][1]) - (ring[i + 1][0] * ring[i][1]);
  return Math.abs(area);
}

function featurePath(feature, tl) {
  const geom = feature.geometry;
  if (!geom) return "";
  const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
  const rings = polys.map(poly => poly[0]).filter(Boolean);
  const largest = rings.sort((a, b) => ringArea(b) - ringArea(a))[0];
  return largest ? ringPath(largest, tl) : "";
}

function renderProvinceMap(tl, rect) {
  provinceLayer.replaceChildren();
  provinceLayer.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
  provinceLayer.setAttribute("width", rect.width);
  provinceLayer.setAttribute("height", rect.height);
  provinceLayer.classList.toggle("active", activeFeature === "city");
  if (activeFeature !== "city" || !provinceData) return;
  const frag = document.createDocumentFragment();
  provinceData.features.forEach((feature, index) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const stat = provinceStats[index % provinceStats.length];
    path.setAttribute("d", featurePath(feature, tl));
    path.setAttribute("fill", stat.color);
    path.setAttribute("data-province", index);
    path.setAttribute("tabindex", "0");
    frag.appendChild(path);
  });
  provinceLayer.appendChild(frag);
}

function renderForecastMarkers(key = "now") {
  document.querySelectorAll(".forecast-marker").forEach(el => el.remove());
  if (activeFeature !== "weather" || activeSelection.type !== "station" || localWeatherLayer === "rain") return;
  const frag = document.createDocumentFragment();
  (forecastMarkers[key] || forecastMarkers.now).forEach(item => {
    const marker = document.createElement("div");
    marker.className = `forecast-marker ${item.type}`;
    marker.dataset.lat = item.lat;
    marker.dataset.lng = item.lng;
    marker.innerHTML = `<b>${item.city}</b><small>${item.text}</small>`;
    frag.appendChild(marker);
  });
  document.querySelector(".overlays").appendChild(frag);
}

function renderRouteAlerts(tl) {
  document.querySelectorAll(".route-alert-marker").forEach(el => el.remove());
  if (activeFeature !== "route" || !routeActive) return;
  const frag = document.createDocumentFragment();
  activeRouteAlerts.forEach(item => {
    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = `route-alert-marker ${item.level} ${item.position || "above"}`;
    marker.dataset.lat = item.lat;
    marker.dataset.lng = item.lng;
    marker.innerHTML = `<b>${item.icon}</b><span>${item.title}</span>`;
    marker.addEventListener("click", () => showRouteAlert(item));
    place(marker, item.lat, item.lng, tl);
    frag.appendChild(marker);
  });
  document.querySelector(".overlays").appendChild(frag);
}

function renderPredictionRain(tl) {
  const patches = document.querySelectorAll("[data-pred-rain]");
  const frame = predictionFrames[activePredictionDay] || predictionFrames.sun14;
  patches.forEach((patch, index) => {
    const item = frame[index];
    if (!item || activeFeature !== "prediction") {
      patch.hidden = true;
      return;
    }
    const p = llp(item.lat, item.lng, state.z);
    const scale = clamp((state.z - 6) * 0.18 + 0.82, 0.8, 1.45);
    patch.hidden = false;
    patch.className = `rain-patch ${item.level}`;
    patch.style.left = `${p.x - tl.x}px`;
    patch.style.top = `${p.y - tl.y}px`;
    patch.style.setProperty("--w", `${Math.round(clamp(item.w * scale, 72, 116))}px`);
    patch.style.setProperty("--h", `${Math.round(clamp(item.h * scale, 40, 68))}px`);
  });
}

function render() {
  const rect = map.getBoundingClientRect(), tl = topLeft(rect);
  renderTiles(rect, tl);
  renderForecastMarkers(document.querySelector(".timeline .active")?.dataset.forecast || "now");
  document.querySelectorAll("[data-lat][data-lng]").forEach(el => place(el, +el.dataset.lat, +el.dataset.lng, tl));
  stationButtons.forEach(btn => {
    const s = stations[btn.dataset.station];
    const offset = activeFeature === "weather" && localWeatherLayer === "rain" ? stationPointOffsets[btn.dataset.station] : null;
    place(btn, s.lat, s.lng, tl, offset || { x: 0, y: 0 });
  });
  renderRoute(tl);
  renderRiver(tl);
  renderRouteAlerts(tl);
  renderProvinceMap(tl, rect);
  renderPredictionRain(tl);
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
  activeStation = id;
  activeSelection = { type: "station", id };
  rainOverride = null;
  const s = stations[id], mode = rainMode(s.rainMm);
  const city = cityWeather[stationToCity[id]] || cityWeather.kathmandu;
  const cityMode = activeFeature === "weather" && localWeatherLayer !== "rain";
  forecastBar.hidden = !cityMode;
  document.querySelector("#selectionType").textContent = "Selected station";
  document.querySelector("#rainText").previousElementSibling.textContent = "Rain";
  if (cityMode) {
    document.querySelector("#stationName").textContent = city.name;
    document.querySelector("#stationStatus").textContent = `${city.temp} C, ${city.condition}`;
    document.querySelector("#stationDetail").textContent = weatherDisplay === "air" ? `Air quality is ${city.air}. AQI ${city.aqi}. Sensitive people should reduce long outdoor activity if needed.` : `Today in ${city.name}: ${city.forecast.map(item => `${item[0]} ${item[1]}`).join(", ")}.`;
    document.querySelector("#rainText").textContent = `${city.rainMm} mm`;
    document.querySelector("#airText").textContent = city.air;
    document.querySelector("#riskText").textContent = weatherDisplay === "air" ? `AQI ${city.aqi}` : `${city.temp} C`;
  } else {
    document.querySelector("#stationName").textContent = s.name;
    document.querySelector("#stationStatus").textContent = s.status;
    document.querySelector("#stationDetail").textContent = `${s.detail} Accumulated rainfall: ${s.rainMm} mm.`;
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

function setRiverInfo(id) {
  const info = riverAlerts[id];
  if (!info) return;
  leftPanel.hidden = false;
  forecastBar.hidden = true;
  activeSelection = { type: "river", id };
  document.querySelector("#selectionType").textContent = "River alert";
  document.querySelector("#stationName").textContent = info.title;
  document.querySelector("#stationStatus").textContent = info.status;
  document.querySelector("#stationDetail").textContent = info.detail;
  document.querySelector("#rainText").previousElementSibling.textContent = "River";
  document.querySelector("#rainText").textContent = info.rainValue;
  document.querySelector("#airText").textContent = "Normal";
  document.querySelector("#riskText").textContent = info.risk;
  document.querySelector("#rainMode").textContent = "Flood alert map";
  document.querySelector("#rainToggle").textContent = "River alert";
  document.querySelector("#rainToggle").disabled = true;
  document.querySelector("#routeToggle").hidden = true;
  routeStatus.textContent = "River warning is shown on the flood alert map.";
}

function provinceDetails(stat, name) {
  const alertLevel = stat.river.toLowerCase().includes("red") || stat.alert.toLowerCase().includes("heavy") ? "High" : stat.river.toLowerCase().includes("watch") || stat.river.toLowerCase().includes("warning") ? "Watch" : "Normal";
  return {
    name: name || stat.name,
    condition: stat.rain.replace(" mm", "") > 60 ? "Rainy" : stat.rain.replace(" mm", "") > 35 ? "Cloudy with rain" : "Partly cloudy",
    headline: alertLevel === "High" ? "Heavy rain pockets this week" : alertLevel === "Watch" ? "Rain watch for selected districts" : "Mostly normal weather this week",
    summary: `${stat.name} has ${stat.temp} now, ${stat.rain} recent rainfall and river status ${stat.river}. Suggested action: keep ward offices, schools and health posts informed with simple local messages.`,
    rows: [
      ["Weather", `${stat.temp}, ${stat.alert}`, "Public map can show this as a clear province card."],
      ["Rainfall", `${stat.rain} observed`, "Use DHM rain stations and forecast maps for local planning."],
      ["River level", stat.river, "Highlight only river sections that need watch or warning."],
      ["Public service", alertLevel === "High" ? "Send alert" : "Monitor", "Prepare schools, health posts and ward offices before conditions worsen."]
    ]
  };
}

function hideSmartDetail() {
  if (smartDetailPanel) smartDetailPanel.hidden = true;
}

function showProvinceInfo(index, fallbackName) {
  const stat = provinceStats[index % provinceStats.length];
  const detail = provinceDetails(stat, fallbackName);
  leftPanel.hidden = true;
  forecastBar.hidden = true;
  if (smartDetailPanel) {
    smartDetailPanel.hidden = false;
    document.querySelector("#smartProvinceTitle").textContent = detail.name;
    document.querySelector("#smartCondition").textContent = detail.condition;
    document.querySelector("#smartTemp").textContent = stat.temp;
    document.querySelector("#smartRain").textContent = `Rainfall: ${stat.rain}`;
    document.querySelector("#smartHeadline").textContent = detail.headline;
    document.querySelector("#smartSummary").textContent = detail.summary;
    document.querySelector("#smartToday").textContent = stat.alert;
    document.querySelector("#smartTodayNote").textContent = `River: ${stat.river}`;
    document.querySelector("#smartTomorrow").textContent = stat.rain.replace(" mm", "") > 50 ? "More rain" : "Cloudy";
    document.querySelector("#smartWeek").textContent = stat.river.toLowerCase().includes("red") ? "Flood watch" : "Province watch";
    document.querySelector("#smartTable").innerHTML = detail.rows.map(row => `<article><b>${row[0]}</b><span>${row[1]}</span><small>${row[2]}</small></article>`).join("");
  }
  activeSelection = { type: "province", id: index };
  document.querySelector("#selectionType").textContent = "Smart city";
  document.querySelector("#stationName").textContent = stat.name || fallbackName;
  document.querySelector("#stationStatus").textContent = stat.alert;
  document.querySelector("#stationDetail").textContent = `Current weather ${stat.temp}. Rainfall forecast ${stat.rain}. River status: ${stat.river}. Public message: prepare local offices, schools and health posts if alert level rises.`;
  document.querySelector("#rainText").previousElementSibling.textContent = "Rain";
  document.querySelector("#rainText").textContent = stat.rain;
  document.querySelector("#airText").textContent = stat.temp;
  document.querySelector("#riskText").textContent = stat.river.includes("red") || stat.river.includes("warning") ? "Alert" : "Watch";
  document.querySelector("#rainMode").textContent = "Province summary";
  document.querySelector("#rainToggle").textContent = "Province selected";
  document.querySelector("#rainToggle").disabled = true;
  document.querySelector("#routeToggle").hidden = true;
  routeStatus.textContent = "Province summary from Smart city dashboard.";
}

function handleProvinceTarget(target) {
  const path = target.closest?.("[data-province]");
  if (!path) return false;
  const index = Number(path.dataset.province);
  showProvinceInfo(index, provinceData?.features?.[index] ? provinceName(provinceData.features[index], index) : "");
  return true;
}

function showRouteAlert(item) {
  leftPanel.hidden = false;
  forecastBar.hidden = true;
  activeSelection = { type: "routeAlert", id: item.title };
  document.querySelector("#selectionType").textContent = "Route alert";
  document.querySelector("#stationName").textContent = item.title;
  document.querySelector("#stationStatus").textContent = item.status;
  document.querySelector("#stationDetail").textContent = item.detail;
  document.querySelector("#rainText").previousElementSibling.textContent = "Route";
  document.querySelector("#rainText").textContent = item.routeText;
  document.querySelector("#airText").textContent = item.weather;
  document.querySelector("#riskText").textContent = item.level === "danger" ? "High" : item.level === "watch" ? "Watch" : "Clear";
  document.querySelector("#rainMode").textContent = "Along selected route";
  document.querySelector("#rainToggle").textContent = "Route warning";
  document.querySelector("#rainToggle").disabled = true;
  document.querySelector("#routeToggle").hidden = true;
  routeStatus.textContent = "This warning belongs to the route you searched.";
}

function summarizeRoute(from, to, alerts) {
  leftPanel.hidden = false;
  forecastBar.hidden = true;
  activeSelection = { type: "route", id: `${from.name}-${to.name}` };
  document.querySelector("#selectionType").textContent = "Route alerts";
  document.querySelector("#stationName").textContent = `${from.name} to ${to.name}`;
  document.querySelector("#stationStatus").textContent = alerts.some(a => a.level === "danger") ? "High warning on this journey" : "Weather along the journey";
  document.querySelector("#stationDetail").textContent = alerts.map(a => `${a.title}: ${a.detail}`).join(" ");
  document.querySelector("#rainText").previousElementSibling.textContent = "Rain";
  document.querySelector("#rainText").textContent = `${Math.max(from.rain, to.rain)} mm`;
  document.querySelector("#airText").textContent = `${from.temp} to ${to.temp}`;
  document.querySelector("#riskText").textContent = alerts.some(a => a.level === "danger") ? "High" : "Watch";
  document.querySelector("#rainMode").textContent = "Route focused";
  document.querySelector("#rainToggle").textContent = "Route alerts only";
  document.querySelector("#rainToggle").disabled = true;
  document.querySelector("#routeToggle").hidden = true;
}

function clearRouteSummary(from, to) {
  leftPanel.hidden = true;
  forecastBar.hidden = true;
  activeSelection = { type: "route", id: `${from.name}-${to.name}` };
  routeStatus.textContent = "Tap any route warning to see details.";
}

function setVisibility() {
  const s = stations[activeStation];
  const mode = rainOverride === false || activeSelection.type !== "station" || activeFeature !== "weather" || !layers.has("rain") ? "none" : rainMode(s.rainMm);
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
  document.querySelectorAll("[data-river-alert]").forEach(el => { el.hidden = !riverActive; });
  document.querySelector(".flood-zone").hidden = !layers.has("flood");
  document.querySelector(".slide-zone").hidden = !layers.has("landslide");
  stationButtons.forEach(b => {
    const city = cityWeather[stationToCity[b.dataset.station]];
    const cityMode = activeFeature === "weather" && localWeatherLayer !== "rain";
    b.hidden = !(layers.has("rain") || cityMode);
    b.classList.toggle("weather-city", cityMode);
    b.classList.toggle("rain-point", !cityMode && layers.has("rain"));
    b.classList.remove("air-good", "air-moderate", "air-poor");
    if (cityMode && city) {
      b.innerHTML = weatherDisplay === "air" ? `<b>${city.name}</b><small>AQI ${city.aqi} ${city.air}</small>` : `<b>${city.name}</b><small>${city.temp} C ${city.condition}</small>`;
      b.classList.add(city.aqi < 60 ? "air-good" : city.aqi < 110 ? "air-moderate" : "air-poor");
    } else {
      const station = stations[b.dataset.station];
      b.textContent = station.rainMm;
    }
  });
  route.classList.toggle("active", routeActive);
  riverLine.classList.toggle("active", riverActive);
  provinceLayer.classList.toggle("active", activeFeature === "city");
  dashboard.classList.toggle("satellite-mode", activeFeature === "trekking");
  if (activeFeature !== "city") document.querySelector("#cityPin").hidden = true;
  layerPanel.classList.toggle("weather-only", activeFeature === "weather");
  layerPanel.classList.toggle("hazard-only", activeFeature === "hazard" || activeFeature === "disaster");
  layerPanel.classList.toggle("route-only", activeFeature === "route");
  layerPanel.classList.toggle("city-only", activeFeature === "city");
  layerPanel.classList.toggle("flood-only", activeFeature === "flood");
  if (routeSearchCard) routeSearchCard.hidden = activeFeature !== "route";
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

async function getGallimapsRouteBetween(origin, destination, signal) {
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

function fallbackRouteBetween(fromKey, toKey) {
  const direct = routeCorridors[`${fromKey}-${toKey}`];
  if (direct) return direct;
  const from = routeCities[fromKey], to = routeCities[toKey];
  const points = [];
  for (let i = 0; i <= 6; i++) {
    const t = i / 6;
    const bend = Math.sin(t * Math.PI) * 0.18;
    points.push({
      lat: from.lat + (to.lat - from.lat) * t + bend,
      lng: from.lng + (to.lng - from.lng) * t
    });
  }
  return points;
}

function routeAlertsFor(fromKey, toKey, points) {
  const from = routeCities[fromKey], to = routeCities[toKey];
  const mid = points[Math.floor(points.length / 2)] || from;
  const alerts = [
    {
      lat: from.lat,
      lng: from.lng,
      level: from.rain >= 50 ? "danger" : from.rain >= 20 ? "watch" : "clear",
      icon: from.rain >= 50 ? "!" : "i",
      title: `${from.name} weather`,
      status: from.weather,
      detail: `${from.weather}, ${from.temp}, ${from.rain} mm rain near the start.`,
      routeText: "Start",
      weather: from.temp,
      position: "above"
    },
    {
      lat: mid.lat,
      lng: mid.lng,
      level: "watch",
      icon: "!",
      title: fromKey === "nepalgunj" && toKey === "pokhara" ? "Butwal landslide watch" : "Route weather watch",
      status: fromKey === "nepalgunj" && toKey === "pokhara" ? "Wet slope warning" : "Rain may slow travel",
      detail: fromKey === "nepalgunj" && toKey === "pokhara" ? "Wet hill road section on the way to Pokhara. Drive slowly and avoid night travel if rain increases." : "Rain is possible on the middle section of this route.",
      routeText: "Mid route",
      weather: "Rain watch",
      position: "below"
    },
    {
      lat: to.lat,
      lng: to.lng,
      level: to.rain >= 50 ? "danger" : to.rain >= 20 ? "watch" : "clear",
      icon: to.rain >= 50 ? "!" : "i",
      title: `${to.name} weather`,
      status: to.weather,
      detail: `${to.weather}, ${to.temp}, ${to.rain} mm rain near destination.`,
      routeText: "Destination",
      weather: to.temp,
      position: "above"
    }
  ];
  if (fromKey === "nepalgunj" && toKey === "pokhara") {
    alerts.splice(2, 0, {
      lat: 27.70,
      lng: 83.4484,
      level: "danger",
      icon: "!",
      title: "Tinau flood watch",
      status: "River crossing warning",
      detail: "Flood warning near the Butwal-Tinau section. Avoid low road edges and check river updates.",
      routeText: "River section",
      weather: "Heavy rain",
      position: "above"
    });
  }
  return alerts;
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

async function buildRouteAlertRoute() {
  const fromKey = routeFrom.value;
  const toKey = routeTo.value;
  const from = routeCities[fromKey];
  const to = routeCities[toKey];
  if (!from || !to) return;
  if (fromKey === toKey) {
    routeSearchStatus.textContent = "Choose two different cities.";
    return;
  }
  layers.clear();
  riverActive = false;
  routeActive = true;
  routePoints = fallbackRouteBetween(fromKey, toKey);
  activeRouteAlerts = routeAlertsFor(fromKey, toKey, routePoints);
  state.centerLat = (from.lat + to.lat) / 2;
  state.centerLng = (from.lng + to.lng) / 2;
  state.z = Math.abs(from.lng - to.lng) > 2.2 ? 8 : 9;
  clearRouteSummary(from, to);
  routeSearchStatus.textContent = "Getting route line from GalliMaps...";
  setVisibility();
  render();
  const timer = withTimeout(2600);
  try {
    const apiRoute = await getGallimapsRouteBetween(from, to, timer.controller.signal);
    if (apiRoute.length > 1) routePoints = apiRoute;
    activeRouteAlerts = routeAlertsFor(fromKey, toKey, routePoints);
    routeSearchStatus.textContent = "GalliMaps route line loaded.";
  } catch (error) {
    routePoints = fallbackRouteBetween(fromKey, toKey);
    activeRouteAlerts = routeAlertsFor(fromKey, toKey, routePoints);
    routeSearchStatus.textContent = "Showing clean demo route if the API is unavailable locally.";
  } finally {
    timer.done();
  }
  clearRouteSummary(from, to);
  setVisibility();
  render();
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
  render();
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
  if (b.id === "heatmapDemoToggle") { openHeatmapDemo(); return; }
  if (activeFeature === "weather" && b.dataset.layer === "rain") {
    closeHeatmapDemo();
    localWeatherLayer = "rain";
    layers.clear();
    layers.add("rain");
    activeSelection = { type: "map", id: "rainStations" };
    rainOverride = null;
    leftPanel.hidden = true;
    forecastBar.hidden = true;
    stationButtons.forEach(button => button.classList.remove("active"));
    setVisibility();
    render();
    return;
  }
  if (b.dataset.layer === "hazards") {
    const allOn = hazardLayerNames.every(name => layers.has(name));
    hazardLayerNames.forEach(name => allOn ? layers.delete(name) : layers.add(name));
    if (!allOn) layers.add("hazards"); else layers.delete("hazards");
    setVisibility();
    return;
  }
  if ((activeFeature === "disaster" || activeFeature === "hazard") && hazardLayerNames.includes(b.dataset.layer)) {
    const type = b.dataset.layer;
    if (layers.has(type) && activeSelection.type === "hazard" && activeSelection.id === type) {
      layers.delete(type);
      layers.delete("hazards");
      activeSelection = { type: "map", id: "disaster" };
      leftPanel.hidden = true;
      setVisibility();
      render();
      return;
    }
    layers.add(type);
    if (hazardLayerNames.every(name => layers.has(name))) layers.add("hazards"); else layers.delete("hazards");
    setHazardInfo(type);
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
document.querySelectorAll("[data-river-alert]").forEach(b => b.addEventListener("click", () => setRiverInfo(b.dataset.riverAlert)));
document.querySelector("#rainToggle").addEventListener("click", () => {
  if (activeSelection.type !== "station") return;
  rainOverride = dashboard.dataset.rain === "none";
  setVisibility();
});
document.querySelector("#routeToggle").addEventListener("click", showRoute);
routeSearchCard.addEventListener("submit", e => {
  e.preventDefault();
  buildRouteAlertRoute();
});
document.querySelector("#weatherPill").addEventListener("click", () => document.querySelector("#weatherCard").classList.toggle("open"));
document.querySelector("#closeWeather").addEventListener("click", () => document.querySelector("#weatherCard").classList.remove("open"));
document.querySelector("#closeHeatmapDemo").addEventListener("click", closeHeatmapDemo);
document.querySelectorAll(".timeline button").forEach(b => b.addEventListener("click", () => updateForecast(b.dataset.forecast)));
document.querySelectorAll("[data-month]").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll("[data-month]").forEach(x => x.classList.toggle("active", x === b));
  const month = b.dataset.month;
  document.querySelector("#predictionMonth").textContent = month === "july" ? "July" : "August";
  document.querySelector("#predictionMap").src = month === "july" ? "assets/predicted-rainfall-july.png" : "assets/predicted-rainfall-august.png";
}));
predictionViewButtons.forEach(b => b.addEventListener("click", () => setPredictionView(b.dataset.predictionView)));
provinceLayer.addEventListener("click", e => handleProvinceTarget(e.target));
document.querySelector("#closeSmartDetail").addEventListener("click", hideSmartDetail);
document.querySelectorAll("[data-pred-day]").forEach(button => button.addEventListener("click", () => updatePredictionTimeline({ day: button.dataset.predDay })));
document.querySelectorAll(".play-time").forEach(button => button.addEventListener("click", () => {
  updatePredictionTimeline({ time: button.dataset.time });
}));
function togglePrediction() {
  openPredictionPanel("month");
}

function setPredictionView(view) {
  const weekly = document.querySelector("#weeklyPrediction");
  const monthly = document.querySelector("#monthlyPrediction");
  const monthButtons = document.querySelector(".month-buttons");
  const isMonth = view === "month";
  weekly.hidden = isMonth;
  monthly.hidden = !isMonth;
  monthButtons.hidden = !isMonth;
  document.querySelector("#predictionMonth").textContent = isMonth ? document.querySelector("[data-month].active")?.textContent || "July" : "Weekly";
  predictionViewButtons.forEach(b => b.classList.toggle("active", b.dataset.predictionView === view));
}

function openPredictionPanel(view = "week") {
  const panel = document.querySelector("#predictionPanel");
  panel.classList.remove("collapsed");
  setPredictionView(view);
}

function closePredictionPanel() {
  document.querySelector("#predictionPanel").classList.add("collapsed");
  document.querySelector("#predictionToggle").classList.remove("active");
}

function openHeatmapDemo() {
  if (!heatmapDemoPanel) return;
  heatmapDemoPanel.classList.remove("collapsed");
  document.querySelector("#heatmapDemoToggle").classList.add("active");
}

function closeHeatmapDemo() {
  if (!heatmapDemoPanel) return;
  heatmapDemoPanel.classList.add("collapsed");
  document.querySelector("#heatmapDemoToggle")?.classList.remove("active");
}

function openPredictionMapUi() {
  if (predictionMapUi) predictionMapUi.hidden = false;
  if (predictionRainOverlay) predictionRainOverlay.hidden = false;
}

function closePredictionMapUi() {
  if (predictionMapUi) predictionMapUi.hidden = true;
  if (predictionRainOverlay) predictionRainOverlay.hidden = true;
}

function predictionLabelForDay(day) {
  const labels = {
    fri12: "Fri 12 Jun",
    sat13: "Sat 13 Jun",
    sun14: "Today",
    mon15: "Mon 15 Jun",
    tue16: "Tue 16 Jun",
    wed17: "Wed 17 Jun",
    thu18: "Thu 18 Jun",
    fri19: "Fri 19 Jun"
  };
  return labels[day] || "Today";
}

function updatePredictionTimeline({ day = activePredictionDay, time = activePredictionTime } = {}) {
  if (day === "month") {
    document.querySelectorAll("[data-pred-day]").forEach(item => item.classList.toggle("active", item.dataset.predDay === "month"));
    openPredictionPanel("month");
    return;
  }
  activePredictionDay = day;
  activePredictionTime = time;
  closePredictionPanel();
  document.querySelectorAll("[data-pred-day]").forEach(item => item.classList.toggle("active", item.dataset.predDay === activePredictionDay));
  document.querySelectorAll(".play-time").forEach(item => item.classList.toggle("active", item.dataset.time === activePredictionTime));
  document.querySelector("#predictionTime").textContent = activePredictionTime;
  document.querySelector(".prediction-time-badge span").textContent = `${predictionLabelForDay(activePredictionDay)} forecast`;
  render();
}

async function loadProvinceMap() {
  if (provinceData || provinceLoading) {
    render();
    return;
  }
  provinceLoading = true;
  try {
    const response = await fetch("assets/province.geojson");
    if (!response.ok) throw new Error("province map failed");
    provinceData = await response.json();
  } catch (error) {
    provinceData = { features: [] };
  } finally {
    provinceLoading = false;
    render();
  }
}

function setFeature(id) {
  const feature = features[id];
  if (!feature) return;
  activeFeature = id;
  layerPanel.hidden = false;
  riverActive = false;
  if (id !== "route" && id !== "trekking") routeActive = false;
  if (id !== "prediction") closePredictionPanel();
  if (id !== "prediction") closePredictionMapUi();
  if (id !== "city") hideSmartDetail();
  if (id !== "weather") closeHeatmapDemo();
  featureButtons.forEach(b => b.classList.toggle("active", b.dataset.feature === id));
  if (id === "weather") setWeatherMode();
  else if (id === "route") setRouteWeatherMode();
  else if (id === "disaster") setHazardMode();
  else if (id === "flood") setFloodMode();
  else if (id === "city") setSmartCityMode();
  else if (id === "prediction") setPredictionMode();
  else if (id === "landslide") setLandslideMode();
  setVisibility();
  render();
}

function setMenuTitle(label) {
  document.querySelector(".layer-panel .panel-title span").textContent = "Map menu";
  document.querySelector(".layer-panel .panel-title b").textContent = label;
}

function setWeatherMode() {
  setMenuTitle("Local weather");
  layers.clear();
  localWeatherLayer = weatherDisplay;
  state.centerLat = 28.15;
  state.centerLng = 84.25;
  state.z = 7;
  activeSelection = { type: "map", id: "weather" };
  leftPanel.hidden = true;
  forecastBar.hidden = true;
}

function setHazardMode() {
  setMenuTitle("Disaster alert");
  layers.clear();
  hazardLayerNames.forEach(name => layers.add(name));
  layers.add("hazards");
  riverActive = false;
  routeActive = false;
  activeRouteAlerts = [];
  state.centerLat = 28.15;
  state.centerLng = 84.25;
  state.z = 7;
  activeSelection = { type: "map", id: "disaster" };
  leftPanel.hidden = true;
  forecastBar.hidden = true;
  routeStatus.textContent = "";
}

function setRouteWeatherMode() {
  setMenuTitle("Route alerts");
  layers.clear();
  activeRouteAlerts = [];
  routeActive = false;
  routeFrom.value = "nepalgunj";
  routeTo.value = "pokhara";
  routePoints = [];
  routeSearchStatus.textContent = "Choose a route and check weather before travel.";
  leftPanel.hidden = true;
  forecastBar.hidden = true;
  activeSelection = { type: "map", id: "routeSearch" };
  routeStatus.textContent = "";
}

function setLandslideMode() {
  setMenuTitle("Landslide risk");
  layers.clear();
  layers.add("landslide");
  activeFeature = "hazard";
  state.centerLat = 28.2096;
  state.centerLng = 83.9856;
  state.z = 11;
  setHazardInfo("landslide");
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
  setMenuTitle("Flood alert map");
  layers.clear();
  riverActive = true;
  routeActive = false;
  activeRouteAlerts = [];
  state.centerLat = 28.1;
  state.centerLng = 83.35;
  state.z = 7;
  activeSelection = { type: "riverMap", id: "flood" };
  leftPanel.hidden = true;
  forecastBar.hidden = true;
  routeStatus.textContent = "";
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
  riverActive = false;
  routeActive = false;
  activeRouteAlerts = [];
  document.querySelector("#cityPin").hidden = true;
  state.centerLat = 28.25;
  state.centerLng = 84.2;
  state.z = 7;
  activeSelection = { type: "map", id: "city" };
  leftPanel.hidden = true;
  hideSmartDetail();
  forecastBar.hidden = true;
  routeStatus.textContent = "";
  loadProvinceMap();
}

function setPredictionMode() {
  setMenuTitle("Rainfall prediction");
  layerPanel.hidden = true;
  layers.clear();
  riverActive = false;
  routeActive = false;
  activeRouteAlerts = [];
  document.querySelector("#cityPin").hidden = true;
  state.centerLat = 28.15;
  state.centerLng = 84.25;
  state.z = 7;
  activeSelection = { type: "map", id: "prediction" };
  leftPanel.hidden = true;
  forecastBar.hidden = true;
  routeStatus.textContent = "";
  closePredictionPanel();
  openPredictionMapUi();
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
  if (e.target.closest("button,.left-panel,.layer-panel,.prediction-panel,.prediction-map-ui,.smart-detail-panel,.forecast-bar,.weather-pill,.weather-card,.map-tools,.topbar,.province-layer")) return;
  if (activeFeature === "city") {
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
  closeHeatmapDemo();
  weatherDisplay = "weather";
  localWeatherLayer = "weather";
  layers.clear();
  document.querySelector("#weatherView").classList.add("active");
  document.querySelector("#airView").classList.remove("active");
  if (activeFeature === "weather") {
    activeSelection = { type: "map", id: "weather" };
    leftPanel.hidden = true;
    forecastBar.hidden = true;
  }
  setVisibility();
  render();
});
document.querySelector("#airView").addEventListener("click", () => {
  closeHeatmapDemo();
  weatherDisplay = "air";
  localWeatherLayer = "air";
  layers.clear();
  document.querySelector("#airView").classList.add("active");
  document.querySelector("#weatherView").classList.remove("active");
  if (activeFeature === "weather") {
    activeSelection = { type: "map", id: "air" };
    leftPanel.hidden = true;
    forecastBar.hidden = true;
  }
  setVisibility();
  render();
});
updateForecast("now");
setVisibility();
render();
