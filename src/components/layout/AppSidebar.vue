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
<aside class="fixed inset-y-0 left-0 z-20 w-64 border-r border-slate-200 bg-white/95 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
  <div class="flex h-16 items-center gap-3 border-b border-slate-200 px-6 dark:border-slate-800">
    <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900"><Activity :size="19"/></div>
    <div><h1 class="text-lg font-bold tracking-tight">FitManager</h1><p class="text-[10px] uppercase tracking-[0.18em] text-slate-400">Fitness Platform</p></div>
  </div>
  <nav class="space-y-1.5 p-4">
    <p class="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Workspace</p>
    <RouterLink v-for="item in menuItems" :key="item.path" :to="item.path" class="group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white" active-class="!bg-slate-900 !text-white shadow-sm dark:!bg-white dark:!text-slate-900">
      <component :is="item.icon" :size="18" class="shrink-0"/>
      <span>{{ item.label }}</span>
    </RouterLink>
  </nav>
  <div class="absolute bottom-5 left-4 right-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
    <p class="text-xs font-semibold">Today's Focus</p><p class="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Keep your clients moving forward.</p>
  </div>
</aside>
</template>