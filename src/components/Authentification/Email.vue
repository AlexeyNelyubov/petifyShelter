<script setup>
import { ref } from "vue";

const emit = defineEmits(["change-email"]);

const email = ref("");
const isCorrectEmail = ref(false);
const showPopup = ref(false);
const colorForBorder = ref("#000");

const checkInput = () => {
  if (email.value.length && /^\S+@\w{2,}\.\w{2,3}$/.test(email.value)) {
    // if (email.value.length) {
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
  <div class="email">
    <input
      type="text"
      v-model="email"
      placeholder="Email"
      class="email-input"
      @input="checkInput"
      @blur="checkInput"
      required
    />
    <div v-if="showPopup" class="popup-email">
      Email должен соответствовать шаблону example@example.com
    </div>
  </div>
</template>

<style>
.email {
  position: relative;
  margin-top: 24px;
}
.email-input {
  height: 84px;
  width: 768px;
  padding: 16px 16px 16px 24px;
  font-size: 18px;
  border: 1px solid v-bind(colorForBorder);
  outline: none;
}
.popup-email {
  position: absolute;
  top: 0;
  left: 788px;
  height: 84px;
  width: 250px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  font-size: 18px;
  color: #fff;
  text-align: center;
  background-color: #60b2ee;
  border-radius: 8px;
}
</style>
