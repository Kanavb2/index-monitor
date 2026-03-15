/* ================================================================== */
/*  Main Application                                                  */
/* ================================================================== */

/**
 * Refreshes all index data and updates the UI
 */
async function refresh() {
  const btn = document.getElementById("btnRef");
  btn.classList.add("spin");

  // Reset markers to loading state
  resetMarkersToLoading();

  setLatestResults(INDICES.map((i) => ({ ...i, ok: false, err: false })));
  renderSummary(getLatestResults(), INDICES.length);

  // Fetch one at a time with a pause between each request.
  // AllOrigins rate-limits aggressively -- even small batches get throttled.
  const DELAY = 600; // ms between requests
  const failed = [];

  for (let i = 0; i < INDICES.length; i++) {
    const idx = INDICES[i];
    try {
      const result = await fetchIndex(idx);
      setCache(idx.sym, result);
      const results = getLatestResults();
      results[i] = result;
      setLatestResults(results);
      updateMarker(result);
      renderSummary(getLatestResults(), INDICES.length);
    } catch {
      failed.push(i);
      const errData = { ...idx, ok: false, err: true };
      const results = getLatestResults();
      results[i] = errData;
      setLatestResults(results);
      updateMarker(errData);
      renderSummary(getLatestResults(), INDICES.length);
    }
    if (i < INDICES.length - 1) {
      await new Promise((r) => setTimeout(r, DELAY));
    }
  }

  // Retry any that failed (AllOrigins may have been temporarily overwhelmed)
  if (failed.length > 0) {
    await new Promise((r) => setTimeout(r, 2000)); // longer cooldown
    for (const i of failed) {
      const idx = INDICES[i];
      try {
        const result = await fetchIndex(idx);
        setCache(idx.sym, result);
        const results = getLatestResults();
        results[i] = result;
        setLatestResults(results);
        updateMarker(result);
        renderSummary(getLatestResults(), INDICES.length);
      } catch {
        // still failed -- leave as error
      }
      await new Promise((r) => setTimeout(r, DELAY));
    }
  }

  rebindAllTooltips(getLatestResults());
  renderSummary(getLatestResults(), INDICES.length);
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
  clearAutoRefreshTimer();
  setAutoRefreshTimer(this.checked ? setInterval(refresh, 60_000) : null);
});

document.getElementById("btnRef").addEventListener("click", refresh);

initMap();
placeLoadingMarkers();
refresh();
