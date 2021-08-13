<template>
  <div class="trade-container">
    <div class="trade">
      <div class="trade-nav">
        <span
          @click="toSwap"
          :class="[tradeType === 'swap' ? 'active' : '']"
        >Swap</span>
        <!-- liquidity和addLiquidity时都会active -->
        <span
          @click="tradeType = 'liquidity'"
          :class="[
            tradeType === 'liquidity'
            ||
            tradeType === 'addLiquidity'
            ?
            'active'
            :
            ''
          ]"
        >Liquidity</span>
      </div>
      <div class="trade-content">
        <!-- swap -->
        <div v-if="tradeType === 'swap'" class="swap">
          <div class="swap-header">
            <div>
              <h4>Exchange</h4>
              <p>Trade tokens in an instant</p>
            </div>
          </div>
          <div class="swap-content">
            <!-- from -->
            <div class="swap-from">
              <div class="from-header">
                <div>From</div>
                <div>
                  Balance:
                  <span class="trade-token-balance">
                    {{ from.balance >= 0 ? from.balance : '-' }}
                  </span>
                </div>
              </div>
              <div class="from-input">
                <input
                  @focus="fromCanChange = false"
                  @blur="fromCanChange = true"
                  v-model="fromAmount"
                  placeholder="0.0"
                  min="0"
                />
                <span
                  @click="getMax('from')"
                  v-show="fromAmount !== from.balance"
                  class="from-max"
                >Max</span>
                <!-- token -->
                <span @click="showSelectTokenModal('from')" class="token-info">
                  <img class="token-icon" v-if="from.icon" :src="from.icon" alt="token icon" width="24" height="24">
                  {{ from.name || 'Select a currency' }}
                  <i class="iconfont icon-expand-more"></i>
                </span>
              </div>
            </div>
            <div @click="exchangeFromAndTo" class="icon-box">
              <i class="iconfont icon-bottom"></i>
            </div>
            <!-- to -->
            <div class="swap-to">
              <div class="to-header">
                <div>To</div>
                <div>
                  Balance:
                  <span class="trade-token-balance">
                    {{ to.balance >= 0 ? to.balance : '-' }}
                  </span>
                </div>
              </div>
              <div class="to-input">
                <input
                  @focus="toCanChange = false"
                  @blur="toCanChange = true"
                  v-model="toAmount"
                  placeholder="0.0"
                  min="0"
                />
                <!-- token -->
                <span @click="showSelectTokenModal('to')" class="token-info">
                  <img class="token-icon" v-if="to.icon" :src="to.icon" alt="token icon" width="24" height="24">
                  {{ to.name || 'Select a currency' }}
                  <i class="iconfont icon-expand-more"></i>
                </span>
              </div>
            </div>
            <!-- Price -->
            <div v-if="from.name && to.name && fromAmount && toAmount" class="swap-price">
              <div>Price</div>
              <div class="from-to-price">
                <p>{{ (fromAmount/toAmount).toFixed(12) }} {{ from.name }} per {{ to.name }}</p>
                <p>{{ (toAmount/fromAmount).toFixed(12) }} {{ to.name }} per {{ from.name }}</p>
              </div>
            </div>
            <!-- Minimum received -->
            <div v-if="from.name && to.name && fromAmount && toAmount" class="Minimum-received">
              <div>Minimum received</div>
              <div>
                <span>{{ (toAmount * 0.992).toFixed(12) }} {{ to.name }}</span>
              </div>
            </div>
            <!-- approve -->
            <div
              @click="approve('from')"
              v-if="fromApprove && from.name && fromAmount"
              class="swap-button btn btn-success btn-block"
            >
              Approve {{from.name}}
            </div>
            <!-- swap-button -->
            <div
              @click="swap"
              v-if="new Number(fromAmount)<=new Number(from.balance) && fromAmount>0 && toAmount>0 && this.from.name && this.to.name"
              class="swap-button btn btn-success btn-block"
            >
              Swap
            </div>
            <div v-else class="swap-button btn btn-default btn-blockbtn-default btn-block" disabled>
              {{
                new Number(fromAmount) > new Number(from.balance)
                ?
                `Insufficient ${from.name} balance`
                :
                'Enter an amount'
              }}
            </div>
          </div>
        </div>
        <!-- liquidity -->
        <div v-else-if="tradeType === 'liquidity'" class="liquidity">
          <div class="liquidity-header">
            <div>
              <h4>Liquidity</h4>
              <p>Add liquidity to receive LP tokens</p>
            </div>
            <!-- add liquidity -->
            <div
              @click="toAddLiquidityfromliquidity"
              class="add-liquidity-btn btn btn-success btn-md"
            >Add Liquidity</div>
          </div>
          <div class="liquidity-content">
            <h4>Your Liquidity</h4>
            <!-- your-liquidity -->
            <div class="your-liquidity">
              <div v-for="item in liquidity" :key="item.name">
                <div class="liquidity-item">
                  <div class="liquidity-top" @click="showOrHideLiquidity">
                    <div class="liquidity-info">
                      <div class="liquidity-img">
                        <img :src="item.icon1" />
                        <img :src="item.icon2" />
                      </div>
                      <div class="liquidity-name">
                        {{ item.name }}
                      </div>
                    </div>
                    <div class="liquidity-i">
                      <i class="iconfont icon-expand-more"></i>
                    </div>
                  </div>
                  <!-- liquidity-detail -->
                  <div class="liquidity-detail">
                    <div class="liquidity-btn-box">
                      <!-- add -->
                      <div @click="(e) => toAddLiquidity(e, item.name)" class="btn btn-primary btn-lg liquidity-btn">
                        Add
                      </div>
                      <!-- remove -->
                      <div @click="(e) => toRemoveLiquidity(e, item.name)" class="btn btn-primary btn-lg liquidity-btn">
                        Remove
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- add liquidty -->
        <div v-else-if="tradeType === 'addLiquidity'" class="add-liquidity">
          <div class="add-liquidity-header">
            <div>
              <h4 align="center">
                <i @click="tradeType = 'liquidity'" class="iconfont icon-left"></i>
                <span>Add Liquidity</span>
              </h4>
            </div>
          </div>
          <div class="add-liquidity-content">
            <!-- 如果pair不存在提示用户 -->
            <div v-if="!hasPair" class="not-pair">
              <p>You are the first liquidity provider.</p>
              <p>The ratio of tokens you add will set the price of this pool.</p>
              <p>Once you are happy with the rate click supply to review.</p>
            </div>
            <!-- input1 -->
            <!-- 类名就不改了，和swap共用一部分样式 -->
            <div class="swap-from">
              <div class="from-header">
                <div>Input</div>
                <div>
                  Balance:
                  <span class="trade-token-balance">
                    {{ input1.balance >= 0 ? input1.balance : '-' }}
                  </span>
                </div>
              </div>
              <div class="from-input">
                <input
                  v-model="input1Amount"
                  placeholder="0.0"
                  min="0"
                  @focus="input1CanChange = false"
                  @blur="input1CanChange = true"
                />
                <span
                  @click="getMax('input1')"
                  v-show="input1Amount !== input1.balance"
                  class="from-max"
                >Max</span>
                <!-- token -->
                <span @click="showSelectTokenModal('input1')" class="token-info">
                  <img class="token-icon" v-if="input1.icon" :src="input1.icon" alt="token icon" width="24" height="24">
                  {{ input1.name || 'Select a currency' }}
                  <i class="iconfont icon-expand-more"></i>
                </span>
              </div>
            </div>
            <div class="icon-box">
              <i class="iconfont icon-add"></i>
            </div>
            <!-- input2 -->
            <div class="swap-to">
              <div class="to-header">
                <div>Input</div>
                <div>
                  Balance:
                  <span class="trade-token-balance">
                    {{ input2.balance >= 0 ? input2.balance : '-' }}
                  </span>
                </div>
              </div>
              <div class="to-input">
                <input
                  v-model="input2Amount"
                  placeholder="0.0"
                  min="0"
                  @focus="input2CanChange = false"
                  @blur="input2CanChange = true"
                />
                <span
                  @click="getMax('input2')"
                  v-show="input2Amount !== input2.balance"
                  class="to-max"
                >Max</span>
                <!-- token -->
                <span @click="showSelectTokenModal('input2')" class="token-info">
                  <img class="token-icon" v-if="input2.icon" :src="input2.icon" alt="token icon" width="24" height="24">
                  {{ input2.name || 'Select a currency' }}
                  <i class="iconfont icon-expand-more"></i>
                </span>
              </div>
            </div>
            <!-- approve input1与input2 -->
            <div
              @click="approve('input1')"
              v-if="input1Approve && input1.name && input1Amount"
              class="swap-button btn btn-success btn-block"
            >
              Approve {{input1.name}}
            </div>
            <div
              @click="approve('input2')"
              v-if="input2Approve && input2.name && input2Amount"
              class="swap-button btn btn-success btn-block"
            >
              Approve {{input2.name}}
            </div>
            <!-- pair-button -->
            <div
              @click="addLiquidity"
              v-if="!input1Approve
                    &&
                    !input2Approve
                    &&
                    input1Amount>0
                    &&
                    input2Amount>0
                    &&
                    new Number(input1Amount)<=new Number(input1.balance)
                    &&
                    new Number(input2Amount)<=new Number(input2.balance)"
              class="swap-button btn btn-success btn-block"
            >
              Supply
            </div>
            <div
              v-else
              class="swap-button btn btn-default btn-blockbtn-default btn-block"
              disabled
            >
              {{
                (new Number(input1Amount)>=new Number(input1.balance)) || (new Number(input2Amount)>=new Number(input2.balance))
                ?
                'Insufficient balance'
                :
                'Enter an amount'
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- select token -->
    <div class="modal fade" id="tokenModal" tabindex="-1" role="dialog" aria-labelledby="tokenModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header text-center">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">Select a token</h4>
          </div>
          <div class="modal-body">
            <!-- search token -->
            <input v-model="searchToken" type="text" id="search-token" placeholder="Search name or paste address" />
            <!-- tokens -->
            <div class="tokens-title">
              <div>name</div>
              <div>balance</div>
            </div>
            <!-- searchTokenResult -->
            <ul class="list-group">
              <li @click="selectToken(i)" v-for="(token, i) in searchTokenResult" :key="token.name" class="list-group-item token-item">
                <div class="token-info">
                  <img :src="token.icon" alt="">
                  <span>{{ token.name }}</span>
                  <!-- 如果tokens中有则显示remove, 没有则显示add -->
                  <span @click="(e) => addOrRemoveToken(e, token)" class="add-remove-token" v-if="token.type == 'other'">
                    ({{ tokens.indexOf(token) >= 0 ? 'Remove' : 'Add' }})
                  </span>
                </div>
                <div class="trade-token-balance">
                  {{ token.balance>=0 ? token.balance : '-' }}
                </div>
              </li>
            </ul>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js'
import { getRouterContract, getFactoryContract } from '../web3Utils/trade.js'
import getPairContract from '../web3Utils/pair.js'
import getFarmContract from '../web3Utils/farm.js'
import { toNonExponential } from '../utils/index.js'

export default {
  data() {
    const memo = JSON.parse(localStorage.getItem('tokenArr')) || []
    // 把memo中保存的添加到tokens中
    const tokens = [
      {
        name: 'BNB',
        icon: require('../assets/images/bnb.png'),
        addr: '0x094616f0bdfb0b526bd735bf66eca0ad254ca81f'
      },
      {
        name: 'BUSD',
        addr: '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7',
        icon: require('../assets/images/BUSD.png')
      },
      {
        name: 'USDT',
        addr: '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684',
        icon: require('../assets/images/USDT.png')
      },
      {
        name: 'ETH',
        addr: '0x8BaBbB98678facC7342735486C851ABD7A0d17Ca',
        icon: require('../assets/images/eth.png')
      },
      {
        name: 'CAKE',
        addr: '0xF9f93cF501BFaDB6494589Cb4b4C15dE49E85D0e',
        icon: require('../assets/images/cake.svg')
      },
      {
        name: 'DAI',
        addr: '0x8a9424745056Eb399FD19a0EC26A14316684e274',
        icon: require('../assets/images/DAI.png')
      },
      {
        name: 'WBNB',
        addr: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
        icon: require('../assets/images/bnb.png')
      }
    ].concat(memo)
    // 把memo中存在的从othertokens中去除
    const nameArr = memo.map(m => m.name)
    const otherTokens = [
      {
        name: 'work',
        type: 'other',
        addr: '0xDE259d3beCAdc21C1D8d33442aa68f43AB7327f5',
        icon: require('../assets/images/defaultTokenIcon.svg')
      }
    ].filter(t => !(nameArr.includes(t.name)))

    return {
      tradeType: 'swap',
      tokens: tokens,
      searchToken: '', // 用于搜索token
      searchTokenResult: tokens, // 搜索token的结果, 初始化和tokens相同
      from: tokens[0], // from默认是BNB
      fromAmount: '',
      fromCanChange: true, // 默认可变化
      to: {},
      toAmount: '',
      toCanChange: true, // 默认可变化
      tokenTo: '', // 选中的token赋值给谁
      input1: tokens[0], // input1默认也是BNB
      input1Amount: '',
      input1CanChange: true, // 默认可变
      input2: {},
      input2Amount: '',
      input2CanChange: true, // 默认可变
      // liquidity
      liquidity: [
        {
          name: 'BNB/work',
          icon1: require('../assets/images/bnb.png'),
          icon2: require('../assets/images/cake.svg')
        },
        {
          name: 'BUSD/USDT',
          icon1: require('../assets/images/cake.svg'),
          icon2: require('../assets/images/cake.svg')
        }
      ],
      // otherTokens 其他token(可供用户自己添加)
      otherTokens: otherTokens,
      // routerAddr
      routerAddr: '0xeaBa760F2f0F68981C9D9816741616277c7AbC3f',
      // 标识是否需要approve   to应该无需approve
      fromApprove: true,
      input1Approve: true,
      input2Approve: true,
      // 标识addliquidity的pair是否已存在
      hasPair: true
    }
  },
  methods: {
    // addOrRemoveToken
    addOrRemoveToken(e, token) {
      e.stopPropagation()
      const index = this.tokens.indexOf(token)
      let memo = JSON.parse(localStorage.getItem('tokenArr')) || []
      if (index >= 0) {
        this.tokens.splice(index, 1)
        memo = memo.filter(m => m.name !== token.name)
      } else {
        this.tokens.push(token)
        memo.push(token)
      }
      localStorage.setItem('tokenArr', JSON.stringify(memo))
    },
    // addliquidity
    addLiquidity() {
      const address = this.$store.state.publicAddress
      const name1 = this.input1.name
      const name2 = this.input2.name
      const addr1 = this.input1.addr
      const addr2 = this.input2.addr
      const amount1 = new BigNumber(Number(this.input1Amount) * 1e18)
      const amount1Min = amount1.multipliedBy(0.992)
      const amount2 = new BigNumber(Number(this.input2Amount) * 1e18)
      const amount2Min = amount2.multipliedBy(0.992)
      const deadline = Math.floor((new Date).getTime()/1000) + 1200
      // 保存引用（balance/amount）用于交易成功后修改余额等
      const input1 = this.input1
      const input2 = this.input2
      const input1Amount = this.input1Amount
      const input2Amount = this.input2Amount
      // 不含BNB
      if (name1 !== 'BNB' && name2 !== 'BNB') {
        this.routerContract.methods.addLiquidity(addr1, addr2, amount1, amount2, amount1Min, amount2Min, address, deadline).send({
          from: address,
          gas: 10000000
        }).then(() => {
          this.afterAddLiquidity(input1, input2, input1Amount, input2Amount)
        })
      } else if (name1 && name2 && (name1 === 'BNB' || name2 === 'BNB')) {
        // input1和2都存在，但是其中一个是BNB
        if (name1 === 'BNB') {
          this.routerContract.methods.addLiquidityETH(addr2, amount2, amount2Min, amount1Min, address, deadline).send({
            from: address,
            value: amount1,
            gas: 10000000
          }).then(() => {
            this.afterAddLiquidity(input1, input2, input1Amount, input2Amount)
          })
        } else if (name2 === 'BNB') {
          this.routerContract.methods.addLiquidityETH(addr1, amount1, amount1Min, amount2Min, address, deadline).send({
            from: address,
            value: amount2,
            gas: 10000000
          }).then(() => {
            this.afterAddLiquidity(input1, input2, input1Amount, input2Amount)
          })
        }
      }
    },
    afterAddLiquidity(input1, input2, input1Amount, input2Amount) {
      input1.balance -= input1Amount
      input2.balance -= input2Amount
      this.input1Amount = ''
      this.input2Amount = ''
      this.hasPair = true
      // 每次交易完更新BNB
      this.getTokenBalance(this.tokens, 0)
    },
    // swap
    swap() {
      const to = this.$store.state.publicAddress
      if (!to) return
      const amountIn = new BigNumber(this.fromAmount * 1e18)
      // 转bignumber时最多只能有15位小数
      const amountOutMin = new BigNumber(Number(this.toAmount) * 1e18).multipliedBy(0.992)
      const path = [this.from.addr, this.to.addr]
      const deadline = Math.floor((new Date()).getTime() / 1000) + 1200
      // 保存引用，方便交易成功后修改信息
      const fromToken = this.from
      const toToken = this.to
      const fromAmount = this.fromAmount
      const toAmount = this.toAmount
      // 方法名
      let methodName = 'swapExactTokensForTokens'
      let props = [ // 参数
        amountIn,
        amountOutMin,
        path,
        to,
        deadline
      ]
      let sendObj = { // send发送的对象
        from: to,
        gas: 10000000
      }
      if (this.from.name === 'BNB') {
        methodName = 'swapExactETHForTokens'
        sendObj.value = amountIn // 如果是bnb->其他，就要添加value
        props.shift()
      } else if (this.to.name === 'BNB') {
        methodName = 'swapExactTokensForETH'
      }
      this.routerContract.methods[methodName](...props).send(sendObj).then(() => {
        // 交易成功
        fromToken.balance -= fromAmount
        toToken.balance = Number(toToken.balance) + Number(toAmount)
        this.fromAmount = ''
        this.toAmount = ''
        // bnb也查询一下
        this.getTokenBalance(this.tokens, 0)
      })
    },
    // getMax
    getMax (type) {
      const amountType = type + 'Amount'
      this[amountType] = this[type].balance
    },
    // 交换 交易的代币 from和to
    exchangeFromAndTo() {
      this.fromAmount = ''
      this.toAmount = ''
      const token = this.from
      this.from = this.to
      this.to = token
    },
    // showSelectTokenModal
    showSelectTokenModal (type) {
      this.tokenTo = type
      this.searchToken = '' // 每次打开时将用于搜索的字符串置为空串
      $('#tokenModal').modal('show')
    },
    // selectToken
    selectToken (index) {
      // 根据index从searchTokenResult获取到选中的token
      let token = this.searchTokenResult[index]
      // 将选中的token赋值给对应的对象
      // 如果要赋值的对象 对应的另一个对象 已经选中一样的则 互相交换
      // 如果是交换则要把值重置为空
      if (this.tokenTo === 'to' && this.from === token) {
        this.from = this[this.tokenTo]
        this.fromAmount = ''
        this.toAmount = ''
      } else if (this.tokenTo === 'from' && this.to === token) {
        this.to = this[this.tokenTo]
        this.fromAmount = ''
        this.toAmount = ''
      } else if (this.tokenTo === 'input1' && this.input2 === token) {
        this.input2 = this[this.tokenTo]
        this.input1Amount = ''
        this.input2Amount = ''
      } else if (this.tokenTo === 'input2' && this.input1 === token) {
        this.input1 = this[this.tokenTo]
        this.input1Amount = ''
        this.input2Amount = ''
      }
      this[this.tokenTo] = token
      this.input2CanChange = true
      $('#tokenModal').modal('hide')
    },
    // getRouterContract
    async getMyRouterContract () {
      this.routerContract = await getRouterContract()
      this.factoryContract = await getFactoryContract()
    },
    // 获取用户钱包某个币的余额
    async getTokenBalance (target, i) {
      const tokenAddr = target[i].addr
      const address = this.$store.state.publicAddress
      if (!address) return
      let balance = await this.getBalance(tokenAddr, address)
      balance = toNonExponential(balance / 1e18)
      this.$set(target[i], 'balance', balance)
    },
    // 传入token地址和钱包地址 获取token余额
    async getBalance(tokenAddr, address, num = 1) {
      // 发请求查询余额，如果出错会递归查询，但查询次数过多（超过4次）就停止
      if (num > 4) return
      try {
        const result = await $.ajax({
          url: 'https://api-testnet.bscscan.com/api',
          data: {
            module: 'account',
            action: tokenAddr !== '0x094616f0bdfb0b526bd735bf66eca0ad254ca81f' ? 'tokenbalance' : 'balance', // 为bnb地址时则balance
            contractaddress: tokenAddr,
            address: address,
            tag: 'latest',
            apikey: '44MDXAAGI9M1INP37QDYBZBYBUDQBXAPCD'
          }
        })
        if (result.message === 'OK') {
          return result.result
        } else {
          // 没获取到就递归获取
          return await this.getBalance(tokenAddr, address, ++num)
        }
      } catch (err) {
        return await this.getBalance(tokenAddr, address, ++num)
      }
    },
    // approve
    async approve(token) {
      const address = this.$store.state.publicAddress
      if (address) {
        const approveName = token + 'Approve' // 允许的token所对应的标识名
        const amountName = token + 'Amount' // xxxAmount
        const tokeninfo = this[token]
        const amount = new BigNumber(this[amountName] + 10000).multipliedBy(1e18)
        const approveContract = await getFarmContract.getapproveContract(tokeninfo.addr)
        approveContract.methods.approve(this.routerAddr, amount).send({
          from: address
        }).then(() => {
          this[approveName] = false // approve成功，将xxxApprove置为false
        }).catch(() => {
          this[approveName] = true
        })
      }
    },
    // 判断是否需要approve
    async judgeApprove(type) {
      const approveName = type + 'Approve' // 判断的type 所对应的approve标识
      const amountName = type + 'Amount' // amount的name
      if (this[type].name === 'BNB') return this[approveName] = false
      const address = this.$store.state.publicAddress
      if (address && this[type].addr) {
        const tokenAddr = this[type].addr
        const allowanceContract = await getFarmContract.getAllowanceContract(tokenAddr)
        const allowance = await allowanceContract.methods.allowance(address, this.routerAddr).call()
        if (allowance < this[amountName]*1e18) {
          this[approveName] = true
        } else {
          this[approveName] = false
        }
      }
    },
    // toSwap
    toSwap() {
      this.tradeType = 'swap'
      this.from = this.tokens[0]
      this.fromAmount = ''
      this.to = {}
      this.toAmount = ''
    },
    // toAddLiquidityfromliquidity
    toAddLiquidityfromliquidity() {
      this.tradeType = 'addLiquidity'
      this.input1 = this.tokens[0]
      this.input1Amount = ''
      this.input2 = {}
      this.input2Amount = ''
    },
    // showOrHideLiquidity
    showOrHideLiquidity(e) {
      $(e.currentTarget).find('.liquidity-i>i').toggleClass('icon-expand-more')
      $(e.currentTarget).find('.liquidity-i>i').toggleClass('icon-expandless')
      $(e.currentTarget).parent().find('.liquidity-detail').slideToggle()
    },
    // toAddLiquidity
    toAddLiquidity(e, liquidityName) {
      e.stopPropagation()
      this.tradeType = 'addLiquidity'
      const nameArr = liquidityName.split('/')
      const totalTokens = this.tokens.concat(this.otherTokens)
      this.input1 = totalTokens.find(token => {
        return token.name === nameArr[0]
      })
      this.input2 = totalTokens.find(token => {
        return token.name === nameArr[1]
      })
      this.input1Amount = ''
      this.input2Amount = ''
    },
    // toRemoveLiquidity
    toRemoveLiquidity(e, liquidityName) {
      e.stopPropagation()
      alert('还未完成')
    },
    // 计算amount  from/to
    computedFromTo(token) {
      let ByToken = ''
      let methodName = ''
      if (token === 'from') {
        ByToken = 'to'
        methodName = 'getAmountIn'
      } else if (token === 'to') {
        ByToken = 'from'
        methodName = 'getAmountOut'
      }
      const tokenCanChange = token + 'CanChange'
      const tokenAmount = token + 'Amount'
      const ByTokenAmount = ByToken + 'Amount'
      // 要先判断是否可以change
      if (!this[tokenCanChange]) return
      if (!this[token].name || !this[ByToken].name || !(this[ByTokenAmount] > 0)) {
        return this[tokenAmount] = ''
      }
      this.factoryContract.methods.getPair(this[ByToken].addr, this[token].addr).call().then(async pairAddr => {
        const pairContract = await getPairContract(pairAddr)
        const reserves = await pairContract.methods.getReserves().call()
        const amountBy = new BigNumber(this[ByTokenAmount] || 0).multipliedBy(1e18)
        // pair的顺序是固定的 ascii
        // 如果from是大的那个(指ascii)则需要把reserves交换一下
        if (this.from.name > this.to.name) {
          const temp = reserves[0]
          reserves[0] = reserves[1]
          reserves[1] = temp
        }
        this.routerContract.methods[methodName](amountBy, reserves[0], reserves[1]).call().then(amount => {
          this[tokenAmount] = toNonExponential(amount / 1e18)
        })
      }).catch(() => {
        this[tokenAmount] = ''
      })
    },
    // 计算input1/input2
    computedAddAmount(token) {
      let ByToken = ''
      if (token === 'input1') {
        ByToken = 'input2'
      } else if (token === 'input2') {
        ByToken = 'input1'
      }
      const tokenCanChange = token + 'CanChange'
      const tokenAmount = token + 'Amount'
      const ByTokenAmount = ByToken + 'Amount'
      // 要先判断是否可以change
      if (!this[tokenCanChange]) return
      if (!this[token].name || !this[ByToken].name || !(this[ByTokenAmount] > 0)) {
        return this[tokenAmount] = ''
      }
      this.factoryContract.methods.getPair(this[ByToken].addr, this[token].addr).call().then(async pairAddr => {
        const pairContract = await getPairContract(pairAddr)
        const reserves = await pairContract.methods.getReserves().call()
        const amountBy = new BigNumber(this[ByTokenAmount] || 0).multipliedBy(1e18)
        // pair的顺序是固定的 ascii
        const ratio = reserves[0]/reserves[1]
        if (this[token].name > this[ByToken].name) {
          // 如果要计算的token更大，即排在后面。
          this[tokenAmount] = toNonExponential((amountBy / ratio) / 1e18)
        } else if (this[token].name < this[ByToken].name) {
          // 如果要计算的token更小，即排在前面
          this[tokenAmount] = toNonExponential((amountBy * ratio) / 1e18)
        }
      })
    }
  },
  created() {
    this.getMyRouterContract()
  },
  mounted() {
    this.tokens.map((token, i) => {
      this.getTokenBalance(this.tokens, i)
    })
    this.otherTokens.map((token, i) => {
      this.getTokenBalance(this.otherTokens, i)
    })
  },
  watch: {
    // addliquidity  input1和input2
    "input1Amount" (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.judgeApprove('input1')
        // 计算
        this.computedAddAmount('input2')
      }
    },
    "input1.name" (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.judgeApprove('input1')
        // 注：切换币后，先要判断这个pair币是不是存在
        // pair存在则继续，否则提醒用户pair由他首创
        if (!this.input1.addr || !this.input2.addr) return
        this.factoryContract.methods.getPair(this.input1.addr, this.input2.addr).call().then(pairAddr => {
          if (pairAddr === '0x0000000000000000000000000000000000000000') return this.hasPair = false
          // 存在则继续计算
          this.hasPair = true
          this.computedAddAmount('input1')
        })
      }
    },
    "input2Amount" (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.judgeApprove('input2')
        // 计算
        this.computedAddAmount('input1')
      }
    },
    "input2.name" (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.judgeApprove('input2')
        // 注：切换币后，先要判断这个pair币是不是存在
        // pair存在则继续，否则提醒用户pair由他首创
        if (!this.input1.addr || !this.input2.addr) return
        this.factoryContract.methods.getPair(this.input1.addr, this.input2.addr).call().then(pairAddr => {
          if (pairAddr === '0x0000000000000000000000000000000000000000') return this.hasPair = false
          // 存在则继续计算
          this.hasPair = true
          this.computedAddAmount('input2')
        })
      }
    },
    // swap的 from和to 的amount       from/in  to/out
    "fromAmount" (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.judgeApprove('from')
        // getAmountIn/getAmountOut
        this.computedFromTo('to') // 传入要计算的
      }
    },
    "from.name" (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.judgeApprove('from')
        // getAmountIn/getAmountOut
        this.computedFromTo('from') // 传入要计算的
      }
    },
    "toAmount" (newVal, oldVal) {
      if (newVal !== oldVal) {
        // to不需要approve
        // getAmountIn/getAmountOut
        this.computedFromTo('from') // 传入要计算的
      }
    },
    "to.name" (newVal, oldVal) {
      if (newVal !== oldVal) {
        // to不需要approve
        // getAmountIn/getAmountOut
        this.computedFromTo('to') // 传入要计算的
      }
    },
    // address
    "$store.state.publicAddress"(newAddr, oldAddr) {
      if (!newAddr) return 
      if (newAddr && newAddr !== oldAddr) {
        this.getMyRouterContract()
        this.tokens.map((token, i) => {
          this.getTokenBalance(this.tokens, i)
        })
        this.otherTokens.map((token, i) => {
          this.getTokenBalance(this.otherTokens, i)
        })
      }
    },
    // searchToken
    searchToken(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal.startsWith('0x')) {
          // 若是以0x开头则是地址
          // 如果是填地址，则要把otherTokens里的也遍历一遍
          const tokenResult = this.tokens.filter(token => {
            return token.addr.toLowerCase() == newVal.trim().toLowerCase()
          })
          const otherT = this.otherTokens.filter(token => {
            return token.addr.toLowerCase() == newVal.trim().toLowerCase()
          })
          this.searchTokenResult = tokenResult.concat(otherT)
        } else {
          // 不以0x开头则认为是name
          this.searchTokenResult = this.tokens.filter(token => {
            return (token.name.indexOf(newVal.trim()) !== -1)
          })
        }
      }
    }
  }
}
</script>

<style>
.trade-container {
  padding: 10px 30px 50px 30px;
}
.trade {
  position: relative;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  overflow: hidden auto;
  z-index: 1;
  /* -webkit-box-pack: center; */
  justify-content: flex-start;
  background-image: url(../assets/images/group-pancake.svg);
  background-repeat: no-repeat;
  background-position: center bottom 24px;
  background-size: 90%;
  user-select: none;
}
.trade-content {
  margin-top: 80px;
}
@media screen and (min-width: 968px){
  .trade {
    background-image: url(../assets/images/arch-light.svg), url(../assets/images/left-pancake.svg), url(../assets/images/right-pancake.svg);
    background-repeat: no-repeat;
    background-position: center 420px, 10% 230px, 90% 230px;
    background-size: contain, 266px, 266px;
    min-height: 85vh;
  }
}
@media screen and (max-width: 768px) {
  .trade-container {
    padding: 10px 10px 50px 10px;
  }
  .trade {
    justify-content: flex-start;
  }
  .trade-content {
    margin-top: 65px;
  }
  .trade div.swap,
  .trade div.liquidity,
  .trade div.add-liquidity {
    width: 350px;
  }
}
.trade-nav {
  position: absolute;
  top: 20px;
  background-color: rgb(238, 234, 244);
  border-radius: 20px;
  cursor: pointer;
}
.trade-nav > span {
  display: inline-block;
  padding: 5px 15px;
  font-weight: 600;
  color: #8f80ba;
  border-radius: 20px;
}
.trade-nav > span.active {
  color: #fff;
  background-color: #8f80ba;
}
.trade .swap {
  width: 450px;
  padding: 24px;
  background-color: #fff;
  border-radius: 20px;
}
.trade .liquidity {
  width: 450px;
  padding: 24px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 20px;
}
.swap-header,
.liquidity-header {
  color: #8f80ba;
  border-bottom: 1px solid #ccc;
}
.swap-header h4,
.liquidity-header h4 {
  margin: 5px 0;
  font-weight: 600;
  color: #452a7a;
}

.swap-content {
  margin-top: 20px;
}
.swap-content input {
  width: 50%;
  font-size: 18px;
  font-weight: 540;
  border: none;
  outline: none;
  background-color: rgb(238, 234, 244);
}
.swap-content .token-info {
  float: right;
  padding: 2px 10px;
  line-height: 25px;
  cursor: pointer;
  border-radius: 10px;
}
.swap-content .token-info:hover {
  background-color: #f4f4f4;
}
.swap-content .token-info>i.iconfont {
  font-size: 18px;
  vertical-align: -2px;
}
.swap-content img.token-icon {
  width: 24px;
  height: 24px;
  vertical-align: -7px;
}
.swap-content .icon-box {
  width: 30px;
  height: 30px;
  margin: 10px auto;
  line-height: 30px;
  text-align: center;
  background-color: #f4f4f4;
  border-radius: 50%;
  color: #31c77f;
  cursor: pointer;
}
.swap-content .icon-box:hover {
  opacity: 0.5;
}
.swap-content .icon-box>i.iconfont {
  font-size: 20px;
}
.swap-from,
.swap-to {
  padding: 10PX 0;
  background-color: rgb(238, 234, 244);
  border-radius: 15px;
}
.swap-content .swap-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px 5px 10px;
  font-weight: 520;
  color: #452a7a;
  border-bottom: 1px solid #ccc;
}
.swap-price .from-to-price p {
  margin: 0;
  text-align: right;
}
.swap-content .Minimum-received {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  font-weight: 520;
  color: #452a7a;
}
.from-max,
.to-max {
  margin-left: 4px;
  color: #31c77f;
  cursor: pointer;
}
.from-max:hover,
.to-max:hover {
  color: #31cc7d;
}
.from-header,
.to-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}
.from-input,
.to-input {
  padding: 10px 20px;
}
.swap-button.btn {
  margin-top: 20px;
  padding: 10px 0;
  border-radius: 20px;
}
.liquidity .add-liquidity-btn {
  padding: 10px 15px;
  margin: 10px 0 20px 0;
  font-size: 16px;
  font-weight: 600;
  border-radius: 15px;
}
.liquidity-content {
  padding-top: 20px;
}
.liquidity-content h4 {
  margin: 5px 0;
  font-weight: 600;
  color: #452a7a;
}
.your-liquidity {
  padding-top: 10px;
}
.your-liquidity .liquidity-item {
  padding: 10px 15px;
  margin-top: 10px;
  border: 1px solid transparent;
  border-radius: 15px;
  cursor: pointer;
}
.your-liquidity .liquidity-item:hover {
  border-color: #ccc;
}
.your-liquidity .liquidity-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.your-liquidity .liquidity-detail {
  display: none;
  padding-top: 20px;
}
.your-liquidity .liquidity-btn-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.your-liquidity .liquidity-btn {
  width: 48%;
  border-radius: 15px;
}
.your-liquidity .liquidity-img>img {
  width: 24px;
  height: 24px;
}
.liquidity-item .liquidity-name {
  display: inline-block;
  margin-left: 15px;
}
.liquidity-item .liquidity-info {
  line-height: 35px;
}
.liquidity-item .liquidity-i>i {
  font-size: 25px;
}

.liquidity-item .liquidity-img {
  display: inline-block;
}

/* add-liquidity */
.add-liquidity {
  width: 450px;
  padding: 24px;
  background-color: #fff;
  border-radius: 20px;
}
.add-liquidity-header {
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.add-liquidity-header i {
  float: left;
  padding: 5px;
  font-weight: 700;
  color: #8f80ba;
  border-radius: 50%;
  background-color: #f4f4f4;
  cursor: pointer;
}
.add-liquidity-content {
  margin-top: 20px;
}
.add-liquidity-content input {
  width: 50%;
  font-size: 18px;
  border: none;
  outline: none;
  background-color: rgb(238, 234, 244);
}
.add-liquidity-content .token-info {
  float: right;
  padding: 2px 10px;
  line-height: 25px;
  cursor: pointer;
  border-radius: 10px;
}
.add-liquidity-content .token-info:hover {
  background-color: #f4f4f4;
}
.add-liquidity-content .token-info>i.iconfont {
  font-size: 18px;
  vertical-align: -2px;
}
.add-liquidity-content .icon-box {
  width: 30px;
  height: 30px;
  margin: 10px auto;
  line-height: 30px;
  text-align: center;
  font-weight: 600;
  background-color: #f4f4f4;
  border-radius: 50%;
}
.add-liquidity-content .not-pair {
  padding: 15px;
  margin-bottom: 20px;
  font-weight: 500;
  color: #452a7a;
  border: 1px solid #ddd;
  border-radius: 15px;
}
@media screen and (max-width: 768px) {
  .add-liquidity-content input {
    width: 40%;
  }
}

#tokenModal .modal-dialog {
  width: 400px;
}
#tokenModal .tokens-title {
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  font-size: 16px;
  font-weight: 550;
  color: #31c77f;
}
#tokenModal .list-group {
  height: 45vh;
  overflow: auto;
}
#tokenModal .token-item {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  border: none;
  cursor: pointer;
}
#tokenModal .token-item .add-remove-token:hover {
  color: #31c77f;
}
#tokenModal .token-item img {
  width: 24px;
  height: 24px;
  vertical-align: -7px;
}
#tokenModal .token-info>span {
  margin-left: 8px;
}
.trade-token-balance {
  display: inline-block;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  vertical-align: -5px;
}
/* search-token */
#search-token {
  width: 100%;
  margin: 15px 0;
  padding: 15px 10px;
  font-size: 18px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 10px;
}
#search-token:focus {
  border-color: #31c77f;
}

@media screen and (max-width: 768px) {
  #tokenModal .modal-dialog {
    width: 95%;
  }
  .swap-content input {
    width: 40%;
  }
  .from-max, .to-max {
    margin-left: 0px;
  }
}
/* 补充，防止在特小机型上出bug */
@media screen and (max-width: 350px){
  .trade div.swap, .trade div.liquidity, .trade div.add-liquidity {
    width: 320px;
  }
  .from-header, .to-header {
    padding: 8px 15px;
  }
  .from-input, .to-input {
    padding: 15px;
  }
  .swap-content input {
    width: 38%;
  }
  .add-liquidity-content .token-info {
    padding: 3px 5px;
  }
}
.btn-block+.btn-block {
  margin-top: 10px !important;
}
</style>
