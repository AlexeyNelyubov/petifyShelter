<script setup>
import { ref } from "vue";

const emit = defineEmits(["change-password"]);

const password = ref("");
const isCorrectPassword = ref(false);
const showPopup = ref(false);
const colorForBorder = ref("#000");

const checkInput = () => {
  if (password.value.length && /^\S{8,64}$/.test(password.value)) {
    colorForBorder.value = "#008000";
    isCorrectPassword.value = true;
    showPopup.value = false;
  } else {
    colorForBorder.value = "#ff0000";
    isCorrectPassword.value = false;
    showPopup.value = true;
  }
  emit("change-password", password.value, isCorrectPassword.value);
};
</script>

<template>
  <div class="password">
    <input
      type="password"
      v-model="password"
      placeholder="Password"
      class="password-input"
      @focus="checkInput"
      @input="checkInput"
      @blur="checkInput"
      required
      autocomplete="off"
    />
    <div v-if="showPopup" class="popup-password">
      Пароль должен состоять ...
    </div>
  </div>
</template>

<style>
.password {
  position: relative;
  margin-top: 24px;
}
.password-input {
  height: 84px;
  width: 768px;
  padding: 16px 16px 16px 24px;
  font-size: 18px;
  border: 1px solid v-bind(colorForBorder);
  outline: none;
}

.popup-password {
  position: absolute;
  top: 0;
  left: 788px;
  height: 84px;
  min-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  font-size: 18px;
  background-color: #60b2ee;
}
</style>
