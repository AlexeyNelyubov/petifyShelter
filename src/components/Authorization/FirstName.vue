<script setup>
import { ref } from "vue";
const firstName = ref("");
const correctFirstName = ref(false);
const color = ref("#000");

const emit = defineEmits(["change-firstName"]);

const checkInput = () => {
  if (firstName.value.length) {
    color.value = "#008000";
    correctFirstName.value = true;
  } else {
    color.value = "#ff0000";
    correctFirstName.value = false;
  }
  emit("change-firstName", firstName.value, correctFirstName.value);
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
  border: 1px solid v-bind(color);
  outline: none;
}
</style>
