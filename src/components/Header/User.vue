<script setup>
import { ref, watch, computed } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/userStore.js";
import MessageForShow from "@/views/MessageForShow.vue";

const userStore = useUserStore();

const showProfileDropDown = ref(false);

const props = defineProps({
  hideProfileDropDown: {
    type: Boolean,
    required: false,
  },
});

const showError = ref("");

const userName = computed(() => {
  return userStore.authentificated ? userStore.user.userName : "Привет, друг!";
});

const userAvatar = computed(() => {
  return userStore.authentificated
    ? userStore.user.avatar
    : "/src/assets/images/Header/Hello.svg";
});

watch(
  () => props.hideProfileDropDown,
  () => {
    if (props.hideProfileDropDown) {
      showProfileDropDown.value = false;
    }
  }
);

const logOut = () => {
  localStorage.removeItem("token");
  // document.cookie = "token=; expires=-1";
  userStore.logOut();
  // (async () => {
  //   try {
  //     const resoponse = await fetch(
  //       `${import.meta.env.VITE_SERVER_URL}/api/v1/logout/`
  //     );
  //     let json = await resoponse.json();
  //     console.log(json);
  //     if (resoponse.ok) {
  //       localStorage.removeItem("token");
  //       userStore.logOut();
  //     } else {
  //       console.error(error.message);
  //       showError.value =
  //         "Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз.";
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //     showError.value =
  //       "Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз.";
  //     // router.push({
  //     //   name: "MessageForShowPage2",
  //     //   props: { message: `${showError.value}` },
  //     // });
  //   }
  // })();
};
</script>

<template>
  <MessageForShow v-if="showError" :message="showError" />
  <div class="authentification" @pointerover="showProfileDropDown = true">
    <img alt="avatar" :src="userAvatar" />
    <p class="authentification__userName">
      {{ userName }}
    </p>
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
        @click="logOut()"
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
