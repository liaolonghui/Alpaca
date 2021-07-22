<template>
  <div class="farm">
    <header class="farm-header">
      <!-- Your Positions -->
      <h2>Your Positions</h2>
      <div class="your-position">
        <div>
          <div
            @click="positionType = 'Active'"
            :class="[positionType==='Active' ? 'btn-active' : 'btn-not-active']"
            class="btn btn-lg"
          >
            Active Positions
          </div>
          <div
            @click="positionType = 'Liquidated'"
            :class="[positionType==='Liquidated' ? 'btn-active' : 'btn-not-active']"
            class="btn btn-lg"
          >
            Liquidated Positions
          </div>
        </div>
        <!-- earn -->
        <div class="earn-box">
          <div>
            <h4>ALPACA earned:</h4>
            <p class="earn-number">0.00</p>
          </div>
          <div>
            <div class="btn btn-active btn-md" style="margin-top: 30px;">
              claim
            </div>
          </div>
        </div>
        <!-- positions -->
        <div class="positions-content">
          {{positionType}}
        </div>
      </div>
    </header>

    <!-- Active Pools  -->
    <div class="active-pools">
      <h2>Active Pools</h2>

      <!-- pool -->
      <ul class="list-group farm-pool">
        <li @click="showOrHidePoolOperate" class="list-group-item farm-pool-item">
          <div class="pair-img">
            <img src="../assets/images/cake.svg" />
            <img src="../assets/images/belt.svg" />
          </div>
          <div class="pair-name">
            BNB-WORK Staker
          </div>
        </li>
        <!-- deposit withdraw claimableReward claim -->
        <div class="operate-pool row" style="margin: 0; padding: 0;">
          <!-- deposit -->
          <div class="col-md-4 col-lg-4 operate-item">
            <h4>I want to deposit</h4>
            <div class="farm-input-box">
              <input v-model="depositAmount" type="number" placeholder="Amount" />
              <div class="btn btn-success btn-sm">MAX</div>
            </div>
            <div @click="deposit" v-if="$store.state.publicAddress" class="btn btn-success btn-group-justified">Deposit</div>
            <div v-else class="btn btn-default btn-group-justified" disabled>Deposit</div>
          </div>
          <!-- withdraw -->
          <div class="col-md-4 col-lg-4 operate-item">
            <h4>I want to withdraw</h4>
            <div class="farm-input-box">
              <input v-model="withdrawAmount" type="number" placeholder="Amount" />
              <div class="btn btn-success btn-sm">MAX</div>
            </div>
            <div @click="withdraw" v-if="$store.state.publicAddress" class="btn btn-success btn-group-justified">Withdraw</div>
            <div v-else class="btn btn-default btn-group-justified" disabled>Withdraw</div>
          </div>
          <!-- claim -->
          <div class="col-md-3 col-lg-3 operate-item text-center">
            <h4>Total Rewards:</h4>
            <div class="rewards">
              {{ claimableReward }}
            </div>
            <!-- claim-btn -->
            <div
              @click="claim"
              v-if="$store.state.publicAddress"
              class="btn btn-success btn-group-justified"
              style="margin-top: 10px;"
            >
              Claim
            </div>
            <div
              v-else
              class="btn btn-default btn-group-justified"
              disabled
              style="margin-top: 10px;"
            >
              Claim
            </div>
          </div>
        </div>
        <!-- mobile-btn -->
        <div @click="showOrHidePoolOperate" class="showOrHidePoolOperate">
          <svg viewBox="64 64 896 896" focusable="false" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js'
import getFarmContract from '../web3Utils/farm.js'

export default {
  data() {
    return {
      positionType: 'Active',
      // LP地址
      LPAddress: '0x3Fb6a6DcF90C674E255cBdA0d19a28d01b90D819',
      contractAddress: '0xd668822aF1c66600F5A4deaf2cd5028Af50CD2bA',
      // deposit/withdraw/claim/claimableReward
      claimableReward: '0.00',
      depositAmount: 0,
      withdrawAmount: 0
    }
  },
  methods: {
    // showOrHidePoolOperate
    showOrHidePoolOperate(e) {
      $(e.currentTarget).parent().find('.operate-pool').slideToggle()
    },
    // deposit
    async deposit() {
      if (this.depositAmount && this.depositAmount > 0) {
        let amount = new BigNumber(this.depositAmount).multipliedBy(1e18)
        const address = this.$store.state.publicAddress // 用户地址
        const approveContract = getFarmContract.getapproveContract(this.LPAddress)
        const depositContract = getFarmContract.getdepositContract(this.contractAddress)

        // approve
        approveContract.methods.approve(this.contractAddress, amount).send({
          from: address
        }).then(() => {
          // deposit
          depositContract.methods.deposit(amount).send({
            from: address,
            gas: 10000000
          }).then(console.log).catch(console.error)
        }).catch(console.error)
      }
    },
    // withdraw
    withdraw() {
      if (this.withdrawAmount && this.withdrawAmount > 0) {
        let amount = new BigNumber(this.withdrawAmount).multipliedBy(1e18)
        const address = this.$store.state.publicAddress // 用户地址
        const approveContract = getFarmContract.getapproveContract(this.LPAddress)
        const withdrawContract = getFarmContract.getwithdrawContract(this.contractAddress)
        // approve
        approveContract.methods.approve(this.contractAddress, amount).send({
          from: address
        }).then(() => {

          // withdraw
          withdrawContract.methods.withdraw(amount).send({
            from: address,
            gas: 10000000
          }).then(() => {
            this.getClaimableReward() // 获取新reward
          }).catch(console.error)

        }).catch(console.error)
      }
    },
    // claim
    claim() {
      const address = this.$store.state.publicAddress // 用户地址
      const claimContract = getFarmContract.getclaimContract(this.contractAddress)

      // claim
      claimContract.methods.claim().call({
        from: address
      }).then((result) => {
        console.log(result)
        this.getClaimableReward() // 获取新reward
      }).catch(console.error)

    },
    // 获取claimableReward
    getClaimableReward() {
      const address = this.$store.state.publicAddress
      if (!address) return
      const claimableRewardContract = getFarmContract.getclaimableRewardContract(this.contractAddress)
      claimableRewardContract.methods.claimableReward(address).call().then((reward) => {
        reward = new BigNumber(reward).div(1e18)
        this.claimableReward = reward
      }).catch(console.error)
    }
  },
  created() {
    this.getClaimableReward()
  },
  watch: {
    "$store.state.publicAddress": {
      handler() {
        this.getClaimableReward()
      },
      deep: true,
      immediate: true,
    }
  }
}
</script>

<style>
.farm {
  padding: 0 20px 50px 20px;
}
.farm-header {
  position: relative;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 5px #ccc;
  min-height: 300px;
}
.farm-header>h2 {
  font-weight: 700;
}
.your-position .earn-box {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 30px;
  right: 40px;
  width: 280px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #fafafa;
  box-shadow: 0 0 5px #aaa;
}
.your-position .earn-box .earn-number {
  font-size: 28px;
  font-weight: 700;
  color: #31C77F;
}
.your-position .btn-not-active {
  border: 1px solid #ccc;
  border-radius: 30px;
}
.your-position .btn-active {
  background-color: #31c77f;
  font-size: 18px;
  color: #fff;
  border-radius: 30px;
}
.your-position .btn-active:hover {
  color: #fff;
  background-color: #31c78f;
}
.your-position .positions-content {
  margin-top: 30px;
}

/* active-pools */
.farm .active-pools {
  min-height: 300px;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 5px #aaa;
}
.farm .active-pools>h2 {
  font-weight: 700;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}

/* farm-pool */
.farm-pool .farm-pool-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  padding: 30px 10px;
  cursor: pointer;
}
.farm-pool-item>.pair-img img {
  width: 40px;
  height: 40px;
}
.farm-pool-item>.pair-img img:nth-of-type(1) {
  position: relative;
  z-index: 6;
  margin-right: -15px;
}
.farm-pool-item>.pair-name {
  font-size: 28px;
  font-weight: 600;
  color: #31C77F;
}

/* operate-pool */
.farm-pool .operate-pool {
  display: none;
  padding-bottom: 30px !important;
  background-color: #fafafa;
}
.operate-item {
  margin-top: 20px;
}
.operate-pool h4 {
  font-weight: 600;
}
.operate-pool input {
  width: 100%;
  height: 40px;
  padding-right: 58px;
  padding-left: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  outline: none;
}
.operate-pool .farm-input-box {
  position: relative;
}
.operate-pool .btn-sm {
  position: absolute;
  top: 0;
  right: 0;
  height: 40px;
  font-size: 16px;
}
.operate-pool .btn-group-justified {
  margin-top: 15px;
}
.operate-pool .rewards {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
  font-weight: 600;
  font-size: 28px;
  color: #31C77F;
}
.farm-pool .showOrHidePoolOperate {
  position: relative;
  z-index: 66;
  width: 40px;
  height: 40px;
  margin: -20px auto 0 auto;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .farm {
    padding: 10px;
  }
  .your-position .earn-box {
    position: static;
    margin-top: 10px;
  }
}
</style>
