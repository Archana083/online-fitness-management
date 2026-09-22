<script setup lang="ts">
defineProps<{
  modelValue?: string;
  placeholder?: string;
  label?: string;
  type?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <div class="space-y-1.5">
    <label v-if="label" class="text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <input
      :type="type || 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
      @input="
        emit(
          'update:modelValue',
          ($event.target as HTMLInputElement).value,
        )
      "
    />
  </div>
</template>