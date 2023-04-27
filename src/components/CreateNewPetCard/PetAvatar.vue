<script setup>
const emit = defineEmits(["change-pet-avatar"]);

const getAvatar = (e) => {
  const file = e.target.files[0];
  emit("change-pet-avatar", "avatar", file);
};
</script>

<template>
  <main class="pet-avatar">
    <p class="pet-avatar__title">Загрузите основное фото питомца</p>
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
