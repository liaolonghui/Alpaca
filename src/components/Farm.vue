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
            <h4>Total earned:</h4>
            <p class="earn-number" :class="[Totalearn==0 ? 'default-grey-mask' : '']">
              {{ Totalearn }}
            </p>
          </div>
          <div>
            <div @click="showclaimModal" v-if="Totalearn && Totalearn>0" class="btn btn-active btn-md" style="margin-top: 30px;">
              claim
            </div>
            <div v-else class="btn btn-default btn-md" disabled style="margin-top: 30px;">
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
        <div v-for="(staker, index) in stakers" :key="staker.name">
          <li @click="showOrHidePoolOperate" class="list-group-item farm-pool-item">
            <div class="pair-img">
              <img src="../assets/images/cake.svg" />
              <img src="../assets/images/belt.svg" />
            </div>
            <div class="pair-name">
              {{ staker.name }}
            </div>
          </li>
          <!-- deposit withdraw claimableReward claim -->
          <div class="operate-pool row" style="margin: 0; padding: 0;">
            <!-- deposit -->
            <div class="col-md-4 col-lg-4 operate-item">
              <h4>I want to deposit</h4>
              <div class="farm-input-box">
                <input v-model="staker.depositAmount" type="number" placeholder="Amount" />
                <div class="btn btn-success btn-sm">MAX</div>
              </div>
              <div @click="deposit(index)" v-if="$store.state.publicAddress" class="btn btn-success btn-group-justified">Deposit</div>
              <div v-else class="btn btn-default btn-group-justified" disabled>Deposit</div>
            </div>
            <!-- withdraw -->
            <div class="col-md-4 col-lg-4 operate-item">
              <h4>I want to withdraw</h4>
              <div class="farm-input-box">
                <input v-model="staker.withdrawAmount" type="number" placeholder="Amount" />
                <div class="btn btn-success btn-sm">MAX</div>
              </div>
              <div @click="withdraw(index)" v-if="$store.state.publicAddress" class="btn btn-success btn-group-justified">Withdraw</div>
              <div v-else class="btn btn-default btn-group-justified" disabled>Withdraw</div>
            </div>
            <hr class="hidden-md hidden-lg" />
            <!-- claim -->
            <div class="col-md-3 col-lg-3 operate-item text-center">
              <h4>Rewards({{ staker.rewardName }}):</h4>
              <div class="rewards">
                {{ staker.claimableReward || '0.00' }}
              </div>
              <!-- claim-btn -->
              <div
                @click="claim(index)"
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
            <i class="iconfont icon-expand-more moreOrLess"></i>
          </div>
        </div>
      </ul>
    </div>

    <!-- select claim -->
    <div class="modal fade" id="claimModal" tabindex="-1" role="dialog" aria-labelledby="claimModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header text-center">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">Choose the item you want to claim</h4>
          </div>
          <div class="modal-body">
            <ul class="list-group">
              <li
                v-for="(item, index) in stakers"
                :key="item.name"
                class="list-group-item claim-item"
                @click="claim(index)"
              >
                <img src="../assets/images/cake.svg" width="30" height="30" />
                <h5>{{ item.name }}</h5>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>

    <!-- transaction dialog -->
    <!-- Waiting for confirmation -->
    <div class="modal fade" id="transactionModal" tabindex="-1" role="dialog" aria-labelledby="transactionModalLabel" aria-hidden="false" data-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h4 class="modal-title">Confirm {{operation}}</h4>
          </div>
          <div class="modal-body text-center" style="min-height: 250px;">
            <!-- wait -->
            <div v-if="operationState === 'wait'">
              <h4>Waiting for confirmation</h4>
              <img src="../assets/images/blue-loader.svg" class="load-img" />
              <p>wait for a moment Just a minute,please.</p>
            </div>
            <!-- resolve -->
            <div v-else-if="operationState === 'resolve'">
              <h4>Transaction completed</h4>
              <svg xmlns="http://www.w3.org/2000/svg" width="97" height="97" viewBox="0 0 24 24" fill="none" stroke="#1FC7D4" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line></svg>
              <div @click="hideTransactionDialog" class="btn btn-info btn-md btn-block">Close</div>
            </div>
            <!-- reject -->
            <div v-else-if="operationState === 'reject'">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ED4B9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="stroke-width: 1.5;">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <h4>Transaction rejected</h4>
              <div @click="hideTransactionDialog" class="btn btn-info btn-md btn-block">Dismiss</div>
            </div>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
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
      stakers: [
        {
          name: 'BNB-WORK Staker',
          // LP地址
          pairAddress: '0x3Fb6a6DcF90C674E255cBdA0d19a28d01b90D819',
          contractAddress: '0xd668822aF1c66600F5A4deaf2cd5028Af50CD2bA',
          // deposit/withdraw/claim/claimableReward
          claimableReward: 0,
          depositAmount: 0,
          withdrawAmount: 0,
          // rewardName
          rewardName: 'work coin'
        }
      ],
      // operation
      operation: '',
      operationState: ''
    }
  },
  methods: {
    // showclaimModal
    showclaimModal() {
      $('#claimModal').modal('show')
    },
    // showOrHidePoolOperate
    showOrHidePoolOperate(e) {
      $(e.currentTarget).parent().find('.moreOrLess').toggleClass('icon-expand-more')
      $(e.currentTarget).parent().find('.moreOrLess').toggleClass('icon-expandless')
      $(e.currentTarget).parent().find('.operate-pool').slideToggle()
    },
    // hideTransactionDialog
    hideTransactionDialog() {
      $('#transactionModal').modal('hide')
    },
    // deposit
    async deposit(i) {
      const staker = this.stakers[i]
      const depositAmount = staker.depositAmount
      if (depositAmount && depositAmount > 0) {
        let amount = new BigNumber(depositAmount).multipliedBy(1e18)
        const address = this.$store.state.publicAddress // 用户地址
        const approveContract = await getFarmContract.getapproveContract(staker.pairAddress)
        const depositContract = await getFarmContract.getdepositContract(staker.contractAddress)

        // 显示modal
        this.operationState = 'wait'
        this.operation = 'Deposit'
        $('#transactionModal').modal('show')

        // approve
        approveContract.methods.approve(staker.contractAddress, amount).send({
          from: address
        }).then(() => {
          // deposit
          depositContract.methods.deposit(amount).send({
            from: address,
            gas: 10000000
          }).then(() => {
            this.getClaimableReward(i) // 获取新reward
            this.operationState = 'resolve' // 交易成功提交
          }).catch(() => {
            this.operationState = 'reject' // 失败
          })
        }).catch(() => {
          this.operationState = 'reject' // 失败
        }).finally(() => {
          this.stakers[i].depositAmount = 0
        })
      }
    },
    // withdraw
    async withdraw(i) {
      const staker = this.stakers[i]
      const withdrawAmount = staker.withdrawAmount
      if (withdrawAmount && withdrawAmount > 0) {
        let amount = new BigNumber(withdrawAmount).multipliedBy(1e18)
        const address = this.$store.state.publicAddress // 用户地址
        const approveContract = await getFarmContract.getapproveContract(staker.pairAddress)
        const withdrawContract = await getFarmContract.getwithdrawContract(staker.contractAddress)

        // 显示modal
        this.operationState = 'wait'
        this.operation = 'Withdraw'
        $('#transactionModal').modal('show')

        // approve
        approveContract.methods.approve(staker.contractAddress, amount).send({
          from: address
        }).then(() => {
          // withdraw
          withdrawContract.methods.withdraw(amount).send({
            from: address,
            gas: 10000000
          }).then(() => {
            this.operationState = 'resolve' // 成功提交
            this.getClaimableReward(i) // 获取新reward
          }).catch(() => {
            this.operationState = 'reject' // 失败
          })
        }).catch(() => {
          this.operationState = 'reject' // 失败
        }).finally(() => {
          this.stakers[i].withdrawAmount = 0
        })
      }
    },
    // claim
    async claim(i) {
      const staker = this.stakers[i]
      const address = this.$store.state.publicAddress // 用户地址
      const claimContract = await getFarmContract.getclaimContract(staker.contractAddress)

      // claim
      claimContract.methods.claim().send({
        from: address
      }).then(() => {
        // claim成功
        this.getClaimableReward(i) // 获取新reward
      }).catch(console.error)

      // 若通过模态框claim，要把模态框隐藏起来
      $('#claimModal').modal('hide')

    },
    // 获取claimableReward
    async getClaimableReward(i) {
      const address = this.$store.state.publicAddress
      if (!address) return
      const staker = this.stakers[i]
      const claimableRewardContract = await getFarmContract.getclaimableRewardContract(staker.contractAddress)
      claimableRewardContract.methods.claimableReward(address).call().then((reward) => {
        reward = new BigNumber(reward).div(1e18)
        this.stakers[i].claimableReward = reward
      }).catch(console.error)
    }
  },
  computed: {
    // Totalearn总收入
    Totalearn() {
      return this.stakers.reduce((total, staker) => {
        return new BigNumber(staker.claimableReward).plus(total)
      }, 0)
    }
  },
  created() {
    this.stakers.map((staker, i) => {
      this.getClaimableReward(i)
    })
  },
  mounted() {
    this._timer = setInterval(() => {
      this.stakers.map((staker, i) => {
        this.getClaimableReward(i)
      })
    }, 10000)
  },
  unmounted() {
    clearInterval(this._timer)
    this._timer = null
  },
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
.your-position .earn-box .btn-default[disabled] {
  color: #000;
  font-size: 18px;
  border-radius: 30px;
  background-color: #fff !important;
}
.your-position .earn-box .earn-number {
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 28px;
  font-weight: 700;
  color: #31C77F;
}
.your-position .btn-not-active {
  margin: 1px;
  border: 1px solid #ccc;
  border-radius: 30px;
}
.your-position .btn-active {
  margin: 1px;
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
  margin-top: 25px;
  padding: 30px 10px;
  cursor: pointer;
}
@media screen and (max-width: 768px) {
  .farm-pool .farm-pool-item {
    flex-direction: column;
  }
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
  width: 170px;
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
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
}
.farm-pool .showOrHidePoolOperate>i {
  font-size: 30px;
}
.farm-pool .showOrHidePoolOperate:hover {
  border-color: #31C77F;
  color: #31C77F;
}

/* transactionModal */
#transactionModal {
  margin-top: 50px;
}
#transactionModal svg {
  margin: 25px 0;
}

@media screen and (min-width: 1050px) {
  #transactionModal .modal-dialog {
    width: 400px;
  }
}

@media screen and (max-width: 768px) {
  .farm {
    padding: 10px;
  }
  .farm-header {
    padding: 10px 15px;
  }
  .your-position .earn-box {
    position: static;
    margin-top: 10px;
  }
}

@keyframes load-rotate {
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.load-img {
  margin: 20px 0;
  animation: load-rotate 2s linear infinite;
}

/* claim modal */
#claimModal .claim-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  cursor: pointer;
}
#claimModal .claim-item:hover {
  border-color: #31C77F;
}
@media screen and (min-width: 500px) {
  #claimModal .modal-dialog {
    width: 400px;
  }
}
</style>
