<script setup lang="ts">
import { Bell, Search, Sun, Moon } from "lucide-vue-next";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
</script>

<template>
  <header class="fixed left-64 right-0 top-0 z-10 h-16 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
    <div class="flex h-full items-center justify-between px-6">
      <div class="relative w-80">
        <Search :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          class="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 outline-none focus:border-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      <div class="flex items-center gap-5">
        <button
          type="button"
          class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          title="Toggle theme"
          @click="themeStore.setTheme(themeStore.theme === 'light' ? 'dark' : 'light')"
        >
          <Sun v-if="themeStore.theme === 'dark'" :size="19" />
          <Moon v-else :size="19" />
        </button>

        <button class="relative text-gray-500 dark:text-gray-300">
          <Bell :size="20" />
          <span class="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-medium text-white dark:bg-white dark:text-gray-900">
            AM
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">Archana</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
