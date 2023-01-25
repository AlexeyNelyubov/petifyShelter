<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";

const geoAutocomplite = ref(false);
const location = ref("Весь мир");
const cities = ref([]);
const arrCities = [];
const inputActive = ref(false);
const uncorrectValueLocation = ref(false);

onMounted(() => {
  document.addEventListener("click", (event) => {
    checkLocationAfterInput(event, event.type);
  });
  document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      checkLocationAfterInput(event, event.type);
    }
  });
});

function checkLocationAfterInput(event, type) {
  const input = document.querySelector(".input-for-location");
  let happendEvent = event.composedPath().includes(input);
  if ((type === "keyup") & happendEvent) {
    happendEvent = false;
  }
  if (!happendEvent & (location.value === "")) {
    location.value = "Весь мир";
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

onMounted(() => {
  (async () => {
    let response = await fetch("src/assets/header/RussiaCities.json");
    let data = await response.json();
    for (let el of data) {
      arrCities.push(el.city);
    }
  })();
});

watch(location, () => {
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
});

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

onUnmounted(() => {
  document.removeEventListener("click", (event) => {
    checkLocationAfterInput(event, event.type);
  });
  document.removeEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      checkLocationAfterInput(event, event.type);
    }
  });
});
</script>

<template>
  <div>
    <div v-if="inputActive" class="inputActive"></div>
    <div class="wrapper-geolocation">
      <img alt="geolocation" src="@/assets/header/imggeolocation.svg" />
      <input
        class="input-for-location"
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
          <div class="cityInAutocomplite" @click="changeLocation(city)">
            {{ city }}
          </div>
        </div>
      </div>
      <div v-if="uncorrectValueLocation" class="notValideLocation">
        Такого города нет в нашем списке или название города введено
        некорректно. Ввведите другой город или перейдите к глобальному поиску -
        <div
          class="global-search"
          @click="
            (location = 'Весь мир'),
              (inputActive = false),
              (uncorrectValueLocation = false)
          "
        >
          Весь мир
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inputActive {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.wrapper-geolocation {
  display: flex;
  align-items: center;
  width: 224px;
  height: 32px;
  margin-right: 24px;
  background-color: #60b2ee;
  border-radius: 16px;
  box-sizing: border-box;
}

img {
  margin: 0 16px 0 16px;
}

.input-for-location {
  width: 160px;
  text-decoration: none;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
  background-color: #60b2ee;
  border: none;
  outline: none;
}

.autocomplite {
  position: absolute;
  top: 64px;
  z-index: 2;
}

.cityInAutocomplite {
  display: flex;
  align-items: center;
  width: 224px;
  height: 32px;
  padding: 4px 16px 4px 48px;
  box-sizing: border-box;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  background-color: #ffffff;
  border: 1px solid var(--color);
  border-radius: 16px;
}
.cityInAutocomplite:hover {
  color: var(--color-hover);
  background-color: var(--color);
}

.notValideLocation {
  position: absolute;
  top: 64px;
  width: 256px;
  padding: 16px 0 16px 16px;
  z-index: 2;
  box-sizing: border-box;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  background-color: #ffffff;
  border: 1px solid var(--color);
  border-radius: 16px;
}
.global-search {
  position: absolute;
  top: 126px;
  left: 85px;
  color: #60b2ee;
  cursor: pointer;
}
</style>
