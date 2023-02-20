<script setup>
import TheHeader from "@/components/Header/TheHeader.vue";
import ProfileFeed from "@/components/Profile/ProfileFeed.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
  <div class="profile">
    <TheHeader />

    <main class="main-profile">
      <ProfileFeed />
    </main>

    <TheFooter />
  </div>
</template>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
}

.main-profile {
  position: relative;
  z-index: 1;
  flex-grow: 1;
  background: #ffffff;
}
</style>
