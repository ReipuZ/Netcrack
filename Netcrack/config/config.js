/* Konfigurasi global Netcrack (API TMDB) */
window.NC = window.NC || {};

NC.config = {
  APP_NAME: 'Netcrack',
  API_KEY: 'e1b7a2dd01fcf7175222978631d67e9d',
  BASE_URL: 'https://api.themoviedb.org/3',
  IMG_URL: 'https://image.tmdb.org/t/p',
  LANGUAGE: 'id-ID',
  HERO_COUNT: 6,          // jumlah film di slider hero
  HERO_INTERVAL: 9000,    // ms
  SEARCH_DELAY: 450,      // ms (debounce)
  PLACEHOLDER:
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="342" height="513" viewBox="0 0 342 513"><rect width="342" height="513" fill="#14110b"/><rect x="1" y="1" width="340" height="511" fill="none" stroke="#3a2f14"/><text x="171" y="262" fill="#6b5a2a" font-family="sans-serif" font-size="16" text-anchor="middle">Tanpa poster</text></svg>'
    ),
};
