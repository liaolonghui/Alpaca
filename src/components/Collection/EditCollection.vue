<template>
  <div class="edit-collection-box">
    <h3 style="margin-bottom: 30px;">Edit your collection</h3>
    <div class="edit-collection">
      <div>
        <label for="image">
          <span>Logo Image</span>
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
          <span>Name</span>
        </label>
        <div class="name-box">
          <input v-model="collection.name" class="name-input" autocapitalize="off" autocomplete="off" autocorrect="off" data-testid="Input" id="name" name="name" placeholder="Example: Treasures of the Sea" required spellcheck="false" type="text">
        </div>
      </div>
      <div style="margin-top: 20px;">
        <label for="description">
          <span>Description</span>
        </label>
        <div>Markdown syntax is supported. 0 of 1000 characters used.</div>
        <textarea v-model="collection.description" class="CreateCollection-input" id="description" maxlength="1000" name="description" placeholder="Provide a description for your store. Markdown syntax is supported." rows="4"></textarea>
      </div>
      <div style="margin-top: 20px;">
        <label for="Blockchain">
          <span>Blockchain</span>
        </label>
        <div>
          <div id="Blockchain">
            <img style="border-radius: 50%;" src="../../assets/images/ethereum.png" alt="">
            Rinkeby
          </div>
        </div>
      </div>
      <!-- category -->
      <div style="margin-top: 20px;">
        <label>Category</label>
        <div>Adding a category will help make your item discoverable on OpenSea.</div>
        <div class="category-btn-box">
          <button v-if="collection.category" disabled class="btn btn-default btn-lg">Add category</button>
          <button @click="showOrHideCategoryBox" v-else class="btn btn-default btn-lg">Add category</button>
          <div id="category-box">
            <button @click="changeCategory('ART')" class="btn btn-default btn-lg">
              <img src="../../assets/images/collectibles-light.svg" alt="">
              <span>ART</span>
            </button>
            <button @click="changeCategory('Collectibles')" class="btn btn-default btn-lg">
              <img src="../../assets/images/art-light.svg" alt="">
              <span>Collectibles</span>
            </button>
          </div>
          <!-- category -->
          <div @click="deleteCategory" v-if="collection.category" class="category-tag btn btn-default btn-lg">
            {{collection.category}}
            <i class="iconfont icon-baseline-close-px"></i>
          </div>
        </div>
      </div>
      <!-- Links -->
      <div class="collectionLinks">
        <label>Links</label>
        <div class="links-box">
          <!-- yoursite -->
          <div class="yoursite">
            <div class="svg-box">
              <svg fill="#8A939B" viewBox="0 0 20 16">
                <path d="M17.569.5H2.43C1.39.5.548 1.344.548 2.375l-.01 11.25A1.89 1.89 0 002.43 15.5H17.57a1.89 1.89 0 001.892-1.875V2.375A1.89 1.89 0 0017.57.5zm-4.73 13.125H2.43v-3.75h10.408v3.75zm0-4.688H2.43v-3.75h10.408v3.75zm4.73 4.688h-3.785V5.187h3.785v8.438z"></path>
              </svg>
            </div>
            <input v-model="collection.url" placeholder="yoursite.io" type="url" name="url" />
          </div>
        </div>
      </div>
      <!-- Royalties -->
      <div class="collectionRoyalties" style="margin-top: 20px;">
        <label>Royalties</label>
        <div id="Royalties-detail">
          Collect a fee when a user re-sells an item you originally created.
          This is deducted from the final sale price and paid monthly to a
          payout address of your choosing.
        </div>
        <div style="margin-top: 15px;">
          <p style="color: #777;">Percentage fee</p>
          <input v-model="collection.fee" type="number" placeholder="e.g.2.5" @change="feeChange" min="0" max="10" />
          <p v-if="dangerText" style="color: red; margin-top: 2px;">
            <i class="iconfont icon-baseline-close-px" style="color: red;"></i>
            {{dangerText}}
          </p>
          <p v-if="collection.fee" style="margin: 5px 0">Your payout wallet address</p>
          <input v-if="collection.fee" v-model="collection.walletaddress" type="text" placeholder="Please enter an address, e.g. 0x1ed3... or destination.eth">
        </div>
      </div>
      <!-- Payment tokens -->
      <div style="margin-top: 20px;">
        <label>Payment tokens</label>
        <div>These tokens can be used to buy and sell your items.</div>
        <div id="Payment-tokens">
          <div class="pay-token">
            <i class="iconfont icon-ethereum"></i>
            <div>
              <h5>ETH</h5>
              <p>Rinkeby</p>
            </div>
          </div>
          <div class="pay-token">
            <i class="iconfont icon-ethereum" style="color: pink;"></i>
            <div>
              <h5>WETH</h5>
              <p>Rinkeby</p>
            </div>
          </div>
          <div class="pay-token">
            <i class="iconfont icon-ethereum" style="color: pink;"></i>
            <div>
              <h5>WETH</h5>
              <p>Rinkeby</p>
            </div>
          </div>
          <div class="pay-token">
            <i class="iconfont icon-ethereum" style="color: pink;"></i>
            <div>
              <h5>WETH</h5>
              <p>Rinkeby</p>
            </div>
          </div>
        </div>
        <!-- add token -->
        <div @click="showTokenBox" style="margin-top: 15px;" class="btn btn-default btn-lg">Add Token</div>
        <div id="token-box">
          <div class="SELECT-TOKEN">
            <i class="iconfont icon-ethereum" style="color: pink;"></i>
            <span>ETHH</span>
          </div>
          <div class="SELECT-TOKEN">
            <i class="iconfont icon-ethereum" style="color: pink;"></i>
            <span>ETHH</span>
          </div>
          <div class="SELECT-TOKEN">
            <i class="iconfont icon-ethereum" style="color: pink;"></i>
            <span>ETHH</span>
          </div>
        </div>
      </div>
      <!-- Explicit & sensitive content -->
      <div style="margin-top: 20px;" class="editExplicit">
        <label>Explicit & sensitive content</label>
        <div>
          Set this collection as explicit and sensitive content
          <switches class="float-right" v-model="collection.explicit" theme="bootstrap" color="success"></switches>
        </div>
      </div>
      <!-- Collaborators -->
      <div style="margin-top: 30px;">
        <label>Collaborators</label>
        <div class="Collaborators-detail">
          Collaborators can modify collection settings,
          receive payments for items they created,
          change the collection's royalty payout address,
          and create new items.
        </div>
        <div class="Collaborators-box">
          <div class="Collaborator">
            <img src="../../assets/images/alpaca.svg" alt="">
            <span>you</span>
          </div>
        </div>
        <!-- add Collaborator -->
        <div class="btn btn-default btn-lg add-collaborator-btn">Add collaborator</div>
      </div>
    </div>
    <!-- btn -->
    <div class="edit-collection-btn">
      <!-- submit -->
      <div @click="updateCollection" v-if="collection.name && collection.img" class="btn btn-primary btn-lg">Submit Changes</div>
      <div v-else class="btn btn-default btn-lg" disabled>Submit Changes</div>
      <!-- delete -->
      <div @click="deleteCollection" class="btn btn-danger btn-lg">Delete Collection</div>
    </div>
  </div>
</template>

<script>
import switches from 'vue-switches'

export default {
  components: {
    switches
  },
  data() {
    return {
      collection: {
        name: 'xxxxxxxx',
        img: require('../../assets/images/belt.svg'),
        description: '',
        category: '', // 分类
        url: '', //Links
        blockchain: 'Rinkeby',
        // Royalties
        fee: '',
        walletaddress: '',
        // Payment tokens
        tokens: [],
        // Explicit
        explicit: false
      },
      // dangerText
      dangerText: ''
    }
  },
  methods: {
    // showOrHideCategoryBox
    showOrHideCategoryBox() {
      $('#category-box').slideToggle()
    },
    // changeCategory
    changeCategory(cate) {
      this.collection.category = cate
      $('#category-box').slideUp()
    },
    // deleteCategory
    deleteCategory() {
      this.collection.category = ''
    },
    // showTokenBox
    showTokenBox() {
      $('#token-box').slideToggle()
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
    // feeChange
    feeChange(e) {
      console.log(e.currentTarget.value)
      if (e.currentTarget.value > 10) {
        this.dangerText = 'Value cannot be more than 10.'
      } else {
        this.dangerText = ''
      }
    },
    // updateCollection
    updateCollection() {
      alert('提交修改。。。等后端')
    },
    // deleteCollection
    deleteCollection() {
      const isDelete = confirm("Are you sure you want to delete this collection and hide all of its items? This can only be done if you own all items in the collection.")
      alert('你选了'+isDelete)
    }
  },
}
</script>

<style>
.edit-collection-box {
  padding: 10px 15px 100px 15px;
  background-color: #fff;
  border-radius: 10px;
}
.edit-collection .content {
  padding: 30px 20px;
}
.edit-collection .img-box {
  position: relative;
  width: 160px;
  height: 160px;
  border: 1px dashed #aaa;
  border-radius: 50%;
  overflow: hidden;
}
.edit-collection .img-box .icon-img {
  margin-left: 35px;
  line-height: 160px;
  font-size: 90px;
  color: #ccc;
}
.edit-collection .ImageInput-input {
  cursor: pointer;
  height: 100%;
  width: 60%;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}
.edit-collection .name-input {
  width: 60%;
  padding-left: 10px;
  height: 48px;
  min-width: 0px;
}
.edit-collection .CreateCollection-input {
  width: 60%;
  padding: 10px;
}
.edit-collection #Blockchain {
  width: 60%;
  height: 48px;
  padding-left: 10px;
  line-height: 48px;
  border: 1px solid #aaa;
  background-color: #fafafa;
  cursor: pointer;
}
.edit-collection #Blockchain:hover {
  box-shadow: 0 0 5px #aaa;
}
.category-btn-box {
  position: relative;
}
.category-btn-box>.btn-default {
  margin-top: 10px;
  outline: none !important;
}
.category-btn-box>.btn-default:hover {
  box-shadow: 0 0 10px #aaa;
  background-color: #fff;
}
.category-btn-box .category-tag {
  position: absolute;
  top: 0;
  left: 180px;
}
#category-box {
  display: none;
  width: 160px;
  margin-top: 5px;
}
#category-box:hover {
  box-shadow: 0 0 10px #aaa;
}
#category-box>button {
  display: block;
  width: 100%;
  outline: none;
}
#category-box>button:hover {
  background-color: #fafafa;
}
#category-box>button span {
  vertical-align: -2px;
}
#category-box img {
  width: 25px;
  height: 25px;
}
/* Links */
.collectionLinks {
  margin-top: 20px;
  width: 60%;
}
.collectionLinks input {
  width: 100%;
  height: 50px;
  padding-left: 60px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.collectionLinks input:focus {
  border: none;
  outline: none;
  box-shadow: 0 0 10px #aaa;
}
.collectionLinks .links-box>div {
  position: relative;
}
.collectionLinks .links-box>div .svg-box {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 48px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  border-right: 1px solid #ccc;
  background-color: #fafafa;
}
.collectionLinks .links-box>div svg {
  width: 30px;
  height: 30px;
  margin-top: 9px;
}
/* Royalties */
#Royalties-detail {
  width: 60%;
}
.collectionRoyalties input {
  width: 60%;
  height: 50px;
  padding-left: 10px;
}
.edit-collection-btn {
  margin-top: 80px;
}
.edit-collection-btn>.btn-danger {
  margin-left: 200px;
}
/* payment tokens */
.Payment-tokens-box {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}
#Payment-tokens {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
}
#Payment-tokens .pay-token {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 120px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
#Payment-tokens .pay-token:hover {
  border: none;
  box-shadow: 0 0 10px #aaa;
}
#Payment-tokens .pay-token i {
  font-size: 25px;
}
#Payment-tokens .pay-token p {
  font-size: 14px;
  color: #777;
}
#token-box {
  display: none;
  margin-top: 5px;
}
#token-box .SELECT-TOKEN {
  width: 250px;
  height: 40px;
  padding-left: 15px;
  line-height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
#token-box .SELECT-TOKEN:hover {
  box-shadow: 0 0 10px #aaa;
}
.editExplicit {
  width: 60%;
}
.Collaborators-detail {
  width: 60%;
}
.Collaborators-box {
  margin-top: 5px;
}
.Collaborators-box .Collaborator {
  width: 100px;
  height: 40px;
  line-height: 35px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.Collaborators-box .Collaborator:hover {
  box-shadow: 0 0 10px #aaa;
}
.Collaborators-box .Collaborator img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.Collaborators-box .Collaborator span {
  margin-left: 10px;
  font-size: 20px;
  color: #31c77f;
  vertical-align: -1px;
}
.add-collaborator-btn {
  margin-top: 10px;
}
/* 美化 */
.edit-collection .ImageInput-input,
.edit-collection .name-input,
.edit-collection .CreateCollection-input,
.edit-collection #Blockchain,
.collectionRoyalties input {
  border: 1px solid #ccc;
  border-radius: 5px;
}
@media screen and (max-width: 768px) {
  .edit-collection .ImageInput-input,
  .edit-collection .name-input,
  .edit-collection .CreateCollection-input,
  .edit-collection #Blockchain,
  #Royalties-detail,
  .collectionRoyalties input,
  .editExplicit,
  .Collaborators-detail {
    width: 100%;
  }
  .edit-collection-btn {
    margin-top: 50px;
  }
  .edit-collection-btn>.btn {
    margin-top: 10px;
  }
  .edit-collection-btn>.btn-danger {
    margin-left: 5px;
  }
}
/* 美化输入框 */
.edit-collection .name-input:focus,
.edit-collection .CreateCollection-input:focus,
.collectionRoyalties input:focus {
  border: none;
  outline: none;
  box-shadow: 0 0 10px #aaa;
}
</style>