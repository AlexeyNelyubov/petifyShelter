<script setup>
import { ref } from "vue";
const emit = defineEmits(["change-pet-type"]);

const type = ref("");
const changePetType = () => {
  console.log(type.value);
  emit("change-pet-type", "type", type.value);
};
</script>

<template>
  <main class="pet-type">
    <p class="pet-type__title">Выберите вид животного</p>
    <div class="pet-type__items">
      <label style="margin-right: 24px"
        >Кот
        <input type="radio" value="Кот" v-model="type" @change="changePetType"
      /></label>
      <label style="margin-right: 24px"
        >Собака
        <input
          type="radio"
          value="Собака"
          v-model="type"
          @change="changePetType"
      /></label>
      <label
        >Птица
        <input
          type="radio"
          value="Птица"
          v-model="type"
          @change="changePetType"
      /></label>
    </div>
  </main>
</template>

<style>
.pet-type__title {
  margin-bottom: 16px;
  font-size: 28px;
}

.pet-type__items {
  display: flex;
  justify-content: center;
  font-size: 24px;
}
</style>
