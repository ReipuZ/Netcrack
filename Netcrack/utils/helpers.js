/* Fungsi bantu umum */
window.NC = window.NC || {};

NC.helpers = {
  /** URL gambar TMDB (ukuran: w185, w342, w500, w780, w1280, original) */
  img(path, size = 'w342') {
    return path ? `${NC.config.IMG_URL}/${size}${path}` : NC.config.PLACEHOLDER;
  },

  year(date) {
    return date ? String(date).slice(0, 4) : '-';
  },

  rating(value) {
    return value ? Number(value).toFixed(1) : 'NR';
  },

  runtime(min) {
    if (!min) return '';
    const h = Math.floor(min / 60);
    const m = min % 60;
    return h ? `${h}j ${m}m` : `${m}m`;
  },

  debounce(fn, delay = 300) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  },

  /** localStorage aman (tidak error di mode privat) */
  storage: {
    get(key, fallback = null) {
      try {
        const v = localStorage.getItem('netcrack:' + key);
        return v ? JSON.parse(v) : fallback;
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem('netcrack:' + key, JSON.stringify(value)); } catch (e) { /* abaikan */ }
    },
  },

  /** Geser baris film ke kiri/kanan */
  scrollRow(el, dir = 1) {
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  },

  /** Gulir halus ke elemen berdasarkan id */
  goTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  },
};
