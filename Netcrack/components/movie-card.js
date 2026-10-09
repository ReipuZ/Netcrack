/* Komponen: Kartu film — versi dengan sinopsis, dipakai di grid row */
window.NC = window.NC || {};
NC.components = NC.components || {};

NC.components.movieCard = (classes = '') => `
<article tabindex="0" role="button" :aria-label="'Buka detail ' + movie.title"
         @click="$store.app.openModal(movie.id)" @keydown.enter="$store.app.openModal(movie.id)"
         class="nc-card group relative cursor-pointer rounded-2xl border border-gold-500/15 bg-ink-800 overflow-hidden flex flex-col ${classes}">

  <!-- Poster -->
  <div class="relative overflow-hidden" style="aspect-ratio: 2/3; flex-shrink: 0;">
    <img :src="NC.helpers.img(movie.poster_path, 'w342')" :alt="movie.title" loading="lazy"
         class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />

    <!-- Overlay gradient -->
    <div class="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent"></div>

    <!-- Rating badge -->
    <div class="absolute top-2 left-2 inline-flex items-center gap-1 rounded-lg bg-ink-950/75 backdrop-blur-sm px-2 py-1 text-[11px] font-bold text-gold-300 border border-gold-500/20">
      <svg class="h-3 w-3" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>
      <span x-text="NC.helpers.rating(movie.vote_average)"></span>
    </div>

    <!-- Tombol tambah list -->
    <button type="button" @click.stop="$store.app.toggleList(movie)"
            :aria-label="$store.app.inList(movie.id) ? 'Hapus dari Daftar Saya' : 'Tambah ke Daftar Saya'"
            class="glass absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full text-gold-200 opacity-0 transition-all duration-200 hover:text-white group-hover:opacity-100 group-focus-visible:opacity-100"
            :class="$store.app.inList(movie.id) && 'opacity-100 !bg-gold-500/20'">
      <svg x-show="!$store.app.inList(movie.id)" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
      <svg x-show="$store.app.inList(movie.id)" x-cloak class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.6" viewBox="0 0 24 24"><path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>

    <!-- Year badge bawah -->
    <span class="absolute bottom-2 right-2 rounded-md bg-ink-950/70 backdrop-blur-sm px-1.5 py-0.5 text-[10px] text-zinc-400"
          x-text="NC.helpers.year(movie.release_date)"></span>
  </div>

  <!-- Info bawah poster -->
  <div class="flex flex-col flex-1 p-3">
    <h3 class="text-xs font-semibold leading-snug text-white line-clamp-2 mb-1.5" x-text="movie.title"></h3>
    <p class="text-[10px] leading-relaxed text-zinc-400 line-clamp-3 flex-1"
       x-text="movie.overview || 'Sinopsis belum tersedia untuk film ini.'"></p>

    <!-- CTA -->
    <div class="mt-2 pt-2 border-t border-gold-500/10 flex items-center justify-between">
      <span class="text-[9px] uppercase tracking-widest text-gold-500/70 font-semibold">Detail</span>
      <svg class="h-3.5 w-3.5 text-gold-400 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
  </div>
</article>`;

/* Varian besar untuk kartu featured di awal row */
NC.components.movieCardFeatured = () => `
<article tabindex="0" role="button" :aria-label="'Buka detail ' + movie.title"
         @click="$store.app.openModal(movie.id)" @keydown.enter="$store.app.openModal(movie.id)"
         class="nc-card group relative cursor-pointer rounded-2xl border border-gold-500/20 bg-ink-800 overflow-hidden">

  <!-- Backdrop landscape -->
  <div class="relative overflow-hidden" style="aspect-ratio: 16/10;">
    <img :src="NC.helpers.img(movie.backdrop_path || movie.poster_path, 'w780')" :alt="movie.title" loading="lazy"
         class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
    <div class="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent"></div>

    <!-- Rating -->
    <div class="absolute top-3 left-3 inline-flex items-center gap-1 rounded-lg bg-ink-950/75 backdrop-blur-sm px-2.5 py-1.5 text-xs font-bold text-gold-300 border border-gold-500/20">
      <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>
      <span x-text="NC.helpers.rating(movie.vote_average)"></span>
    </div>

    <!-- Tombol tambah list -->
    <button type="button" @click.stop="$store.app.toggleList(movie)"
            :aria-label="$store.app.inList(movie.id) ? 'Hapus dari Daftar Saya' : 'Tambah ke Daftar Saya'"
            class="glass absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-gold-200 opacity-0 transition-all duration-200 hover:text-white group-hover:opacity-100 group-focus-visible:opacity-100"
            :class="$store.app.inList(movie.id) && 'opacity-100 !bg-gold-500/20'">
      <svg x-show="!$store.app.inList(movie.id)" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
      <svg x-show="$store.app.inList(movie.id)" x-cloak class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.6" viewBox="0 0 24 24"><path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  </div>

  <!-- Info -->
  <div class="p-4">
    <div class="flex items-start justify-between gap-2 mb-2">
      <h3 class="font-display text-2xl leading-tight text-white tracking-wide line-clamp-2" x-text="movie.title"></h3>
      <span class="shrink-0 rounded-md bg-ink-900 px-2 py-1 text-[11px] text-zinc-400 border border-gold-500/10"
            x-text="NC.helpers.year(movie.release_date)"></span>
    </div>
    <p class="text-sm leading-relaxed text-zinc-400 line-clamp-3"
       x-text="movie.overview || 'Sinopsis belum tersedia untuk film ini.'"></p>
    <div class="mt-3 pt-3 border-t border-gold-500/10 flex items-center gap-2">
      <span class="text-[10px] uppercase tracking-widest text-gold-500/60 font-semibold">Lihat detail</span>
      <svg class="h-3.5 w-3.5 text-gold-400 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
  </div>
</article>`;
