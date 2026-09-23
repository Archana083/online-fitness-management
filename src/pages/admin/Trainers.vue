<script setup lang="ts">
import { computed, ref } from "vue";
import { Eye, Pencil, Plus, Search, Trash2, Users, Award, Clock3 } from "lucide-vue-next";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";
import TrainerModal from "@/components/ui/TrainerModal.vue";
import { trainers, type Trainer } from "@/data/mock/trainers";

const trainerList = ref<Trainer[]>(trainers.map((trainer) => ({ ...trainer })));
const search = ref("");
const statusFilter = ref<"All" | "Active" | "Inactive">("All");
const specializationFilter = ref("All");
const isTrainerModalOpen = ref(false);
const editingTrainer = ref<Trainer | null>(null);
const selectedTrainer = ref<Trainer | null>(null);
const trainerToDelete = ref<Trainer | null>(null);

const specializations = computed(() => ["All", ...new Set(trainerList.value.map((trainer) => trainer.specialization))]);

const filteredTrainers = computed(() => {
  const term = search.value.trim().toLowerCase();
  return trainerList.value.filter((trainer) => {
    const matchesSearch =
      !term ||
      [trainer.name, trainer.email, trainer.specialization].some((value) =>
        value.toLowerCase().includes(term),
      );
    const matchesStatus = statusFilter.value === "All" || trainer.status === statusFilter.value;
    const matchesSpecialization =
      specializationFilter.value === "All" || trainer.specialization === specializationFilter.value;
    return matchesSearch && matchesStatus && matchesSpecialization;
  });
});

const openCreate = () => {
  editingTrainer.value = null;
  isTrainerModalOpen.value = true;
};
const openEdit = (trainer: Trainer) => {
  editingTrainer.value = { ...trainer };
  isTrainerModalOpen.value = true;
};
const saveTrainer = (trainer: Trainer) => {
  const index = trainerList.value.findIndex((item) => item.id === trainer.id);
  if (index >= 0) trainerList.value[index] = trainer;
  else trainerList.value.unshift(trainer);
  isTrainerModalOpen.value = false;
};
const viewTrainer = (trainer: Trainer) => {
  selectedTrainer.value = trainer;
};
const requestDelete = (trainer: Trainer) => {
  trainerToDelete.value = trainer;
};
const confirmDelete = () => {
  if (!trainerToDelete.value) return;
  trainerList.value = trainerList.value.filter((trainer) => trainer.id !== trainerToDelete.value?.id);
  trainerToDelete.value = null;
};
const initials = (name: string) =>
  name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
</script>

<template>
  <div class="space-y-7">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Team</p>
        <h1 class="mt-1 text-3xl font-bold tracking-tight">Trainers</h1>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage coaches, specializations, and client assignments.</p>
      </div>
      <BaseButton class="!rounded-xl !px-5" @click="openCreate"><Plus :size="17" class="mr-2" />Add Trainer</BaseButton>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p class="text-xs text-slate-500 dark:text-slate-400">Total trainers</p>
        <p class="mt-2 text-2xl font-bold">{{ trainerList.length }}</p>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p class="text-xs text-slate-500 dark:text-slate-400">Active trainers</p>
        <p class="mt-2 text-2xl font-bold">{{ trainerList.filter((trainer) => trainer.status === "Active").length }}</p>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p class="text-xs text-slate-500 dark:text-slate-400">Clients assigned</p>
        <p class="mt-2 text-2xl font-bold">{{ trainerList.reduce((total, trainer) => total + trainer.clients, 0) }}</p>
      </div>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div class="relative">
          <Search :size="17" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input v-model="search" placeholder="Search trainer, email, specialization..." class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
        </div>
        <select v-model="specializationFilter" class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white">
          <option v-for="item in specializations" :key="item">{{ item }}</option>
        </select>
        <select v-model="statusFilter" class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white">
          <option>All</option><option>Active</option><option>Inactive</option>
        </select>
      </div>
    </div>

    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[850px] text-left text-sm">
          <thead class="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/50">
            <tr>
              <th class="px-5 py-3.5">Trainer</th><th class="px-4 py-3.5">Specialization</th><th class="px-4 py-3.5">Experience</th><th class="px-4 py-3.5">Clients</th><th class="px-4 py-3.5">Status</th><th class="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr v-for="trainer in filteredTrainers" :key="trainer.id" class="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white dark:bg-white dark:text-slate-900">{{ initials(trainer.name) }}</div>
                  <div><p class="font-semibold">{{ trainer.name }}</p><p class="text-xs text-slate-400">{{ trainer.email }}</p></div>
                </div>
              </td>
              <td class="px-4 py-4"><span class="font-medium">{{ trainer.specialization }}</span></td>
              <td class="px-4 py-4"><div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-300"><Clock3 :size="15" />{{ trainer.experience }} yrs</div></td>
              <td class="px-4 py-4"><div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-300"><Users :size="15" />{{ trainer.clients }}</div></td>
              <td class="px-4 py-4"><BaseBadge :variant="trainer.status === 'Active' ? 'success' : 'warning'">{{ trainer.status }}</BaseBadge></td>
              <td class="px-5 py-4"><div class="flex justify-end gap-1"><button title="View" class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" @click="viewTrainer(trainer)"><Eye :size="17" /></button><button title="Edit" class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" @click="openEdit(trainer)"><Pencil :size="17" /></button><button title="Delete" class="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30" @click="requestDelete(trainer)"><Trash2 :size="17" /></button></div></td>
            </tr>
            <tr v-if="filteredTrainers.length === 0"><td colspan="6" class="px-5 py-12 text-center text-sm text-slate-400">No trainers match your filters.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <TrainerModal :is-open="isTrainerModalOpen" :trainer="editingTrainer" @close="isTrainerModalOpen = false" @save="saveTrainer" />

    <Teleport to="body">
      <div v-if="selectedTrainer" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" @click.self="selectedTrainer = null">
        <div class="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-slate-800"><div><p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Trainer profile</p><h2 class="mt-1 text-xl font-bold">{{ selectedTrainer.name }}</h2></div><button class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" @click="selectedTrainer = null">✕</button></div>
          <div class="space-y-5 p-6">
            <div class="flex items-center gap-4"><div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 font-bold text-white dark:bg-white dark:text-slate-900">{{ initials(selectedTrainer.name) }}</div><div><p class="font-semibold">{{ selectedTrainer.specialization }}</p><BaseBadge :variant="selectedTrainer.status === 'Active' ? 'success' : 'warning'">{{ selectedTrainer.status }}</BaseBadge></div></div>
            <div class="grid grid-cols-2 gap-3"><div class="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><p class="text-xs text-slate-400">Experience</p><p class="mt-1 font-semibold">{{ selectedTrainer.experience }} years</p></div><div class="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><p class="text-xs text-slate-400">Clients</p><p class="mt-1 font-semibold">{{ selectedTrainer.clients }}</p></div></div>
            <div><p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Contact</p><p class="mt-2 text-sm">{{ selectedTrainer.email }}</p><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ selectedTrainer.phone }}</p></div>
            <div><p class="text-xs font-semibold uppercase tracking-wider text-slate-400">About</p><p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ selectedTrainer.bio }}</p></div>
          </div>
        </div>
      </div>

      <div v-if="trainerToDelete" class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4" @click.self="trainerToDelete = null">
        <div class="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/30"><Trash2 :size="20" /></div>
          <h2 class="text-lg font-bold">Delete trainer?</h2>
          <p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">This will remove <strong class="text-slate-700 dark:text-slate-200">{{ trainerToDelete.name }}</strong> from the mock trainer list.</p>
          <div class="mt-6 flex justify-end gap-3"><BaseButton variant="secondary" @click="trainerToDelete = null">Cancel</BaseButton><BaseButton variant="danger" @click="confirmDelete">Delete</BaseButton></div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
