<script setup>
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/userStore.js";

const userStore = useUserStore();

const showProfileDropDown = ref(false);
// const userName = ref(["Привет друг!", "22px"]);
// const userAvatarHeader = ref("/src/assets/images/Header/Hello.svg");
// const userAvatarDropDown = ref("/src/assets/images/Header/guestava.png");

const props = defineProps({
  hideProfileDropDown: {
    type: Boolean,
    required: false,
  },
});

watch(
  () => props.hideProfileDropDown,
  () => {
    if (props.hideProfileDropDown) {
      showProfileDropDown.value = false;
    }
  }
);

// if (localStorage.getItem("user")) {
//   userStore.authentificated = true;
//   userStore.user = JSON.parse(localStorage.getItem("user"));
//   // userName.value[0] = userStore.user.userName;
//   // userName.value[1] = "18px";
//   // userAvatarHeader.value = userStore.user.avatar;
//   // userAvatarDropDown.value = userStore.user.avatar;
// }

// watch(
//   () => userStore.authentificated,
//   () => {
//     if (userStore.authentificated) {
//       userName.value[0] = userStore.user.userName;
//       userName.value[1] = "18px";
//       // userAvatarHeader.value = userStore.user.avatar;
//       // userAvatarDropDown.value = userStore.user.avatar;
//     }
//   }
// );

// const logOut = () => {
//   // localStorage.removeItem("user");
//   // userStore.authentificated = false;
//   // userStore.user.userName = "Гость";
//   // userStore.user.userId = "guest";
//   // userStore.user.city = "Москва";
//   // userStore.user.avatar = "/src/assets/images/Header/guestava.png";
//   // userStore.logOut();
//   // userName.value[0] = "Привет друг!";
//   // userName.value[1] = "22px";
//   // userAvatarHeader.value = "/src/assets/images/Header/Hello.svg";
//   // userAvatarDropDown.value = userStore.user.avatar;
// };
</script>

<template>
  <div class="authentification" @pointerover="showProfileDropDown = true">
    <img
      v-if="userStore.authentificated"
      alt="avatar"
      :src="userStore.user.avatar"
    />
    <img v-else alt="avatar" src="/src/assets/images/Header/Hello.svg" />
    <div v-if="userStore.authentificated" class="authentification__userName">
      {{ userStore.user.userName }}
    </div>
    <div v-else class="authentification__userName" style="font-size: 22px">
      Привет, друг!
    </div>
    <img
      alt="arrow"
      src="@/assets/images/Header/arrow-down.svg"
      width="16"
      height="10"
    />
    <div
      v-if="showProfileDropDown"
      @pointerleave="showProfileDropDown = false"
      class="drop-down-field"
    >
      <img
        alt="avatar"
        :src="userStore.user.avatar"
        width="48"
        height="48"
        class="drop-down-field__user-avatar"
      />
      <p class="drop-down-field__user-name">
        {{ userStore.user.userName }}
      </p>
      <RouterLink
        v-if="userStore.authentificated"
        :to="{
          name: 'ProfilePage',
          params: { id: `${userStore.user.userId}` },
        }"
        class="drop-down-field__get-profile-link"
        >Перейти в профиль</RouterLink
      >
      <RouterLink
        v-if="!userStore.authentificated"
        :to="{
          name: 'ProfilePage',
          params: { id: `${userStore.user.userId}` },
        }"
        class="drop-down-field__get-profile-link"
        >Хочешь посмотреть свой будущий профиль?</RouterLink
      >
      <hr />
      <RouterLink
        v-if="userStore.authentificated"
        to="/"
        class="drop-down-field__exit-profile"
        @click="userStore.logOut()"
        >Выход</RouterLink
      >
      <div
        v-if="!userStore.authentificated"
        class="drop-down-field__signin-signup"
      >
        <RouterLink
          :to="{ name: 'SignInPage' }"
          class="drop-down-field__signin-signup__signin"
          >Вход</RouterLink
        >
        <RouterLink
          :to="{ name: 'SignUpPage' }"
          class="drop-down-field__signin-signup__signup"
          >Регистрация</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style>
.authentification {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.authentification__userName {
  height: 24px;
  margin: 0 8px;
  display: flex;
  align-items: center;
  font-family: "Sofia Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  text-decoration: none;
}
.drop-down-field {
  position: absolute;
  top: 64px;
  right: 20px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  text-decoration: none;
}
.drop-down-field__get-profile-link {
  margin: 16px 4px 8px 4px;
  font-family: "Sofia Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #60b2ee;
  text-decoration: none;
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
  font-family: "Sofia Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #d9d9d9;
  text-decoration: none;
}
.drop-down-field__signin-signup__signin:hover,
.drop-down-field__signin-signup__signup:hover {
  color: #000;
}
</style>
