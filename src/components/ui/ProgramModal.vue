<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import type { Program, ProgramLevel, ProgramStatus } from "@/data/mock/programs";

const props = withDefaults(defineProps<{ isOpen: boolean; program?: Program | null }>(), { program: null });
const emit = defineEmits<{ close: []; save: [program: Program] }>();

const emptyForm = (): Omit<Program, "id"> => ({
  name: "", category: "Weight Loss", level: "Beginner", durationWeeks: 8,
  sessionsPerWeek: 4, price: 4999, clients: 0, status: "Active", description: "",
});
const form = reactive<Omit<Program, "id">>(emptyForm());
const isEditMode = computed(() => !!props.program);
const title = computed(() => (isEditMode.value ? "Edit Program" : "Add Program"));

watch(() => props.program, (program) => Object.assign(form, program ? { ...program } : emptyForm()), { immediate: true });

const submit = () => {
  if (!form.name.trim() || !form.description.trim()) return;
  emit("save", {
    id: props.program?.id ?? Date.now(),
    ...form,
    durationWeeks: Number(form.durationWeeks),
    sessionsPerWeek: Number(form.sessionsPerWeek),
    price: Number(form.price),
    clients: Number(form.clients),
    level: form.level as ProgramLevel,
    status: form.status as ProgramStatus,
  });
};
</script>

<template>
  <BaseModal :is-open="isOpen" :title="title" @close="emit('close')">
    <form class="space-y-5" @submit.prevent="submit">
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="space-y-1.5 sm:col-span-2"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Program name</span><input v-model="form.name" required placeholder="e.g. Fat Loss Foundation" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></label>
        <label class="space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Category</span><select v-model="form.category" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"><option>Weight Loss</option><option>Strength</option><option>Functional</option><option>Mobility</option><option>Performance</option><option>General Fitness</option></select></label>
        <label class="space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Level</span><select v-model="form.level" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
        <label class="space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Duration (weeks)</span><input v-model.number="form.durationWeeks" type="number" min="1" required class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></label>
        <label class="space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Sessions / week</span><input v-model.number="form.sessionsPerWeek" type="number" min="1" max="14" required class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></label>
        <label class="space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Price (₹)</span><input v-model.number="form.price" type="number" min="0" required class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></label>
        <label class="space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Status</span><select v-model="form.status" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"><option>Active</option><option>Draft</option><option>Archived</option></select></label>
      </div>
      <label class="block space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Description</span><textarea v-model="form.description" rows="3" required class="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></label>
      <div class="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800"><BaseButton type="button" variant="secondary" @click="emit('close')">Cancel</BaseButton><BaseButton type="submit">{{ isEditMode ? "Save Changes" : "Add Program" }}</BaseButton></div>
    </form>
  </BaseModal>
</template>
