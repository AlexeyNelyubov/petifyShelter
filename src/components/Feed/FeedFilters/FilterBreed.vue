<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  itemForfilter: Array,
});

const emit = defineEmits(["change-filterType"]);

const filterItems = ref({});
for (let i = 2; i <= props.itemForfilter.length - 1; i++) {
  filterItems.value[props.itemForfilter[i]] = false;
}

const filterTypeItems = ref([]);
const showFilter = ref(false);
const filterSign = ref("Не выбран");
const filterCounter = ref(0);

watch(filterItems.value, () => {
  for (let item in filterItems.value) {
    // if (filterItems.value[item].length) {
    //   for (let element of filterItems.value[item]) {
    //     console.log(element);
    //   }
    // }
    if (filterItems.value[item]) {
      if (!filterTypeItems.value.includes(item)) {
        filterTypeItems.value.push(item);
        filterCounter.value++;
      }
    } else {
      for (let element of filterTypeItems.value) {
        if (element === item) {
          filterTypeItems.value.splice(
            filterTypeItems.value.indexOf(element),
            1
          );
          filterCounter.value--;
        }
      }
    }
  }
  emit("change-filterType", filterTypeItems.value, props.itemForfilter[0]);
});

watch(filterCounter, () => {
  if (filterCounter.value === 0) {
    filterSign.value = "Не выбран";
  } else {
    if (filterCounter.value === props.itemForfilter.length - 2) {
      filterSign.value = "Все";
    } else {
      filterSign.value = String(filterCounter.value);
    }
  }
});
</script>

<template>
  <div
    class="filter-type"
    :class="{
      'filter-type-border-all': filterSign === 'Все',
      'filter-type-border': filterSign != 'Все' && filterSign != 'Не выбран',
    }"
  >
    <p class="filter-header">{{ props.itemForfilter[1] }}</p>
    <div class="down-part" @click="showFilter = !showFilter">
      <p>{{ filterSign }}</p>
      <img src="@/assets/imgarrowdown.svg" width="14" height="8" alt="arrow" />
    </div>
    <div v-if="showFilter" class="filter">
      <label
        v-for="(value, filterItem) in filterItems"
        :key="filterItem.id"
        class="filter-label"
      >
        <input type="checkbox" v-model="filterItems[filterItem]" />
        {{ filterItem }}
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
