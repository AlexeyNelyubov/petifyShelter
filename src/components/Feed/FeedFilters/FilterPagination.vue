<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { usePaginationStore } from "/src/stores/pagination.js";
const PaginationStore = usePaginationStore();

const props = defineProps({
  PaginationFromLocalStorage: String,
});

const emit = defineEmits(["pagination"]);

const CountPagination = ref("Всех");
const showPrompt = ref(false);
const inputActive = ref(false);
const petsSign = ref("");

if (CountPagination.value === "Всех") {
  changePetsSign();
}

if (PaginationStore.pagination) {
  CountPagination.value = PaginationStore.pagination;
  emit("pagination", CountPagination.value);
}

watch(
  () => props.PaginationFromLocalStorage,
  () => {
    CountPagination.value = props.PaginationFromLocalStorage;
    PaginationStore.pagination = props.PaginationFromLocalStorage;
    emit("pagination", CountPagination.value);
  }
);

function changeCountPaginationFocus() {
  if (CountPagination.value === "Всех") {
    CountPagination.value = "";
    PaginationStore.pagination = "";
  }
  showPrompt.value = true;
  inputActive.value = true;
}

function changeCountPaginationBlur() {
  if (CountPagination.value === "") {
    CountPagination.value = "Всех";
    PaginationStore.pagination = "Всех";
  }
  if (CountPagination.value > 0 && CountPagination.value < 31) {
    PaginationStore.pagination = CountPagination.value;
    localStorage.setItem("pagination", CountPagination.value);
    emit("pagination", CountPagination.value);
  } else {
    localStorage.removeItem("pagination", CountPagination.value);
    CountPagination.value = "Всех";
    PaginationStore.pagination = "Всех";
    emit("pagination", CountPagination.value);
  }
  showPrompt.value = false;
  inputActive.value = false;
}

function changeshowPrompt() {
  if (!inputActive.value) {
    showPrompt.value = false;
  }
}

watch(
  () => CountPagination.value,
  () => {
    changePetsSign();
  }
);

function changePetsSign() {
  if (CountPagination.value >= 1 && CountPagination.value <= 4) {
    petsSign.value = "питомца";
  } else {
    petsSign.value = "питомцев";
  }
}

onMounted(() => {
  document.addEventListener("keyup", (event) => {
    let input = document.querySelector(".pagination-input__input");
    if (event.key === "Enter" && showPrompt.value) {
      input.blur();
    }
  });
});

onUnmounted(() => {
  document.removeEventListener("keyup", (event) => {
    let input = document.querySelector(".pagination-input__input");
    if (event.key === "Enter" && showPrompt.value) {
      input.blur();
    }
  });
});
</script>

<template>
  <div class="pagination">
    <p v-if="showPrompt" class="pagination__prompt">
      Укажите сколько питомцев отображать на странице
    </p>
    <p class="pagination__header">Показывать</p>
    <div class="pagination-input">
      <input
        @pointerover="showPrompt = true"
        @pointerleave="changeshowPrompt"
        @blur="changeCountPaginationBlur"
        @focus="changeCountPaginationFocus"
        v-model="CountPagination"
        class="pagination-input__input"
      />
      <p>{{ petsSign }}</p>
    </div>
  </div>
</template>

<style>
.pagination {
  height: 60px;
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  background-color: #d9d9d969;
  border: 2px solid #d9d9d969;
  border-radius: 8px;
}
.pagination__prompt {
  position: absolute;
  top: 95px;
  width: 150px;
}

.pagination__header {
  margin: 10px 10px 4px 10px;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #939393;
}

.pagination-input {
  margin: 4px 10px 10px 10px;
  display: flex;
  align-items: center;
  color: #939393;
}
.pagination-input__input {
  width: 31px;
  margin-right: 4px;
  font-size: 14px;
  background-color: #d9d9d900;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
