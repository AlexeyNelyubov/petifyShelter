<script setup>
import FilterSingle2 from "./FeedFilters/FilterSingle2.vue";

const emit = defineEmits(["change-filter"]);

const itemForfilterType = ["type", "Вид животного", "Кот", "Собака", "Птица"];
const itemForfilterGender = ["gender", "Пол", "Мальчик", "Девочка"];
const itemForfilterBreed = [
  "breeds",
  "Порода",
  "Беспородная",
  "Британская длинношёрстная",
  "Сибирская",
  "Американская короткошёрстная",
  "Персидская",
  "Турецкий ван",
  "Беспородная",
  "Автралийский келпи",
  "Австралийская овчарка",
  "Бернский зенненхунд",
  "Лабрадор",
  "Ретривер",
  "Хаски",
  "Лайка",
  "Волнистый",
  "Розелла",
  "Корелла",
];

function changeFilterType(filterType, type) {
  let filterResult = [];
  for (let item in filterType) {
    filterResult.push(filterType[item]);
  }
  console.log(filterResult, type);
  emit("change-filter", filterResult, type);
}
</script>

<template>
  <div class="wrapper-filters">
    <div class="filters">
      <FilterSingle2
        @change-filterType="changeFilterType"
        :itemForfilter="itemForfilterType"
      />
      <FilterSingle2
        @change-filterType="changeFilterType"
        :itemForfilter="itemForfilterGender"
      />
      <FilterSingle2
        @change-filterType="changeFilterType"
        :itemForfilter="itemForfilterBreed"
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
