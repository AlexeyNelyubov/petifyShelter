<script setup>
import { ref } from "vue";
const email = ref("");
const isCorrectEmail = ref(false);
const showPopup = ref(false);
const colorForBorder = ref("#000");

const emit = defineEmits(["change-email"]);

const checkInput = () => {
  if (email.value.length && /^\w+@\w{2,}\.\w{2,3}$/.test(email.value)) {
    colorForBorder.value = "#008000";
    isCorrectEmail.value = true;
    showPopup.value = false;
  } else {
    colorForBorder.value = "#ff0000";
    isCorrectEmail.value = false;
    showPopup.value = true;
  }
  emit("change-email", email.value, isCorrectEmail.value);
};
</script>

<template>
  <input
    type="text"
    v-model="email"
    placeholder="Email"
    class="email-input"
    @focus="checkInput"
    @input="checkInput"
    @blur="checkInput"
    required
  />
  <div v-if="showPopup" class="popup-email">example@example.com</div>
</template>

<style>
.email-input {
  height: 84px;
  width: 768px;
  margin-top: 24px;
  padding: 16px 16px 16px 24px;
  font-size: 18px;
  border: 1px solid v-bind(colorForBorder);
  outline: none;
}
.popup-email {
  position: absolute;
  top: 368px;
  right: 40px;
  height: 84px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  font-size: 18px;
  background-color: #60b2ee;
}
</style>
