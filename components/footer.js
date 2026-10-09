/* Komponen: Footer */
window.NC = window.NC || {};
NC.components = NC.components || {};

NC.components.footer = () => `
<footer class="relative z-10 mt-10 px-4 pb-10 sm:px-8">
  <div class="glass mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-4 rounded-3xl px-6 py-6 text-center sm:flex-row sm:text-left">
    <div class="flex items-center gap-2.5">
      <img src="assets/img/logo.svg" alt="" class="h-7 w-7" />
      <span class="font-display text-2xl tracking-wider gold-text">NETCRACK</span>
    </div>
    <p class="max-w-xl text-xs leading-relaxed text-zinc-400">
      Produk ini memakai API TMDB tetapi tidak didukung atau disertifikasi oleh TMDB.
      Data dan gambar film milik <a href="https://www.themoviedb.org" target="_blank" rel="noopener" class="text-gold-300 underline-offset-2 hover:underline">TMDB</a>.
    </p>
  </div>
</footer>`;

document.getElementById('footer').innerHTML = NC.components.footer();
