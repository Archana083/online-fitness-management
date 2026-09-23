<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import type { Trainer, TrainerStatus } from "@/data/mock/trainers";

const props = withDefaults(
  defineProps<{ isOpen: boolean; trainer?: Trainer | null }>(),
  { trainer: null },
);

const emit = defineEmits<{
  close: [];
  save: [trainer: Trainer];
}>();

const emptyForm = (): Omit<Trainer, "id"> => ({
  name: "",
  email: "",
  phone: "",
  specialization: "Strength & Conditioning",
  experience: 1,
  clients: 0,
  joinedDate: new Date().toISOString().slice(0, 10),
  status: "Active",
  bio: "",
});

const form = reactive<Omit<Trainer, "id">>(emptyForm());
const isEditMode = computed(() => !!props.trainer);
const title = computed(() => (isEditMode.value ? "Edit Trainer" : "Add Trainer"));

watch(
  () => props.trainer,
  (trainer) => Object.assign(form, trainer ? { ...trainer } : emptyForm()),
  { immediate: true },
);

const submit = () => {
  if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) return;

  emit("save", {
    id: props.trainer?.id ?? Date.now(),
    ...form,
    experience: Number(form.experience),
    clients: Number(form.clients),
    status: form.status as TrainerStatus,
  });
};
</script>

<template>
  <BaseModal :is-open="isOpen" :title="title" @close="emit('close')">
    <form class="space-y-5" @submit.prevent="submit">
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="space-y-1.5">
          <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Name</span>
          <input v-model="form.name" required class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-800" />
        </label>
        <label class="space-y-1.5">
          <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Email</span>
          <input v-model="form.email" type="email" required class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-800" />
        </label>
        <label class="space-y-1.5">
          <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Phone</span>
          <input v-model="form.phone" required class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-2 dark:focus:ring-slate-800" />
        </label>
        <label class="space-y-1.5">
          <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Specialization</span>
          <select v-model="form.specialization" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white">
            <option>Strength & Conditioning</option>
            <option>Weight Loss & Nutrition</option>
            <option>Functional Training</option>
            <option>Yoga & Mobility</option>
            <option>HIIT & Cardio</option>
          </select>
        </label>
        <label class="space-y-1.5">
          <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Experience (years)</span>
          <input v-model.number="form.experience" type="number" min="0" required class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
        </label>
        <label class="space-y-1.5">
          <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Clients</span>
          <input v-model.number="form.clients" type="number" min="0" required class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
        </label>
        <label class="space-y-1.5">
          <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Joined Date</span>
          <input v-model="form.joinedDate" type="date" required class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
        </label>
        <label class="space-y-1.5">
          <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Status</span>
          <select v-model="form.status" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </label>
      </div>

      <label class="block space-y-1.5">
        <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Bio</span>
        <textarea v-model="form.bio" rows="3" class="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
      </label>

      <div class="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
        <BaseButton type="button" variant="secondary" @click="emit('close')">Cancel</BaseButton>
        <BaseButton type="submit">{{ isEditMode ? "Save Changes" : "Add Trainer" }}</BaseButton>
      </div>
    </form>
  </BaseModal>
</template>
