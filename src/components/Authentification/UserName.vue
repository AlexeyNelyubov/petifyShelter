<script setup>
import { ref } from "vue";
const userName = ref("");
const isCorrectUserName = ref(false);
const colorForBorder = ref("#000");
const margin = ref("0px");

const props = defineProps({
  placeholder: {
    type: String,
    required: true,
  },
});

if (props.placeholder === "Фамилия") {
  margin.value = "24px";
}

const emit = defineEmits(["change-userName"]);

const checkInput = () => {
  if (userName.value.length) {
    colorForBorder.value = "#008000";
    isCorrectUserName.value = true;
  } else {
    isCorrectUserName.value = false;
    colorForBorder.value = "#ff0000";
  }
  emit("change-userName", userName.value, isCorrectUserName.value);
};
</script>

<template>
  <input
    type="text"
    v-model="userName"
    :placeholder="props.placeholder"
    class="userName-input"
    @focus="checkInput"
    @input="checkInput"
    @blur="checkInput"
    required
  />
</template>

<style>
.userName-input {
  height: 84px;
  width: 372px;
  margin-left: v-bind(margin);
  padding: 16px 16px 16px 24px;
  font-size: 18px;
  border: 1px solid v-bind(colorForBorder);
  outline: none;
}
</style>
