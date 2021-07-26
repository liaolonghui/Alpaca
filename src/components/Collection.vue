<template>
  <div id="collection-box">
    <div class="collection-container">
      <!-- connect -->
      <div v-if="this.$store.state.publicAddress" class="connect">
        <h1 class="CollectionManager-title">My Collections</h1>
        <div class="collectionManager-info">
          Create, curate, and manage collections of unique NFTs to share and sell.
        </div>
        <div class="create-btn-box">
          <button @click="showCreateBox" class="btn btn-primary btn-lg">Create a collection</button>
        </div>
        <!-- collections -->
        <div class="collections">
          <div v-for="item in collections" :key="item.name">
            <router-link :to="`/collection/${item.name}`">
              <div class="top-grey" :style="{background: 'url('+item.bg+')'}">
                <div class="other">
                  <i class="iconfont icon-more"></i>
                  <div class="more-operate">
                    <router-link :to="`/collection/${item.name}`">
                      <i class="iconfont icon-visit"></i>
                      <span>Visit</span>
                    </router-link>
                    <router-link :to="`/collection/${item.name}/edit`">
                      <i class="iconfont icon-edit"></i>
                      <span>Edit</span>
                    </router-link>
                    <router-link :to="`/collection/${item.name}/assets/edit`">
                      <i class="iconfont icon-list"></i>
                      <span>Items</span>
                    </router-link>
                    <router-link :to="`/collection/${item.name}/payouts`">
                      <i class="iconfont icon-menu"></i>
                      <span>Royalties</span>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="collection-detail">
                <img :src="item.img" />
                <h4>{{item.name}}</h4>
                <p>Explore the {{item.name}} collection</p>
                <p>{{item.items}} items</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!-- not-connect -->
      <div v-else class="not-connect text-center">
        <p class="wallet--wrapper-message" style="padding-top: 20px;">Sign in to your wallet.</p>
        <div>
          <div class="wallet--wallet-logo-container">
            <div style="height: 150px; width: 150px;">
              <img class="Image-image" src="../assets/images/metamask-alternative.webp" width="150" height="150">
            </div>
          </div>
          <div class="wallet--btn-cta-wrapper">
            <button @click="connectWallet" class="btn btn-success btn-lg">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- CreateBox -->
    <div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="createModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header" style="padding: 20px;">
                    <button style="font-size: 35px;" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title text-center">Create your collection</h4>
                </div>
                <!-- content -->
                <div class="content" style="height: 500px; overflow: auto;">
                  <div>
                    <label for="image">
                      <span>Logo *</span>
                    </label>
                    <header class="light-text">
                      (350 x 350 recommended)
                    </header>
                    <div class="img-box">
                      <img v-if="collection.img" :src="collection.img" id="collectionImg" width="160" height="160" />
                      <i v-else class="iconfont icon-img"></i>
                      <input @change="getCollectionImg" accept="image/*" class="ImageInput-input" id="image" name="image" type="file">
                    </div>
                  </div>
                  <div style="margin-top: 20px;">
                    <label for="name">
                      <span>Name *</span>
                    </label>
                    <div class="name-box">
                      <input v-model="collection.name" class="name-input" autocapitalize="off" autocomplete="off" autocorrect="off" data-testid="Input" id="name" name="name" placeholder="Example: Treasures of the Sea" required spellcheck="false" type="text">
                    </div>
                  </div>
                  <div style="margin-top: 20px;">
                    <label for="description">
                      <span>Description</span>
                    </label>
                    <div>0 of 1000 characters used</div>
                    <textarea v-model="collection.description" class="CreateCollection-input" id="description" maxlength="1000" name="description" placeholder="Provide a description for your store. Markdown syntax is supported." rows="4"></textarea>
                  </div>
                  <div style="margin-top: 20px;">
                    <label for="Blockchain">
                      <span>Blockchain</span>
                    </label>
                    <div>
                      Select the blockchain where you'd like new items from this collection to be added by default.
                    </div>
                    <div>
                      <div id="Blockchain">
                        <img src="../assets/images/ethereum.png" alt="">
                        Rinkeby
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                  <button @click="addCollection" v-if="collection.img && collection.name" type="button" class="btn btn-primary">Create</button>
                  <button v-else class="btn btn-default" disabled>Create</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>
    <!-- creating box -->
    <div class="modal fade" id="creatingModal" tabindex="-1" role="dialog" aria-labelledby="creatingModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header text-center">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <!-- <h4 class="modal-title">Please wait...</h4> -->
            <h4>{{collection.name}} has been created</h4>
          </div>
          <div class="modal-body text-center">
            <img :src="collection.img" style="max-width: 100%; max-height: 100%; min-width: 300px; min-height: 300px;" />
          </div>
          <div class="text-center" style="margin-bottom: 20px;">
            <button @click="addItems" type="button" class="btn btn-primary btn-lg">Add Items</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'

export default {
  data() {
    return {
      // 已经存在的collections
      collections: [
        {
          img: require('../assets/images/belt.svg'),
          bg: require('../assets/images/alpaca.svg'),
          name: 'xxa',
          description: '我是假数据',
          blockchain: 'Rinkeby',
          items: 5
        },
        {
          img: require('../assets/images/belt.svg'),
          bg: require('../assets/images/alpaca.svg'),
          name: 'xxb',
          description: '我是假数据',
          blockchain: 'Rinkeby',
          items: 5
        },
      ],
      // 创建collection
      collection: {
        img: '',
        name: '',
        description: '',
        blockchain: 'Rinkeby'
      }
    }
  },
  methods: {
    // 连接钱包
    async connectWallet() {
      let web3Provider;
      if (window.ethereum) {
        web3Provider = window.ethereum;
        try {
          // 请求用户授权
          await window.ethereum.enable();
        } catch (error) {
          // 用户不授权时
          alert("User denied account access")
        }
      }
      const web3 = new Web3(web3Provider);//web3就是你需要的web3实例
  
      const that = this
      web3.eth.getAccounts(async function (error, result) {
        if (!error) {
          //授权成功后result能正常获取到账号了
          that.$store.dispatch('saveAddress', result[0])
          localStorage.setItem('addr', result[0])
          // 获取eth数量
          const balance = await web3.eth.getBalance(result[0])
          that.$store.dispatch('savaBalance', balance)
        }
      })
    },
    // showCreateBox
    showCreateBox() {
      this.collection = {} // 打开前置空
      $('#createModal').modal('show')
    },
    // getCollectionImg
    getCollectionImg(e) {
      const img = $(e.currentTarget)[0].files[0]
      let url = this.getFileUrl(img)
      let imgObj = new Image();
      imgObj.src = url;
      const that = this
      imgObj.onload = function () {
        that.$set(that.collection, 'img', url)
      }
    },
    //获取file文件的访问地址
    getFileUrl(file) {
      var url;
      var agent = navigator.userAgent;
      if (agent.indexOf("MSIE") >= 1 || agent.indexOf("NET")!=-1) {
        url = window.URL.createObjectURL(file);
      } else if (agent.indexOf("Firefox") > 0) {
        url = window.URL.createObjectURL(file);
      } else if (agent.indexOf("Chrome") > 0) {
        url =window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    // 添加新collection
    addCollection() {
      this.collections.push(this.collection)
      $('#createModal').modal('hide')
      $('#creatingModal').modal('show')
    },
    // addItems
    addItems() {
      $('#creatingModal').modal('hide')
      this.$router.history.push(`/collection/${this.collection.name}/assets/edit`)
    }
  },
}
</script>

<style>
#collection-box {
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
}
.nft .connect {
  padding: 20px;
  background-color: #fff;
}
.connect .create-btn-box {
  margin-top: 20px;
}
#createModal .content {
  padding: 30px 20px;
}
#createModal .img-box {
  position: relative;
  width: 160px;
  height: 160px;
  border: 1px dashed #aaa;
  border-radius: 50%;
  overflow: hidden;
}
#createModal .img-box .icon-img {
  margin-left: 35px;
  line-height: 160px;
  font-size: 90px;
  color: #ccc;
}
#createModal .ImageInput-input {
  cursor: pointer;
  height: 100%;
  width: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}
#createModal .name-input {
  width: 100%;
  margin-top: 2px;
  padding-left: 10px;
  height: 48px;
  min-width: 0px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
#createModal .CreateCollection-input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
#createModal #Blockchain {
  width: 100%;
  height: 48px;
  padding-left: 10px;
  line-height: 48px;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}
#createModal #Blockchain:hover {
  box-shadow: 0 0 5px #aaa;
}
/* collections */
.collections {
  margin-top: 20px;
}
.collections>div {
  position: relative;
  display: inline-block;
  width: 30%;
  height: 450px;
  padding: 0;
  margin: 20px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.collections .collection-detail {
  position: relative;
}
.collections .collection-detail {
  padding-top: 30px;
  text-align: center;
}
.collections p {
  margin: 50px 0;
  font-size: 14px;
  color: #707a83;
}
.collections img {
  position: absolute;
  top: -22px;
  left: 50%;
  margin-left: -22px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
}
@media screen and (max-width: 768px) {
  .collections {
    padding: 10px 0;
  }
  .collections>div {
    width: 100%;
    margin: 20px 0;
  }
}
@media screen and (max-width: 1200px) and  (min-width: 1050px) {
  .collections>div {
    width: 27%;
  }
}
.collections>div:hover {
  box-shadow: 0 0 5px #aaa;
}
.collections .top-grey {
  height: 200px;
  background-color: #e5e8eb;
  background-repeat: no-repeat !important;
  background-position: center !important;
  border-bottom: 1px solid #ccc;
}
.collections>div .other {
  display: none;
}
.collections>div:hover .other {
  display: block;
}
.collections .other>i {
  position: absolute;
  z-index: 66;
  right: 10px;
  top: 10px;
  padding: 2px 5px;
  border-radius: 5px;
  border: 2px solid #aaa;
  background-color: #fff;
  opacity: 0.5;
}
.collections .other>i:hover {
  box-shadow: 0 0 15px #aaa;
  opacity: 1;
}
.more-operate {
  display: none;
  position: absolute;
  z-index: 99;
  top: 40px;
  right: 10px;
}
.other:hover .more-operate {
  display: block;
}
.more-operate a {
  display: block;
  width: 110px;
  height: 40px;
  line-height: 40px;
  text-align: left;
  border: 1px solid #aaa;
  border-radius: 5px;
  background-color: #fff !important;
}
.more-operate a:hover {
  box-shadow: 0 0 10px #aaa;
}
.more-operate i {
  font-size: 20px;
  margin-left: 10px;
}
.more-operate a:last-of-type>i {
  font-size: 17px;
}
.more-operate span {
  margin-left: 5px;
  vertical-align: 2px;
}
/* not-connect */
.not-connect {
  min-height: 550px;
}
.wallet--wrapper-message {
  font-size: 27px;
  color: #353840;
}
.wallet--wallet-logo-container {
  display: inline-block;
  margin: 40px 0;
}
.wallet--btn-cta-wrapper .btn-lg {
  margin-top: 50px;
  padding: 10px 30px;
}
/* 美化 */
#createModal .name-input:focus,
#createModal .CreateCollection-input:focus {
  border: none;
  outline: none;
  box-shadow: 0 0 10px #aaa;
}
</style>
