<script setup>
import { computed } from "vue";

const props = defineProps({
  buttonName: {
    type: String,
    required: true,
  },
  isCorrectNewUserInformation: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["signUp", "signIn", "recovery"]);

const showBtn = computed(() => {
  return props.isCorrectNewUserInformation ? false : true;
});
</script>

<template>
  <div>
    <button
      v-if="props.buttonName === 'Зарегистрироваться'"
      class="signUp-signIn-button"
      :disabled="showBtn"
      @click="$emit('signUp')"
    >
      {{ props.buttonName }}
    </button>
    <button
      v-if="props.buttonName === 'Войти'"
      class="signUp-signIn-button"
      :disabled="showBtn"
      @click="$emit('signIn')"
    >
      {{ props.buttonName }}
    </button>
    <button
      v-if="props.buttonName === 'Восстановить'"
      class="signUp-signIn-button"
      :disabled="showBtn"
      @click="$emit('recovery')"
    >
      {{ props.buttonName }}
    </button>
  </div>
</template>

<style>
.signUp-signIn-button {
  font: inherit;
  height: 84px;
  width: 258px;
  font-size: 20px;
  font-weight: 400;
  color: #fff;
  text-align: center;
  background-color: #60b2ee;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.signUp-signIn-button:disabled {
  opacity: 0.5;
}
</style>
