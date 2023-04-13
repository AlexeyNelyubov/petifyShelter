<script setup>
import { RouterView } from "vue-router";
import TheHeader from "/src/components/Header/TheHeader.vue";
import TheFooter from "/src/components/TheFooter.vue";
</script>

<template>
  <div class="app">
    <TheHeader class="app-header" />
    <RouterView class="app-main" />
    <TheFooter class="app-footer" />
  </div>
</template>

<style>
.app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
}

.app-header {
  border-bottom: 2px solid #d9d9d9;
}

.app-main {
  flex-grow: 1;
}

.app-footer {
  border-top: 2px solid #d9d9d9;
}
</style>
