<template>
  <div class="visit-item">
    <!-- nav -->
    <nav class="itemnav-btn-box">
      <!-- edit -->
      <router-link :to="`/collection/${Item.collectionName}/assets/${Item.id}/edit`" class="btn btn-default btn-lg">Edit</router-link>
      <!-- cancelListings  lowerPrice -->
      <div v-if="Item.sell" class="btn btn-default btn-lg">Cancel Listings</div>
      <div v-if="Item.sell" class="btn btn-primary btn-lg">Lower Price</div>
      <!-- sell -->
      <router-link :to="`/assets/${Item.id}/sell`" tag="div" v-else class="btn btn-primary btn-lg">Sell</router-link>
    </nav>
    <!-- header xs显示 -->
    <div class="hidden-sm hidden-md hidden-lg">
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
    </div>
    <!-- item-detail -->
    <div class="item-detail row">
      <!-- left -->
      <div class="item-left col-xs-12 col-sm-4">
        <div class="item-media">
          <img v-if="Item.mediaType === 'img'" :src="Item.media" />
          <video v-else-if="Item.mediaType === 'video'" :src="Item.media" autoplay muted></video>
        </div>
        <!-- Description -->
        <div class="box-container">
          <header class="box-title">
            <i class="iconfont icon-menu"></i>
            Description
          </header>
          <article style="display: block;" class="box-body">
            <div class="box-body-content">
              <img :src="Item.ownImg" alt="" width="25" height="25">
              Created by
              {{Item.ownName}}
            </div>
          </article>
        </div>
        <!-- Abount collection -->
        <div class="box-container">
          <header class="box-title" @click="showBoxBody">
            <i class="iconfont icon-menu"></i>
            Abount {{Item.collectionName}}
            <i class="iconfont icon-expand-more top-bottom"></i>
          </header>
          <article class="box-body">
            <div class="box-body-content text-left">
              <img :src="Item.collectionImg" style="max-width: 100%; max-height: 250px;" />
              <router-link :to="`/collection/${Item.collectionName}/assets/edit`" tag="div" class="manage-btn btn btn-default btn-lg">
                <i class="iconfont icon-edit"></i>
              </router-link>
            </div>
          </article>
        </div>
        <!-- Details -->
        <div class="box-container">
          <header class="box-title" @click="showBoxBody">
            <i class="iconfont icon-ballot_px_rounded"></i>
            Details
            <i class="iconfont icon-expand-more top-bottom"></i>
          </header>
          <article class="box-body">
            <div class="box-body-content">
              <p>
                <span>Contract Address</span>
                <span>0x88b4...a656</span>
              </p>
              <p>
                <span>Token ID</span>
                <span>7158790216732500...</span>
              </p>
              <p>
                <span>Blockchain</span>
                <span>Rinkeby</span>
              </p>
              <p>
                <span>Metadata</span>
                <span>Editable</span>
              </p>
            </div>
          </article>
        </div>
      </div>

      <!-- right -->
      <div class="item-right col-xs-12 col-sm-7">
        <!-- xs不显示 -->
        <div class="hidden-xs">
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
            <span style="font-size: 15px;">({{Item.USBprice}})</span>
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
        <!-- Price History -->
        <div class="box-container">
          <header class="box-title" @click="showBoxBody">
            <i class="iconfont icon-timeline"></i>
            Price History
            <i class="iconfont icon-expand-more top-bottom"></i>
          </header>
          <article class="box-body">
            <!-- btn -->
            <div class="box-body-btn-box">
              <div @click="showOtherBtn" class="btn btn-default btn-lg now-btn">
                <span class="now-btn-text">All Time</span>
                <i class="iconfont icon-expand-more"></i>
              </div>
              <div class="other-btn">
                <div @click="changeNowBtn" class="btn btn-default btn-lg">
                  Last 7 Days
                </div>
                <div @click="changeNowBtn" class="btn btn-default btn-lg">
                  Last 14 Days
                </div>
                <div @click="changeNowBtn" class="btn btn-default btn-lg">
                  Last 30 Days
                </div>
                <div @click="changeNowBtn" class="btn btn-default btn-lg">
                  All Time
                </div>
              </div>
            </div>
            <div class="box-body-content" style="margin-top: 50px;">
              <div>
                <img src="../../assets/images/no-chart-data.svg" alt="">
                <div class="not-text">No trading data yet</div>
              </div>
            </div>
          </article>
        </div>
        <!-- Listings -->
        <div class="box-container">
          <header class="box-title" @click="showBoxBody">
            <i class="iconfont icon-local-offer"></i>
            Listings
            <i class="iconfont icon-expand-more top-bottom"></i>
          </header>
          <article class="box-body">
            <div class="box-body-content">
              <!-- 有listings -->
              <div v-if="Item.Listings.length" style="margin-bottom: 80px;">
                <table class="table text-left">
                  <thead>
                    <tr>
                      <th>Price</th>
                      <th>USB Price</th>
                      <th></th>
                      <th>Expiration</th>
                      <th>From</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(listing, i) in Item.Listings" :key="i">
                      <td>{{listing.price}}</td>
                      <td>{{listing.USBprice}}</td>
                      <td>
                        <div class="btn btn-danger btn-xs">cancel</div>
                      </td>
                      <th>{{listing.Expiration}}</th>
                      <th>{{listing.From}}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 没有listings -->
              <div v-else>
                <img src="../../assets/images/empty-asks.svg" />
                <div class="not-text" style="margin-bottom: 50px;">No listings yet</div>
              </div>
            </div>
            <!-- sell-btn -->
            <div class="btn btn-primary btn-lg sell-btn">Sell</div>
          </article>
        </div>
        <!-- Offers -->
        <div class="box-container">
          <header class="box-title" @click="showBoxBody">
            <i class="iconfont icon-toc"></i>
            Offers
            <i class="iconfont icon-expand-more top-bottom"></i>
          </header>
          <article class="box-body">
            <div class="box-body-content">
              <div>
                <img src="../../assets/images/empty-bids.svg" alt="">
                <div class="not-text">No offers yet</div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    <!-- bottom -->
    <div class="item-other">
      <!-- Trading History -->
      <div class="box-container">
        <header class="box-title" @click="showBoxBody">
          <i class="iconfont icon-swapvert" style="font-size: 18px;"></i>
          Trading History
          <i class="iconfont icon-expand-more top-bottom"></i>
        </header>
        <article class="box-body">
          <div class="box-body-content">
            <div>
              <table class="table text-left">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Price</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <i class="iconfont icon-child-friendly"></i>
                      Minted
                    </td>
                    <td></td>
                    <td>
                      <img :src="Item.collectionImg" width="23" height="23" />
                      xx
                    </td>
                    <td>
                      <img :src="Item.collectionImg" width="23" height="23" />
                      xxx
                    </td>
                    <td>
                      a day ago
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>
      </div>
      <!-- More from this collection -->
      <div class="box-container">
        <header class="box-title" @click="showBoxBody">
          <i class="iconfont icon-menu"></i>
          More from this collection
          <i class="iconfont icon-expand-more top-bottom"></i>
        </header>
        <article class="box-body">
          <div class="box-body-content">
            <div>
              <img src="../../assets/images/empty-bids.svg" alt="">
              <div class="not-text">No More</div>
            </div>
          </div>
        </article>
        <footer class="text-center" style="padding: 20px 0; border-top: 1px solid #ccc;">
          <router-link :to="`/collection/${Item.collectionName}`" tag="div" class="btn btn-primary btn-lg">
            View Collection
          </router-link>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Item: {
        sell: false,
        id: '4654165416519841',
        collectionName: 'collectionxxxx',
        collectionImg: require('../../assets/images/coin.svg'),
        name: 'xxxxx',
        media: require('../../assets/images/alpaca.svg'),
        mediaType: 'img',
        Currentprice: 1,
        USBprice: '$405.65',
        view: 1,
        own: '0x9e45511656a8C607D6Ea9DEAbe0f715e9B379eF2',
        ownName: '哈哈哈',
        ownImg: require('../../assets/images/alpaca.svg'),
        // Listings
        Listings: [
          {
            price: 1,
            USBprice: 405.68,
            Expiration: '——',
            From: 'xxxxxxxx',
            add: '0x9e45511656a8C607D6Ea9DEAbe0f715e9B379eF2'
          }
        ]
      }
    }
  },
  methods: {
    // showBoxBody
    showBoxBody(e) {
      $(e.currentTarget).find('.top-bottom').toggleClass('icon-expand-more')
      $(e.currentTarget).find('.top-bottom').toggleClass('icon-expandless')
      $(e.currentTarget).parent().find('.box-body').slideToggle()
    },
    // showOtherBtn (price history)
    showOtherBtn(e) {
      $(e.currentTarget).parent().find('.other-btn').slideToggle()
    },
    // changeNowBtn (price history)
    changeNowBtn(e) {
      const type = e.currentTarget.innerText
      $(e.currentTarget).parent().parent().find('.now-btn>.now-btn-text').text(type)
      $(e.currentTarget).parent().slideUp()
    }
  },
}
</script>

<style>
.visit-item {
  position: relative;
  padding: 0 10px 50px 10px;
  background-color: #fff;
  border-radius: 10px;
}
.item-detail {
  padding: 10px;
}
.item-detail .item-left {
  padding: 10px;
  margin-left: 10px;
  border-radius: 10px;
}
.item-left .item-media {
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.item-left .item-media img,
.item-left .item-media video {
  width: 100%;
  max-width: 100%;
  max-height: 90%;
  margin-top: 50px;
}
.item-detail .item-right {
  padding: 10px;
  margin-left: 15px;
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
/* current-price */
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

/* leftbox */
.box-body-content>p {
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
}

/* rightbox */
.box-body-btn-box {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 160px;
}
.box-body-btn-box .now-btn {
  width: 100%;
}
.box-body-btn-box>.other-btn {
  display: none;
}
.box-body-btn-box>.other-btn>div {
  display: block;
  width: 100%;
}
.sell-btn {
  position: absolute;
  left: 10px;
  bottom: 10px;
}

/* box-title 与 box-body */
.box-container {
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
header.box-title {
  position: relative;
  height: 64px;
  line-height: 64px;
  padding-left: 20px;
  font-size: 16px;
  color: #04111d;
  cursor: pointer;
}
header.box-title>i.icon-expand-more,
header.box-title>i.icon-expandless {
  position: absolute;
  top: 0;
  right: 20px;
  font-size: 20px;
}
article.box-body {
  position: relative;
  display: none;
  padding: 20px;
  text-align: center;
  border: 1px solid #ccc;
  background-color: #fbfdff;
}
article.box-body .not-text {
  margin-top: 5px;
  font-size: 16px;
}

/* itemnav-btn-box */
.itemnav-btn-box {
  width: 100%;
  padding: 10px 130px;
  text-align: right;
}
.itemnav-btn-box>div {
  display: inline-block;
}
.itemnav-btn-box .btn {
  width: 150px;
  margin: 0 5px;
}

@media screen and (max-width: 768px) {
  .item-detail .item-left,
  .item-detail .item-right {
    margin-left: 0;
  }

  /* .itemnav-btn-box */
  .itemnav-btn-box {
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    padding: 15px 0;
  }
  .itemnav-btn-box>div.btn {
    width: 105px;
    padding: 5px;
    font-size: 13px;
    margin: 0 1px;
  }
}
</style>