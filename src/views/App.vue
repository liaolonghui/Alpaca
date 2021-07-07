// App页面
<template>
  <div class="myapp">
    <!-- header -->
    <header class="app-header">
      <!-- logo -->
      <span class="logo">
        <img src="../assets/images/logo.png" width="320" height="60" class="hidden-xs">
        <img src="../assets/images/logo-mob.svg" width="135" height="49" class="hidden-sm hidden-md hidden-lg">
      </span>
      <!-- btn -->
      <span class="btn-box">
        <!-- connect-btn -->
        <button data-toggle="modal" data-target="#myModal" class="btn btn-default hidden-xs">Connect to a wallet</button>
        <button class="set-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M29.56,19.36a1,1,0,0,0-1.21.07A10.49,10.49,0,0,1,21.51,22,10.17,10.17,0,0,1,11.2,12a9.94,9.94,0,0,1,4.28-8.1,1,1,0,0,0,.36-1.17,1,1,0,0,0-1-.64A14.1,14.1,0,0,0,2,16,14.21,14.21,0,0,0,16.37,30a14.34,14.34,0,0,0,13.57-9.44A1,1,0,0,0,29.56,19.36ZM16.37,28A12.2,12.2,0,0,1,4,16,12,12,0,0,1,11.57,4.89,11.82,11.82,0,0,0,9.2,12,12.17,12.17,0,0,0,21.51,24a12.49,12.49,0,0,0,4.89-1A12.5,12.5,0,0,1,16.37,28Z" data-name="Layer 46"></path></svg>
        </button>
        <button class="set-btn">
          <svg viewBox="64 64 896 896" focusable="false" data-icon="setting" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z"></path></svg>
        </button>
        <!-- list-btn -->
        <button @click="showOrHideLink" class="set-btn hidden-lg hidden-md">
          <svg viewBox="64 64 896 896" focusable="false" data-icon="align-right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M904 158H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 424H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 212H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-424H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"></path></svg>
        </button>
      </span>
      <!-- connect-btn -->
      <button data-toggle="modal" data-target="#myModal" class="btn btn-default hidden-lg hidden-md hidden-sm center-h">Connect to a wallet</button>
      <!-- routers -->
      <ul class="routers hidden-md hidden-lg" style="display: none;" ref="routers">
        <router-link to="/lend" tag="li" class="active">Lend</router-link>
        <router-link to="/grazing-range" tag="li">Graze</router-link>
        <router-link to="/farm" tag="li">Farm</router-link>
        <router-link to="/stake" tag="li">Stake</router-link>
      </ul>
    </header>
    <!--nav与content -->
    <article>
      <!-- nav -->
      <nav class="app-nav hidden-xs hidden-sm">
        <ul class="nav-items">
          <router-link to="/lend" tag="li" class="active">Lend</router-link>
          <router-link to="/grazing-range" tag="li">Graze</router-link>
          <router-link to="/farm" tag="li">Farm</router-link>
          <router-link to="/stake" tag="li">Stake</router-link>
        </ul>
      </nav>
      <!-- content -->
      <router-view class="app-content" @click="showOrHideLink"></router-view>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      connectDialogVisibly: false
    }
  },
  methods: {
    // 显示/隐藏Links
    showOrHideLink() {
      $(this.$refs.routers).slideToggle()
    },
    // 用于后续控制模态框的显示隐藏
    showConnectDialog() {
      this.connectDialogVisibly = true
    }
  }
}
</script>

<style>
.myapp {
  background-color: #f4f4f4;
}
.myapp .app-header {
  min-height: 150px;
  padding: 32px 48px;
}
/* header 中的 btn-box */
.app-header .btn-box {
  position: absolute;
  top: 50px;
  right: 50px;
}
.app-header .btn-default {
  padding: 6px 20px;
  color: #31c77f;
  outline: none;
  border: 2px solid #31c77f;
  border-radius: 10px;
}
.app-header .btn-default:hover {
  color: #f4f4f4;
  background-color: #31c77f;
}
.app-header .btn-box .set-btn {
  width: 40px;
  height: 40px;
  padding: 11px;
  vertical-align: -5px;
  border: none;
  outline: none;
  border-radius: 50%;
  background-color: transparent;
}
.app-header .btn-box .set-btn:hover {
  background-color: #ddd;
}
.set-btn svg {
  width: 18px;
  height: 18px;
  color: #31c77f;
}
@media screen and (max-width: 768px) {
  .myapp .app-header {
    padding: 12px 18px;
  }
  .app-header .btn-box {
    top: 10px;
    right: 10px;
  }
}
/* 水平居中 */
.center-h {
  position: absolute;
  top: 80px;
  left: 50%;
  margin-left: -80px;
}
/* app-nav */
.app-nav {
  float: left;
  width: 250px;
  background-color: #f4f4f4;
}
.app-nav ul {
  margin-left: 50px;
}
.app-nav li {
  width: 200px;
  height: 40px;
  line-height: 40px;
  font-weight: 700;
  font-size: 25px;
  cursor: pointer;
}
.app-nav .router-link-exact-active {
  color: #31c77f;
}
.routers {
  margin-top: 80px;
  background-color: #f4f4f4;
}
.routers li {
  width: 100%;
  height: 50px;
  font-size: 25px;
  font-weight: 700;
  cursor: pointer;
}
.routers .router-link-exact-active {
  color: #31c77f;
}
/* content */
.myapp .app-content {
  margin-left: 250px;
}
@media screen and (max-width: 992px) {
  .myapp .app-content {
    margin-left: 0;
  }
}
</style>
