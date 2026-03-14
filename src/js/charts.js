/* ================================================================== */
/*  Chart & Visualization Functions                                   */
/* ================================================================== */

/**
 * Builds an SVG sparkline chart for price data
 * @param {number[]} closes - Array of closing prices
 * @param {boolean} isPositive - Whether the trend is positive
 * @returns {string} SVG markup for the sparkline
 */
function buildSparkline(closes, isPositive) {
  if (!closes || closes.length < 2) return "";

  const W = 260;
  const H = 40;
  const PAD = 2;
  const lo = Math.min(...closes);
  const hi = Math.max(...closes);
  const range = hi - lo || 1;

  const points = closes.map((v, i) => {
    const x = PAD + (i / (closes.length - 1)) * (W - 2 * PAD);
    const y = PAD + (1 - (v - lo) / range) * (H - 2 * PAD);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const color = isPositive ? "var(--pos)" : "var(--neg)";
  const gid = "g" + Math.random().toString(36).slice(2, 8);
  const areaPoints = [
    ...points,
    `${(PAD + W - 2 * PAD).toFixed(1)},${H}`,
    `${PAD},${H}`,
  ].join(" ");

  return `
    <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
      <defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="${color}" stop-opacity=".3"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <polygon  points="${areaPoints}" fill="url(#${gid})"/>
      <polyline points="${points.join(" ")}" fill="none" stroke="${color}"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
}
