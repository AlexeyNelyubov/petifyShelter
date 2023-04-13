<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { getAge } from "/src/Helpers/getAge.js";
import { getColores } from "/src/Helpers/getColores.js";
import { useUserStore } from "/src/stores/userStore.js";
const userStore = useUserStore();

const props = defineProps({
  pet: Object,
});

const PetsTypeImg = ref("");
const PetsAge = getAge(props.pet.age);
const PetsSterelization = ref("");
const PetsGender = ref("");
const showAllFeatures = ref(false);
const isAuthorized = ref(true);

switch (props.pet.type) {
  case "Кот":
    PetsTypeImg.value = "/src/assets//images/Feed/cat.svg";
    break;
  case "Собака":
    PetsTypeImg.value = "/src/assets//images/Feed/dog.svg";
    break;
  case "Птица":
    PetsTypeImg.value = "/src/assets//images/Feed/dog.svg";
    break;
}

if (props.pet.gender === "Мальчик") {
  PetsGender.value = "/src/assets/images/Feed/male.svg";
  if (props.pet.sterilized) {
    PetsSterelization.value = "стерелизован";
  } else {
    PetsSterelization.value = "не стерелизован";
  }
} else {
  PetsGender.value = "/src/assets/images/Feed/female.svg";
  if (props.pet.sterilized) {
    PetsSterelization.value = "стерелизована";
  } else {
    PetsSterelization.value = "не стерелизована";
  }
}
const putPetInMarkers = () => {
  if (!userStore.authentificated) {
    isAuthorized.value = false;
  }
};
</script>

<template>
  <div class="pet-card">
    <img
      @click="putPetInMarkers"
      class="pet-card__field-for-avatar__imgStar"
      src="/src/assets/images/Feed/star.svg"
      alt="imgstar"
      width="23"
    />
    <div class="pet-card__field-for-avatar">
      <RouterLink :to="{ name: 'PetPage', params: { id: `${props.pet._id}` } }">
        <img :src="props.pet.avatar" class="pet-card__avatar" />
      </RouterLink>
    </div>
    <div class="pet-card__discription">
      <div class="pet-card__type-name-age">
        <img :src="PetsTypeImg" />
        <div class="pet-card__name-age">
          <p class="pet-card__name-age__name">{{ props.pet.name }}</p>
          <p class="pet-card__name-age__age">{{ PetsAge }}</p>
        </div>
      </div>
      <div class="pet-card__sterilized-vaccinated-gender">
        <div class="pet-card__sterilized-gender">
          <p
            class="pet-card__sterilized-gender__sterilized"
            :style="{ backgroundColor: getColores() }"
          >
            {{ PetsSterelization }}
          </p>
          <img
            v-if="props.pet.vaccinated"
            src="/src/assets/images/Feed/vaccinated.svg"
          />
          <img :src="PetsGender" class="pet-card__sterilized-gender__gender" />
        </div>
        <div class="pet-card__features">
          <p
            class="pet-card__single-feature"
            :style="{ backgroundColor: getColores() }"
          >
            {{ props.pet.features[0] }}
          </p>
          <p
            v-if="props.pet.features[1]"
            class="pet-card__single-feature"
            @pointerover="showAllFeatures = true"
            :style="{
              backgroundColor: getColores(),
              fontWeight: 'bold',
            }"
          >
            ...
          </p>
        </div>
        <div
          v-if="showAllFeatures"
          class="pet-card__all-features"
          @pointerover="showAllFeatures = true"
          @pointerleave="showAllFeatures = false"
        >
          <div
            v-for="item in props.pet.features"
            :key="item.id"
            class="pet-card__single-feature-in-all-features"
            :style="{ backgroundColor: getColores() }"
          >
            {{ item }}
          </div>
        </div>
        <div
          v-if="!isAuthorized"
          class="pet-card__all-features"
          @pointerleave="isAuthorized = true"
        >
          Для добавления карточки в закладки необходимо зарегистрироваться
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.pet-card {
  position: relative;
  width: 480px;
  height: 588px;
  margin: 0 24px 48px 24px;
  border: 1px solid #c4c4c4;
  text-decoration: none;
}

.pet-card__field-for-avatar {
  width: 478px;
  height: 478px;
}

.pet-card__avatar {
  width: 478px;
  height: 478px;
  object-fit: cover;
}

.pet-card__field-for-avatar__imgStar {
  position: absolute;
  top: 562px;
  right: 0;
  cursor: pointer;
}

.pet-card__discription {
  height: 108px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pet-card__type-name-age {
  display: flex;
}
.pet-card__name-age {
  margin-left: 16px;
}

.pet-card__name-age__name {
  margin-bottom: 8px;
  font-size: 32px;
}

.pet-card__name-age__age {
  font-size: 24px;
}

.pet-card__sterilized-vaccinated-gender {
  position: relative;
  height: 64px;
  padding-top: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 16px;
}

.pet-card__sterilized-gender {
  display: flex;
  justify-content: flex-end;
}

.pet-card__sterilized-gender__gender {
  margin-left: 4px;
}

.pet-card__features {
  display: flex;
  justify-content: flex-start;
}

.pet-card__sterilized-gender__sterilized,
.pet-card__single-feature {
  height: 24px;
  margin-right: 4px;
  padding: 4px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
}

.pet-card__all-features {
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

.pet-card__single-feature-in-all-features {
  height: 28px;
  margin-bottom: 8px;
  padding: 4px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
}
</style>
