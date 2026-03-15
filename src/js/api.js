/* ================================================================== */
/*  API & Network Functions                                           */
/* ================================================================== */

/**
 * Fetch through CORS proxies with automatic fallback.
 * IMPORTANT: we send zero custom headers so the browser treats every
 * request as a CORS "simple request" (no preflight OPTIONS).
 */
async function proxyFetch(url) {
  const errors = [];

  for (const proxy of CORS_PROXIES) {
    const proxyUrl = proxy.wrap(url);
    try {
      // Bare fetch -- no headers, no mode, no credentials override.
      // This guarantees a simple GET that never triggers preflight.
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), API_CONFIG.timeout);

      const res = await fetch(proxyUrl, { signal: controller.signal });
      clearTimeout(timer);

      if (!res.ok) {
        errors.push(`${proxyUrl.substring(0, 60)}... => HTTP ${res.status}`);
        continue;
      }

      const text = await res.text();
      if (!text || text.trim() === "") {
        errors.push(`${proxyUrl.substring(0, 60)}... => empty body`);
        continue;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        errors.push(`${proxyUrl.substring(0, 60)}... => invalid JSON`);
        continue;
      }

      // AllOrigins /get wraps the real body inside a "contents" string
      if (proxy.unwrap && typeof data.contents === "string") {
        try {
          data = JSON.parse(data.contents);
        } catch {
          errors.push(`${proxyUrl.substring(0, 60)}... => bad inner JSON`);
          continue;
        }
      }

      // Yahoo Finance always returns { chart: { result: [...] } }
      if (data && data.chart) return data;

      errors.push(`${proxyUrl.substring(0, 60)}... => unexpected shape`);
    } catch (err) {
      errors.push(`${proxyUrl.substring(0, 60)}... => ${err.message}`);
    }
  }

  console.warn("All proxies failed:", errors);
  throw new Error("All CORS proxies failed");
}

/**
 * Fetch a single index from Yahoo Finance.
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
    throw new Error(`Invalid response for ${index.sym}`);
  }

  const result = json.chart.result[0];
  if (!result.meta) throw new Error(`Missing meta for ${index.sym}`);
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

  const latest = days[days.length - 1] || {};
  const price = meta.regularMarketPrice;
  let session = getSessionState(index);

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
