<script setup>
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";
const showMenuForProfile = ref(true);

const props = defineProps({
  showMenuForUser: Boolean,
});

const emit = defineEmits(["change-authorization"]);

watch(
  () => props.showMenuForUser,
  () => {
    if (props.showMenuForUser) {
      showMenuForProfile.value = false;
    }
  }
);
</script>

<template>
  <div class="user" @pointerover="showMenuForProfile = true">
    <img
      alt="avatar"
      src="src/assets/header/imgava.svg"
      width="24"
      height="24"
    />
    <div class="userName">Николас Кейдж</div>
    <img
      alt="arrow"
      src="@/assets/header/imgarrowforuser.svg"
      width="14"
      height="8"
    />
    <div
      v-if="showMenuForProfile"
      @pointerleave="showMenuForProfile = false"
      class="authorizationField"
    >
      <img
        alt="avatar"
        src="src/assets/header/imgava.svg"
        width="48"
        height="48"
        class="user-avatar"
      />
      <div class="userNameInDroppDown">Николас Кейдж</div>
      <RouterLink to="/" class="getProfile" @click="showMenuForProfile = false"
        >Перейти в профиль</RouterLink
      >
      <hr />
      <RouterLink to="/" class="exit" @click="emit('change-authorization')"
        >Выйти</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.user {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.userName {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 148px;
  height: 24px;
  margin-right: 8px;
  margin-left: 4px;
  text-decoration: none;
  font-family: "Epilogue";
  text-decoration: none;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
}
.authorizationField {
  position: absolute;
  top: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 224px;
  background-color: #ffffff;
  box-shadow: 0 0 10px #d9d9d9;
  border-radius: 16px;
}

.user-avatar {
  margin: 16px 0;
}

.userNameInDroppDown {
  margin-right: 8px;
  margin-left: 4px;
  font-family: "Epilogue";
  text-decoration: none;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
}

.getProfile {
  margin: 16px 0 8px 0;
  text-decoration: none;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #60b2ee;
}
.getProfile:hover {
  color: #000;
}

hr {
  width: 192px;
  color: #d9d9d9;
}
.exit {
  margin: 4px 0;
  text-decoration: none;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #d9d9d9;
}
.exit:hover {
  color: #000;
}
</style>
