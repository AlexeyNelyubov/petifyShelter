<script setup>
import { ref, watch } from "vue";
import PetType from "/src/components/CreateNewPetCard/PetType.vue";
import PetGender from "/src/components/CreateNewPetCard/PetGender.vue";
import PetName from "/src/components/CreateNewPetCard/PetName.vue";
import PetBreed from "/src/components/CreateNewPetCard/PetBreed.vue";
import PetAvatar from "/src/components/CreateNewPetCard/PetAvatar.vue";

const props = defineProps({
  currentItem: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["change-item"]);

const nextItem = ref("type");

const changeItem = (item, value) => {
  emit("change-item", item, value);
};

watch(
  () => props.currentItem,
  () => (nextItem.value = props.currentItem)
);
</script>

<template>
  <div class="new-pet-card-fill">
    <Transition appear name="new-pet-card-title">
      <p class="new-pet-card-fill__title">Создание карточки питомца</p>
    </Transition>
    <Transition appear name="new-pet-card-fill-item">
      <PetType
        v-if="nextItem === 'type'"
        @change-pet-type="
          (item, value) => {
            changeItem(item, value), (nextItem = 'gender');
          }
        "
      />
    </Transition>
    <Transition name="new-pet-card-fill-item">
      <PetGender
        v-if="nextItem === 'gender'"
        @change-pet-gender="
          (item, value) => {
            changeItem(item, value), (nextItem = 'name');
          }
        "
      />
    </Transition>
    <Transition name="new-pet-card-fill-item">
      <PetName
        v-if="nextItem === 'name'"
        @change-pet-name="
          (item, value) => {
            changeItem(item, value), (nextItem = 'breeds');
          }
        "
      />
    </Transition>
    <Transition name="new-pet-card-fill-item">
      <PetBreed
        v-if="nextItem === 'breeds'"
        @change-pet-breeds="
          (item, value) => {
            changeItem(item, value), (nextItem = 'avatar');
          }
        "
      />
    </Transition>
    <Transition name="new-pet-card-fill-item">
      <PetAvatar
        v-if="nextItem === 'avatar'"
        @change-pet-avatar="
          (item, value) => {
            changeItem(item, value), (nextItem = 'type');
          }
        "
      />
    </Transition>
  </div>
</template>

<style>
.new-pet-card-fill {
  padding: 152px 76px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Sofia Sans", sans-serif;
}

.new-pet-card-fill__title {
  margin-bottom: 24px;
  font-size: 30px;
  font-weight: bold;
}

.new-pet-card-title-enter-active {
  animation: title 1.5s;
}

@keyframes title {
  from {
    transform: scale(2);
  }
  to {
    transform: scale(1);
  }
}

.new-pet-card-fill-item-enter-active {
  transition: opacity 1.5s ease;
}

.new-pet-card-fill-item-enter-from {
  opacity: 0;
}
</style>
