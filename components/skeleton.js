/* Komponen: Skeleton loading untuk grid film */
window.NC = window.NC || {};
NC.components = NC.components || {};

NC.components.skeletonRows = () => `
<div x-show="$store.app.loading" class="space-y-12 px-4 pt-6 sm:px-8" aria-hidden="true">
  <template x-for="n in 3" :key="n">
    <div>
      <!-- Skeleton header -->
      <div class="flex items-center gap-4 mb-5">
        <div class="nc-skeleton h-6 w-1 rounded-full shrink-0"></div>
        <div class="nc-skeleton h-8 w-52 rounded-lg"></div>
      </div>
      <!-- Skeleton grid: featured + 4 portrait -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_minmax(0,55%)]">
        <!-- Featured skeleton -->
        <div class="rounded-2xl overflow-hidden">
          <div class="nc-skeleton w-full rounded-2xl" style="aspect-ratio:16/10"></div>
          <div class="nc-skeleton mt-2 h-4 w-3/4 rounded-md"></div>
          <div class="nc-skeleton mt-1 h-3 w-full rounded-md"></div>
        </div>
        <!-- 4 small cards skeleton -->
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <template x-for="k in 4" :key="k">
            <div>
              <div class="nc-skeleton w-full rounded-2xl" style="aspect-ratio:2/3"></div>
              <div class="nc-skeleton mt-2 h-3 w-full rounded-md"></div>
              <div class="nc-skeleton mt-1 h-2 w-3/4 rounded-md"></div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </template>
</div>`;
