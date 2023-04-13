<script setup>
const props = defineProps({
  typeAuth: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="authentification-apple-facebook-google">
    {{ props.typeAuth }}
    <img
      src="/src/assets/images/SignInUp/imgapple.svg"
      alt="logo-apple"
      class="authentification__logo"
    />
    <img
      src="/src/assets/images/SignInUp/imgfacebook.svg"
      alt="logo-facebook"
      class="authentification__logo"
    />
    <img
      src="/src/assets/images/SignInUp/imggoogle.svg"
      alt="logo-google"
      class="authentification__logo"
    />
  </div>
</template>

<style>
.authentification-apple-facebook-google {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 30px;
}

.authentification__logo {
  height: 40px;
  width: 40px;
  margin-left: 20px;
}
</style>
