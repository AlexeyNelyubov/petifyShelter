import { ref } from "vue";
import { defineStore } from "pinia";

export const useAutorizatonStore = defineStore("autorization", () => {
  const autorization = ref(false);
  const user = ref({
    userName: "Гость",
    userId: "guest",
    city: "Москва",
  });
  // const userName = ref("Гость");

  return { autorization, user };
});
