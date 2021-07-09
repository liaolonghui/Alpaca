<template>
  <div class="stake">
    <!-- Your Rewards Summary -->
    <div class="rewards-summary">
      <header>
        <h2>Your Rewards Summary</h2>
      </header>
      <article class="row">
        <!-- img -->
        <div class="bg-success col-lg-6 col-md-6 col-sm-12 col-xs-12 img-box">
          <img src="../assets/images/LaserHeadfront.svg" alt="LaserHeadfront" width="293" height="329" class="float-right">
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
          <div class="left">
            <p>
              <svg viewBox="64 64 896 896" focusable="false" data-icon="lock" width="24px" height="24px" fill="currentColor" aria-hidden="true"><path d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z"></path></svg>
              Remaining Locked Amount
            </p>
            <p>0.00</p>
            <p>
              Your locked rewards are linearly released over 7 days starting from block# 6,499,649 to block# 6,699,649
            </p>
          </div>
          <!-- right -->
          <div class="right">
            <p>
              <img src="../assets/images/logo512.png" width="24" height="24" />
              Unlocked Rewards :
            </p>
            <p>
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
    <div class="stake-opportunity"></div>
    <!-- spacer -->
    <div class="spacer-50"></div>
  </div>
</template>

<style>
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
.rewards-summary .img-box {
  margin-top: 20px;
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
}
.rewards-summary .Rewards>.right {
  border-left: 1px solid #aaa;
}
.rewards-summary .balance-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
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
  height: 500px;
  margin: 0 30px 0 10px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 5px #aaa;
}
@media screen and (max-width: 992px) {
  .stake .rewards-summary {
    margin-right: 10px;
  }
  .stake .stake-opportunity {
    margin-right: 10px;
  }
}
</style>
