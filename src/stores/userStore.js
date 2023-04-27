import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const authentificated = ref(false);
  const user = ref({
    userName: "Гость",
    userId: "guest",
    city: "",
    avatar: new URL("/src/assets/images/Header/guestava.png", import.meta.url),
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
    user.value.avatar = new URL(
      "/src/assets/images/Header/imgava.svg",
      import.meta.url
    );
    localStorage.setItem("user", JSON.stringify(user.value));
  };

  const logOut = () => {
    localStorage.removeItem("user");
    authentificated.value = false;
    user.value.userName = "Гость";
    user.value.userId = "guest";
    user.value.city = "";
    user.value.avatar = new URL(
      "/src/assets/images/Header/guestava.png",
      import.meta.url
    );
  };
  return { authentificated, user, logIn, logOut };
});
