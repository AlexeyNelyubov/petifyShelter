<script setup>
import { ref, watch } from "vue";
import PetsFilters from "./PetsFilters.vue";
import PetsCard from "./PetsCard.vue";

import { useLocationStore } from "@/stores/location.js";
const storeGeolocation = useLocationStore();
console.log(storeGeolocation.location);

const PetsList = ref([]);
const PetListAfterGetLocation = ref([]);

(async () => {
  //let response = await fetch("src/assets/feed/Pets.json");
  //let response = await fetch("/api/pets");
  let response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/pets`);
  let json = await response.json();

  if (response.ok) {
    for (let pet of json) {
      PetsList.value.push(pet);
      PetListAfterGetLocation.value.push(pet);
    }
  } else {
    console.log("error", json);
  }
})();

watch(
  () => storeGeolocation.location,
  () => {
    if (storeGeolocation.location === "Весь мир") {
      PetListAfterGetLocation.value.splice(0);
      for (let pet of PetsList.value) {
        PetListAfterGetLocation.value.push(pet);
      }
    }
    if (storeGeolocation.location != "Весь мир") {
      PetListAfterGetLocation.value.splice(0);
      for (let pet of PetsList.value) {
        if (storeGeolocation.location === pet.shelter.address)
          PetListAfterGetLocation.value.push(pet);
      }
    }
  }
);
</script>

<template>
  <pets-filters class="filters" />

  <div class="wrapper-for-card">
    <div v-for="pet in PetListAfterGetLocation" :key="pet.id">
      <pets-card :pet="pet" />
    </div>
  </div>
</template>

<style scoped>
.filters {
  position: fixed;
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
