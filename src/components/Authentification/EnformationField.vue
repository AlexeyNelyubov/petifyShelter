<script setup>
import { computed } from "vue";

const props = defineProps({
  showValidationFromServer: {
    type: String,
    required: true,
  },
});

const errorFromBackSignIn1 = "Неверно указан email";
const errorFromBackSignIn2 = "Неверно указан пароль";
const errorFromBackSignUp = "Пользователь с таким email уже существует";

const colorForValidationFromServer = computed(() => {
  return props.showValidationFromServer === errorFromBackSignUp ||
    props.showValidationFromServer === errorFromBackSignIn1 ||
    props.showValidationFromServer === errorFromBackSignIn2
    ? "#ff0000"
    : "#00BC22";
});
</script>

<template>
  <div class="enformation-field">
    {{ props.showValidationFromServer }}
  </div>
</template>

<style>
.enformation-field {
  height: 84px;
  width: 510px;
  margin-left: 24px;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 400;
  color: #fff;
  background-color: v-bind(colorForValidationFromServer);
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
