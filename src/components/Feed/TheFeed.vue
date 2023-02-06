<script setup>
import { ref, watch } from "vue";
import PetsFilters from "./PetsFilters.vue";
import PetsCard from "./PetsCard.vue";

import { useLocationStore } from "@/stores/location.js";
const storeGeolocation = useLocationStore();

import { useFiltersStore } from "@/stores/filters.js";
const FiltersStore = useFiltersStore();

const PetsList = ref([]);
const PetListAfterGeoLocation = ref([]);
const PetListAfterFilters = ref([]);
const PetsListForShow = ref([]);
const counterOfFilters = ref(false);
const counterOfGeoLocation = ref(false);

(async () => {
  //let response = await fetch("src/assets/feed/Pets.json");
  //let response = await fetch("/api/pets");
  let response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/pets`);
  let json = await response.json();

  if (response.ok) {
    for (let pet of json) {
      PetsList.value.push(pet);
      PetsListForShow.value.push(pet);
    }
  } else {
    console.log("error", json);
  }
})();

watch(
  () => storeGeolocation.location,
  () => {
    if (storeGeolocation.location === "Весь мир") {
      counterOfGeoLocation.value = false;
      // fn(PetsList.value);
      PetsListForShow.value.splice(0);
      PetListAfterGeoLocation.value.splice(0);
      for (let pet of PetsList.value) {
        PetListAfterGeoLocation.value.push(pet);
        PetsListForShow.value.push(pet);
      }
    } else {
      PetsListForShow.value.splice(0);
      PetListAfterGeoLocation.value.splice(0);
      for (let pet of PetsList.value) {
        if (storeGeolocation.location === pet.shelter.address) {
          PetListAfterGeoLocation.value.push(pet);
          PetsListForShow.value.push(pet);
        }
      }
      counterOfGeoLocation.value = true;
      // fn(PetListAfterGeoLocation.value);
    }
    // if (storeGeolocation.location != "Весь мир") {
    //   PetListAfterGeoLocation.value.splice(0);
    //   for (let pet of PetsList.value) {
    //     if (storeGeolocation.location === pet.shelter.address) {
    //       PetListAfterGeoLocation.value.push(pet);
    //     }
    //   }
    // }
    if (counterOfFilters.value) {
      PetsListForShow.value.splice(0);
      for (let petInGeoLocation of PetListAfterGeoLocation.value) {
        for (let petInFilters of PetListAfterFilters.value) {
          if (petInFilters.id === petInGeoLocation.id) {
            PetsListForShow.value.push(petInGeoLocation);
          }
        }
      }
    }
  }
);

// function fn(arr) {
//   if (counterOfFilters.value & counterOfGeoLocation.value) {
//     console.log(PetsListForShow.value);
//     const List = PetsListForShow.value.slice(0);
//     console.log(List);
//     PetsListForShow.value.splice(0);
//     for (let pet of arr) {
//       for (let petinlist of List) {
//         if (pet.id === petinlist.id) {
//           PetsListForShow.value.push(pet);
//         }
//       }
//     }
//     console.log(PetsListForShow.value);
//   } else {
//     PetsListForShow.value.splice(0);
//     for (let pet of arr) {
//       PetsListForShow.value.push(pet);
//     }
//   }
// }

// function fn(arr) {
// }
watch(FiltersStore.filters, () => {
  if (FiltersStore.filters.type.length) {
    PetsListForShow.value.splice(0);
    PetListAfterFilters.value.splice(0);
    for (let pet of PetsList.value) {
      for (let type of FiltersStore.filters.type) {
        if (type === pet.type) {
          PetListAfterFilters.value.push(pet);
          PetsListForShow.value.push(pet);
        }
      }
    }
    counterOfFilters.value = true;
    // fn(PetListAfterFilters.value);
  } else {
    counterOfFilters.value = false;
    // fn(PetsList.value);
    PetsListForShow.value.splice(0);
    PetListAfterFilters.value.splice(0);
    for (let pet of PetsList.value) {
      PetListAfterFilters.value.push(pet);
      PetsListForShow.value.push(pet);
    }
  }
  if (counterOfGeoLocation.value) {
    PetsListForShow.value.splice(0);
    for (let petInFilters of PetListAfterFilters.value) {
      for (let petInGeoLocation of PetListAfterGeoLocation.value) {
        if (petInFilters.id === petInGeoLocation.id) {
          PetsListForShow.value.push(petInFilters);
        }
      }
    }
  }
});
</script>

<template>
  <pets-filters class="filters" />

  <div class="wrapper-for-card">
    <div v-for="pet in PetsListForShow" :key="pet.id">
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
