<script setup>
import { ref, computed, watch } from "vue";
import { useDocumentKeyUp } from "/src/composable/useDocumentKeyUp.js";

const emit = defineEmits(["change-pet-breeds"]);

const breeds = ref([{ value: "", color: "#000" }]);
const showSecondInput = ref(false);
const numberOfBreeds = computed(() => {
  return showSecondInput.value ? [0, 1] : [0];
});

watch(showSecondInput, () => {
  breeds.value.push({ value: "", color: "#000" });
});

const checkNewPetsBreeds = () => {
  const validateBreed = [];

  for (let i in breeds.value) {
    if (
      /^[а-яА-ЯёЁ]{2,}$/.test(breeds.value[i].value) ||
      /^[а-яА-ЯёЁ]{2,}[ ][а-яА-ЯёЁ]{2,}$/.test(breeds.value[i].value) ||
      /^[а-яА-ЯёЁ]{2,}[\-][а-яА-ЯёЁ]{2,}$/.test(breeds.value[i].value)
    ) {
      validateBreed.push(breeds.value[i].value);
      breeds.value[i].color = "#000";
    } else {
      breeds.value[i].color = "#ff0000";
      return;
    }
  }
  if (validateBreed) {
    if (
      showSecondInput.value &&
      breeds.value[1].length &&
      validateBreed.length === 1
    ) {
      return;
    }
    console.log(validateBreed);
    emit("change-pet-breeds", "breeds", validateBreed);
  }
};
useDocumentKeyUp(checkNewPetsBreeds, "Enter");
</script>

<template>
  <main class="pet-breeds">
    <p class="pet-breeds__title">Укажите породу</p>
    <div v-for="index in numberOfBreeds" :key="index.id">
      <input
        type="text"
        v-model="breeds[index].value"
        placeholder="Порода"
        class="pet-breeds__input"
        :class="{
          'pet-breeds__input_bordercolor': breeds[index].color === '#ff0000',
        }"
        @input="breeds[index].color = '#000'"
      />
    </div>
    <div
      v-if="!showSecondInput"
      class="pet-breeds__show-second-input"
      @click="showSecondInput = true"
    >
      +
    </div>
    <p class="pet-breeds__enformation-sign">
      *Если вы затрудняетесь, то укажите беспородная. Если питомец - метис, то
      нажмите + и укажите две породы. Допускаются только заглавные и прописные
      буквы русского алфавита, а также пробел и дефис.
    </p>
  </main>
</template>

<style>
.pet-breeds {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pet-breeds__title {
  margin-bottom: 16px;
  font-size: 28px;
}

.pet-breeds__input {
  margin-bottom: 12px;
  height: 84px;
  width: 768px;
  padding: 16px 16px 16px 24px;
  font-size: 18px;
  outline: none;
}

.pet-breeds__input_bordercolor {
  border: 1px solid #ff0000;
}

.pet-breeds__show-second-input {
  position: absolute;
  top: 68px;
  right: 16px;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  color: #d9d9d9;
  border: 4px solid #d9d9d9;
  border-radius: 50%;
}

.pet-breeds__enformation-sign {
  width: 768px;
}
</style>
