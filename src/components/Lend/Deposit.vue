<template>
  <div class="deposit">
    <div class="cont">
      <h2 class="hidden-xs hidden-sm">
        <span style="margin-right: 10px; vertical-align: -5px;">Depositing ALPACA</span>
        <img src="../../assets/images/alpaca.svg" alt="logo">
      </h2>
      <div class="hidden-md hidden-lg text-center">
        <img src="../../assets/images/alpaca.svg" alt="" width="150" height="150">
        <h2>Depositing ALPACA</h2>
      </div>
      <!-- content -->
      <div class="content">
        <p>Available Balance: 0.00 ALPACA</p>
        <div class="num">
          <input type="number" :value="depositAmount" placeholder="Deposit Amount" />
          <div class="btn btn-success">MAX</div>
        </div>
        <p>
          <span>You will receive: </span>
          <span class="text-green">~0.00 ibALPACA</span>
        </p>
        <div class="btn-boxs">
          <div class="btn btn-default" @click="goBack">Back</div>
          <div class="btn btn-success">Approve</div>
        </div>
      </div>
    </div>
    <!-- spacer -->
    <div class="spacer-50"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      depositAmount: 0
    }
  },
  methods: {
    goBack() {
      this.$router.replace('/lend')
    }
  },
}
</script>

<style>
  .deposit {
    padding: 10px 150px 0 50px;
  }
  .deposit h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
  }
  .deposit .cont {
    position: relative;
    min-height: 450px;
    padding: 50px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 3px 5px 5px #ccc;
  }
  .cont>h2>img {
    width: 32px;
    height: 32px;
  }
  @media screen and (max-width: 992px) {
    .deposit {
      padding: 10px;
    }
    .deposit .cont {
      padding: 25px;
    }
  }
  .deposit .content {
    margin-top: 50px;
  }
  .deposit .num {
    display: flex;
    margin: 10px 0 15px 0;
  }
  .deposit .num>input {
    flex: 1;
    margin-right: -2px;
    outline: none;
  }
  .deposit .text-green {
    color: #31C77F;
  }
  .deposit .btn-boxs>div {
    position: absolute;
    bottom: 50px;
  }
  .deposit .btn-boxs>div:nth-of-type(1) {
    left: 50px;
  }
  .deposit .btn-boxs>div:nth-of-type(2) {
    right: 50px;
  }
  @media screen and (max-width: 992px) {
    .deposit .btn-boxs>div {
      bottom: 10px;
    }
  }
</style>