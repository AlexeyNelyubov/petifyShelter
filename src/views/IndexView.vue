<script setup>
import TheFeed from "@/components/Feed/TheFeed.vue";
</script>

<template>
  <main class="main-index">
    <TheFeed />
  </main>
</template>

<style scoped>
.main-index {
  position: relative;
  z-index: 1;
  flex-grow: 1;
}
</style>
