/* ================================================================== */
/*  API Configuration -- GitHub Pages (static site, no backend)       */
/* ================================================================== */

// AllOrigins is the only reliable free CORS proxy.
// The /get endpoint wraps the response: { contents: "...", status: {...} }
// It returns Access-Control-Allow-Origin: * on every response.
const CORS_PROXIES = [
  { wrap: (u) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`, unwrap: true },
  { wrap: (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`, unwrap: false },
];

const YAHOO_CHART_BASE = "https://query1.finance.yahoo.com/v8/finance/chart/";

const API_CONFIG = {
  timeout: 15000,
  cacheBustInterval: 30000,
  range: "5d",
  interval: "5m",
};
