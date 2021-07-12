<template>
  <div class="farm">
    <header class="farm-header">
      <div class="talk">
        <span>
          Take your yield to new heights
        </span>
        <span class="bg-white">
          <span class="del-line">3x</span>
          <span class="big-green">6x</span>
        </span>
        <!-- 三角 -->
        <div class="triangle"></div>
      </div>
      <img src="../assets/images/FarmerAlpaca.svg" alt="FarmerAlpaca" class="FarmerAlpaca float-right" style="margin-left: 30px;">
    </header>
  </div>
</template>

<style>
.farm-header {
  display: flex;
}
.farm-header .talk {
  position: relative;
  width: 600px;
  height: 100px;
  line-height: 100px;
  font-size: 24px;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  background-color: #000;
}
.farm-header .talk>.triangle {
  position: absolute;
  top: 25px;
  right: -50px;
  width: 50px;
  height: 50px;
  border: 25px solid;
  border-left-color: #000;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
}
.bg-white {
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #fff;
}
.del-line {
  margin-right: 5px;
  color: #000;
  text-decoration: line-through;
}
.big-green {
  font-weight: 700;
  color: #31c77f;
}
</style>
