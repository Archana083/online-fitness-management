<script setup lang="ts">
import AppSidebar from "@/components/layout/AppSidebar.vue";
import AppNavbar from "@/components/layout/AppNavbar.vue";
</script>
<template>
  <div class="min-h-screen bg-[#f5f7fb] text-slate-900 transition-colors dark:bg-[#0b1120] dark:text-slate-100">
    <AppSidebar />
    <AppNavbar />
    <main class="ml-64 min-h-screen pt-16"><div class="p-6 xl:p-7"><RouterView /></div></main>
  </div>
</template>