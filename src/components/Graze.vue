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
        <ul class="list-group hidden-xs hidden-sm graze-pc-body">
          <!-- graze-box -->
          <div
            class="graze-box"
            v-for="graze in grazingRangeData"
            :key="graze.name"
          >
            <li @click="showOrHideStake" class="list-group-item graze-pc-list" v-if="graze.state == grazeType">
              <!-- img -->
              <div class="graze-pc-imgs">
                <img :src="graze.icon" alt="graze icon" width="64" height="64">
                <img class="myib" src="../assets/images/ib-alpaca.svg" alt="myicon" width="32" height="32">
              </div>
              <!-- title -->
              <div class="graze-pc-title">
                <h3>
                  {{graze.name}}
                  <span
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add Oddz to Metamask"
                    class="btn btn-success btn-xs"
                    style="height: 24px; padding: 4px;"
                    >
                    <svg style="width: 16px; height: 16px;" viewBox="64 64 896 896" focusable="false" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path></svg>
                    <img src="../assets/images/AAVE.png" width="16" height="16" style="vertical-align: 0px;">
                  </span>
                </h3>
                <a :href="graze.URL" target="blank">View project site</a>
              </div>
              <!-- label -->
              <div class="graze-pc-label">
                <div
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Assumes daily compounding"
                  class="label"
                  :class="[graze.APR ? 'label-success': 'label-grey']"
                  >
                  APY {{graze.APY ? graze.APY : '0.0%'}}
                </div>
                <div class="label" :class="[graze.APR ? 'label-green': 'label-grey']" style="margin-top: 10px;">
                  APR {{graze.APR ? graze.APY : '0.0%'}}
                </div>
                <!-- info -->
                <svg
                  class="hidden-md"
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="info-circle"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  >
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                  <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                </svg>
              </div>
              <!-- detail -->
              <div class="graze-pc-detail">
                <p>
                  <span>Your ibALPACA staked :</span>
                  <span>0.00</span>
                </p>
                <p>
                  <span>% share of pool :</span>
                  <span>0.00%</span>
                </p>
                <p>
                  <span>TVL (USD) :</span>
                  <span>{{graze.TVL}}</span>
                </p>
                <p>
                  <span data-toggle="tooltip" data-placement="top" title="Rewards End block#">
                    Rewards end in
                    <svg style="vertical-align: -2px;" viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg>
                    :
                  </span>
                  <span class="rewards-end-time">
                    <span class="days">
                      <span>6</span>
                      <span>days</span>
                    </span>
                    <span class="hrs">
                      <span>6</span>
                      <span>hrs</span>
                    </span>
                    <span class="mins">
                      <span>26</span>
                      <span>mins</span>
                    </span>
                    <span class="secs">
                      <span>46</span>
                      <span>secs</span>
                    </span>
                  </span>
                </p>
              </div>
              <!-- ear -->
              <div class="graze-pc-earn">
                <h4>ODDZ Earned :</h4>
                <p>0.00</p>
              </div>
            </li>
            <!-- approve/unstake -->
            <div class="graze-pc-stake row" style="margin: 0;" v-if="graze.state == grazeType">
              <div class="stake col-lg-4 col-md-4">
                <h5>I want to stake</h5>
                <p>Available ibALPACA Balance: 0.00</p>
                <div class="num">
                  <input type="number" :value="stakeAmount" placeholder="Deposit Amount" />
                  <div class="btn btn-success">MAX</div>
                </div>
                <div
                  class="btn btn-success btn-group-justified"
                  :disabled="graze.state=='Completed'"
                  style="margin-top: 20px;"
                  >
                  Approve
                </div>
              </div>
              <div class="unstake col-lg-4 col-md-4">
                <h5>I want to unstake</h5>
                <p>Staked ibALPACA Balance: 0.00</p>
                <div class="num">
                  <input type="number" :value="unstakeAmount" placeholder="Deposit Amount" />
                  <div class="btn btn-success">MAX</div>
                </div>
                <div
                  class="btn btn-success btn-group-justified"
                  style="margin-top: 20px;"
                  >
                  Unstake
                </div>
              </div>
              <div class="total-rewards col-lg-3 col-md-3 text-center">
                <h5>Total ODDZ Rewards:</h5>
                <p>
                  <img :src="graze.icon" alt="" width="40" height="40">
                  <span>0.00</span>
                </p>
                <div class="btn btn-success btn-group-justified">Claim</div>
              </div>
            </div>
          </div>
        </ul>
        <!-- mobile -->
        <ul class="list-group hidden-md hidden-lg graze-m-body">
          <div
            class="graze-m-box"
            v-for="graze in grazingRangeData"
            :key="graze.name"
            >
            <li class="list-group-item graze-m-list"  v-if="graze.state == grazeType">
              {{graze}}
            </li>
          </div>
        </ul>
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
      stakeAmount: 0,
      unstakeAmount: 0,
      grazeType: 'Live',
      // Staked only
      stakedOnly: false,
      // Grazing Range Data
      grazingRangeData: [
        {
          name: 'ODDZ',
          icon: 'https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/icons/coins/oddz.svg',
          URL: 'https://oddz.fi/',
          APY: '22%',
          APR: '20%',
          TVL: '2.33M', // TVL (USD)
          RewardsEnd: '1626196150000', // 用时间戳模拟
          state: 'Live' // 状态
        },
        {
          name: 'FORM',
          icon: 'https://alpaca-app-asset.s3.ap-southeast-1.amazonaws.com/icons/coins/form-fi.svg',
          URL: 'https://formation.fi/',
          APY: '36%',
          APR: '31%',
          TVL: '12.24M',
          RewardsEnd: '1626696150000',
          state: 'Live'
        },
        {
          name: 'bMXX',
          icon: 'https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/icons/coins/bMXX.svg',
          URL: 'https://multiplier.finance/',
          TVL: '97.08k',
          state: 'Completed'
        },
        {
          name: 'bMXX2',
          icon: 'https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/icons/coins/bMXX.svg',
          URL: 'https://multiplier.finance/',
          TVL: '97.08k',
          state: 'Completed'
        },
        {
          name: 'bMXX3',
          icon: 'https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/icons/coins/bMXX.svg',
          URL: 'https://multiplier.finance/',
          TVL: '97.08k',
          state: 'Completed'
        },
      ]
    }
  },
  methods: {
    // 改变GrazeType
    changeGrazeType(e) {
      this.grazeType = e.target.innerText
    },
    // showOrHideStake
    showOrHideStake(e) {
      $(e.currentTarget).parent().find('.graze-pc-stake').slideToggle()
    },
    // 将时间戳差值转化为: 天，时，分，秒(以后可能有用)
    transformTime(RewardsEnd) {
      const nowTime = Date.parse(new Date())
      let difValue = (RewardsEnd - nowTime) // 还有多久结束？(时间戳差值)
      const d = Math.floor(difValue / 1000 / 60 / 60 / 24)
      difValue = difValue % (1000 * 60 * 60 * 24)
      const h = Math.floor(difValue / 1000 / 60 / 60)
      difValue = difValue % (1000 * 60 * 60)
      const m = Math.floor(difValue / 1000 / 60)
      difValue = difValue % (1000 * 60)
      const s = Math.floor(difValue / 1000)
      console.log(d,h,m,s)
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
.graze-header .graze-img {
  position: absolute;
  z-index: 0;
  top: -20px;
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
.graze-m-header .graze-m-img {
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
/* body */
.graze-body {
  margin-top: 20px;
}
.graze-body .graze-pc-list {
  margin-top: 20px;
  min-height: 110px;
  cursor: pointer;
}
.graze-pc-body .graze-pc-list>div {
  display: inline-block;
}
.graze-pc-body .graze-pc-imgs {
  position: relative;
  float: left;
  margin-top: 25px;
  margin-left: 5px;
  padding-bottom: 10px;
}
.graze-pc-body .myib {
  position: absolute;
  top: 32px;
  left: 32px;
  border-radius: 50%;
  background-color: #fff;
}
.graze-pc-title {
  margin-left: 20px;
}
.graze-pc-title h3 {
  font-size: 18px;
  font-weight: 700;
}
.graze-pc-title a {
  color: #31c77f !important;
  text-decoration: underline !important;
}
.graze-pc-label {
  position: relative;
  margin-right: 30px;
  margin-left: 30px;
  padding-bottom: 10px;
}
.graze-pc-label svg {
  position: absolute;
  top: 5px;
  right: -20px;
  width: 18px;
  height: 18px;
}
.graze-pc-label .label {
  display: block;
  padding: 7px 40px;
  font-size: 18px;
}
.graze-pc-label .label-green {
  background-color: #2dea8f;
}
.graze-pc-label .label-grey {
  background-color: #BBBBBB;
}
.graze-pc-detail {
  padding-left: 20px;
  border-left: 1px solid #bbb;
}
.graze-pc-detail p {
  margin-bottom: 5px;
  font-size: 13px;
}
.graze-pc-detail p {
  display: flex;
  justify-content: space-between;
  width: 300px;
}
.graze-pc-earn {
  float: right;
  padding-right: 20px;
  padding-top: 30px;
}
.graze-pc-earn h4 {
  font-size: 16px;
  font-weight: 700;
}
.graze-pc-earn p {
  font-size: 16px;
  font-weight: 700;
  color: #31c77f;
  text-align: center;
}
.rewards-end-time {
  width: 80px;
  display: flex;
}
.rewards-end-time>span {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 2px;
  text-align: center;
  color: #31c77f;
  background-color: #f4f4f4;
}
/* graze-pc-stake */
.graze-pc-stake {
  display: none;
  padding-bottom: 50px;
  background-color: #f4f4f4;
}
.graze-pc-stake>div {
  display: inline-block;
  padding: 0 20px;
  background-color: #f4f4f4;
}
.graze-pc-stake h5 {
  margin: 30px 0 0 0;
  font-weight: 700;
}
.graze-pc-stake .total-rewards {
  float: right;
  border-left: 1px solid #aaa;
}
.graze-pc-stake .total-rewards p {
  margin-top: 30px;
}
.graze-pc-stake .total-rewards span {
  height: 40px;
  margin-left: 5px;
  line-height: 40px;
  font-size: 36px;
  color: #31c77f;
  vertical-align: -8px;
}
.graze-pc-stake .num {
  display: flex;
  margin: 10px 0 15px 0;
}
.graze-pc-stake .num>input {
  flex: 1;
  margin-right: -2px;
  outline: none;
}


@media screen and (max-width: 1270px) {
  .graze-pc-title {
    margin-left: 10px;
  }
  .graze-pc-label {
    margin-left: 10px;
    margin-right: 25px;
  }
  .graze-pc-label .label {
    padding: 7px 10px;
  }
  .graze-pc-detail p {
    width: 200px;
  }
}
@media screen and (max-width: 1170px) {
  .graze-body .graze-pc-list {
    padding-left: 0;
    padding-right: 0;
  }
  .graze-pc-title {
    margin-left: 0px;
  }
  .graze-pc-label {
    margin-left: 0px;
    margin-right: 0px;
  }
  .graze-pc-label .label {
    padding: 7px 5px;
  }
  .graze-pc-detail {
    padding-left: 10px;
  }
  .graze-pc-detail p {
    width: 180px;
  }
  .graze-pc-earn {
    padding-right: 10px;
  }
  .graze-pc-stake>div {
    padding: 0;
  }
  .graze-pc-stake>div:nth-of-type(1) {
    margin-right: 30px;
  }
  .num .btn {
    padding: 2px;
  }
}
@media screen and (max-width: 1050px) {
  .graze-pc-earn {
    padding-right: 0;
  }
  .graze-pc-detail {
    padding-left: 0px;
  }
}
</style>
