/* ================================================================== */
/*  Index definitions                                                 */
/* ================================================================== */

const INDICES = [
  // Americas
  { sym: "^GSPC",      name: "S&P 500",             co: "United States",  fl: "\u{1F1FA}\u{1F1F8}", rg: "Americas",      desc: "Large cap benchmark covering approximately 80% of U.S. equity market capitalization." },
  { sym: "^GSPTSE",    name: "S&P/TSX Composite",   co: "Canada",         fl: "\u{1F1E8}\u{1F1E6}", rg: "Americas",      desc: "Broad benchmark for the Canadian equity market." },
  { sym: "^BVSP",      name: "Ibovespa",            co: "Brazil",         fl: "\u{1F1E7}\u{1F1F7}", rg: "Americas",      desc: "Main benchmark of Brazilian equities." },
  { sym: "^MXX",       name: "S&P/BMV IPC",         co: "Mexico",         fl: "\u{1F1F2}\u{1F1FD}", rg: "Americas",      desc: "Flagship Mexican equity index." },

  // Europe
  { sym: "^FTSE",      name: "FTSE 100",            co: "United Kingdom", fl: "\u{1F1EC}\u{1F1E7}", rg: "Europe",        desc: "Large cap index representing the largest companies listed in London." },
  { sym: "^GDAXI",     name: "DAX",                 co: "Germany",        fl: "\u{1F1E9}\u{1F1EA}", rg: "Europe",        desc: "Tracks 40 major German blue chip companies." },
  { sym: "^FCHI",      name: "CAC 40",              co: "France",         fl: "\u{1F1EB}\u{1F1F7}", rg: "Europe",        desc: "Leading benchmark of large French equities." },
  { sym: "^SSMI",      name: "SMI",                 co: "Switzerland",    fl: "\u{1F1E8}\u{1F1ED}", rg: "Europe",        desc: "Swiss Market Index covering major Swiss blue chips." },
  { sym: "^AEX",       name: "AEX",                 co: "Netherlands",    fl: "\u{1F1F3}\u{1F1F1}", rg: "Europe",        desc: "Tracks leading Dutch listed companies." },
  { sym: "FTSEMIB.MI", name: "FTSE MIB",            co: "Italy",          fl: "\u{1F1EE}\u{1F1F9}", rg: "Europe",        desc: "Large cap Italian equity benchmark." },
  { sym: "^IBEX",      name: "IBEX 35",             co: "Spain",          fl: "\u{1F1EA}\u{1F1F8}", rg: "Europe",        desc: "Principal Spanish stock market index." },

  // Asia Pacific
  { sym: "^N225",      name: "Nikkei 225",          co: "Japan",          fl: "\u{1F1EF}\u{1F1F5}", rg: "Asia Pacific",  desc: "Price weighted index of major Japanese companies." },
  { sym: "000300.SS",  name: "CSI 300",             co: "China",          fl: "\u{1F1E8}\u{1F1F3}", rg: "Asia Pacific",  desc: "Represents large and mid cap A-shares from Shanghai and Shenzhen." },
  { sym: "^NSEI",      name: "NIFTY 50",            co: "India",          fl: "\u{1F1EE}\u{1F1F3}", rg: "Asia Pacific",  desc: "Tracks 50 major Indian companies listed on NSE." },
  { sym: "^KS11",      name: "KOSPI",               co: "South Korea",    fl: "\u{1F1F0}\u{1F1F7}", rg: "Asia Pacific",  desc: "Primary benchmark of the Korean equity market." },
  { sym: "^AXJO",      name: "S&P/ASX 200",         co: "Australia",      fl: "\u{1F1E6}\u{1F1FA}", rg: "Asia Pacific",  desc: "Covers the 200 largest companies listed in Australia." },
  { sym: "^HSI",       name: "Hang Seng Index",     co: "Hong Kong",      fl: "\u{1F1ED}\u{1F1F0}", rg: "Asia Pacific",  desc: "Tracks major companies listed in Hong Kong." },
  { sym: "^STI",       name: "Straits Times Index",  co: "Singapore",     fl: "\u{1F1F8}\u{1F1EC}", rg: "Asia Pacific",  desc: "Benchmark for Singapore\u2019s leading listed firms." },

  // Africa
  { sym: "^J200.JO",   name: "FTSE/JSE Top 40",     co: "South Africa",  fl: "\u{1F1FF}\u{1F1E6}", rg: "Africa",        desc: "Large cap benchmark for South Africa." },
];

const REGIONS = ["Americas", "Europe", "Asia Pacific", "Africa"];

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

  // Use the actual regular trading period from the API for open/closed
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

function timeAgo(unixTs) {
  if (!unixTs) return "";
  const seconds = Math.floor(Date.now() / 1000 - unixTs);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return Math.floor(seconds / 60) + "m ago";
  if (seconds < 86400) return Math.floor(seconds / 3600) + "h ago";
  return Math.floor(seconds / 86400) + "d ago";
}

/* ================================================================== */
/*  Sparkline SVG builder                                             */
/* ================================================================== */

function buildSparkline(closes, isPositive) {
  if (!closes || closes.length < 2) return "";

  const W = 90;
  const H = 36;
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
          <stop offset="0%"   stop-color="${color}" stop-opacity=".25"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <polygon  points="${areaPoints}" fill="url(#${gid})"/>
      <polyline points="${points.join(" ")}" fill="none" stroke="${color}"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
}

/* ================================================================== */
/*  Day range bar                                                     */
/* ================================================================== */

function buildRangeBar(data) {
  const { dayLow, dayHigh, price } = data;
  if (!dayLow || !dayHigh || dayLow === dayHigh) return "";

  const pct = ((price - dayLow) / (dayHigh - dayLow)) * 100;
  const clampedPct = Math.max(0, Math.min(100, pct));

  return `
    <div class="range-bar-wrap">
      <div class="range-bar-labels">
        <span class="detail-label">Day Range</span>
        <span class="detail-value" style="font-size:.72rem">${formatPrice(dayLow)} \u2013 ${formatPrice(dayHigh)}</span>
      </div>
      <div class="range-bar-track">
        <div class="range-bar-fill" style="width:${clampedPct}%"></div>
        <div class="range-bar-marker" style="left:${clampedPct}%"></div>
      </div>
    </div>`;
}

/* ================================================================== */
/*  Card rendering                                                    */
/* ================================================================== */

function createCard(data) {
  const el = document.createElement("div");
  el.className = "card";
  el.dataset.sym = data.sym;

  const headerHTML = `
    <div class="card-hdr">
      <div>
        <div class="card-country"><span class="fl">${data.fl}</span>${data.co}</div>
        <div class="card-name">${data.name}</div>
      </div>
    </div>`;

  if (!data.ok && !data.err) {
    el.innerHTML = `
      ${headerHTML}
      <div class="sk sk-price"></div>
      <div class="sk sk-chg"></div>
      <div class="sk sk-details"></div>
      <div class="sk sk-desc"></div>`;
    return el;
  }

  if (data.err) {
    el.innerHTML = `
      ${headerHTML}
      <div class="card-err">
        <span>Unable to load data</span>
        <button class="btn-retry" onclick="retrySingle('${data.sym}')">Retry</button>
      </div>
      <div class="card-desc">${data.desc}</div>`;
    return el;
  }

  const positive = data.change >= 0;
  const arrow = positive ? "&#9650;" : "&#9660;";

  el.classList.add(positive ? "pos" : "neg");
  el.innerHTML = `
    <div class="card-hdr">
      <div>
        <div class="card-country"><span class="fl">${data.fl}</span>${data.co}</div>
        <div class="card-name">${data.name}</div>
      </div>
      <div class="card-meta">
        <div class="mkt-status">
          <span class="s-dot ${data.marketOpen ? "on" : ""}"></span>${data.marketOpen ? "Open" : "Closed"}
        </div>
        ${data.currency ? `<div class="card-currency">${data.currency}</div>` : ""}
      </div>
    </div>
    <div class="card-mid">
      <div class="card-price">${formatPrice(data.price)}</div>
      <div class="spark">${buildSparkline(data.closes, positive)}</div>
    </div>
    <div class="card-chg ${positive ? "pos" : "neg"}">
      <span>${arrow} ${formatChange(data.change)}</span>
      <span class="chg-badge">${formatPercent(data.changePercent)}</span>
    </div>
    <div class="card-details">
      <div class="detail-item">
        <span class="detail-label">Prev Close</span>
        <span class="detail-value">${formatPrice(data.previousClose)}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Open</span>
        <span class="detail-value">${data.closes.length ? formatPrice(data.closes[0]) : "\u2014"}</span>
      </div>
      ${buildRangeBar(data)}
    </div>
    <div class="card-foot">
      <div class="card-desc">${data.desc}</div>
      <div class="card-ago">${timeAgo(data.marketTime)}</div>
    </div>`;
  return el;
}

/* ================================================================== */
/*  Page rendering                                                    */
/* ================================================================== */

function renderSkeletonLayout() {
  const main = document.getElementById("main");
  main.innerHTML = "";

  for (const region of REGIONS) {
    const items = INDICES.filter((d) => d.rg === region);
    if (!items.length) continue;

    const section = document.createElement("section");
    section.className = "region";
    section.innerHTML = `<h2 class="region-title">${region}</h2>`;

    const grid = document.createElement("div");
    grid.className = "grid";
    items.forEach((d) => {
      const card = createCard({ ...d, ok: false, err: false });
      card.classList.add("visible");
      grid.appendChild(card);
    });

    section.appendChild(grid);
    main.appendChild(section);
  }
}

function replaceCard(data) {
  const existing = document.querySelector(
    `[data-sym="${CSS.escape(data.sym)}"]`
  );
  if (!existing) return;

  const newCard = createCard(data);
  existing.replaceWith(newCard);
  requestAnimationFrame(() => newCard.classList.add("visible"));
}

function renderSummary(list) {
  const loaded = list.filter((d) => d.ok);
  if (!loaded.length) return;

  const up = loaded.filter((d) => d.change > 0).length;
  const down = loaded.filter((d) => d.change < 0).length;
  const flat = loaded.filter((d) => d.change === 0).length;

  let best = null;
  let worst = null;
  loaded.forEach((d) => {
    if (!best || d.changePercent > best.changePercent) best = d;
    if (!worst || d.changePercent < worst.changePercent) worst = d;
  });

  const el = document.getElementById("summary");
  let html =
    `<div class="summary-chip up"><span class="chip-dot"></span>${up} advancing</div>` +
    `<div class="summary-chip down"><span class="chip-dot"></span>${down} declining</div>`;

  if (flat) {
    html += `<div class="summary-chip flat"><span class="chip-dot"></span>${flat} unchanged</div>`;
  }

  if (best && worst && loaded.length > 1) {
    html += `<span class="summary-divider"></span>`;
    html += `<span class="summary-performer">Best <strong>${best.name}</strong> <span class="perf-val up">${formatPercent(best.changePercent)}</span></span>`;
    html += `<span class="summary-divider"></span>`;
    html += `<span class="summary-performer">Worst <strong>${worst.name}</strong> <span class="perf-val down">${formatPercent(worst.changePercent)}</span></span>`;
  }

  el.innerHTML = html;
}

/* ================================================================== */
/*  Data loading — streams each card as it arrives                    */
/* ================================================================== */

async function refresh() {
  const btn = document.getElementById("btnRef");
  btn.classList.add("spin");
  document.getElementById("errBanner").classList.remove("show");
  document.getElementById("summary").innerHTML = "";

  latestResults = INDICES.map((i) => ({ ...i, ok: false, err: false }));
  renderSkeletonLayout();

  let failCount = 0;

  const promises = INDICES.map(async (idx, i) => {
    try {
      const result = await fetchIndex(idx);
      cache[idx.sym] = result;
      latestResults[i] = result;
      replaceCard(result);
      renderSummary(latestResults);
    } catch {
      failCount++;
      const errData = { ...idx, ok: false, err: true };
      latestResults[i] = errData;
      replaceCard(errData);
    }
  });

  await Promise.all(promises);

  renderSummary(latestResults);

  if (failCount) {
    const banner = document.getElementById("errBanner");
    banner.classList.add("show");
    document.getElementById("errMsg").textContent =
      `${failCount} ${failCount === 1 ? "index" : "indices"} failed to load. Data may be incomplete.`;
  }

  document.getElementById("ts").textContent =
    "Updated " + new Date().toLocaleTimeString();
  btn.classList.remove("spin");
}

async function retrySingle(sym) {
  const idx = INDICES.find((i) => i.sym === sym);
  if (!idx) return;

  try {
    const result = await fetchIndex(idx);
    cache[sym] = result;
    const i = latestResults.findIndex((r) => r.sym === sym);
    if (i !== -1) latestResults[i] = result;
    replaceCard(result);
    renderSummary(latestResults);
  } catch {
    /* still broken */
  }
}

/* ================================================================== */
/*  Event listeners & bootstrap                                       */
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

refresh();
