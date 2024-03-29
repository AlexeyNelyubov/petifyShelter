<script setup>
import { ref, watch, computed } from "vue";
import FeedFilters from "/src/components/Feed/FeedFilters.vue";
import FeedPetsCards from "/src/components/Feed/FeedPetsCards.vue";
import FeedPagination from "/src/components/Feed/FeedPagination.vue";
import FeedPaginationArrow from "/src/components/Feed/FeedPaginationArrow.vue";
import MessageForShow from "/src/views/MessageForShow.vue";
import { usePetsStore } from "/src/stores/petsList.js";
import { useLocationStore } from "/src/stores/location.js";
import { usePaginationStore } from "/src/stores/pagination.js";

const PetsStore = usePetsStore();
const storeGeolocation = useLocationStore();
const PaginationStore = usePaginationStore();

const showError = ref(
  "Для загрузки данных с сервера при первом запуске может понадобиться некоторое время."
);
const PetsList = ref([]);
const FiltersFromLocalStorage = ref({
  type: [],
  gender: [],
  breeds: [],
});
const PaginationFromLocalStorage = ref();
const PetsListAfterGeoLocation = ref([]);
const PetsListAfterFilters = ref([]);
const PetsListAfterPagination = ref([]);
const PetsListForShow = ref([]);
const counterOfFilters = ref([]);
const counterOfGeoLocation = ref(false);
const counterPagination = ref(0);
const Filters = ref({
  type: [],
  gender: [],
  breeds: [],
});
let pets = [];
const HeveNotPets = ref("");
const paginationPage = ref(1);

const lastPage = computed(() => {
  return Math.ceil(PetsListForShow.value.length / counterPagination.value);
});

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

function changepagination() {
  if (PaginationStore.pagination && !counterPagination.value) {
    counterPagination.value =
      PaginationStore.pagination === "Всех"
        ? 0
        : Number(PaginationStore.pagination);
  }
  PetsListAfterPagination.value.splice(0);
  if (counterPagination.value >= PetsListForShow.value.length) {
    counterPagination.value = 0;
  }
  if (counterPagination.value) {
    paginationPage.value = 1;
    for (let i = 0; i <= counterPagination.value - 1; i++) {
      PetsListAfterPagination.value.push(PetsListForShow.value[i]);
    }
  }
}

watch(
  () => paginationPage.value,
  () => {
    if (paginationPage.value < 1) {
      paginationPage.value = 1;
    }
    if (paginationPage.value <= lastPage.value) {
      PetsListAfterPagination.value.splice(0);
      for (
        let i =
          paginationPage.value * counterPagination.value -
          counterPagination.value;
        i <= paginationPage.value * counterPagination.value - 1;
        i++
      ) {
        if (PetsListForShow.value[i]) {
          PetsListAfterPagination.value.push(PetsListForShow.value[i]);
        } else break;
      }
    }
  }
);

function pagination(numberOfCards) {
  if (numberOfCards === "Всех") {
    counterPagination.value = 0;
  } else {
    counterPagination.value = Number(numberOfCards);
  }
  changepagination();
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
  if (localStorage.getItem("pagination")) {
    PaginationFromLocalStorage.value = localStorage.getItem("pagination");
  }
}

if (PetsStore.petsList.length) {
  PetsList.value.splice(0);
  PetsListForShow.value.splice(0);
  for (let pet of PetsStore.petsList) {
    PetsList.value.push(pet);
    PetsListForShow.value.push(pet);
    showError.value = "";
  }
  checkFilterGeolocation();
} else {
  (async () => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/pet/allpets`
      );
      let json = await response.json();
      if (response.ok) {
        for (let pet of json) {
          PetsList.value.push(pet);
          PetsListForShow.value.push(pet);
          PetsStore.petsList.push(pet);
          showError.value = "";
        }
        getFiltersFromLocalStorage();
      } else {
        console.log(json);
        showError.value =
          "Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз.";
      }
    } catch (error) {
      console.error(error);
      showError.value =
        "Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз.";
    }
  })();
}

watch(
  () => storeGeolocation.location,
  () => {
    checkFilterGeolocation();
    checkHeveNotPets();
    if (!counterOfFilters.value.length) {
      changepagination();
    }
  }
);

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
    changepagination();
  }
});

function compareFiltersandGeolocation() {
  PetsListForShow.value.splice(0);
  for (let petInGeoLocation of PetsListAfterGeoLocation.value) {
    for (let petInFilters of PetsListAfterFilters.value) {
      if (petInFilters._id === petInGeoLocation._id) {
        PetsListForShow.value.push(petInGeoLocation);
      }
    }
  }
  checkHeveNotPets();
  changepagination();
}

function checkHeveNotPets() {
  if (!PetsListForShow.value.length && PetsStore.petsList.length) {
    HeveNotPets.value =
      "По вашему запросу животных не найдено. Попробуйте изменить фильтры.";
  } else {
    HeveNotPets.value = "";
  }
}

function checkFilterGeolocation() {
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
}
</script>

<template>
  <div>
    <FeedPaginationArrow
      v-if="!showError"
      :counterPagination="counterPagination"
      :lastPage="lastPage"
      :currentPage="paginationPage"
      @change-page-arrow-minus="paginationPage--"
      @change-page-arrow-plus="paginationPage++"
    />
    <FeedFilters
      v-if="!showError"
      class="feed-filters"
      @change-filter="changeFilter"
      @pagination="pagination"
      :FiltersFromLocalStorage="FiltersFromLocalStorage"
      :PaginationFromLocalStorage="PaginationFromLocalStorage"
      :PetsListForShow="PetsListForShow"
    />
    <MessageForShow v-if="showError" :message="showError" :loader="true" />
    <MessageForShow v-if="HeveNotPets" :message="HeveNotPets" />
    <div class="feed-pets-cards" v-if="!counterPagination && !showError">
      <div v-for="pet in PetsListForShow" :key="pet.id">
        <FeedPetsCards :pet="pet" />
      </div>
    </div>
    <div
      v-if="counterPagination && !showError"
      class="feed-pets-cards-pagination"
    >
      <FeedPagination
        :lastPage="lastPage"
        :currentPage="paginationPage"
        @change-page="(page) => (paginationPage = Number(page))"
      />
      <div class="feed-pets-cards-pagination__pets-cards">
        <div v-for="pet in PetsListAfterPagination" :key="pet.id">
          <FeedPetsCards :pet="pet" />
        </div>
      </div>
      <FeedPagination
        :counterPagination="counterPagination"
        :lastPage="lastPage"
        :currentPage="paginationPage"
        @change-page="(page) => (paginationPage = Number(page))"
      />
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

.feed-pets-cards-pagination {
  margin: 132px 0 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feed-pets-cards-pagination__pets-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.feed-arrow-left {
  position: fixed;
  top: 450px;
  left: 50px;
  width: 40px;
}

.feed-arrow-right {
  position: fixed;
  top: 450px;
  right: 50px;
  width: 40px;
}
</style>
