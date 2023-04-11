<script setup>
import { ref, watch } from "vue";
import PetType from "@/components/CreateNewPetCard/PetType.vue";
import PetGender from "@/components/CreateNewPetCard/PetGender.vue";
import PetName from "@/components/CreateNewPetCard/PetName.vue";
import PetAvatar from "@/components/CreateNewPetCard/PetAvatar.vue";

const props = defineProps({
  currentItem: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["change-item"]);

const validateError = ref("");
const nextItem = ref("type");

const changeItem = (item, value) => {
  console.log(item, value);
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
            changeItem(item, value), (nextItem = 'avatar');
          }
        "
        @validate-error="(error) => (validateError = error)"
      />
    </Transition>
    <div class="new-pet-card-fill__enformation-sign" v-if="validateError">
      * {{ validateError }}
    </div>
    <Transition name="new-pet-card-fill-item">
      <PetAvatar
        v-if="nextItem === 'avatar'"
        @change-pet-avatar="
          (item, value) => {
            changeItem(item, value), (nextItem = 'type');
          }
        "
      />
      <!-- <div class="new-pet-card-fill__avatar">
      <img src="@/assets/images/Feed/upload.svg" alt="img-upload" width="50" />
      <label class="new-pet-card-fill__avatar-label"
        >Выберите файл<input
          type="file"
          accept="image/*"
          class="new-pet-card-fill__avatar-input"
          @change="getAvatar"
      /></label>
      <span>или перетащите его сюда</span>
    </div> -->
    </Transition>
  </div>
</template>

<style>
.new-pet-card-fill {
  position: relative;
  margin: 76px;
  height: 150px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Sofia Sans", sans-serif;
}

.new-pet-card-fill__title {
  position: absolute;
  top: -50px;
  margin-bottom: 24px;
  font-size: 30px;
  font-weight: bold;
  /* z-index: 2; */
}

.new-pet-card-fill__enformation-sign {
  position: absolute;
  top: 150px;
  width: 768px;
}

.new-pet-card-title-enter-active {
  animation: title 1.5s;
}

@keyframes title {
  from {
    font-size: 50px;
  }
  to {
    font-size: 30px;
  }
}

.new-pet-card-fill-item-enter-active {
  transition: opacity 1.5s ease;
}

.new-pet-card-fill-item-enter-from {
  opacity: 0;
}
</style>

<!-- .new-pet-card-fill-item-enter-active {
  animation: item 3s;
}

.new-pet-card-fill-item-leave-active {
  animation: item 1.5s reverse;
}

@keyframes item {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
} -->

<!-- .new-pet-card-fill-pet-type-leave-from {
  transition: opacity 5s ease;
}

.new-pet-card-fill-pet-type-leave-to {
  opacity: 0;
} */

/* .new-pet-card-fill-pet-type-enter-active,
.new-pet-card-fill-pet-type-leave-active {
  transition: opacity 3s ease;
}

.new-pet-card-fill-pet-type-enter-from,
.new-pet-card-fill-pet-type-leave-to {
  opacity: 0;
}  -->
