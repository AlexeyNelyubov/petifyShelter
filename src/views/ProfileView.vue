<script setup>
import { useAutorizatonStore } from "@/stores/autorization.js";
const AutorizatonStore = useAutorizatonStore();
</script>
<template>
  <div class="profile">
    <div class="profile__imgprofile">
      <img
        src="@/assets/images/Header/imgava.svg"
        alt="img-profile"
        width="80"
        height="80"
      />
    </div>
    <div class="profile-user">
      <p class="profile-user__username">
        {{ AutorizatonStore.user.userName }}
      </p>
      <p class="profile-user__location">Москва</p>
      <div class="profile__user-options">
        <p class="profile__user-options-item">Посты</p>
        <p class="profile__user-options-item">Поддержка</p>
        <p class="profile__user-options-item">Закладки</p>
        <p class="profile__user-options-item">Сообщения</p>
        <p class="profile__user-options-item">Профиль</p>
        <p class="profile__user-options-item">Настройки</p>
      </div>
    </div>
  </div>
</template>

<style>
.profile {
  padding: 24px 72px;
  display: flex;
}
.profile__imgprofile {
  height: 300px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #c4c4c4;
}
.profile-user {
  margin-left: 24px;
}
.profile-user__username {
  font-family: "Sofia Sans", sans-serif;
  font-weight: bold;
  font-size: 30px;
}
.profile-user__location {
  font-size: 16px;
}
.profile__user-options {
  margin-top: 12px;
  font-family: "Sofia Sans", sans-serif;
  font-weight: 400;
  font-size: 24px;
}
.profile__user-options-item {
  margin-top: 8px;
}
.profile__user-options-item:hover {
  color: #9d9d9d;
  cursor: pointer;
}
</style>
