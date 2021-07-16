<template>
  <div class="sell-item">
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
          <div class="bundle sell-method-item col-xs-11 col-sm-3">
            <div>Bundle<i class="iconfont icon-right" style="font-size: 13px;"></i></div>
            <div>Group this item with others to sell</div>
          </div>
        </div>
        <!-- seting -->
        <div class="seting">
          <!-- Price -->
          <div class="price">
            <div>
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
        </div>
        <!-- Instructions -->
        <div class="box-container">
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
          <div class="btn btn-primary btn-lg">
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
  </div>
</template>

<script>
export default {
  props: ['id'], // Item的id？
  data() {
    return {
      Item: {
        id: '64546465',
        name: 'item1111',
        img: require('../../assets/images/coin.svg'),
        collectionName: 'xxxxxxx',
        sellMethod: 'SetPrice',
        price: '',
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
  },
}
</script>

<style>
.sell-item {
  padding: 20px 10px;
  border-radius: 10px;
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
  height: 90px;
  margin: 10px;
  padding-top: 10px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
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
  padding: 20px 0;
}
.seting .price-box {
  position: relative;
}
.seting>.price .icon-box {
  position: absolute;
  top: 1px;
  right: 149px;
  width: 50px;
  height: 43px;
  line-height: 43px;
  border-right: 1px solid #ccc;
  background-color: #fff;
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
}
</style>