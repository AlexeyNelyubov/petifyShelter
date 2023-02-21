<script setup>
import { ref, watch } from "vue";
import FilterSingle from "./FeedFilters/FilterSingle.vue";

const props = defineProps({
  FiltersFromLocalStorage: {
    type: Object,
    required: false,
  },
});

const emit = defineEmits(["change-filter"]);

const clearAllFilters = ref(false);

const itemForfilterType = {
  general: ["type", "Вид животного"],
  filters: ["Кот", "Собака", "Птица"],
};
const itemForfilterGender = {
  general: ["gender", "Пол"],
  filters: ["Мальчик", "Девочка"],
};

const itemForfilterBreed = {
  general: ["breeds", "Порода"],
  Коты: [
    "Беспородная",
    "Британская длинношёрстная",
    "Сибирская",
    "Американская короткошёрстная",
    "Персидская",
    "Турецкий ван",
  ],
  Собаки: [
    "Беспородная",
    "Автралийский келпи",
    "Австралийская овчарка",
    "Бернский зенненхунд",
    "Лабрадор",
    "Ретривер",
    "Хаски",
    "Лайка",
  ],
  Птицы: ["Волнистый", "Розелла", "Корелла"],
};

const ArrTypeFilter = ref([]);

function changeFilterType(filterType, type) {
  clearAllFilters.value = false;
  if (type === "type") {
    ArrTypeFilter.value.splice(0);
    for (let el of filterType) {
      switch (el) {
        case "Кот":
          ArrTypeFilter.value.push("Коты");
          break;
        case "Собака":
          ArrTypeFilter.value.push("Собаки");
          break;
        case "Птица":
          ArrTypeFilter.value.push("Птицы");
          break;
      }
    }
  }
  emit("change-filter", filterType, type);
}
</script>

<template>
  <div class="wrapper-filters">
    <div class="filters">
      <FilterSingle
        @change-filterType="changeFilterType"
        :itemForFilter="itemForfilterType"
        :FiltersFromLocalStorage="props.FiltersFromLocalStorage"
        :clearAllFilters="clearAllFilters"
      />
      <FilterSingle
        @change-filterType="changeFilterType"
        :itemForFilter="itemForfilterGender"
        :FiltersFromLocalStorage="props.FiltersFromLocalStorage"
        :clearAllFilters="clearAllFilters"
      />
      <FilterSingle
        @change-filterType="changeFilterType"
        :itemForFilter="itemForfilterBreed"
        :ArrTypeFilter="ArrTypeFilter"
        :FiltersFromLocalStorage="props.FiltersFromLocalStorage"
        :clearAllFilters="clearAllFilters"
      />
      <button class="btn-clear-all-filters" @click="clearAllFilters = true">
        Сбросить фильтры
      </button>
    </div>
    <button class="lucky">Мне повезёт</button>
  </div>
</template>

<style scoped>
.wrapper-filters {
  padding: 24px 72px 24px 56px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-top: 2px solid #d9d9d9;
}

.filters {
  display: flex;
}

.btn-clear-all-filters {
  width: 50px;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #939393;
  border: none;
  background-color: #fff;
  cursor: pointer;
}

.btn-clear-all-filters:hover {
  color: #000;
}
.lucky {
  margin-top: 14px;
  height: 32px;
  padding: 0 8px 0 8px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #fff;
  background-color: #bb9bff;
  border-radius: 10px;
  border: none;
}
</style>
