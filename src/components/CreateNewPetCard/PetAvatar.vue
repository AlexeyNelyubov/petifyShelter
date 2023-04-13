<script setup>
import { ref } from "vue";
import { useDocumentKeyUp } from "/src/composable/useDocumentKeyUp.js";

const emit = defineEmits(["change-pet-avatar"]);

const avatar = ref("");

const getAvatar = (e) => {
  const pet = JSON.stringify({
    avatar: "http://localhost:4000/img/imgcat8.jpg",
    type: "Кот",
    gender: "Мальчик",
    name: "Пушок",
    age: "2018-11-11",
    breeds: ["Турецкий ван"],
    weight: 4,
    height: 30,
    sterilized: true,
    vaccinated: true,
    features: ["общительная", "спокойная", "ласковая"],
    bio: "Пушок-отличная кошка. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    shelter: {
      id: "6736dfggfапgff",
      name: "Теремок",
      description: "Приют",
      address: "Калининград",
    },
  });
  const file = e.target.files[0];
  emit("change-pet-avatar", "avatar", file);
  const formData = new FormData();
  formData.append("newPet", pet);
  formData.append("avatar", file);
  (async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/newpet`,
      {
        method: "POST",
        body: formData,
      }
    );
  })();
};
</script>

<template>
  <main class="pet-avatar">
    <p class="pet-avatar__title">Загрузите основное фото животного</p>
    <div class="pet-avatar__download">
      <img
        src="/src/assets/images/Feed/upload.svg"
        alt="img-upload"
        width="50"
      />
      <label class="pet-avatar__label"
        >Выберите файл<input
          type="file"
          accept="image/*"
          class="pet-avatar__input"
          @change="getAvatar"
      /></label>
    </div>
    <!-- <span>или перетащите его сюда</span> -->
  </main>
</template>

<style>
.pet-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pet-avatar__title {
  margin-bottom: 16px;
  font-size: 28px;
}
.pet-avatar__download {
  width: 180px;
  height: 100px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #60b2ee;
}

.pet-avatar__label {
  margin: 12px 0;
  font-weight: bold;
  cursor: pointer;
}
.pet-avatar__input {
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
