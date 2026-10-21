<script setup lang="ts">
import { LayoutDashboard, Users, Dumbbell, ClipboardList, Utensils, CalendarDays, CreditCard, BarChart3, Settings, Activity } from "lucide-vue-next";
const menuItems = [
 { label:"Dashboard",icon:LayoutDashboard,path:"/admin/dashboard" },
 { label:"Clients",icon:Users,path:"/admin/clients" },
 { label:"Trainers",icon:Dumbbell,path:"/admin/trainers" },
 { label:"Programs",icon:ClipboardList,path:"/admin/programs" },
 { label:"Nutrition",icon:Utensils,path:"/admin/nutrition" },
 { label:"Sessions",icon:CalendarDays,path:"/admin/sessions" },
 { label:"Payments",icon:CreditCard,path:"/admin/payments" },
 { label:"Reports",icon:BarChart3,path:"/admin/reports" },
 { label:"Settings",icon:Settings,path:"/admin/settings" },
];
</script>

<template>
  <aside class="fixed inset-y-0 left-0 z-20 w-64 border-r border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
    <div class="flex h-16 items-center gap-3 border-b border-slate-100 px-6 dark:border-slate-800">
      <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-white shadow-sm shadow-orange-600/25 dark:bg-orange-500">
        <Activity :size="20" />
      </div>
      <div>
        <h1 class="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">FitManager</h1>
        <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Fitness Platform</p>
      </div>
    </div>

    <nav class="space-y-1 p-4">
      <p class="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Workspace</p>
      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="group flex items-center gap-3 rounded-xl border border-transparent px-3.5 py-2.5 text-sm font-medium text-slate-600 transition duration-150 hover:bg-orange-50 hover:text-orange-700 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-orange-300"
        active-class="!border-orange-100 !bg-orange-50 !font-semibold !text-orange-700 dark:!border-orange-400/15 dark:!bg-orange-400/10 dark:!text-orange-300"
      >
        <component :is="item.icon" :size="18" class="shrink-0" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="absolute bottom-5 left-4 right-4 rounded-2xl border border-orange-100 bg-orange-50/80 p-4 dark:border-slate-800 dark:bg-slate-900">
      <div class="mb-2 flex items-center gap-2">
        <span class="h-2 w-2 rounded-full bg-orange-500"></span>
        <p class="text-xs font-bold text-slate-800 dark:text-slate-100">Today's Focus</p>
      </div>
      <p class="text-xs leading-5 text-slate-600 dark:text-slate-400">Keep your clients moving forward.</p>
    </div>
  </aside>
</template>
