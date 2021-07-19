<template>
  <div class="sell-bundle">
    <!-- content -->
    <article class="sell-item-content row">
      <!-- left -->
      <div class="col-xs-12 col-sm-8">
        <!-- seting (set price) -->
        <div class="seting">
          <!-- Name your bundle -->
          <div class="bundle-name">
            <div>
              <h5>Name your bundle</h5>
            </div>
            <div>
              <input v-model="bundle.name" type="text" placeholder="Bundle name" required />
            </div>
          </div>
          <!-- Price -->
          <div class="price">
            <div v-if="bundle.openEnd">
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
              <input v-model="bundle.price" type="number" placeholder="Amount">
            </div>
          </div>
          <!-- Include ending price -->
          <div class="include-ending-price">
            <div>
              <h5>Include ending price</h5>
              <div v-if="!bundle.openEnd">
                Adding an ending price will allow this listing to expire,
                <br>
                or for the price to be reduced until a buyer is found.
              </div>
            </div>
            <div>
              <switches style="margin-top: 10px;" v-model="bundle.openEnd" theme="bootstrap" color="success"></switches>
            </div>
          </div>
          <!-- ending-price -->
          <div v-if="bundle.openEnd" class="end-price">
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
              <input v-model="bundle.endPrice" type="number" placeholder="Amount">
            </div>
          </div>
          <!--  future time (无end-price时显示) -->
          <div v-if="!bundle.openEnd" class="future-time" :class="[bundle.openFutureTime ? 'borderNone' : 'borderBottom']">
            <div>
              <h5>Schedule for a future time</h5>
              <div>You can schedule this listing to only be buyable at a future date</div>
            </div>
            <div>
              <switches style="margin-top: 10px;" v-model="bundle.openFutureTime" theme="bootstrap" color="success"></switches>
            </div>
          </div>
          <div v-if="!bundle.openEnd && bundle.openFutureTime" style="padding-bottom: 15px;">
            <!-- datepicker -->
            <date-picker v-model="bundle.futureTime" valueType="format"></date-picker>
          </div>
          <!--  ExpirationTime (end-price时显示) -->
          <div v-if="bundle.openEnd" class="Expiration-time" :class="[bundle.openExpirationTime ? 'borderNone' : 'borderBottom']">
            <div>
              <h5>Expiration date</h5>
              <div>Your listing will automatically end at this time. No need to cancel it!</div>
            </div>
            <div>
              <switches style="margin-top: 10px;" v-model="bundle.openExpirationTime" theme="bootstrap" color="success"></switches>
            </div>
          </div>
          <div v-if="bundle.openEnd && bundle.openExpirationTime" style="padding-bottom: 15px;">
            <!-- datepicker -->
            <date-picker v-model="bundle.ExpirationTime" valueType="format"></date-picker>
          </div>

          <!-- Privacy -->
          <div class="Privacy" :class="[bundle.oepnPrivacy ? 'borderNone' : 'borderBottom']">
            <div>
              <h5>Privacy</h5>
              <div>You can keep your listing public, or your can specify one address that's allowed to buy it.</div>
            </div>
            <div>
              <switches style="margin-top: 10px;" v-model="bundle.oepnPrivacy" theme="bootstrap" color="success"></switches>
            </div>
          </div>
          <div class="privacy-input" v-if="bundle.oepnPrivacy" style="padding-bottom: 15px;">
            <input type="text" v-model="bundle.Privacy" placeholder="Buyer address, e.g. 0xf45a18...">
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
  data() {
    return {
      bundle: {
        name: '',
        openEnd: false,
        price: 0,
        endPrice: 0,
        openFutureTime: false,
        futureTime: '',
        openExpirationTime: false,
        ExpirationTime: '',
        oepnPrivacy: false,
        Privacy: ''
      }
    }
  },
  methods: {
    // showBoxBody
    showBoxBody (e) {
      $(e.currentTarget).find('.top-bottom').toggleClass('icon-expand-more')
      $(e.currentTarget).find('.top-bottom').toggleClass('icon-expandless')
      $(e.currentTarget).parent().find('.box-body').slideToggle()
    },
    // post-listing
    postListing() {
      alert('postListing')
    }
  },
}
</script>

<style>
.sell-bundle {
  padding-bottom: 60px;
  background-color: #fff;
  border-radius: 20px;
}
.sell-bundle .bundle-name {
  padding: 15px 0;
}
.sell-bundle .bundle-name input {
  width: 300px;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.sell-bundle .bundle-name input:focus {
  border: none;
  outline: none;
  box-shadow: 0 0 10px #aaa;
}
</style>