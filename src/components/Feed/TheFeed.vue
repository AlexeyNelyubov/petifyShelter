<script setup>
import { ref } from "vue";

const PetsList = ref([]);

(async () => {
  //let response = await fetch("src/assets/feed/Pets.json");
  //let response = await fetch("/api/pets");
  let response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/v1/pets`);
  let json = await response.json();

  if (response.ok) {
    for (let pet of json) {
      PetsList.value.push(pet);
    }
  } else {
    console.log("error", json);
  }
})();
</script>

<template>
  <div class="wrapper-for-card">
    <div v-for="pet in PetsList" :key="pet.id">
      <div class="wrapper-for-avatar">
        <img :src="pet.avatar" class="pets-avatar" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper-for-card {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.wrapper-for-avatar {
  width: 300px;
  height: 250px;
  margin: 0 30px 30px 0;
}

.pets-avatar {
  width: 300px;
  height: 250px;
  object-fit: cover;
}
</style>
