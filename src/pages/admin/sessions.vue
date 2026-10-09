```vue
<script setup lang="ts">
import {
  Plus,
  CalendarDays,
  Clock3,
  CircleCheck,
  CircleX,
  Search,
  Eye,
  Pencil,
  Trash2,
  Video,
  Dumbbell,
  Home,
} from "lucide-vue-next";

import { sessions, type Session } from "@/data/mock/sessions";
import { computed, ref } from "vue";
import { formatTime, getInitials } from "@/stores/utils";
import SessionModal from "@/components/ui/SessionModal.vue";

const search = ref('')
const modal = ref(false)
const selectedTrainer = ref("All Trainers")
const selectedType = ref("All Types")
const selectedStatus = ref("All Status")
const selectedDate = ref("")
const editing = ref<Session | null>(null);
const createSession = () => {
  modal.value = true
}

const filterSession = computed(() =>{
    const query = search.value.toLowerCase().trim() 

    return sessionList.value.filter((session) =>{
      
          const matchesSearch  =
            session.clientName.toLowerCase().includes(query) ||
            session.trainerName.toLowerCase().includes(query) 
        
            const matchesStatus =
            selectedStatus.value === "All Status" ||
            session.status === selectedStatus.value

            const matchesTrainer =
            selectedTrainer.value === "All Trainers" ||
            session.trainerName === selectedTrainer.value

            const matchesType = 
            selectedType.value === "All Types" ||
            session.type === selectedType.value

             const matchesDate =
      !selectedDate.value ||
      session.date === selectedDate.value

            return (matchesSearch && matchesStatus && matchesTrainer && matchesType && matchesDate)
    })
})
const handleSave = (session: any) => {
  console.log("SESSION FROM MODAL:", session);
  sessionList.value.push({
    id: Date.now(),
    clientId:0,
    clientName:session.clientName,
    trainerId:0,
    trainerName:session.trainerName,
    date:session.date,
    startTime:session.startTime,
    endTime:session.endTime,
    type: session.type,
    location: session.location,
    status: session.status,
    notes: session.notes,
    meetingLink: session.meetingLink,
  })
  modal.value= false;
};
const sessionList = ref<Session[]>(sessions.map((session) => ({...session})))

const scheduleSession = computed(() =>{
   return sessionList.value.filter((session) => session.status === 'Scheduled' ).length
})
const completedSession = computed(() =>{
  return sessionList.value.filter((session) => session.status === 'Completed').length
})
const cancelledSession = computed(() =>{
    return sessionList.value.filter((session) => session.status === 'Cancelled' ).length
})

const todaysSession = computed(() =>{
    return sessionList.value.filter((session) =>  session.date === new Date().toISOString().split('T')[0])
})

const upcomingSession = computed(() => {
  const now = new Date()

  return sessionList.value
    .filter((session) => {
      const sessionDateTime = new Date(
        `${session.date}T${session.startTime}`
      )

      return (
        session.status === "Scheduled" &&
        sessionDateTime > now
      )
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.startTime}`).getTime()
      const dateB = new Date(`${b.date}T${b.startTime}`).getTime()

      return dateA - dateB
    })
})

console.log(todaysSession.value, 'todaysSession');


</script>

<template>
  <section class="space-y-6">

    <!-- Page Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
          Training Management
        </p>

        <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Sessions
        </h1>

        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Schedule and manage client training sessions.
        </p>
      </div>

      <button
      @click="createSession"
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900"
      >
        <Plus :size="18" />
        Add Session
      </button>
    </div>


    <!-- Stats -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      <!-- Total -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Sessions
            </p>

            <p class="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {{ sessionList.length }}
            </p>
          </div>

          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <CalendarDays :size="20" />
          </div>
        </div>
      </div>


      <!-- Scheduled -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
              Scheduled
            </p>

            <p class="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {{ scheduleSession }}
            </p>
          </div>

          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <Clock3 :size="20" />
          </div>
        </div>
      </div>


      <!-- Completed -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
              Completed
            </p>

            <p class="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {{ completedSession }}
            </p>
          </div>

          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <CircleCheck :size="20" />
          </div>
        </div>
      </div>


      <!-- Cancelled -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
              Cancelled
            </p>

            <p class="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
             {{ cancelledSession }}
            </p>
          </div>

          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
            <CircleX :size="20" />
          </div>
        </div>
      </div>

    </div>


    <!-- Filters -->
    <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">

        <!-- Search -->
        <div class="relative">
          <Search
            :size="18"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
          v-model="search"
            type="text"
            placeholder="Search client or trainer..."
            class="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>


        <!-- Status -->
        <select v-model="selectedStatus"
          class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
        >
          <option>All Status</option>
          <option>Scheduled</option>
          <option>Completed</option>
          <option>Cancelled</option>
          <option>No Show</option>
        </select>


        <!-- Trainer -->
        <select v-model="selectedTrainer"
          class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
        >
          <option>All Trainers</option>
          <option>Rahul Mehta</option>
          <option>Priya Singh</option>
          <option>Amit Shah</option>
          <option>Neha Kapoor</option>
        </select>


        <!-- Session Type -->
        <select v-model="selectedType"
          class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
        >
          <option>All Types</option>
          <option>Personal Training</option>
          <option>Workout Review</option>
          <option>Nutrition Consultation</option>
          <option>Progress Check-in</option>
          <option>Online Training</option>
        </select>


        <!-- Date -->
        <input
        v-model="selectedDate"
          type="date"
          class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
        />

      </div>

    </div>


    <!-- Today's + Upcoming -->
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">

      <!-- Today's Sessions -->
      <div class="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

        <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">

          <div>
            <h2 class="font-semibold text-slate-900 dark:text-white">
              Today's Sessions
            </h2>

            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Sessions scheduled for today
            </p>
          </div>

          <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {{ todaysSession.length }}
          </span>

        </div>


        <div class="divide-y divide-slate-100 dark:divide-slate-800">

          <!-- Session 1 -->
          <div v-for="session in todaysSession" class="flex items-center justify-between gap-4 px-5 py-4">

            <div class="flex min-w-0 items-center gap-3">

              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <Dumbbell :size="18" />
              </div>

              <div class="min-w-0">
                <p class="truncate text-sm font-semibold text-slate-900 dark:text-white">
                 {{ session.clientName }}
                </p>

                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {{ formatTime(session.startTime) }} - {{ formatTime(session.endTime) }}
                </p>

                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
{{ session.type }}                </p>
              </div>

            </div>

            <span class="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
              {{ session.status }}
            </span>

          </div>

  </div>

      </div>


      <!-- Upcoming Sessions -->
      <div class="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

        <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">

          <div>
            <h2 class="font-semibold text-slate-900 dark:text-white">
              Upcoming Sessions
            </h2>

            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Your next scheduled sessions
            </p>
          </div>

          <CalendarDays
            :size="18"
            class="text-slate-400"
          />

        </div>


        <div class="divide-y divide-slate-100 dark:divide-slate-800">

          <!-- Upcoming 1 -->
          <div v-for="session in upcomingSession" class="flex items-center justify-between gap-4 px-5 py-4">

            <div class="flex min-w-0 items-center gap-3">

              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <CalendarDays :size="18" />
              </div>

              <div class="min-w-0">
                <p class="truncate text-sm font-semibold text-slate-900 dark:text-white">
                  {{ session.clientName }}
                </p>

                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
             {{ formatTime(session.startTime) }} -
             {{ formatTime(session.endTime) }} 
                </p>
              </div>

            </div>

            <span class="hidden text-xs font-medium text-slate-500 sm:block dark:text-slate-400">
              {{ session.status }}
            </span>

          </div>
        </div>

      </div>

    </div>


    <!-- All Sessions -->
    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <!-- Header -->
      <div class="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">

        <div>
          <h2 class="font-semibold text-slate-900 dark:text-white">
            All Sessions
          </h2>

          <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Manage scheduled and completed training sessions.
          </p>
        </div>

        <p class="text-sm text-slate-500 dark:text-slate-400">
          {{ sessionList.length }} sessions
        </p>

      </div>


      <!-- Table -->
      <div class="overflow-x-auto">

        <table class="w-full min-w-[1100px] text-left">

          <thead class="bg-slate-50 dark:bg-slate-950/60">

            <tr class="border-b border-slate-200 dark:border-slate-800">

              <th class="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Date
              </th>

              <th class="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Session
              </th>

              <th class="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Client
              </th>

              <th class="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Trainer
              </th>

              <th class="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Type
              </th>

              <th class="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Location
              </th>

              <th class="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Status
              </th>

              <th class="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                Actions
              </th>

            </tr>

          </thead>


          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">

            <!-- Row 1 -->
            <tr v-for="session in filterSession" class="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/40">

              <td class="whitespace-nowrap px-5 py-4">
                <p class="text-sm font-semibold text-slate-900 dark:text-white">
                 {{ session.date }}
                </p>

                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {{ formatTime(session.startTime) }} - {{ formatTime(session.endTime) }}
                </p>
              </td>


              <td class="px-5 py-4">
                <p class="text-sm font-medium text-slate-900 dark:text-white">
                 {{ session.type }}
                </p>

                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  60 min
                </p>
              </td>


              <td class="px-5 py-4">
                <div class="flex items-center gap-3">

                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {{ getInitials(session.clientName) }}
                  </div>

                  <div>
                    <p class="text-sm font-medium text-slate-900 dark:text-white">
                      {{ session.clientName }}
                    </p>

                    <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Client #{{ session.clientId }}
                    </p>
                  </div>

                </div>
              </td>


              <td class="px-5 py-4">
                <p class="text-sm text-slate-700 dark:text-slate-300">
               {{ session.trainerName }}
                </p>
              </td>


              <td class="px-5 py-4">
                <span class="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {{ session.type }}
                </span>
              </td>


              <td class="px-5 py-4">
                <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Dumbbell :size="16" class="text-slate-400" />
                {{ session.location }}
                </div>
              </td>


              <td class="px-5 py-4">
                <span class="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                      {{ session.status }}
                </span>
              </td>


              <td class="px-5 py-4">
                <div class="flex justify-end gap-1">

                  <button class="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white">
                    <Eye :size="17" />
                  </button>

                  <button class="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white">
                    <Pencil :size="17" />
                  </button>

                  <button class="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400">
                    <Trash2 :size="17" />
                  </button>

                </div>
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  </section>
  <SessionModal :is-open="modal" :session="editing" @close="modal = false" @save="handleSave" />

</template>