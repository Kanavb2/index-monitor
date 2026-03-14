/* ================================================================== */
/*  Formatting Helpers                                                */
/* ================================================================== */

/**
 * Formats a number as a price with 2 decimal places
 * @param {number|null} n - Price value
 * @returns {string} Formatted price or em dash if invalid
 */
function formatPrice(n) {
  if (n == null || isNaN(n)) return "\u2014";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

/**
 * Formats a change value with sign prefix
 * @param {number|null} n - Change value
 * @returns {string} Formatted change with + prefix if positive
 */
function formatChange(n) {
  if (n == null) return "\u2014";
  return (n >= 0 ? "+" : "") + formatPrice(n);
}

/**
 * Formats a percentage value with sign prefix
 * @param {number|null} n - Percentage value
 * @returns {string} Formatted percentage with + prefix if positive
 */
function formatPercent(n) {
  if (n == null) return "\u2014";
  return (n >= 0 ? "+" : "") + n.toFixed(2) + "%";
}
