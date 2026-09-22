<script setup lang="ts">
import { Users, Dumbbell, CreditCard, IndianRupee } from "lucide-vue-next";
import BaseButton from "@/components/ui/BaseButton.vue";
import RevenueChart from "@/components/charts/RevenueChart.vue";
import ClientGrowthChart from "@/components/charts/ClientGrowthChart.vue";
import {
  upcomingSessions,
  recentClients,
} from "@/data/mock/dashboard";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";

import { dashboardStats } from "@/data/mock/dashboard";

const icons = [Users, Dumbbell, CreditCard, IndianRupee];
</script>

<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p class="mt-1 text-sm text-gray-500">
          Here's what's happening with your fitness platform today.
        </p>
      </div>

      <BaseButton>
        + Add Client
      </BaseButton>
    </div>

    <!-- Stats -->
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

      <BaseCard
        v-for="(stat, index) in dashboardStats"
        :key="stat.label"
      >
        <div class="flex items-start justify-between">

          <div>
            <p class="text-sm text-gray-500">
              {{ stat.label }}
            </p>

            <p class="mt-2 text-2xl font-bold text-gray-900">
              {{ stat.value }}
            </p>

            <div class="mt-2 flex items-center gap-2">

              <BaseBadge variant="success">
                {{ stat.change }}
              </BaseBadge>

              <span class="text-xs text-gray-500">
                vs last month
              </span>

            </div>
          </div>

          <div class="rounded-lg bg-gray-100 p-3">
            <component :is="icons[index]" :size="20" />
          </div>

        </div>
      </BaseCard>

    </div>

    <!-- Charts -->
    <div class="grid gap-6 xl:grid-cols-2">

      <BaseCard>

        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h2 class="font-semibold text-gray-900">
                Revenue Overview
              </h2>

              <p class="text-sm text-gray-500">
                Monthly revenue
              </p>
            </div>

            <span class="text-sm text-gray-500">
              Last 7 months
            </span>
          </div>
        </template>

        <RevenueChart />

      </BaseCard>


      <BaseCard>

        <template #header>
          <div>
            <h2 class="font-semibold text-gray-900">
              Client Growth
            </h2>

            <p class="text-sm text-gray-500">
              Total active clients
            </p>
          </div>
        </template>

        <ClientGrowthChart />

      </BaseCard>

    </div>

    <!-- Bottom section -->
    <div class="grid gap-6 xl:grid-cols-2">

      <!-- Upcoming Sessions -->
      <BaseCard>

        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-gray-900">
              Upcoming Sessions
            </h2>

            <button class="text-sm font-medium text-gray-600">
              View all
            </button>
          </div>
        </template>

        <div class="divide-y">

          <div
            v-for="session in upcomingSessions"
            :key="session.id"
            class="flex items-center justify-between py-4"
          >

            <div>
              <p class="text-sm font-medium text-gray-900">
                {{ session.client }}
              </p>

              <p class="mt-1 text-xs text-gray-500">
                {{ session.type }} · {{ session.trainer }}
              </p>
            </div>

            <div class="text-right">
              <p class="text-sm font-medium">
                {{ session.time }}
              </p>

              <p class="text-xs text-gray-500">
                {{ session.date }}
              </p>
            </div>

          </div>

        </div>

      </BaseCard>


      <!-- Recent Clients -->
      <BaseCard>

        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-gray-900">
              Recent Clients
            </h2>

            <button class="text-sm font-medium text-gray-600">
              View all
            </button>
          </div>
        </template>

        <div class="overflow-x-auto">

          <table class="w-full text-left text-sm">

            <thead class="border-b text-xs uppercase text-gray-500">
              <tr>
                <th class="px-2 py-3">Client</th>
                <th class="px-2 py-3">Plan</th>
                <th class="px-2 py-3">Status</th>
              </tr>
            </thead>

            <tbody class="divide-y">

              <tr
                v-for="client in recentClients"
                :key="client.id"
              >
                <td class="px-2 py-4">
                  <p class="font-medium text-gray-900">
                    {{ client.name }}
                  </p>

                  <p class="text-xs text-gray-500">
                    {{ client.email }}
                  </p>
                </td>

                <td class="px-2 py-4">
                  {{ client.plan }}
                </td>

                <td class="px-2 py-4">
                  <BaseBadge
                    :variant="
                      client.status === 'Active'
                        ? 'success'
                        : 'warning'
                    "
                  >
                    {{ client.status }}
                  </BaseBadge>
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </BaseCard>

    </div>

  </div>
</template>