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

  // Fetch indices in small batches to avoid rate-limiting from AllOrigins.
  // Firing all 20+ requests at once causes it to drop CORS headers.
  const BATCH_SIZE = 3;
  const BATCH_DELAY = 400; // ms between batches

  for (let b = 0; b < INDICES.length; b += BATCH_SIZE) {
    const batch = INDICES.slice(b, b + BATCH_SIZE);
    const batchPromises = batch.map(async (idx) => {
      const i = INDICES.indexOf(idx);
      try {
        const result = await fetchIndex(idx);
        setCache(idx.sym, result);
        const results = getLatestResults();
        results[i] = result;
        setLatestResults(results);
        updateMarker(result);
        renderSummary(getLatestResults(), INDICES.length);
      } catch {
        const errData = { ...idx, ok: false, err: true };
        const results = getLatestResults();
        results[i] = errData;
        setLatestResults(results);
        updateMarker(errData);
        renderSummary(getLatestResults(), INDICES.length);
      }
    });
    await Promise.all(batchPromises);
    if (b + BATCH_SIZE < INDICES.length) {
      await new Promise((r) => setTimeout(r, BATCH_DELAY));
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
