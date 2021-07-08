<template>
  <div class="graze">
    <!-- mobile-header -->
    <div class="hidden-md hidden-lg graze-m-header">
      <h3>Grazing Range</h3>
      <span>The Grazing Range is where</span>
      <span>the herd can come to graze</span>
      <span>on rare crops.</span>
      <span>Stake your ibALPACA to earn</span>
      <span>rewards of your choice.</span>
      <span>No risks. High APYs. Happy Alpacas.</span>
      <img src="../assets/images/grazing-range.svg" alt="grazing-range" class="graze-m-img">
    </div>
    <div class="content">
      <!-- pc-header -->
      <header class="graze-header hidden-xs hidden-sm">
        <h2>Grazing Range</h2>
        <span>The Grazing Range is where the herd can come to graze on rare crops.</span>
        <span>Stake your ibALPACA to earn rewards of your choice.</span>
        <span>No risks. High APYs. Happy Alpacas.</span>
        <div class="graze-type">
          <div>Live</div>
          <div>Completed</div>
        </div>
        <img src="../assets/images/grazing-range.svg" alt="grazing-range" class="graze-img">
      </header>
      <!-- body -->
      <article class="graze-body">

      </article>
    </div>
    <!-- spacer -->
    <div class="spacer-50"></div>
  </div>
</template>

<style>
.graze {
  padding-right: 50px;
}
.graze .content {
  padding: 50px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 3px 5px 5px #ccc;
}
.graze .content h2 {
  position: relative;
  z-index: 66;
  font-size: 24px;
  font-weight: 700;
}
/* graze-header */
.graze-header {
  position: relative;
}
.graze-header span {
  position: relative;
  z-index: 66;
  display: block;
  font-size: 16px;
}
.graze-img {
  position: absolute;
  z-index: 0;
  top: -10px;
  right: 30px;
  width: 448px;
  height: 360px;
}
@media screen and (max-width: 992px) {
  .graze {
    padding: 0 10px;
  }
  .content {
    position: relative;
    z-index: 10;
  }
}
.graze-m-header {
  position: relative;
  padding-bottom: 10px;
}
.graze-m-header h3 {
  font-size: 16px;
  font-weight: 700;
}
.graze-m-header span {
  display: block;
  font-size: 12px;
}
.graze-m-img {
  width: 208px;
  height: 167px;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
