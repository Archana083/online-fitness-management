<script setup lang="ts">
import { computed, ref } from "vue";
import { Eye, Pencil, Plus, Search, Trash2, Dumbbell, Timer, RotateCcw } from "lucide-vue-next";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";
import ExerciseModal from "@/components/ui/ExerciseModal.vue";
import { exercises, type Exercise } from "@/data/mock/exercises";

const exerciseList = ref<Exercise[]>(exercises.map((exercise) => ({ ...exercise })));
const search = ref("");
const muscleFilter = ref("All");
const equipmentFilter = ref("All");
const difficultyFilter = ref<"All" | "Beginner" | "Intermediate" | "Advanced">("All");
const isModalOpen = ref(false);
const editingExercise = ref<Exercise | null>(null);
const selectedExercise = ref<Exercise | null>(null);
const exerciseToDelete = ref<Exercise | null>(null);

const muscles = computed(() => ["All", ...new Set(exerciseList.value.map((e) => e.muscleGroup))]);
const equipment = computed(() => ["All", ...new Set(exerciseList.value.map((e) => e.equipment))]);

const filteredExercises = computed(() => {
  const term = search.value.trim().toLowerCase();
  return exerciseList.value.filter((exercise) =>
    (!term || [exercise.name, exercise.muscleGroup, exercise.equipment].some((v) => v.toLowerCase().includes(term))) &&
    (muscleFilter.value === "All" || exercise.muscleGroup === muscleFilter.value) &&
    (equipmentFilter.value === "All" || exercise.equipment === equipmentFilter.value) &&
    (difficultyFilter.value === "All" || exercise.difficulty === difficultyFilter.value),
  );
});

const openCreate = () => { editingExercise.value = null; isModalOpen.value = true; };
const openEdit = (exercise: Exercise) => { editingExercise.value = { ...exercise }; isModalOpen.value = true; };
const saveExercise = (exercise: Exercise) => {
  const index = exerciseList.value.findIndex((item) => item.id === exercise.id);
  if (index >= 0) exerciseList.value[index] = exercise; else exerciseList.value.unshift(exercise);
  isModalOpen.value = false;
};
const confirmDelete = () => {
  if (!exerciseToDelete.value) return;
  exerciseList.value = exerciseList.value.filter((exercise) => exercise.id !== exerciseToDelete.value?.id);
  exerciseToDelete.value = null;
};
</script>

<template>
  <div class="space-y-7">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Workout library</p><h1 class="mt-1 text-3xl font-bold tracking-tight">Exercises</h1><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Build a reusable exercise library for workout plans and client training.</p></div>
      <BaseButton class="!rounded-xl !px-5" @click="openCreate"><Plus :size="17" class="mr-2" />Add Exercise</BaseButton>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p class="text-xs text-slate-500 dark:text-slate-400">Exercise library</p><p class="mt-2 text-2xl font-bold">{{ exerciseList.length }}</p></div>
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p class="text-xs text-slate-500 dark:text-slate-400">Muscle groups</p><p class="mt-2 text-2xl font-bold">{{ new Set(exerciseList.map((e) => e.muscleGroup)).size }}</p></div>
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p class="text-xs text-slate-500 dark:text-slate-400">Equipment types</p><p class="mt-2 text-2xl font-bold">{{ new Set(exerciseList.map((e) => e.equipment)).size }}</p></div>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div class="relative"><Search :size="17" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input v-model="search" placeholder="Search exercises..." class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white" /></div>
        <select v-model="muscleFilter" class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"><option v-for="item in muscles" :key="item">{{ item }}</option></select>
        <select v-model="equipmentFilter" class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"><option v-for="item in equipment" :key="item">{{ item }}</option></select>
        <select v-model="difficultyFilter" class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"><option>All</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
      </div>
    </div>

    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="overflow-x-auto"><table class="w-full min-w-[950px] text-left text-sm">
        <thead class="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/50"><tr><th class="px-5 py-3.5">Exercise</th><th class="px-4 py-3.5">Muscle group</th><th class="px-4 py-3.5">Equipment</th><th class="px-4 py-3.5">Difficulty</th><th class="px-4 py-3.5">Scheme</th><th class="px-4 py-3.5">Rest</th><th class="px-5 py-3.5 text-right">Actions</th></tr></thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
          <tr v-for="exercise in filteredExercises" :key="exercise.id" class="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
            <td class="px-5 py-4"><div class="flex items-center gap-3"><div class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"><Dumbbell :size="18" /></div><div><p class="font-semibold">{{ exercise.name }}</p><p class="text-xs text-slate-400">Exercise #{{ exercise.id }}</p></div></div></td>
            <td class="px-4 py-4">{{ exercise.muscleGroup }}</td><td class="px-4 py-4">{{ exercise.equipment }}</td>
            <td class="px-4 py-4"><BaseBadge :variant="exercise.difficulty === 'Beginner' ? 'success' : exercise.difficulty === 'Intermediate' ? 'warning' : 'danger'">{{ exercise.difficulty }}</BaseBadge></td>
            <td class="px-4 py-4"><span class="font-medium">{{ exercise.sets }} × {{ exercise.reps }}</span></td>
            <td class="px-4 py-4"><div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-300"><Timer :size="15" />{{ exercise.restSeconds }}s</div></td>
            <td class="px-5 py-4"><div class="flex justify-end gap-1"><button title="View" class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" @click="selectedExercise = exercise"><Eye :size="17" /></button><button title="Edit" class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" @click="openEdit(exercise)"><Pencil :size="17" /></button><button title="Delete" class="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30" @click="exerciseToDelete = exercise"><Trash2 :size="17" /></button></div></td>
          </tr>
          <tr v-if="filteredExercises.length === 0"><td colspan="7" class="px-5 py-12 text-center text-sm text-slate-400">No exercises match your filters.</td></tr>
        </tbody>
      </table></div>
    </div>

    <ExerciseModal :is-open="isModalOpen" :exercise="editingExercise" @close="isModalOpen = false" @save="saveExercise" />

    <Teleport to="body">
      <div v-if="selectedExercise" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" @click.self="selectedExercise = null">
        <div class="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-slate-800"><div><p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Exercise details</p><h2 class="mt-1 text-xl font-bold">{{ selectedExercise.name }}</h2></div><button class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" @click="selectedExercise = null">✕</button></div>
          <div class="space-y-5 p-6"><div class="flex flex-wrap gap-2"><BaseBadge>{{ selectedExercise.muscleGroup }}</BaseBadge><BaseBadge>{{ selectedExercise.equipment }}</BaseBadge><BaseBadge :variant="selectedExercise.difficulty === 'Beginner' ? 'success' : selectedExercise.difficulty === 'Intermediate' ? 'warning' : 'danger'">{{ selectedExercise.difficulty }}</BaseBadge></div><div class="grid grid-cols-3 gap-3"><div class="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><p class="text-xs text-slate-400">Sets</p><p class="mt-1 font-semibold">{{ selectedExercise.sets }}</p></div><div class="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><p class="text-xs text-slate-400">Reps</p><p class="mt-1 font-semibold">{{ selectedExercise.reps }}</p></div><div class="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><p class="text-xs text-slate-400">Rest</p><p class="mt-1 font-semibold">{{ selectedExercise.restSeconds }}s</p></div></div><div><p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Instructions</p><p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ selectedExercise.instructions }}</p></div></div>
        </div>
      </div>
      <div v-if="exerciseToDelete" class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4" @click.self="exerciseToDelete = null">
        <div class="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"><div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/30"><Trash2 :size="20" /></div><h2 class="text-lg font-bold">Delete exercise?</h2><p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">This will remove <strong class="text-slate-700 dark:text-slate-200">{{ exerciseToDelete.name }}</strong> from the mock exercise library.</p><div class="mt-6 flex justify-end gap-3"><BaseButton variant="secondary" @click="exerciseToDelete = null">Cancel</BaseButton><BaseButton variant="danger" @click="confirmDelete">Delete</BaseButton></div></div>
      </div>
    </Teleport>
  </div>
</template>
