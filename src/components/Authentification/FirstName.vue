<script setup>
import { ref } from "vue";
const firstName = ref("");
const isCorrectFirstName = ref(false);
const colorForBorder = ref("#000");

const emit = defineEmits(["change-firstName"]);

const checkInput = () => {
  if (firstName.value.length) {
    colorForBorder.value = "#008000";
    isCorrectFirstName.value = true;
  } else {
    colorForBorder.value = "#ff0000";
    isCorrectFirstName.value = false;
  }
  emit("change-firstName", firstName.value, isCorrectFirstName.value);
};
</script>

<template>
  <input
    type="text"
    v-model="firstName"
    placeholder="Имя"
    class="firstName-input"
    @focus="checkInput"
    @input="checkInput"
    @blur="checkInput"
    required
  />
</template>

<style>
.firstName-input {
  height: 84px;
  width: 372px;
  padding: 16px 16px 16px 24px;
  font-size: 18px;
  border: 1px solid v-bind(colorForBorder);
  outline: none;
}
</style>
