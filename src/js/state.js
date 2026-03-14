/* ================================================================== */
/*  State Management                                                  */
/* ================================================================== */

let cache = {};
let latestResults = [];
let autoRefreshTimer = null;

/**
 * Gets the current cache
 * @returns {Object} Cache object
 */
function getCache() {
  return cache;
}

/**
 * Sets a value in the cache
 * @param {string} key - Cache key
 * @param {*} value - Value to cache
 */
function setCache(key, value) {
  cache[key] = value;
}

/**
 * Gets the latest results array
 * @returns {Object[]} Array of latest index results
 */
function getLatestResults() {
  return latestResults;
}

/**
 * Sets the latest results array
 * @param {Object[]} results - Array of index results
 */
function setLatestResults(results) {
  latestResults = results;
}

/**
 * Gets the auto-refresh timer
 * @returns {number|null} Timer ID or null
 */
function getAutoRefreshTimer() {
  return autoRefreshTimer;
}

/**
 * Sets the auto-refresh timer
 * @param {number|null} timer - Timer ID or null
 */
function setAutoRefreshTimer(timer) {
  autoRefreshTimer = timer;
}

/**
 * Clears the auto-refresh timer
 */
function clearAutoRefreshTimer() {
  if (autoRefreshTimer) {
    clearInterval(autoRefreshTimer);
    autoRefreshTimer = null;
  }
}
