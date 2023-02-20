<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import HeaderUser from "@/components/Header/User.vue";
import HeaderGeolocation from "@/components/Header/Geolocation.vue";

const showMenuForUser = ref(false);
</script>

<template>
  <header class="header">
    <RouterLink to="/" class="header__logo-link">
      <img alt="petify" src="@/assets/images/Header/logoptf.svg" />
      <span class="header__logo-link-sign">petify</span>
    </RouterLink>
    <div class="header-geolocation-authorization">
      <div
        class="header-geolocation-authorization__geolocation"
        @pointerover="showMenuForUser = true"
        @pointerleave="showMenuForUser = false"
      >
        <HeaderGeolocation />
      </div>
      <div class="header-geolocation-authorization__authorization">
        <HeaderUser :showMenuForUser="showMenuForUser" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 96px;
  padding: 0px 48px;
  background-color: #fff;
}

.header__logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.header__logo-link:visited {
  text-decoration: none;
  color: #000;
}

.header__logo-link-sign {
  margin-left: 8px;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 29px;
  letter-spacing: -0.015em;
}

.header-geolocation-authorization {
  display: flex;
  align-items: center;
}
</style>
