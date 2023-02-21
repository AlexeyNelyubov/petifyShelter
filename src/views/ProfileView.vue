<script setup>
import ProfileFeed from "@/components/Profile/ProfileFeed.vue";
</script>

<template>
  <main class="main-profile">
    <ProfileFeed />
  </main>
</template>

<style scoped>
.main-profile {
  position: relative;
  z-index: 1;
  flex-grow: 1;
  background: #ffffff;
}
</style>
