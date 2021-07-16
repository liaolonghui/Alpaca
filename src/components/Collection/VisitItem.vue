<template>
  <div class="visit-item">
    <div class="item-detail row">
      <!-- left -->
      <div class="item-left col-xs-12 col-sm-4">
        <div class="item-media">
          <img v-if="Item.mediaType === 'img'" :src="Item.media" />
          <video v-else-if="Item.mediaType === 'video'" :src="Item.media" autoplay muted></video>
        </div>
      </div>
      <!-- right -->
      <div class="item-right col-xs-12 col-sm-7">
        <!-- collection -->
        <router-link :to="`/collection/${Item.collectionName}`" style="color: #2081e2; font-size: 16px;">{{Item.collectionName}}</router-link>
        <!-- Itemname -->
        <h1>{{Item.name}}</h1>
        <!-- refresh-transfer-share-more -->
        <div class="refresh-transfer-share-more">
          <i class="iconfont icon-Refresh"></i>
          <i class="iconfont icon-gift"></i>
          <i class="iconfont icon-share"></i>
          <i class="iconfont icon-more"></i>
        </div>
        <!-- Own   view -->
        <div class="own-box">
          <router-link :to="`/space/${Item.own}`">
            <img class="own-img" :src="Item.ownImg" />
          </router-link>
          Owned by
          <router-link :to="`/space/${Item.own}`" style="color: #2081e2; font-size: 14px;">
            {{Item.ownName}}
          </router-link>
          <!-- view -->
          <span class="view-number">
            <i class="iconfont icon-view"></i>
            <span>{{Item.view}} view</span>
          </span>
        </div>
        <!-- Current price -->
        <div class="current-price">
          <p>Current price</p>
          <p class="price-info">
            <i class="iconfont icon-ethereum"></i>
            <span>{{Item.Currentprice}}</span>
            <span style="font-size: 15px;">({{Item.CurrentpriceDol}})</span>
          </p>
          <div
            v-if="$store.state.publicAddress == Item.own"
            class="btn btn-default btn-lg"
            disabled
            data-toggle="tooltip"
            data-placement="right"
            title="You own this item"
          >
            Buy Now
          </div>
          <div
            v-else
            class="btn btn-primary btn-lg"
          >
            Buy Now
          </div>
        </div>
      </div>
    </div>
    <!-- bottom -->
    <div class="item-other">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Item: {
        collectionName: 'collectionxxxx',
        name: 'xxxxx',
        media: require('../../assets/images/alpaca.svg'),
        mediaType: 'img',
        Currentprice: 1,
        CurrentpriceDol: '$405.65',
        view: 1,
        own: '0x9e45511656a8C607D6Ea9DEAbe0f715e9B379eF2',
        ownName: '哈哈哈',
        ownImg: require('../../assets/images/alpaca.svg')
      }
    }
  },
}
</script>

<style>
.visit-item {
  position: relative;
  padding: 20px 10px 50px 10px;
  background-color: #fff;
  border-radius: 10px;
}
.item-detail {
  padding: 10px;
}
.item-detail .item-left {
  padding-top: 10px;
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.item-left .item-media {
  width: 100%;
  height: 500px;
}
.item-left .item-media img,
.item-left .item-media video {
  width: 100%;
  max-width: 100%;
  max-height: 90%;
  margin-top: 50px;
}
.item-detail .item-right {
  padding-top: 10px;
  margin-left: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.refresh-transfer-share-more {
  position: absolute;
  top: 10px;
  right: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.refresh-transfer-share-more>i {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  border-right: 1px solid #ccc;
  cursor: pointer;
}
.refresh-transfer-share-more>i:last-of-type {
  border: none;
}
.refresh-transfer-share-more>i:hover {
  box-shadow: 0 0 5px #aaa;
}
.item-right .own-box {
  margin: 25px 0 ;
}
.item-right .own-img {
  width: 22px;
  height: 22px;
  border-radius: 50%;
}
.item-right .own-box .view-number {
  margin-left: 20px;
  vertical-align: -2px;
}
.item-right .own-box .view-number>span {
  vertical-align: 2px;
  margin-left: 2px;
}
.own-box .view-number i {
  font-size: 18px;
}
.item-right .current-price {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fbfdff;
}
.item-right .current-price .price-info {
  font-size: 30px;
}
.item-right .current-price .price-info span {
  margin: 0 5px;
}
.item-right .current-price .btn {
  min-width: 40%;
}
.item-right .current-price i {
  font-size: 30px;
}
@media screen and (max-width: 768px) {
  .item-detail .item-left,
  .item-detail .item-right {
    margin-left: 0;
  }
}
</style>