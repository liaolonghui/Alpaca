<template>
  <div class="payouts">
    <h2>Royalty Payouts</h2>
    <p class="payouts-description">
      After you configure a fee on your collection,
      pending and completed payouts to you will appear here.
      Payouts occur in bulk every month. On any given payout round,
      you'll only receive a payout if you've accumulated more than ~$60.00 worth of fees.
    </p>
    <!-- table -->
    <table class="table table-hover">
      <caption>
        <i></i>
        Payout History
      </caption>
      <thead>
        <tr>
          <th class="Item">Item</th>
          <th>Unit Price</th>
          <th>Quantity</th>
          <th>Fee Earned</th>
          <th>Payout</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tanmay</td>
          <td>555</td>
          <td>560001</td>
          <td>555</td>
          <td>666</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.payouts {
  padding: 10px 15px 100px 15px;
  background-color: #fff;
  border-radius: 10px;
}
.payouts .payouts-description {
  width: 70%;
}
.payouts .table {
  width: 70%;
  border: 1px solid #ccc;
}
.payouts .table caption {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  font-size: 16px;
  color: #04111d;
  border: 1px solid #ccc;
}
.payouts .table td {
  height: 50px;
  line-height: 50px;
}
.payouts .table .Item {
  width: 300px;
}
@media screen and (max-width: 768px) {
  .payouts .payouts-description,
  .payouts .table {
    width: 100%;
  }
}
</style>