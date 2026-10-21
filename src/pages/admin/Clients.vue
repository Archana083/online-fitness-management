<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-vue-next";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";
import ClientModal from "@/components/ui/ClientModal.vue";
import type { Client } from "@/data/clients";
import {
  createClient,
  getClients,
  updateClient,
  deleteClient,
} from "@/services/clientService";

const search = ref("");
const statusFilter = ref("All");
const planFilter = ref("All");

const clientList = ref<Client[]>([]);
const isClientModalOpen = ref(false);
const editingClient = ref<Client | null>(null);
const selectedClient = ref<Client | null>(null);
const isViewModalOpen = ref(false);
const clientToDelete = ref<Client | null>(null);
const isDeleteModalOpen = ref(false);
const formatLabel = (value: string) => {
  if (!value) return "";
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const loadClientList = async () => {
  try {
    const response = await getClients();
    clientList.value = response.map((client: any) => ({
      ...client,
      joinedDate: client.joining_date,
      phone: client.phone_number,
    }));
  } catch (error) {
    console.error("Error fetching clients:", error);
  }
};
onMounted(() => {
  loadClientList();
});
const filteredClients = computed(() =>
  clientList.value.filter((client) => {
    const q = search.value.toLowerCase();
    return (
      (!q ||
        client.name.toLowerCase().includes(q) ||
        client.email.toLowerCase().includes(q) ||
        client.phone.includes(q)) &&
      (statusFilter.value === "All" || client.status === statusFilter.value) &&
      (planFilter.value === "All" || client.plan === planFilter.value)
    );
  }),
);

const openCreateModal = () => {
  editingClient.value = null;
  isClientModalOpen.value = true;
};

const openEditModal = (client: Client) => {
  editingClient.value = { ...client };
  console.log(editingClient.value, "hello");

  isClientModalOpen.value = true;
};

const closeClientModal = () => {
  isClientModalOpen.value = false;
  editingClient.value = null;
};

const saveClient = async (client: Client) => {
  try {
    console.log(client, "client");
    if (editingClient.value) {
      await updateClient(client.id, {
        ...client,
        phone_number: client.phone,
        trainer: client.trainer,
      } as any);
    } else {
      await createClient({
        ...client,
        phone_number: client.phone,
        trainer: client.trainer,
      } as any);
    }
    await loadClientList();
    closeClientModal();
  } catch (error) {
    console.error("Error saving client:", error);
  }
};

const viewClient = (client: Client) => {
  selectedClient.value = client;
  isViewModalOpen.value = true;
};

const deleteClientData = (client: Client) => {
  clientToDelete.value = client;
  console.log(clientToDelete.value);
  isDeleteModalOpen.value = true;
};

const confirmDelete = async () => {
  if (!clientToDelete.value) return;

  try {
    await deleteClient(clientToDelete.value.id);
    clientToDelete.value = null;
    isDeleteModalOpen.value = false;
    await loadClientList();
  } catch (error) {
    console.error("Failed to delete client:", error);
  }
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Clients</h1>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your fitness clients and their training plans.
        </p>
      </div>
      <BaseButton @click="openCreateModal">
        <Plus :size="18" class="mr-2" /> Add Client
      </BaseButton>
    </div>

    <BaseCard>
      <div class="flex flex-col gap-4 border-b border-slate-100 pb-5 dark:border-slate-800 lg:flex-row">
        <div class="relative flex-1">
          <Search
            :size="18"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            v-model="search"
            type="text"
            placeholder="Search clients..."
            class="w-full rounded-lg border border-slate-200 dark:border-slate-700 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-orange-400 dark:border-orange-500"
          />
        </div>
        <select
          v-model="statusFilter"
          class="rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm outline-none"
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Pending</option>
        </select>
        <select
          v-model="planFilter"
          class="rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm outline-none"
        >
          <option>All</option>
          <option>Basic</option>
          <option>Pro</option>
          <option>Premium</option>
        </select>
      </div>

      <div class="mt-5 overflow-x-auto">
        <table class="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr class="border-b border-slate-100 text-xs uppercase dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <th class="px-4 py-3">Client</th>
              <th class="px-4 py-3">Trainer</th>
              <th class="px-4 py-3">Plan</th>
              <th class="px-4 py-3">Goal</th>
              <th class="px-4 py-3">Joined</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr
              v-for="client in filteredClients"
              :key="client.id"
              class="hover:bg-orange-50/70 dark:hover:bg-slate-800/70"
            >
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 font-semibold text-orange-700 dark:bg-orange-400/15 dark:text-orange-300"
                  >
                    {{ client.name.charAt(0) }}
                  </div>
                  <div>
                    <p class="font-medium text-slate-900 dark:text-white">{{ client.name }}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ client.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4 text-slate-600 dark:text-slate-300">
                {{ client.trainer || "Not assigned" }}
              </td>
              <td class="px-4 py-4 text-slate-600 dark:text-slate-300">{{ client.plan }}</td>
              <td class="px-4 py-4 text-slate-600 dark:text-slate-300">
                {{ formatLabel(client.goal) }}
              </td>
              <td class="px-4 py-4 text-slate-600 dark:text-slate-300">{{ client.joinedDate }}</td>
              <td class="px-4 py-4">
                <BaseBadge
                  :variant="
                    client.status === 'active'
                      ? 'success'
                      : client.status === 'pending'
                        ? 'warning'
                        : 'danger'
                  "
                  >{{ formatLabel(client.status) }}</BaseBadge
                >
              </td>
              <td class="px-4 py-4">
                <div class="flex justify-end gap-1">
                  <button
                    class="rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                    title="View"
                    @click="viewClient(client)"
                  >
                    <Eye :size="17" />
                  </button>
                  <button
                    class="rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                    title="Edit"
                    @click="openEditModal(client)"
                  >
                    <Pencil :size="17" />
                  </button>
                  <button
                    class="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    title="Delete"
                    @click="deleteClientData(client)"
                  >
                    <Trash2 :size="17" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredClients.length === 0">
              <td colspan="7" class="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                No clients found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>

    <ClientModal
      :is-open="isClientModalOpen"
      :client="editingClient"
      @close="closeClientModal"
      @save="saveClient"
    />

    <Teleport to="body">
      <div
        v-if="isViewModalOpen && selectedClient"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4"
        @click.self="isViewModalOpen = false"
      >
        <div class="w-full max-w-lg rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-700 shadow-xl">
          <div class="flex items-center justify-between border-b px-6 py-4">
            <div>
              <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
                Client Details
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">Client profile information</p>
            </div>
            <button
              class="rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              @click="isViewModalOpen = false"
            >
              ✕
            </button>
          </div>
          <div class="p-6">
            <div class="mb-6 flex items-center gap-4">
              <div
                class="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-950/30 text-lg font-semibold"
              >
                {{ selectedClient.name.charAt(0) }}
              </div>
              <div>
                <h3 class="font-semibold text-slate-900 dark:text-white">
                  {{ selectedClient.name }}
                </h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ selectedClient.email }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs text-slate-500 dark:text-slate-400">Phone</p>
                <p class="mt-1 text-sm font-medium">
                  {{ selectedClient.phone }}
                </p>
              </div>
              <div>
                <p class="text-xs text-slate-500 dark:text-slate-400">Trainer</p>
                <p class="mt-1 text-sm font-medium">
                  {{ selectedClient.trainer || "Not assigned" }}
                </p>
              </div>
              <div>
                <p class="text-xs text-slate-500 dark:text-slate-400">Plan</p>
                <p class="mt-1 text-sm font-medium">
                  {{ selectedClient.plan }}
                </p>
              </div>
              <div>
                <p class="text-xs text-slate-500 dark:text-slate-400">Goal</p>
                <p class="mt-1 text-sm font-medium">
                  {{ selectedClient.goal }}
                </p>
              </div>
              <div>
                <p class="text-xs text-slate-500 dark:text-slate-400">Joined</p>
                <p class="mt-1 text-sm font-medium">
                  {{ selectedClient.joinedDate }}
                </p>
              </div>
              <div>
                <p class="text-xs text-slate-500 dark:text-slate-400">Status</p>
                <div class="mt-1">
                  <BaseBadge
                    :variant="
                      selectedClient.status === 'active'
                        ? 'success'
                        : selectedClient.status === 'pending'
                          ? 'warning'
                          : 'danger'
                    "
                    >{{ selectedClient.status }}</BaseBadge
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="isDeleteModalOpen && clientToDelete"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4"
        @click.self="isDeleteModalOpen = false"
      >
        <div class="w-full max-w-md rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-700 shadow-xl">
          <div class="p-6">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600"
            >
              ⚠
            </div>
            <h2 class="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
              Delete Client?
            </h2>
            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Are you sure you want to delete
              <span class="font-medium text-slate-900 dark:text-white">{{
                clientToDelete.name
              }}</span
              >?
            </p>
            <div class="mt-6 flex justify-end gap-3">
              <BaseButton variant="secondary" @click="isDeleteModalOpen = false"
                >Cancel</BaseButton
              >
              <BaseButton variant="danger" @click="confirmDelete"
                >Delete Client</BaseButton
              >
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
