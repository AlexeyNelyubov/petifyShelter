<script setup>
import TheHeader from "@/components/Header/TheHeader.vue";
import TheFeed from "@/components/Feed/TheFeed.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
  <div class="wrapper-index">
    <header class="header-index"><the-header /></header>

    <main class="main-index"><the-feed /></main>

    <footer class="footer-index">
      <the-footer />
    </footer>
  </div>
</template>

<style scoped>
.wrapper-index {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header-index {
  position: sticky;
}
</style>
