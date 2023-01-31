<template>
  <div class="wrapper-filters">FILTERS</div>
  <!-- <div class="wrapper-filters">
    <div class="square">
      <div class="single-feature"></div>
      <div class="single-feature"></div>
    </div>
  </div> -->
</template>

<style scoped>
.wrapper-filters {
  background-color: rgb(122, 104, 104);
}
.square {
  margin-left: auto;
  margin-right: auto;
  height: 64px;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgb(255, 0, 0);
}

.single-feature {
  position: relative;
  height: 28px;
  margin-right: 4px;
  padding: 4px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: blueviolet;
}
</style>
