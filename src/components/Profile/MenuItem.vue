<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
const props = defineProps({
  item: {
    type: String,
    required: true,
  },
  dropDownSign: {
    type: String,
  },
  starimg: {
    type: Boolean,
    required: false,
  },
  pageNameForRoute: {
    type: String,
    required: false,
  },
});

const showDropDown = ref(false);
</script>

<template>
  <div class="menu-item">
    <p
      v-if="!props.pageNameForRoute"
      class="menu-item__sign"
      @pointerover="showDropDown = true"
      @pointerleave="showDropDown = false"
    >
      {{ props.item }}
    </p>
    <RouterLink
      v-if="props.pageNameForRoute"
      :to="{ name: `${props.pageNameForRoute}` }"
      class="menu-item__sign-router"
      @pointerover="showDropDown = true"
      @pointerleave="showDropDown = false"
    >
      {{ props.item }}
    </RouterLink>
    <div lang="ru" v-if="showDropDown" class="menu-item__sign__drop-down">
      {{ props.dropDownSign }}
      <img
        v-if="props.starimg"
        class="menu-item__sign__drop-down__img-star"
        src="@/assets/images/Feed/blueStar.svg"
        alt="imgstar"
        width="22"
      />
    </div>
  </div>
</template>

<style>
.menu-item__sign {
  margin: 8px 0;
  color: #000;
}

.menu-item__sign:hover {
  color: #9d9d9d;
  cursor: pointer;
}

.menu-item__sign-router {
  color: #000;
  text-decoration: none;
}

.menu-item__sign-router:visited {
  color: #000;
  text-decoration: none;
}

.menu-item__sign-router:hover {
  color: #9d9d9d;
  cursor: pointer;
  text-decoration: none;
}

.menu-item__sign__drop-down {
  position: absolute;
  width: 210px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  hyphens: auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 15px #d9d9d9;
}
.menu-item__sign__drop-down__img-star {
  position: absolute;
  top: 86px;
  left: 115px;
}
</style>
