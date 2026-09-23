<script setup lang="ts">
import { computed, ref } from "vue";
import { Eye, Pencil, Plus, Search, Trash2, Users, CalendarDays, IndianRupee } from "lucide-vue-next";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";
import ProgramModal from "@/components/ui/ProgramModal.vue";
import { programs, type Program } from "@/data/mock/programs";

const programList = ref<Program[]>(programs.map((program) => ({ ...program })));
const search = ref("");
const statusFilter = ref<"All" | "Active" | "Draft" | "Archived">("All");
const categoryFilter = ref("All");
const levelFilter = ref("All");
const isModalOpen = ref(false);
const editingProgram = ref<Program | null>(null);
const selectedProgram = ref<Program | null>(null);
const programToDelete = ref<Program | null>(null);

const categories = computed(() => ["All", ...new Set(programList.value.map((p) => p.category))]);
const levels = computed(() => ["All", "Beginner", "Intermediate", "Advanced"]);

const filteredPrograms = computed(() => {
  const term = search.value.trim().toLowerCase();
  return programList.value.filter((program) => {
    const searchMatch = !term || [program.name, program.category, program.description].some((v) => v.toLowerCase().includes(term));
    return searchMatch &&
      (statusFilter.value === "All" || program.status === statusFilter.value) &&
      (categoryFilter.value === "All" || program.category === categoryFilter.value) &&
      (levelFilter.value === "All" || program.level === levelFilter.value);
  });
});

const openCreate = () => { editingProgram.value = null; isModalOpen.value = true; };
const openEdit = (program: Program) => { editingProgram.value = { ...program }; isModalOpen.value = true; };
const saveProgram = (program: Program) => {
  const index = programList.value.findIndex((item) => item.id === program.id);
  if (index >= 0) programList.value[index] = program; else programList.value.unshift(program);
  isModalOpen.value = false;
};
const confirmDelete = () => {
  if (!programToDelete.value) return;
  programList.value = programList.value.filter((program) => program.id !== programToDelete.value?.id);
  programToDelete.value = null;
};
const formatPrice = (price: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);
</script>

<template>
  <div class="space-y-7">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Training library</p><h1 class="mt-1 text-3xl font-bold tracking-tight">Programs</h1><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Create and manage structured fitness programs for your clients.</p></div>
      <BaseButton class="!rounded-xl !px-5" @click="openCreate"><Plus :size="17" class="mr-2" />Add Program</BaseButton>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p class="text-xs text-slate-500 dark:text-slate-400">Total programs</p><p class="mt-2 text-2xl font-bold">{{ programList.length }}</p></div>
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p class="text-xs text-slate-500 dark:text-slate-400">Active programs</p><p class="mt-2 text-2xl font-bold">{{ programList.filter((p) => p.status === "Active").length }}</p></div>
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p class="text-xs text-slate-500 dark:text-slate-400">Enrolled clients</p><p class="mt-2 text-2xl font-bold">{{ programList.reduce((sum, p) => sum + p.clients, 0) }}</p></div>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div class="relative"><Search :size="17" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input v-model="search" placeholder="Search programs..." class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white" /></div>
        <select v-model="categoryFilter" class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"><option v-for="item in categories" :key="item">{{ item }}</option></select>
        <select v-model="levelFilter" class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"><option v-for="item in levels" :key="item">{{ item }}</option></select>
        <select v-model="statusFilter" class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"><option>All</option><option>Active</option><option>Draft</option><option>Archived</option></select>
      </div>
    </div>

    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="overflow-x-auto"><table class="w-full min-w-[980px] text-left text-sm">
        <thead class="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/50"><tr><th class="px-5 py-3.5">Program</th><th class="px-4 py-3.5">Category</th><th class="px-4 py-3.5">Level</th><th class="px-4 py-3.5">Duration</th><th class="px-4 py-3.5">Clients</th><th class="px-4 py-3.5">Price</th><th class="px-4 py-3.5">Status</th><th class="px-5 py-3.5 text-right">Actions</th></tr></thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
          <tr v-for="program in filteredPrograms" :key="program.id" class="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
            <td class="px-5 py-4"><p class="font-semibold">{{ program.name }}</p><p class="mt-1 max-w-xs truncate text-xs text-slate-400">{{ program.description }}</p></td>
            <td class="px-4 py-4">{{ program.category }}</td>
            <td class="px-4 py-4">{{ program.level }}</td>
            <td class="px-4 py-4"><div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-300"><CalendarDays :size="15" />{{ program.durationWeeks }} weeks · {{ program.sessionsPerWeek }}x/wk</div></td>
            <td class="px-4 py-4"><div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-300"><Users :size="15" />{{ program.clients }}</div></td>
            <td class="px-4 py-4"><div class="flex items-center gap-1 text-slate-700 dark:text-slate-200"><IndianRupee :size="14" />{{ formatPrice(program.price).replace("₹","") }}</div></td>
            <td class="px-4 py-4"><BaseBadge :variant="program.status === 'Active' ? 'success' : program.status === 'Draft' ? 'warning' : 'info'">{{ program.status }}</BaseBadge></td>
            <td class="px-5 py-4"><div class="flex justify-end gap-1"><button title="View" class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" @click="selectedProgram = program"><Eye :size="17" /></button><button title="Edit" class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" @click="openEdit(program)"><Pencil :size="17" /></button><button title="Delete" class="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30" @click="programToDelete = program"><Trash2 :size="17" /></button></div></td>
          </tr>
          <tr v-if="filteredPrograms.length === 0"><td colspan="8" class="px-5 py-12 text-center text-sm text-slate-400">No programs match your filters.</td></tr>
        </tbody>
      </table></div>
    </div>

    <ProgramModal :is-open="isModalOpen" :program="editingProgram" @close="isModalOpen = false" @save="saveProgram" />

    <Teleport to="body">
      <div v-if="selectedProgram" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" @click.self="selectedProgram = null">
        <div class="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-slate-800"><div><p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Program details</p><h2 class="mt-1 text-xl font-bold">{{ selectedProgram.name }}</h2></div><button class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" @click="selectedProgram = null">✕</button></div>
          <div class="space-y-5 p-6"><div class="flex flex-wrap gap-2"><BaseBadge>{{ selectedProgram.category }}</BaseBadge><BaseBadge>{{ selectedProgram.level }}</BaseBadge><BaseBadge :variant="selectedProgram.status === 'Active' ? 'success' : selectedProgram.status === 'Draft' ? 'warning' : 'info'">{{ selectedProgram.status }}</BaseBadge></div><div class="grid grid-cols-2 gap-3 sm:grid-cols-4"><div class="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><p class="text-xs text-slate-400">Duration</p><p class="mt-1 font-semibold">{{ selectedProgram.durationWeeks }} weeks</p></div><div class="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><p class="text-xs text-slate-400">Sessions</p><p class="mt-1 font-semibold">{{ selectedProgram.sessionsPerWeek }}/week</p></div><div class="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><p class="text-xs text-slate-400">Clients</p><p class="mt-1 font-semibold">{{ selectedProgram.clients }}</p></div><div class="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><p class="text-xs text-slate-400">Price</p><p class="mt-1 font-semibold">{{ formatPrice(selectedProgram.price) }}</p></div></div><p class="text-sm leading-6 text-slate-600 dark:text-slate-300">{{ selectedProgram.description }}</p></div>
        </div>
      </div>
      <div v-if="programToDelete" class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4" @click.self="programToDelete = null">
        <div class="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"><div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/30"><Trash2 :size="20" /></div><h2 class="text-lg font-bold">Delete program?</h2><p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">This will remove <strong class="text-slate-700 dark:text-slate-200">{{ programToDelete.name }}</strong> from the mock program library.</p><div class="mt-6 flex justify-end gap-3"><BaseButton variant="secondary" @click="programToDelete = null">Cancel</BaseButton><BaseButton variant="danger" @click="confirmDelete">Delete</BaseButton></div></div>
      </div>
    </Teleport>
  </div>
</template>
