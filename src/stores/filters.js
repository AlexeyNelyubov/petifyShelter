import { ref } from "vue";
import { defineStore } from "pinia";

export const useFiltersStore = defineStore("filters", () => {
  const filters = ref({
    type: [],
    gender: [],
    breeds: [],
  });
  return { filters };
});
