/* ================================================================== */
/*  API Configuration                                                 */
/* ================================================================== */

const CORS_PROXIES = [
  // AllOrigins /get endpoint - returns { contents: "JSON_STRING", status: {...} }
  // This is the most reliable free CORS proxy
  (u) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
  // AllOrigins /raw endpoint - returns raw response (may have CORS issues)
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
];

const YAHOO_CHART_BASE = "https://query1.finance.yahoo.com/v8/finance/chart/";

const API_CONFIG = {
  timeout: 20_000,  // Increased timeout for slower proxies
  cacheBustInterval: 30_000,
  range: "5d",
  interval: "5m",
  retryAttempts: 2,  // Number of retry attempts per proxy
};
