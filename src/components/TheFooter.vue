<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="wrapper-footer">
    <div class="wrapper-logo-discription">
      <div class="logo">
        <img
          alt="petify logo"
          src="../assets/footer/logoptf.svg"
          width="23"
          height="24"
        />
        <span class="logo-sign">petify</span>
      </div>
      <div class="logo-discription">
        <span>Помогаем вам одомашнивать животных.</span>
        <span>Агрегатор приютов / p2p pet sharing.</span>
      </div>
    </div>
    <div class="wrapper-for-socialmedia">
      <RouterLink to="/NewFreature(aboutAs)" class="aboutAs">
        <span>Форма</span>
        <span>обр.</span>
        <span>связи</span>
      </RouterLink>
      <a href="" class="link-socialmedia">
        <img
          alt="imgapple"
          src="../assets/footer/imgfacebook.svg"
          width="44"
          height="44"
        />
      </a>
      <a href="" class="link-socialmedia">
        <img
          alt="imgfacebook"
          src="../assets/footer/imgvk.svg"
          width="44"
          height="44"
        />
      </a>
    </div>
  </div>
</template>

<style scoped>
.wrapper-footer {
  display: flex;
  justify-content: space-between;
  height: 234px;
  box-sizing: border-box;
}

.wrapper-logo-discription {
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  margin-top: 64px;
  margin-left: 80px;
}

.logo-sign {
  margin-left: 8px;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 32px;
  letter-spacing: -0.015em;
}

.wrapper-for-socialmedia {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 80px;
}

.logo-discription {
  display: flex;
  flex-direction: column;
  margin-left: 112px;
  margin-top: 16px;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: -0.015em;
}

.aboutAs {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 24px;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 16px;
  letter-spacing: -0.015em;
  text-decoration: none;
}

.aboutAs:visited {
  text-decoration: none;
  color: #000;
}

.link-socialmedia {
  margin-left: 24px;
}
</style>
