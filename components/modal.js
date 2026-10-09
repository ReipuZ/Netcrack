/* Komponen: Modal detail film + trailer */
window.NC = window.NC || {};
NC.components = NC.components || {};

NC.components.modal = () => `
<div x-show="$store.app.modal.open" x-cloak
     x-effect="document.body.classList.toggle('overflow-hidden', $store.app.modal.open)"
     @keydown.escape.window="$store.app.closeModal()"
     class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-3 sm:p-8"
     role="dialog" aria-modal="true" aria-label="Detail film">

  <div class="fixed inset-0 bg-black/75 backdrop-blur-sm" @click="$store.app.closeModal()"
       x-show="$store.app.modal.open" x-transition.opacity></div>

  <div x-show="$store.app.modal.open"
       x-transition:enter="transition duration-300 ease-out" x-transition:enter-start="opacity-0 translate-y-6 scale-95" x-transition:enter-end="opacity-100 translate-y-0 scale-100"
       x-transition:leave="transition duration-200 ease-in" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0 scale-95"
       class="glass-strong relative z-10 my-auto w-full max-w-4xl overflow-hidden rounded-3xl">

    <button type="button" @click="$store.app.closeModal()" aria-label="Tutup"
            class="glass absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full text-gold-200 hover:text-white">
      <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" stroke-linecap="round"/></svg>
    </button>

    <!-- Loading -->
    <div x-show="$store.app.modal.loading" class="p-6">
      <div class="nc-skeleton aspect-video w-full rounded-2xl"></div>
      <div class="nc-skeleton mt-6 h-8 w-2/3 rounded-lg"></div>
      <div class="nc-skeleton mt-4 h-24 w-full rounded-lg"></div>
    </div>

    <template x-if="$store.app.modal.movie && !$store.app.modal.loading">
      <div x-data="{ m: $store.app.modal.movie }">
        <!-- Trailer / backdrop -->
        <div class="relative aspect-video w-full bg-black">
          <template x-if="$store.app.modal.playTrailer">
            <iframe class="absolute inset-0 h-full w-full"
                    :src="'https://www.youtube.com/embed/' + $store.app.modal.trailerKey + '?autoplay=1&rel=0'"
                    title="Trailer film" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
          </template>
          <template x-if="!$store.app.modal.playTrailer">
            <div class="absolute inset-0">
              <img :src="NC.helpers.img(m.backdrop_path || m.poster_path, 'w1280')" :alt="m.title" class="h-full w-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent"></div>
              <div class="absolute bottom-5 left-5 right-5 flex flex-wrap items-center gap-3 sm:bottom-8 sm:left-8">
                <button type="button" class="btn-gold" x-show="$store.app.modal.trailerKey" @click="$store.app.modal.playTrailer = true">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  Putar trailer
                </button>
                <button type="button" class="btn-glass glass-light" @click="$store.app.toggleList(m)">
                  <span x-text="$store.app.inList(m.id) ? 'Ada di Daftar Saya' : 'Tambah ke Daftar Saya'"></span>
                </button>
              </div>
            </div>
          </template>
        </div>

        <!-- Info -->
        <div class="grid gap-8 p-5 sm:p-8 md:grid-cols-[1fr_16rem]">
          <div>
            <h2 class="font-display text-4xl leading-none tracking-wide text-white sm:text-6xl" x-text="m.title"></h2>
            <p x-show="m.tagline" class="mt-2 text-sm italic text-gold-300" x-text="m.tagline"></p>

            <div class="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
              <span class="inline-flex items-center gap-1 rounded-full bg-gold-500/15 px-2.5 py-1 font-semibold text-gold-200">
                <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>
                <span x-text="NC.helpers.rating(m.vote_average)"></span>
              </span>
              <span x-text="NC.helpers.year(m.release_date)"></span>
              <span x-show="m.runtime" x-text="NC.helpers.runtime(m.runtime)"></span>
            </div>

            <p class="mt-5 text-sm leading-relaxed text-zinc-300 sm:text-base" x-text="m.overview || 'Sinopsis belum tersedia.'"></p>

            <div class="mt-5 flex flex-wrap gap-2">
              <template x-for="g in (m.genres || [])" :key="g.id">
                <span class="glass-light rounded-full px-3 py-1 text-xs text-gold-100" x-text="g.name"></span>
              </template>
            </div>
          </div>

          <aside class="space-y-4 text-sm">
            <div class="glass-light rounded-2xl p-4">
              <p class="text-xs text-gold-400">Pemeran</p>
              <p class="mt-1 text-zinc-200" x-text="((m.credits && m.credits.cast) || []).slice(0, 5).map(c => c.name).join(', ') || '-'"></p>
            </div>
            <div class="glass-light rounded-2xl p-4">
              <p class="text-xs text-gold-400">Rilis</p>
              <p class="mt-1 text-zinc-200" x-text="m.release_date || '-'"></p>
            </div>
            <div class="glass-light rounded-2xl p-4">
              <p class="text-xs text-gold-400">Jumlah suara</p>
              <p class="mt-1 text-zinc-200" x-text="(m.vote_count || 0).toLocaleString('id-ID')"></p>
            </div>
          </aside>
        </div>

        <!-- Film serupa -->
        <div class="px-5 pb-8 sm:px-8" x-show="m.similar && m.similar.results.filter(s => s.poster_path).length">
          <h3 class="mb-3 font-display text-3xl text-gold-100">Film serupa</h3>
          <div class="no-scrollbar flex gap-3 overflow-x-auto pb-2">
            <template x-for="s in m.similar.results.filter(s => s.poster_path).slice(0, 10)" :key="s.id">
              <button type="button" @click="$store.app.openModal(s.id)" class="nc-card w-28 shrink-0 overflow-hidden rounded-xl border border-gold-500/15 sm:w-32" :aria-label="s.title">
                <img :src="NC.helpers.img(s.poster_path, 'w185')" :alt="s.title" loading="lazy" class="aspect-[2/3] w-full object-cover" />
              </button>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
</div>`;

document.getElementById('modal').innerHTML = NC.components.modal();
