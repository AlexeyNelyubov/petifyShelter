<script setup>
// import { ref } from "vue";
import FilterSingle from "./FeedFilters/FilterSingle.vue";
import FilterType from "./FeedFilters/FilterType.vue";
import FilterGender from "./FeedFilters/FilterGender.vue";
import FilterBreed from "./FeedFilters/FilterBreed.vue";

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
// const itemForfilterBreedCat = [
//   "breed",
//   "Порода",
//   "Беспородная",
//   "Британская длинношёрстная",
//   "Сибирская",
//   "Американская короткошёрстная",
//   "Персидская",
//   "Турецкий ван",
// ];
// const itemForfilterBreedDog = [
//   "breed",
//   "Порода",
//   "Беспородная",
//   "Автралийский келпи",
//   "Австралийская овчарка",
//   "Бернский зенненхунд",
//   "Лабрадор",
//   "Ретривер",
//   "Хаски",
//   "Лайка",
// ];
// const itemForfilterBreedBird = [
//   "breed",
//   "Порода",
//   "Волнистый",
//   "Розелла",
//   "Корелла",
// ];

function changeFilterType(filterType, type) {
  let filterResult = [];
  for (let item in filterType) {
    // itemForfilterBreed.value.splice();
    // if (filterType[item] === "Кот") {
    //   showFilterBreed.value = true;
    //   // for (let i of itemForfilterBreedCat) {
    //   //   itemForfilterBreed.value.push(i);
    //   // }
    //   itemForfilterBreed.value = itemForfilterBreedCat.slice(0);
    //   console.log(itemForfilterBreed.value);
    // } else {
    //   if (filterType[item] === "Собака") {
    //     showFilterBreed.value = true;
    //     itemForfilterBreed.value = itemForfilterBreedDog.slice(0);
    //   } else {
    //     if (filterType[item] === "Птица") {
    //       showFilterBreed.value = true;
    //       itemForfilterBreed.value = itemForfilterBreedBird.slice(0);
    //     }
    //   }
    // }
    filterResult.push(filterType[item]);
  }
  emit("change-filter", filterResult, type);
}
</script>

<template>
  <div class="wrapper-filters">
    <div class="filters">
      <FilterSingle
        @change-filterType="changeFilterType"
        :itemForfilter="itemForfilterType"
      />
      <FilterSingle
        @change-filterType="changeFilterType"
        :itemForfilter="itemForfilterGender"
      />
      <FilterSingle
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
