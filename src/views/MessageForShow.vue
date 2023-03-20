<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <main class="message-for-show">
    {{ props.message }}
  </main>
</template>

<style>
.message-for-show {
  margin: 132px auto;
  width: 1000px;
  text-align: center;
  font-size: 22px;
}
</style>
