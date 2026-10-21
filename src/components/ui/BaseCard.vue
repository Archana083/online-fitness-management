<template>
  <section
    class="rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/[0.03] transition-colors dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/10"
  >
    <div
      v-if="$slots.header"
      class="border-b border-slate-100 px-5 py-4 dark:border-slate-800"
    >
      <slot name="header" />
    </div>

    <div class="p-5">
      <slot />
    </div>
  </section>
</template>
