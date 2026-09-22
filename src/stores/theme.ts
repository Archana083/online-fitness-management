import { defineStore } from "pinia";
import { ref, watch } from "vue";

export type Theme = "light" | "dark";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref<Theme>((localStorage.getItem("theme") as Theme) || "light");

  const applyTheme = () => {
    document.documentElement.classList.toggle("dark", theme.value === "dark");
  };

  const setTheme = (value: Theme) => {
    theme.value = value;
    applyTheme();
  };

  watch(theme, applyTheme, { immediate: true });

  return { theme, setTheme };
});
