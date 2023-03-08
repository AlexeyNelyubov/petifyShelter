<script setup>
import { computed } from "vue";

const props = defineProps({
  showSign: {
    type: String,
    required: true,
  },
});

const color = computed(() => {
  return props.showSign === "Пользователь с таким email уже зарегистрирован"
    ? "#ff0000"
    : "#008000";
});
</script>

<template>
  <div class="enformation-field">
    {{ props.showSign }}
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
  background-color: v-bind(color);
  border: none;
}
</style>
