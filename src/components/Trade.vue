<template>
  <div class="trade-container">
    <div class="trade">
      <div class="trade-nav">
        <span
          @click="tradeType = 'swap'"
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
                  v-model="from.amount"
                  type="number"
                  placeholder="0.0"
                  min="0"
                  :max="from.balance"
                />
                <span
                  @click="getMax('from')"
                  v-show="from.amount !== from.balance"
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
                  v-model="to.amount"
                  type="number"
                  placeholder="0.0"
                  min="0"
                  :max="to.balance"
                />
                <!-- token -->
                <span @click="showSelectTokenModal('to')" class="token-info">
                  <img class="token-icon" v-if="to.icon" :src="to.icon" alt="token icon" width="24" height="24">
                  {{ to.name || 'Select a currency' }}
                  <i class="iconfont icon-expand-more"></i>
                </span>
              </div>
            </div>
            <!-- swap-button -->
            <div @click="swap" v-if="from.amount>0 && to.amount>0" class="swap-button btn btn-success btn-block">
              Swap
            </div>
            <div v-else class="swap-button btn btn-default btn-blockbtn-default btn-block" disabled>
              Enter an amount
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
              @click="tradeType = 'addLiquidity'"
              class="add-liquidity-btn btn btn-success btn-md"
            >Add Liquidity</div>
          </div>
          <div class="liquidity-content">
            <h4>Your Liquidity</h4>
            <!-- liquidity -->
            <div class="your-liquidity">
              <div v-for="item in liquidity" :key="item.name" class="liquidity-item">
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
                  v-model="input1.amount"
                  type="number"
                  placeholder="0.0"
                  min="0"
                  :max="input1.balance"
                />
                <span
                  @click="getMax('input1')"
                  v-show="input1.amount !== input1.balance"
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
                  v-model="input2.amount"
                  type="number"
                  placeholder="0.0"
                  min="0"
                  :max="input2.balance"
                />
                <span
                  @click="getMax('input2')"
                  v-show="input2.amount !== input2.balance"
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
              v-if="input1Approve && input1.name && input1.amount"
              class="swap-button btn btn-success btn-block"
            >
              Approve {{input1.name}}
            </div>
            <div
              @click="approve('input2')"
              v-if="input2Approve && input2.name && input2.amount"
              class="swap-button btn btn-success btn-block"
            >
              Approve {{input2.name}}
            </div>
            <!-- pair-button -->
            <div
              @click="addLiquidity"
              v-if="!input1Approve && !input2Approve"
              class="swap-button btn btn-success btn-block"
            >
              Supply
            </div>
            <div
              v-else
              class="swap-button btn btn-default btn-blockbtn-default btn-block"
              disabled
            >
              Invalid pair
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

export default {
  data() {
    const tokens = [
      {
        name: 'BNB',
        icon: require('../assets/images/bnb.png'),
        addr: ''
      },
      {
        name: 'USDT',
        addr: '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684',
        icon: require('../assets/images/USDT.png')
      },
      {
        name: 'BUSD',
        addr: '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7',
        icon: require('../assets/images/BUSD.png')
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
    ]

    return {
      tradeType: 'swap',
      tokens: tokens,
      searchToken: '', // 用于搜索token
      searchTokenResult: tokens, // 搜索token的结果, 初始化和tokens相同
      from: {...tokens[0]}, // from默认是BNB
      to: {},
      tokenTo: '', // 选中的token赋值给谁
      input1: {...tokens[0]}, // input1默认也是BNB
      input2: {},
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
      otherTokens: [
        {
          name: 'work',
          addr: '0xDE259d3beCAdc21C1D8d33442aa68f43AB7327f5',
          icon: require('../assets/images/defaultTokenIcon.svg')
        }
      ],
      // routerAddr
      routerAddr: '0xeaBa760F2f0F68981C9D9816741616277c7AbC3f',
      // 标识是否需要approve
      fromApprove: true,
      toApprove: true,
      input1Approve: true,
      input2Approve: true
    }
  },
  methods: {
    // addliquidity
    addLiquidity() {
      const address = this.$store.state.publicAddress
      const addr1 = this.input1.addr
      const addr2 = this.input2.addr
      const amount1 = new BigNumber(this.input1.amount || 0).multipliedBy(1e18)
      const amount2 = new BigNumber(this.input2.amount || 0).multipliedBy(1e18)
      const deadline = Math.floor((new Date).getTime()/1000) + 1200
      // 都有地址
      if (addr1 && addr2) {
        this.routerContract.methods.addLiquidity(addr1, addr2, amount1, amount2, amount1.multipliedBy(0.992), amount2.multipliedBy(0.992), address, deadline).send({
          from: address,
          gas: 100000
        }).then(result => {
          console.log(result)
        })
      }
    },
    // swap
    swap() {
      console.log(this.routerContract.methods)
    },
    // getMax
    getMax (type) {
      this.$set(this[type], 'amount', this[type].balance)
    },
    // 交换 交易的代币 from和to
    exchangeFromAndTo() {
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
      let token = {...this.searchTokenResult[index]}
      // 将选中的token赋值给对应的对象
      // 如果要赋值的对象 对应的另一个对象 已经选中一样的则 互相交换
      if (this.tokenTo === 'to' && this.from.name === token.name) {
        token = this.from // 让token等于from，以此实现交换
        this.from = this[this.tokenTo]
      } else if (this.tokenTo === 'from' && this.to.name === token.name) {
        token = this.to
        this.to = this[this.tokenTo]
      } else if (this.tokenTo === 'input1' && this.input2.name === token.name) {
        token = this.input2
        this.input2 = this[this.tokenTo]
      } else if (this.tokenTo === 'input2' && this.input1.name === token.name) {
        token = this.input1
        this.input1 = this[this.tokenTo]
      }
      this[this.tokenTo] = token
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
      try {
        const result = await $.ajax({
          url: 'https://api-testnet.bscscan.com/api',
          data: {
            module: 'account',
            action: tokenAddr ? 'tokenbalance' : 'balance',
            contractaddress: tokenAddr,
            address: address,
            tag: 'latest',
            apikey: '44MDXAAGI9M1INP37QDYBZBYBUDQBXAPCD'
          }
        })
        if (result.message === 'OK') {
          const balance = result.result / 1e18
          this.$set(target[i], 'balance', balance)
          // i为0时 获取到数据后给from和input1也赋值上
          if (i === 0 && target === this.tokens) {
            this.from.balance = balance
            this.input1.balance = balance
          }
        } else {
          this.getTokenBalance(target, i)
        }
      } catch (error) {
        this.getTokenBalance(target, i)
      }
    },
    // approve
    async approve(token) {
      const address = this.$store.state.publicAddress
      if (address) {
        const approveName = token + 'Approve' // 允许的token所对应的标识名
        const tokeninfo = this[token]
        const amount = new BigNumber(tokeninfo.amount + 10000).multipliedBy(1e18)
        const approveContract = await getFarmContract.getapproveContract(tokeninfo.addr)
        approveContract.methods.approve(this.routerAddr, amount).send({
          from: address
        }).then(() => {
          this[approveName] = false // approve成功，将xxxApprove置为false
        }).catch(() => {
          this[approveName] = true
        })
      }
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
    async "input1.amount" (newVal, oldVal) {
      const address = this.$store.state.publicAddress
      if (newVal !== oldVal && address && this.input1.name !== 'BNB') {
        const tokenAddr = this.input1.addr
        const allowanceContract = await getFarmContract.getAllowanceContract(tokenAddr)
        const allowance = await allowanceContract.methods.allowance(address, this.routerAddr).call()
        if (allowance < newVal*1e18) {
          this.input1Approve = true
        } else {
          this.input1Approve = false
        }
      }
    },
    async "input2.amount" (newVal, oldVal) {
      const address = this.$store.state.publicAddress
      if (newVal !== oldVal && address && this.input2.name !== 'BNB') {
        const tokenAddr = this.input2.addr
        const allowanceContract = await getFarmContract.getAllowanceContract(tokenAddr)
        const allowance = await allowanceContract.methods.allowance(address, this.routerAddr).call()
        if (allowance < newVal*1e18) {
          this.input2Approve = true
        } else {
          this.input2Approve = false
        }
      }
    },
    // swap的 from和to 的amount       from/in  to/out
    "from.amount" (newVal, oldVal) {
      if (newVal !== oldVal && this.from.name && this.to.name) {
        this.factoryContract.methods.getPair(this.from.addr, this.to.addr).call().then(pairAddr => {
          getPairContract(pairAddr).then((pairContract) => {
            pairContract.methods.getReserves().call().then(result => {
              console.log(result)
            })
          })
        })
      }
    },
    "to.amount" (newVal, oldVal) {
      if (newVal !== oldVal) {
        
      }
    },
    // address
    "$store.state.publicAddress"(newAddr, oldAddr) {
      if (!newAddr) return 
      if (newAddr !== oldAddr) {
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
  margin-top: 100px;
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
    margin-top: 80px;
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
  font-size: 15px;
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
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  margin-top: 10px;
  border: 1px solid transparent;
  border-radius: 15px;
  cursor: pointer;
}
.your-liquidity .liquidity-item:hover {
  border-color: #ccc;
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
#tokenModal .token-item:hover {
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
