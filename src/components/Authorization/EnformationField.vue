<script setup>
import { computed } from "vue";

const props = defineProps({
  showSignUpInformation: {
    type: String,
    required: true,
  },
});

const colorForSignUpInformation = computed(() => {
  return props.showSignUpInformation ===
    "Пользователь с таким email уже существует"
    ? "#ff0000"
    : "#00BC22";
});
</script>

<template>
  <div class="enformation-field">
    {{ props.showSignUpInformation }}
  </div>
</template>

<style>
.enformation-field {
  height: 84px;
  width: 510px;
  margin-left: 24px;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 400;
  color: #fff;
  background-color: v-bind(colorForSignUpInformation);
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
