<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import PartForGuestHeader from "./PartForGuestHeader.vue";
import PartForUserHeader from "./PartForUserHeader.vue";
import GeolocationHeader from "./GeolocationHeader.vue";

const authorization = ref(false);
const showMenuForUser = ref(false);
</script>

<template>
  <div class="wrapper-header">
    <RouterLink to="/" class="logo-link"
      ><img alt="petify logo" src="src/assets/header/logoptf.svg " />
      <span>petify</span></RouterLink
    >
    <div class="wrapper-right-part-header">
      <div
        @pointerover="showMenuForUser = true"
        @pointerleave="showMenuForUser = false"
      >
        <geolocation-header />
      </div>
      <div>
        <part-for-guest-header
          v-if="!authorization"
          @change-authorization="authorization = true"
        />
        <part-for-user-header
          v-if="authorization"
          @change-authorization="authorization = false"
          :showMenuForUser="showMenuForUser"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 96px;
  padding: 0px 48px;
  box-sizing: border-box;
  background-color: #ffffff;
  --color: #d9d9d9;
  --color-hover: #ffffff;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-link:visited {
  text-decoration: none;
  color: #000;
}

span {
  margin-left: 8px;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 29px;
  letter-spacing: -0.015em;
}

.wrapper-right-part-header {
  display: flex;
  align-items: center;
}
</style>
