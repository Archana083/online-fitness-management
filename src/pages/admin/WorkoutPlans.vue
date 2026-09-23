<script setup lang="ts">
import { computed, ref } from "vue";
import { Eye, Pencil, Plus, Search, Trash2, Dumbbell, Users, CalendarDays } from "lucide-vue-next";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";
import WorkoutPlanModal from "@/components/ui/WorkoutPlanModal.vue";
import { workoutPlans, type WorkoutPlan } from "@/data/mock/workoutPlans";

const planList = ref<WorkoutPlan[]>(JSON.parse(JSON.stringify(workoutPlans)));
const search = ref("");
const statusFilter = ref("All");
const isModalOpen = ref(false);
const editingPlan = ref<WorkoutPlan | null>(null);
const selectedPlan = ref<WorkoutPlan | null>(null);
const planToDelete = ref<WorkoutPlan | null>(null);

const filteredPlans = computed(() => {
  const term = search.value.trim().toLowerCase();
  return planList.value.filter((plan) =>
    (!term || [plan.name, plan.clientName, plan.programName, plan.trainerName].some((v) => v.toLowerCase().includes(term))) &&
    (statusFilter.value === "All" || plan.status === statusFilter.value)
  );
});
const openCreate = () => { editingPlan.value = null; isModalOpen.value = true; };
const openEdit = (plan: WorkoutPlan) => { editingPlan.value = JSON.parse(JSON.stringify(plan)); isModalOpen.value = true; };
const savePlan = (plan: WorkoutPlan) => { const i = planList.value.findIndex((p) => p.id === plan.id); if (i >= 0) planList.value[i] = plan; else planList.value.unshift(plan); isModalOpen.value = false; };
const confirmDelete = () => { if (!planToDelete.value) return; planList.value = planList.value.filter((p) => p.id !== planToDelete.value?.id); planToDelete.value = null; };
</script>

<template>
  <div class="space-y-7">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Training delivery</p><h1 class="mt-1 text-3xl font-bold tracking-tight">Workout Plans</h1><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Build structured training plans and assign exercises to clients.</p></div><BaseButton class="!rounded-xl !px-5" @click="openCreate"><Plus :size="17" class="mr-2" />Create Plan</BaseButton></div>

    <div class="grid gap-4 sm:grid-cols-3">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p class="text-xs text-slate-500 dark:text-slate-400">Total plans</p><p class="mt-2 text-2xl font-bold">{{ planList.length }}</p></div>
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p class="text-xs text-slate-500 dark:text-slate-400">Active plans</p><p class="mt-2 text-2xl font-bold">{{ planList.filter((p) => p.status === "Active").length }}</p></div>
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p class="text-xs text-slate-500 dark:text-slate-400">Exercises assigned</p><p class="mt-2 text-2xl font-bold">{{ planList.reduce((sum, p) => sum + p.exercises.length, 0) }}</p></div>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div class="grid gap-3 sm:grid-cols-[1fr_220px]"><div class="relative"><Search :size="17" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input v-model="search" placeholder="Search plan, client, program, trainer..." class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white" /></div><select v-model="statusFilter" class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"><option>All</option><option>Active</option><option>Draft</option><option>Completed</option></select></div></div>

    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"><div class="overflow-x-auto"><table class="w-full min-w-[950px] text-left text-sm"><thead class="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/50"><tr><th class="px-5 py-3.5">Plan</th><th class="px-4 py-3.5">Client</th><th class="px-4 py-3.5">Program</th><th class="px-4 py-3.5">Trainer</th><th class="px-4 py-3.5">Exercises</th><th class="px-4 py-3.5">Duration</th><th class="px-4 py-3.5">Status</th><th class="px-5 py-3.5 text-right">Actions</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800">
      <tr v-for="plan in filteredPlans" :key="plan.id" class="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/40"><td class="px-5 py-4"><p class="font-semibold">{{ plan.name }}</p><p class="text-xs text-slate-400">#{{ plan.id }}</p></td><td class="px-4 py-4"><div class="flex items-center gap-1.5"><Users :size="15" class="text-slate-400" />{{ plan.clientName }}</div></td><td class="px-4 py-4">{{ plan.programName }}</td><td class="px-4 py-4">{{ plan.trainerName }}</td><td class="px-4 py-4"><div class="flex items-center gap-1.5"><Dumbbell :size="15" class="text-slate-400" />{{ plan.exercises.length }}</div></td><td class="px-4 py-4"><div class="flex items-center gap-1.5"><CalendarDays :size="15" class="text-slate-400" />{{ plan.durationWeeks }} weeks</div></td><td class="px-4 py-4"><BaseBadge :variant="plan.status === 'Active' ? 'success' : plan.status === 'Draft' ? 'warning' : 'info'">{{ plan.status }}</BaseBadge></td><td class="px-5 py-4"><div class="flex justify-end gap-1"><button title="View" class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" @click="selectedPlan = plan"><Eye :size="17" /></button><button title="Edit" class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" @click="openEdit(plan)"><Pencil :size="17" /></button><button title="Delete" class="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30" @click="planToDelete = plan"><Trash2 :size="17" /></button></div></td></tr>
      <tr v-if="filteredPlans.length === 0"><td colspan="8" class="px-5 py-12 text-center text-sm text-slate-400">No workout plans match your search.</td></tr>
    </tbody></table></div></div>

    <WorkoutPlanModal :is-open="isModalOpen" :plan="editingPlan" @close="isModalOpen = false" @save="savePlan" />
    <Teleport to="body">
      <div v-if="selectedPlan" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" @click.self="selectedPlan = null"><div class="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"><div class="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-slate-800"><div><p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Workout plan</p><h2 class="mt-1 text-xl font-bold">{{ selectedPlan.name }}</h2></div><button class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" @click="selectedPlan = null">✕</button></div><div class="p-6"><div class="grid gap-3 sm:grid-cols-4"><div><p class="text-xs text-slate-400">Client</p><p class="mt-1 text-sm font-semibold">{{ selectedPlan.clientName }}</p></div><div><p class="text-xs text-slate-400">Program</p><p class="mt-1 text-sm font-semibold">{{ selectedPlan.programName }}</p></div><div><p class="text-xs text-slate-400">Trainer</p><p class="mt-1 text-sm font-semibold">{{ selectedPlan.trainerName }}</p></div><div><p class="text-xs text-slate-400">Duration</p><p class="mt-1 text-sm font-semibold">{{ selectedPlan.durationWeeks }} weeks</p></div></div><div class="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"><div v-for="item in selectedPlan.exercises" :key="item.id" class="flex items-center justify-between border-b border-slate-100 p-3 last:border-0 dark:border-slate-800"><div><p class="text-sm font-medium">{{ exercises.find((e) => e.id === item.exerciseId)?.name }}</p><p class="text-xs text-slate-400">{{ item.day }} · {{ item.sets }} × {{ item.reps }}</p></div><span class="text-xs text-slate-500">{{ item.weight ? item.weight + " kg" : "Bodyweight" }} · {{ item.restSeconds }}s rest</span></div><div v-if="!selectedPlan.exercises.length" class="p-6 text-center text-sm text-slate-400">No exercises in this plan.</div></div></div></div></div>
      <div v-if="planToDelete" class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4" @click.self="planToDelete = null"><div class="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"><div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/30"><Trash2 :size="20" /></div><h2 class="text-lg font-bold">Delete workout plan?</h2><p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">This will remove <strong class="text-slate-700 dark:text-slate-200">{{ planToDelete.name }}</strong> from the mock data.</p><div class="mt-6 flex justify-end gap-3"><BaseButton variant="secondary" @click="planToDelete = null">Cancel</BaseButton><BaseButton variant="danger" @click="confirmDelete">Delete</BaseButton></div></div></div>
    </Teleport>
  </div>
</template>
