<script setup>
const props = defineProps({
  message: String,
});
</script>

<template>
  <main class="message-for-show">
    {{ props.message }}
  </main>
</template>

<style>
.message-for-show {
  position: fixed;
  top: 96px;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 132px;
  display: flex;
  justify-content: center;
  z-index: 0;
  font-size: 26px;
}
</style>
