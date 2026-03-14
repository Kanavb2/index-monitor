# Architecture

## Project Structure

```
Index Monitor/
├── index.html          # Main HTML entry point
├── src/
│   ├── js/
│   │   └── app.js      # Main application logic
│   └── css/
│       └── style.css    # Stylesheet
├── config/
│   ├── indices.js      # Index definitions and coordinates
│   └── api.js          # API configuration and CORS proxies
├── docs/               # Documentation
└── README.md           # Project documentation
```

## Components

### Configuration (`config/`)
- **indices.js**: Defines all tracked stock market indices with their symbols, names, coordinates, timezones, and trading hours
- **api.js**: Contains API endpoints, CORS proxy configurations, and API settings

### Application Logic (`src/js/app.js`)
- **State Management**: Global state for cache, results, timers, and map markers
- **Networking**: CORS proxy handling and Yahoo Finance API integration
- **Data Processing**: Session state calculation, date formatting, and data transformation
- **UI Components**: Map initialization, marker management, popup generation, summary panel rendering
- **Event Handlers**: Refresh functionality and auto-refresh toggle

### Styling (`src/css/style.css`)
- CSS variables for theming
- Responsive layout styles
- Component-specific styles (map, popups, summary panel)

## Data Flow

1. **Initialization**: Map is initialized, loading markers are placed
2. **Data Fetching**: Each index is fetched through CORS proxies from Yahoo Finance
3. **Streaming Updates**: Markers update as data arrives (streaming pattern)
4. **Global Date Alignment**: After all data loads, tooltips are rebound with global date context
5. **Auto-refresh**: Optional 60-second refresh cycle

## Key Technologies

- **Leaflet.js**: Interactive map rendering
- **Yahoo Finance API**: Market data source
- **CORS Proxies**: Bypass browser CORS restrictions
- **Intl.DateTimeFormat**: Timezone-aware date handling
