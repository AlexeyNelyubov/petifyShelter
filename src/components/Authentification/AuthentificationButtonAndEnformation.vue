<script setup>
import { RouterLink } from "vue-router";
import AuthentificationButton from "@/components/Authentification/AuthentificationButton.vue";
import EnformationField from "@/components/Authentification/EnformationField.vue";
const props = defineProps({
  buttonName: {
    type: String,
    required: true,
  },
  isCorrectNewUserInformation: {
    type: Boolean,
    required: true,
  },
  showValidationFromServer: {
    type: String,
    required: true,
  },
  successAuth: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["authentification"]);
</script>

<template>
  <div class="signIn__field-for-authentification-button">
    <AuthentificationButton
      :buttonName="props.buttonName"
      :isCorrectNewUserInformation="props.isCorrectNewUserInformation"
      @authentification="$emit('authentification')"
    />
    <RouterLink
      :to="{ name: 'PasswordRecoveryPage' }"
      v-if="!props.showValidationFromServer && props.buttonName === 'Войти'"
      class="signIn-recovery-password"
    >
      Забыли пароль?
    </RouterLink>
    <EnformationField
      v-if="props.showValidationFromServer"
      :showValidationFromServer="props.showValidationFromServer"
      :successAuth="props.successAuth"
    />
  </div>
</template>

<style>
.signIn__field-for-authentification-button {
  margin-top: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
