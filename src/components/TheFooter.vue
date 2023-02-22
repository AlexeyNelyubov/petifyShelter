<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <footer class="footer">
    <div class="footer__logo-discription">
      <div class="footer__logo-discription-logo">
        <img
          alt="petify logo"
          src="@/assets/images/Footer/logoptf.svg"
          width="23"
          height="24"
        />
        <p class="footer__logo-discription-logo-sign">petify</p>
      </div>
      <div class="footer__logo-discription-discription">
        <p>Помогаем вам одомашнивать животных.</p>
        <p>Агрегатор приютов / p2p pet sharing.</p>
      </div>
    </div>
    <div class="footer__socialmedia">
      <RouterLink
        to="/NewFreature(aboutAs)"
        class="footer__socialmedia-aboutAs"
      >
        <p>Форма</p>
        <p>обр.</p>
        <p>связи</p>
      </RouterLink>
      <a href="" class="footer__socialmedia-link">
        <img
          alt="imgapple"
          src="@/assets/images/Footer/imgfacebook.svg"
          width="44"
          height="44"
        />
      </a>
      <a href="" class="footer__socialmedia-link">
        <img
          alt="imgfacebook"
          src="@/assets/images/Footer/imgvk.svg"
          width="44"
          height="44"
        />
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  height: 234px;
  display: flex;
  justify-content: space-between;
}
.footer__logo-discription {
  margin-top: 64px;
  margin-left: 80px;
  display: flex;
  flex-direction: column;
}
.footer__logo-discription-logo {
  display: flex;
  align-items: center;
}
.footer__logo-discription-logo-sign {
  margin-left: 8px;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 32px;
  letter-spacing: -0.015em;
}
.footer__logo-discription-discription {
  margin-left: 32px;
  margin-top: 16px;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: -0.015em;
}
.footer__socialmedia {
  display: flex;
  align-items: center;
  margin-right: 80px;
}
.footer__socialmedia-aboutAs {
  margin-left: 24px;
  font-family: "Epilogue";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 16px;
  letter-spacing: -0.015em;
  text-decoration: none;
  text-align: center;
}
.footer__socialmedia-aboutAs:visited {
  text-decoration: none;
  color: #000;
}
.footer__socialmedia-link {
  margin-left: 24px;
}
</style>
