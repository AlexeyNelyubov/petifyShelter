<script setup>
const props = defineProps({
  counterPagination: { type: Number, required: true },
  lastPage: { type: Number, required: true },
  currentPage: {
    type: Number,
    required: true,
  },
});

defineEmits(["change-page-arrow-minus", "change-page-arrow-plus"]);
</script>

<template>
  <img
    src="/src/assets/images/Feed/arrow-left.svg"
    alt="arrow-left"
    v-if="props.counterPagination && props.currentPage > 1"
    class="feed-arrow-left"
    @click="$emit('change-page-arrow-minus')"
  />
  <img
    src="/src/assets/images/Feed/arrow-right.svg"
    alt="arrow-left"
    v-if="
      props.counterPagination &&
      props.currentPage >= 1 &&
      props.currentPage < props.lastPage
    "
    class="feed-arrow-right"
    @click="$emit('change-page-arrow-plus')"
  />
</template>

<style>
.feed-arrow-left {
  position: fixed;
  top: 450px;
  left: 50px;
  width: 40px;
  cursor: pointer;
}

.feed-arrow-right {
  position: fixed;
  top: 450px;
  right: 50px;
  width: 40px;
  cursor: pointer;
}
</style>

<!-- <img
    src="@/assets/images/Feed/arrow-left.svg"
    alt="arrow-left"
    v-if="props.counterPagination && props.currentPage > 1"
    class="feed-arrow-left"
    @click="paginationPage--"
  />
  <img
    src="@/assets/images/Feed/arrow-right.svg"
    alt="arrow-left"
    v-if="
      props.counterPagination &&
      props.currentPage >= 1 &&
      props.currentPage < props.lastPage
    "
    class="feed-arrow-right"
    @click="paginationPage++"
  /> -->
