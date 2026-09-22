<script setup lang="ts">
import { computed, ref } from "vue";
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-vue-next";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";
import ClientModal from "@/components/ui/ClientModal.vue";
import { clients, type Client } from "@/data/mock/clients";

const search = ref("");
const statusFilter = ref("All");
const planFilter = ref("All");

const clientList = ref<Client[]>(clients.map((client) => ({ ...client })));
const isClientModalOpen = ref(false);
const editingClient = ref<Client | null>(null);
const selectedClient = ref<Client | null>(null);
const isViewModalOpen = ref(false);
const clientToDelete = ref<Client | null>(null);
const isDeleteModalOpen = ref(false);

const filteredClients = computed(() => clientList.value.filter((client) => {
  const q = search.value.toLowerCase();
  return (!q || client.name.toLowerCase().includes(q) || client.email.toLowerCase().includes(q) || client.phone.includes(q))
    && (statusFilter.value === "All" || client.status === statusFilter.value)
    && (planFilter.value === "All" || client.plan === planFilter.value);
}));

const openCreateModal = () => {
  editingClient.value = null;
  isClientModalOpen.value = true;
};

const openEditModal = (client: Client) => {
  editingClient.value = { ...client };
  isClientModalOpen.value = true;
};

const closeClientModal = () => {
  isClientModalOpen.value = false;
  editingClient.value = null;
};

const saveClient = (client: Client) => {
  if (editingClient.value) {
    const index = clientList.value.findIndex((item) => item.id === client.id);
    if (index !== -1) clientList.value[index] = client;
  } else {
    clientList.value.unshift({ ...client, id: Math.max(0, ...clientList.value.map((item) => item.id)) + 1 });
  }
  closeClientModal();
};

const viewClient = (client: Client) => {
  selectedClient.value = client;
  isViewModalOpen.value = true;
};

const deleteClient = (client: Client) => {
  clientToDelete.value = client;
  isDeleteModalOpen.value = true;
};

const confirmDelete = () => {
  if (!clientToDelete.value) return;
  clientList.value = clientList.value.filter((client) => client.id !== clientToDelete.value!.id);
  clientToDelete.value = null;
  isDeleteModalOpen.value = false;
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Clients</h1>
        <p class="mt-1 text-sm text-gray-500">Manage your fitness clients and their training plans.</p>
      </div>
      <BaseButton @click="openCreateModal">
        <Plus :size="18" class="mr-2" /> Add Client
      </BaseButton>
    </div>

    <BaseCard>
      <div class="flex flex-col gap-4 border-b pb-5 lg:flex-row">
        <div class="relative flex-1">
          <Search :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input v-model="search" type="text" placeholder="Search clients..."
            class="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gray-400" />
        </div>
        <select v-model="statusFilter" class="rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none">
          <option>All</option><option>Active</option><option>Inactive</option><option>Pending</option>
        </select>
        <select v-model="planFilter" class="rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none">
          <option>All</option><option>Basic</option><option>Pro</option><option>Premium</option>
        </select>
      </div>

      <div class="mt-5 overflow-x-auto">
        <table class="w-full min-w-[900px] text-left text-sm">
          <thead><tr class="border-b text-xs uppercase text-gray-500">
            <th class="px-4 py-3">Client</th><th class="px-4 py-3">Trainer</th><th class="px-4 py-3">Plan</th>
            <th class="px-4 py-3">Goal</th><th class="px-4 py-3">Joined</th><th class="px-4 py-3">Status</th>
            <th class="px-4 py-3 text-right">Actions</th>
          </tr></thead>
          <tbody class="divide-y">
            <tr v-for="client in filteredClients" :key="client.id" class="hover:bg-gray-50">
              <td class="px-4 py-4"><div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-medium">{{ client.name.charAt(0) }}</div>
                <div><p class="font-medium text-gray-900">{{ client.name }}</p><p class="text-xs text-gray-500">{{ client.email }}</p></div>
              </div></td>
              <td class="px-4 py-4 text-gray-600">{{ client.trainer || "Not assigned" }}</td>
              <td class="px-4 py-4">{{ client.plan }}</td>
              <td class="px-4 py-4 text-gray-600">{{ client.goal }}</td>
              <td class="px-4 py-4 text-gray-600">{{ client.joinedDate }}</td>
              <td class="px-4 py-4"><BaseBadge :variant="client.status === 'Active' ? 'success' : client.status === 'Pending' ? 'warning' : 'danger'">{{ client.status }}</BaseBadge></td>
              <td class="px-4 py-4"><div class="flex justify-end gap-1">
                <button class="rounded-lg p-2 text-gray-500 hover:bg-gray-100" title="View" @click="viewClient(client)"><Eye :size="17" /></button>
                <button class="rounded-lg p-2 text-gray-500 hover:bg-gray-100" title="Edit" @click="openEditModal(client)"><Pencil :size="17" /></button>
                <button class="rounded-lg p-2 text-red-500 hover:bg-red-50" title="Delete" @click="deleteClient(client)"><Trash2 :size="17" /></button>
              </div></td>
            </tr>
            <tr v-if="filteredClients.length === 0"><td colspan="7" class="py-12 text-center text-sm text-gray-500">No clients found.</td></tr>
          </tbody>
        </table>
      </div>
    </BaseCard>

    <ClientModal :is-open="isClientModalOpen" :client="editingClient" @close="closeClientModal" @save="saveClient" />

    <Teleport to="body">
      <div v-if="isViewModalOpen && selectedClient" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" @click.self="isViewModalOpen = false">
        <div class="w-full max-w-lg rounded-xl bg-white shadow-xl">
          <div class="flex items-center justify-between border-b px-6 py-4">
            <div><h2 class="text-lg font-semibold text-gray-900">Client Details</h2><p class="text-xs text-gray-500">Client profile information</p></div>
            <button class="rounded-lg p-2 text-gray-500 hover:bg-gray-100" @click="isViewModalOpen = false">✕</button>
          </div>
          <div class="p-6">
            <div class="mb-6 flex items-center gap-4">
              <div class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-lg font-semibold">{{ selectedClient.name.charAt(0) }}</div>
              <div><h3 class="font-semibold text-gray-900">{{ selectedClient.name }}</h3><p class="text-sm text-gray-500">{{ selectedClient.email }}</p></div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div><p class="text-xs text-gray-500">Phone</p><p class="mt-1 text-sm font-medium">{{ selectedClient.phone }}</p></div>
              <div><p class="text-xs text-gray-500">Trainer</p><p class="mt-1 text-sm font-medium">{{ selectedClient.trainer || "Not assigned" }}</p></div>
              <div><p class="text-xs text-gray-500">Plan</p><p class="mt-1 text-sm font-medium">{{ selectedClient.plan }}</p></div>
              <div><p class="text-xs text-gray-500">Goal</p><p class="mt-1 text-sm font-medium">{{ selectedClient.goal }}</p></div>
              <div><p class="text-xs text-gray-500">Joined</p><p class="mt-1 text-sm font-medium">{{ selectedClient.joinedDate }}</p></div>
              <div><p class="text-xs text-gray-500">Status</p><div class="mt-1"><BaseBadge :variant="selectedClient.status === 'Active' ? 'success' : selectedClient.status === 'Pending' ? 'warning' : 'danger'">{{ selectedClient.status }}</BaseBadge></div></div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="isDeleteModalOpen && clientToDelete" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" @click.self="isDeleteModalOpen = false">
        <div class="w-full max-w-md rounded-xl bg-white shadow-xl">
          <div class="p-6">
            <div class="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">⚠</div>
            <h2 class="mt-4 text-lg font-semibold text-gray-900">Delete Client?</h2>
            <p class="mt-2 text-sm text-gray-500">Are you sure you want to delete <span class="font-medium text-gray-900">{{ clientToDelete.name }}</span>?</p>
            <div class="mt-6 flex justify-end gap-3">
              <BaseButton variant="secondary" @click="isDeleteModalOpen = false">Cancel</BaseButton>
              <BaseButton variant="danger" @click="confirmDelete">Delete Client</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>