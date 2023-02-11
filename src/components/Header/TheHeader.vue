<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import HeaderGeolocation from "./HeaderGeolocation.vue";
import HeaderPartForGuest from "./HeaderPartForGuest.vue";
import HeaderPartForUser from "./HeaderPartForUser.vue";

const authorization = ref(false);
const showMenuForUser = ref(false);
</script>

<template>
  <div class="wrapper-header">
    <RouterLink to="/" class="logo-link"
      ><img alt="petify logo" src="src/assets/header/logoptf.svg " />
      <span class="logo-sign">petify</span></RouterLink
    >
    <div class="wrapper-right-part-header">
      <div
        @pointerover="showMenuForUser = true"
        @pointerleave="showMenuForUser = false"
      >
        <HeaderGeolocation />
      </div>
      <div>
        <HeaderPartForGuest
          v-if="!authorization"
          @change-authorization="authorization = true"
        />
        <HeaderPartForUser
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
  background-color: #fff;
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

.logo-sign {
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
