<script setup>
import { ref } from "vue";
const city = ref("");
const colorForBorder = ref("#000");

const emit = defineEmits(["change-city"]);

const checkInput = () => {
  if (city.value.length) {
    colorForBorder.value = "#008000";
  } else {
    colorForBorder.value = "#000";
  }
  emit("change-city", city.value);
};
</script>

<template>
  <input
    type="text"
    v-model="city"
    placeholder="Город"
    class="city-input"
    @focus="checkInput"
    @input="checkInput"
    @blur="checkInput"
  />
</template>

<style>
.city-input {
  height: 84px;
  width: 768px;
  margin-top: 24px;
  padding: 16px 16px 16px 24px;
  font-size: 18px;
  border: 1px solid v-bind(colorForBorder);
  outline: none;
}
</style>
