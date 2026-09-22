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
  primary: "bg-gray-900 text-white hover:bg-gray-800",
  secondary: "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "text-gray-600 hover:bg-gray-100",
};
</script>

<template>
  <button
    :type="type"
    class="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition"
    :class="variants[variant]"
  >
    <slot />
  </button>
</template>