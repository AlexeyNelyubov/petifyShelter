<script setup>
import { computed } from "vue";

const props = defineProps({
  correctFirstName: {
    type: Boolean,
    required: true,
  },
  correctLastName: {
    type: Boolean,
    required: true,
  },
  correctEmail: {
    type: Boolean,
    required: true,
  },
  correctPassword: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["authorization"]);

const showBtn = computed(() => {
  return props.correctFirstName &&
    props.correctLastName &&
    props.correctEmail &&
    props.correctPassword
    ? false
    : true;
});
</script>

<template>
  <div>
    <button
      class="authorizationBatton"
      :disabled="showBtn"
      @click="$emit('authorization')"
    >
      Зарегистрироваться
    </button>
  </div>
</template>

<style>
.authorizationBatton {
  font: inherit;
  height: 84px;
  width: 258px;
  font-size: 20px;
  font-weight: 400;
  background-color: #60b2ee;
  border: none;
}

.authorizationBatton:disabled {
  opacity: 0.5;
}
</style>
