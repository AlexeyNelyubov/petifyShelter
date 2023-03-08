<script setup>
import { ref } from "vue";
import FirstName from "@/components/Authorization/FirstName.vue";
import LastName from "@/components/Authorization/LastName.vue";
import Email from "@/components/Authorization/Email.vue";
import City from "@/components/Authorization/City.vue";
import Password from "@/components/Authorization/Password.vue";
import AuthorizationBatton from "@/components/Authorization/AuthorizationBatton.vue";
import EnformationField from "@/components/Authorization/EnformationField.vue";

import { useAutorizatonStore } from "@/stores/autorization.js";
import { useRouter } from "vue-router";
const router = useRouter();

const AutorizatonStore = useAutorizatonStore();

const firstName = ref("");
const isCorrectFirstName = ref(false);
const lastName = ref("");
const isCorrectLastName = ref(false);
const email = ref("");
const isCorrectEmail = ref(false);
const city = ref("");
const password = ref("");
const isCorrectPassword = ref(false);
const showError = ref("");
const showSign = ref("");

const getAuthorization = () => {
  const user = JSON.stringify({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    city: city.value,
    password: password.value,
  });
  console.log("1");
  (async () => {
    try {
      let resoponse = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: user,
        }
      );
      let json = await resoponse.json();
      if (resoponse.ok) {
        console.log(json);
        AutorizatonStore.autorization = true;
        AutorizatonStore.user.userName = json.firstName + " " + json.lastName;
        AutorizatonStore.user.userId = json.firstName;
        AutorizatonStore.user.city = json.city;
        showSign.value = "Вам на email отправлено письмо для подтверждения.";
        // router.push({ name: "IndexPage" });
      } else {
        if (json === "Пользователь с таким email уже зарегистрирован") {
          showSign.value = json;
        } else {
          console.log(json);
          showError.value =
            "Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз";
        }
      }
    } catch (error) {
      console.error(error.message);
      showError.value =
        "Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз";
    }
  })();
};
</script>

<template>
  <main class="signUp">
    <div v-if="showError">{{ showError }}</div>
    <div v-if="!showError" class="signUp-field">
      <div class="signUp-sign-other-vaies">
        <p>Регистрация через</p>
        <img
          src="@/assets/images/SignInUp/imgapple.svg"
          alt="logo-apple"
          class="signUp__logo"
        />
        <img
          src="@/assets/images/SignInUp/imgfacebook.svg"
          alt="logo-facebook"
          class="signUp__logo"
        />
        <img
          src="@/assets/images/SignInUp/imggoogle.svg"
          alt="logo-google"
          class="signUp__logo"
        />
      </div>
      <div class="sigUp-firstName-lastName">
        <FirstName
          @change-firstName="
            (value, correctName) => {
              (firstName = value), (isCorrectFirstName = correctName);
            }
          "
        />
        <LastName
          @change-lastName="
            (value, correctName) => {
              (lastName = value), (isCorrectLastName = correctName);
            }
          "
        />
      </div>
      <Email
        @change-email="
          (value, correctMail) => {
            (email = value), (isCorrectEmail = correctMail);
          }
        "
      />
      <City @change-city="(value) => (city = value)" />
      <Password
        @change-password="
          (value, correctPassword) => {
            (password = value), (isCorrectPassword = correctPassword);
          }
        "
      />
      <div class="sigUp-authorizationBatton">
        <AuthorizationBatton
          :correctFirstName="isCorrectFirstName"
          :correctLastName="isCorrectLastName"
          :correctEmail="isCorrectEmail"
          :correctPassword="isCorrectPassword"
          @authorization="getAuthorization"
        />
        <EnformationField v-if="showSign" :showSign="showSign" />
      </div>
    </div>
  </main>
</template>

<style>
.signUp {
  margin: 84px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.signUp-field {
  height: auto;
  width: 768px;
}
.signUp-sign-other-vaies {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 30px;
}
.signUp__logo {
  height: 40px;
  width: 40px;
  margin-left: 20px;
}

.sigUp-firstName-lastName {
  margin-top: 40px;
  display: flex;
}
.sigUp-authorizationBatton {
  margin-top: 40px;
  display: flex;
  justify-content: flex-start;
}
</style>
