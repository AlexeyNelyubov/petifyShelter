<script setup>
import { ref } from "vue";
import MessageForShow from "@/views/MessageForShow.vue";
import AuthentificationWithAppleFacebookGoogle from "@/components/Authentification/AuthentificationWithAppleFacebookGoogle.vue";
import Email from "@/components/Authentification/Email.vue";
import Password from "@/components/Authentification/Password.vue";
import AuthentificationButtonAndEnformation from "@/components/Authentification/AuthentificationButtonAndEnformation.vue";
import { useUserStore } from "@/stores/userStore.js";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const email = ref("");
const isCorrectEmail = ref(false);
const password = ref("");
const isCorrectPassword = ref(false);
const showError = ref("");
const showValidationFromServer = ref("");

const signIn = () => {
  (async () => {
    try {
      let resoponse = await fetch(
        // "/api/signin",
        `${import.meta.env.VITE_SERVER_URL}/api/v1/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        }
      );
      let json = await resoponse.json();
      if (resoponse.ok) {
        localStorage.setItem("token", json.token);
        userStore.logIn(json.user);
        router.push({ name: "IndexPage" });
        // document.cookie = `token=${json.cookie}`;
      } else {
        if (
          json === "Неверно указан email" ||
          json === "Неверно указан пароль"
        ) {
          showValidationFromServer.value = json;
        } else {
          console.log(json);
          showError.value =
            "Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз.";
        }
      }
    } catch (error) {
      console.error(error.message);
      showError.value =
        "Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз.";
    }
  })();
};
</script>

<template>
  <main>
    <MessageForShow v-if="showError" :message="showError" />
    <div class="signIn">
      <div v-if="!showError" class="signIn-field">
        <AuthentificationWithAppleFacebookGoogle :typeAuth="'Войти через'" />
        <Email
          @change-email="
            (newEmail, isCorrectNewEmail) => {
              (email = newEmail),
                (isCorrectEmail = isCorrectNewEmail),
                (showValidationFromServer = '');
            }
          "
        />
        <Password
          @change-password="
            (newPassword, isCorrectNewPassword) => {
              (password = newPassword),
                (isCorrectPassword = isCorrectNewPassword),
                (showValidationFromServer = '');
            }
          "
        />
        <AuthentificationButtonAndEnformation
          :buttonName="'Войти'"
          :isCorrectNewUserInformation="isCorrectEmail && isCorrectPassword"
          :showValidationFromServer="showValidationFromServer"
          :successAuth="false"
          @authentification="signIn"
        />
      </div>
    </div>
  </main>
</template>

<style>
.signIn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.signIn-field {
  height: auto;
  width: 768px;
  margin: 84px 0px;
}

.signIn-recovery-password {
  margin-left: 56px;
  font-size: 18px;
  color: #000;
  text-decoration: none;
}

.signin-recovery-password:visited {
  text-decoration: none;
  color: #000;
}
</style>
