<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "success" | "warning" | "danger" | "info";
  }>(),
  {
    variant: "info",
  },
);

const variants = {
  success:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/15 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20",
  warning:
    "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/15 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20",
  danger:
    "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/15 dark:bg-red-400/10 dark:text-red-300 dark:ring-red-400/20",
  info:
    "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/15 dark:bg-orange-400/10 dark:text-orange-300 dark:ring-orange-400/20",
};
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
    :class="variants[variant]"
  >
    <slot />
  </span>
</template>
