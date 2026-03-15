/* ================================================================== */
/*  API Configuration                                                 */
/* ================================================================== */

const CORS_PROXIES = [
  // AllOrigins - works well, no preflight needed
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  // CORS Anywhere alternatives that handle preflight
  (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
  // Simple GET-based proxies
  (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
  (u) => `https://cors.bridged.cc/${u}`,
  // Try direct fetch first (will fail but helps debug)
];

const YAHOO_CHART_BASE = "https://query1.finance.yahoo.com/v8/finance/chart/";

const API_CONFIG = {
  timeout: 20_000,  // Increased timeout for slower proxies
  cacheBustInterval: 30_000,
  range: "5d",
  interval: "5m",
  retryAttempts: 2,  // Number of retry attempts per proxy
};
