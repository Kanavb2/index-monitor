/* ================================================================== */
/*  Main Application                                                  */
/* ================================================================== */

/**
 * Runs an array of async tasks with a concurrency limit.
 * @param {Function[]} tasks - Array of () => Promise functions
 * @param {number} limit - Max concurrent tasks
 * @param {number|Function} stagger - ms delay between starting each task, or function returning delay
 */
async function runConcurrent(tasks, limit, stagger) {
  const results = [];
  let next = 0;

  async function worker() {
    while (next < tasks.length) {
      const idx = next++;
      if (idx > 0) {
        const delay = typeof stagger === 'function' ? stagger() : stagger;
        await new Promise((r) => setTimeout(r, delay));
      }
      results[idx] = await tasks[idx]();
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

/**
 * Refreshes all index data and updates the UI
 */
async function refresh() {
  const btn = document.getElementById("btnRef");
  btn.classList.add("spin");

  resetMarkersToLoading();
  setLatestResults(INDICES.map((i) => ({ ...i, ok: false, err: false })));
  renderSummary(getLatestResults(), INDICES.length);

  const failed = [];

  // Build tasks -- each is a closure that fetches one index
  const tasks = INDICES.map((idx, i) => async () => {
    try {
      const result = await fetchIndex(idx);
      setCache(idx.sym, result);
      const results = getLatestResults();
      results[i] = result;
      setLatestResults(results);
      updateMarker(result);
      rebindAllTooltips(getLatestResults());
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
  });

  // 1 concurrent worker, 1200-1800ms stagger with jitter
  // AllOrigins rate-limits aggressively, so we go fully sequential with randomness
  await runConcurrent(tasks, 1, () => 1200 + Math.random() * 600);

  // Retry failures after a longer cooldown
  if (failed.length > 0) {
    await new Promise((r) => setTimeout(r, 5000));
    const retryTasks = failed.map((i) => async () => {
      const idx = INDICES[i];
      try {
        const result = await fetchIndex(idx);
        setCache(idx.sym, result);
        const results = getLatestResults();
        results[i] = result;
        setLatestResults(results);
        updateMarker(result);
        rebindAllTooltips(getLatestResults());
        renderSummary(getLatestResults(), INDICES.length);
      } catch {
        // leave as error
      }
    });
    await runConcurrent(retryTasks, 1, () => 1200 + Math.random() * 600);
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
