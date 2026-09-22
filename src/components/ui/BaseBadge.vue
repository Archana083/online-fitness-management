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
  success: "bg-green-50 text-green-700",
  warning: "bg-yellow-50 text-yellow-700",
  danger: "bg-red-50 text-red-700",
  info: "bg-blue-50 text-blue-700",
};
</script>

<template>
  <span
    class="inline-flex rounded-full px-2.5 py-1 text-xs font-medium"
    :class="variants[variant]"
  >
    <slot />
  </span>
</template>