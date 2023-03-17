<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import Email from "@/components/Authentification/Email.vue";
import Password from "@/components/Authentification/Password.vue";
import SignUpInButton from "@/components/Authentification/SignUpInButton.vue";
import EnformationField from "@/components/Authentification/EnformationField.vue";
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
        `${import.meta.env.VITE_SERVER_URL}/api/v1/signin/`,
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
        // authentification(json);
        userStore.logIn(json);
        // localStorage.setItem("user", JSON.stringify(userStore.user));
        router.push({ name: "IndexPage" });
      } else {
        if (json === "Неверно указан email и пароль") {
          showValidationFromServer.value = json;
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
  <main class="signIn">
    <div v-if="showError">{{ showError }}</div>
    <div v-if="!showError" class="signIn-field">
      <div class="signIn-sign-other-vaies">
        <p>Войти через</p>
        <img
          src="@/assets/images/SignInUp/imgapple.svg"
          alt="logo-apple"
          class="signIn__logo"
        />
        <img
          src="@/assets/images/SignInUp/imgfacebook.svg"
          alt="logo-facebook"
          class="signIn__logo"
        />
        <img
          src="@/assets/images/SignInUp/imggoogle.svg"
          alt="logo-google"
          class="signIn__logo"
        />
      </div>
      <Email
        @change-email="
          (newEmail, isCorrectNewEmail) => {
            (email = newEmail), (isCorrectEmail = isCorrectNewEmail);
          }
        "
      />
      <Password
        @change-password="
          (newPassword, isCorrectNewPassword) => {
            (password = newPassword),
              (isCorrectPassword = isCorrectNewPassword);
          }
        "
      />
      <div class="signIn-signInButton">
        <SignUpInButton
          :buttonName="'Войти'"
          :isCorrectNewUserInformation="isCorrectEmail && isCorrectPassword"
          @signIn="signIn"
        />
        <RouterLink
          :to="{ name: 'PasswordRecoveryPage' }"
          v-if="!showValidationFromServer"
          class="signIn-recovery-password"
        >
          Забыли пароль?
        </RouterLink>
        <EnformationField
          v-if="showValidationFromServer"
          :showValidationFromServer="showValidationFromServer"
        />
      </div>
    </div>
  </main>
</template>

<style>
.signIn {
  margin: 84px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.signIn-field {
  height: auto;
  width: 768px;
}

.signIn-sign-other-vaies {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 30px;
}

.signIn__logo {
  height: 40px;
  width: 40px;
  margin-left: 20px;
}

.signIn-signInButton {
  margin-top: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
