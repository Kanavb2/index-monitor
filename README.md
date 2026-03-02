# Global Daily Index Monitor

An interactive world map dashboard tracking 19 major stock market indices in real time.

**[Live Demo](https://kanavb2.github.io/index-monitor/)**

## Indices Tracked

| Region | Indices |
|---|---|
| Americas | S&P 500, S&P/TSX Composite, Ibovespa, S&P/BMV IPC |
| Europe | FTSE 100, DAX, CAC 40, SMI, AEX, FTSE MIB, IBEX 35 |
| Asia Pacific | Nikkei 225, CSI 300, NIFTY 50, KOSPI, S&P/ASX 200, Hang Seng, Straits Times |
| Africa | FTSE/JSE Top 40 |

## Features

- Interactive Leaflet world map with color-coded markers at each exchange city
- **Live markets**: bright green/red solid dots with glow
- **Closed markets**: smaller ring-style dots with muted colors, showing last session date on hover
- Click any marker for a detailed popup with price, change, sparkline chart, day range, and previous close
- Streaming data load — each index appears as soon as its data arrives
- Summary panel with advancing/declining counts, average change, and sentiment indicator
- Timezone-agnostic: works correctly from any location, always showing each market's most recent session
- Manual refresh and optional 60-second auto-refresh
- Dark-themed responsive UI

## How It Works

Market data is fetched client-side from the Yahoo Finance chart API (`range=1d&interval=5m`)
through a CORS proxy (`allorigins.win` with `corsproxy.io` as fallback). Session state
(open vs closed) is determined using hardcoded exchange timezones and trading hours via
`Intl.DateTimeFormat`. No API keys or backend required — just open `index.html`.

## Running Locally

Open `index.html` in any modern browser. No build step needed.

## License

MIT
