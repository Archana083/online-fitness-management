<script setup lang="ts">
import { Bell, Search } from "lucide-vue-next";
</script>

<template>
  <header class="fixed left-64 right-0 top-0 z-10 h-16 border-b bg-white">
    <div class="flex h-full items-center justify-between px-6">
      <div class="relative w-80">
        <Search
          :size="18"
          class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search..."
          class="w-full rounded-lg border bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-gray-400"
        />
      </div>

      <div class="flex items-center gap-5">
        <button class="relative text-gray-500">
          <Bell :size="20" />

          <span
            class="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"
          />
        </button>

        <div class="flex items-center gap-3">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-medium text-white"
          >
            AM
          </div>

          <div>
            <p class="text-sm font-medium">Archana</p>
            <p class="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>