<script setup>
import { ref, watch } from "vue";
import { useFiltersStore } from "@/stores/filters.js";
const FiltersStore = useFiltersStore();

const showFilter = ref(false);
const cat = ref();
const dog = ref();
const bird = ref();

watch(cat, () => {
  if (cat.value) {
    FiltersStore.filters.type.push("Кот");
  } else {
    FiltersStore.filters.type.splice(
      FiltersStore.filters.type.indexOf("Кот"),
      1
    );
  }
});

watch(dog, () => {
  if (dog.value) {
    FiltersStore.filters.type.push("Собака");
  } else {
    FiltersStore.filters.type.splice(
      FiltersStore.filters.type.indexOf("Собака"),
      1
    );
  }
});
watch(bird, () => {
  if (bird.value) {
    FiltersStore.filters.type.push("Птица");
  } else {
    FiltersStore.filters.type.splice(
      FiltersStore.filters.type.indexOf("Птица"),
      1
    );
  }
});
</script>

<template>
  <div class="filter-type">
    <p class="filter-header">Тип животного</p>
    <div class="down-part" @click="showFilter = !showFilter">
      <p>Все</p>
      <img src="@/assets/imgarrowdown.svg" width="14" height="8" alt="arrow" />
    </div>
    <div v-if="showFilter" class="filter">
      <label> <input type="checkbox" v-model="cat" /> Кот </label>
      <label> <input type="checkbox" v-model="dog" /> Собака </label>
      <label> <input type="checkbox" v-model="bird" /> Птица </label>
    </div>
  </div>
</template>

<style scoped>
.filter-type {
  height: 60px;
  width: 132px;
  padding: 10px;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  background-color: rgba(217, 217, 217, 0.41);
  border-radius: 8px;
}

.filter-header {
  margin-bottom: 8px;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #939393;
}
.down-part {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.filter {
  position: absolute;
  top: 84px;
  left: 56px;
  width: 132px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
}
label {
  margin-top: 8px;
}
</style>
