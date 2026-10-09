/* Komponen: Hero slider film tren */
window.NC = window.NC || {};
NC.components = NC.components || {};

NC.components.hero = () => `
<section id="hero" class="relative h-[82vh] min-h-[520px] w-full overflow-hidden sm:h-[92vh]" aria-label="Film pilihan">

  <!-- Slide -->
  <template x-for="(m, i) in $store.app.heroList" :key="m.id">
    <div x-show="i === $store.app.heroIndex" x-cloak
         x-transition:enter="transition-opacity duration-1000" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100"
         x-transition:leave="transition-opacity duration-700" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0"
         class="absolute inset-0">
      <img :src="NC.helpers.img(m.backdrop_path, 'w1280')" :alt="m.title" class="h-full w-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/70 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/50"></div>

      <div class="absolute inset-x-0 bottom-0 mx-auto max-w-[1500px] px-4 pb-36 sm:px-8 sm:pb-44">
        <div class="glass max-w-2xl rounded-3xl p-6 sm:p-8">
          <div class="mb-3 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
            <span class="inline-flex items-center gap-1 rounded-full bg-gold-500/15 px-2.5 py-1 font-semibold text-gold-200">
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>
              <span x-text="NC.helpers.rating(m.vote_average)"></span>
            </span>
            <span x-text="NC.helpers.year(m.release_date)"></span>
            <span class="text-gold-400">Trending minggu ini</span>
          </div>
          <h1 class="font-display text-5xl leading-[0.95] tracking-wide text-white sm:text-7xl" x-text="m.title"></h1>
          <p class="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-300 sm:text-base" x-text="m.overview || 'Sinopsis belum tersedia.'"></p>
          <div class="mt-6 flex flex-wrap gap-3">
            <button type="button" class="btn-gold" @click="$store.app.openModal(m.id, true)">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Putar trailer
            </button>
            <button type="button" class="btn-glass glass-light" @click="$store.app.openModal(m.id)">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01" stroke-linecap="round"/></svg>
              Detail film
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- Indikator -->
  <div class="absolute bottom-24 right-4 z-10 flex items-center gap-2 sm:bottom-32 sm:right-8" x-show="$store.app.heroList.length" x-cloak>
    <template x-for="(m, i) in $store.app.heroList" :key="'dot' + m.id">
      <button type="button" @click="$store.app.setHero(i)" :aria-label="'Slide ' + (i + 1)"
              class="h-1.5 rounded-full transition-all duration-500"
              :class="i === $store.app.heroIndex ? 'w-10 bg-gold-400' : 'w-4 bg-white/25 hover:bg-white/50'"></button>
    </template>
  </div>

  <!-- Placeholder saat memuat -->
  <div x-show="$store.app.loading" class="nc-skeleton absolute inset-0"></div>

  <!-- Pesan error -->
  <div x-show="$store.app.error" x-cloak class="absolute inset-0 grid place-items-center px-6">
    <div class="glass-strong max-w-md rounded-3xl p-8 text-center">
      <h2 class="font-display text-4xl text-gold-300">Gagal memuat film</h2>
      <p class="mt-3 text-sm text-zinc-300" x-text="$store.app.error"></p>
      <button type="button" class="btn-gold mt-6" @click="$store.app.load()">Coba lagi</button>
    </div>
  </div>
</section>`;

document.getElementById('hero').innerHTML = NC.components.hero();
