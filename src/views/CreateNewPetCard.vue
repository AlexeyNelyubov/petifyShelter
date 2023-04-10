<script setup>
import { ref, watch, computed } from "vue";
import MessageForShow from "@/views/MessageForShow.vue";
import FillNewPetCard from "@/components/CreateNewPetCard/FillNewPetCard.vue";
import ShowNewPetCard from "@/components/CreateNewPetCard/ShowNewPetCard.vue";
import AuthentificationButton from "@/components/Authentification/AuthentificationButton.vue";
import { useUserStore } from "@/stores/userStore.js";
const userStore = useUserStore();

const showError = ref("");
const newPet = ref({});
const type = ref("");
const gender = ref("");
const name = ref("");
const age = ref("");
const breeds = ref("");
const weight = ref("");
const height = ref("");
const sterilized = ref(false);
const vaccinated = ref(false);
const features = ref("");
const bio = ref("");
const location = ref("");
const ava = ref("");
const isFullPetCard = computed(() => {
  return Object.keys(newPet.value).length === 13 ? true : false;
});

const item = ref("type");
const currentItem = ref("");

watch(sterilized, () => {
  console.log(sterilized.value);
});
watch(name, () => {
  console.log(name.value);
});

if (localStorage.getItem("newPet")) {
  const allItemsNewPet = JSON.parse(localStorage.getItem("newPet"));
  for (let itemType in allItemsNewPet) {
    newPet.value[itemType] = allItemsNewPet[itemType];
  }
}
// const newPet = {
//      name: name.value
//   sterilized: sterilized.value,
// };
// setTimeout(() => {
//   trans.value = true;
// }, 1000);
const getNewItem = (item, value) => {
  if (item !== "avatar") {
    newPet.value[item] = value;
    localStorage.setItem("newPet", JSON.stringify(newPet.value));
    console.log(newPet.value);
  } else {
    const formData = new FormData();
    formData.append("avatar", file);
  }
};

// const createNewPetCard = () => {
//   const pet = {
//     avatar: "http://localhost:4000/img/imgcat8.jpg",
//     type: "Кот",
//     gender: "Мальчик",
//     name: "Пушок",
//     age: "2018-11-11",
//     breeds: ["Турецкий ван"],
//     weight: 4,
//     height: 30,
//     sterilized: true,
//     vaccinated: true,
//     features: ["общительная", "спокойная", "ласковая"],
//     bio: "Пушок-отличная кошка. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
//     shelter: {
//       id: "6736dfggfапgff",
//       name: "Теремок",
//       description: "Приют",
//       address: "Калининград",
//     },
//   };
//   (async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_SERVER_URL}/api/v1/newpet`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(pet),
//         }
//       );
//       const json = await response.json();
//       if (response.ok) {
//         console.log(json);
//         localStorage.remooveItem("newPet");
//       } else {
//         console.log(json);
//         showError.value =
//           "Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз.";
//       }
//     } catch (error) {
//       console.error(error.message);
//       showError.value =
//         "Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз.";
//     }
//   })();
// };
</script>

<template>
  <main class="new-pet-card">
    <div
      class="new-pet-card-information-sign"
      v-if="!userStore.authentificated"
    >
      <p>Вы находитесь в демо режиме.</p>
      <p>Для создания карточки необходимо авторизироваться.</p>
    </div>
    <MessageForShow v-if="showError" :message="showError" />
    <FillNewPetCard
      v-if="!showError"
      @change-item="getNewItem"
      :currentItem="currentItem"
    />
    <ShowNewPetCard
      v-if="!showError"
      :newPet="newPet"
      @get-current-item="(item) => (currentItem = item)"
    />
    <AuthentificationButton
      v-if="isFullPetCard"
      :buttonName="'Создать'"
      :isCorrectNewUserInformation="true"
      @authentification="createNewPetCard"
    />
  </main>
</template>

<style>
.new-pet-card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.new-pet-card-information-sign {
  position: absolute;
  top: -100px;
  left: 0;
  height: 65px;
  width: 100%;
  margin: 96px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
}
/* .new-pets-card-title-enter-active {
  animation: bounce-in 2.5s;
}

@keyframes bounce-in {
  from {
    font-size: 50px;
  }
  to {
    font-size: 30px;
  }
} */

/* .new-pets-card-pets-type-enter-active,
.new-pets-card-pets-type-leave-active {
  transition: opacity 1.5s ease;
}

.new-pets-card-pets-type-enter-from,
.new-pets-card-pets-type-leave-to {
  opacity: 0;
}

.new-pets-card-pets-name-enter-active,
.new-pets-card-pets-name-leave-active {
  transition: opacity 1.5s ease;
}

.new-pets-card-pets-name-enter-from,
.new-pets-card-pets-type-leave-to {
  opacity: 0;
}



.new-pets-card__fill {
  margin: 76px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Sofia Sans", sans-serif;
}

.new-pets-card__fill-title {
  margin-bottom: 24px;
  font-size: 30px;
  font-weight: bold;
}

.new-pets-card__done {
  align-self: flex-start;
  max-width: 500px;
  margin: 76px 24px 76px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 24px;
} */
</style>
