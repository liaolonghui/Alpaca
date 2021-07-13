<template>
  <div class="items-collection">
    <header>
      <img :src="collection.img" class="collection-img" />
      <div class="info">
        <h1>{{collection.name}}</h1>
        <div id="category-actions">
          <router-link tag="div" :to="`/collection/${collection.name}`">
            <i class="iconfont icon-edit"></i>
            <div>Edit</div>
          </router-link>
          <router-link tag="div" :to="`/collection/${collection.name}`">
            <i class="iconfont icon-visit"></i>
            <div>Visit</div>
          </router-link>
          <router-link tag="div" :to="`/collection/${collection.name}`">
            <i class="iconfont icon-menu"></i>
            <div>Royalties</div>
          </router-link>
        </div>
      </div>
    </header>
    <!-- items -->
    <div class="collection-items clearfix">
      <h4>
        <i class="iconfont icon-menu"></i>
        ITEMS
      </h4>
      <!-- add-item -->
      <button @click="addItem" class="btn btn-primary btn-lg">Add Item</button>
      <div class="row">
        <div class="search-box col-xs-12 col-sm-12 col-md-8 col-lg-8">
          <i class="iconfont icon-search"></i>
          <input autocapitalize="off" autocomplete="off" autocorrect="off" data-testid="Input" placeholder="Search" spellcheck="false" type="text" />
        </div>
        <div class="select-box col-xs-12 col-sm-12 col-md-4 col-lg-4">
          <select name="order" id="order">
            <option value="EndingSoon">Ending Soon</option>
            <option value="RecentlySold">Recently Sold</option>
          </select>
        </div>
      </div>
      <!-- items-content -->
      <div v-if="collection.items.length" class="items-content row">
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" v-for="item in collection.items" :key="item.name">
          <img :src="item.img" class="text-center" />
          <p>{{collection.name}}</p>
          <p>{{item.name}}</p>
        </div>
      </div>
      <!-- no items -->
      <div v-else class="no-items">
        <h1>No items to display</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name'],
  data() {
    return {
      collection: {
        name: 'xxxxx',
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F15%2F20150915135644_dBiyk.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628750176&t=44066056850c15a99472e81f787ddb65',
        items: [
          {
            img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F15%2F20150915135644_dBiyk.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628750176&t=44066056850c15a99472e81f787ddb65',
            name: 'itemssssss1'
          },
          {
            img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F15%2F20150915135644_dBiyk.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628750176&t=44066056850c15a99472e81f787ddb65',
            name: 'itemssssss2'
          },
          {
            img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F15%2F20150915135644_dBiyk.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628750176&t=44066056850c15a99472e81f787ddb65',
            name: 'itemssssss3'
          },
          {
            img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F15%2F20150915135644_dBiyk.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628750176&t=44066056850c15a99472e81f787ddb65',
            name: 'itemssssss4'
          },          
        ]
      }
    }
  },
  methods: {
    // addItem
    addItem() {
      this.$router.history.push(`/collection/${this.collection.name}/assets/create`)
    }
  },
}
</script>

<style>
.items-collection header {
  display: flex;
}
.items-collection .info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.items-collection .collection-img {
  width: 180px;
  height: 180px;
  margin-right: 30px;
  border-radius: 50%;
}
#category-actions {
  display: flex;
  margin-top: 12px;
}
#category-actions>div {
  width: 60px;
  height: 60px;
  padding-top: 3px;
  margin: 0 5px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #aaa;
  background-color: #fafafa;
  cursor: pointer;
}
#category-actions>div:hover {
  box-shadow: 0 0 10px #aaa;
}
#category-actions>div i {
  font-size: 24px;
}
#category-actions>div div {
  font-size: 12px;
}
@media screen and (max-width: 768px) {
  .items-collection {
    padding: 0 10px;
  }
  .items-collection .collection-img {
    margin-right: 10px;
  }
  #category-actions>div {
    width: 50px;
    height: 50px;
    padding: 0;
    margin: 3px;
  }
}
.collection-items {
  margin-top: 40px;
  padding: 0 15px;
}
.collection-items h4 {
  font-size: 18px;
}
.collection-items>div.row {
  height: 60px;
}
.collection-items .search-box {
  position: relative;
  height: 48px;
  margin: 10px 0;
}
.collection-items .search-box>i {
  position: absolute;
  left: 16px;
  top: 2px;
  display: inline-block;
  width: 57px;
  height: 44px;
  line-height: 45px;
  text-align: center;
  font-size: 24px;
  border-radius: 5px;
  border-right: 1px solid #aaa;
  background-color: #fbfdff;
}
.collection-items .search-box>input {
  width: 100%;
  height: 48px;
  padding-left: 65px;
}
.collection-items .select-box>select {
  width: 70%;
  height: 48px;
  margin: 10px 0;
}
.items-content {
  margin-top: 20px;
  padding-bottom: 20px;
}
.items-content>div {
  min-height: 300px;
  padding: 40px 30px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #aaa;
  cursor: pointer;
}
.items-content>div:hover {
  box-shadow: 0 0 10px #aaa;
}
.items-content img {
  display: inline-block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  border-radius: 5px;
  object-fit: contain;
}
.items-content p {
  margin: 10px 0;
}
.items-content p:first-of-type {
  color: #707a83;
}
.items-content .col-lg-3,
.items-content .col-md-3 {
  width: 22%;
  margin: 10px;
}
@media screen and (max-width: 970px) {
  .items-content .col-sm-6 {
    width: 46%;
  }
}
@media screen and (max-width: 768px) {
  .items-content .col-xs-12 {
    width: 95%;
  }
}
/* no-items */
.no-items {
  height: 200px;
  text-align: center;
}
.no-items h1 {
  height: 200px;
  line-height: 200px;
}
</style>