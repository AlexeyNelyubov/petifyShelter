<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="filter-type">
    <p class="filter-header">Порода</p>
    <div class="down-part">
      <p>Все</p>
      <img src="@/assets/imgarrowdown.svg" width="14" height="8" alt="arrow" />
    </div>
  </div>
</template>

<style scoped>
.filter-type {
  height: 60px;
  width: 132px;
  padding: 10px;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  background-color: rgba(217, 217, 217, 0.41);
  border-radius: 8px;
}

.filter-header {
  margin-bottom: 8px;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #939393;
}
.down-part {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
