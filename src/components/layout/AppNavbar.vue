<script setup lang="ts">
import { Bell, Search, Sun, Moon } from "lucide-vue-next";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
</script>

<template>
  <header class="fixed left-64 right-0 top-0 z-10 h-16 border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-900/[0.02] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
    <div class="flex h-full items-center justify-between gap-4 px-6">
      <div class="relative w-80 max-w-[45%]">
        <Search :size="17" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search..."
          class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:bg-slate-900 dark:focus:ring-orange-500/10"
        />
      </div>

      <div class="flex items-center gap-4">
        <button
          type="button"
          class="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-orange-500/30 dark:hover:bg-slate-800 dark:hover:text-orange-300"
          title="Toggle theme"
          aria-label="Toggle light and dark theme"
          @click="themeStore.setTheme(themeStore.theme === 'light' ? 'dark' : 'light')"
        >
          <Sun v-if="themeStore.theme === 'dark'" :size="18" />
          <Moon v-else :size="18" />
        </button>

        <button class="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white" aria-label="Notifications">
          <Bell :size="19" />
          <span class="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white dark:ring-slate-950" />
        </button>

        <div class="flex items-center gap-3 border-l border-slate-200 pl-4 dark:border-slate-800">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-700 dark:bg-orange-400/15 dark:text-orange-300">
            AM
          </div>
          <div class="hidden sm:block">
            <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">Archana</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
