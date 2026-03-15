/* ================================================================== */
/*  API Configuration -- GitHub Pages (static site, no backend)       */
/* ================================================================== */

const CORS_PROXIES = [
  // AllOrigins /get wraps response in { contents: "...", status: {...} }
  // and sets Access-Control-Allow-Origin: * on every response
  { wrap: (u) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`, unwrap: true },

  // AllOrigins /raw returns the raw upstream body
  { wrap: (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`, unwrap: false },

  // corsproxy.io passes upstream body directly
  { wrap: (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`, unwrap: false },
];

const YAHOO_CHART_BASE = "https://query1.finance.yahoo.com/v8/finance/chart/";

const API_CONFIG = {
  timeout: 15000,
  cacheBustInterval: 30000,
  range: "5d",
  interval: "5m",
};
