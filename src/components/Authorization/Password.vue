<script setup>
import { ref } from "vue";
const password = ref("");
const correctPassword = ref(false);
const showPopup = ref(false);
const color = ref("#000");

const emit = defineEmits(["change-password"]);

const checkInput = () => {
  if (password.value.length && /^\S{8,64}$/.test(password.value)) {
    color.value = "#008000";
    correctPassword.value = true;
    showPopup.value = false;
  } else {
    color.value = "#ff0000";
    correctPassword.value = false;
    showPopup.value = true;
  }
  emit("change-password", password.value, correctPassword.value);
};
</script>

<template>
  <input
    type="password"
    v-model="password"
    placeholder="Password"
    class="password-input"
    @focus="checkInput"
    @input="checkInput"
    @blur="checkInput"
    required
  />
  <div v-if="showPopup" class="popup-password">Пароль должен состоять ...</div>
</template>

<style>
.password-input {
  height: 84px;
  width: 768px;
  margin-top: 24px;
  padding: 16px 16px 16px 24px;
  font-size: 18px;
  border: 1px solid v-bind(color);
  outline: none;
}

.popup-password {
  position: absolute;
  top: 584px;
  right: 20px;
  height: 84px;
  width: 200px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  font-size: 18px;
  background-color: #60b2ee;
}
</style>
