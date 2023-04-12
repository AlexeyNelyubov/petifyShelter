import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const authentificated = ref(false);
  const user = ref({
    userName: "Гость",
    userId: "guest",
    city: "",
    avatar: "@/assets/images/Header/guestava.png",
  });

  if (localStorage.getItem("user")) {
    authentificated.value = true;
    user.value = JSON.parse(localStorage.getItem("user"));
  }

  const logIn = (json) => {
    authentificated.value = true;
    user.value.userName = json["firstName"] + " " + json["lastName"];
    user.value.userId = json["firstName"];
    user.value.city = json["city"];
    user.value.avatar = "@/assets/images/Header/imgava.svg";
    localStorage.setItem("user", JSON.stringify(user.value));
  };

  const logOut = () => {
    localStorage.removeItem("user");
    authentificated.value = false;
    user.value.userName = "Гость";
    user.value.userId = "guest";
    user.value.city = "";
    user.value.avatar = "/src/assets/images/Header/guestava.png";
  };

  return { authentificated, user, logIn, logOut };
});
