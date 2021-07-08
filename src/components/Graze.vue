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
        <!-- graze-type -->
        <div class="graze-type">
          <div @click="changeGrazeType" :class="{'active': grazeType==='Live'}">Live</div>
          <div @click="changeGrazeType" :class="{'active': grazeType==='Completed'}">Completed</div>
          <!-- switch -->
          <div class="switch-box">
            <switches v-model="stakedOnly" theme="bootstrap" color="success"></switches>
            <span>Staked only</span>
          </div>
        </div>
        <img src="../assets/images/grazing-range.svg" alt="grazing-range" class="graze-img">
      </header>
      <!-- body -->
      <article class="graze-body">
        <!-- pc -->
        <!-- mobile -->
      </article>
    </div>
    <!-- spacer -->
    <div class="spacer-50"></div>
  </div>
</template>

<script>
import Switches from 'vue-switches'

export default {
  components: {
    Switches
  },
  data() {
    return {
      grazeType: 'Live',
      // Staked only
      stakedOnly: false
    }
  },
  methods: {
    changeGrazeType(e) {
      this.grazeType = e.target.innerText
    }
  },
}
</script>

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
/* header中的几个筛选按钮 */
.graze-type {
  position: relative;
  z-index: 66;
  margin-top: 60px;
}
.graze-type>div {
  display: inline-block;
  padding: 10px 20px;
  font-weight: 700;
  color: #9ca3af;
  border-radius: 20px;
  background-color: #fff;
  cursor: pointer;
}
.graze-type>div.active {
  color: #fff;
  background-color: #31c77f;
}
/* header中的switch */
.switch-box {
  margin-left: 30px;
}
.switch-box span {
  display: inline-block;
  vertical-align: 7px;
}
.vue-switcher {
  margin-right: 10px;
}
</style>
