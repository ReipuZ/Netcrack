/* Komponen: Grid film — layout campuran (featured + grid kecil) per kategori */
window.NC = window.NC || {};
NC.components = NC.components || {};

NC.components.movieRows = () => `
${NC.components.skeletonRows()}

<!-- Banner filter tahun aktif -->
<div x-show="$store.app.yearFilter && !$store.app.loading" x-cloak
     class="mx-4 mb-6 flex items-center justify-between gap-3 rounded-2xl border border-gold-500/25 bg-gold-500/8 px-5 py-3 sm:mx-8">
  <div class="flex items-center gap-2.5">
    <svg class="h-4 w-4 shrink-0 text-gold-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
    <span class="text-sm text-zinc-200">Menampilkan film tahun <strong class="text-gold-300" x-text="$store.app.yearFilter"></strong></span>
  </div>
  <button type="button" @click="$store.app.setYearFilter(null)"
          class="text-xs text-gold-400 hover:text-gold-200 transition underline underline-offset-2">Hapus filter</button>
</div>

<!-- Kosong saat filter tahun aktif -->
<div x-show="$store.app.yearFilter && !$store.app.loading && $store.app.allRows.length === 0" x-cloak
     class="glass mx-4 rounded-3xl p-10 text-center sm:mx-8">
  <p class="font-display text-3xl text-gold-300">Tidak ada film</p>
  <p class="mt-2 text-sm text-zinc-400">Tidak ada film yang tayang pada tahun <span class="text-gold-300" x-text="$store.app.yearFilter"></span>.</p>
  <button type="button" class="btn-gold mt-6" @click="$store.app.setYearFilter(null)">Tampilkan semua</button>
</div>

<template x-for="row in $store.app.allRows" :key="row.key">
  <section :id="'row-' + row.key" class="relative mb-14 scroll-mt-24" :aria-label="row.title">

    <!-- Header baris dengan garis aksen emas -->
    <div class="flex items-center gap-4 px-4 sm:px-8 mb-5">
      <div class="h-6 w-1 rounded-full bg-gradient-to-b from-gold-300 to-gold-600 shrink-0"></div>
      <h2 class="font-display text-3xl tracking-wide text-gold-100 sm:text-4xl" x-text="row.title"></h2>
      <div class="flex-1 h-px bg-gradient-to-r from-gold-500/20 to-transparent ml-2"></div>
    </div>

    <!-- Layout: Featured besar + grid 4 kartu kecil di samping, lalu grid sisa -->
    <div class="px-4 sm:px-8">

      <!-- Baris utama: 1 featured + 4 kartu portrait -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_minmax(0,55%)] xl:grid-cols-[1fr_minmax(0,58%)] mb-4">

        <!-- Featured (kartu besar landscape) -->
        <template x-if="row.items.length > 0">
          <div x-data="{ movie: row.items[0] }">
            ${NC.components.movieCardFeatured()}
          </div>
        </template>

        <!-- 4 kartu portrait di samping (atau lebih sedikit jika data kurang) -->
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <template x-for="movie in row.items.slice(1, 5)" :key="movie.id">
            ${NC.components.movieCard()}
          </template>
        </div>
      </div>

      <!-- Sisa film: scroll horizontal dengan snap -->
      <div x-show="row.items.length > 5">
        <p class="mb-3 text-xs uppercase tracking-widest text-gold-500/50 font-semibold">Lebih banyak</p>
        <div class="nc-snap-scroll no-scrollbar flex gap-3 overflow-x-auto pb-3 sm:gap-4">
          <template x-for="movie in row.items.slice(5)" :key="movie.id">
            <div class="nc-snap-item shrink-0 w-36 sm:w-44">
              ${NC.components.movieCard('w-full h-full')}
            </div>
          </template>
        </div>
      </div>

    </div>
  </section>
</template>`;

document.getElementById('rows').innerHTML = NC.components.movieRows();
