<script setup>
import { ref } from "vue";
const a = ref("1213");
</script>

<template>
  <div class="feed-pets-cards-pagination__pagination">{{ a }}</div>
</template>

<style>
.feed-pets-cards-pagination__pagination {
  margin-bottom: 30px;
}
</style>
