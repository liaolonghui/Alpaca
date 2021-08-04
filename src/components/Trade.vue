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
                <div>Balance: {{ from.balance || '-' }}</div>
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
            <div class="icon-box">
              <i class="iconfont icon-bottom"></i>
            </div>
            <!-- to -->
            <div class="swap-to">
              <div class="to-header">
                <div>To</div>
                <div>Balance: {{ to.balance || '-' }}</div>
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
            <div v-if="from.amount>0 && to.amount>0" class="swap-button btn btn-success btn-block">
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
                <div>Balance: {{ input1.balance || '-' }}</div>
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
                <div>Balance: {{ input2.balance || '-' }}</div>
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
            <!-- pair-button -->
            <div v-if="input1.amount>0 && input2.amount>0" class="swap-button btn btn-success btn-block">
              Supply
            </div>
            <div v-else class="swap-button btn btn-default btn-blockbtn-default btn-block" disabled>
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
                  <div class="tokens-title">
                    <div>name</div>
                    <div>balance</div>
                  </div>
                  <ul class="list-group">
                      <li @click="selectToken(i)" v-for="(token, i) in tokens" :key="token.name" class="list-group-item token-item">
                        <div class="token-info">
                          <img :src="token.icon" alt="">
                          <span>{{ token.name }}</span>
                        </div>
                        <div>
                          {{ token.balance }}
                        </div>
                      </li>
                  </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const tokens = [
      {
        name: 'BNB',
        icon: require('../assets/images/bnb.png'),
        balance: 1
      },
      {
        name: 'work',
        icon: require('../assets/images/cake.svg'),
        balance: 233
      },
      {
        name: 'cake',
        icon: require('../assets/images/cake.svg'),
        balance: 120000
      },
      {
        name: 'not-cake',
        icon: require('../assets/images/cake.svg'),
        balance: 233333
      }
    ]

    return {
      tradeType: 'swap',
      tokens: tokens,
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
      ]
    }
  },
  methods: {
    // getMax
    getMax (type) {
      this.$set(this[type], 'amount', this[type].balance)
    },
    // showSelectTokenModal
    showSelectTokenModal (type) {
      this.tokenTo = type
      $('#tokenModal').modal('show') 
    },
    // selectToken
    selectToken (index) {
      const token = {...this.tokens[index]}
      // 将选中的token赋值给对应的对象
      // 如果要赋值的对象 对应的另一个对象 已经选中一样的则不能选
      if (this.tokenTo === 'to' && this.from.name === token.name) {
        return $('#tokenModal').modal('hide')
      } else if (this.tokenTo === 'from' && this.to.name === token.name) {
        return $('#tokenModal').modal('hide')
      } else if (this.tokenTo === 'input1' && this.input2.name === token.name) {
        return $('#tokenModal').modal('hide')
      } else if (this.tokenTo === 'input2' && this.input1.name === token.name) {
        return $('#tokenModal').modal('hide')
      }
      this[this.tokenTo] = token
      $('#tokenModal').modal('hide')
    }
  },
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
  font-size: 18px;
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
}
.swap-content .icon-box {
  width: 30px;
  height: 30px;
  margin: 10px auto;
  line-height: 30px;
  text-align: center;
  background-color: #f4f4f4;
  border-radius: 50%;
}
.swap-content .icon-box>i.iconfont {
  font-size: 20px;
}
.swap-from,
.swap-to {
  background-color: rgb(238, 234, 244);
  border-radius: 15px;
}
.from-max,
.to-max {
  margin-left: 20px;
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
  color: #8f80ba;
}
#tokenModal .token-item {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  cursor: pointer;
}
#tokenModal .token-item:hover {
  color: #8f80ba;
  border-color: #8f80ba;
}
#tokenModal .token-item img {
  width: 24px;
  height: 24px;
}
#tokenModal .token-info>span {
  margin-left: 8px;
}
@media screen and (max-width: 768px) {
  #tokenModal .modal-dialog {
    width: 90%;
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
</style>
