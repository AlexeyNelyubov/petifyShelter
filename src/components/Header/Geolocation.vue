<script setup>
import { ref, watch } from "vue";
import { useDocumentClick } from "/src/composable/useDocumentClick.js";
import { useDocumentKeyUp } from "/src/composable/useDocumentKeyUp.js";
import { useLocationStore } from "/src/stores/location.js";

const storeGeolocation = useLocationStore();

const geoAutocomplite = ref(false);
const location = ref("");
const cities = ref([]);
const arrCities = [];
const inputActive = ref(false);
const uncorrectValueLocation = ref(false);

(async () => {
  let response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/city`);
  // let response = await fetch("/src/assets/data/RussiaCities.json");
  let data = await response.json();
  for (let el of data) {
    arrCities.push(el.city);
  }
})();

if (localStorage.getItem("geolocation")) {
  location.value = localStorage.getItem("geolocation");
} else {
  location.value = "Весь мир";
}

watch(location, () => {
  getFiveCitiesForAutocomplite();
});

watch(
  () => storeGeolocation.location,
  () => {
    if (storeGeolocation.location === "Весь мир") {
      localStorage.removeItem("geolocation");
    } else {
      localStorage.setItem("geolocation", storeGeolocation.location);
    }
  }
);

function getFiveCitiesForAutocomplite() {
  cities.value.splice(0, cities.value.length);
  let i = 1;
  if (location.value.length) {
    for (let city of arrCities) {
      if (
        (i <= 5) &
        (location.value.toUpperCase() ===
          city.substring(0, location.value.length).toUpperCase())
      ) {
        i++;
        cities.value.push(city);
      }
    }
  }
}

useDocumentClick(checkLocationAfterInput);
useDocumentKeyUp(checkLocationAfterInput, "Enter");

function checkLocationAfterInput(event, type) {
  const input = document.querySelector(".geolocation__logo-input-input");
  let happendEvent = event.composedPath().includes(input);
  if ((type === "keyup") & happendEvent) {
    happendEvent = false;
  }
  if (!happendEvent & (location.value === "")) {
    location.value = "Весь мир";
    storeGeolocation.location = location.value;
    input.blur();
    inputActive.value = false;
  } else {
    if (
      !happendEvent &
      (location.value != "") &
      (location.value != "Весь мир")
    ) {
      let j = 0;
      for (let city of arrCities) {
        if (location.value.toUpperCase() === city.toUpperCase()) {
          j++;
          location.value = city;
          storeGeolocation.location = location.value;
          geoAutocomplite.value = false;
          inputActive.value = false;
          input.blur();
          return;
        }
      }
      if (j === 0) {
        input.focus();
        uncorrectValueLocation.value = true;
        geoAutocomplite.value = false;
      }
    }
  }
}

function changeDefoultInput() {
  if (location.value === "Весь мир") {
    location.value = "";
  }
}

function changeLocation(city) {
  location.value = city;
  geoAutocomplite.value = false;
  inputActive.value = false;
}
</script>

<template>
  <div class="geolocation">
    <div
      v-if="inputActive"
      class="inputActive"
      :class="{ inputActive_uncorrect: uncorrectValueLocation }"
    ></div>
    <div
      class="geolocation__logo-input"
      :class="{
        'geolocation__logo-input_uncorrect': uncorrectValueLocation,
      }"
    >
      <img
        alt="geolocation"
        src="/src/assets/images/Header/geolocation.svg"
        class="geolocation__logo-input-logo"
      />
      <input
        class="geolocation__logo-input-input"
        :class="{
          'geolocation__logo-input-input_uncorrect': uncorrectValueLocation,
        }"
        type="text"
        v-model="location"
        @input="
          (geoAutocomplite = true),
            (inputActive = true),
            (uncorrectValueLocation = false)
        "
        @focus="changeDefoultInput()"
      />
      <div v-if="geoAutocomplite" class="autocomplite">
        <div v-for="city in cities" :key="city">
          <div class="autocomplite__single-city" @click="changeLocation(city)">
            {{ city }}
          </div>
        </div>
      </div>
      <div
        v-if="uncorrectValueLocation"
        class="autocomplite__notValideLocation"
      >
        Такого города нет в нашем списке или название города введено
        некорректно. Ввведите другой город или перейдите к глобальному поиску -
        <span
          class="autocomplite__notValideLocation-global-search"
          @click="
            (location = 'Весь мир'),
              (inputActive = false),
              (uncorrectValueLocation = false),
              (storeGeolocation.location = location)
          "
        >
          Весь мир
        </span>
      </div>
    </div>
  </div>
</template>

<style>
.inputActive {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.inputActive_uncorrect {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #000;
  opacity: 0.5;
}
.geolocation {
  margin-right: 24px;
}
.geolocation__logo-input {
  display: flex;
  align-items: center;
  width: 224px;
  height: 32px;
  background-color: #60b2ee;
  border-radius: 16px;
}
.geolocation__logo-input_uncorrect {
  position: relative;
  z-index: 2;
  background-color: #ff0000;
}
.geolocation__logo-input-logo {
  margin: 0 16px;
}
.geolocation__logo-input-input {
  width: 160px;
  font-family: "Sofia Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
  background-color: #60b2ee;
  border: none;
  outline: none;
  text-decoration: none;
}
.geolocation__logo-input-input_uncorrect {
  background-color: #ff0000;
}
.autocomplite {
  position: absolute;
  top: 64px;
  z-index: 2;
}
.autocomplite__single-city {
  display: flex;
  align-items: center;
  width: 224px;
  height: 32px;
  padding: 4px 0 4px 32px;
  font-family: "Sofia Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 16px;
  cursor: pointer;
}
.autocomplite__single-city:hover {
  color: #fff;
  background-color: #d9d9d9;
}
.autocomplite__notValideLocation {
  position: absolute;
  top: 32px;
  width: 256px;
  padding: 16px 0 16px 16px;
  z-index: 2;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 16px;
}
.autocomplite__notValideLocation-global-search {
  position: absolute;
  top: 126px;
  left: 85px;
  color: #60b2ee;
  cursor: pointer;
}
</style>
