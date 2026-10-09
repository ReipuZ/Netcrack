/* Layanan API TMDB (semua pemanggilan jaringan lewat sini) */
window.NC = window.NC || {};

NC.api = {
  async get(path, params = {}) {
    const url = new URL(NC.config.BASE_URL + path);
    url.searchParams.set('api_key', NC.config.API_KEY);
    url.searchParams.set('language', NC.config.LANGUAGE);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Permintaan gagal (${res.status}). Periksa API key atau koneksi internet.`);
    }
    return res.json();
  },

  /** Fetch khusus bahasa Inggris sebagai fallback */
  async getEn(path, params = {}) {
    const url = new URL(NC.config.BASE_URL + path);
    url.searchParams.set('api_key', NC.config.API_KEY);
    url.searchParams.set('language', 'en-US');
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    const res = await fetch(url);
    if (!res.ok) return null;
    return res.json();
  },

  trending:  () => NC.api.get('/trending/movie/week'),
  popular:   () => NC.api.get('/movie/popular'),
  topRated:  () => NC.api.get('/movie/top_rated'),
  nowPlaying:() => NC.api.get('/movie/now_playing'),
  upcoming:  () => NC.api.get('/movie/upcoming'),
  byGenre:   (id) => NC.api.get('/discover/movie', { with_genres: id, sort_by: 'popularity.desc' }),

  search: (query) =>
    NC.api.get('/search/movie', { query, include_adult: 'false' }),

  /** Detail lengkap + video, kredit, dan film serupa dalam satu panggilan */
  detail: (id) =>
    NC.api.get(`/movie/${id}`, { append_to_response: 'videos,credits,similar' }),

  /**
   * Peta genre TMDB → label Indonesia (untuk fallback sinopsis cerdas)
   * Digunakan saat overview kosong bahkan di en-US.
   */
  _genreMap: {
    28: 'aksi', 12: 'petualangan', 16: 'animasi', 35: 'komedi',
    80: 'kejahatan', 99: 'dokumenter', 18: 'drama', 10751: 'keluarga',
    14: 'fantasi', 36: 'sejarah', 27: 'horor', 10402: 'musik',
    9648: 'misteri', 10749: 'romansa', 878: 'fiksi ilmiah',
    10770: 'TV movie', 53: 'thriller', 10752: 'perang', 37: 'western',
  },

  /**
   * Buat deskripsi fallback dari data yang tersedia (judul, genre, tahun, rating).
   * Digunakan sebagai LAST RESORT jika en-US pun tidak punya overview.
   */
  _buildFallback(movie) {
    const year   = movie.release_date ? movie.release_date.slice(0, 4) : null;
    const rating = movie.vote_average ? Number(movie.vote_average).toFixed(1) : null;
    const genres = (movie.genre_ids || [])
      .slice(0, 2)
      .map(id => NC.api._genreMap[id])
      .filter(Boolean);

    let desc = `"${movie.title}" adalah sebuah film`;
    if (genres.length) desc += ` ${genres.join(' dan ')}`;
    if (year) desc += ` yang dirilis pada tahun ${year}`;
    desc += '.';
    if (rating) desc += ` Film ini mendapat rating ${rating}/10 dari penonton di seluruh dunia.`;
    desc += ' Klik untuk melihat detail, trailer, dan informasi lengkap film ini.';

    return desc;
  },

  /**
   * Pastikan SETIAP film dalam daftar memiliki sinopsis.
   * Alur: id-ID kosong → fetch en-US → masih kosong → generate fallback cerdas.
   * Mengembalikan array film baru dengan overview yang sudah diisi (immutable update).
   * @param {Array[]} movieLists  - Array of movie arrays
   * @returns {Map<number, string>} - Map dari id → overview yang terisi
   */
  async ensureAllOverviews(movieLists) {
    // Kumpulkan semua film unik yang overview-nya kosong
    const missing = new Map(); // id → movie object
    for (const list of movieLists) {
      for (const movie of list) {
        if (!movie.overview && !missing.has(movie.id)) {
          missing.set(movie.id, movie);
        }
      }
    }

    if (missing.size === 0) return new Map(); // semua sudah punya sinopsis

    const ids = [...missing.keys()];
    const overrideMap = new Map(); // id → overview string yang terisi

    // Fetch en-US secara paralel, 10 request per batch
    const BATCH = 10;
    for (let i = 0; i < ids.length; i += BATCH) {
      const batch = ids.slice(i, i + BATCH);
      const results = await Promise.allSettled(
        batch.map(id => NC.api.getEn(`/movie/${id}`))
      );
      results.forEach((r, idx) => {
        const id    = batch[idx];
        const movie = missing.get(id);
        let   ov    = (r.status === 'fulfilled' && r.value && r.value.overview)
                        ? r.value.overview
                        : '';
        // Jika en-US pun masih kosong, buat fallback cerdas
        if (!ov) ov = NC.api._buildFallback(movie);
        overrideMap.set(id, ov);
      });
    }

    return overrideMap;
  },
};
