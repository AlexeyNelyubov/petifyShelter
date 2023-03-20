<script setup>
import { ref } from "vue";
import { usePetsStore } from "@/stores/petsList.js";
import MessageForShow from "@/views/MessageForShow.vue";
import getAge from "@/Helpers/getAge.js";
import getColores from "@/Helpers/getColores.js";
const PetsStore = usePetsStore();

const props = defineProps({
  id: String,
});

const petForShow = ref({});
let PetsAge = "";
let PetSterilization = "";
let PetVactination = "";
const showError = ref("");
const showNoPet = ref("");

const changePetsFeaturesForShow = () => {
  PetsAge = getAge(petForShow.value.age);
  if (petForShow.value.sterilized) {
    PetSterilization = "Да";
  } else {
    PetSterilization = "Нет";
  }
  if (petForShow.value.vaccinated) {
    PetVactination = "Да";
  } else {
    PetVactination = "Нет";
  }
};

if (PetsStore.petsList.length) {
  for (let pet of PetsStore.petsList) {
    if (pet.id === props.id) {
      petForShow.value = pet;
    }
  }
  changePetsFeaturesForShow();
} else {
  (async () => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/pet/${props.id}`
      );
      let json = await response.json();
      if (response.ok) {
        if (json === "pet not found") {
          showNoPet.value =
            "По вашему id животных в нашем каталоге не найдено. Попробуйте изменить id или начните поиск на главной странице с помощью фильтров.";
        } else {
          petForShow.value = json;
        }
        changePetsFeaturesForShow();
      } else {
        console.error(json);
        showError.value =
          "Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз.";
      }
    } catch (error) {
      console.error(error.message);
      showError.value =
        "Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз.";
    }
  })();
}
</script>

<template>
  <main>
    <MessageForShow v-if="showError" :message="showError" />
    <MessageForShow v-if="showNoPet" :message="showNoPet" />
    <div class="pet-page">
      <div v-if="!showError && !showNoPet" class="pet-page-avatar-discription">
        <div class="pet-page-avatar-discription__field-for-avatar">
          <img
            :src="petForShow.avatar"
            alt="img-profile"
            class="pet-page-avatar-discription__avatar"
          />
        </div>
        <div class="pet-page-avatar-discription__discription">
          <p class="pet-page-avatar-discription__discription-name-age">
            {{ petForShow.name }}, {{ PetsAge }}
          </p>
          <div class="pet-page-avatar-discription__discription-features">
            <p
              v-for="feature in petForShow.features"
              :key="feature.id"
              class="pet-page-avatar-discription__discription-features-feature"
              :style="{ backgroundColor: getColores() }"
            >
              {{ feature }}
            </p>
          </div>
          <div class="pet-page-avatar-discription__all-discription">
            <p
              class="pet-page-avatar-discription__all-discription-item"
              :style="{ backgroundColor: getColores() }"
            >
              Пол: {{ petForShow.gender }}
            </p>
            <div
              v-if="petForShow.breeds"
              class="pet-page-avatar-discription__all-discription-item"
              :style="{ backgroundColor: getColores() }"
            >
              <p>Порода: {{ petForShow.breeds[0] }}</p>
              <p v-if="petForShow.breeds[1]">, {{ petForShow.breeds[1] }}</p>
            </div>
            <p
              class="pet-page-avatar-discription__all-discription-item"
              :style="{ backgroundColor: getColores() }"
            >
              Вес: {{ petForShow.weight }}кг
            </p>
            <p
              class="pet-page-avatar-discription__all-discription-item"
              :style="{ backgroundColor: getColores() }"
            >
              Рост: {{ petForShow.height }}см
            </p>
            <p
              class="pet-page-avatar-discription__all-discription-item"
              :style="{ backgroundColor: getColores() }"
            >
              Стерилизация: {{ PetSterilization }}
            </p>
            <p
              class="pet-page-avatar-discription__all-discription-item"
              :style="{ backgroundColor: getColores() }"
            >
              Вакцинация: {{ PetVactination }}
            </p>
          </div>
          <div
            v-if="petForShow.shelter"
            class="pet-page-avatar-discription__all-discription-location"
          >
            <p>Питомец находится:</p>
            &nbsp
            <p
              class="pet-page-avatar-discription__all-discription-location-location"
            >
              {{ petForShow.shelter.description }} "{{
                petForShow.shelter.name
              }}" (г. {{ petForShow.shelter.address }})
            </p>
          </div>
          <p class="pet-page-avatar-discription__all-discription-story">
            {{ petForShow.bio }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.pet-page-avatar-discription {
  margin: 72px 0 72px 72px;
  max-width: 1500px;
  display: flex;
}

.pet-page-avatar-discription__field-for-avatar {
  width: 478px;
  height: 478px;
}

.pet-page-avatar-discription__avatar {
  width: 478px;
  height: 478px;
  object-fit: cover;
}

.pet-page-avatar-discription__discription {
  margin-left: 24px;
  font-family: "Sofia Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
}

.pet-page-avatar-discription__discription-name-age {
  font-size: 36px;
}

.pet-page-avatar-discription__discription-features {
  margin-top: 24px;
  display: flex;
}

.pet-page-avatar-discription__discription-features-feature {
  height: 30xp;
  padding: 8px;
  margin-right: 16px;
  font-size: 20px;
  border-radius: 16px;
}

.pet-page-avatar-discription__all-discription {
  margin-top: 24px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  font-size: 22px;
}

.pet-page-avatar-discription__all-discription-item {
  margin-right: 72px;
  margin-top: 32px;
  padding: 8px;
  display: flex;
  border-radius: 16px;
}

.pet-page-avatar-discription__all-discription-location {
  margin-top: 56px;
  display: flex;
  font-size: 22px;
}
.pet-page-avatar-discription__all-discription-location-location {
  color: blue;
  cursor: pointer;
}

.pet-page-avatar-discription__all-discription-story {
  margin: 56px 100px 0 0;
  font-size: 20px;
  text-align: justify;
}
</style>
