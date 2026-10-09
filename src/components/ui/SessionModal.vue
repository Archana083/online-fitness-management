<template>
  <Teleport to="body"
    ><div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
      @click.self="emit('close')"
    >
      <div
        class="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
      >
        <div
          class="border-b border-slate-100 px-6 py-4 dark:border-slate-800 flex justify-between items-center"
        >
          <h2 class="text-lg font-bold">Schedule Session</h2>
          <button @click="emit('close')">X</button>
        </div>
        <form class="grid gap-4 p-6 md:grid-cols-2"
         @submit.prevent="handleSubmit">
          <div>
            <label class="label">Client *</label>
            <select class="input" v-model="form.clientName">
              <option value="">Select client</option>
              <option>Ananya Sharma</option>
              <option>Rohan Kapoor</option>
              <option>Neha Verma</option>
              <option>Arjun Patel</option>
              <option>Kavya Nair</option>
            </select>
          </div>
          <div>
            <label class="label">Trainer *</label>
            <select class="input" v-model="form.trainerName">
              <option value="">Select trainer</option>
              <option value="Rahul Mehta">Rahul Mehta</option>
              <option value="Priya Singh">Priya Singh</option>
              <option value="Amit Shah">Amit Shah</option>
              <option value="Neha Kapoor">Neha Kapoor</option>
            </select>
          </div>

          <div class="md:col-span-2">
            <label class="label">Date *</label>
            <input v-model="form.date" type="date" class="input" />
          </div>
          <div>
            <label class="label">Start Time *</label>
            <input v-model="form.startTime" type="time" class="input" />
          </div>
          <div>
            <label class="label">End Time *</label>
            <input v-model="form.endTime" type="time" class="input" />
          </div>

          <div>
            <label class="label">Session Type *</label>
            <select v-model="form.type" class="input">
              <option value="">Select type</option>
              <option value="Personal Training">Personal Training</option>
              <option value="Workout Review">Workout Review</option>
              <option value="Nutrition Consultation">
                Nutrition Consultation
              </option>
              <option value="Progress Check-in">Progress Check-in</option>
              <option value="Online Training">Online Training</option>
            </select>
          </div>
          <div>
            <label class="label">Location *</label>
            <select v-model="form.location" class="input">
              <option value="">Select location</option>
              <option value="Gym">Gym</option>
              <option value="Online">Online</option>
              <option value="Client Home">Client Home</option>
            </select>
          </div>

          <div class="md:col-span-2">
            <label class="label">Status *</label>
            <select v-model="form.status" class="input">
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="No Show">No Show</option>
            </select>
          </div>

          <div class="md:col-span-2">
            <label class="label">Notes</label>
            <textarea
              v-model="form.notes"
              rows="3"
              class="input"
              placeholder="Session notes..."
           ></textarea>
          </div>
          <div class="md:col-span-2">
            <label class="label">Meeting Link</label>
            <input
              v-model="form.meetingLink"
              type="url"
              class="input"
              placeholder="https://meet.google.com/..."
            />
          </div>
            <div
          class="flex justify-end gap-3 border-t border-slate-100 px-6 py-4 dark:border-slate-800"
        >
          <button
            type="button"
            class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            @click="emit('close')"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900"
          >
            Save
          </button>
        </div>
        </form>

      
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Session } from "@/data/mock/sessions";
import { ref } from "vue";
const form = ref({
  clientName: "",
  trainerName: "",
  date: "",
  startTime: "",
  endTime: "",
  type: "",
  location: "",
  status: "Scheduled",
  notes: "",
  meetingLink: "",
});
const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    session?: Session | null;
  }>(),
  {
    session: null,
  },
);
const handleSubmit = () => {
   console.log("SAVE CLICKED");
  console.log(form.value);
  emit('save', form.value)
  };
const emit = defineEmits<{ close: []; save: [session : typeof  form.value] }>();
</script>

<style scoped>
.label {
  display: block;
  margin-bottom: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
}
.input {
  width: 100%;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  border-radius: 0.75rem;
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  outline: none;
}
.input:focus {
  border-color: #94a3b8;
  box-shadow: 0 0 0 3px rgb(148 163 184 / 0.15);
}
:global(.dark) .input {
  border-color: #334155;
  background: #1e293b;
  color: #f8fafc;
}
</style>
