/* ================================================================== */
/*  Index definitions with exchange coordinates                       */
/* ================================================================== */

const INDICES = [
  // Americas                                                                                                                                                                                          tz                        open    close
  { sym: "^GSPC",      name: "S&P 500",             co: "United States",  fl: "\u{1F1FA}\u{1F1F8}", desc: "Large cap benchmark covering approximately 80% of U.S. equity market capitalization.",      lat: 40.71,  lng: -74.01, tz: "America/New_York",      mktOpen: [9,30],  mktClose: [16,0]  },
  { sym: "^GSPTSE",    name: "S&P/TSX Composite",   co: "Canada",         fl: "\u{1F1E8}\u{1F1E6}", desc: "Broad benchmark for the Canadian equity market.",                                          lat: 43.65,  lng: -79.38, tz: "America/Toronto",       mktOpen: [9,30],  mktClose: [16,0]  },
  { sym: "^BVSP",      name: "Ibovespa",            co: "Brazil",         fl: "\u{1F1E7}\u{1F1F7}", desc: "Main benchmark of Brazilian equities.",                                                    lat: -23.55, lng: -46.63, tz: "America/Sao_Paulo",     mktOpen: [10,0],  mktClose: [17,30] },
  { sym: "^MXX",       name: "S&P/BMV IPC",         co: "Mexico",         fl: "\u{1F1F2}\u{1F1FD}", desc: "Flagship Mexican equity index.",                                                           lat: 19.43,  lng: -99.13, tz: "America/Mexico_City",   mktOpen: [8,30],  mktClose: [15,0]  },

  // Europe
  { sym: "^FTSE",      name: "FTSE 100",            co: "United Kingdom", fl: "\u{1F1EC}\u{1F1E7}", desc: "Large cap index representing the largest companies listed in London.",                      lat: 51.51,  lng: -0.13,  tz: "Europe/London",         mktOpen: [8,0],   mktClose: [16,30] },
  { sym: "^GDAXI",     name: "DAX",                 co: "Germany",        fl: "\u{1F1E9}\u{1F1EA}", desc: "Tracks 40 major German blue chip companies.",                                              lat: 50.11,  lng: 8.68,   tz: "Europe/Berlin",         mktOpen: [9,0],   mktClose: [17,30] },
  { sym: "^FCHI",      name: "CAC 40",              co: "France",         fl: "\u{1F1EB}\u{1F1F7}", desc: "Leading benchmark of large French equities.",                                               lat: 48.86,  lng: 2.35,   tz: "Europe/Paris",          mktOpen: [9,0],   mktClose: [17,30] },
  { sym: "^SSMI",      name: "SMI",                 co: "Switzerland",    fl: "\u{1F1E8}\u{1F1ED}", desc: "Swiss Market Index covering major Swiss blue chips.",                                       lat: 47.38,  lng: 8.54,   tz: "Europe/Zurich",         mktOpen: [9,0],   mktClose: [17,30] },
  { sym: "^AEX",       name: "AEX",                 co: "Netherlands",    fl: "\u{1F1F3}\u{1F1F1}", desc: "Tracks leading Dutch listed companies.",                                                   lat: 52.37,  lng: 4.90,   tz: "Europe/Amsterdam",      mktOpen: [9,0],   mktClose: [17,30] },
  { sym: "FTSEMIB.MI", name: "FTSE MIB",            co: "Italy",          fl: "\u{1F1EE}\u{1F1F9}", desc: "Large cap Italian equity benchmark.",                                                      lat: 45.46,  lng: 9.19,   tz: "Europe/Rome",           mktOpen: [9,0],   mktClose: [17,30] },
  { sym: "^IBEX",      name: "IBEX 35",             co: "Spain",          fl: "\u{1F1EA}\u{1F1F8}", desc: "Principal Spanish stock market index.",                                                     lat: 40.42,  lng: -3.70,  tz: "Europe/Madrid",         mktOpen: [9,0],   mktClose: [17,30] },

  // Asia Pacific
  { sym: "^N225",      name: "Nikkei 225",          co: "Japan",          fl: "\u{1F1EF}\u{1F1F5}", desc: "Price weighted index of major Japanese companies.",                                         lat: 35.68,  lng: 139.69, tz: "Asia/Tokyo",            mktOpen: [9,0],   mktClose: [15,0]  },
  { sym: "000300.SS",  name: "CSI 300",             co: "China",          fl: "\u{1F1E8}\u{1F1F3}", desc: "Represents large and mid cap A-shares from Shanghai and Shenzhen.",                         lat: 31.23,  lng: 121.47, tz: "Asia/Shanghai",         mktOpen: [9,30],  mktClose: [15,0]  },
  { sym: "^NSEI",      name: "NIFTY 50",            co: "India",          fl: "\u{1F1EE}\u{1F1F3}", desc: "Tracks 50 major Indian companies listed on NSE.",                                           lat: 19.08,  lng: 72.88,  tz: "Asia/Kolkata",          mktOpen: [9,15],  mktClose: [15,30] },
  { sym: "^KS11",      name: "KOSPI",               co: "South Korea",    fl: "\u{1F1F0}\u{1F1F7}", desc: "Primary benchmark of the Korean equity market.",                                            lat: 37.57,  lng: 126.98, tz: "Asia/Seoul",            mktOpen: [9,0],   mktClose: [15,30] },
  { sym: "^AXJO",      name: "S&P/ASX 200",         co: "Australia",      fl: "\u{1F1E6}\u{1F1FA}", desc: "Covers the 200 largest companies listed in Australia.",                                     lat: -33.87, lng: 151.21, tz: "Australia/Sydney",       mktOpen: [10,0],  mktClose: [16,0]  },
  { sym: "^HSI",       name: "Hang Seng Index",     co: "Hong Kong",      fl: "\u{1F1ED}\u{1F1F0}", desc: "Tracks major companies listed in Hong Kong.",                                               lat: 22.32,  lng: 114.17, tz: "Asia/Hong_Kong",        mktOpen: [9,30],  mktClose: [16,0]  },
  { sym: "^STI",       name: "Straits Times Index",  co: "Singapore",     fl: "\u{1F1F8}\u{1F1EC}", desc: "Benchmark for Singapore\u2019s leading listed firms.",                                      lat: 1.35,   lng: 103.82, tz: "Asia/Singapore",        mktOpen: [9,0],   mktClose: [17,0]  },

  // Africa
  { sym: "^J200.JO",   name: "FTSE/JSE Top 40",     co: "South Africa",  fl: "\u{1F1FF}\u{1F1E6}", desc: "Large cap benchmark for South Africa.",                                                     lat: -26.20, lng: 28.04,  tz: "Africa/Johannesburg",   mktOpen: [9,0],   mktClose: [17,0]  },
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
        headers: { "Cache-Control": "no-cache" },
      });
      if (!res.ok) continue;
      return JSON.parse(await res.text());
    } catch {
      continue;
    }
  }
  throw new Error("All CORS proxies failed");
}

/* ================================================================== */
/*  Deterministic session state from hardcoded trading hours           */
/* ================================================================== */

function getSessionState(index) {
  const now = new Date();
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: index.tz,
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value])
  );

  const weekday = parts.weekday;
  if (weekday === "Sat" || weekday === "Sun") return "closed";

  const mins = parseInt(parts.hour) * 60 + parseInt(parts.minute);
  const openMins  = index.mktOpen[0]  * 60 + index.mktOpen[1];
  const closeMins = index.mktClose[0] * 60 + index.mktClose[1];

  if (mins >= openMins && mins <= closeMins) return "open";
  return "closed";
}

/* ================================================================== */
/*  Fetch a single index from Yahoo Finance                           */
/* ================================================================== */

function dateFmtForTz(tz) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" });
}

function shouldHaveTraded(index, isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(y, m - 1, d, 12, 0, 0);
  const dayName = dt.toLocaleDateString("en-US", { weekday: "short" });
  if (dayName === "Sat" || dayName === "Sun") return false;

  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: index.tz,
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value])
  );
  const nowMins = parseInt(parts.hour) * 60 + parseInt(parts.minute);
  const openMins = index.mktOpen[0] * 60 + index.mktOpen[1];

  const todayInTz = dateFmtForTz(index.tz).format(new Date());
  if (isoDate !== todayInTz) return true;
  return nowMins >= openMins;
}

function friendlyDate(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

async function fetchIndex(index) {
  const cacheBust = Math.floor(Date.now() / 30_000);
  const url =
    YAHOO_CHART_BASE +
    encodeURIComponent(index.sym) +
    `?range=5d&interval=5m&_=${cacheBust}`;

  const json = await proxyFetch(url);
  const result = json.chart.result[0];
  const meta = result.meta;

  const timestamps = result.timestamp ?? [];
  const rawCloses = result.indicators?.quote?.[0]?.close ?? [];
  const chartPrevClose = meta.chartPreviousClose;
  const dateFmt = dateFmtForTz(index.tz);

  // Group datapoints by calendar date in exchange timezone
  const dayBuckets = {};
  timestamps.forEach((ts, i) => {
    const dateStr = dateFmt.format(new Date(ts * 1000));
    if (!dayBuckets[dateStr]) dayBuckets[dateStr] = [];
    dayBuckets[dateStr].push(rawCloses[i]);
  });

  const sortedDates = Object.keys(dayBuckets).sort();

  // Build per-day session objects
  const days = [];
  let prevClose = chartPrevClose;
  for (const dateStr of sortedDates) {
    const validCloses = dayBuckets[dateStr].filter((v) => v != null);
    if (!validCloses.length) continue;
    const lastClose = validCloses[validCloses.length - 1];
    const change = lastClose - prevClose;
    const changePercent = prevClose ? (change / prevClose) * 100 : 0;
    days.push({
      date: dateStr,
      label: friendlyDate(dateStr),
      prevClose,
      lastClose,
      change,
      changePercent,
      closes: validCloses,
      dayHigh: Math.max(...validCloses),
      dayLow: Math.min(...validCloses),
    });
    prevClose = lastClose;
  }

  // Most recent session drives marker color
  const latest = days[days.length - 1] || {};
  const price = meta.regularMarketPrice;
  let session = getSessionState(index);

  // If getSessionState says "open" but our data doesn't include today,
  // the market just opened and Yahoo hasn't streamed data yet — treat as closed
  const todayStr = dateFmtForTz(index.tz).format(new Date());
  if (session === "open" && latest.date && latest.date !== todayStr) {
    session = "closed";
  }

  return {
    ...index,
    price,
    previousClose: latest.prevClose,
    change: latest.change ?? 0,
    changePercent: latest.changePercent ?? 0,
    closes: latest.closes ?? [],
    dayHigh: latest.dayHigh ?? price,
    dayLow: latest.dayLow ?? price,
    currency: meta.currency || "",
    marketTime: meta.regularMarketTime,
    session,
    days,
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

function buildPopupHTML(data, globalDates) {
  const days = data.days || [];
  const dayByDate = {};
  days.forEach((d) => (dayByDate[d.date] = d));

  const [newestDate, olderDate] = globalDates || [];
  const newestDay = newestDate ? dayByDate[newestDate] : days[days.length - 1];
  const olderDay  = olderDate  ? dayByDate[olderDate]  : (days.length > 1 ? days[days.length - 2] : null);

  const displayDay = newestDay || days[days.length - 1];
  const positive = displayDay ? displayDay.changePercent >= 0 : data.change >= 0;
  const arrow = positive ? "\u25B2" : "\u25BC";
  const chgClass = positive ? "pos" : "neg";

  const statusHTML = data.session === "open"
    ? '<span class="popup-open">\u25CF Live</span>'
    : '<span class="popup-closed">\u25CF Closed</span>';

  let newestSection;
  if (newestDay) {
    newestSection = `
      <div class="popup-price">${formatPrice(newestDay.lastClose)} <span class="popup-date">${newestDay.label}</span></div>
      <div class="popup-chg ${chgClass}">
        ${arrow} ${formatChange(newestDay.change)}
        <span class="popup-badge">${formatPercent(newestDay.changePercent)}</span>
      </div>`;
  } else {
    const lastActual = days[days.length - 1];
    const traded = newestDate ? shouldHaveTraded(data, newestDate) : false;
    const noDataLabel = traded ? "Holiday" : "Not opened yet";
    newestSection = `
      <div class="popup-price">${lastActual ? formatPrice(lastActual.lastClose) : "\u2014"}</div>
      <div class="popup-chg" style="color:var(--text-muted)">${newestDate ? friendlyDate(newestDate) : ""}: ${noDataLabel}</div>`;
  }

  let prevSessionHTML = "";
  if (olderDay) {
    const prevPos = olderDay.changePercent >= 0;
    const prevArrow = prevPos ? "\u25B2" : "\u25BC";
    const prevCls = prevPos ? "pos" : "neg";
    prevSessionHTML = `
      <div class="popup-prev">
        <span class="popup-prev-label">${olderDay.label}</span>
        <span class="popup-prev-chg ${prevCls}">${prevArrow} ${formatPercent(olderDay.changePercent)}</span>
      </div>`;
  }

  const sparkDay = displayDay || {};

  return `
    <div class="popup-card">
      <div class="popup-hdr">
        <span>${data.fl} ${data.co}</span>
        ${statusHTML}
      </div>
      <div class="popup-name">${data.name}</div>
      ${newestSection}
      ${prevSessionHTML}
      <div class="popup-spark">${buildSparkline(sparkDay.closes || data.closes, positive)}</div>
      <div class="popup-details">
        <span>
          <span class="popup-detail-label">Prev Close</span>
          <span class="popup-detail-val">${formatPrice(displayDay ? displayDay.prevClose : data.previousClose)}</span>
        </span>
        <span>
          <span class="popup-detail-label">Day Range</span>
          <span class="popup-detail-val">${formatPrice(displayDay ? displayDay.dayLow : data.dayLow)} \u2013 ${formatPrice(displayDay ? displayDay.dayHigh : data.dayHigh)}</span>
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

  marker.unbindTooltip();
  marker.unbindPopup();
  marker.off("mouseover mouseout");

  if (data.err) {
    marker.setStyle({ fillColor: "#ef4444", color: "#ef4444", fillOpacity: 0.4, opacity: 0.2 });
    marker.bindTooltip(
      `<span class="tt-name">${data.name}</span> <span class="tt-pct down">failed</span>`,
      { className: "idx-tooltip", direction: "top", offset: [0, -8] }
    );
    return;
  }

  // Color by performance, style by session state
  const positive = data.change >= 0;
  const isOpen = data.session === "open";

  let baseRadius, baseFill, baseWeight, baseOpacity, fillColor, strokeColor;

  if (isOpen) {
    // Live: bright solid dot with soft glow
    fillColor   = positive ? "#4ade80" : "#f87171";
    strokeColor = fillColor;
    baseRadius  = 9;
    baseFill    = 0.92;
    baseWeight  = 6;
    baseOpacity = 0.35;
  } else {
    // Closed today: hollow ring, muted fill, prominent stroke
    fillColor   = positive ? "#0a2618" : "#2a0f0f";
    strokeColor = positive ? "#15803d" : "#991b1b";
    baseRadius  = 7;
    baseFill    = 0.5;
    baseWeight  = 2.5;
    baseOpacity = 0.9;
  }

  marker.setStyle({ fillColor, color: strokeColor, fillOpacity: baseFill, opacity: baseOpacity, weight: baseWeight });
  marker.setRadius(baseRadius);

  // Simple tooltip during streaming (will be replaced by global-date tooltip later)
  const statusLabel = isOpen ? "live" : "closed";
  const ttHtml = `<span class="tt-name">${data.name}</span> <span class="tt-pct ${positive ? "up" : "down"}">${formatPercent(data.changePercent)}</span> <span class="tt-status">${statusLabel}</span>`;
  marker.bindTooltip(ttHtml, { className: "idx-tooltip", direction: "top", offset: [0, -8] });

  marker.bindPopup(buildPopupHTML(data), { className: "idx-popup", maxWidth: 340, minWidth: 280 });

  marker.on("mouseover", function () { this.setRadius(baseRadius + 3); this.setStyle({ fillOpacity: Math.min(baseFill + 0.2, 1), opacity: Math.min(baseOpacity + 0.2, 1), weight: baseWeight + 2 }); });
  marker.on("mouseout",  function () { this.setRadius(baseRadius); this.setStyle({ fillOpacity: baseFill, opacity: baseOpacity, weight: baseWeight }); });
}

/* ------------------------------------------------------------------ */
/*  Global dates & tooltip rebind after all data loads                 */
/* ------------------------------------------------------------------ */

function getGlobalDates() {
  const allDates = new Set();
  latestResults.forEach((d) => {
    if (!d.ok || !d.days) return;
    d.days.forEach((day) => allDates.add(day.date));
  });
  return [...allDates].sort().reverse().slice(0, 2);
}

function rebindAllTooltips() {
  const globalDates = getGlobalDates();
  const [newestDate, olderDate] = globalDates;
  if (!newestDate) return;

  const newestLabel = friendlyDate(newestDate);
  const olderLabel  = olderDate ? friendlyDate(olderDate) : null;

  latestResults.forEach((data) => {
    if (!data.ok) return;
    const marker = markerMap[data.sym];
    if (!marker) return;

    const days = data.days || [];
    const dayByDate = {};
    days.forEach((d) => (dayByDate[d.date] = d));

    const isOpen = data.session === "open";

    const newestDay = dayByDate[newestDate];
    const olderDay  = olderDate ? dayByDate[olderDate] : null;

    let ttHtml = `<span class="tt-name">${data.name}</span>`;

    if (newestDay) {
      const p = newestDay.changePercent >= 0;
      ttHtml += ` <span class="tt-pct ${p ? "up" : "down"}">${formatPercent(newestDay.changePercent)}</span>`;
      ttHtml += `<span class="tt-status">${isOpen && newestDay === days[days.length - 1] ? "live" : newestLabel}</span>`;
    } else {
      const traded = shouldHaveTraded(data, newestDate);
      const noDataLabel = traded ? "holiday" : "not opened";
      ttHtml += ` <span class="tt-pct nyo">\u2014</span>`;
      ttHtml += `<span class="tt-status nyo">${newestLabel}: ${noDataLabel}</span>`;
    }

    if (olderDay) {
      const op = olderDay.changePercent >= 0;
      ttHtml += `<span class="tt-sep">|</span><span class="tt-prev">${olderLabel}: <span class="${op ? "up" : "down"}">${formatPercent(olderDay.changePercent)}</span></span>`;
    }

    // Gray out markers with no data for the newest date (holiday / not opened)
    if (!newestDay) {
      marker.off("mouseover mouseout");
      marker.unbindTooltip();
      marker.unbindPopup();
      marker.setStyle({ fillColor: "#334155", color: "#475569", fillOpacity: 0.4, opacity: 0.5, weight: 2 });
      marker.setRadius(6);
      marker.on("mouseover", function () { this.setRadius(8); this.setStyle({ fillOpacity: 0.6, opacity: 0.7 }); });
      marker.on("mouseout",  function () { this.setRadius(6); this.setStyle({ fillOpacity: 0.4, opacity: 0.5 }); });
      marker.bindTooltip(ttHtml, { className: "idx-tooltip", direction: "top", offset: [0, -8] });
      marker.bindPopup(buildPopupHTML(data, globalDates), { className: "idx-popup", maxWidth: 340, minWidth: 280 });
    } else {
      marker.unbindTooltip();
      marker.bindTooltip(ttHtml, { className: "idx-tooltip", direction: "top", offset: [0, -8] });
      marker.unbindPopup();
      marker.bindPopup(buildPopupHTML(data, globalDates), { className: "idx-popup", maxWidth: 340, minWidth: 280 });
    }
  });
}

/* ================================================================== */
/*  Summary panel                                                     */
/* ================================================================== */

function computeSentiment(up, total, avg) {
  if (!total) return ["Neutral", ""];
  let label, cls;
  if      (avg > 1)     { label = "Highly bullish";   cls = "up"; }
  else if (avg > 0.5)   { label = "Bullish";          cls = "up"; }
  else if (avg > 0.1)   { label = "Slightly bullish"; cls = "up"; }
  else if (avg >= -0.1) { label = "Neutral";           cls = ""; }
  else if (avg >= -0.5) { label = "Slightly bearish";  cls = "down"; }
  else if (avg >= -1)   { label = "Bearish";           cls = "down"; }
  else                   { label = "Highly bearish";   cls = "down"; }
  return [label, cls];
}

function renderSummary(list, total) {
  const loaded = list.filter((d) => d.ok);
  const failed = list.filter((d) => d.err);
  const doneCount = loaded.length + failed.length;
  const loading = doneCount < total;

  // Collect ALL day entries from ALL indices, grouped by date
  const dateGroups = {};
  loaded.forEach((d) => {
    (d.days || []).forEach((day) => {
      if (!dateGroups[day.date]) dateGroups[day.date] = { label: day.label, entries: [] };
      dateGroups[day.date].entries.push({ idx: d, day });
    });
  });

  // Keep only the 2 most recent dates
  const sortedDates = Object.keys(dateGroups).sort().reverse().slice(0, 2);


  let html = `<div class="panel-heading">Market Overview</div>`;

  for (let i = 0; i < sortedDates.length; i++) {
    const dateKey = sortedDates[i];
    const group = dateGroups[dateKey];
    const entries = group.entries;
    const isNewest = i === 0;

    // Count live/closed: "live" only if session=open AND this day is the index's latest
    let live = 0, closed = 0;
    entries.forEach(({ idx, day }) => {
      const isLatest = idx.days && idx.days[idx.days.length - 1] === day;
      if (idx.session === "open" && isLatest) live++;
      else closed++;
    });

    const up   = entries.filter(({ day }) => day.changePercent > 0).length;
    const down = entries.filter(({ day }) => day.changePercent < 0).length;
    const avg  = entries.reduce((s, { day }) => s + day.changePercent, 0) / entries.length;
    const avgCls = avg >= 0 ? "up" : "down";
    const [sentiment, sentCls] = computeSentiment(up, entries.length, avg);

    // Indices without data for this date: holiday vs not opened yet
    const missing = loaded.filter((d) => !(d.days || []).some((dy) => dy.date === dateKey));
    let holidayCount = 0, notYetCount = 0;
    missing.forEach((d) => {
      if (shouldHaveTraded(d, dateKey)) holidayCount++;
      else notYetCount++;
    });

    html += `<div class="panel-date">${group.label}</div>`;
    if (live)   html += `<div class="panel-row"><span class="panel-dot live"></span><span class="panel-label">${live} live</span></div>`;
    if (closed) html += `<div class="panel-row"><span class="panel-dot closed"></span><span class="panel-label">${closed} closed</span></div>`;
    if (isNewest && holidayCount > 0) {
      html += `<div class="panel-row muted"><span class="panel-dot nyo"></span><span class="panel-label">${holidayCount} holiday</span></div>`;
    }
    if (isNewest && notYetCount > 0) {
      html += `<div class="panel-row muted"><span class="panel-dot nyo"></span><span class="panel-label">${notYetCount} not opened yet</span></div>`;
    }
    html += `<div class="panel-row"><span class="panel-dot up"></span><span class="panel-label">Advancing</span><span class="panel-val">${up}</span></div>`;
    html += `<div class="panel-row"><span class="panel-dot down"></span><span class="panel-label">Declining</span><span class="panel-val">${down}</span></div>`;
    html += `<div class="panel-metric"><span class="panel-metric-label">Avg</span><span class="panel-metric-val ${avgCls}">${formatPercent(avg)}</span></div>`;
    html += `<div class="panel-metric"><span class="panel-metric-label">Sentiment</span><span class="panel-metric-val ${sentCls}">${sentiment}</span></div>`;

    html += `<div class="panel-divider"></div>`;
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

  rebindAllTooltips();
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
