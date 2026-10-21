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
  specialization: "",
  experience: 0,
  clients: 0,
  joinedDate: new Date().toISOString().slice(0, 10),
  status: "active",
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
    <div class="grid gap-x-4 gap-y-4 sm:grid-cols-2">
      <!-- Name -->
      <label class="block space-y-1.5">
        <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
          Name <span class="text-red-500">*</span>
        </span>
        <input
          v-model="form.name"
          type="text"
          placeholder="Enter trainer name"
          required
          class="w-full rounded-lg border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:border-orange-500 dark:focus:ring-orange-500/10"
        />
      </label>

      <!-- Email -->
      <label class="block space-y-1.5">
        <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
          Email <span class="text-red-500">*</span>
        </span>
        <input
          v-model="form.email"
          type="email"
          placeholder="trainer@example.com"
          required
          class="w-full rounded-lg border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:border-orange-500 dark:focus:ring-orange-500/10"
        />
      </label>

      <!-- Phone -->
      <label class="block space-y-1.5">
        <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
          Phone <span class="text-red-500">*</span>
        </span>
        <input
          v-model="form.phone"
          type="tel"
          placeholder="Enter phone number"
          required
          class="w-full rounded-lg border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:border-orange-500 dark:focus:ring-orange-500/10"
        />
      </label>

      <!-- Specialization -->
      <label class="block space-y-1.5">
        <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
          Specialization
        </span>
        <select
          v-model="form.specialization"
          class="w-full rounded-lg border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:border-orange-500 dark:focus:ring-orange-500/10"
        >
          <option value="" disabled>Select specialization</option>
          <option value="Strength & Conditioning">Strength & Conditioning</option>
          <option value="Weight loss & Nutrition">Weight Loss & Nutrition</option>
          <option value="Functional Training">Functional Training</option>
          <option value="Yoga & Mobility">Yoga & Mobility</option>
          <option value="HIIT & Cardio">HIIT & Cardio</option>
          <option value="Strength & Weight Loss">Strength & Weight Loss</option>
        </select>
      </label>

      <!-- Experience -->
      <label class="block space-y-1.5">
        <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
          Experience (years) <span class="text-red-500">*</span>
        </span>
        <input
          v-model.number="form.experience"
          type="number"
          min="0"
          placeholder="e.g. 3"
          required
          class="w-full rounded-lg border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:border-orange-500 dark:focus:ring-orange-500/10"
        />
      </label>

      <!-- Joined Date -->
      <label class="block space-y-1.5">
        <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
          Joined Date <span class="text-red-500">*</span>
        </span>
        <input
          v-model="form.joinedDate"
          type="date"
          required
          class="w-full rounded-lg border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:border-orange-500 dark:focus:ring-orange-500/10"
        />
      </label>

      <!-- Status -->
      <label class="block space-y-1.5 sm:col-span-2">
        <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
          Status
        </span>
        <select
          v-model="form.status"
          class="w-full rounded-lg border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:border-orange-500 dark:focus:ring-orange-500/10"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
    </div>

    <!-- Bio -->
    <label class="block space-y-1.5">
      <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
        Bio <span class="text-slate-400">(Optional)</span>
      </span>
      <textarea
        v-model="form.bio"
        rows="3"
        placeholder="Write a short introduction about the trainer..."
        class="w-full resize-y rounded-lg border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:border-orange-500 dark:focus:ring-orange-500/10"
      ></textarea>
    </label>

    <!-- Actions -->
    <div
      class="flex justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 dark:border-slate-800"
    >
      <BaseButton
        type="button"
        variant="secondary"
        @click="emit('close')"
      >
        Cancel
      </BaseButton>

      <BaseButton type="submit">
        {{ isEditMode ? "Save Changes" : "Add Trainer" }}
      </BaseButton>
    </div>
  </form>
</BaseModal>
</template>
