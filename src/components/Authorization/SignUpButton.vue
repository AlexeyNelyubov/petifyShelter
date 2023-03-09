<script setup>
import { computed } from "vue";

const props = defineProps({
  isCorrectNewUserInformation: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["signUp"]);

const showBtn = computed(() => {
  return props.isCorrectNewUserInformation ? false : true;
});
</script>

<template>
  <div>
    <button class="signUp-button" :disabled="showBtn" @click="$emit('signUp')">
      Зарегистрироваться
    </button>
  </div>
</template>

<style>
.signUp-button {
  font: inherit;
  height: 84px;
  width: 258px;
  font-size: 20px;
  font-weight: 400;
  color: #fff;
  background-color: #60b2ee;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.signUp-button:disabled {
  opacity: 0.5;
}
</style>
