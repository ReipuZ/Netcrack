/* Komponen: Notifikasi singkat (toast) */
window.NC = window.NC || {};
NC.components = NC.components || {};

NC.components.toast = () => `
<div class="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4" aria-live="polite">
  <div x-show="$store.app.toast.show" x-cloak
       x-transition:enter="transition duration-300" x-transition:enter-start="opacity-0 translate-y-4" x-transition:enter-end="opacity-100 translate-y-0"
       x-transition:leave="transition duration-200" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0"
       class="glass-strong rounded-2xl px-5 py-3 text-sm text-gold-100">
    <span x-text="$store.app.toast.message"></span>
  </div>
</div>`;

document.getElementById('toast').innerHTML = NC.components.toast();
