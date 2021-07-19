<template>
  <div class="account">
    <header class="text-center">
      <!-- avator -->
      <img v-if="user.avator" :src="user.avator" width="126" height="126"/>
      <img v-else src="../../assets/images/coin.svg" width="126" height="126"/>
      <!-- name -->
      <h1 style="font-weight: 700;">{{user.name ? user.name : 'Unnamed'}}</h1>
      <p>{{this.$store.state.publicAddress}}</p>
    </header>
    <!-- content -->
    <article>
      <div class="clearfix">
        <div @click="(e) => selectItem(e, item.id)" class="item-box text-center" v-for="item in user.items" :key="item.id">
          <i class="iconfont icon-check"></i>
          <div class="media">
            <img v-if="item.mediaType==='img'" :src="item.media" />
            <video v-else-if="item.mediaType==='video'" :src="item.media" controls></video>
          </div>
          <div class="item-detail">
            <div>
              <p>{{item.collectionName}}</p>
              <p>{{item.name}}</p>
            </div>
            <div v-show="item.price">
              <p>Price</p>
              <p>
                <i class="iconfont icon-ethereum"></i>
                {{item.price}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
    <!-- select-box -->
    <div class="select-box">
      <div v-if="bundle.length" class="hidden-xs">
        <div v-for="item in bundle" class="bundle-item" :key="item.id">
          <img :src="item.media" />
        </div>
      </div>
      <div v-else>
        Select items to sell.
      </div>
      <!-- btn -->
      <div class="btn-box">
        <div @click="$router.push('/bundle/sell')" class="btn btn-primary btn-lg">
          <i class="iconfont icon-local-offer"></i>
          Sell
        </div>
        <div @click="$router.go(-1)" class="btn btn-default btn-lg black-text">
          <i class="iconfont icon-block"></i>
          Cancle
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // user
      user: {
        name: '',
        avator: '',
        items: [
          {
            name: 'xxx',
            collectionName: 'xxxxxxxc',
            id: 4841654189465198,
            media: require('../../assets/images/alpaca.svg'),
            mediaType: 'img',
            price: 1
          },
          {
            media: require('../../assets/images/borring.svg'),
            mediaType: 'img',
            name: 'itemssssss2',
            collectionName: 'xxxxxxxc',
            id: 20022000
          },
          {
            media: require('../../assets/images/belt.svg'),
            mediaType: 'img',
            name: 'itemssssss3',
            collectionName: 'xxxxxxxc',
            id: 2563420
          },
          {
            media: require('../../assets/images/coin.svg'),
            mediaType: 'img',
            name: 'itemssssss4',
            collectionName: 'xxxxxxxc',
            id: 854545
          }
        ]
      },
      // bundle
      bundle: []
    }
  },
  methods: {
    selectItem(e, id) {
      $(e.currentTarget).toggleClass('active')
      $(e.currentTarget).find('.icon-check').toggle()
      // 若是已存在的则移除
      const itemExist = this.bundle.find(item => item.id === id)
      if (itemExist) {
        this.bundle = this.bundle.filter(item => item.id !== id)
        return
      }
      const item = this.user.items.find(item => item.id === id)
      this.bundle.push(item)
    }
  },
}
</script>

<style>
.account {
  padding: 20px 10px 100px 10px;
  background-color: #fff;
  border-radius: 20px;
}
.account>header p{
  display: inline-block;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.account>article {
  border-top: 1px solid #ccc;
}
.account .item-box {
  float: left;
  position: relative;
  width: 20%;
  min-height: 300px;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
.account .item-box:hover {
  box-shadow: 0 0 10px #aaa;
}
@media screen and (max-width: 768px) {
  .account .item-box {
    width: 100%;
    margin: 10px 0;
  }
}
.account .item-box>i {
  display: none;
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  border-radius: 50%;
  background-color: #3291e9;
}
.account .media {
  padding-bottom: 20px;
}
.account .media img,
.account .media video {
  min-width: 100px;
  max-width: 100%;
  max-height: 250px;
}
.account .item-detail {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.account .item-detail>div>p:nth-of-type(2) {
  color: #000;
  font-weight: 550;
}
.account .select-box {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding: 10px;
  line-height: 60px;
  font-size: 18px;
  color: #777;
  background-color: #fbfdff;
  border-top: 1px solid #ccc;
}
.account .select-box>.btn-box {
  margin-right: 30px;
}
.account .select-box .btn {
  height: 35px;
  padding: 5px 10px;
  margin: 15px 10px 10px 10px;
}
.account .bundle-item {
  display: inline-block;
  margin: 0 5px;
}
.account .bundle-item img {
  min-width: 40px;
  min-height: 40px;
  max-width: 60px;
  max-height: 60px;
}
/* .item-box.active */
.account .item-box.active {
  border-color: #3291e9;
  box-shadow: 0 0 10px #3291e9;
}
</style>