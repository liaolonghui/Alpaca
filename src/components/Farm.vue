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
        <div v-for="(stake, index) in stakes" :key="stake.name">
          <li @click="showOrHidePoolOperate" class="list-group-item farm-pool-item">
            <div class="pair-img">
              <img src="../assets/images/cake.svg" />
            </div>
            <div class="pair-name">
              {{ stake.name }}
            </div>
            <div class="stake-APY">
              <p>APY</p>
              <p class="stake-APY-info" :class="[(stake.totalStaked&&stake.userStaked)?'':'default-grey-mask']">
                <!-- 计算APY -->
                {{ stake.APY }}
              </p>
            </div>
            <div class="total-staked">
              <p>Total staked</p>
              <p class="total-staked-num" :class="[stake.totalStaked?'':'default-grey-mask']">
                <span>{{stake.totalStaked}}</span>
                CAKE
              </p>
            </div>
            <hr class="hidden-sm hidden-md hidden-lg" style="width: 100%;">
            <div class="token-detail">
              <P class="see-token-info">
                <a  @click="(e) => e.stopPropagation()" target="_blank" :href="`https://pancakeswap.info/token/${stake.pairAddress}`">
                  See Token Info
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z"></path></svg>
                </a>
              </P>
              <p class="view-contract">
                <a @click="(e) => e.stopPropagation()" target="_blank" :href="`https://bscscan.com/address/${stake.contractAddress}`">
                  View Contract
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z"></path></svg>
                </a>
              </p>
              <div @click="(e) => addToMetamask(e, index)" class="add-to-metamask">
                <div>Add to Metamask</div>
                <svg viewBox="0 0 35 33" color="text" width="20px" xmlns="http://www.w3.org/2000/svg">
                  <path d="m32.9582 1-13.1341 9.7183 2.4424-5.72731z" fill="#e17726" stroke="#e17726"></path>
                  <g fill="#e27625" stroke="#e27625">
                  <path d="m2.66296 1 13.01714 9.809-2.3254-5.81802z"></path>
                  <path d="m28.2295 23.5335-3.4947 5.3386 7.4829 2.0603 2.1436-7.2823z"></path>
                  <path d="m1.27281 23.6501 2.13055 7.2823 7.46994-2.0603-3.48166-5.3386z"></path>
                  <path d="m10.4706 14.5149-2.0786 3.1358 7.405.3369-.2469-7.969z"></path>
                  <path d="m25.1505 14.5149-5.1575-4.58704-.1688 8.05974 7.4049-.3369z"></path>
                  <path d="m10.8733 28.8721 4.4819-2.1639-3.8583-3.0062z"></path>
                  <path d="m20.2659 26.7082 4.4689 2.1639-.6105-5.1701z"></path>
                  </g>
                  <path d="m24.7348 28.8721-4.469-2.1639.3638 2.9025-.039 1.231z" fill="#d5bfb2" stroke="#d5bfb2"></path>
                  <path d="m10.8732 28.8721 4.1572 1.9696-.026-1.231.3508-2.9025z" fill="#d5bfb2" stroke="#d5bfb2"></path>
                  <path d="m15.1084 21.7842-3.7155-1.0884 2.6243-1.2051z" fill="#233447" stroke="#233447"></path>
                  <path d="m20.5126 21.7842 1.0913-2.2935 2.6372 1.2051z" fill="#233447" stroke="#233447"></path>
                  <path d="m10.8733 28.8721.6495-5.3386-4.13117.1167z" fill="#cc6228" stroke="#cc6228"></path>
                  <path d="m24.0982 23.5335.6366 5.3386 3.4946-5.2219z" fill="#cc6228" stroke="#cc6228"></path>
                  <path d="m27.2291 17.6507-7.405.3369.6885 3.7966 1.0913-2.2935 2.6372 1.2051z" fill="#cc6228" stroke="#cc6228"></path>
                  <path d="m11.3929 20.6958 2.6242-1.2051 1.0913 2.2935.6885-3.7966-7.40495-.3369z" fill="#cc6228" stroke="#cc6228"></path>
                  <path d="m8.392 17.6507 3.1049 6.0513-.1039-3.0062z" fill="#e27525" stroke="#e27525"></path>
                  <path d="m24.2412 20.6958-.1169 3.0062 3.1049-6.0513z" fill="#e27525" stroke="#e27525"></path>
                  <path d="m15.797 17.9876-.6886 3.7967.8704 4.4833.1949-5.9087z" fill="#e27525" stroke="#e27525"></path>
                  <path d="m19.8242 17.9876-.3638 2.3584.1819 5.9216.8704-4.4833z" fill="#e27525" stroke="#e27525"></path>
                  <path d="m20.5127 21.7842-.8704 4.4834.6236.4406 3.8584-3.0062.1169-3.0062z" fill="#f5841f" stroke="#f5841f"></path>
                  <path d="m11.3929 20.6958.104 3.0062 3.8583 3.0062.6236-.4406-.8704-4.4834z" fill="#f5841f" stroke="#f5841f"></path>
                  <path d="m20.5906 30.8417.039-1.231-.3378-.2851h-4.9626l-.3248.2851.026 1.231-4.1572-1.9696 1.4551 1.1921 2.9489 2.0344h5.0536l2.962-2.0344 1.442-1.1921z" fill="#c0ac9d" stroke="#c0ac9d"></path>
                  <path d="m20.2659 26.7082-.6236-.4406h-3.6635l-.6236.4406-.3508 2.9025.3248-.2851h4.9626l.3378.2851z" fill="#161616" stroke="#161616"></path>
                  <path d="m33.5168 11.3532 1.1043-5.36447-1.6629-4.98873-12.6923 9.3944 4.8846 4.1205 6.8983 2.0085 1.52-1.7752-.6626-.4795 1.0523-.9588-.8054-.622 1.0523-.8034z" fill="#763e1a" stroke="#763e1a"></path>
                  <path d="m1 5.98873 1.11724 5.36447-.71451.5313 1.06527.8034-.80545.622 1.05228.9588-.66255.4795 1.51997 1.7752 6.89835-2.0085 4.8846-4.1205-12.69233-9.3944z" fill="#763e1a" stroke="#763e1a"></path>
                  <path d="m32.0489 16.5234-6.8983-2.0085 2.0786 3.1358-3.1049 6.0513 4.1052-.0519h6.1318z" fill="#f5841f" stroke="#f5841f"></path>
                  <path d="m10.4705 14.5149-6.89828 2.0085-2.29944 7.1267h6.11883l4.10519.0519-3.10487-6.0513z" fill="#f5841f" stroke="#f5841f"></path>
                  <path d="m19.8241 17.9876.4417-7.5932 2.0007-5.4034h-8.9119l2.0006 5.4034.4417 7.5932.1689 2.3842.013 5.8958h3.6635l.013-5.8958z" fill="#f5841f" stroke="#f5841f"></path>
                </svg>
              </div>
            </div>
          </li>
          <!-- deposit withdraw claimableReward claim -->
          <div class="operate-pool row" style="margin: 0; padding: 0;">
            <!-- deposit -->
            <div class="col-md-4 col-lg-4 operate-item">
              <h4>I want to deposit</h4>
              <p class="token-info">
                You have
                <span class="transaction-balance">{{stake.LPBalance}}</span>
                that can deposit
              </p>
              <div class="farm-input-box">
                <input
                  v-model="stake.depositAmount"
                  type="number"
                  placeholder="Amount"
                  min="0"
                  :max="stake.LPBalance"
                />
                <div @click="depositmax(index)" class="btn btn-success btn-sm">MAX</div>
              </div>
              <div @click="transaction(index, 'deposit')" v-if="$store.state.publicAddress" class="btn btn-success btn-group-justified">Deposit</div>
              <div v-else class="btn btn-default btn-group-justified" disabled>Deposit</div>
            </div>
            <!-- withdraw -->
            <div class="col-md-4 col-lg-4 operate-item">
              <h4>I want to withdraw</h4>
              <p class="token-info">
                You have
                <span class="transaction-balance">{{stake.userStaked}}</span>
                that can withdraw
              </p>
              <div class="farm-input-box">
                <input
                  v-model="stake.withdrawAmount"
                  type="number"
                  placeholder="Amount"
                  min="0"
                  :max="stake.userStaked"
                />
                <div @click="withdrawmax(index)" class="btn btn-success btn-sm">MAX</div>
              </div>
              <div @click="transaction(index, 'withdraw')" v-if="$store.state.publicAddress" class="btn btn-success btn-group-justified">Withdraw</div>
              <div v-else class="btn btn-default btn-group-justified" disabled>Withdraw</div>
            </div>
            <hr class="hidden-md hidden-lg" />
            <!-- claim -->
            <div class="col-md-3 col-lg-3 operate-item text-center">
              <h4>Rewards({{ stake.rewardName }}):</h4>
              <div class="rewards" :class="[stake.claimableReward ? '' : 'default-grey-mask']">
                {{ stake.claimableReward }}
              </div>
              <!-- claim-btn -->
              <div
                @click="claim(index)"
                v-if="$store.state.publicAddress"
                class="btn btn-success btn-group-justified"
                style="margin-top: 8px;"
              >
                Claim
              </div>
              <div
                v-else
                class="btn btn-default btn-group-justified"
                disabled
                style="margin-top: 8px;"
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
                v-for="(item, index) in stakes"
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
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
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
            <!-- default -->
            <div v-else>
              <div v-if="needApprove">
                <!-- 需要approve -->
                <br />
                <h4>You need to approve</h4>
                <br />
                <div @click="approve" class="btn btn-success btn-lg">Approve</div>
              </div>
              <div v-else>
                <!-- 不需要approve -->
                <br />
                <h4>You need to confirm</h4>
                <br />
                <div @click="confirmTransaction" class="btn btn-success btn-lg">Confirm Transiaction</div>
              </div>
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
import getPairContract from '../web3Utils/pair.js'

export default {
  data () {
    return {
      positionType: 'Active',
      stakes: [
        {
          name: 'BNB-Work-Stake',
          // LP地址
          lpName: 'BNB/work',
          pairAddress: '0x3Fb6a6DcF90C674E255cBdA0d19a28d01b90D819',
          LPBalance: 0,
          contractAddress: '0x7d3341D090250399F45C6B43996A88c42E5B47Fe',
          // deposit/withdraw/claim/claimableReward
          claimableReward: 0,
          depositAmount: 0,
          withdrawAmount: 0,
          // totalStaked
          totalStaked: 0,
          // userStaked
          userStaked: 0,
          // apy
          APY: '',
          // rewardName
          rewardName: 'work coin',
          // dayNum 平均一天产生
          dayNum: 250
        },
        {
          name: 'Stable-Stake',
          lpName: 'BUSD/USDT',
          pairAddress: '0x5126C1B8b4368c6F07292932451230Ba53a6eB7A',
          LPBalance: 0,
          contractAddress: '0x7a199FD711A1723e941Ac49d8C9fF6AB80c70Df8',
          claimableReward: 0,
          depositAmount: 0,
          withdrawAmount: 0,
          totalStaked: 0,
          userStaked: 0,
          APY: '',
          rewardName: 'work coin',
          dayNum: 500
        }
      ],
      // operation
      stakeIndex: null, // 对应stake索引
      operation: '', // 交易类型（操作）
      operationState: '', // 状态
      needApprove: true // 是否需要approve
    }
  },
  methods: {
    // addToMetamask
    async addToMetamask (event, index) {
      event.stopPropagation()

      const tokenAddress = this.stakes[index].pairAddress
      const tokenSymbol = this.stakes[index].lpName
      const tokenDecimals = 18
      const tokenImage = 'http://placekitten.com/200/300'

      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals, // The number of decimals in the token
              image: tokenImage,
            },
          }
        })

        if (wasAdded) {
          console.log('Thanks for your interest!')
        } else {
          console.log('Your loss!')
        }
      } catch (error) {
        console.log(error)
      }

    },
    // deposit
    depositmax (i) {
      this.stakes[i].depositAmount = this.stakes[i].LPBalance
    },
    // withdrawmax
    withdrawmax (i) {
      this.stakes[i].withdrawAmount = this.stakes[i].userStaked
    },
    // showclaimModal
    showclaimModal () {
      $('#claimModal').modal('show')
    },
    // showOrHidePoolOperate
    showOrHidePoolOperate (e) {
      $(e.currentTarget).parent().find('.moreOrLess').toggleClass('icon-expand-more')
      $(e.currentTarget).parent().find('.moreOrLess').toggleClass('icon-expandless')
      $(e.currentTarget).parent().find('.operate-pool').slideToggle()
    },
    // hideTransactionDialog
    hideTransactionDialog () {
      $('#transactionModal').modal('hide')
    },
    // transaction
    async transaction (index, transactionType) {
      const stake = this.stakes[index]
      let amount
      if (transactionType === 'deposit') {
        amount = stake.depositAmount
      } else if (transactionType === 'withdraw') {
        amount = stake.withdrawAmount
      }

      // 输入值大于0才继续
      if (amount && amount > 0) {
        // 显示modal
        this.operationState = '' // 状态置为空
        $('#transactionModal').modal('show')

        this.operation = transactionType // 把交易类型保存一下
        this.stakeIndex = index // 把交易的stake的index保存一下

        if (transactionType === 'withdraw') {
          // 如果是withdraw交易则不需要approve
          return this.needApprove = false
        }

        // deposit交易才需要判断是否需要approve
        this.operationState = 'wait' // 等待allowance
        this.needApprove = await this.allowance() // 是否需要approve
        this.operationState = ''

      } else {
        alert('Please enter a value greater than 0')
      }

    },
    // allowance
    async allowance () {
      const stake = this.stakes[this.stakeIndex]
      const address = this.$store.state.publicAddress // 用户地址
      let amount
      if (this.operation === 'deposit') {
        amount = stake.depositAmount * 1e18
      } else if (this.operation === 'withdraw') {
        amount = stake.withdrawAmount * 1e18
      }
      // Allowance
      const allowanceContract = await getFarmContract.getAllowanceContract(stake.pairAddress)
      const allowance = await allowanceContract.methods.allowance(address, stake.contractAddress).call()

      if (allowance >= amount) {
        return false // 不需要approve
      } else {
        return true // 需要approve
      }
    },
    // approve
    async approve () {
      const stake = this.stakes[this.stakeIndex] // stake
      const address = this.$store.state.publicAddress // 用户地址
      let amount
      if (this.operation === 'deposit') {
        amount = new BigNumber(stake.depositAmount + 10000).multipliedBy(1e18)
      } else if (this.operation === 'withdraw') {
        amount = new BigNumber(stake.withdrawAmount + 10000).multipliedBy(1e18)
      }
      const approveContract = await getFarmContract.getapproveContract(stake.pairAddress)
      approveContract.methods.approve(stake.contractAddress, amount).send({
        from: address
      }).then((result) => {
        this.needApprove = false // approve成功，将needApprove置为false
      }).catch(() => {
        this.needApprove = true
      })
    },
    // confirmTransaction
    confirmTransaction () {
      this.operationState = 'wait' // 置为等待状态
      // 根据交易类型执行对应方法
      if (this.operation === 'deposit') {
        this.deposit()
      } else if (this.operation === 'withdraw') {
        this.withdraw()
      }
    },
    // deposit
    async deposit () {
      const i = this.stakeIndex
      const stake = this.stakes[i]
      const amount = new BigNumber(stake.depositAmount).multipliedBy(1e18)
      const address = this.$store.state.publicAddress // 用户地址
      const depositContract = await getFarmContract.getdepositContract(stake.contractAddress)

      // deposit
      depositContract.methods.deposit(amount).send({
        from: address,
        gas: 10000000
      }).then(() => {
        this.operationState = 'resolve' // 交易成功提交
        this.getClaimableReward(i) // 获取新reward
        this.getTotalStaked(i)
        this.getUserStaked(i)
        setTimeout(() => {
          this.getLPBalance(i)
        },1000)
      }).catch(() => {
        this.operationState = 'reject' // 失败
      })
      // 清空depositAmount
      setTimeout(() => {
        this.stakes[i].depositAmount = 0
      },0)
    },
    // withdraw
    async withdraw () {
      const i = this.stakeIndex
      const stake = this.stakes[i]
      const amount = new BigNumber(stake.withdrawAmount).multipliedBy(1e18)
      const address = this.$store.state.publicAddress // 用户地址
      const withdrawContract = await getFarmContract.getwithdrawContract(stake.contractAddress)

      withdrawContract.methods.withdraw(amount).send({
        from: address,
        gas: 10000000
      }).then(() => {
        this.operationState = 'resolve' // 成功提交
        this.getClaimableReward(i) // 获取新reward
        this.getTotalStaked(i)
        this.getUserStaked(i)
        setTimeout(() => {
          this.getLPBalance(i)
        },1000)
      }).catch(() => {
        this.operationState = 'reject' // 失败
      })
      // 清空withdrawAmount
      setTimeout(() => {
        this.stakes[i].withdrawAmount = 0
      }, 0)
    },
    // claim
    async claim (i) {
      const stake = this.stakes[i]
      const address = this.$store.state.publicAddress // 用户地址
      const claimContract = await getFarmContract.getclaimContract(stake.contractAddress)

      // claim
      claimContract.methods.claim().send({
        from: address
      }).then(() => {
        // claim成功
        this.getClaimableReward(i) // 获取新reward
        this.getTotalStaked(i)
        this.getUserStaked(i)
      }).catch(console.error)

      // 若通过模态框claim，要把模态框隐藏起来
      $('#claimModal').modal('hide')
    },
    // 获取claimableReward
    async getClaimableReward (i) {
      const address = this.$store.state.publicAddress
      if (!address) return
      const stake = this.stakes[i]
      const claimableRewardContract = await getFarmContract.getclaimableRewardContract(stake.contractAddress)
      claimableRewardContract.methods.claimableReward(address).call().then((reward) => {
        reward = new BigNumber(reward).div(1e18)
        this.stakes[i].claimableReward = reward
      }).catch(console.error)
    },
    // 获取total-staked
    async getTotalStaked (i) {
      const address = this.$store.state.publicAddress
      if (!address) return
      const contractAddress = this.stakes[i].contractAddress
      const totalstakedContract = await getFarmContract.getTotalstakedContract(contractAddress)
      totalstakedContract.methods.total_staked_().call().then((totalStaked) => {
        this.stakes[i].totalStaked = new BigNumber(totalStaked).div(1e18)
      }).catch(console.error)
    },
    // 获取user-staked
    async getUserStaked (i) {
      const address = this.$store.state.publicAddress
      if (!address) return
      const contractAddress = this.stakes[i].contractAddress
      const userstakedContract = await getFarmContract.getUserstakedContract(contractAddress)
      userstakedContract.methods.user_staked(address).call().then((userStaked) => {
        this.stakes[i].userStaked = new BigNumber(userStaked).div(1e18)
      }).catch(console.error)
    },
    // 获取用户钱包LP的余额
    async getLPBalance (i) {
      const pairAddr = this.stakes[i].pairAddress
      const address = this.$store.state.publicAddress
      if (!address) return
      const result = await $.ajax({
        url: 'https://api-testnet.bscscan.com/api',
        data: {
          module: 'account',
          action: 'tokenbalance',
          contractaddress: pairAddr,
          address: address,
          tag: 'latest',
          apikey: '44MDXAAGI9M1INP37QDYBZBYBUDQBXAPCD'
        }
      })
      if (result.message === 'OK') {
        this.stakes[i].LPBalance = new BigNumber(result.result).div(1e18)
      }
    },
    // 计算APY
    async computedAPY (stake) {
      const getReservesContract = await getPairContract(stake.pairAddress)
      const result = await getReservesContract.methods.getReserves().call()

      // dayNum是平均一天的产出
      const { totalStaked, userStaked, dayNum } = stake

      let lpVal = result[1] / result[0]

      const workgetReservesContract = await getPairContract('0x3Fb6a6DcF90C674E255cBdA0d19a28d01b90D819')
      const workResult = await workgetReservesContract.methods.getReserves().call()
      const workVal = workResult[1] / workResult[0] / 1e5

      const userNum = (userStaked / totalStaked) * dayNum

      // 每天挖到的数量 = (我投入的/所有人投入的)*每天能挖到的
      // APY就是：(每天挖到的数量*其价格 / 我投入的代币数量*其价格) * 365

      let APY = (userNum * workVal) / (userStaked * lpVal) * 365
      APY = (APY * 100).toFixed(2)

      if (!isNaN(APY)) {
        stake.APY = APY + '%'
      } else {
        stake.APY = ''
      }
    }
  },
  computed: {
    // Totalearn总收入
    Totalearn () {
      return this.stakes.reduce((total, stake) => {
        return new BigNumber(stake.claimableReward).plus(total)
      }, 0)
    }
  },
  watch: {
    '$store.state.publicAddress' () {
      this.stakes.map((stake, i) => {
        // claimableReward
        this.getClaimableReward(i)
        // TotalStaked
        this.getTotalStaked(i)
        // getUserStaked
        this.getUserStaked(i)
        // LP
        this.getLPBalance(i)
        // 计算APY
        this.computedAPY(stake)
      })
    }
  },
  mounted () {
    // 一开始先查询一次
    this.stakes.map((stake, i) => {
      // claimableReward
      this.getClaimableReward(i)
      // TotalStaked
      this.getTotalStaked(i)
      // getUserStaked
      this.getUserStaked(i)
      // LP
      this.getLPBalance(i)
      // 计算APY
      this.computedAPY(stake)
    })
    // 定时器查询10s
    this._timer = setInterval(() => {
      this.stakes.map((stake, i) => {
        // claimableReward
        this.getClaimableReward(i)
        // TotalStaked
        this.getTotalStaked(i)
        // 计算APY
        this.computedAPY(stake)
      })
    }, 10000)
  },
  unmounted () {
    clearInterval(this._timer)
    this._timer = null
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
  font-size: 25px;
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
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 30px;
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
.farm-pool-item>.pair-name {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  color: #31C77F;
}
.farm-pool-item .total-staked-num {
  width: 170px;
  font-size: 20px;
  font-weight: 600;
  color: #31C77F;
}
.farm-pool-item .total-staked-num>span {
  display: inline-block;
  max-width: 105px;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: -7px;
}
.farm-pool-item .stake-APY-info {
  width: 80px;
  font-size: 20px;
  font-weight: 600;
  color: #31C77F;
}
.farm-pool-item .stake-APY>p,
.farm-pool-item .total-stated>p {
  margin-bottom: 5px;
  height: 20px;
  line-height: 20px;
}
.farm-pool-item .see-token-info>a,
.farm-pool-item .view-contract>a {
  color: #31C77F !important;
  font-size: 16px;
}
.farm-pool-item .see-token-info>a:hover,
.farm-pool-item .view-contract>a:hover {
  text-decoration: underline !important;
}
.farm-pool-item .see-token-info svg,
.farm-pool-item .view-contract svg {
  fill: #31C77F;
  width: 16px;
  height: 16px;
  vertical-align: -2px;
}
.farm-pool-item .add-to-metamask {
  display: flex;
  justify-content: space-between;
  color: #31C77F;
  font-size: 16px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #31C77F;
}
.farm-pool-item .add-to-metamask:hover {
  background-color: #fafafa;
}
.farm-pool-item .add-to-metamask svg {
  margin-left: 5px;
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
  line-height: 28px;
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
  margin: 15px 0;
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
  .farm-pool .farm-pool-item {
    padding: 15px 25px 30px 25px;
  }
  .farm-pool-item .stake-APY,
  .farm-pool-item .total-staked {
    width: 100%;
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
  }
  .farm-pool-item .total-staked-num>span {
    max-width: 71px;
  }
  .farm-pool-item .stake-APY>p,
  .farm-pool-item .total-staked>p {
    margin: 0 10px;
  }
  .farm-pool-item .stake-APY>p:nth-of-type(1) {
    padding-top: 1px;
    font-weight: 550;
    font-size: 15px;
  }
  .farm-pool-item .stake-APY-info {
    width: auto;
  }
  .farm-pool-item .total-staked-num {
    width: auto;
  }
  .farm-pool-item .total-staked>p:nth-of-type(1) {
    padding-top: 5px;
    font-weight: 550;
    font-size: 15px;
  }
  .farm-pool-item .token-detail {
    text-align: center;
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
  padding: 5px 10px;
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

/* transaction-balance */
.operate-pool span.transaction-balance {
  display: inline-block;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: -5px;
}
.operate-pool p.token-info {
  font-size: 13px;
}
</style>
