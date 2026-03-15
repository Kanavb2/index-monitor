/* ================================================================== */
/*  API Configuration                                                 */
/* ================================================================== */

// Try self-hosted proxy first (if deployed on Netlify), then fallback to public proxies
const getProxyUrl = (baseUrl) => {
  // Check if we're on the same domain (Netlify deployment)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('netlify.app')) {
      return `${window.location.origin}/api/proxy?url=${encodeURIComponent(baseUrl)}`;
    }
  }
  return null;
};

const CORS_PROXIES = [
  // Self-hosted proxy (if available on Netlify)
  (u) => getProxyUrl(u),
  // AllOrigins /get endpoint - returns { contents: "...", status: {...} }
  (u) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
  // AllOrigins /raw endpoint - returns raw response
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  // Fallback proxies
  (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
].filter(fn => fn); // Remove null entries

const YAHOO_CHART_BASE = "https://query1.finance.yahoo.com/v8/finance/chart/";

const API_CONFIG = {
  timeout: 20_000,  // Increased timeout for slower proxies
  cacheBustInterval: 30_000,
  range: "5d",
  interval: "5m",
  retryAttempts: 2,  // Number of retry attempts per proxy
};
