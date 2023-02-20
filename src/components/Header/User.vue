<script setup>
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";

import { useAutorizatonStore } from "@/stores/autorization.js";

const AutorizatonStore = useAutorizatonStore();

const showMenuForProfile = ref(false);
const Hello = ref(["Привет друг!", "22px"]);
const imgHeader = ref("/src/assets/images/Header/Hello.svg");
const imgProfile = ref("/src/assets/images/Header/guestava.png");

const props = defineProps({
  showMenuForUser: Boolean,
});

if (JSON.parse(localStorage.getItem("autorization"))) {
  AutorizatonStore.autorization = true;
}
if (JSON.parse(localStorage.getItem("user"))) {
  AutorizatonStore.user = JSON.parse(localStorage.getItem("user"));
  Hello.value[0] = AutorizatonStore.user.userName;
  Hello.value[1] = "18px";
  imgHeader.value = "/src/assets/images/Header/imgava.svg";
  imgProfile.value = "/src/assets/images/Header/imgava.svg";
}

watch(
  () => AutorizatonStore.autorization,
  () => {
    if (AutorizatonStore.autorization) {
      AutorizatonStore.user.userName = "Николас Кейдж";
      AutorizatonStore.user.userId = "nickolas";
      Hello.value[0] = AutorizatonStore.user.userName;
      imgHeader.value = "/src/assets/images/Header/imgava.svg";
      imgProfile.value = "/src/assets/images/Header/imgava.svg";
      localStorage.setItem(
        "autorization",
        JSON.stringify(AutorizatonStore.autorization)
      );
      localStorage.setItem("user", JSON.stringify(AutorizatonStore.user));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("autorization");
      AutorizatonStore.user.userName = "Гость";
      AutorizatonStore.user.userId = "guest";
      Hello.value[0] = "Привет друг!";
      imgHeader.value = "/src/assets/images/Header/Hello.svg";
      imgProfile.value = "/src/assets/images/Header/guestava.png";
    }
  }
);

watch(
  () => props.showMenuForUser,
  () => {
    if (props.showMenuForUser) {
      showMenuForProfile.value = false;
    }
  }
);

watch(Hello.value, () => {
  console.log(Hello.value[0]);
  if (Hello.value[0] === "Привет друг!") {
    Hello.value[1] = "22px";
  } else {
    Hello.value[1] = "18px";
  }
});
</script>

<!-- todo: [] я что-то потерял версию хедера с демо-режимом -->
<template>
  <div class="authorization" @pointerover="showMenuForProfile = true">
    <img alt="avatar" :src="imgHeader" />
    <div class="authorization__userName">{{ Hello[0] }}</div>
    <img
      alt="arrow"
      src="@/assets/images/Header/arrow-down.svg"
      width="16"
      height="10"
    />
    <div
      v-if="showMenuForProfile"
      @pointerleave="showMenuForProfile = false"
      class="drop-down-field"
    >
      <img
        alt="avatar"
        :src="imgProfile"
        width="48"
        height="48"
        class="drop-down-field__user-avatar"
      />
      <p class="drop-down-field__user-name">
        {{ AutorizatonStore.user.userName }}
      </p>
      <RouterLink
        v-if="AutorizatonStore.autorization"
        :to="{
          name: 'ProfilePage',
          params: { id: `${AutorizatonStore.user.userId}` },
        }"
        class="drop-down-field__get-profile-link"
        >Перейти в профиль</RouterLink
      >
      <RouterLink
        v-if="!AutorizatonStore.autorization"
        :to="{
          name: 'ProfilePage',
          params: { id: `${AutorizatonStore.user.userId}` },
        }"
        class="drop-down-field__get-profile-link"
        >Хочешь посмотреть свой будущий профиль?</RouterLink
      >
      <hr />
      <RouterLink
        v-if="AutorizatonStore.autorization"
        to="/"
        class="drop-down-field__exit-profile"
        @click="AutorizatonStore.autorization = !AutorizatonStore.autorization"
        >Выход</RouterLink
      >
      <div
        v-if="!AutorizatonStore.autorization"
        class="drop-down-field__signin-signup"
      >
        <RouterLink
          to="/"
          class="drop-down-field__signin-signup__signin"
          @click="
            AutorizatonStore.autorization = !AutorizatonStore.autorization
          "
          >Вход</RouterLink
        >
        <RouterLink to="/" class="drop-down-field__signin-signup__signup"
          >Регистрация</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.authorization {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.authorization__userName {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  margin: 0 8px;
  text-decoration: none;
  font-family: "Sofia Sans", sans-serif;
  text-decoration: none;
  font-style: normal;
  font-weight: 400;
  font-size: v-bind(Hello[1]);
  line-height: 22px;
}
.drop-down-field {
  position: absolute;
  top: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 200px;
  background-color: #ffffff;
  box-shadow: 0 0 10px #d9d9d9;
  border-radius: 16px;
}

.drop-down-field__user-avatar {
  margin: 20px 0;
}

.drop-down-field__user-name {
  margin: 0 8px;
  font-family: "Sofia Sans", sans-serif;
  text-decoration: none;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
}

.drop-down-field__get-profile-link {
  margin: 16px 4px 8px 4px;
  text-decoration: none;
  font-family: "Sofia Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #60b2ee;
}
.drop-down-field__get-profile-link:hover {
  color: #000;
}

hr {
  width: 180px;
  color: #d9d9d9;
}
.drop-down-field__exit-profile {
  margin: 4px 0;
  text-decoration: none;
  font-family: "Sofia Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #d9d9d9;
}
.drop-down-field__exit-profile:hover {
  color: #000;
}

.drop-down-field__signin-signup {
  margin: 10px;
}

.drop-down-field__signin-signup__signin,
.drop-down-field__signin-signup__signup {
  margin: 8px;
  text-decoration: none;
  font-family: "Sofia Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #d9d9d9;
}
.drop-down-field__signin-signup__signin:hover,
.drop-down-field__signin-signup__signup:hover {
  color: #000;
}
</style>
