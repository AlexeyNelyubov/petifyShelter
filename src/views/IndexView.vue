<script setup>
import TheHeader from "@/components/Header/TheHeader.vue";
import TheFeed from "@/components/Feed/TheFeed.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
  <div class="wrapper-index">
    <header class="header-index">
      <the-header />
    </header>

    <main class="main-index">
      <the-feed />
    </main>

    <footer class="footer-index">
      <the-footer />
    </footer>
  </div>
</template>

<style scoped>
.wrapper-index {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
}
.header-index {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
}

.main-index {
  position: relative;
  z-index: 1;
  flex-grow: 1;
}
</style>
