<script setup>
import { ref } from "vue";
import MessageForShow from "/src/views/MessageForShow.vue";
import AuthentificationWithAppleFacebookGoogle from "/src/components/Authentification/AuthentificationWithAppleFacebookGoogle.vue";
import UserName from "/src/components/Authentification/UserName.vue";
import Email from "/src/components/Authentification/Email.vue";
import City from "/src/components/Authentification/City.vue";
import Password from "/src/components/Authentification/Password.vue";
import AuthentificationButtonAndEnformation from "/src/components/Authentification/AuthentificationButtonAndEnformation.vue";
import { useUserStore } from "/src/stores/userStore.js";

const userStore = useUserStore();

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
const showValidationFromServer = ref("");
const successAuth = ref(false);

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
        localStorage.setItem("token", json.token);
        userStore.logIn(json.user);
        successAuth.value = true;
        showValidationFromServer.value =
          "На указанный email отправлено письмо для подтверждения электронной почты";
      } else {
        if (json === "Пользователь с таким email уже существует") {
          showValidationFromServer.value = json;
          successAuth.value = false;
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
  <main>
    <MessageForShow v-if="showError" :message="showError" />
    <div class="signUp">
      <div v-if="!showError" class="signUp-field">
        <AuthentificationWithAppleFacebookGoogle
          :typeAuth="'Регистрация через'"
        />
        <div class="sigUp-firstName-lastName">
          <UserName
            :placeholder="'Имя'"
            @change-userName="
              (newName, isCorrectNewName) => {
                (firstName = newName), (isCorrectFirstName = isCorrectNewName);
              }
            "
          />
          <UserName
            :placeholder="'Фамилия'"
            @change-userName="
              (newName, isCorrectNewName) => {
                (lastName = newName), (isCorrectLastName = isCorrectNewName);
              }
            "
          />
        </div>
        <Email
          @change-email="
            (newEmail, isCorrectNewEmail) => {
              (email = newEmail),
                (isCorrectEmail = isCorrectNewEmail),
                (showValidationFromServer = '');
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
        <AuthentificationButtonAndEnformation
          :buttonName="'Зарегистрироваться'"
          :isCorrectNewUserInformation="
            isCorrectFirstName &&
            isCorrectLastName &&
            isCorrectEmail &&
            isCorrectPassword
          "
          :showValidationFromServer="showValidationFromServer"
          :successAuth="successAuth"
          @authentification="signUp"
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

.sigUp-firstName-lastName {
  margin-top: 24px;
  display: flex;
}
</style>
