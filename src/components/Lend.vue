<template>
  <div class="lend">
    <header class="lend-header">
      <h2 class="hidden-xs hidden-sm">Available Lending Pools</h2>
      <div class="total-value-locked">
        <h3
          data-toggle="tooltip"
          data-placement="top"
          title="Value of total LP tokens locked + deposits that are not borrowed + ALPACA-BNB LP tokens staked + sALPACA staked">
          Total Value Locked
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="info-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true">
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
            <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
          </svg>
        </h3>
        <p>
          $<span class="total">1,226,060,637.91</span>
        </p>
      </div>
    </header>
    <article class="lend-body"  v-if="availableLendingPools">
      <h2 class="hidden-md hidden-lg">Available Lending Pools</h2>
      <!-- table 在md lg时候表格展示数据 -->
      <div class="table-responsive hidden-xs hidden-sm">
        <table class="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th>APY</th>
              <th>Total Supply</th>
              <th>Total Borrowed</th>
              <th>Utilization</th>
              <th>Your Balance</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pool in availableLendingPools" :key="pool.name">
              <td class="pool-title">
                <img :src="pool.icon" alt="icon" width="40" height="40">
                <h4>{{pool.name}}</h4>
                <p>1 ib{{pool.name}} = {{pool.ratio}} {{pool.name}}</p>
              </td>
              <td class="APR">
                <p>
                  <span>Lending APR: </span>
                  <span>{{pool.LendingAPR}}</span>
                </p>
                <p>
                  <span>Staking APR: </span>
                  <span>{{pool.StakingAPR}}</span>
                </p>
                <p v-if="pool.ProtocolAPR">
                  <span>Protocol APR: </span>
                  <span>{{pool.ProtocolAPR}}</span>
                </p>
                <p>
                  <span>Total APR: </span>
                  <span>{{pool.TotalAPR}}</span>
                </p>
                <p class="text-green">
                  <span>Total APY: </span>
                  <span>{{pool.TotalAPY}}</span>
                </p>
              </td>
              <td>{{pool.TotalSupply}}</td>
              <td>{{pool.TotalBorrowed}}</td>
              <td>{{pool.Utilization}}</td>
              <td>
                <p>0.00 ib{{pool.name}}</p>
                <p>0.00 {{pool.name}}</p>
              </td>
              <td class="operate-btn">
                <router-link to="/deposit" tag="div" class="btn btn-success">Deposit</router-link>
                <br />
                <router-link to="/withdraw" tag="div" class="btn btn-success" style="margin-top: 10px;">Withdraw</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- list  在xs sm时候列表展示数据 -->
      <ul class="list-group hidden-md hidden-lg">
        <li
          class="list-group-item"
          v-for="pool in availableLendingPools"
          :key="pool.name">
          <div class="li-left">
            <p>1 ib{{pool.name}} = 1.0026 {{pool.name}}</p>
            <p>Lending APR:</p>
            <p>Staking APR:</p>
            <p v-if="pool.ProtocolAPR">Protocol APR:</p>
            <p>Total APR:</p>
            <p class="text-green">Total APY</p>
            <p>Total Supply</p>
            <p>Total Borrowed</p>
            <p>Utilization</p>
            <p class="balance">Your Balance</p>
            <!-- deposit -->
            <router-link to="/deposit" tag="div" class="btn btn-success">Deposit</router-link>
          </div>
          <div class="li-right">
            <p>
              <img :src="pool.icon" alt="icon" width="28" height="28">
              <span style="margin-left: 10px;">{{pool.name}}</span>
            </p>
            <p>{{pool.LendingAPR}}</p>
            <p>{{pool.StakingAPR}}</p>
            <p v-if="pool.ProtocolAPR">{{pool.ProtocolAPR}}</p>
            <p>{{pool.TotalAPR}}</p>
            <p class="text-green">{{pool.TotalAPY}}</p>
            <p>{{pool.TotalSupply}}</p>
            <p>{{pool.TotalBorrowed}}</p>
            <p>{{pool.Utilization}}</p>
            <p class="balance">
              <span>0.00 ib{{pool.name}}</span>
              <span>0.00 {{pool.name}}</span>
            </p>
            <!-- Withdraw -->
            <router-link to="/withdraw" tag="div" class="btn btn-success">Withdraw</router-link>
          </div>
        </li>
      </ul>
    </article>
    <!-- spacer -->
    <div class="spacer-50"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      availableLendingPools: [
        {
          name: 'Alpaca',
          icon: 'https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/icons/coins/alpaca.svg',
          ratio: '1.0026',
          LendingAPR: '1.05%',
          StakingAPR: '18.02%',
          ProtocolAPR: '2.23%',
          TotalAPR: '21.3%',
          TotalAPY: '23.74%',
          TotalSupply: '67.75M ALPACA',
          TotalBorrowed: '11.57M ALPACA',
          Utilization: '17.07%'
        },
        {
          name: 'BNB',
          icon: 'https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/icons/coins/bnb.svg',
          ratio: '1.0361',
          LendingAPR: '11.38%',
          StakingAPR: '3.4%',
          TotalAPR: '14.78%',
          TotalAPY: '15.93%',
          TotalSupply: '741.42k BNB',
          TotalBorrowed: '468.91k BNB',
          Utilization: '63.24%'
        },
        {
          name: 'BNBBB',
          icon: 'https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/icons/coins/bnb.svg',
          ratio: '1.0361',
          LendingAPR: '11.38%',
          StakingAPR: '3.4%',
          TotalAPR: '14.78%',
          TotalAPY: '15.93%',
          TotalSupply: '741.42k BNB',
          TotalBorrowed: '468.91k BNB',
          Utilization: '63.24%'
        }
      ]
    }
  },
}
</script>

<style>
  .lend {
    padding: 5px 50px 0 0;
  }
  /* header */
  .lend-header {
    height: 110px;
  }
  .lend-header>h2 {
    display: inline-block;
    padding-top: 50px;
    font-size: 24px;
    font-weight: 700;
  }
  .lend .total-value-locked {
    float: right;
    padding: 15px 10px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 3px 5px 5px #ccc;
  }
  .total-value-locked>h3 {
    margin: 0;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
  }
  .total-value-locked svg {
    width: 15px;
    height: 15px;
  }
  .total-value-locked>p {
    margin: 0;
    font-size: 30px;
    text-align: center;
    color: #31C77F;
  }
  @media screen and (max-width: 992px) {
    .lend {
      padding: 5px 10px 0 10px;
    }
    .total-value-locked {
      width: 100%;
    }
  }
  /* body */
  .lend-body {
    padding: 15px;
    margin-top: 10px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 3px 5px 5px #ccc;
  }
  .lend-body>h2 {
    margin: 0;
    font-size: 25px;
    font-weight: 700;
    text-align: center;
  }
  .spacer-50 {
    height: 50px;
  }
  /* lend table */
  .lend-body .table {
    margin-top: 20px;
  }
  .lend-body .table td {
    vertical-align: middle;
    padding-top: 15px;
  }
  .lend-body .table td:nth-of-type(3) {
    font-size: 18px;
    color: #0f1228;
  }
  .lend-body .table td:nth-of-type(4) {
    font-size: 18px;
    color: #0f1228;
  }
  .lend-body .table td:nth-of-type(5) {
    font-size: 18px;
    color: #0f1228;
  }
  .lend-body .list-group {
    margin-top: 20px;
  }
  .pool-title p {
    color: #828282;
    background-color: #f4f4f4;
  }
  .operate-btn .btn {
    width: 100px;
    border-radius: 15px;
  }
  .pool-title {
    width: 200px;
  }
  .APR {
    width: 210px;
    padding-right: 35px !important;
  }
  .APR p {
    display: flex;
    justify-content: space-between;
    margin: 0;
  }
  .APR .text-green {
    color: #31C77F;
  }
  /* lend list */
  .lend-body .list-group-item {
    display: flex;
    justify-content: space-between;
  }
  .list-group-item .li-left {
    flex: 1;
  }
  .li-left p:nth-of-type(1) {
    max-width: 200px;
    max-height: 40px;
    text-align: center;
    color: #828282;
    background-color: #f4f4f4;
  }
  .list-group-item .li-right {
    flex: 1;
    text-align: right;
  }
  .li-right p:nth-of-type(1) {
    margin: 0;
  }
  @media screen and (max-width: 500px) {
    .li-left p:nth-of-type(1) {
      height: 40px;
    }
    .li-right p:nth-of-type(1) {
      margin: 11px 0;
    }
  }
  .li-right p.balance span {
    display: block;
  }
  .li-left p.balance,
  .li-right p.balance {
    height: 40px;
  }
  .li-left p.balance {
    line-height: 40px;
  }
  .list-group-item .text-green {
    color: #31C77F;
  }
  .list-group-item .btn {
    width: 98%;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 15px;
  }
</style>
