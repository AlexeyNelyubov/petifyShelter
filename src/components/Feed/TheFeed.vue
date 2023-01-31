<script setup>
import { ref } from "vue";
import PetsFilters from "./PetsFilters.vue";
import PetsCard from "./PetsCard.vue";

const PetsList = ref([]);

(async () => {
  //let response = await fetch("src/assets/feed/Pets.json");
  //let response = await fetch("/api/pets");
  let response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/pets`);
  let json = await response.json();

  if (response.ok) {
    for (let pet of json) {
      PetsList.value.push(pet);
    }
  } else {
    console.log("error", json);
  }
})();
</script>

<template>
  <pets-filters class="filters" />

  <div class="wrapper-for-card">
    <div v-for="pet in PetsList" :key="pet.id">
      <pets-card :pet="pet" />
    </div>
  </div>
</template>

<style scoped>
.filters {
  position: fixed;
  height: 100px;
  width: 100%;
  z-index: 1;
}

.wrapper-for-card {
  margin: 132px 0 0 48px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
