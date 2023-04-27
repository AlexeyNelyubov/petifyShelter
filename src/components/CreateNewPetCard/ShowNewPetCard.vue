<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  newPet: {
    type: Object,
    required: true,
  },
  changeSize: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["get-current-item"]);

const width = computed(() => {
  return props.changeSize ? "1000px" : "500px";
});
</script>

<template>
  <div class="new-pets-card-show">
    <div
      v-if="props.newPet.type"
      @click="$emit('get-current-item', 'type')"
      class="new-pets-card-show__item"
    >
      Вид : {{ props.newPet.type }}
    </div>
    <div
      v-if="props.newPet.gender"
      @click="$emit('get-current-item', 'gender')"
      class="new-pets-card-show__item"
    >
      Пол : {{ props.newPet.gender }}
    </div>
    <div
      v-if="props.newPet.name"
      @click="$emit('get-current-item', 'name')"
      class="new-pets-card-show__item"
    >
      Имя: {{ props.newPet.name }}
    </div>
    <!-- <div v-if="age">Возраст: {{ age }}</div> -->
    <div
      v-if="props.newPet.breeds"
      @click="$emit('get-current-item', 'breeds')"
      class="new-pets-card-show__item"
    >
      Порода: {{ props.newPet.breeds.join(", ") }}
    </div>
    <!--<div v-if="weight">Вес: {{ weight }}</div>
    <div v-if="height">Рост: {{ height }}</div>
    <div v-if="sterilized">Стерилизация: {{ sterilized }}</div>
    <div v-if="vaccinated">Вакцинация: {{ vaccinated }}</div>
    <div v-if="features">Особенности: {{ features }}</div>
    <div v-if="bio">Описание: {{ bio }}</div>
    <div v-if="location">Место нахождения: {{ location }}</div>-->
    <div
      v-if="props.newPet.avatar"
      @click="$emit('get-current-item', 'avatar')"
      class="new-pets-card-show__item"
    >
      Аватар карточки: ✔
    </div>
  </div>
  <!-- <div class="new-pets-card-show">
    <div
      @click="$emit('get-current-item', 'type')"
      class="new-pets-card-show__item"
    >
      Вид : {{ props.newPet.type }}
    </div>
    <div v-if="gender">Пол : {{ gender }}</div>
    <div
      @click="$emit('get-current-item', 'name')"
      class="new-pets-card-show__item"
    >
      Имя: {{ props.newPet.name }}
    </div>
    <div>Возраст: {{ age }}</div>
    <div>Порода: {{ breeds }}</div>
    <div>Вес: {{ weight }}</div>
    <div>Рост: {{ height }}</div>
    <div>Стерилизация: {{ sterilized }}</div>
    <div>Вакцинация: {{ vaccinated }}</div>
    <div>Особенности: {{ features }}</div>
    <div>Описание: {{ bio }}</div>
    <div>Место нахождения: {{ location }}</div>
    <div>Аватар карточки:</div>
  </div> -->
</template>

<style>
.new-pets-card-show {
  max-width: v-bind(width);
  margin: 76px 24px 12px 0;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 24px;
  border-radius: 12px;
  box-shadow: 0 0 15px #d9d9d9;
  font-family: "Sofia Sans", sans-serif;
}

.new-pets-card-show__item {
  color: #000;
  word-break: break-all;
}

.new-pets-card-show__item:hover {
  color: #9d9d9d;
  cursor: pointer;
}
</style>
