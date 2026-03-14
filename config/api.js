/* ================================================================== */
/*  API Configuration                                                 */
/* ================================================================== */

const CORS_PROXIES = [
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
  (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
  (u) => `https://cors-anywhere.herokuapp.com/${u}`,
];

const YAHOO_CHART_BASE = "https://query1.finance.yahoo.com/v8/finance/chart/";

const API_CONFIG = {
  timeout: 15_000,
  cacheBustInterval: 30_000,
  range: "5d",
  interval: "5m",
};
