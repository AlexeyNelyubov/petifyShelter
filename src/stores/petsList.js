import { ref } from "vue";
import { defineStore } from "pinia";

export const usePetsStore = defineStore("petsList", () => {
  const petsList = ref([]);
  return { petsList };
});
