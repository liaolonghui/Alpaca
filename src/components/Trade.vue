<template>
  <div class="trade-container">
    <div class="trade">
      <div class="trade-nav">
        <span
          @click="tradeType = 'swap'"
          :class="[tradeType === 'swap' ? 'active' : '']"
        >Swap</span>
        <span
          @click="tradeType = 'liquidity'"
          :class="[tradeType === 'liquidity' ? 'active' : '']"
        >Liquidity</span>
      </div>
      <div class="trade-content">
        <!-- swap -->
        <div v-if="tradeType === 'swap'" class="swap">
          Exchange
        </div>
        <!-- liquidity -->
        <div v-else-if="tradeType = 'liquidity'" class="liquidity">
          Liquidity
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tradeType: 'swap'
    }
  }
}
</script>

<style>
.trade-container {
  padding: 0 30px 50px 30px;
}
.trade {
  position: relative;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  padding: 32px 16px;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  overflow: hidden auto;
  z-index: 1;
  /* -webkit-box-pack: center; */
  justify-content: center;
  background-image: url(../assets/images/group-pancake.svg);
  background-repeat: no-repeat;
  background-position: center bottom 24px;
  background-size: 90%;
  background-color: #fff;
  border-radius: 20px;
  user-select: none;
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
    padding: 0 10px 50px 10px;
  }
}
.trade-nav {
  position: absolute;
  top: 50px;
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
</style>
