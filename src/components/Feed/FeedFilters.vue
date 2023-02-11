<script setup>
import FilterType from "./FeedFilters/FilterType.vue";
import FilterGender from "./FeedFilters/FilterGender.vue";
import FilterBreed from "./FeedFilters/FilterBreed.vue";
</script>

<template>
  <div class="wrapper-filters">
    <div class="filters">
      <FilterType />
      <FilterGender />
      <FilterBreed />
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
