<template>
  <div class="home">
    <!-- home-header -->
    <header class="home-header clearfix">
      <a href="/" class="site-logo-landing-desktop hidden-xs">
        <img src="../assets/images/logo.png" width="320" height="60">
      </a>
      <a href="/" class="site-logo-landing-mobile hidden-sm hidden-md hidden-lg">
        <img src="../assets/images/logo-mob.svg" width="135" height="49">
      </a>
      <nav class="site-menu-custom">
        <div class="btn btn-default btn-lg hidden-xs">
          <a href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F">Buy ALPACA</a>
        </div>
        <div class="btn btn-success btn-lg">
          <router-link to="/app">Launch App</router-link>
            <a href="http://app.alpacafinance.org" target="blank"></a>
        </div>
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
        <div class="btn btn-success btn-lg">
          <router-link to="/app">Use Alpaca</router-link>
        </div>
        <div class="btn btn-default btn-lg">
          <router-link to="/docs">Documentation</router-link>
        </div>
        <div class="btn btn-default btn-lg">
          <a href="#section5-landing">FAQs</a>
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
          <div class="column4">
            <a href="https://wault.finance/" target="blank">
              <div class="icon-box">
                <img src="../assets/images/wault.svg">
                <h4>Wault Finance</h4>
              </div>
            </a>
          </div>
          <div class="column4">
            <a href="https://pancakeswap.finance/" target="blank">
              <div class="icon-box">
                <img src="../assets/images/cake.svg">
                <h4>PancakeSwap</h4>
              </div>
            </a>
          </div>
          <div class="column4">
            <a href="https://dodoex.io/" target="blank">
              <div class="icon-box">
                <img src="../assets/images/dodo.svg">
                <h4>DODO</h4>
              </div>
            </a>
          </div>
          <div class="column4">
            <a href="https://multiplier.finance/" target="blank">
              <div class="icon-box">
                <img src="../assets/images/multiplier.svg">
                <h4>Multiplier</h4>
              </div>
            </a>
          </div>
          <div class="column4">
            <a href="https://belt.fi/bsc/" target="blank">
              <div class="icon-box">
                <img src="../assets/images/belt.svg">
                <h4>Belt</h4>
              </div>
            </a>
          </div>
          <div class="column4">
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
  </div>
</template>

<script>
export default {
  name: 'Home'
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
@media screen and (max-width: 1000px) {
  #section4-landing img {
    width: 300px;
    height: 75px;
  }
}
/*  section5-landing  */
#section5-landing {
  padding: 70px 0;
}
</style>
