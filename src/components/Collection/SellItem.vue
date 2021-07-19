<template>
  <div v-if="!sellEnd" class="sell-item">
    <header class="sell-item-header">
      <img :src="Item.img" />
      <div>
        <p class="collection-name">{{Item.collectionName}}</p>
        <p class="item-name">{{Item.name}}</p>
      </div>
    </header>
    <!-- content -->
    <article class="sell-item-content row">
      <!-- left -->
      <div class="col-xs-12 col-sm-8">
        <h4>Select your sell method</h4>
        <!-- sell method -->
        <div class="sell-method row">
          <!-- Set Price -->
          <div @click="Item.sellMethod='SetPrice'" :class="[Item.sellMethod==='SetPrice' ? 'active' : '']" class="set-price sell-method-item col-xs-11 col-sm-3">
            <div>Set Price</div>
            <div>Sell at a fixed or declining price</div>
          </div>
          <!-- Highest Bid -->
          <div @click="Item.sellMethod='HighestBid'" :class="[Item.sellMethod==='HighestBid' ? 'active' : '']" class="highest-bid sell-method-item col-xs-11 col-sm-3">
            <div>Highest Bid</div>
            <div>Auction to the highest bidder</div>
          </div>
          <!-- Bundle -->
          <router-link to="/account" tag="div" class="bundle sell-method-item col-xs-11 col-sm-3">
            <div>Bundle<i class="iconfont icon-right" style="font-size: 13px;"></i></div>
            <div>Group this item with others to sell</div>
          </router-link>
        </div>
        <!-- seting (set price) -->
        <div v-if="Item.sellMethod === 'SetPrice'" class="seting">
          <!-- Price -->
          <div class="price">
            <div v-if="Item.openEnd">
              <h5>Starting Price</h5>
              <div>Set an initial price.</div>
            </div>
            <div v-else>
              <h5>Price</h5>
              <div>Will be on sale until you transfer this item or cancel it.</div>
            </div>
            <div class="text-right price-box">
              <div class="icon-box">
                <i class="iconfont icon-ethereum"></i>
                <i class="iconfont icon-expand-more"></i>
              </div>
              <input v-model="Item.price" type="number" placeholder="Amount">
            </div>
          </div>
          <!-- Include ending price -->
          <div class="include-ending-price">
            <div>
              <h5>Include ending price</h5>
              <div v-if="!Item.openEnd">
                Adding an ending price will allow this listing to expire,
                <br>
                or for the price to be reduced until a buyer is found.
              </div>
            </div>
            <div>
              <switches style="margin-top: 10px;" v-model="Item.openEnd" theme="bootstrap" color="success"></switches>
            </div>
          </div>
          <!-- ending-price -->
          <div v-if="Item.openEnd" class="end-price">
            <div>
              <h5>Ending price</h5>
              <div>
                Must be less than or equal to the starting price. The
                price will progress linearly to this amount until the expiration date.
              </div>
            </div>
            <div class="text-right price-box">
              <div class="icon-box">
                <i class="iconfont icon-ethereum"></i>
                <i class="iconfont icon-expand-more"></i>
              </div>
              <input v-model="Item.endPrice" type="number" placeholder="Amount">
            </div>
          </div>
          <!--  future time (无end-price时显示) -->
          <div v-if="!Item.openEnd" class="future-time" :class="[Item.openFutureTime ? 'borderNone' : 'borderBottom']">
            <div>
              <h5>Schedule for a future time</h5>
              <div>You can schedule this listing to only be buyable at a future date</div>
            </div>
            <div>
              <switches style="margin-top: 10px;" v-model="Item.openFutureTime" theme="bootstrap" color="success"></switches>
            </div>
          </div>
          <div v-if="!Item.openEnd && Item.openFutureTime" style="padding-bottom: 15px;">
            <!-- datepicker -->
            <date-picker v-model="Item.futureTime" valueType="format"></date-picker>
          </div>
          <!--  ExpirationTime (end-price时显示) -->
          <div v-if="Item.openEnd" class="Expiration-time" :class="[Item.openExpirationTime ? 'borderNone' : 'borderBottom']">
            <div>
              <h5>Expiration date</h5>
              <div>Your listing will automatically end at this time. No need to cancel it!</div>
            </div>
            <div>
              <switches style="margin-top: 10px;" v-model="Item.openExpirationTime" theme="bootstrap" color="success"></switches>
            </div>
          </div>
          <div v-if="Item.openEnd && Item.openExpirationTime" style="padding-bottom: 15px;">
            <!-- datepicker -->
            <date-picker v-model="Item.ExpirationTime" valueType="format"></date-picker>
          </div>

          <!-- Privacy -->
          <div class="Privacy" :class="[Item.oepnPrivacy ? 'borderNone' : 'borderBottom']">
            <div>
              <h5>Privacy</h5>
              <div>You can keep your listing public, or your can specify one address that's allowed to buy it.</div>
            </div>
            <div>
              <switches style="margin-top: 10px;" v-model="Item.oepnPrivacy" theme="bootstrap" color="success"></switches>
            </div>
          </div>
          <div class="privacy-input" v-if="Item.oepnPrivacy" style="padding-bottom: 15px;">
            <input type="text" v-model="Item.Privacy" placeholder="Buyer address, e.g. 0xf45a18...">
          </div>
        </div>
        <!-- HighestBid seting- -->
        <div v-else-if="Item.sellMethod === 'HighestBid'" class="HighestBid">
          <!-- Minimum Bid -->
          <div class="MinimumBid">
            <div>
              <h5>Minimum Bid</h5>
              <div>Set your starting bid price.</div>
            </div>
            <div class="text-right price-box">
              <div class="icon-box">
                <i class="iconfont icon-ethereum"></i>
                <i class="iconfont icon-expand-more"></i>
              </div>
              <input v-model="Item.price" type="number" placeholder="Amount">
            </div>
          </div>
          <!-- Reserve price -->
          <div class="Reserveprice">
            <div>
              <h5>Reserve price</h5>
              <div>Create a hidden limit by setting a reserve price.</div>
            </div>
            <div class="text-right price-box">
              <div class="icon-box">
                <i class="iconfont icon-ethereum"></i>
                <i class="iconfont icon-expand-more"></i>
              </div>
              <input v-model="Item.ReservePrice" type="number" placeholder="Amount">
            </div>
          </div>
          <!-- Expiration Date -->
          <div class="ExpirationDate" :class="[Item.openExpirationDate ? 'borderNone' : 'borderBottom']">
            <div>
              <h5>Expiration date</h5>
              <div>Your listing will automatically end at this time. No need to cancel it!</div>
            </div>
            <div>
              <switches style="margin-top: 10px;" v-model="Item.openExpirationDate" theme="bootstrap" color="success"></switches>
            </div>
          </div>
          <div v-if="Item.openExpirationDate" style="padding-bottom: 15px; border-bottom: 1px solid #ccc;">
            <!-- datepicker -->
            <date-picker v-model="Item.ExpirationDate" valueType="format"></date-picker>
          </div>
        </div>

        <!-- Instructions -->
        <div class="box-container" style="margin-top: 50px;">
          <header class="box-title" @click="showBoxBody">
            <i class="iconfont icon-menu"></i>
            Instructions
            <i class="iconfont icon-expand-more top-bottom"></i>
          </header>
          <article class="box-body">
            <div class="box-body-content text-left sell-instructions">
              <div>
                <div>
                  OpenSea is decentralized, so we never escrow your items.
                  As a result, if this is your first time selling a crypto
                  collectible, you need to complete 2 free (plus gas) transactions:
                </div>
                <ol>
                  <li>To initialize your account for making sell orders, which only needs to be done once for your account.</li>
                  <li>To allow OpenSea to access your item (or all items in the collection, if the collection supports it) when a sale occurs.</li>
                </ol>
                <div>
                  After those, you'll see a signature request to finalize your listing. In the future,
                  as long as the item was approved in step 2 above, <span style="font-weight: 550;">you won't have any transactions at all, only a signature!</span>
                  This is how we can (almost) achieve gas-free listings.
                </div>
                <div>
                  Note that you can always decrease the price of your listing for free, without making a transaction or paying gas. You can view all your items here.
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      <!-- right -->
      <div class="col-xs-12 col-sm-3 right">
        <header>
          <i class="iconfont icon-list"></i>
          <span>Summary</span>
        </header>
        <!-- Post your listing -->
        <div class="post-listing">
          <div @click="postListing" class="btn btn-primary btn-lg">
            Post your listing
            <i class="iconfont icon-right"></i>
          </div>
        </div>
        <!-- Bounties -->
        <div class="Bounties">
          <h5 style="font-weight: 550;">Bounties</h5>
          <div>
            OpenSea rewards 1% to registered affiliates who refer your buyer.
          </div>
        </div>
        <!-- Fees -->
        <div class="Fees">
          <h5 style="font-weight: 550;">Fees</h5>
          <div>Listing is free! At the time of the sale, the following fees will be deducted.</div>
          <p>
            <span>To OpenSea</span>
            <span></span>
            <span>2.5%</span>
          </p>
          <p style="font-weight: 550;">
            <span>Total</span>
            <span></span>
            <span>2.5%</span>
          </p>
        </div>
      </div>
    </article>
    <!-- dialog -->
    <div class="modal fade" id="listingModal" tabindex="-1" role="dialog" aria-labelledby="listingModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">
                      Listing your item...
                    </h4>
                </div>
                <div class="modal-body text-center">
                  Just accept the signature request and wait for us to process your listing.
                  <img src="../../assets/images/card_pack.png" style="margin: 30px 0;" />
                  <h2>waiting...</h2>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>
  </div>
  <!-- 出售后 -->
  <div v-else class="sellEnd">
    <h2>YOU SUCCESSFULLY LISTED YOUR ITEM</h2>
    <p>Enter an email and username so we can let you know when your listing sells!</p>
    <div>Email *</div>
    <input type="text">
    <div>Username *</div>
    <input type="text">
    <!-- btn -->
    <div class="btn btn-primary btn-lg save-btn">
      Save
    </div>
  </div>
</template>

<script>
import Switches from 'vue-switches'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
  components: {
    Switches,
    DatePicker
  },
  props: ['id'], // Item的id？
  data() {
    return {
      Item: {
        id: '64546465',
        name: 'item1111',
        img: require('../../assets/images/coin.svg'),
        collectionName: 'xxxxxxx',
        // sell
        sellMethod: 'SetPrice',
        price: 0,
        openEnd: false,
        endPrice: 0,
        openFutureTime: false, // openFutureTime
        futureTime: '',
        openExpirationTime: false,
        ExpirationTime: '', // setPrice的
        oepnPrivacy: false, // Privacy
        Privacy: '',
        // Bid
        ReservePrice: 0, // 上面的price作MinimumBid使用
        openExpirationDate: false,
        ExpirationDate: '', // Bid的
      },
      // 出售
      sellEnd: false
    }
  },
  methods: {
    // showBoxBody
    showBoxBody(e) {
      $(e.currentTarget).find('.top-bottom').toggleClass('icon-expand-more')
      $(e.currentTarget).find('.top-bottom').toggleClass('icon-expandless')
      $(e.currentTarget).parent().find('.box-body').slideToggle()
    },
    // postListing
    postListing() {
      $('#listingModal').modal('show')
      setTimeout(() => {
        $('#listingModal').modal('hide')
        this.sellEnd = true
      }, 2000)
    }
  },
}
</script>

<style>
.sell-item {
  padding: 20px 10px;
  border-radius: 20px;
  background-color: #fff;
}
.sellEnd {
  padding: 20px 10px;
  border-radius: 20px;
  background-color: #fff;
}
.sell-item-header {
  display: flex;
  border-bottom: 1px solid #ccc;
}
.sell-item-header img {
  max-width: 50px;
  max-height: 50px;
  margin-right: 5px;
}
.sell-item-header p {
  margin: 5px 0;
}
.sell-item-header p.collection-name {
  color: #777;
}
.sell-item-header p.item-name {
  font-weight: 600;
  color: #000;
}
.sell-item-content {
  padding-top: 20px;
}
.sell-method .sell-method-item {
  width: 27%;
  height: 90px;
  margin: 10px 5px;
  padding-top: 15px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
@media screen and (max-width: 768px) {
  .sell-method .sell-method-item {
    width: 100%;
  }
}
.sell-method {
  border-bottom: 1px solid #ccc;
}
.sell-method .sell-method-item.active {
  background-color: rgb(251, 253, 255);
  border-color: rgb(32, 129, 226);
  box-shadow: rgb(32 129 226) 0px 0px 0px 1px inset;
}
.sell-method-item>div:first-of-type {
  color: #000;
  font-weight: 600;
}
/* seting */
.seting>div {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.seting>.price {
  padding: 15px 0;
}
.seting .price-box {
  position: relative;
  margin-top: 10px;
}
.seting>.price .icon-box {
  position: absolute;
  top: 1px;
  right: 149px;
  width: 50px;
  height: 43px;
  line-height: 43px;
  border-right: 1px solid #ccc;
  background-color: #fbfdff;
  cursor: pointer;
}
.seting>.price .icon-box:hover {
  background-color: #fafafa;
}
.seting>.price .icon-box i {
  font-size: 20px;
}
.seting .price-box input {
  width: 200px;
  height: 45px;
  padding-left: 60px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.seting .price-box input:focus {
  border: none;
  outline: none;
  box-shadow: 0 0 10px #aaa;
}
.include-ending-price {
  padding: 10px 0;
}
.seting>.end-price {
  padding: 15px 0;
}
.seting>.end-price .icon-box {
  position: absolute;
  top: 1px;
  right: 149px;
  width: 50px;
  height: 43px;
  line-height: 43px;
  border-right: 1px solid #ccc;
  background-color: #fbfdff;
  cursor: pointer;
}
.seting>.end-price .icon-box:hover {
  background-color: #fafafa;
}
.seting>.end-price .icon-box i {
  font-size: 20px;
}
.future-time {
  padding: 15px 0;
}
.Expiration-time {
  padding: 15px 0;
}
.Privacy {
  padding: 15px 0;
}
div.privacy-input>input {
  min-width: 280px;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
div.privacy-input>input:focus {
  border: noen;
  outline: none;
  box-shadow: 0 0 10px #aaa;
}

.MinimumBid,
.Reserveprice {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
}
.HighestBid .price-box {
  position: relative;
  top: 10px;
}
.HighestBid .price-box .icon-box {
  position: absolute;
  top: 1px;
  right: 149px;
  width: 50px;
  height: 43px;
  line-height: 43px;
  border-right: 1px solid #ccc;
  background-color: #fbfdff;
  cursor: pointer;
}
.HighestBid .price-box .icon-box:hover {
  background-color: #fafafa;
}
.HighestBid .price-box .icon-box i {
  font-size: 20px;
}
.HighestBid .price-box input {
  width: 200px;
  height: 45px;
  padding-left: 60px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.HighestBid .price-box input:focus {
  border: none;
  outline: none;
  box-shadow: 0 0 10px #aaa;
}


/* sell-item-content right */
.sell-item-content .right {
  margin-top: 30px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fbfdff;
}
.sell-item-content .right>header {
  padding-bottom: 30px;
  border-bottom: 1px solid #ccc;
}
.sell-item-content .right>header i {
  border: 2px solid #000;
  border-radius: 2px;
}
.sell-item-content .right>header span {
  margin-left: 25px;
  font-size: 18px;
}
.sell-item-content .post-listing {
  padding: 30px 0;
  border-bottom: 1px solid #ccc;
}
.sell-item-content .Bounties {
  padding: 15px 0 30px 0;
  border-bottom: 1px solid #ccc;
}
.sell-item-content .Fees>p {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.sell-item-content .Fees>p>span:nth-of-type(2) {
  flex: 1;
  border-bottom: 1px dashed #000;
}

/* sell-instructions */
.sell-instructions ol {
  padding: 15px 0 10px 50px;
}
.sell-instructions ol>li {
  list-style-type: decimal;
}


.sell-item-content h5 {
  font-weight: 550;
}

@media screen and (max-width: 768px) {
  .sell-item-content {
    padding: 20px 10px;
  }
  .seting>div {
    display: block;
  }
}

.borderNone {
  border: none !important;
}
.borderBottom {
  border-bottom: 1px solid #ccc;
}

/* sell-end */
.sellEnd>div {
  margin: 5px 0;
}
.sellEnd input {
  width: 60%;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.sellEnd input:focus {
  border: noen;
  outline: none;
  box-shadow: 0 0 10px #aaa;
}
.sellEnd .save-btn {
  display: block;
  width: 200px;
  margin-top: 30px;
}
@media screen and (max-width: 500px) {
  .sellEnd input {
    width: 100%;
  }
}
</style>