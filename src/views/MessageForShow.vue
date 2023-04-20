<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  loader: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <main class="message-for-show">
    <p>{{ props.message }}</p>
    <div v-if="props.loader" class="loader"></div>
    <p v-if="props.loader" class="loader-message">
      * Сервер размещён на бесплатном хостинге render.com. В связи с этим сервер
      каждые 15минут бездействия уходит в спящий режим, и для восстановления
      подключения требуется некоторое время.
    </p>
  </main>
</template>

<style>
.message-for-show {
  position: fixed;
  top: 96px;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 132px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 26px;
}
.loader {
  width: 50px;
  height: 50px;
  margin-top: 24px;
  border: 5px solid #d9d9d9;
  border-top: 5px solid #60b2ee;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loader-message {
  position: absolute;
  bottom: 344px;
  font-size: 16px;
}
</style>
