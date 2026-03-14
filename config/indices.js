/* ================================================================== */
/*  Index definitions with exchange coordinates                       */
/* ================================================================== */

const INDICES = [
  // Americas
  { sym: "^GSPC",      name: "S&P 500",             co: "United States",  fl: "\u{1F1FA}\u{1F1F8}", desc: "Large cap benchmark covering approximately 80% of U.S. equity market capitalization.",      lat: 40.71,  lng: -74.01, tz: "America/New_York",      mktOpen: [9,30],  mktClose: [16,0]  },
  { sym: "^GSPTSE",    name: "S&P/TSX Composite",   co: "Canada",         fl: "\u{1F1E8}\u{1F1E6}", desc: "Broad benchmark for the Canadian equity market.",                                          lat: 43.65,  lng: -79.38, tz: "America/Toronto",       mktOpen: [9,30],  mktClose: [16,0]  },
  { sym: "^BVSP",      name: "Ibovespa",            co: "Brazil",         fl: "\u{1F1E7}\u{1F1F7}", desc: "Main benchmark of Brazilian equities.",                                                    lat: -23.55, lng: -46.63, tz: "America/Sao_Paulo",     mktOpen: [10,0],  mktClose: [17,30] },
  { sym: "^MXX",       name: "S&P/BMV IPC",         co: "Mexico",         fl: "\u{1F1F2}\u{1F1FD}", desc: "Flagship Mexican equity index.",                                                           lat: 19.43,  lng: -99.13, tz: "America/Mexico_City",   mktOpen: [8,30],  mktClose: [15,0]  },

  // Europe
  { sym: "^FTSE",      name: "FTSE 100",            co: "United Kingdom", fl: "\u{1F1EC}\u{1F1E7}", desc: "Large cap index representing the largest companies listed in London.",                      lat: 51.51,  lng: -0.13,  tz: "Europe/London",         mktOpen: [8,0],   mktClose: [16,30] },
  { sym: "^GDAXI",     name: "DAX",                 co: "Germany",        fl: "\u{1F1E9}\u{1F1EA}", desc: "Tracks 40 major German blue chip companies.",                                              lat: 50.11,  lng: 8.68,   tz: "Europe/Berlin",         mktOpen: [9,0],   mktClose: [17,30] },
  { sym: "^FCHI",      name: "CAC 40",              co: "France",         fl: "\u{1F1EB}\u{1F1F7}", desc: "Leading benchmark of large French equities.",                                               lat: 48.86,  lng: 2.35,   tz: "Europe/Paris",          mktOpen: [9,0],   mktClose: [17,30] },
  { sym: "^SSMI",      name: "SMI",                 co: "Switzerland",    fl: "\u{1F1E8}\u{1F1ED}", desc: "Swiss Market Index covering major Swiss blue chips.",                                       lat: 47.38,  lng: 8.54,   tz: "Europe/Zurich",         mktOpen: [9,0],   mktClose: [17,30] },
  { sym: "^AEX",       name: "AEX",                 co: "Netherlands",    fl: "\u{1F1F3}\u{1F1F1}", desc: "Tracks leading Dutch listed companies.",                                                   lat: 52.37,  lng: 4.90,   tz: "Europe/Amsterdam",      mktOpen: [9,0],   mktClose: [17,30] },
  { sym: "FTSEMIB.MI", name: "FTSE MIB",            co: "Italy",          fl: "\u{1F1EE}\u{1F1F9}", desc: "Large cap Italian equity benchmark.",                                                      lat: 45.46,  lng: 9.19,   tz: "Europe/Rome",           mktOpen: [9,0],   mktClose: [17,30] },
  { sym: "^IBEX",      name: "IBEX 35",             co: "Spain",          fl: "\u{1F1EA}\u{1F1F8}", desc: "Principal Spanish stock market index.",                                                     lat: 40.42,  lng: -3.70,  tz: "Europe/Madrid",         mktOpen: [9,0],   mktClose: [17,30] },

  // Asia Pacific
  { sym: "^N225",      name: "Nikkei 225",          co: "Japan",          fl: "\u{1F1EF}\u{1F1F5}", desc: "Price weighted index of major Japanese companies.",                                         lat: 35.68,  lng: 139.69, tz: "Asia/Tokyo",            mktOpen: [9,0],   mktClose: [15,0]  },
  { sym: "000300.SS",  name: "CSI 300",             co: "China",          fl: "\u{1F1E8}\u{1F1F3}", desc: "Represents large and mid cap A-shares from Shanghai and Shenzhen.",                         lat: 31.23,  lng: 121.47, tz: "Asia/Shanghai",         mktOpen: [9,30],  mktClose: [15,0]  },
  { sym: "^NSEI",      name: "NIFTY 50",            co: "India",          fl: "\u{1F1EE}\u{1F1F3}", desc: "Tracks 50 major Indian companies listed on NSE.",                                           lat: 19.08,  lng: 72.88,  tz: "Asia/Kolkata",          mktOpen: [9,15],  mktClose: [15,30] },
  { sym: "^KS11",      name: "KOSPI",               co: "South Korea",    fl: "\u{1F1F0}\u{1F1F7}", desc: "Primary benchmark of the Korean equity market.",                                            lat: 37.57,  lng: 126.98, tz: "Asia/Seoul",            mktOpen: [9,0],   mktClose: [15,30] },
  { sym: "^AXJO",      name: "S&P/ASX 200",         co: "Australia",      fl: "\u{1F1E6}\u{1F1FA}", desc: "Covers the 200 largest companies listed in Australia.",                                     lat: -33.87, lng: 151.21, tz: "Australia/Sydney",       mktOpen: [10,0],  mktClose: [16,0]  },
  { sym: "^HSI",       name: "Hang Seng Index",     co: "Hong Kong",      fl: "\u{1F1ED}\u{1F1F0}", desc: "Tracks major companies listed in Hong Kong.",                                               lat: 22.32,  lng: 114.17, tz: "Asia/Hong_Kong",        mktOpen: [9,30],  mktClose: [16,0]  },
  { sym: "^STI",       name: "Straits Times Index",  co: "Singapore",     fl: "\u{1F1F8}\u{1F1EC}", desc: "Benchmark for Singapore\u2019s leading listed firms.",                                      lat: 1.35,   lng: 103.82, tz: "Asia/Singapore",        mktOpen: [9,0],   mktClose: [17,0]  },

  // Africa
  { sym: "^J200.JO",   name: "FTSE/JSE Top 40",     co: "South Africa",  fl: "\u{1F1FF}\u{1F1E6}", desc: "Large cap benchmark for South Africa.",                                                     lat: -26.20, lng: 28.04,  tz: "Africa/Johannesburg",   mktOpen: [9,0],   mktClose: [17,0]  },
];
