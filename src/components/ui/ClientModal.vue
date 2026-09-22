<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import type { Client, ClientStatus } from "@/data/mock/clients";

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    client?: Client | null;
  }>(),
  { client: null },
);

const emit = defineEmits<{
  close: [];
  save: [client: Client];
}>();

const emptyForm = (): Omit<Client, "id"> => ({
  name: "",
  email: "",
  phone: "",
  trainer: "",
  plan: "Basic",
  goal: "",
  joinedDate: new Date().toISOString().slice(0, 10),
  status: "Active",
});

const form = reactive<Omit<Client, "id">>(emptyForm());

const isEditMode = computed(() => !!props.client);
const title = computed(() => (isEditMode.value ? "Edit Client" : "Add Client"));

watch(
  () => props.client,
  (client) => {
    Object.assign(form, client ? { ...client } : emptyForm());
  },
  { immediate: true },
);

const submit = () => {
  if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) return;

  emit("save", {
    id: props.client?.id ?? Date.now(),
    ...form,
    status: form.status as ClientStatus,
  });
};
</script>

<template>
  <BaseModal :is-open="isOpen" :title="title" @close="emit('close')">
    <form class="space-y-5" @submit.prevent="submit">
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-gray-700">Name</label>
          <input v-model="form.name" required type="text" placeholder="Client name"
            class="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100" />
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium text-gray-700">Email</label>
          <input v-model="form.email" required type="email" placeholder="client@example.com"
            class="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100" />
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium text-gray-700">Phone</label>
          <input v-model="form.phone" required type="tel" placeholder="+91 98765 43210"
            class="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100" />
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium text-gray-700">Trainer</label>
          <select v-model="form.trainer"
            class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400">
            <option value="">Select trainer</option>
            <option>Rahul Mehta</option>
            <option>Priya Singh</option>
            <option>Amit Shah</option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium text-gray-700">Plan</label>
          <select v-model="form.plan"
            class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400">
            <option>Basic</option>
            <option>Pro</option>
            <option>Premium</option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium text-gray-700">Goal</label>
          <select v-model="form.goal"
            class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400">
            <option value="">Select goal</option>
            <option>Weight Loss</option>
            <option>Muscle Gain</option>
            <option>General Fitness</option>
            <option>Strength</option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium text-gray-700">Joined Date</label>
          <input v-model="form.joinedDate" type="date"
            class="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400" />
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium text-gray-700">Status</label>
          <select v-model="form.status"
            class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400">
            <option>Active</option>
            <option>Inactive</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      <div class="flex justify-end gap-3 border-t pt-5">
        <BaseButton type="button" variant="secondary" @click="emit('close')">
          Cancel
        </BaseButton>
        <BaseButton type="submit">
          {{ isEditMode ? "Save Changes" : "Add Client" }}
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>
