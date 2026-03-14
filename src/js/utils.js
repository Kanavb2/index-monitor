/* ================================================================== */
/*  Date & Time Utilities                                             */
/* ================================================================== */

/**
 * Creates a date formatter for a specific timezone
 * @param {string} tz - Timezone string (e.g., "America/New_York")
 * @returns {Intl.DateTimeFormat} Formatter instance
 */
function dateFmtForTz(tz) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" });
}

/**
 * Formats an ISO date string to a friendly format
 * @param {string} isoDate - ISO date string (YYYY-MM-DD)
 * @returns {string} Formatted date (e.g., "Mon, Mar 15")
 */
function friendlyDate(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

/**
 * Determines if an index should have traded on a given date
 * @param {Object} index - Index configuration
 * @param {string} isoDate - ISO date string
 * @returns {boolean} True if the index should have traded
 */
function shouldHaveTraded(index, isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(y, m - 1, d, 12, 0, 0);
  const dayName = dt.toLocaleDateString("en-US", { weekday: "short" });
  if (dayName === "Sat" || dayName === "Sun") return false;

  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: index.tz,
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value])
  );
  const nowMins = parseInt(parts.hour) * 60 + parseInt(parts.minute);
  const openMins = index.mktOpen[0] * 60 + index.mktOpen[1];

  const todayInTz = dateFmtForTz(index.tz).format(new Date());
  if (isoDate !== todayInTz) return true;
  return nowMins >= openMins;
}

/**
 * Determines the current session state (open/closed) for an index
 * @param {Object} index - Index configuration with timezone and market hours
 * @returns {string} "open" or "closed"
 */
function getSessionState(index) {
  const now = new Date();
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: index.tz,
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value])
  );

  const weekday = parts.weekday;
  if (weekday === "Sat" || weekday === "Sun") return "closed";

  const mins = parseInt(parts.hour) * 60 + parseInt(parts.minute);
  const openMins  = index.mktOpen[0]  * 60 + index.mktOpen[1];
  const closeMins = index.mktClose[0] * 60 + index.mktClose[1];

  if (mins >= openMins && mins <= closeMins) return "open";
  return "closed";
}
