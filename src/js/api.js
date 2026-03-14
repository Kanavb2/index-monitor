/* ================================================================== */
/*  API & Network Functions                                           */
/* ================================================================== */

/**
 * Fetches data through CORS proxies with fallback support
 * @param {string} url - The URL to fetch
 * @returns {Promise<Object>} Parsed JSON response
 */
async function proxyFetch(url) {
  for (const wrapUrl of CORS_PROXIES) {
    try {
      const proxyUrl = wrapUrl(url);
      const res = await fetch(proxyUrl, {
        signal: AbortSignal.timeout(API_CONFIG.timeout),
        headers: { 
          "Cache-Control": "no-cache",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        },
      });
      if (!res.ok) {
        console.warn(`Proxy failed with status ${res.status}: ${proxyUrl}`);
        continue;
      }
      const text = await res.text();
      if (!text || text.trim() === '') {
        console.warn(`Proxy returned empty response: ${proxyUrl}`);
        continue;
      }
      try {
        return JSON.parse(text);
      } catch (e) {
        console.warn(`Failed to parse JSON from proxy: ${proxyUrl}`, e);
        continue;
      }
    } catch (err) {
      console.warn(`Proxy error: ${wrapUrl(url)}`, err.message);
      continue;
    }
  }
  throw new Error("All CORS proxies failed");
}

/**
 * Fetches index data from Yahoo Finance API
 * @param {Object} index - Index configuration object
 * @returns {Promise<Object>} Processed index data with price, changes, and session info
 */
async function fetchIndex(index) {
  const cacheBust = Math.floor(Date.now() / API_CONFIG.cacheBustInterval);
  const url =
    YAHOO_CHART_BASE +
    encodeURIComponent(index.sym) +
    `?range=${API_CONFIG.range}&interval=${API_CONFIG.interval}&_=${cacheBust}`;

  let json;
  try {
    json = await proxyFetch(url);
  } catch (err) {
    console.error(`Failed to fetch ${index.sym}:`, err.message);
    throw err;
  }

  if (!json || !json.chart || !json.chart.result || !json.chart.result[0]) {
    throw new Error(`Invalid response structure for ${index.sym}`);
  }

  const result = json.chart.result[0];
  if (!result.meta) {
    throw new Error(`Missing meta data for ${index.sym}`);
  }
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
