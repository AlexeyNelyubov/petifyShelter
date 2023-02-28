import { ref } from "vue";
import { defineStore } from "pinia";

export const usePaginationStore = defineStore("pagination", () => {
  const pagination = ref("");
  return { pagination };
});
