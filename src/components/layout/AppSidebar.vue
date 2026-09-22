<script setup lang="ts">
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  ClipboardList,
  Utensils,
  CalendarDays,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-vue-next";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    label: "Clients",
    icon: Users,
    path: "/admin/clients",
  },
  {
    label: "Trainers",
    icon: Dumbbell,
    path: "/admin/trainers",
  },
  {
    label: "Programs",
    icon: ClipboardList,
    path: "/admin/programs",
  },
  {
    label: "Nutrition",
    icon: Utensils,
    path: "/admin/nutrition",
  },
  {
    label: "Sessions",
    icon: CalendarDays,
    path: "/admin/sessions",
  },
  {
    label: "Payments",
    icon: CreditCard,
    path: "/admin/payments",
  },
  {
    label: "Reports",
    icon: BarChart3,
    path: "/admin/reports",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];
</script>

<template>
  <aside class="fixed inset-y-0 left-0 w-64 border-r bg-white">
    <div class="flex h-16 items-center border-b px-6">
      <h1 class="text-xl font-bold">FitManager</h1>
    </div>

    <nav class="space-y-1 p-4">
      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-600 transition hover:bg-gray-100"
        active-class="bg-gray-100 font-medium text-gray-900"
      >
        <component :is="item.icon" :size="19" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>