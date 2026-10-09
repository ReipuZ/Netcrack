/* Komponen: Hasil pencarian (muncul di atas baris film saat mencari) */
window.NC = window.NC || {};
NC.components = NC.components || {};

NC.components.searchResults = () => `
<section x-show="$store.app.search.open && $store.app.search.query.trim().length > 0" x-cloak
         x-transition.opacity
         class="fixed inset-0 z-30 overflow-y-auto bg-ink-950/85 px-4 pb-16 pt-28 backdrop-blur-md sm:px-8"
         aria-live="polite">
  <div class="mx-auto max-w-[1500px]">
    <div class="mb-6 flex items-end justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="h-7 w-1 rounded-full bg-gradient-to-b from-gold-300 to-gold-600"></div>
        <h2 class="font-display text-4xl text-gold-100 sm:text-5xl">
          Hasil untuk <span class="gold-text" x-text="$store.app.search.query"></span>
        </h2>
      </div>
      <button type="button" class="btn-glass glass-light shrink-0" @click="$store.app.closeSearch()">Tutup</button>
    </div>

    <p x-show="$store.app.search.loading" class="text-sm text-zinc-400">Mencari film...</p>

    <p x-show="!$store.app.search.loading && $store.app.search.query.trim().length < 2" class="text-sm text-zinc-400">
      Ketik minimal 2 huruf untuk mulai mencari.
    </p>

    <div x-show="!$store.app.search.loading && $store.app.search.searched && $store.app.search.results.length === 0" x-cloak
         class="glass mx-auto mt-10 max-w-md rounded-3xl p-8 text-center">
      <h3 class="font-display text-3xl text-gold-300">Film tidak ditemukan</h3>
      <p class="mt-2 text-sm text-zinc-300">Coba kata kunci lain atau periksa ejaan judul.</p>
    </div>

    <!-- Grid hasil pencarian dengan sinopsis -->
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      <template x-for="movie in $store.app.search.results" :key="movie.id">
        ${NC.components.movieCard('w-full')}
      </template>
    </div>
  </div>
</section>`;

document.getElementById('search-results').innerHTML = NC.components.searchResults();
