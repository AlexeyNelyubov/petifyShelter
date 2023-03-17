<script setup>
import { ref } from "vue";
const lastName = ref("");
const isCorrectLastName = ref(false);
const colorForBorder = ref("#000");

const emit = defineEmits(["change-lastName"]);

const checkInput = () => {
  if (lastName.value.length) {
    colorForBorder.value = "#008000";
    isCorrectLastName.value = true;
  } else {
    isCorrectLastName.value = false;
    colorForBorder.value = "#ff0000";
  }
  emit("change-lastName", lastName.value, isCorrectLastName.value);
};
</script>

<template>
  <input
    type="text"
    v-model="lastName"
    placeholder="Фамилия"
    class="lastName-input"
    @focus="checkInput"
    @input="checkInput"
    @blur="checkInput"
    required
  />
</template>

<style>
.lastName-input {
  height: 84px;
  width: 372px;
  margin-left: 24px;
  padding: 16px 16px 16px 24px;
  font-size: 18px;
  border: 1px solid v-bind(colorForBorder);
  outline: none;
}
</style>
