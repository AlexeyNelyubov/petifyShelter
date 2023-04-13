<script setup>
import { ref, watch } from "vue";
import { useFiltersStore } from "/src/stores/filters.js";
import { useDocumentClick } from "/src/composable/useDocumentClick.js";
const FiltersStore = useFiltersStore();

const props = defineProps({
  itemForFilter: Object,
  ArrTypeFilter: { type: Array, required: false },
  FiltersFromLocalStorage: {
    type: Object,
    required: false,
  },
  clearAllFilters: Boolean,
});

const emit = defineEmits(["change-single-filter"]);

const filterItems = ref({});
let lenghtfilterItems = ref(0);
const Checkedfilters = ref([]);
const filterCounter = ref(0);
const BreedInput = ref("Введите породу");
let filters = [];

getFilterItems("general");

if (props.ArrTypeFilter) {
  watch(props.ArrTypeFilter, () => getFilterItemsForBreedDependsOfType());
}

watch(
  () => BreedInput.value,
  () => {
    getFilterItemsForBreedDependsOfType();
    if (BreedInput.value.length) {
      let filters = JSON.parse(JSON.stringify(filterItems.value));
      let arrIndex = [];
      for (let index in filters) {
        filterItems.value[index].splice(0);
        for (let item of filters[index]) {
          if (
            BreedInput.value.toUpperCase() ===
            item.substring(0, BreedInput.value.length).toUpperCase()
          ) {
            filterItems.value[index].push(item);
            if (!arrIndex.includes(index)) {
              arrIndex.push(index);
            }
          }
        }
      }
      for (let index in filterItems.value) {
        if (!arrIndex.includes(index)) {
          delete filterItems.value[index];
        }
      }
    }
  }
);

watch(Checkedfilters, () => {
  FiltersStore.filters[props.itemForFilter.general[0]].splice(0);
  filterCounter.value = 0;
  filters = [];
  for (let item of Checkedfilters.value) {
    filters.push(item);
    filterCounter.value++;
    FiltersStore.filters[props.itemForFilter.general[0]].push(item);
  }
  emit("change-single-filter", filters, props.itemForFilter.general[0]);
});

watch(
  () => props.clearAllFilters,
  () => {
    if (props.clearAllFilters) {
      filterCounter.value = 0;
      Checkedfilters.value.splice(0);
      FiltersStore.filters.type.splice(0);
      FiltersStore.filters.gender.splice(0);
      FiltersStore.filters.breeds.splice(0);
      emit(
        "change-single-filter",
        Checkedfilters.value,
        props.itemForFilter.general[0]
      );
    }
  }
);

if (props.FiltersFromLocalStorage) {
  watch(props.FiltersFromLocalStorage, () => {
    for (let index in props.FiltersFromLocalStorage) {
      if (props.FiltersFromLocalStorage[index].length) {
        if (index === props.itemForFilter.general[0]) {
          filters = [];
          for (let i of props.FiltersFromLocalStorage[index]) {
            filters.push(i);
          }
          Checkedfilters.value = filters;
        }
      }
    }
  });
}

getCheckedfiltersWithRouting();

const showFilter = ref(false);
const filterSign = ref("");

if (props.itemForFilter.general[0] === "breeds") {
  filterSign.value = "Не выбрана";
} else {
  filterSign.value = "Не выбран";
}

watch(filterCounter, () => {
  if (filterCounter.value === 0) {
    filterSign.value = "Не выбран";
    if (props.itemForFilter.general[0] === "breeds") {
      filterSign.value = "Не выбрана";
    }
  } else {
    if (filterCounter.value === lenghtfilterItems.value) {
      filterSign.value = "Все";
    } else {
      filterSign.value = "Выбрано" + " " + String(filterCounter.value);
    }
  }
});

function checkBreedInput() {
  if (BreedInput.value === "Введите породу") {
    BreedInput.value = "";
  }
}

function getCheckedfiltersWithRouting() {
  if (FiltersStore.filters[props.itemForFilter.general[0]].length) {
    for (let index in FiltersStore.filters) {
      if (index === props.itemForFilter.general[0]) {
        filters = [];
        for (let item of FiltersStore.filters[index]) {
          filters.push(item);
        }
        Checkedfilters.value = filters;
      }
    }
  }
}

function getFilterItems(compareItem) {
  filterItems.value = {};
  for (let index in props.itemForFilter) {
    let filterItem = [];
    if (index != compareItem) {
      for (let el of props.itemForFilter[index]) {
        filterItem.push(el);
        lenghtfilterItems.value++;
      }
      filterItems.value[index] = filterItem;
    }
  }
}

function getFilterItemsForBreedDependsOfType() {
  if (props.ArrTypeFilter.length) {
    filterItems.value = {};
    for (let item of props.ArrTypeFilter) {
      for (let index in props.itemForFilter) {
        let filterItem = [];
        if (item === index) {
          for (let el of props.itemForFilter[item]) {
            filterItem.push(el);
          }
          filterItems.value[index] = filterItem;
        }
      }
    }
  } else {
    getFilterItems("general");
  }
}

useDocumentClick(() => {
  showFilter.value = false;
});
</script>

<template>
  <div
    class="filter-type"
    :class="{
      'filter-type_border-all': filterSign === 'Все',
      'filter-type_border':
        filterSign != 'Все' &&
        filterSign != 'Не выбран' &&
        filterSign != 'Не выбрана' &&
        filterSign != '',
    }"
  >
    <p class="filter-type__header">{{ props.itemForFilter.general[1] }}</p>
    <div
      class="filter-type__field-for-count-filters"
      @click.stop="showFilter = !showFilter"
    >
      <p>{{ filterSign }}</p>
      <img
        src="/src/assets/images/Header/arrow-down.svg"
        width="14"
        height="8"
        alt="arrow"
      />
    </div>
    <div
      v-if="showFilter"
      :class="{
        'filter-type__drop-down': props.itemForFilter.general[0] != 'breeds',
        'filter-type__drop-down-breed':
          props.itemForFilter.general[0] === 'breeds',
      }"
      @click.stop=""
    >
      <input
        v-if="props.itemForFilter.general[0] === 'breeds'"
        type="text"
        v-model="BreedInput"
        @focus="checkBreedInput"
        class="filter-type__drop-down-breed__input"
      />
      <div v-for="(value, filterItem) in filterItems" :key="filterItem.id">
        <div
          v-if="props.itemForFilter.general[0] === 'breeds'"
          class="filter-type__drop-down-breed__breed"
        >
          {{ filterItem }}
        </div>
        <label
          v-for="filter in filterItems[filterItem]"
          :key="filter.id"
          class="filter-type__drop-down-label"
        >
          <input type="checkbox" :value="filter" v-model="Checkedfilters" />
          {{ filter }}
          <br />
        </label>
      </div>
    </div>
  </div>
</template>

<style>
.filter-type {
  height: 60px;
  width: 140px;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  background-color: #d9d9d969;
  border: 2px solid #d9d9d969;
  border-radius: 8px;
}

.filter-type_border-all {
  border: 2px solid #00ff00;
}

.filter-type_border {
  border: 2px solid #00aaff;
}

.filter-type__header {
  margin: 10px 10px 4px 10px;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #939393;
}
.filter-type__field-for-count-filters {
  margin: 4px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.filter-type__drop-down {
  position: absolute;
  top: 84px;
  width: 140px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
}

.filter-type__drop-down-breed {
  position: absolute;
  top: 84px;
  height: 300px;
  width: 260px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  overflow-y: scroll;
}

.filter-type__drop-down-label {
  line-height: 24px;
}

.filter-type__drop-down-label:hover {
  color: #939393;
}

.filter-type__drop-down-breed__breed {
  margin-top: 8px;
  font-size: 20px;
}

.filter-type__drop-down-breed__input {
  width: 235px;
  border: 1px solid #dadada;
  border-radius: 5px;
  outline: none;
}
</style>
