/* State global Netcrack (Alpine.store) */
document.addEventListener('alpine:init', () => {
  Alpine.store('app', {
    // ---- data ----
    loading: true,
    error: null,
    heroList: [],
    heroIndex: 0,
    rows: [],
    myList: NC.helpers.storage.get('myList', []),
    yearFilter: null,   // null = tampilkan semua tahun

    // ---- modal detail ----
    modal: { open: false, loading: false, movie: null, trailerKey: null, playTrailer: false },

    // ---- pencarian ----
    search: { open: false, query: '', results: [], loading: false, searched: false },

    // ---- toast ----
    toast: { show: false, message: '' },

    _heroTimer: null,
    _toastTimer: null,

    /** Daftar tahun unik yang tersedia dari semua baris film, urut terbaru */
    get availableYears() {
      const set = new Set();
      for (const row of this.rows) {
        for (const m of row.items) {
          const y = m.release_date ? m.release_date.slice(0, 4) : null;
          if (y) set.add(y);
        }
      }
      return [...set].sort((a, b) => b - a);
    },

    /** Baris yang ditampilkan: Daftar Saya (jika ada) + baris dari API, difilter tahun */
    get allRows() {
      let list = [...this.rows];
      if (this.myList.length) {
        list.unshift({ key: 'mylist', title: 'Daftar Saya', items: this.myList });
      }
      // Terapkan filter tahun
      if (this.yearFilter) {
        const yr = String(this.yearFilter);
        list = list
          .map(r => ({ ...r, items: r.items.filter(m => (m.release_date || '').startsWith(yr)) }))
          .filter(r => r.items.length > 0);
      }
      return list;
    },

    setYearFilter(year) {
      this.yearFilter = this.yearFilter === year ? null : year;
    },

    // ================= INIT =================
    async init() {
      await this.load();
    },

    /**
     * Terapkan override sinopsis ke array film secara immutable
     * (Alpine mendeteksi perubahan karena array-nya diganti baru)
     */
    _applyOverrides(items, overrideMap) {
      if (!overrideMap || !overrideMap.size) return items;
      return items.map(m =>
        overrideMap.has(m.id) ? { ...m, overview: overrideMap.get(m.id) } : m
      );
    },

    async load() {
      this.loading = true;
      this.error   = null;
      try {
        const [trending, popular, topRated, nowPlaying, upcoming] = await Promise.all([
          NC.api.trending(), NC.api.popular(), NC.api.topRated(),
          NC.api.nowPlaying(), NC.api.upcoming(),
        ]);

        let heroItems = trending.results
          .filter(m => m.backdrop_path)
          .slice(0, NC.config.HERO_COUNT);

        let rowDefs = [
          { key: 'trending',    title: 'Sedang Tren Minggu Ini', items: trending.results   },
          { key: 'popular',     title: 'Paling Populer',         items: popular.results    },
          { key: 'top-rated',   title: 'Rating Tertinggi',       items: topRated.results   },
          { key: 'now-playing', title: 'Sedang Tayang',          items: nowPlaying.results },
          { key: 'upcoming',    title: 'Segera Tayang',          items: upcoming.results   },
        ].map(r => ({ ...r, items: r.items.filter(m => m.poster_path) }));

        // ── Isi semua sinopsis yang kosong SEBELUM render ──
        const allLists = [heroItems, ...rowDefs.map(r => r.items)];
        const overrideMap = await NC.api.ensureAllOverviews(allLists);

        // Terapkan override secara immutable agar Alpine reactive
        this.heroList = this._applyOverrides(heroItems, overrideMap);
        this.rows = rowDefs.map(r => ({
          ...r,
          items: this._applyOverrides(r.items, overrideMap),
        }));

        this.startHero();
      } catch (e) {
        this.error = e.message || 'Terjadi kesalahan saat memuat data.';
      } finally {
        this.loading = false;
      }
    },

    // ================= HERO =================
    startHero() {
      clearInterval(this._heroTimer);
      this._heroTimer = setInterval(() => this.nextHero(), NC.config.HERO_INTERVAL);
    },
    nextHero() { this.heroIndex = (this.heroIndex + 1) % Math.max(this.heroList.length, 1); },
    setHero(i) { this.heroIndex = i; this.startHero(); },

    // ================= MODAL =================
    async openModal(id, autoplay = false) {
      this.modal = { open: true, loading: true, movie: null, trailerKey: null, playTrailer: false };
      try {
        const movie = await NC.api.detail(id);

        // Jika sinopsis kosong → coba en-US
        if (!movie.overview) {
          const enMovie = await NC.api.getEn(`/movie/${id}`, { append_to_response: 'videos,credits,similar' });
          if (enMovie && enMovie.overview) {
            movie.overview = enMovie.overview;
          } else {
            // Fallback cerdas berdasarkan data tersedia
            movie.overview = NC.api._buildFallback(movie);
          }
          // Gunakan video en-US jika id-ID kosong
          if (enMovie && (!movie.videos || !movie.videos.results.length) && enMovie.videos) {
            movie.videos = enMovie.videos;
          }
        }

        const videos  = (movie.videos && movie.videos.results) || [];
        const trailer = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer')
                     || videos.find(v => v.site === 'YouTube');
        this.modal.movie       = movie;
        this.modal.trailerKey  = trailer ? trailer.key : null;
        this.modal.playTrailer = autoplay && !!trailer;
        if (autoplay && !trailer) this.notify('Trailer belum tersedia untuk film ini.');
      } catch (e) {
        this.modal.open = false;
        this.notify(e.message);
      } finally {
        this.modal.loading = false;
      }
    },
    closeModal() {
      this.modal.open        = false;
      this.modal.playTrailer = false;
    },

    // ================= DAFTAR SAYA =================
    inList(id) { return this.myList.some(m => m.id === id); },
    toggleList(movie) {
      if (this.inList(movie.id)) {
        this.myList = this.myList.filter(m => m.id !== movie.id);
        this.notify('Dihapus dari Daftar Saya');
      } else {
        const { id, title, poster_path, backdrop_path, vote_average, release_date, overview } = movie;
        this.myList = [{ id, title, poster_path, backdrop_path, vote_average, release_date, overview }, ...this.myList];
        this.notify('Ditambahkan ke Daftar Saya');
      }
      NC.helpers.storage.set('myList', this.myList);
    },

    // ================= PENCARIAN =================
    openSearch()  { this.search.open = true; },
    closeSearch() { this.search = { open: false, query: '', results: [], loading: false, searched: false }; },
    async runSearch() {
      const q = this.search.query.trim();
      if (q.length < 2) { this.search.results = []; this.search.searched = false; return; }
      this.search.loading = true;
      try {
        const data = await NC.api.search(q);
        if (q !== this.search.query.trim()) return;
        let results = data.results.filter(m => m.poster_path);

        // Isi sinopsis kosong di hasil pencarian
        const overrideMap = await NC.api.ensureAllOverviews([results]);
        this.search.results = this._applyOverrides(results, overrideMap);
        this.search.searched = true;
      } catch (e) {
        this.notify(e.message);
      } finally {
        this.search.loading = false;
      }
    },

    // ================= TOAST =================
    notify(message) {
      this.toast = { show: true, message };
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => (this.toast.show = false), 2800);
    },
  });
});
