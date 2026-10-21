<script setup lang="ts">
import { computed, onMounted, reactive, watch } from "vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import type { Client, ClientStatus, ClientForm } from "@/data/clients";
import { ref } from "vue";
import { getTrainers } from "@/services/trainerService";

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

const emptyForm = (): ClientForm => ({
  name: "",
  email: "",
  phone: "",
  trainer: 0,
  plan: "",
  goal: "",
  joinedDate: new Date().toISOString().slice(0, 10),
  status: "active",
});

const form =  reactive<ClientForm>(emptyForm());

const isEditMode = computed(() => !!props.client);
const title = computed(() => (isEditMode.value ? "Edit Client" : "Add Client"));
interface Trainer {
  id: number;
  name: string;
}
const trainers = ref<Trainer[]>([]);
onMounted( async () => {
  trainers.value = await getTrainers()
  console.log(trainers.value, 'trainers');
});
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
          <label class="text-sm font-medium text-slate-700 dark:text-slate-200">Name</label>
          <input v-model="form.name" required type="text" placeholder="Client name"
            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-orange-500 dark:focus:ring-orange-500/10" />
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
          <input v-model="form.email" required type="email" placeholder="client@example.com"
            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-orange-500 dark:focus:ring-orange-500/10" />
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-200">Phone</label>
          <input v-model="form.phone" required type="tel" placeholder="+91 98765 43210"
            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-orange-500 dark:focus:ring-orange-500/10" />
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-200">Trainer</label>
          <select v-model="form.trainer"
            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-orange-500 dark:focus:ring-orange-500/10">
            <option value="0" disabled>Select trainer</option>
            <option v-for="trainer in trainers" :key="trainer.id" :value="trainer.id">
              {{ trainer.name }}
            </option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-200">Plan</label>
          <select v-model="form.plan"
            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-orange-500 dark:focus:ring-orange-500/10">
            <option value="" disabled>Select plan</option>
            <option value="basic">Basic</option>
            <option value="pro">Pro</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-200">Goal</label>
          <select v-model="form.goal"
            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-orange-500 dark:focus:ring-orange-500/10">
            <option value="">Select goal</option>
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="general_fitness">General Fitness</option>
            <option value="strength">Strength</option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-200">Joined Date</label>
          <input v-model="form.joinedDate" type="date"
            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-orange-500 dark:focus:ring-orange-500/10" />
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-200">Status</label>
          <select v-model="form.status"
            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-orange-500 dark:focus:ring-orange-500/10">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div class="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
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
