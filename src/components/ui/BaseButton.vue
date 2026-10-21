<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "primary" | "secondary" | "danger" | "ghost";
    type?: "button" | "submit";
  }>(),
  {
    variant: "primary",
    type: "button",
  },
);

const variants = {
  primary:
    "bg-orange-600 text-white shadow-sm shadow-orange-600/20 hover:bg-orange-700 focus-visible:ring-orange-500 dark:bg-orange-500 dark:shadow-orange-950/30 dark:hover:bg-orange-400",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:focus-visible:ring-slate-600",
  danger:
    "bg-red-600 text-white shadow-sm shadow-red-600/15 hover:bg-red-700 focus-visible:ring-red-500 dark:bg-red-500 dark:hover:bg-red-400",
  ghost:
    "text-slate-600 hover:bg-orange-50 hover:text-orange-700 focus-visible:ring-orange-200 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-orange-300 dark:focus-visible:ring-slate-700",
};
</script>

<template>
  <button
    :type="type"
    class="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] dark:focus-visible:ring-offset-slate-900"
    :class="variants[variant]"
  >
    <slot />
  </button>
</template>
