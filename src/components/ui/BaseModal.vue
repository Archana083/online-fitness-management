<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  title: string;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      @click.self="emit('close')"
    >
      <div class="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div class="flex items-center justify-between border-b px-6 py-4">
          <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
          <button
            type="button"
            class="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            @click="emit('close')"
          >
            ✕
          </button>
        </div>
        <div class="p-6">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
