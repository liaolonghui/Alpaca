<template>
  <div class="visit-collection">
    <header>
      <img :src="collection.img" width="126" height="126">
      <h1>{{collection.name}}</h1>
      <!-- activity与manage -->
      <div class="activity-manage-btn">
        <!-- <router-link :to="`/activity/${collection.name}`" tag="div" data-toggle="tooltip" data-placement="top" title="Activity">
          <i class="iconfont icon-playlist-play"></i>
        </router-link> -->
        <router-link :to="`/collection/${collection.name}/assets/edit`" tag="div" data-toggle="tooltip" data-placement="top" title="Manage">
          <i class="iconfont icon-edit"></i>
        </router-link>
      </div>
      <!-- info -->
      <span>
        <span class="btn btn-default btn-lg">
          <p>{{collection.item}}</p>
          <p>item</p>
        </span>
        <span class="btn btn-default btn-lg">
          <p>{{collection.owner}}</p>
          <p>owner</p>
        </span>
        <span class="btn btn-default btn-lg">
          <p>{{collection.floorPrice}}</p>
          <p>floor price</p>
        </span>
        <span class="btn btn-default btn-lg">
          <p><i class="iconfont icon-ethereum"></i>{{collection.volumeTraded}}</p>
          <p>volume traded</p>
        </span>
      </span>
      <p style="margin: 20px 0;">Welcome to the home of {{collection.name}} on OpenSea. Discover the best items in this collection.</p>
    </header>
    <!-- content -->
    <article>
      <!-- RECENTLY LISTED -->
      <div class="recently">
        <h3>
          <span>
            <i class="iconfont icon-time-lapse"></i>
            RECENTLY LISTED
          </span>
          <span style="float: right;">
            View all
            <i class="iconfont icon-right"></i>
          </span>
        </h3>
        <div v-if="collection.items.length" class="items-content row" style="margin: 0;">
          <router-link
            tag="div"
            class="col-lg-3 col-md-3 col-sm-6 col-xs-12 item-content"
            v-for="item in collection.items"
            :key="item.name"
            :to="`/assets/${item.id}`"
          >
            <router-link :to="`/collection/${collection.name}/assets/${item.id}/edit`" class="edit-item">
              <i class="iconfont icon-edit"></i>
              Edit
            </router-link>
            <img :src="item.img" class="text-center" />
            <div class="item-info">
              <p>{{collection.name}}</p>
              <p>{{item.name}}</p>
            </div>
          </router-link>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: ['name'],
  data() {
    return {
      collection: {
        name: 'xxxxx',
        img: require('../../assets/images/belt.svg'),
        item: 5,
        owner: 1,
        floorPrice: '----',
        volumeTraded: '0.00',
        items: [
          {
            name: 'xx1',
            img: require('../../assets/images/alpaca.svg'),
            id: '5555'
          },
          {
            name: 'xx11',
            img: require('../../assets/images/belt.svg'),
            id: '5555'
          },
          {
            name: 'xx2',
            img: require('../../assets/images/alpaca.svg'),
            id: '5555'
          },
          {
            name: 'xx4',
            img: require('../../assets/images/belt.svg'),
            id: '5555'
          },
          {
            name: 'xx66',
            img: require('../../assets/images/alpaca.svg'),
            id: '5555'
          },
        ]
      }
    }
  },
}
</script>

<style>
.visit-collection {
  background-color: #fff;
  border-radius: 10px;
}
.visit-collection header {
  text-align: center;
}
.visit-collection header img {
  border-radius: 50%;
}
.visit-collection .btn-lg {
  width: 150px;
  height: 80px;
}
.recently {
  margin-top: 40px;
  padding-left: 15px;
}
.recently h3 {
  padding-left: 10px;
  padding-right: 80px;
  padding-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid #aaa;
}
.items-content {
  padding: 10px;
}
.visit-collection {
  position: relative;
}
.activity-manage-btn {
  position: absolute;
  top: 50px;
  right: 50px;
}
.activity-manage-btn>div {
  display: inline-block;
  width: 45px;
  height: 45px;
  margin: 0 10px;
  line-height: 45px;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.activity-manage-btn>div:hover {
  box-shadow: 0 0 10px #aaa;
}
.activity-manage-btn>div>i {
  font-size: 20px;
}
.activity-manage-btn .tooltip-inner{
  position: absolute;
  top: -10px;
  left: -20px;
  min-width: 70px !important;/* 修改宽度 */
}
@media screen and (max-width: 768px) {
  .recently h3 {
    padding-right: 20px;
  }
  .activity-manage-btn {
    top: 10px;
    right: 10px;
  }
  .recently {
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>
