<script setup lang="ts">
import { Users, Dumbbell, CreditCard, IndianRupee, ArrowUpRight, CalendarDays } from "lucide-vue-next";
import BaseButton from "@/components/ui/BaseButton.vue";
import RevenueChart from "@/components/charts/RevenueChart.vue";
import ClientGrowthChart from "@/components/charts/ClientGrowthChart.vue";
import { upcomingSessions, recentClients, dashboardStats } from "@/data/mock/dashboard";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";
const icons = [Users, Dumbbell, CreditCard, IndianRupee];
</script>
<template>
<div class="space-y-7">
  <div class="flex items-end justify-between">
    <div><p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Overview</p><h1 class="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Good morning, Archana 👋</h1><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Here’s what’s happening across your fitness platform.</p></div>
    <BaseButton class="!rounded-xl !px-5" @click="$router.push('/admin/clients')">+ Add Client</BaseButton>
  </div>

  <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    <div v-for="(stat,index) in dashboardStats" :key="stat.label" class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div class="flex items-start justify-between"><div><p class="text-xs font-medium text-slate-500 dark:text-slate-400">{{stat.label}}</p><p class="mt-3 text-2xl font-bold tracking-tight">{{stat.value}}</p></div><div class="rounded-xl bg-slate-100 p-2.5 text-slate-600 dark:bg-slate-800 dark:text-slate-300"><component :is="icons[index]" :size="19"/></div></div>
      <div class="mt-4 flex items-center gap-2"><BaseBadge variant="success">{{stat.change}}</BaseBadge><span class="text-xs text-slate-400">vs last month</span></div>
    </div>
  </div>

  <div class="grid gap-5 xl:grid-cols-[1.35fr_1fr]">
    <BaseCard><template #header><div class="flex items-center justify-between"><div><h2 class="font-semibold">Revenue overview</h2><p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Monthly performance</p></div><span class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">Last 7 months</span></div></template><RevenueChart/></BaseCard>
    <BaseCard><template #header><div><h2 class="font-semibold">Client growth</h2><p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Active client base</p></div></template><ClientGrowthChart/></BaseCard>
  </div>

  <div class="grid gap-5 xl:grid-cols-[1fr_1.25fr]">
    <BaseCard><template #header><div class="flex items-center justify-between"><h2 class="font-semibold">Upcoming sessions</h2><button class="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white">View all <ArrowUpRight :size="13" class="inline"/></button></div></template>
      <div class="divide-y divide-slate-100 dark:divide-slate-800"><div v-for="session in upcomingSessions" :key="session.id" class="flex items-center justify-between py-4"><div><p class="text-sm font-semibold">{{session.client}}</p><p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{session.type}} · {{session.trainer}}</p></div><div class="text-right"><p class="text-sm font-semibold">{{session.time}}</p><p class="text-xs text-slate-400">{{session.date}}</p></div></div></div>
    </BaseCard>
    <BaseCard><template #header><div class="flex items-center justify-between"><h2 class="font-semibold">Recent clients</h2><button class="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white">View all <ArrowUpRight :size="13" class="inline"/></button></div></template>
      <div class="overflow-x-auto"><table class="w-full text-left text-sm"><thead class="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 dark:border-slate-800"><tr><th class="px-2 py-3">Client</th><th class="px-2 py-3">Plan</th><th class="px-2 py-3">Status</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800"><tr v-for="client in recentClients" :key="client.id"><td class="px-2 py-4"><p class="font-medium">{{client.name}}</p><p class="text-xs text-slate-400">{{client.email}}</p></td><td class="px-2 py-4">{{client.plan}}</td><td class="px-2 py-4"><BaseBadge :variant="client.status === 'Active' ? 'success' : 'warning'">{{client.status}}</BaseBadge></td></tr></tbody></table></div>
    </BaseCard>
  </div>
</div>
</template>