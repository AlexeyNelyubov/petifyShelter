<script setup>
import { ref, watch } from "vue";
import { useFiltersStore } from "@/stores/filters.js";
const FiltersStore = useFiltersStore();

const showFilter = ref(false);
const filterSign = ref("Не выбран");
const filterCounter = ref(0);
const male = ref();
const female = ref();

watch(male, () => {
  if (male.value) {
    FiltersStore.filters.gender.push("Мальчик");
    filterCounter.value++;
  } else {
    filterCounter.value--;
    FiltersStore.filters.gender.splice(
      FiltersStore.filters.gender.indexOf("Мальчик"),
      1
    );
  }
});

watch(female, () => {
  if (female.value) {
    FiltersStore.filters.gender.push("Девочка");
    filterCounter.value++;
  } else {
    filterCounter.value--;
    FiltersStore.filters.gender.splice(
      FiltersStore.filters.gender.indexOf("Девочка"),
      1
    );
  }
});
watch(filterCounter, () => {
  switch (filterCounter.value) {
    case 0:
      filterSign.value = "Не выбран";
      break;
    case 1:
      filterSign.value = "1";
      break;
    case 2:
      filterSign.value = "Все";
      break;
  }
});
</script>

<template>
  <div
    class="filter-type"
    :class="{
      'filter-type-border-all': filterCounter === 2,
      'filter-type-border': filterCounter === 1,
    }"
  >
    <p class="filter-header">Пол</p>
    <div class="down-part" @click="showFilter = !showFilter">
      <p>{{ filterSign }}</p>
      <img src="@/assets/imgarrowdown.svg" width="14" height="8" alt="arrow" />
    </div>
    <div v-if="showFilter" class="filter">
      <label class="filter-label">
        <input type="checkbox" v-model="male" /> Мальчик
      </label>
      <label class="filter-label">
        <input type="checkbox" v-model="female" /> Девочка
      </label>
    </div>
  </div>
</template>

<style scoped>
.filter-type {
  height: 60px;
  width: 132px;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  background-color: rgba(217, 217, 217, 0.41);
  border: 2px solid rgba(217, 217, 217, 0.41);
  border-radius: 8px;
}

.filter-type-border-all {
  border: 2px solid #00ff00;
}

.filter-type-border {
  border: 2px solid #00aaff;
}

.filter-header {
  margin: 10px 10px 4px 10px;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #939393;
}
.down-part {
  margin: 4px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.filter {
  position: absolute;
  top: 84px;
  /* left: 56px; */
  width: 132px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
}
.filter-label {
  margin-top: 8px;
}
</style>
