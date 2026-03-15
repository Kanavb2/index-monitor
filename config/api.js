/* ================================================================== */
/*  API Configuration                                                 */
/* ================================================================== */

// Vercel proxy URL - update this after deploying to Vercel
// Example: https://your-project.vercel.app/api/proxy
const VERCEL_PROXY_URL = null; // Set this after deploying to Vercel

const CORS_PROXIES = [
  // Self-hosted Vercel proxy (most reliable - deploy api/proxy.js to Vercel)
  (u) => VERCEL_PROXY_URL ? `${VERCEL_PROXY_URL}?url=${encodeURIComponent(u)}` : null,
  // AllOrigins /get endpoint - returns { contents: "JSON_STRING", status: {...} }
  (u) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
  // AllOrigins /raw endpoint - returns raw response
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
].filter(fn => fn); // Remove null entries

const YAHOO_CHART_BASE = "https://query1.finance.yahoo.com/v8/finance/chart/";

const API_CONFIG = {
  timeout: 20_000,  // Increased timeout for slower proxies
  cacheBustInterval: 30_000,
  range: "5d",
  interval: "5m",
  retryAttempts: 2,  // Number of retry attempts per proxy
};
