<script setup lang="ts">
import { computed } from "vue";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import { clientGrowthData } from "@/data/mock/dashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

const chartData = computed(() => ({
  labels: clientGrowthData.labels,
  datasets: [
    {
      label: "Clients",
      data: clientGrowthData.values,
      borderColor: "#0d9488",
      backgroundColor: "#0d94881A",
      pointBackgroundColor: "#0f766e",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5,
      borderWidth: 2.5,
      tension: 0.35,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#0f172a",
      titleColor: "#f8fafc",
      bodyColor: "#e2e8f0",
      padding: 12,
      cornerRadius: 10,
      displayColors: false,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#94a3b8" },
      border: { display: false },
    },
    y: {
      grid: { color: "rgba(148, 163, 184, 0.15)" },
      ticks: { color: "#94a3b8" },
      border: { display: false },
    },
  },
};
</script>

<template>
  <div class="h-72">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>