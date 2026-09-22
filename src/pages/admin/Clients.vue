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

const filteredClients = computed(() => {
  return clientList.value.filter((client) => {
    const searchValue = search.value.toLowerCase();

    const matchesSearch =
      !searchValue ||
      client.name.toLowerCase().includes(searchValue) ||
      client.email.toLowerCase().includes(searchValue) ||
      client.phone.includes(searchValue);

    const matchesStatus =
      statusFilter.value === "All" ||
      client.status === statusFilter.value;

    const matchesPlan =
      planFilter.value === "All" ||
      client.plan === planFilter.value;

    return matchesSearch && matchesStatus && matchesPlan;
  });
});

const clientList = ref<Client[]>(clients.map((client) => ({ ...client })));
const isClientModalOpen = ref(false);
const editingClient = ref<Client | null>(null);

const selectedClient = ref<Client | null>(null);
const isViewModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const clientToDelete = ref<Client | null>(null);

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
    const newId = Math.max(0, ...clientList.value.map((item) => item.id)) + 1;
    clientList.value.unshift({ ...client, id: newId });
  }

  closeClientModal();
};

const viewClient = (client: Client) => {
  selectedClient.value = client;
};

const editClient = (client: Client) => {
  console.log("Edit client:", client);
};

const deleteClient = (client: Client) => {
  console.log("Delete client:", client);
};
</script>

<template>
  <div class="space-y-6">

    <!-- Page Header -->
    <div class="flex items-center justify-between">

      <div>
        <h1 class="text-2xl font-bold text-gray-900">
          Clients
        </h1>

        <p class="mt-1 text-sm text-gray-500">
          Manage your fitness clients and their training plans.
        </p>
      </div>

      <BaseButton>
        <Plus :size="18" class="mr-2" />
        Add Client
      </BaseButton>

    </div>


    <!-- Main Card -->
    <BaseCard>

      <!-- Filters -->
      <div class="flex flex-col gap-4 border-b pb-5 lg:flex-row">

        <!-- Search -->
        <div class="relative flex-1">

          <Search
            :size="18"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            v-model="search"
            type="text"
            placeholder="Search clients..."
            class="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gray-400"
          />

        </div>


        <!-- Status -->
        <select
          v-model="statusFilter"
          class="rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none"
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Pending</option>
        </select>


        <!-- Plan -->
        <select
          v-model="planFilter"
          class="rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none"
        >
          <option>All</option>
          <option>Basic</option>
          <option>Pro</option>
          <option>Premium</option>
        </select>

      </div>


      <!-- Table -->
      <div class="mt-5 overflow-x-auto">

        <table class="w-full min-w-[900px] text-left text-sm">

          <thead>
            <tr class="border-b text-xs uppercase text-gray-500">

              <th class="px-4 py-3">
                Client
              </th>

              <th class="px-4 py-3">
                Trainer
              </th>

              <th class="px-4 py-3">
                Plan
              </th>

              <th class="px-4 py-3">
                Goal
              </th>

              <th class="px-4 py-3">
                Joined
              </th>

              <th class="px-4 py-3">
                Status
              </th>

              <th class="px-4 py-3 text-right">
                Actions
              </th>

            </tr>
          </thead>


          <tbody class="divide-y">

            <tr
              v-for="client in filteredClients"
              :key="client.id"
              class="hover:bg-gray-50"
            >

              <!-- Client -->
              <td class="px-4 py-4">

                <div class="flex items-center gap-3">

                  <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-medium"
                  >
                    {{ client.name.charAt(0) }}
                  </div>

                  <div>
                    <p class="font-medium text-gray-900">
                      {{ client.name }}
                    </p>

                    <p class="text-xs text-gray-500">
                      {{ client.email }}
                    </p>
                  </div>

                </div>

              </td>


              <!-- Trainer -->
              <td class="px-4 py-4 text-gray-600">
                {{ client.trainer }}
              </td>


              <!-- Plan -->
              <td class="px-4 py-4">
                {{ client.plan }}
              </td>


              <!-- Goal -->
              <td class="px-4 py-4 text-gray-600">
                {{ client.goal }}
              </td>


              <!-- Joined -->
              <td class="px-4 py-4 text-gray-600">
                {{ client.joinedDate }}
              </td>


              <!-- Status -->
              <td class="px-4 py-4">

                <BaseBadge
                  :variant="
                    client.status === 'Active'
                      ? 'success'
                      : client.status === 'Pending'
                        ? 'warning'
                        : 'danger'
                  "
                >
                  {{ client.status }}
                </BaseBadge>

              </td>


              <!-- Actions -->
              <td class="px-4 py-4">

                <div class="flex justify-end gap-1">

                  <button
                    class="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                    title="View"
                    @click="viewClient(client)"
                  >
                    <Eye :size="17" />
                  </button>

                  <button
                    class="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                    title="Edit"
                    @click="openEditModal(client)"
                  >
                    <Pencil :size="17" />
                  </button>

                  <button
                    class="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    title="Delete"
                    @click="deleteClient(client)"
                  >
                    <Trash2 :size="17" />
                  </button>

                </div>

              </td>

            </tr>


            <!-- Empty State -->
            <tr v-if="filteredClients.length === 0">

              <td
                colspan="7"
                class="py-12 text-center text-sm text-gray-500"
              >
                No clients found.
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </BaseCard>

  </div>
</template>