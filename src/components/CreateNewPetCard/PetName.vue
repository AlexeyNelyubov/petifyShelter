<script setup>
import { ref } from "vue";
import { useDocumentKeyUp } from "/src/composable/useDocumentKeyUp.js";

const emit = defineEmits(["change-pet-name"]);

const name = ref("");
const colorForBorder = ref("#000");

const checkNewPetsName = () => {
  if (
    (name.value.length > 0 && /^[а-яА-ЯёЁ]{2,}$/.test(name.value)) ||
    /^[а-яА-ЯёЁ]{2,}[\-\ ][а-яА-ЯёЁ]{2,}$/.test(name.value)
  ) {
    emit("change-pet-name", "name", name.value);
    return;
  }
  colorForBorder.value = "#ff0000";
};
useDocumentKeyUp(checkNewPetsName, "Enter");
</script>

<template>
  <main class="pet-name">
    <p class="pet-name__title">Введите имя питомца</p>
    <input
      type="text"
      v-model="name"
      placeholder="Имя"
      class="pet-name__input"
      @input="colorForBorder = '#000'"
    />
    <p class="pet-name__enformation-sign">
      * В имени животного могут присутствовать только заглавные и прописные
      буквы русского алфавита, а также пробел и дефис.
    </p>
  </main>
</template>

<style>
.pet-name {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pet-name__title {
  margin-bottom: 16px;
  font-size: 28px;
}

.pet-name__input {
  height: 84px;
  width: 768px;
  padding: 16px 16px 16px 24px;
  font-size: 18px;
  border: 1px solid v-bind(colorForBorder);
  outline: none;
}

.pet-name__enformation-sign {
  margin-top: 12px;
  width: 768px;
}
</style>
