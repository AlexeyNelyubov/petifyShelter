<script setup>
import { ref } from "vue";
import { usePetsStore } from "@/stores/petsList.js";
const PetsStore = usePetsStore();

const props = defineProps({
  id: String,
});

const petForShow = ref({});
const showError = ref(false);
const showNoPet = ref(false);

if (PetsStore.petsList.length) {
  for (let pet of PetsStore.petsList) {
    if (pet.id === props.id) {
      petForShow.value = pet;
    }
  }
} else {
  (async () => {
    let response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/pet/${props.id}`
    );
    let json = await response.json();
    console.log(json);
    if (json === "error") {
      showError.value = true;
    } else {
      if (json === "pet not found") {
        showNoPet.value = true;
      } else {
        petForShow.value = json;
      }
    }
  })();
}
</script>

<template>
  <div class="pet-card">
    <div v-if="showError">Eror Server</div>
    <div v-if="showNoPet">
      По вашему id животных в нашем каталоге не найдено. Попробуйте изменить id
      или начните поиск на главной странице с помощью фильтров.
    </div>
    <div v-if="!showError && !showNoPet" class="pet-card__field-for-avatar">
      <img
        :src="petForShow.avatar"
        alt="img-profile"
        class="pet-card__avatar"
      />
    </div>
  </div>
</template>

<style>
.pet-card__field-for-avatar {
  width: 478px;
  height: 478px;
}

.pet-card__avatar {
  width: 478px;
  height: 478px;
  object-fit: cover;
}
</style>
