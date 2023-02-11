<script setup>
import { RouterLink } from "vue-router";

const emit = defineEmits(["change-authorization"]);
</script>
<template>
  <div>
    <RouterLink to="/" class="signin" @click="emit('change-authorization')"
      >Вход</RouterLink
    >
    <RouterLink to="/" class="signup">Регистрация</RouterLink>
  </div>
</template>

<style scoped>
.signin {
  box-sizing: border-box;
  margin-right: 4px;
  padding: 7px 24px;
  text-decoration: none;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
  background-color: #60b2ee;
  border-radius: 16px;
}

.signin:hover {
  color: #fff;
  background-color: #d9d9d9;
}
.signup {
  height: 32px;
  padding: 7px 24px;
  text-decoration: none;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
  background-color: #60b2ee;
  border-radius: 16px;
}
.signup:hover {
  color: #fff;
  background-color: #d9d9d9;
}
</style>
