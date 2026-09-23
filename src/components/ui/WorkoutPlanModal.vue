<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { clients } from "@/data/mock/clients";
import { trainers } from "@/data/mock/trainers";
import { programs } from "@/data/mock/programs";
import { exercises } from "@/data/mock/exercises";
import type { WorkoutExercise, WorkoutPlan } from "@/data/mock/workoutPlans";

const props = withDefaults(defineProps<{ isOpen: boolean; plan?: WorkoutPlan | null }>(), { plan: null });
const emit = defineEmits<{ close: []; save: [plan: WorkoutPlan] }>();

const empty = (): Omit<WorkoutPlan, "id"> => ({
  name: "", clientId: clients[0]?.id ?? 1, clientName: clients[0]?.name ?? "", programId: programs[0]?.id ?? 1,
  programName: programs[0]?.name ?? "", trainerName: trainers[0]?.name ?? "", durationWeeks: 8,
  status: "Draft", exercises: [],
});
const form = reactive<Omit<WorkoutPlan, "id">>(empty());
const isEdit = computed(() => !!props.plan);

watch(() => props.plan, (plan) => {
  Object.assign(form, plan ? JSON.parse(JSON.stringify(plan)) : empty());
}, { immediate: true });

const syncRelations = () => {
  const client = clients.find((item) => item.id === Number(form.clientId));
  const program = programs.find((item) => item.id === Number(form.programId));
  form.clientName = client?.name ?? "";
  form.programName = program?.name ?? "";
  form.durationWeeks = program?.durationWeeks ?? form.durationWeeks;
};

const addExercise = () => {
  const first = exercises[0];
  if (!first) return;
  form.exercises.push({
    id: Date.now(),
    exerciseId: first.id,
    day: "Monday",
    sets: first.sets,
    reps: first.reps,
    weight: 0,
    restSeconds: first.restSeconds,
    notes: "",
  });
};

const removeExercise = (id: number) => {
  form.exercises = form.exercises.filter((item) => item.id !== id);
};

const updateFromExercise = (item: WorkoutExercise) => {
  const exercise = exercises.find((entry) => entry.id === Number(item.exerciseId));
  if (!exercise) return;
  item.sets = exercise.sets;
  item.reps = exercise.reps;
  item.restSeconds = exercise.restSeconds;
};

const move = (index: number, direction: -1 | 1) => {
  const target = index + direction;
  if (target < 0 || target >= form.exercises.length) return;
  const current = form.exercises[index];
  form.exercises[index] = form.exercises[target];
  form.exercises[target] = current;
};

const submit = () => {
  if (!form.name.trim() || !form.clientId || !form.programId) return;
  syncRelations();
  emit("save", { id: props.plan?.id ?? Date.now(), ...form });
};
</script>

<template>
  <BaseModal :is-open="isOpen" :title="isEdit ? 'Edit Workout Plan' : 'Create Workout Plan'" @close="emit('close')">
    <form class="space-y-6" @submit.prevent="submit">
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="space-y-1.5 sm:col-span-2"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Plan name</span><input v-model="form.name" required placeholder="e.g. Ananya - Fat Loss Phase 1" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></label>
        <label class="space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Client</span><select v-model.number="form.clientId" @change="syncRelations" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"><option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }}</option></select></label>
        <label class="space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Program</span><select v-model.number="form.programId" @change="syncRelations" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"><option v-for="program in programs" :key="program.id" :value="program.id">{{ program.name }}</option></select></label>
        <label class="space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Trainer</span><select v-model="form.trainerName" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"><option v-for="trainer in trainers" :key="trainer.id">{{ trainer.name }}</option></select></label>
        <label class="space-y-1.5"><span class="text-sm font-medium text-slate-700 dark:text-slate-200">Status</span><select v-model="form.status" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"><option>Draft</option><option>Active</option><option>Completed</option></select></label>
      </div>

      <div class="rounded-2xl border border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800"><div><p class="font-semibold">Workout exercises</p><p class="text-xs text-slate-400">{{ form.exercises.length }} exercise{{ form.exercises.length === 1 ? "" : "s" }}</p></div><BaseButton type="button" class="!rounded-lg !px-3 !py-2" @click="addExercise">+ Add exercise</BaseButton></div>
        <div v-if="!form.exercises.length" class="p-8 text-center text-sm text-slate-400">No exercises added yet.</div>
        <div v-for="(item, index) in form.exercises" :key="item.id" class="border-b border-slate-100 p-4 last:border-b-0 dark:border-slate-800">
          <div class="mb-3 flex items-center justify-between"><span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Exercise {{ index + 1 }}</span><div class="flex gap-1"><button type="button" class="rounded-lg px-2 py-1 text-xs text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" @click="move(index,-1)">↑</button><button type="button" class="rounded-lg px-2 py-1 text-xs text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" @click="move(index,1)">↓</button><button type="button" class="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30" @click="removeExercise(item.id)">×</button></div></div>
          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label class="space-y-1"><span class="text-xs text-slate-500">Day</span><select v-model="item.day" class="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option></select></label>
            <label class="space-y-1"><span class="text-xs text-slate-500">Exercise</span><select v-model.number="item.exerciseId" @change="updateFromExercise(item)" class="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"><option v-for="exercise in exercises" :key="exercise.id" :value="exercise.id">{{ exercise.name }}</option></select></label>
            <label class="space-y-1"><span class="text-xs text-slate-500">Sets</span><input v-model.number="item.sets" type="number" min="1" class="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></label>
            <label class="space-y-1"><span class="text-xs text-slate-500">Reps</span><input v-model="item.reps" class="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></label>
            <label class="space-y-1"><span class="text-xs text-slate-500">Weight (kg)</span><input v-model.number="item.weight" type="number" min="0" step="0.5" class="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></label>
            <label class="space-y-1"><span class="text-xs text-slate-500">Rest (sec)</span><input v-model.number="item.restSeconds" type="number" min="0" class="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></label>
            <label class="space-y-1 sm:col-span-2"><span class="text-xs text-slate-500">Notes</span><input v-model="item.notes" placeholder="Optional coaching note" class="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></label>
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800"><BaseButton type="button" variant="secondary" @click="emit('close')">Cancel</BaseButton><BaseButton type="submit">{{ isEdit ? "Save Changes" : "Create Plan" }}</BaseButton></div>
    </form>
  </BaseModal>
</template>
