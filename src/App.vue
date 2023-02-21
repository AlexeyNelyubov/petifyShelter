<script setup>
import { RouterView } from "vue-router";
import TheHeader from "@/components/Header/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
  <div class="app">
    <TheHeader />

    <RouterView />

    <TheFooter />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
}
</style>
