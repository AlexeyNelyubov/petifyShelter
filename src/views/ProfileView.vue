<script setup>
import MenuItem from "/src/components/Profile/MenuItem.vue";
import { useUserStore } from "/src/stores/userStore.js";
const userStore = useUserStore();
window.location.href =
  "http://localhost:5173/petifyShelter/pet/6436c6986a0e2c2906c0d7e4";
</script>
<template>
  <main>
    <div class="profile">
      <div class="profile__imgprofile">
        <img
          :src="userStore.user.avatar"
          alt="img-profile"
          width="100"
          height="100"
        />
      </div>
      <div class="profile-user">
        <p class="profile-user__username">
          {{ userStore.user.userName }}
        </p>
        <p class="profile-user__location">{{ userStore.user.city }}</p>
        <div class="profile__user-options">
          <MenuItem
            :item="'Закладки'"
            :dropDownSign="'Здесь хранятся карточки животных, которые были отмечены'"
            :starimg="true"
          />
          <MenuItem
            :item="'Поддержка'"
            :dropDownSign="'Здесь хранятся карточки животных или страницы питомников, которым вы осуществляете денежные переводы'"
          />
          <MenuItem
            :item="'Сообщения'"
            :dropDownSign="'Здесь вы можете общаться с другими пользователями'"
          />
          <MenuItem
            :item="'Создать'"
            :dropDownSign="'Здесь вы можете создать страницу питомника или карточку животного'"
            :pageNameForRoute="'CreateNewPetCardPage'"
          />
          <MenuItem
            :item="'Редактировать'"
            :dropDownSign="'Здесь вы можете изменить информацию в созданных вами карточках животных'"
          />
          <MenuItem
            :item="'Настройки'"
            :dropDownSign="'Здесь вы можете изменить некоторые параметры для более удобного использования приложения'"
          />
        </div>
      </div>
    </div>
    <div class="profile-information-sign">
      <p>На данный момент функционал профиля не в полной мере реализован.</p>
      <p>Поэтому некоторые возможности пока не доступны!</p>
    </div>
  </main>
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
.profile-information-sign {
  height: 75px;
  width: 900px;
  margin: 96px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
