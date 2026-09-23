<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import type { Exercise, ExerciseDifficulty } from "@/data/mock/exercises";

const props = withDefaults(defineProps<{ isOpen: boolean; exercise?: Exercise | null }>(), { exercise: null });
const emit = defineEmits<{ close: []; save: [exercise: Exercise] }>();

const emptyForm = (): Omit<Exercise, "id"> => ({
  name: "", muscleGroup: "Chest", equipment: "Bodyweight", difficulty: "Beginner",
  sets: 3, reps: "10-12", restSeconds: 60, instructions: "",
});
const form = reactive<Omit<Exercise, "id">>(emptyForm());
const isEditMode = computed(() => !!props.exercise);
const title = computed(() => isEditMode.value ? "Edit Exercise" : "Add Exercise");

watch(() => props.exercise, (exercise) => Object.assign(form, exercise ? { ...exercise } : emptyForm()), { immediate: true });

const submit = () => {
  if (!form.name.trim() || !form.instructions.trim()) return;
  emit("save", {
    id: props.exercise?.id ?? Date.now(),
    ...form,
    sets: Number(form.sets),
    restSeconds: Number(form.restSeconds),
    difficulty: form.difficulty as ExerciseDifficulty,
  });
};
</script>

<template>
  <BaseModal :is-open="isOpen" :title="title" @close="emit('close')">
    <form class="space-y-5" @submit.prevent="submit">
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="space-y-1.5 sm:col-span-2"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Exercise name</span><input v-model="form.name" required placeholder="e.g. Barbell Back Squat" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></label>
        <label class="space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Muscle group</span><select v-model="form.muscleGroup" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"><option>Chest</option><option>Back</option><option>Legs</option><option>Hamstrings</option><option>Shoulders</option><option>Arms</option><option>Core</option><option>Full Body</option></select></label>
        <label class="space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Equipment</span><select v-model="form.equipment" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"><option>Bodyweight</option><option>Dumbbells</option><option>Barbell</option><option>Cable Machine</option><option>Kettlebell</option><option>Resistance Band</option><option>Machine</option></select></label>
        <label class="space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Difficulty</span><select v-model="form.difficulty" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
        <label class="space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Sets</span><input v-model.number="form.sets" type="number" min="1" required class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></label>
        <label class="space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Reps / Duration</span><input v-model="form.reps" required placeholder="e.g. 8-12" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></label>
        <label class="space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Rest (seconds)</span><input v-model.number="form.restSeconds" type="number" min="0" required class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></label>
      </div>
      <label class="block space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Instructions</span><textarea v-model="form.instructions" rows="4" required placeholder="Explain correct form and execution..." class="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></label>
      <div class="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800"><BaseButton type="button" variant="secondary" @click="emit('close')">Cancel</BaseButton><BaseButton type="submit">{{ isEditMode ? "Save Changes" : "Add Exercise" }}</BaseButton></div>
    </form>
  </BaseModal>
</template>
