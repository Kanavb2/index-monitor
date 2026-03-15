# Global Daily Index Monitor

A lightweight, client-side dashboard that plots 19 major stock market indices on an interactive world map. Built as a static site for GitHub Pages -- no backend, no API keys, no build step.

**[Live Demo](https://kanavb2.github.io/index-monitor/)**

## Tracked Indices

| Region | Index | Country |
|---|---|---|
| Americas | S&P 500 | United States |
| | S&P/TSX Composite | Canada |
| | Ibovespa | Brazil |
| | S&P/BMV IPC | Mexico |
| Europe | FTSE 100 | United Kingdom |
| | DAX | Germany |
| | CAC 40 | France |
| | SMI | Switzerland |
| | AEX | Netherlands |
| | FTSE MIB | Italy |
| | IBEX 35 | Spain |
| Asia Pacific | Nikkei 225 | Japan |
| | CSI 300 | China |
| | NIFTY 50 | India |
| | KOSPI | South Korea |
| | S&P/ASX 200 | Australia |
| | Hang Seng Index | Hong Kong |
| | Straits Times Index | Singapore |
| Africa | FTSE/JSE Top 40 | South Africa |

## Features

- Interactive Leaflet world map with color-coded markers at each exchange city
- **Open markets** shown as bright green or red dots with a glow effect
- **Closed markets** shown as smaller muted ring-style dots displaying the last session date on hover
- Click any marker for a detailed popup with current price, daily change, sparkline chart, intraday range, and previous close
- Streaming data load -- markers update progressively as data arrives
- Summary panel with advancing/declining counts, average change, and market sentiment indicator
- Timezone-aware session detection using `Intl.DateTimeFormat` and hardcoded exchange hours
- Manual refresh button and optional 60-second auto-refresh toggle
- Dark-themed, responsive UI

## How It Works

Market data is fetched client-side from the Yahoo Finance v8 chart API (`range=5d`, `interval=5m`) through the [AllOrigins](https://allorigins.win/) CORS proxy. Requests are sent in small batches to stay within rate limits. The AllOrigins `/get` endpoint wraps upstream responses in a JSON envelope (`{ contents, status }`), which the app unwraps before parsing.

Session state (open vs. closed) is computed from each exchange's timezone and trading hours. No server-side code, API keys, or scheduled jobs are involved -- the page fetches live data on every load and refresh.

## Project Structure

```
index.html                  Entry point
config/
  indices.js                Index definitions, coordinates, and trading hours
  api.js                    CORS proxy configuration and API settings
src/
  js/
    app.js                  Orchestration, refresh loop, event handlers
    api.js                  Network layer (proxyFetch, fetchIndex)
    charts.js               SVG sparkline generation
    formatters.js           Price and change formatting
    map.js                  Leaflet map initialization and marker management
    state.js                Global state (cache, timers, latest results)
    ui.js                   Popup and summary panel rendering
    utils.js                Date helpers and session-state logic
  css/
    style.css               All styles
```

## Running Locally

Open `index.html` in any modern browser. No build step or dependencies to install.

```sh
# or use any local server
python3 -m http.server 8000
```

## License

MIT
