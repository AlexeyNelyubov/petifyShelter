<script setup>
import { ref } from "vue";
const emit = defineEmits(["change-pet-gender"]);

const gender = ref("");
const changePetGender = () => {
  emit("change-pet-gender", "gender", gender.value);
};
</script>

<template>
  <main class="pet-gender">
    <p class="pet-gender__title">Выберите пол питомца</p>
    <div class="pet-gender__items">
      <label style="margin-right: 24px"
        >Мальчик
        <input
          type="radio"
          value="Мальчик"
          v-model="gender"
          @change="changePetGender"
      /></label>
      <label
        >Девочка
        <input
          type="radio"
          value="Девочка"
          v-model="gender"
          @change="changePetGender"
      /></label>
    </div>
  </main>
</template>

<style>
.pet-gender__title {
  margin-bottom: 16px;
  font-size: 28px;
}

.pet-gender__items {
  display: flex;
  justify-content: center;
  font-size: 24px;
}
</style>
