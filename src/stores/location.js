import { ref } from "vue";
import { defineStore } from "pinia";

export const useLocationStore = defineStore("location", () => {
  const location = ref("");
  return { location };
});
