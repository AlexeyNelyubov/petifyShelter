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
  ArrTypeFilter.value.splice(0);
  if (type === "type") {
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
      />
      <FilterSingle
        @change-filterType="changeFilterType"
        :itemForFilter="itemForfilterGender"
        :FiltersFromLocalStorage="props.FiltersFromLocalStorage"
      />
      <FilterSingle
        @change-filterType="changeFilterType"
        :itemForFilter="itemForfilterBreed"
        :ArrTypeFilter="ArrTypeFilter"
        :FiltersFromLocalStorage="props.FiltersFromLocalStorage"
      />
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
