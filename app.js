/* ================================================================== */
/*  Index definitions with exchange coordinates                       */
/* ================================================================== */

const INDICES = [
  { sym: "^GSPC",      name: "S&P 500",             co: "United States",  fl: "\u{1F1FA}\u{1F1F8}", rg: "Americas",     desc: "Large cap benchmark covering approximately 80% of U.S. equity market capitalization.",             lat: 40.71,  lng: -74.01 },
  { sym: "^GSPTSE",    name: "S&P/TSX Composite",   co: "Canada",         fl: "\u{1F1E8}\u{1F1E6}", rg: "Americas",     desc: "Broad benchmark for the Canadian equity market.",                                                   lat: 43.65,  lng: -79.38 },
  { sym: "^BVSP",      name: "Ibovespa",            co: "Brazil",         fl: "\u{1F1E7}\u{1F1F7}", rg: "Americas",     desc: "Main benchmark of Brazilian equities.",                                                            lat: -23.55, lng: -46.63 },
  { sym: "^MXX",       name: "S&P/BMV IPC",         co: "Mexico",         fl: "\u{1F1F2}\u{1F1FD}", rg: "Americas",     desc: "Flagship Mexican equity index.",                                                                   lat: 19.43,  lng: -99.13 },

  { sym: "^FTSE",      name: "FTSE 100",            co: "United Kingdom", fl: "\u{1F1EC}\u{1F1E7}", rg: "Europe",       desc: "Large cap index representing the largest companies listed in London.",                              lat: 51.51,  lng: -0.13  },
  { sym: "^GDAXI",     name: "DAX",                 co: "Germany",        fl: "\u{1F1E9}\u{1F1EA}", rg: "Europe",       desc: "Tracks 40 major German blue chip companies.",                                                      lat: 50.11,  lng: 8.68   },
  { sym: "^FCHI",      name: "CAC 40",              co: "France",         fl: "\u{1F1EB}\u{1F1F7}", rg: "Europe",       desc: "Leading benchmark of large French equities.",                                                      lat: 48.86,  lng: 2.35   },
  { sym: "^SSMI",      name: "SMI",                 co: "Switzerland",    fl: "\u{1F1E8}\u{1F1ED}", rg: "Europe",       desc: "Swiss Market Index covering major Swiss blue chips.",                                               lat: 47.38,  lng: 8.54   },
  { sym: "^AEX",       name: "AEX",                 co: "Netherlands",    fl: "\u{1F1F3}\u{1F1F1}", rg: "Europe",       desc: "Tracks leading Dutch listed companies.",                                                           lat: 52.37,  lng: 4.90   },
  { sym: "FTSEMIB.MI", name: "FTSE MIB",            co: "Italy",          fl: "\u{1F1EE}\u{1F1F9}", rg: "Europe",       desc: "Large cap Italian equity benchmark.",                                                              lat: 45.46,  lng: 9.19   },
  { sym: "^IBEX",      name: "IBEX 35",             co: "Spain",          fl: "\u{1F1EA}\u{1F1F8}", rg: "Europe",       desc: "Principal Spanish stock market index.",                                                            lat: 40.42,  lng: -3.70  },

  { sym: "^N225",      name: "Nikkei 225",          co: "Japan",          fl: "\u{1F1EF}\u{1F1F5}", rg: "Asia Pacific", desc: "Price weighted index of major Japanese companies.",                                                lat: 35.68,  lng: 139.69 },
  { sym: "000300.SS",  name: "CSI 300",             co: "China",          fl: "\u{1F1E8}\u{1F1F3}", rg: "Asia Pacific", desc: "Represents large and mid cap A-shares from Shanghai and Shenzhen.",                                lat: 31.23,  lng: 121.47 },
  { sym: "^NSEI",      name: "NIFTY 50",            co: "India",          fl: "\u{1F1EE}\u{1F1F3}", rg: "Asia Pacific", desc: "Tracks 50 major Indian companies listed on NSE.",                                                  lat: 19.08,  lng: 72.88  },
  { sym: "^KS11",      name: "KOSPI",               co: "South Korea",    fl: "\u{1F1F0}\u{1F1F7}", rg: "Asia Pacific", desc: "Primary benchmark of the Korean equity market.",                                                   lat: 37.57,  lng: 126.98 },
  { sym: "^AXJO",      name: "S&P/ASX 200",         co: "Australia",      fl: "\u{1F1E6}\u{1F1FA}", rg: "Asia Pacific", desc: "Covers the 200 largest companies listed in Australia.",                                            lat: -33.87, lng: 151.21 },
  { sym: "^HSI",       name: "Hang Seng Index",     co: "Hong Kong",      fl: "\u{1F1ED}\u{1F1F0}", rg: "Asia Pacific", desc: "Tracks major companies listed in Hong Kong.",                                                      lat: 22.32,  lng: 114.17 },
  { sym: "^STI",       name: "Straits Times Index",  co: "Singapore",     fl: "\u{1F1F8}\u{1F1EC}", rg: "Asia Pacific", desc: "Benchmark for Singapore\u2019s leading listed firms.",                                              lat: 1.35,   lng: 103.82 },

  { sym: "^J200.JO",   name: "FTSE/JSE Top 40",     co: "South Africa",  fl: "\u{1F1FF}\u{1F1E6}", rg: "Africa",       desc: "Large cap benchmark for South Africa.",                                                            lat: -26.20, lng: 28.04  },
];

const CORS_PROXIES = [
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
];

const YAHOO_CHART_BASE = "https://query1.finance.yahoo.com/v8/finance/chart/";

/* ================================================================== */
/*  State                                                             */
/* ================================================================== */

let cache = {};
let latestResults = [];
let autoRefreshTimer = null;
const markerMap = {};
let map;
let loadedCount = 0;

/* ================================================================== */
/*  Networking                                                        */
/* ================================================================== */

async function proxyFetch(url) {
  for (const wrapUrl of CORS_PROXIES) {
    try {
      const res = await fetch(wrapUrl(url), {
        signal: AbortSignal.timeout(12_000),
      });
      if (!res.ok) continue;
      return JSON.parse(await res.text());
    } catch {
      continue;
    }
  }
  throw new Error("All CORS proxies failed");
}

async function fetchIndex(index) {
  const url =
    YAHOO_CHART_BASE +
    encodeURIComponent(index.sym) +
    "?range=1d&interval=5m";

  const json = await proxyFetch(url);
  const result = json.chart.result[0];
  const meta = result.meta;

  const price = meta.regularMarketPrice;
  const previousClose = meta.chartPreviousClose;
  const change = price - previousClose;
  const changePercent = previousClose ? (change / previousClose) * 100 : 0;

  const rawCloses = result.indicators?.quote?.[0]?.close ?? [];
  const closes = rawCloses.filter((v) => v != null);

  const dayHigh = closes.length ? Math.max(...closes) : price;
  const dayLow = closes.length ? Math.min(...closes) : price;
  const currency = meta.currency || "";

  const tradingPeriod = meta.currentTradingPeriod?.regular;
  let marketOpen = false;
  if (tradingPeriod) {
    const now = Math.floor(Date.now() / 1000);
    marketOpen = now >= tradingPeriod.start && now <= tradingPeriod.end;
  }

  return {
    ...index,
    price,
    previousClose,
    change,
    changePercent,
    closes,
    dayHigh,
    dayLow,
    currency,
    marketTime: meta.regularMarketTime,
    marketOpen,
    ok: true,
  };
}

/* ================================================================== */
/*  Formatting helpers                                                */
/* ================================================================== */

function formatPrice(n) {
  if (n == null || isNaN(n)) return "\u2014";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function formatChange(n) {
  if (n == null) return "\u2014";
  return (n >= 0 ? "+" : "") + formatPrice(n);
}

function formatPercent(n) {
  if (n == null) return "\u2014";
  return (n >= 0 ? "+" : "") + n.toFixed(2) + "%";
}

/* ================================================================== */
/*  Sparkline SVG builder (wider for popups)                          */
/* ================================================================== */

function buildSparkline(closes, isPositive) {
  if (!closes || closes.length < 2) return "";

  const W = 260;
  const H = 40;
  const PAD = 2;
  const lo = Math.min(...closes);
  const hi = Math.max(...closes);
  const range = hi - lo || 1;

  const points = closes.map((v, i) => {
    const x = PAD + (i / (closes.length - 1)) * (W - 2 * PAD);
    const y = PAD + (1 - (v - lo) / range) * (H - 2 * PAD);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const color = isPositive ? "var(--pos)" : "var(--neg)";
  const gid = "g" + Math.random().toString(36).slice(2, 8);
  const areaPoints = [
    ...points,
    `${(PAD + W - 2 * PAD).toFixed(1)},${H}`,
    `${PAD},${H}`,
  ].join(" ");

  return `
    <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
      <defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="${color}" stop-opacity=".3"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <polygon  points="${areaPoints}" fill="url(#${gid})"/>
      <polyline points="${points.join(" ")}" fill="none" stroke="${color}"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
}

/* ================================================================== */
/*  Popup HTML builder                                                */
/* ================================================================== */

function buildPopupHTML(data) {
  const positive = data.change >= 0;
  const arrow = positive ? "\u25B2" : "\u25BC";
  const chgClass = positive ? "pos" : "neg";
  const statusHTML = data.marketOpen
    ? '<span class="popup-open">\u25CF Open</span>'
    : '<span class="popup-closed">\u25CF Closed</span>';

  return `
    <div class="popup-card">
      <div class="popup-hdr">
        <span>${data.fl} ${data.co}</span>
        ${statusHTML}
      </div>
      <div class="popup-name">${data.name}</div>
      <div class="popup-price">${formatPrice(data.price)}</div>
      <div class="popup-chg ${chgClass}">
        ${arrow} ${formatChange(data.change)}
        <span class="popup-badge">${formatPercent(data.changePercent)}</span>
      </div>
      <div class="popup-spark">${buildSparkline(data.closes, positive)}</div>
      <div class="popup-details">
        <span>
          <span class="popup-detail-label">Prev Close</span>
          <span class="popup-detail-val">${formatPrice(data.previousClose)}</span>
        </span>
        <span>
          <span class="popup-detail-label">Day Range</span>
          <span class="popup-detail-val">${formatPrice(data.dayLow)} \u2013 ${formatPrice(data.dayHigh)}</span>
        </span>
      </div>
      <div class="popup-desc">${data.desc}</div>
    </div>`;
}

/* ================================================================== */
/*  Map & marker management                                           */
/* ================================================================== */

function initMap() {
  map = L.map("map", {
    center: [25, 15],
    zoom: 2.5,
    minZoom: 2,
    maxZoom: 8,
    zoomControl: false,
    attributionControl: false,
    worldCopyJump: true,
  });

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
    { maxZoom: 19, subdomains: "abcd" }
  ).addTo(map);

  L.control.zoom({ position: "topright" }).addTo(map);
}

function placeLoadingMarkers() {
  INDICES.forEach((idx) => {
    const marker = L.circleMarker([idx.lat, idx.lng], {
      radius: 6,
      fillColor: "#525c74",
      fillOpacity: 0.6,
      color: "#525c74",
      weight: 3,
      opacity: 0.25,
    }).addTo(map);

    marker.bindTooltip(
      `<span class="tt-name">${idx.name}</span> <span class="tt-pct" style="color:var(--text-muted)">loading\u2026</span>`,
      { className: "idx-tooltip", direction: "top", offset: [0, -8] }
    );

    markerMap[idx.sym] = marker;
  });
}

function updateMarker(data) {
  const marker = markerMap[data.sym];
  if (!marker) return;

  if (data.err) {
    marker.setStyle({
      fillColor: "#ef4444",
      color: "#ef4444",
      fillOpacity: 0.4,
      opacity: 0.2,
    });
    marker.unbindTooltip();
    marker.bindTooltip(
      `<span class="tt-name">${data.name}</span> <span class="tt-pct down">failed</span>`,
      { className: "idx-tooltip", direction: "top", offset: [0, -8] }
    );
    return;
  }

  const positive = data.change >= 0;
  const color = positive ? "#22c55e" : "#ef4444";

  marker.setStyle({
    fillColor: color,
    color: color,
    fillOpacity: 0.85,
    opacity: 0.35,
    weight: 4,
  });
  marker.setRadius(7);

  marker.unbindTooltip();
  marker.bindTooltip(
    `<span class="tt-name">${data.name}</span> <span class="tt-pct ${positive ? "up" : "down"}">${formatPercent(data.changePercent)}</span>`,
    { className: "idx-tooltip", direction: "top", offset: [0, -8] }
  );

  marker.unbindPopup();
  marker.bindPopup(buildPopupHTML(data), {
    className: "idx-popup",
    maxWidth: 340,
    minWidth: 280,
  });

  // Hover effect
  marker.off("mouseover mouseout");
  marker.on("mouseover", function () {
    this.setRadius(10);
    this.setStyle({ fillOpacity: 1, opacity: 0.5, weight: 5 });
  });
  marker.on("mouseout", function () {
    this.setRadius(7);
    this.setStyle({ fillOpacity: 0.85, opacity: 0.35, weight: 4 });
  });
}

/* ================================================================== */
/*  Summary panel                                                     */
/* ================================================================== */

function renderSummary(list, total) {
  const loaded = list.filter((d) => d.ok);
  const failed = list.filter((d) => d.err);
  const up = loaded.filter((d) => d.change > 0).length;
  const down = loaded.filter((d) => d.change < 0).length;

  let best = null;
  let worst = null;
  loaded.forEach((d) => {
    if (!best || d.changePercent > best.changePercent) best = d;
    if (!worst || d.changePercent < worst.changePercent) worst = d;
  });

  const doneCount = loaded.length + failed.length;
  const loading = doneCount < total;

  let html = `
    <div class="panel-row"><span class="panel-dot up"></span><span class="panel-label">Advancing</span><span class="panel-val">${up}</span></div>
    <div class="panel-row"><span class="panel-dot down"></span><span class="panel-label">Declining</span><span class="panel-val">${down}</span></div>`;

  if (best && worst && loaded.length > 1) {
    html += `<div class="panel-divider"></div>`;
    html += `<div class="panel-perf">Best: <strong>${best.name}</strong> <span class="up">${formatPercent(best.changePercent)}</span></div>`;
    html += `<div class="panel-perf">Worst: <strong>${worst.name}</strong> <span class="down">${formatPercent(worst.changePercent)}</span></div>`;
  }

  if (loading) {
    html += `<div class="panel-progress">Loading ${doneCount}/${total}\u2026</div>`;
  }

  document.getElementById("summaryPanel").innerHTML = html;
}

/* ================================================================== */
/*  Data loading — streams each marker as it arrives                  */
/* ================================================================== */

async function refresh() {
  const btn = document.getElementById("btnRef");
  btn.classList.add("spin");

  // Reset markers to loading state
  INDICES.forEach((idx) => {
    const m = markerMap[idx.sym];
    if (m) {
      m.setStyle({
        fillColor: "#525c74",
        color: "#525c74",
        fillOpacity: 0.6,
        opacity: 0.25,
        weight: 3,
      });
      m.setRadius(6);
      m.unbindPopup();
      m.unbindTooltip();
      m.bindTooltip(
        `<span class="tt-name">${idx.name}</span> <span class="tt-pct" style="color:var(--text-muted)">loading\u2026</span>`,
        { className: "idx-tooltip", direction: "top", offset: [0, -8] }
      );
      m.off("mouseover mouseout");
    }
  });

  latestResults = INDICES.map((i) => ({ ...i, ok: false, err: false }));
  loadedCount = 0;
  renderSummary(latestResults, INDICES.length);

  const promises = INDICES.map(async (idx, i) => {
    try {
      const result = await fetchIndex(idx);
      cache[idx.sym] = result;
      latestResults[i] = result;
      updateMarker(result);
      renderSummary(latestResults, INDICES.length);
    } catch {
      const errData = { ...idx, ok: false, err: true };
      latestResults[i] = errData;
      updateMarker(errData);
      renderSummary(latestResults, INDICES.length);
    }
  });

  await Promise.all(promises);

  renderSummary(latestResults, INDICES.length);
  document.getElementById("ts").textContent =
    "Updated " + new Date().toLocaleTimeString();
  btn.classList.remove("spin");
}

/* ================================================================== */
/*  Bootstrap                                                         */
/* ================================================================== */

document.getElementById("headerDate").textContent =
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

document.getElementById("arToggle").addEventListener("change", function () {
  clearInterval(autoRefreshTimer);
  autoRefreshTimer = this.checked ? setInterval(refresh, 60_000) : null;
});

document.getElementById("btnRef").addEventListener("click", refresh);

initMap();
placeLoadingMarkers();
refresh();
