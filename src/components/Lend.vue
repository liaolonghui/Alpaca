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
    <article class="lend-body">
      <h2 class="hidden-md hidden-lg">Available Lending Pools</h2>
      <!-- table 在md lg时候表格展示数据 -->
      <div class="table-responsive hidden-xs hidden-sm">
        <table class="table">
          <caption>响应式表格布局</caption>
          <thead>
            <tr>
              <th>产品</th>
              <th>付款日期</th>
              <th>状态</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>产品1</td>
              <td>23/11/2013</td>
              <td>待发货</td></tr>
            <tr>
              <td>产品2</td>
              <td>10/11/2013</td>
              <td>发货中</td></tr>
            <tr>
              <td>产品3</td>
              <td>20/10/2013</td>
              <td>待确认</td></tr>
            <tr>
              <td>产品4</td>
              <td>20/10/2013</td>
              <td>已退货</td></tr>
          </tbody>
        </table>
      </div>
      <!-- list  在xs sm时候列表展示数据 -->
      <ul class="list-group hidden-md hidden-lg">
        <li class="list-group-item">免费域名注册</li>
        <li class="list-group-item">免费 Window 空间托管</li>
        <li class="list-group-item">图像的数量</li>
        <li class="list-group-item">24*7 支持</li>
        <li class="list-group-item">每年更新成本</li>
      </ul>
    </article>
    <!-- spacer -->
    <div class="spacer-50"></div>
  </div>
</template>

<style>
  .lend {
    padding: 5px 30px 0 0;
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
    height: 500px;
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
</style>
