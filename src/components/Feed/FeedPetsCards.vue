<script setup>
import { ref } from "vue";
const props = defineProps({
  pet: Object,
});

//console.log(props.pet);
// for (let p of props.pet) {
//   console.log(p);
// }

const PetsTypeImg = ref("");
const PetsAge = ref(props.pet.age);
const PetsSterelization = ref("");
const PetsGender = ref("");
const showAllFeatures = ref(false);

const Colors = [
  "#00FF00",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#F4A460",
  "#FF00FF",
  "#EE82EE",
  "#FF7F50",
  "#FFA500",
  "#FF69B4",
  "#FA8072",
  "#00FA9A",
  "#7FFFD4",
  "#FFE4E1",
];

function ColorForPetsFeature() {
  return Colors[Math.floor(Math.random() * Colors.length)];
}

switch (props.pet.type) {
  case "Кот":
    PetsTypeImg.value = "src/assets/feed/cat.svg";
    break;
  case "Собака":
    PetsTypeImg.value = "src/assets/feed/dog.svg";
    break;
  case "Птица":
    PetsTypeImg.value = "src/assets/feed/dog.svg";
    break;
}

let now = new Date();
const dateBorn = now - Date.parse(PetsAge.value);
let date = new Date(dateBorn);
let fullYear = date.getFullYear() - 1970;
let fullMonth = date.getMonth();
let year = "";
let month = "";

if (fullYear === 1 || fullYear % 10 === 1) {
  year = "год";
} else {
  if (
    (fullYear >= 2) & (fullYear <= 4) ||
    (fullYear % 10 >= 2) & (fullYear % 10 <= 4)
  ) {
    year = "года";
  } else {
    if (fullYear === 0) {
      fullYear = "";
    } else {
      year = "лет";
    }
  }
}

if (fullMonth === 1) {
  month = "месяц";
} else {
  if ((fullMonth >= 2) & (fullMonth <= 4)) {
    month = "месяца";
  } else {
    if (fullMonth === 0) {
      fullMonth = "";
    } else {
      month = "месяцев";
    }
  }
}

const Age = `${fullYear} ${year} ${fullMonth} ${month}`;

if (props.pet.gender === "Мальчик") {
  PetsGender.value = "src/assets/feed/male.svg";
  if (props.pet.sterilized) {
    PetsSterelization.value = "стерелизован";
  } else {
    PetsSterelization.value = "не стерелизован";
  }
} else {
  PetsGender.value = "src/assets/feed/female.svg";
  if (props.pet.sterilized) {
    PetsSterelization.value = "стерелизована";
  } else {
    PetsSterelization.value = "не стерелизована";
  }
}
</script>

<template>
  <div class="pets-card">
    <div class="wrapper-for-avatar">
      <img :src="props.pet.avatar" class="pets-avatar" />
    </div>
    <div class="wrapper-for-cards-discription">
      <div class="pets-type-name-age">
        <img :src="PetsTypeImg" />
        <div class="pets-name-age">
          <p class="pets-name">{{ props.pet.name }}</p>
          <p class="pets-age">{{ Age }}</p>
        </div>
      </div>
      <div class="pets--sterilized-vaccinated-gender-features">
        <div class="pets-sterilized-gender">
          <p
            class="single-feature"
            :style="{ backgroundColor: ColorForPetsFeature() }"
          >
            {{ PetsSterelization }}
          </p>
          <img
            v-if="props.pet.vaccinated"
            src="src/assets/feed/vaccinated.svg"
          />
          <img :src="PetsGender" class="pets-gender" />
        </div>
        <div class="pets-features">
          <p
            class="single-feature"
            :style="{ backgroundColor: ColorForPetsFeature() }"
          >
            {{ props.pet.features[0] }}
          </p>
          <p
            v-if="props.pet.features[1]"
            class="single-feature"
            @pointerover="showAllFeatures = true"
            :style="{
              backgroundColor: ColorForPetsFeature(),
              fontWeight: 'bold',
            }"
          >
            ...
          </p>
        </div>
        <div
          v-if="showAllFeatures"
          class="all-features"
          @pointerover="showAllFeatures = true"
          @pointerleave="showAllFeatures = false"
        >
          <div
            v-for="item in props.pet.features"
            :key="item.id"
            class="single-feature-in-all-features"
            :style="{ backgroundColor: ColorForPetsFeature() }"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pets-card {
  width: 480px;
  height: 588px;
  margin: 0 48px 48px 0;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
}

.wrapper-for-avatar {
  width: 478px;
  height: 478px;
}

.pets-avatar {
  width: 478px;
  height: 478px;
  object-fit: cover;
}

.wrapper-for-cards-discription {
  height: 108px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pets-type-name-age {
  display: flex;
}
.pets-name-age {
  margin-left: 16px;
}

.pets-name {
  margin-bottom: 8px;
  font-size: 32px;
}

.pets-age {
  font-size: 24px;
}

.pets--sterilized-vaccinated-gender-features {
  position: relative;
  height: 64px;
  /* margin-left: 70px; */
  padding-top: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 16px;
  /* background-color: aqua; */
}

.pets-sterilized-gender {
  display: flex;
  justify-content: flex-end;
}

.pets-gender {
  margin-left: 4px;
}

.pets-features {
  display: flex;
  justify-content: flex-start;
}

.single-feature {
  height: 24px;
  margin-right: 4px;
  padding: 4px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
}

.all-features {
  position: absolute;
  top: -72px;
  width: 200px;
  height: 200px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 10px #d9d9d9;
}

.single-feature-in-all-features {
  height: 28px;
  margin-bottom: 8px;
  padding: 4px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
}
</style>
