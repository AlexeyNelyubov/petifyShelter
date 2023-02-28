<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  lastPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

defineEmits(["change-page"]);

const pages = ref([]);
const first = ref(1);
const last = ref(10);
getPages(1);

watch(
  () => props.lastPage,
  () => {
    pages.value.splice(0);
    getPages(1);
    // console.log(props.lastPage, pages.value);
  }
);

watch(
  () => props.currentPage,
  () => {
    pages.value.splice(0);
    getPages(props.currentPage);
    // console.log(props.lastPage, pages.value);
  }
);

function getPages(currentPage) {
  if (currentPage >= 6) {
    if (currentPage + 5 <= props.lastPage) {
      first.value = currentPage - 4;
      last.value = currentPage + 5;
    } else {
      first.value = props.lastPage - 10;
      last.value = props.lastPage;
    }
  } else {
    first.value = 1;
    last.value = 10;
  }
  if (props.lastPage <= 10) {
    first.value = 1;
    last.value = props.lastPage;
  }
  for (let i = first.value; i <= last.value; i++) {
    if (i != currentPage) {
      pages.value.push(i);
    } else {
      pages.value.push("_");
    }
  }
}

// for (let i = 1; i <= props.lastPage; i++) {
//       if (i != currentPage) {
//         pages.value.push(i);
//       } else {
//         pages.value.push("_");
//       }
//     }
</script>

<template>
  <div class="feed-pets-cards-pagination__pagination">
    {{ props.currentPage }}
    [
    <div v-for="page in pages" :key="page.id">
      <p
        @click="$emit('change-page', `${page}`)"
        class="feed-pets-cards-pagination__page"
      >
        -{{ page }}
      </p>
    </div>
    -]
  </div>
</template>

<style>
.feed-pets-cards-pagination__pagination {
  margin-bottom: 30px;
  display: flex;
  font-family: "Sofia Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  color: #9d9d9d;
}

.feed-pets-cards-pagination__page:hover {
  color: #000;
  cursor: pointer;
}
</style>
