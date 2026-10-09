/* Komponen: Navbar (glass, berubah saat scroll, pencarian, filter tahun, menu mobile) */
window.NC = window.NC || {};
NC.components = NC.components || {};

NC.components.navbar = () => `
<header x-data="{ scrolled: false, menu: false, yearOpen: false }"
        @scroll.window.passive="scrolled = window.scrollY > 40"
        @click.outside="yearOpen = false"
        class="fixed inset-x-0 top-0 z-40 transition-all duration-300"
        :class="scrolled ? 'py-2' : 'py-4'">
  <div class="mx-auto max-w-[1500px] px-4 sm:px-8">
    <nav class="flex items-center gap-3 rounded-2xl px-4 py-2.5 transition-all duration-300"
         :class="scrolled || menu ? 'glass-strong' : 'border border-transparent'">

      <!-- Logo -->
      <a href="#" @click.prevent="NC.helpers.goTo('hero')" class="flex items-center gap-2.5 shrink-0" aria-label="Netcrack beranda">
        <img src="assets/img/logo.svg" alt="" class="h-8 w-8" />
        <span class="font-display text-3xl tracking-wider gold-text leading-none">NETCRACK</span>
      </a>

      <!-- Nav links desktop -->
      <ul class="ml-4 hidden items-center gap-1 lg:flex">
        <template x-for="link in [
          { label: 'Beranda', id: 'hero' },
          { label: 'Tren', id: 'row-trending' },
          { label: 'Populer', id: 'row-popular' },
          { label: 'Rating Tertinggi', id: 'row-top-rated' },
          { label: 'Segera Tayang', id: 'row-upcoming' }
        ]" :key="link.id">
          <li>
            <button type="button" @click="NC.helpers.goTo(link.id)"
                    class="rounded-lg px-3 py-1.5 text-sm text-zinc-300 transition hover:bg-gold-500/10 hover:text-gold-200"
                    x-text="link.label"></button>
          </li>
        </template>

        <!-- ── Dropdown Tahun Rilis ── -->
        <li class="relative" x-data>
          <button type="button" id="btn-year-filter"
                  @click="yearOpen = !yearOpen"
                  class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition"
                  :class="$store.app.yearFilter
                    ? 'bg-gold-500/20 text-gold-200 border border-gold-500/30'
                    : 'text-zinc-300 hover:bg-gold-500/10 hover:text-gold-200'">
            <!-- Calendar icon -->
            <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span x-text="$store.app.yearFilter ? $store.app.yearFilter : 'Tahun Rilis'"></span>
            <!-- Badge aktif -->
            <span x-show="$store.app.yearFilter" x-cloak
                  class="ml-0.5 grid h-4 w-4 place-items-center rounded-full bg-gold-400 text-[9px] font-bold text-ink-950"
                  @click.stop="$store.app.setYearFilter(null)">✕</span>
            <!-- Chevron -->
            <svg x-show="!$store.app.yearFilter"
                 class="h-3 w-3 shrink-0 text-zinc-500 transition-transform duration-200"
                 :class="yearOpen ? 'rotate-180' : ''"
                 fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Dropdown panel -->
          <div x-show="yearOpen && $store.app.availableYears.length" x-cloak
               x-transition:enter="transition duration-150 ease-out"
               x-transition:enter-start="opacity-0 -translate-y-2 scale-95"
               x-transition:enter-end="opacity-100 translate-y-0 scale-100"
               x-transition:leave="transition duration-100 ease-in"
               x-transition:leave-end="opacity-0 -translate-y-2 scale-95"
               @click.outside="yearOpen = false"
               class="nc-year-dropdown glass-strong absolute left-0 top-full mt-2 w-52 rounded-2xl p-2 shadow-2xl z-50">

            <!-- Header dropdown -->
            <div class="flex items-center justify-between px-2 pb-2 mb-1 border-b border-gold-500/15">
              <span class="text-[10px] uppercase tracking-widest text-gold-500/60 font-semibold">Filter Tahun</span>
              <button x-show="$store.app.yearFilter" x-cloak type="button"
                      @click="$store.app.setYearFilter(null); yearOpen = false"
                      class="text-[10px] text-gold-400 hover:text-gold-200 transition">Hapus filter</button>
            </div>

            <!-- Daftar tahun dalam grid -->
            <div class="grid grid-cols-3 gap-1 max-h-52 overflow-y-auto">
              <template x-for="yr in $store.app.availableYears" :key="yr">
                <button type="button"
                        @click="$store.app.setYearFilter(yr); yearOpen = false"
                        class="rounded-lg px-2 py-2 text-xs font-semibold transition text-center"
                        :class="$store.app.yearFilter === yr
                          ? 'bg-gold-500 text-ink-950 shadow-md shadow-gold-500/30'
                          : 'text-zinc-300 hover:bg-gold-500/10 hover:text-gold-200'"
                        x-text="yr"></button>
              </template>
            </div>
          </div>
        </li>
      </ul>

      <div class="ml-auto flex items-center gap-2">
        <!-- Badge filter tahun aktif (mobile) -->
        <button x-show="$store.app.yearFilter" x-cloak
                @click="$store.app.setYearFilter(null)"
                type="button"
                class="flex items-center gap-1 rounded-full bg-gold-500/20 border border-gold-500/30 px-2.5 py-1 text-xs font-bold text-gold-200 lg:hidden">
          <span x-text="$store.app.yearFilter"></span>
          <svg class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" stroke-linecap="round"/></svg>
        </button>

        <!-- Pencarian -->
        <div class="flex items-center rounded-xl transition-all duration-300"
             :class="$store.app.search.open ? 'glass-light w-52 sm:w-72 pr-2' : 'w-10'">
          <button type="button" class="grid h-10 w-10 shrink-0 place-items-center text-gold-300 hover:text-gold-100"
                  @click="$store.app.openSearch(); $nextTick(() => $refs.q.focus())" aria-label="Cari film">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5" stroke-linecap="round"/></svg>
          </button>
          <input x-ref="q" type="search" placeholder="Cari judul film"
                 x-show="$store.app.search.open" x-cloak
                 x-model="$store.app.search.query"
                 @input.debounce.450ms="$store.app.runSearch()"
                 @keydown.escape="$store.app.closeSearch()"
                 class="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none" />
          <button type="button" x-show="$store.app.search.open" x-cloak @click="$store.app.closeSearch()"
                  class="text-zinc-400 hover:text-gold-200" aria-label="Tutup pencarian">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" stroke-linecap="round"/></svg>
          </button>
        </div>

        <!-- Tombol menu mobile -->
        <button type="button" class="grid h-10 w-10 place-items-center rounded-xl text-gold-300 hover:bg-gold-500/10 lg:hidden"
                @click="menu = !menu" :aria-expanded="menu" aria-label="Buka menu">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path x-show="!menu" d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/>
            <path x-show="menu" x-cloak d="M6 6l12 12M18 6 6 18" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </nav>

    <!-- Menu mobile -->
    <div x-show="menu" x-cloak x-transition.opacity class="glass-strong mt-2 rounded-2xl p-2 lg:hidden">
      <template x-for="link in [
        { label: 'Beranda', id: 'hero' },
        { label: 'Tren', id: 'row-trending' },
        { label: 'Populer', id: 'row-popular' },
        { label: 'Rating Tertinggi', id: 'row-top-rated' },
        { label: 'Segera Tayang', id: 'row-upcoming' }
      ]" :key="link.id">
        <button type="button" @click="menu = false; NC.helpers.goTo(link.id)"
                class="block w-full rounded-xl px-4 py-3 text-left text-sm text-zinc-200 hover:bg-gold-500/10 hover:text-gold-200"
                x-text="link.label"></button>
      </template>

      <!-- Pemilih tahun mobile -->
      <div class="border-t border-gold-500/15 mt-2 pt-2">
        <p class="px-4 pb-2 text-[10px] uppercase tracking-widest text-gold-500/50 font-semibold">Filter Tahun Rilis</p>
        <div class="flex flex-wrap gap-1 px-2 pb-2">
          <button type="button"
                  @click="$store.app.setYearFilter(null); menu = false"
                  class="rounded-lg px-3 py-1.5 text-xs font-semibold transition"
                  :class="!$store.app.yearFilter ? 'bg-gold-500 text-ink-950' : 'text-zinc-300 hover:bg-gold-500/10'">
            Semua
          </button>
          <template x-for="yr in $store.app.availableYears" :key="'mob-' + yr">
            <button type="button"
                    @click="$store.app.setYearFilter(yr); menu = false"
                    class="rounded-lg px-3 py-1.5 text-xs font-semibold transition"
                    :class="$store.app.yearFilter === yr ? 'bg-gold-500 text-ink-950' : 'text-zinc-300 hover:bg-gold-500/10 hover:text-gold-200'"
                    x-text="yr"></button>
          </template>
        </div>
      </div>
    </div>
  </div>
</header>`;

document.getElementById('navbar').innerHTML = NC.components.navbar();
