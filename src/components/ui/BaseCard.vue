<template>
  <div class="rounded-xl border border-gray-200 bg-white">
    <div v-if="$slots.header" class="border-b border-gray-100 px-5 py-4">
      <slot name="header" />
    </div>

    <div class="p-5">
      <slot />
    </div>
  </div>
</template>