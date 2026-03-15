/* ================================================================== */
/*  API Configuration                                                 */
/* ================================================================== */

// Try self-hosted proxy first (if deployed on Netlify), then fallback to public proxies
const getProxyUrl = (baseUrl) => {
  // Check if we're on the same domain (Netlify deployment or GitHub Pages with proxy)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('netlify.app') || hostname.includes('kanavb2.github.io')) {
      return `${window.location.origin}/api/proxy?url=${encodeURIComponent(baseUrl)}`;
    }
  }
  return null;
};

const CORS_PROXIES = [
  // Self-hosted proxy (if available)
  (u) => getProxyUrl(u),
  // AllOrigins - most reliable public proxy
  (u) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  // Fallback proxies
  (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
  (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
].filter(fn => fn); // Remove null entries

const YAHOO_CHART_BASE = "https://query1.finance.yahoo.com/v8/finance/chart/";

const API_CONFIG = {
  timeout: 20_000,  // Increased timeout for slower proxies
  cacheBustInterval: 30_000,
  range: "5d",
  interval: "5m",
  retryAttempts: 2,  // Number of retry attempts per proxy
};
