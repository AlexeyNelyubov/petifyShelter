<script setup>
import { ref } from "vue";
import router from "../../router";
import FilterSingle from "./FeedFilters/FilterSingle.vue";
import FilterPagination from "./FeedFilters/FilterPagination.vue";

const props = defineProps({
  FiltersFromLocalStorage: {
    type: Object,
    required: false,
  },
  PaginationFromLocalStorage: String,
  PetsListForShow: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["change-filter", "pagination"]);

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

function changeSingleFilter(filterType, type) {
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

function pagination(numberOfCards) {
  emit("pagination", numberOfCards);
}

function getRandomPet() {
  let randomPet =
    props.PetsListForShow[
      Math.floor(Math.random() * props.PetsListForShow.length)
    ];
  router.push({ name: "PetPage", params: { id: `${randomPet.id}` } });
}
</script>

<template>
  <div class="filters">
    <div class="filters__filters">
      <FilterSingle
        @change-single-filter="changeSingleFilter"
        :itemForFilter="itemForfilterType"
        :FiltersFromLocalStorage="props.FiltersFromLocalStorage"
        :clearAllFilters="clearAllFilters"
      />
      <FilterSingle
        @change-single-filter="changeSingleFilter"
        :itemForFilter="itemForfilterGender"
        :FiltersFromLocalStorage="props.FiltersFromLocalStorage"
        :clearAllFilters="clearAllFilters"
      />
      <FilterSingle
        @change-single-filter="changeSingleFilter"
        :itemForFilter="itemForfilterBreed"
        :ArrTypeFilter="ArrTypeFilter"
        :FiltersFromLocalStorage="props.FiltersFromLocalStorage"
        :clearAllFilters="clearAllFilters"
      />
      <button
        class="filters__btn-clear-all-filters"
        @click="clearAllFilters = true"
      >
        Сбросить фильтры
      </button>
    </div>
    <div class="filters__lucky-pagination">
      <button class="filters__btn-lucky" @click="getRandomPet">
        Мне повезёт
      </button>
      <FilterPagination
        class="filters__pagination"
        @pagination="pagination"
        :PaginationFromLocalStorage="props.PaginationFromLocalStorage"
      />
    </div>
  </div>
</template>

<style scoped>
.filters {
  padding: 24px 72px 24px 56px;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  background-color: #fff;
}

.filters__filters {
  display: flex;
}

.filters__btn-clear-all-filters {
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

.filters__btn-clear-all-filters:hover {
  color: #000;
}

.filters__lucky-pagination {
  display: flex;
}
.filters__btn-lucky {
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
  cursor: pointer;
}
.filters__btn-lucky:hover {
  background-color: #915dff;
}
</style>
