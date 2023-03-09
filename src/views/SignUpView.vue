<script setup>
import { ref } from "vue";
import FirstName from "@/components/Authorization/FirstName.vue";
import LastName from "@/components/Authorization/LastName.vue";
import Email from "@/components/Authorization/Email.vue";
import City from "@/components/Authorization/City.vue";
import Password from "@/components/Authorization/Password.vue";
import SignUpButton from "@/components/Authorization/SignUpButton.vue";
import EnformationField from "@/components/Authorization/EnformationField.vue";

import { useAutorizatonStore } from "@/stores/autorization.js";
// import { useRouter } from "vue-router";
// const router = useRouter();

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
const showSignUpInformation = ref("");

const signUp = () => {
  const user = JSON.stringify({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    city: city.value,
    password: password.value,
  });
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
        AutorizatonStore.autorization = true;
        AutorizatonStore.user.userName = json.firstName + " " + json.lastName;
        AutorizatonStore.user.userId = json.firstName;
        AutorizatonStore.user.city = json.city;
        showSignUpInformation.value =
          "Вам на email отправлено письмо для подтверждения электронной почты";
        // router.push({ name: "IndexPage" });
      } else {
        if (json === "Пользователь с таким email уже существует") {
          showSignUpInformation.value = json;
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
            (newName, isCorrectNewName) => {
              (firstName = newName), (isCorrectFirstName = isCorrectNewName);
            }
          "
        />
        <LastName
          @change-lastName="
            (newLastName, isCorrectNewLastName) => {
              (lastName = newLastName),
                (isCorrectLastName = isCorrectNewLastName);
            }
          "
        />
      </div>
      <Email
        @change-email="
          (newEmail, isCorrectNewEmail) => {
            (email = newEmail), (isCorrectEmail = isCorrectNewEmail);
          }
        "
      />
      <City @change-city="(newCity) => (city = newCity)" />
      <Password
        @change-password="
          (newPassword, isCorrectNewPassword) => {
            (password = newPassword),
              (isCorrectPassword = isCorrectNewPassword);
          }
        "
      />
      <div class="signUp-signUpButton">
        <SignUpButton
          :isCorrectNewUserInformation="
            isCorrectFirstName &&
            isCorrectLastName &&
            isCorrectEmail &&
            isCorrectPassword
          "
          @signUp="signUp"
        />
        <EnformationField
          v-if="showSignUpInformation"
          :showSignUpInformation="showSignUpInformation"
        />
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
.signUp-signUpButton {
  margin-top: 40px;
  display: flex;
  justify-content: flex-start;
}
</style>
