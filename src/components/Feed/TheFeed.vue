<script setup>
import { ref, watch, watchEffect } from "vue";
import FeedFilters from "./FeedFilters.vue";
import FeedPetsCards from "./FeedPetsCards.vue";
import { usePetsStore } from "@/stores/petsList.js";
import { useLocationStore } from "@/stores/location.js";

const PetsStore = usePetsStore();
const storeGeolocation = useLocationStore();

const PetsList = ref([]);
const FiltersFromLocalStorage = ref({
  type: [],
  gender: [],
  breeds: [],
});
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
const HeveNotPets = ref(false);

function changeFilter(filter, type) {
  Filters.value[type].splice(0);
  if (filter.length) {
    for (let item of filter) {
      Filters.value[type].push(item);
      localStorage.setItem(type, filter);
    }
  } else {
    localStorage.removeItem(type);
  }
}

function getFiltersFromLocalStorage() {
  if (localStorage.getItem("type")) {
    for (let item of localStorage.getItem("type").split(",")) {
      FiltersFromLocalStorage.value.type.push(item);
    }
  }
  if (localStorage.getItem("gender")) {
    for (let item of localStorage.getItem("gender").split(",")) {
      FiltersFromLocalStorage.value.gender.push(item);
    }
  }
  if (localStorage.getItem("breeds")) {
    for (let item of localStorage.getItem("breeds").split(",")) {
      FiltersFromLocalStorage.value.breeds.push(item);
    }
  }
  if (localStorage.getItem("geolocation")) {
    storeGeolocation.location = localStorage.getItem("geolocation");
  } else {
    storeGeolocation.location = "Весь мир";
  }
}

if (PetsStore.petsList.length) {
  PetsList.value.splice(0);
  PetsListForShow.value.splice(0);
  for (let pet of PetsStore.petsList) {
    PetsList.value.push(pet);
    PetsListForShow.value.push(pet);
  }
} else {
  (async () => {
    //let response = await fetch("src/assets/feed/Pets.json");
    let response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/pets`
    );
    let json = await response.json();

    if (response.ok) {
      for (let pet of json) {
        PetsList.value.push(pet);
        PetsListForShow.value.push(pet);
        PetsStore.petsList.push(pet);
      }
      getFiltersFromLocalStorage();
    } else {
      console.log("error", json);
    }
  })();
}

watchEffect(() => {
  if (storeGeolocation.location === "Весь мир") {
    counterOfGeoLocation.value = false;
    PetsListForShow.value.splice(0);
    PetsListAfterGeoLocation.value.splice(0);
    for (let pet of PetsList.value) {
      PetsListAfterGeoLocation.value.push(pet);
      PetsListForShow.value.push(pet);
    }
  } else {
    if (storeGeolocation.location != "") {
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
  }
  if (counterOfFilters.value.length) {
    compareFiltersandGeolocation();
  } else {
    if (counterOfGeoLocation.value) {
      checkHeveNotPets();
    }
  }
});

watch(Filters.value, () => {
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
  } else {
    checkHeveNotPets();
  }
});

function compareFiltersandGeolocation() {
  PetsListForShow.value.splice(0);
  for (let petInGeoLocation of PetsListAfterGeoLocation.value) {
    for (let petInFilters of PetsListAfterFilters.value) {
      if (petInFilters.id === petInGeoLocation.id) {
        PetsListForShow.value.push(petInGeoLocation);
      }
    }
  }
  checkHeveNotPets();
}

function checkHeveNotPets() {
  if (!PetsListForShow.value.length) {
    HeveNotPets.value = true;
  } else {
    HeveNotPets.value = false;
  }
}
</script>

<template>
  <div>
    <FeedFilters
      class="feed-filters"
      @change-filter="changeFilter"
      :FiltersFromLocalStorage="FiltersFromLocalStorage"
      :PetsListForShow="PetsListForShow"
    />
    <div v-if="HeveNotPets" class="feed-no-pets">
      По вашему запросу животных не найдено. Попробуйте изменить фильтры.
    </div>
    <div class="feed-pets-cards">
      <div v-for="pet in PetsListForShow" :key="pet.id">
        <FeedPetsCards :pet="pet" />
      </div>
    </div>
  </div>
</template>

<style>
.feed-filters {
  position: fixed;
  width: 100%;
  z-index: 1;
}
.feed-no-pets {
  margin-top: 132px;
  display: flex;
  justify-content: center;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
}
.feed-pets-cards {
  margin: 132px 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
