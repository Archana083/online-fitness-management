<script setup lang="ts">
import AppSidebar from "@/components/layout/AppSidebar.vue";
import AppNavbar from "@/components/layout/AppNavbar.vue";
</script>
<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
    <AppSidebar />
    <AppNavbar />
    <main class="ml-64 pt-16"><div class="p-6"><RouterView /></div></main>
  </div>
</template>