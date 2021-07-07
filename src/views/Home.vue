<template>
  <div class="home">
    <!-- home-header -->
    <header class="home-header clearfix">
      <router-link to="/" class="site-logo-landing-desktop hidden-xs">
        <img src="../assets/images/logo.png" width="320" height="60">
      </router-link>
      <router-link to="/" class="site-logo-landing-mobile hidden-sm hidden-md hidden-lg">
        <img src="../assets/images/logo-mob.svg" width="135" height="49">
      </router-link>
      <nav class="site-menu-custom">
        <a href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F">
          <div class="btn btn-default btn-lg hidden-xs">
            Buy ALPACA
          </div>
        </a>
        <router-link to="/app">
          <div class="btn btn-success btn-lg">
            Launch App
          </div>
        </router-link>
      </nav>
    </header>
    <!-- home-landing -->
    <div id="home-landing">
      <div class="container text-center" style="max-width: 100%;">
      <div class="hidden-xs">
        <h2 class="text-big">Leveraged yield farming <br>by the Alpacas, for the Alpacas</h2>
      </div>
      <div class="hidden-sm hidden-md hidden-lg">
        <h2 class="text-xs">Leverage yield<br> farming by the Alpacas,<br>for the Alpacas</h2>
      </div>
        <div class="spacer-35"></div>
        <p class="text-info">Let this majestic South American mammal take your yield to new heights</p>
        <div class="spacer-35"></div>
        <router-link to="/app">
          <div class="btn btn-success btn-lg">
            Use Alpaca
          </div>
        </router-link>
        <router-link to="/docs">
          <div class="btn btn-default btn-lg">
            Documentation
          </div>
        </router-link>
        <div class="btn btn-default btn-lg" @click="scrollToQuestion">
          <span>FAQs</span>
        </div>
      </div>
    </div>
    <!-- section2-landing -->
    <div id="section2-landing">
      <div class="container text-center">
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-4">
            <div class="icon-box">
              <img class="sec1-img" src="../assets/images/team.svg">
              <h4>Community<br>owned</h4>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4">
            <div class="icon-box">
              <img class="sec1-img" src="../assets/images/coin.svg">
              <h4>No Investor</h4>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4">
            <div class="icon-box">
              <img class="sec1-img" src="../assets/images/handcheck.svg">
              <h4>Fair Launch</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- section3-landing -->
    <div id="section3-landing">
      <div class="container text-center">
        <h2>
          Learn more about
          <br class="hidden-sm hidden-md hidden-lg" />
          <span style="color:#31C77F; font-weight:700;">Alpaca Finance</span>
        </h2>
        <div class="row">
          <div class="col-sm-4 col-md-4 col-lg-4">
            <a href="https://medium.com/alpaca-finance/introducing-alpaca-finance-d6e858896efd" target="blank">
              <div class="icon-box">
                <img src="../assets/images/alpaca.svg">
                <h4>Intro to<br>Alpaca Finance</h4>
              </div>
            </a>
          </div>
          <div class="col-sm-4 col-md-4 col-lg-4">
            <router-link to="/docs">
              <div class="icon-box">
                <img src="../assets/images/rocket.svg">
                <h4>Tokenomics</h4>
              </div>
            </router-link>
          </div>
          <div class="col-sm-4 col-md-4 col-lg-4">
            <router-link to="/docs">
              <div class="icon-box">
                <img src="../assets/images/roadmap.svg">
                <h4>Roadmap</h4>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- section4-landing -->
    <div id="section4-landing">
      <div class="container text-center">
        <h2>
          Our contracts
          <br class="hidden-sm hidden-md hidden-lg" />
          <span>have been audited by</span>
        </h2>
        <div class="row">
          <div class="col-sm-6 col-md-6 col-lg-6">
            <a href="https://bit.ly/3xqIo4j" target="blank">
              <div class="icon-box">
                <img src="../assets/images/peckshield.svg">
              </div>
            </a>
          </div>
          <div class="col-sm-6 col-md-6 col-lg-6">
            <a href="https://bit.ly/3gnxlmS" target="blank">
              <div class="icon-box">
                <img src="../assets/images/certik.svg">
              </div>
            </a>
          </div>
          <div class="col-sm-6 col-md-6 col-lg-6">
            <a href="https://bit.ly/3wuhd8N" target="blank">
              <div class="icon-box">
                <img src="../assets/images/slowmist.svg">
              </div>
            </a>
          </div>
          <div class="col-sm-6 col-md-6 col-lg-6">
            <a href="https://bit.ly/2Ss4zZr" target="blank">
              <div class="icon-box">
                    <img src="../assets/images/inspex.svg">
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- section5-landing -->
    <div id="section5-landing">
      <div class="container text-center">
        <h2>Our Partners </h2>
        <div class="row">
          <div class="col-sm-3 col-md-3 col-lg-3">
            <a href="https://wault.finance/" target="blank">
              <div class="icon-box">
                <img src="../assets/images/wault.svg">
                <h4>Wault Finance</h4>
              </div>
            </a>
          </div>
          <div class="col-sm-3 col-md-3 col-lg-3">
            <a href="https://pancakeswap.finance/" target="blank">
              <div class="icon-box">
                <img src="../assets/images/cake.svg">
                <h4>PancakeSwap</h4>
              </div>
            </a>
          </div>
          <div class="col-sm-3 col-md-3 col-lg-3">
            <a href="https://dodoex.io/" target="blank">
              <div class="icon-box">
                <img src="../assets/images/dodo.svg">
                <h4>DODO</h4>
              </div>
            </a>
          </div>
          <div class="col-sm-3 col-md-3 col-lg-3">
            <a href="https://multiplier.finance/" target="blank">
              <div class="icon-box">
                <img src="../assets/images/multiplier.svg">
                <h4>Multiplier</h4>
              </div>
            </a>
          </div>
          <div class="col-sm-3 col-md-3 col-lg-3">
            <a href="https://belt.fi/bsc/" target="blank">
              <div class="icon-box">
                <img src="../assets/images/belt.svg">
                <h4>Belt</h4>
              </div>
            </a>
          </div>
          <div class="col-sm-3 col-md-3 col-lg-3">
            <a href="https://www.boringdao.com/" target="blank">
              <div class="icon-box">
                <img src="../assets/images/borring.svg">
                <h4>Boring DAO</h4>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- section6-landing -->
    <div id="section6-landing">
      <div class="container text-center">
        <h2>Join our community</h2>
        <div class="row">
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
          <a href="https://twitter.com/AlpacaFinance" target="blank">
            <div class="icon-box">
              <i class="iconfont icon-twitter"></i>
              <h4>Twitter</h4>
              <p>Follow @AlpacaFinance<br>for the latest<br>news and updates</p>
            </div>
          </a>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <a href="https://t.me/alpacafinance" target="blank">
              <div class="icon-box">
                <i class="iconfont icon-telegram"></i>
                <h4>Telegram</h4>
                <p>Mix and mingle with<br>your fellow Alpacas</p>
              </div>
            </a>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <a href="https://discord.gg/WnUWeRNTwk" target="blank">
            <div class="icon-box">
              <i class="iconfont icon-discord "></i>
              <h4>Discord</h4>
              <p>Meet your fellow<br>community members,<br>and chat with them<br>in real time</p>
            </div>
            </a>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <a href="https://github.com/liaolonghui/Alpaca" target="blank">
            <div class="icon-box">
              <i class="iconfont icon-GitHub"></i>
              <h4>Github</h4>
              <p>Review our code</p>
            </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- section7-landing -->
    <div id="section7-landing" ref="questions">
      <div class="container text-center">
        <h2>Frequently asked questions</h2>
        <div class="spacer-70"></div>
        <div class="accordion-main">
          <button class="accordion" @click="touchQuestion">What is Alpaca Finance?</button>
          <div class="panel">
            <p>Alpaca Finance is the largest lending protocol allowing leveraged yield farming on Binance Smart Chain. It helps lenders to earn safe and stable yields, and offers borrowers undercollateralized loans for leveraged yield farming positions, vastly multiplying their farming principals and resulting profits.‌</p>
            <p>Furthermore, Alpacas are a virtuous breed. That’s why, we are a fair-launch project with no pre-sale, no investor, and no pre-mine. So from the beginning, this has always been a product built by the people, for the people. Or as we like to say: <b>by the Alpacas, for the Alpacas.</b></p>
          </div>
        </div>
        <div class="accordion-main">
          <button class="accordion" @click="touchQuestion">What is yield farming?</button>
          <div class="panel">
            <p>Yield farming is an innovative DeFi concept where users stake or lend their crypto assets, providing liquidity in order to receive returns.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    // 点击问题，展示回答
    touchQuestion(e) {
      $(e.target).toggleClass('active')
      $(e.target).parent().find('.panel').toggle()
    },
    // 滚动到问题
    scrollToQuestion() {
      const questions = this.$refs.questions
      $("html,body").animate({ scrollTop: questions.offsetTop }, 500);
    }
  },
}
</script>

<style>
/* home-header */
.site-logo-landing-desktop {
  display: inline-block;
  margin: 40px 0 0 60px;
}
.site-logo-landing-mobile {
  display: inline-block;
}
.site-menu-custom {
  float: right;
  margin: 40px 70px 0 0;
}
@media screen and (max-width: 840px) {
  .site-menu-custom {
    margin: 10px 10px 0 0;
  }
}
.site-menu-custom>.btn:nth-of-type(2) {
  margin-left: 20px;
}
.site-menu-custom .btn-success a {
  color: white !important;
}
.site-menu-custom a:nth-of-typ {
  color: black !important;
}
/* home-landing */
#home-landing {
  padding-top: 100px;
  padding-bottom: 170px;
  background: url(../assets/images/bgnew.svg);
  background-size: 100%;
  background-position: bottom center;
  background-repeat: no-repeat;
}
#home-landing .btn-success a {
  color: white !important;
}
#home-landing .btn {
  margin: 10px 10px 0 0;
}
@media screen and (max-width: 740px) {
  #home-landing .btn {
    display: block;
    margin: 10px 20px;
  }
}
.spacer-35 {
  margin-bottom: 35px;
}
.text-big {
  font-size: 48px;
}
.text-xs {
  font-size: 4.5vw;
}
.text-info {
  color: #0F1228;
}
/* section2-landing */
#section2-landing {
  padding: 70px 0;
}
.icon-box h4 {
  font-weight: bold;
  font-size: 18px;
}
.sec1-img {
  padding: 60px;
  background: #F6F4F5;
  border-radius: 50%;
  margin-bottom: 10px;
  width: 300px;
}
@media screen and (max-width: 1024px) {
  .sec1-img {
    margin-bottom: 30px;
    width: 200px;
    padding: 35px;
  }
}
/* section3-landing */
#section3-landing {
  padding: 70px 0;
  background-color: #f4f4f4;
}
#section3-landing h2 {
  font-size: 44px;
}
#section3-landing .icon-box {
  height: 350px;
  padding: 70px 0;
  margin: 20px 20px;
  background-color: #fff;
  box-shadow: 0px 8px 22px -6px rgb(24 39 75 / 12%), 0px 14px 64px -4px rgb(24 39 75 / 12%);
  border-radius: 10px;
}
#section3-landing .icon-box h4 {
  font-size: 24px;
  color: #31C77F;
  margin-top: 40px;
  font-weight: 600;
}
#section3-landing .icon-box img {
  width: 146px;
  height: 146px;
}
/* section4-landing */
#section4-landing {
  padding: 70px 0;
}
#section4-landing h2 {
  font-size: 44px;
  letter-spacing: 2px;
}
#section4-landing .icon-box {
  background: #ffffff;
  padding: 40px 20px;
  box-shadow: 0px 8px 22px -6px rgb(24 39 75 / 12%), 0px 14px 64px -4px rgb(24 39 75 / 12%);
  border-radius: 10px;
  min-height: 140px;
  margin: 20px 40px;
}
#section4-landing img {
  width: 400px;
  height: 100px;
}
@media screen and (max-width: 1024px) {
  #section4-landing img {
    width: 300px;
    height: 75px;
  }
}
@media screen and (max-width: 765px) {
  #section4-landing img {
    width: 200px;
    height: 50px;
  }
}
/*  section5-landing  */
#section5-landing {
  padding: 70px 0;
  background-color: #f4f4f4;
}
#section5-landing h2 {
    font-size: 44px;
}
#section5-landing img {
    width: 40px;
    margin-top: -5px;
}
#section5-landing .icon-box {
  background-color: #fff;
  border: 1px solid #80808047;
  border-radius: 10px;
  min-height: 60px;
  text-align: left;
  padding-left: 15px;
  margin: 10px 0;
}
#section5-landing .icon-box:hover {
  border-color: #31C77F;
}
#section5-landing .icon-box h4 {
  font-size: 20px;
  color: #0F1228;
  margin-top: 15px;
  margin-left: 5px;
  font-weight: 200;
  display: inline-block;
}
@media only screen and (max-width: 767px){
  #section5-landing img {
    width: 35px;
  }
  #section5-landing .icon-box {
    margin: 10px 70px;
  }
  #section5-landing h2 {
    font-size: 42px;
  }
}
/* section6-landing */
#section6-landing {
  padding: 70px 0;
}
#section6-landing h2 {
  font-size: 44px;
}
#section6-landing .icon-box {
  border: 2px solid #F6F4F5;
  background: #F6F4F5;
  border-radius: 10px;
  padding: 80px 20px 0px 20px;
  border-radius: 10px;
  height: 410px;
  margin: 20px;
}
#section6-landing .icon-box:hover {
  border-color: #31C77F;
}
#section6-landing .icon-box h4 {
  font-size: 24px;
  color: #0F1228;
  font-weight: 600;
  margin: 30px 0px;
  text-decoration: none;
}
#section6-landing .icon-box:hover>h4 {
  color: #31C77F;
}
#section6-landing i {
  font-size: 70px;
}
#section6-landing a {
  color: #0F1228 !important;
}
/* section7-landing */
.spacer-70 {
  margin-bottom: 70px;
}
#section7-landing {
  padding: 70px 0;
  background: #f4f4f4;
}
#section7-landing h2 {
  font-size: 44px;
}
.accordion-main {
  border: 1px solid #E2E2E2;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
}
.accordion {
  cursor: pointer;
  width: 100%;
  outline: none;
  transition: 0.4s;
  font-size: 21px;
  font-weight: 500;
  background-color: transparent;
  border: 0px;
  text-align: left;
}
.accordion:before {
  content: '\25CF';
  font-size: 23px;
  color: #31C77F;
  margin-right: 15px;
}
.accordion:after {
  content: '\002B';
  font-size: 23px;
  color: #31C77F;
  margin-left: 5px;
  float: right;
}
.active:after {
  content: "\002D";
  color: #31C77F;
}
.active, .accordion:hover {
  background-color: transparent;
  color: #0F1228;
}
.panel {
  padding: 0px 32px;
  display: none;
  overflow: hidden;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  background: transparent !important;
  border: 0px;
  box-shadow: none;
}
.panel p {
  opacity: 1;
  padding: 20px 0px 0px 0px;
}
</style>
