<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  itemForFilter: Object,
  ArrTypeFilter: { type: Array, required: false },
  FiltersFromLocalStorage: {
    type: Object,
    required: false,
  },
});

const emit = defineEmits(["change-filterType"]);

const filterTypeItems = ref([]);
let filters = [];
const filterCounter = ref(0);

if (props.FiltersFromLocalStorage) {
  watch(props.FiltersFromLocalStorage, () => {
    for (let index in props.FiltersFromLocalStorage) {
      if (props.FiltersFromLocalStorage[index].length) {
        if (index === props.itemForFilter.general[0]) {
          filters = [];
          for (let i of props.FiltersFromLocalStorage[index]) {
            filters.push(i);
          }
          filterTypeItems.value = filters;
        }
      }
    }
  });
}

watch(filterTypeItems, () => {
  filterCounter.value = 0;
  filters = [];
  for (let i of filterTypeItems.value) {
    filters.push(i);
    filterCounter.value++;
  }
  emit("change-filterType", filters, props.itemForFilter.general[0]);
});

const filterItems = ref({});
let lenghtfilterItems = ref(0);

function getfilterItems(compareItem) {
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

getfilterItems("general");

if (props.ArrTypeFilter) {
  watch(props.ArrTypeFilter, () => {
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
      getfilterItems("general");
    }
  });
}

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
</script>

<template>
  <div
    class="filter-type"
    :class="{
      'filter-type-border-all': filterSign === 'Все',
      'filter-type-border':
        filterSign != 'Все' &&
        filterSign != 'Не выбран' &&
        filterSign != 'Не выбрана' &&
        filterSign != '',
    }"
  >
    <p class="filter-header">{{ props.itemForFilter.general[1] }}</p>
    <div class="down-part" @click="showFilter = !showFilter">
      <p>{{ filterSign }}</p>
      <img
        src="@/assets/images/Header/arrow-down.svg"
        width="14"
        height="8"
        alt="arrow"
      />
    </div>
    <div
      v-if="showFilter"
      :class="{
        filter: props.itemForFilter.general[0] != 'breeds',
        'filter-breed': props.itemForFilter.general[0] === 'breeds',
      }"
    >
      <div v-for="(value, filterItem) in filterItems" :key="filterItem.id">
        <div v-if="props.itemForFilter.general[0] === 'breeds'" class="breed">
          {{ filterItem }}
        </div>
        <label
          v-for="filter in filterItems[filterItem]"
          :key="filter.id"
          class="filter-label"
        >
          <input type="checkbox" :value="filter" v-model="filterTypeItems" />
          {{ filter }}
          <br />
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-type {
  height: 60px;
  width: 140px;
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
  width: 140px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
}

.filter-breed {
  position: absolute;
  top: 84px;
  /* width: 140px; */
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
}
.filter-label {
  line-height: 24px;
}

.filter-label:hover {
  color: #939393;
}

.breed {
  margin-top: 8px;
  /* font-family: "Epilogue";
  font-style: normal;
  font-weight: 400; */
  font-size: 20px;
}
</style>
