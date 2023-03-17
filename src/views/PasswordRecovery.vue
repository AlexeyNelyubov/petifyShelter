<script setup>
import { ref } from "vue";
import Email from "@/components/Authentification/Email.vue";
import SignUpInButton from "@/components/Authentification/SignUpInButton.vue";
import EnformationField from "@/components/Authentification/EnformationField.vue";

const email = ref("");
const isCorrectEmail = ref(false);

const recovery = () => {
  console.log("recovery");
  //   (async () => {
  //     try {
  //       let resoponse = await fetch(
  //         `${import.meta.env.VITE_SERVER_URL}/api/v1/signin/${email.value}.${
  //           password.value
  //         }`
  //       );
  //       let json = await resoponse.json();
  //       if (resoponse.ok) {
  //         AutorizatonStore.autorization = true;
  //         AutorizatonStore.user.userName = json.firstName + " " + json.lastName;
  //         AutorizatonStore.user.userId = json.firstName;
  //         AutorizatonStore.user.city = json.city;
  //         router.push({ name: "IndexPage" });
  //       } else {
  //         if (json === "Неверно указан email и пароль") {
  //           showValidationFromServer.value = json;
  //         } else {
  //           console.log(json);
  //           showError.value =
  //             "Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз";
  //         }
  //       }
  //     } catch (error) {
  //       console.error(error.message);
  //       showError.value =
  //         "Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз";
  //     }
  //   })();
};
</script>

<template>
  <main class="recovery">
    <div v-if="showError">{{ showError }}</div>
    <div v-if="!showError" class="recovery-field">
      <p class="recovery-sign">Восстановить пароль</p>
      <Email
        :eventType="'signin'"
        @change-email="
          (newEmail, isCorrectNewEmail) => {
            (email = newEmail), (isCorrectEmail = isCorrectNewEmail);
          }
        "
      />
      <div class="recovery-recoveryButton">
        <SignUpInButton
          :buttonName="'Восстановить'"
          :isCorrectNewUserInformation="isCorrectEmail"
          @signIn="signIn"
        />
      </div>
    </div>
  </main>
</template>

<style>
.recovery {
  margin: 84px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.recovery-field {
  height: auto;
  width: 768px;
}

.recovery-sign {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 30px;
}

.recovery-recoveryButton {
  margin-top: 40px;
  display: flex;
  justify-content: flex-start;
}
</style>
