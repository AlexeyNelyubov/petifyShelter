<script setup>
import { ref, computed, watch } from "vue";
import MessageForShow from "/src/views/MessageForShow.vue";
import FillNewPetCard from "/src/components/CreateNewPetCard/FillNewPetCard.vue";
import ShowNewPetCard from "/src/components/CreateNewPetCard/ShowNewPetCard.vue";
import AuthentificationButton from "/src/components/Authentification/AuthentificationButton.vue";
import { useUserStore } from "/src/stores/userStore.js";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const showError = ref("");
const newPet = ref({});
// const type = ref("");
// const gender = ref("");
// const name = ref("");
// const age = ref("");
// const breeds = ref("");
// const weight = ref("");
// const height = ref("");
// const sterilized = ref(false);
// const vaccinated = ref(false);
// const features = ref("");
// const bio = ref("");
// const location = ref("");
const ava = ref();
const changeItem = ref(true);
const isFullPetCard = ref(false);
// const isFullPetCard = computed(() => {
//   return Object.keys(newPet.value).length === 5 ? true : false;
// });

watch(newPet.value, () => {
  if (Object.keys(newPet.value).length === 5) {
    isFullPetCard.value = true;
    changeItem.value = false;
  }
  console.log(newPet.value);
});

// const item = ref("type");
const currentItem = ref("");
watch(currentItem, () => {
  changeItem.value = true;
  // console.log(changeItem.value);
  // console.log(newPet.value[changeItem.value]);
  // newPet.value[currentItem.value] = "";
});

if (localStorage.getItem("newPet")) {
  const allItemsNewPet = JSON.parse(localStorage.getItem("newPet"));
  for (let itemType in allItemsNewPet) {
    if (itemType !== "avatar") {
      newPet.value[itemType] = allItemsNewPet[itemType];
    }
  }
  console.log(newPet.value);
}

const getNewItem = (item, value) => {
  console.log(item, value);
  if (item !== "avatar") {
    newPet.value[item] = value;
    localStorage.setItem("newPet", JSON.stringify(newPet.value));
  } else {
    newPet.value[item] = true;
    localStorage.setItem("newPet", JSON.stringify(newPet.value));
    ava.value = value;
  }
};

const createNewPetCard = () => {
  const pet = JSON.stringify(newPet.value);
  const formData = new FormData();
  formData.append("newPet", pet);
  formData.append("avatar", ava.value);
  (async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/pet/add-pet`,
        {
          method: "POST",
          body: formData,
        }
      );
      const json = await response.json();
      if (response.ok) {
        console.log(json);
        localStorage.removeItem("newPet");
        router.push({ name: "IndexPage" });
        // name: 'PetPage', params: { id: `${json._id}` }
      } else {
        console.log(json);
        showError.value =
          "Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз.";
        newPet.value = {};
      }
    } catch (error) {
      console.error(error.message);
      showError.value =
        "Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз.";
      newPet.value = {};
    }
  })();
};
</script>

<template>
  <main class="new-pet-card">
    <div
      class="new-pet-card__information-sign"
      v-if="!userStore.authentificated"
    >
      <p>Вы находитесь в демо режиме.</p>
      <p>Для создания карточки необходимо авторизироваться.</p>
    </div>
    <MessageForShow v-if="showError" :message="showError" />
    <FillNewPetCard
      v-if="!showError && (!isFullPetCard || changeItem)"
      @change-item="getNewItem"
      :currentItem="currentItem"
    />
    <div
      v-if="newPet.type"
      :class="{
        'new-pet-card__show-pet-card': !isFullPetCard,
        'new-pet-card__ready-to-create': isFullPetCard,
      }"
    >
      <ShowNewPetCard
        :newPet="newPet"
        :changeSize="isFullPetCard"
        @get-current-item="(item) => (currentItem = item)"
      />
      <AuthentificationButton
        v-if="isFullPetCard && !changeItem"
        :buttonName="'Создать'"
        :isCorrectNewUserInformation="userStore.authentificated"
        @authentification="createNewPetCard"
      />
    </div>
  </main>
</template>

<style>
.new-pet-card {
  position: relative;
  display: flex;
  justify-content: center;
}
.new-pet-card__information-sign {
  position: absolute;
  top: -100px;
  left: 0;
  height: 65px;
  width: 100%;
  margin: 96px auto;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
}

.new-pet-card__show-pet-card {
  align-self: flex-start;
}

/* .new-pet-card__ready-to-create {
  position: absolute;
  background-color: aquamarine;
} */
</style>
