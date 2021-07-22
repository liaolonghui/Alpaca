<template>
  <div class="stake">
    <!-- Your Rewards Summary -->
    <div class="rewards-summary">
      <header>
        <h2>Your Rewards Summary</h2>
      </header>
      <article class="row">
        <!-- img -->
        <div class="bg-success col-lg-5 col-md-5 col-sm-12 col-xs-12 img-box">
          <img src="../assets/images/LaserHeadfront.svg" alt="LaserHeadfront" class="float-right">
        </div>
        <!-- balance -->
        <div class="col-lg-6 col-md-6 col-xs-12 col-sm-12 float-right balance-box">
          <div style="font-size: 18px;">
            <svg style="color: #31c77f;" viewBox="64 64 896 896" focusable="false" data-icon="wallet" width="24px" height="24px" fill="currentColor" aria-hidden="true"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 464H528V448h312v128zm0 264H184V184h656v200H496c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32h344v200zM580 512a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg>
            <span style="vertical-align: 4px;">Your ALPACA<br />Wallet Balance :</span>
          </div>
          <div class="balance">
            0.00
          </div>
          <div>
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
          </div>
        </div>
        <!-- Rewards -->
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 Rewards">
          <!-- left -->
          <div class="left text-center">
            <p>
              <svg style="color: #31c77f;" viewBox="64 64 896 896" focusable="false" data-icon="lock" width="24px" height="24px" fill="currentColor" aria-hidden="true"><path d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z"></path></svg>
              Remaining Locked Amount
            </p>
            <p class="locked-amount">0.00</p>
            <p class="locked-detail">
              Your locked rewards are linearly released over 7 days starting from block# 6,499,649 to block# 6,699,649
            </p>
          </div>
          <!-- right -->
          <div class="right text-center">
            <p>
              <img src="../assets/images/logo512.png" width="24" height="24" />
              Unlocked Rewards :
            </p>
            <p class="rewards-num">
              0.00
            </p>
            <div class="btn btn-success" disabled>
              Claim
            </div>
          </div>
        </div>
      </article>
    </div>
    <!-- Available Staking Opportunities -->
    <div class="stake-opportunity">
      <header>
        <h2>9 Available Staking Opportunities</h2>
      </header>
      <article>
        <!-- pc-list -->
        <ul class="list-group hidden-xs hidden-sm pc-list">
          <div v-for="item in stakeOpportunity" :key="item.name">
            <!-- list -->
            <li @click="showOrHideStake" class="list-group-item">
              <img :src="item.icon" width="64" height="64" />
              <span class="stakeOpportunityName">{{item.name}}</span>
              <div class="label-box">
                <div class="label label-success">APY: {{item.APY}}</div>
                <div class="label label-green">APR: {{item.APR}}</div>
              </div>
              <div class="opportunity-detail">
                <div>
                  <span>Staked Balance: </span>
                  <span>0.00ibBNB(~0.00ALPACA)</span>
                </div>
                <div>
                  <span>ALPACA Earned: </span>
                  <span>0.00</span>
                </div>
              </div>
            </li>
            <!-- approve/unstake -->
            <div class="pc-stake row" style="margin: 0;">
              <div class="stake col-lg-4 col-md-4">
                <h5>I want to stake</h5>
                <p>Available ibALPACA Balance: 0.00</p>
                <div class="num">
                  <input type="number" :value="stakeAmount" placeholder="Stake Amount" />
                  <div class="btn btn-success">MAX</div>
                </div>
                <div
                  class="btn btn-success btn-group-justified"
                  style="margin-top: 20px;"
                  >
                  Approve
                </div>
              </div>
              <div class="unstake col-lg-4 col-md-4">
                <h5>I want to unstake</h5>
                <p>Staked ibALPACA Balance: 0.00</p>
                <div class="num">
                  <input type="number" :value="unstakeAmount" placeholder="Unstake Amount" />
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
                  <span>0.00</span>
                </p>
                <div class="btn btn-success btn-group-justified">Claim</div>
              </div>
            </div>
          </div>
        </ul>
        <!-- mobile-list -->
        <ul class="list-group hidden-md hidden-lg m-list">
          <div v-for="item in stakeOpportunity" :key="item.name">
            <!-- list -->
            <li @click="showOrHideMStake" class="list-group-item list-m-group-item">
              <header>
                <img :src="item.icon" width="40" height="40" />
                <h5>{{item.name}}</h5>
              </header>
              <article>
                <p>
                  <span>APY</span>
                  <span class="label label-success">{{item.APY}}</span>
                </p>
                <p>
                  <span>APR</span>
                  <span class="label label-green">{{item.APR}}</span>
                </p>
                <P>
                  <span>Staked Balance:</span>
                  <span class="green-text">0.00 ALPACA-wBNB LP Token</span>
                </P>
                <p>
                  <span>ALPACA Earned:</span>
                  <span class="green-text">0.00</span>
                </p>
              </article>
            </li>
            <!-- approve/unstake -->
            <div class="m-stake">
              <div class="stake">
                <h5>I want to stake</h5>
                <p>Available ibALPACA Balance: 0.00</p>
                <div class="num">
                  <input type="number" :value="stakeAmount" placeholder="Stake Amount" />
                  <div class="btn btn-success">MAX</div>
                </div>
                <div
                  class="btn btn-success btn-group-justified"
                  style="margin-top: 20px;"
                  >
                  Approve
                </div>
              </div>
              <div class="unstake">
                <h5>I want to unstake</h5>
                <p>Staked ibALPACA Balance: 0.00</p>
                <div class="num">
                  <input type="number" :value="unstakeAmount" placeholder="Unstake Amount" />
                  <div class="btn btn-success">MAX</div>
                </div>
                <div
                  class="btn btn-success btn-group-justified"
                  style="margin-top: 20px;"
                  >
                  Approve
                </div>
              </div>
              <div class="total-rewards text-center">
                <h5>Total ODDZ Rewards:</h5>
                <p>
                  <span>0.00</span>
                </p>
                <div class="btn btn-success btn-group-justified">Claim</div>
              </div>
            </div>
            <!-- show/hide -->
            <div @click="showOrHideMStake" class="showOrHideMStake">
              <i class="iconfont icon-expand-more moreOrLess"></i>
            </div>
          </div>
        </ul>
      </article>
    </div>
    <!-- spacer -->
    <div class="spacer-50"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stakeOpportunity: [
        {
          name: 'ALPACA-wBNB LP token',
          icon: 'https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/icons/coins/ib-alpaca.svg',
          APY: '18%',
          APR: '17%'         
        }
      ],
      // stakeAmount
      stakeAmount: 0,
      // unstakeAmount
      unstakeAmount: 0
    }
  },
  methods: {
    // showOrHideStake
    showOrHideStake(e) {
      $(e.currentTarget).parent().find('.pc-stake').slideToggle()
    },
    // showOrHideMStake
    showOrHideMStake(e) {
      $(e.currentTarget).parent().find('.moreOrLess').toggleClass('icon-expand-more')
      $(e.currentTarget).parent().find('.moreOrLess').toggleClass('icon-expandless')
      $(e.currentTarget).parent().find('.m-stake').slideToggle()
    }
  },
}
</script>

<style>
/* rewards-summary */
.stake .rewards-summary {
  padding: 20px;
  margin: 0 30px 20px 10px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 5px #aaa;
}
.rewards-summary h2 {
  font-size: 24px;
  font-weight: 700;
}
.rewards-summary div.img-box {
  margin: 20px 20px 0 30px;
}
.rewards-summary .img-box>img {
  width: 250px;
  height: 300px;
}
.rewards-summary .Rewards {
  display: flex;
  margin-top: 20px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 2px #aaa;
}
.rewards-summary .Rewards>div {
  flex: 1;
  padding: 10px;
}
.Rewards>.left>.locked-amount {
  font-size: 24px;
  color: #31c77f;
}
.Rewards>.left>.locked-detail {
  font-size: 12px;
  color: #9ca3af;
}
.rewards-summary .Rewards>.right {
  border-left: 1px solid #aaa;
}
.Rewards>.right>.rewards-num {
  font-size: 24px;
  color: #31c77f;
}
.rewards-summary .Rewards>.right>.btn {
  width: 90%;
}
.rewards-summary .balance-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 2px #aaa;
}
.rewards-summary .balance-box>div {
  margin-left: 20px;
}
.rewards-summary .balance {
  font-size: 64px;
  font-weight: 600;
  color: #31c77f;
}
.rewards-summary .bg-success {
  padding: 0;
  margin-left: 0;
  border-radius: 20px;
  background: linear-gradient(108.1deg,#2dea8f,#31c77f 48.54%,#1da765);
  box-shadow: 0 0 5px #ccc;
}
.float-right {
  float: right;
}
/* stake-opportunity */
.stake .stake-opportunity {
  margin: 0 30px 0 10px;
  padding: 20px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 5px #aaa;
}
.stake-opportunity h2 {
  font-size: 24px;
  font-weight: 700;
}
.stake-opportunity .label-green {
  margin-top: 5px;
  background-color: #2dea8f;
}
.pc-list .list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  cursor: pointer;
}
.stake-opportunity .stakeOpportunityName {
  font-size: 18px;
  font-weight: 700;
}
.stake-opportunity .label-box {
  display: flex;
  flex-direction: column;
}
.pc-list .label {
  padding: 10px 15px;
  font-size: 18px;
  font-weight: 700;
}
.opportunity-detail {
  font-weight: 600;
}
.opportunity-detail>div>span:last-child {
  color: #31c77f;
}
.m-list .list-group-item header {
  width: 100%;
  padding-bottom: 5px;
  border-bottom: 1px solid #aaa;
}
.m-list .list-m-group-item {
  cursor: pointer;
}
.m-list .list-group-item header h5 {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  margin-left: 5px;
}
.m-list .label {
  padding: 5px 25px;
}
.m-list article p {
  display: flex;
  justify-content: space-between;
  margin: 7px;
  font-size: 12px;
}
.m-list article p>span:last-child {
  font-weight: 600;
}
.m-list .green-text {
  color: #31c77f;
}
/* stake */
.pc-stake {
  display: none;
  padding-bottom: 20px;
  background-color: #f4f4f4;
}
.pc-stake>div {
  display: inline-block;
  padding: 0 20px;
  background-color: #f4f4f4;
}
.pc-stake h5 {
  margin: 30px 0 0 0;
  font-weight: 700;
}
.pc-stake .total-rewards {
  float: right;
  border-left: 1px solid #aaa;
}
.pc-stake .total-rewards p {
  margin-top: 30px;
}
.pc-stake .total-rewards span {
  height: 40px;
  margin-left: 5px;
  line-height: 40px;
  font-size: 36px;
  color: #31c77f;
  vertical-align: -8px;
}
.pc-stake .num {
  display: flex;
  margin: 10px 0 15px 0;
}
.pc-stake .num>input {
  flex: 1;
  margin-right: -2px;
  outline: none;
}

.m-stake {
  display: none;
  padding: 0 15px 20px 15px;
  background-color: #f4f4f4;
}
.m-stake>div {
  background-color: #f4f4f4;
  margin-bottom: 10px;
}
.m-stake h5 {
  margin: 0;
  padding: 10px 0 5px 0;
  font-weight: 600;
}
.m-stake .num {
  display: flex;
  margin: 10px 0 15px 0;
}
.m-stake .num>input {
  flex: 1;
  margin-right: -2px;
  outline: none;
}
.m-stake .total-rewards {
  border-top: 1px solid #aaa;
  padding-top: 20px;
}
.m-stake .total-rewards p {
  margin-top: 10px;
}
.m-stake .total-rewards p>span {
  font-size: 36px;
  color: #31c77f;
  vertical-align: -10px;
}


@media screen and (min-width: 1200px) {
  .rewards-summary article.row {
    height: 330px;
  }
}
@media screen and (max-width: 992px) {
  .stake .rewards-summary {
    margin-right: 10px;
  }
  .stake .stake-opportunity {
    margin-right: 10px;
  }
  .rewards-summary div.img-box {
    margin: 0;
  }
  .rewards-summary .balance-box {
    margin-top: 20px;
  }
}
@media screen and (max-width: 768px) {
  .rewards-summary .img-box>img {
    width: 128px;
    height: 122px;
  }
  .rewards-summary .balance-box {
    padding-top: 10px;
  }
  .rewards-summary .balance {
    font-size: 32px;
  }
}
</style>
