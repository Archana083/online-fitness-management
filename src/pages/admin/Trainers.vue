<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  Clock3,
} from "lucide-vue-next";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";
import TrainerModal from "@/components/ui/TrainerModal.vue";
import type { Trainer } from "@/data/mock/trainers";
import {
  createTrainer,
  getTrainers,
  updateTrainer,
} from "@/services/trainerService";
import type { Client } from "@/data/clients";
import { getClients } from "@/services/clientService";

const trainerList = ref<Trainer[]>([]);
const search = ref("");
const statusFilter = ref<"All" | "Active" | "Inactive">("All");
const specializationFilter = ref("All");
const isTrainerModalOpen = ref(false);
const editingTrainer = ref<Trainer | null>(null);
const selectedTrainer = ref<Trainer | null>(null);
const trainerToDelete = ref<Trainer | null>(null);
const clientList = ref<Client[]>([]);
const specializations = computed(() => [
  "All",
  ...new Set(trainerList.value.map((trainer) => trainer.specialization)),
]);
const formatLabel = (value: string) => {
  if (!value) return "";
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const filteredTrainers = computed(() => {
  const term = search.value.trim().toLowerCase();
  return trainerList.value.filter((trainer) => {
    const matchesSearch =
      !term ||
      [trainer.name, trainer.email, trainer.specialization].some((value) =>
        value.toLowerCase().includes(term),
      );
    const matchesStatus = statusFilter.value === "All";
    const matchesSpecialization =
      specializationFilter.value === "All" ||
      trainer.specialization === specializationFilter.value;
    return matchesSearch && matchesStatus && matchesSpecialization;
  });
});
const loadTrainer = async () => {
  try {
    const response = await getTrainers();
    trainerList.value = response.map((trainer: any) => ({
      ...trainer,
      experience: trainer.experience_years,
      joinedDate: trainer.joining_date,
      phone: trainer.phone_number,
    }));
  } catch (error) {
    console.error("Error fetching Trainers:", error);
  }
};
const clientCount = (id: number) => {
  const count = clientList.value.filter((client) => client.trainer === id);
  return count.length;
};

onMounted(async () => {
  await loadTrainer();
  clientList.value = await getClients();
});

const openCreate = () => {
  editingTrainer.value = null;
  isTrainerModalOpen.value = true;
};
const openEdit = (trainer: Trainer) => {
  editingTrainer.value = { ...trainer };
  isTrainerModalOpen.value = true;
};
const saveTrainer = async (trainer: Trainer) => {
  try {
    if (editingTrainer.value) {
      await updateTrainer(trainer.id, {
        ...trainer,
        experience_years: trainer.experience,
        joined_Date: trainer.joinedDate,
        phone_number: trainer.phone,
      } as any);
    } else {
      await createTrainer({
        ...trainer,
        experience_years: trainer.experience,
        joined_Date: trainer.joinedDate,
        phone_number: trainer.phone,
      } as any);
    }
    await loadTrainer();
  } catch (error) {
    console.error(error);
  }
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
  trainerList.value = trainerList.value.filter(
    (trainer) => trainer.id !== trainerToDelete.value?.id,
  );
  trainerToDelete.value = null;
};
const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
</script>

<template>
  <div class="space-y-7">
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p
          class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
        >
          Team
        </p>
        <h1 class="mt-1 text-3xl font-bold tracking-tight">Trainers</h1>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage coaches, specializations, and client assignments.
        </p>
      </div>
      <BaseButton class="!rounded-xl !px-5" @click="openCreate"
        ><Plus :size="17" class="mr-2" />Add Trainer</BaseButton
      >
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
      <div
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <p class="text-xs text-slate-500 dark:text-slate-400">Total trainers</p>
        <p class="mt-2 text-2xl font-bold">{{ trainerList.length }}</p>
      </div>
      <div
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Active trainers
        </p>
        <p class="mt-2 text-2xl font-bold">
          {{
            trainerList.filter((trainer) => trainer.status === "Active").length
          }}
        </p>
      </div>
      <div
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Clients assigned
        </p>
        <p class="mt-2 text-2xl font-bold">
          {{
            trainerList.reduce((total, trainer) => total + trainer.clients, 0)
          }}
        </p>
      </div>
    </div>

    <div
      class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div class="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div class="relative">
          <Search
            :size="17"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            v-model="search"
            placeholder="Search trainer, email, specialization..."
            class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
        <select
          v-model="specializationFilter"
          class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option v-for="item in specializations" :key="item">
            {{ item }}
          </option>
        </select>
        <select
          v-model="statusFilter"
          class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
    </div>

    <div
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div class="overflow-x-auto">
        <table class="w-full min-w-[850px] text-left text-sm">
          <thead
            class="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/50"
          >
            <tr>
              <th class="px-5 py-3.5">Trainer</th>
              <th class="px-4 py-3.5">Specialization</th>
              <th class="px-4 py-3.5">Experience</th>
              <th class="px-4 py-3.5">Clients</th>
              <th class="px-4 py-3.5">Status</th>
              <th class="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr
              v-for="trainer in filteredTrainers"
              :key="trainer.id"
              class="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/40"
            >
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white dark:bg-white dark:text-slate-900"
                  >
                    {{ initials(trainer.name) }}
                  </div>
                  <div>
                    <p class="font-semibold">{{ trainer.name }}</p>
                    <p class="text-xs text-slate-400">{{ trainer.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="font-medium">{{ trainer.specialization }}</span>
              </td>
              <td class="px-4 py-4">
                <div
                  class="flex items-center gap-1.5 text-slate-600 dark:text-slate-300"
                >
                  <Clock3 :size="15" />{{ trainer.experience }} yrs
                </div>
              </td>
              <td class="px-4 py-4">
                <div
                  class="flex items-center gap-1.5 text-slate-600 dark:text-slate-300"
                >
                  <Users :size="15" />{{ clientCount(trainer.id) }}
                </div>
              </td>
              <td class="px-4 py-4">
                <BaseBadge
                  :variant="trainer.status === 'active' ? 'success' : 'warning'"
                  >{{ formatLabel(trainer.status) }}</BaseBadge
                >
              </td>
              <td class="px-5 py-4">
                <div class="flex justify-end gap-1">
                  <button
                    title="View"
                    class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                    @click="viewTrainer(trainer)"
                  >
                    <Eye :size="17" /></button
                  ><button
                    title="Edit"
                    class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                    @click="openEdit(trainer)"
                  >
                    <Pencil :size="17" /></button
                  ><button
                    title="Delete"
                    class="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                    @click="requestDelete(trainer)"
                  >
                    <Trash2 :size="17" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredTrainers.length === 0">
              <td
                colspan="6"
                class="px-5 py-12 text-center text-sm text-slate-400"
              >
                No trainers match your filters.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <TrainerModal
      :is-open="isTrainerModalOpen"
      :trainer="editingTrainer"
      @close="isTrainerModalOpen = false"
      @save="saveTrainer"
    />

    <Teleport to="body">
  <div
    v-if="selectedTrainer"
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
    @click.self="selectedTrainer = null"
  >
    <div
      class="w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700"
      >
        <div>
          <h2 class="text-lg font-bold text-slate-900 dark:text-white">
            {{ selectedTrainer.name }}
          </h2>
          <p class="text-sm text-slate-500">Trainer Details</p>
        </div>

        <button
          class="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          @click="selectedTrainer = null"
        >
          ✕
        </button>
      </div>

      <!-- Details -->
      <div class="space-y-5 p-5">
        <div class="flex items-center gap-3">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {{ initials(selectedTrainer.name) }}
          </div>

          <div>
            <p class="font-semibold text-slate-800 dark:text-white">
              {{ selectedTrainer.specialization }}
            </p>
            <BaseBadge
              :variant="selectedTrainer.status === 'Active' ? 'success' : 'warning'"
            >
              {{ selectedTrainer.status }}
            </BaseBadge>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
            <p class="text-sm text-slate-500">Experience</p>
            <p class="mt-1 font-semibold dark:text-white">
              {{ selectedTrainer.experience }} years
            </p>
          </div>

          <div class="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
            <p class="text-sm text-slate-500">Clients</p>
            <p class="mt-1 font-semibold dark:text-white">
              {{ selectedTrainer.clients }}
            </p>
          </div>
        </div>

        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-slate-900 dark:text-white">
            Contact Information
          </h3>

          <div>
            <p class="text-xs text-slate-500">Email</p>
            <p class="break-all text-sm dark:text-slate-200">
              {{ selectedTrainer.email }}
            </p>
          </div>

          <div>
            <p class="text-xs text-slate-500">Phone</p>
            <p class="text-sm dark:text-slate-200">
              {{ selectedTrainer.phone }}
            </p>
          </div>
        </div>

        <div class="border-t border-slate-200 pt-4 dark:border-slate-700">
          <h3 class="text-sm font-semibold dark:text-white">About</h3>
          <p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {{ selectedTrainer.bio || "No description available." }}
          </p>
        </div>
      </div>

      <div class="flex justify-end border-t border-slate-200 px-5 py-3 dark:border-slate-700">
        <BaseButton
          variant="secondary"
          @click="selectedTrainer = null"
        >
          Close
        </BaseButton>
      </div>
    </div>
  </div>
</Teleport>
  </div>
</template>
