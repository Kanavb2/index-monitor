# Global Index Monitor

A real-time dashboard tracking 20 major stock market indices across the globe.

**[Live Demo](https://kanavb2.github.io/index-monitor/)**

## Indices Tracked

| Region | Indices |
|---|---|
| Americas | S&P 500, S&P/TSX Composite, Ibovespa, S&P/BMV IPC |
| Europe | FTSE 100, DAX, CAC 40, SMI, AEX, FTSE MIB, IBEX 35 |
| Asia Pacific | Nikkei 225, CSI 300, NIFTY 50, KOSPI, S&P/ASX 200, Hang Seng, Straits Times |
| Middle East & Africa | Tadawul All Share, FTSE/JSE Top 40 |

## Features

- Live price, daily change, and percentage change for each index
- 1-month sparkline charts
- Market open/closed status indicators
- Manual refresh and optional 60-second auto-refresh
- Responsive dark-themed UI

## How It Works

Market data is fetched client-side from the Yahoo Finance chart API through a
CORS proxy (`allorigins.win` with `corsproxy.io` as fallback). No API keys or
backend required — just open `index.html`.

## Running Locally

Open `index.html` in any modern browser. No build step needed.

## License

MIT
