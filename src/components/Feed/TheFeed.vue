<script setup>
import { ref, watch } from "vue";
import FeedFilters from "./FeedFilters.vue";
import FeedPetsCards from "./FeedPetsCards.vue";

import { useLocationStore } from "@/stores/location.js";
const storeGeolocation = useLocationStore();

import { useFiltersStore } from "@/stores/filters.js";
const FiltersStore = useFiltersStore();

const PetsList = ref([]);
const PetsListAfterGeoLocation = ref([]);
const PetsListAfterFilters = ref([]);
const PetsListForShow = ref([]);
const counterOfFilters = ref([]);
const counterOfGeoLocation = ref(false);
const Filters = ref({
  type: [],
  gender: [],
  breeds: [],
});
let pets = [];

if (localStorage.getItem("type")) {
  console.log(typeof localStorage.getItem("type"));
  let arr = localStorage.getItem("type").split(",");
  for (let item of arr) {
    Filters.value.type.push(item);
    console.log(Filters.value);
  }
}

function changeFilter(filter, type) {
  Filters.value[type].splice(0);
  // FiltersStore.filters[type].splice(0);
  for (let item of filter) {
    Filters.value[type].push(item);
    localStorage.setItem(`${type}`, filter);
    // FiltersStore.filters[type].push(item);
    console.log(Filters.value);
  }
}

(async () => {
  //let response = await fetch("src/assets/feed/Pets.json");
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
      PetsListForShow.value.splice(0);
      PetsListAfterGeoLocation.value.splice(0);
      for (let pet of PetsList.value) {
        PetsListAfterGeoLocation.value.push(pet);
        PetsListForShow.value.push(pet);
      }
    } else {
      PetsListForShow.value.splice(0);
      PetsListAfterGeoLocation.value.splice(0);
      for (let pet of PetsList.value) {
        if (storeGeolocation.location === pet.shelter.address) {
          PetsListAfterGeoLocation.value.push(pet);
          PetsListForShow.value.push(pet);
        }
      }
      counterOfGeoLocation.value = true;
    }

    if (counterOfFilters.value.length) {
      compareFiltersandGeolocation();
    }
  }
);

function compareFiltersandGeolocation() {
  PetsListForShow.value.splice(0);
  for (let petInGeoLocation of PetsListAfterGeoLocation.value) {
    for (let petInFilters of PetsListAfterFilters.value) {
      if (petInFilters.id === petInGeoLocation.id) {
        PetsListForShow.value.push(petInGeoLocation);
      }
    }
  }
}

watch(Filters.value, () => {
  console.log("1");
  pets = PetsList.value.slice(0);
  for (let filter in Filters.value) {
    if (Filters.value[filter].length) {
      PetsListForShow.value.splice(0);
      PetsListAfterFilters.value.splice(0);
      if (!counterOfFilters.value.includes(filter)) {
        counterOfFilters.value.push(filter);
      }
      for (let pet of pets) {
        for (let item of Filters.value[filter]) {
          if (pet[filter].length) {
            for (let breed of pet[filter]) {
              if (item === breed) {
                if (!PetsListForShow.value.includes(pet)) {
                  PetsListForShow.value.push(pet);
                  PetsListAfterFilters.value.push(pet);
                }
              }
            }
          }
          if (item === pet[filter]) {
            PetsListForShow.value.push(pet);
            PetsListAfterFilters.value.push(pet);
          }
        }
      }
      pets = PetsListForShow.value.slice(0);
    } else {
      for (let i in counterOfFilters.value) {
        if (counterOfFilters.value[i] === filter) {
          counterOfFilters.value.splice(i, 1);
        }
      }
    }
  }
  if (!counterOfFilters.value.length) {
    PetsListForShow.value.splice(0);
    PetsListAfterFilters.value.splice(0);
    for (let pet of PetsList.value) {
      PetsListForShow.value.push(pet);
      PetsListAfterFilters.value.push(pet);
    }
  }
  if (counterOfGeoLocation.value) {
    compareFiltersandGeolocation();
  }
});

// watch(FiltersStore.filters, () => {
//   pets = PetsList.value.slice(0);
//   for (let filter in FiltersStore.filters) {
//     if (FiltersStore.filters[filter].length) {
//       PetsListForShow.value.splice(0);
//       PetsListAfterFilters.value.splice(0);
//       if (!counterOfFilters.value.includes(filter)) {
//         counterOfFilters.value.push(filter);
//       }
//       for (let pet of pets) {
//         for (let item of FiltersStore.filters[filter]) {
//           if (item === pet[filter]) {
//             PetsListForShow.value.push(pet);
//             PetsListAfterFilters.value.push(pet);
//           }
//         }
//       }
//       pets = PetsListForShow.value.slice(0);
//     } else {
//       for (let i in counterOfFilters.value) {
//         if (counterOfFilters.value[i] === filter) {
//           counterOfFilters.value.splice(i, 1);
//         }
//       }
//     }
//   }
//   if (!counterOfFilters.value.length) {
//     PetsListForShow.value.splice(0);
//     PetsListAfterFilters.value.splice(0);
//     for (let pet of PetsList.value) {
//       PetsListForShow.value.push(pet);
//       PetsListAfterFilters.value.push(pet);
//     }
//   }
//   if (counterOfGeoLocation.value) {
//     compareFiltersandGeolocation();
//   }
// });
</script>

<template>
  <FeedFilters class="filters" @change-filter="changeFilter" />

  <div class="wrapper-for-card">
    <div v-for="pet in PetsListForShow" :key="pet.id">
      <FeedPetsCards :pet="pet" />
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
