/* ================================================================== */
/*  API Configuration                                                 */
/* ================================================================== */

const CORS_PROXIES = [
  // AllOrigins - most reliable, uses GET with query param
  (u) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
  // Alternative AllOrigins endpoint
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  // CORS Proxy that works with GitHub Pages
  (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
  // Simple proxy service
  (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
];

const YAHOO_CHART_BASE = "https://query1.finance.yahoo.com/v8/finance/chart/";

const API_CONFIG = {
  timeout: 20_000,  // Increased timeout for slower proxies
  cacheBustInterval: 30_000,
  range: "5d",
  interval: "5m",
  retryAttempts: 2,  // Number of retry attempts per proxy
};
