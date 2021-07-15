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
            <img src="../../assets/images/ethereum.png" alt="">
            Rinkeby
          </div>
        </div>
      </div>
      <!-- category -->
      <div class="collectionManagerEdit--field"><div class="collectionManagerEdit--label">Category</div><div class="collectionManagerEdit--field-tip">Adding a category will help make your item discoverable on OpenSea.</div><div class="collectionManagerEdit--pills"><button class="Blockreact__Block-sc-18q9hu0-0 Buttonreact__StyledButton-sc-glfma3-0 dFhPys iZpARs ActionButtonreact__StyledButton-sc-7jpoey-0 bwNKOH collectionManagerEdit--category-button" type="button" aria-expanded="false">Add category</button></div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collection: {
        name: 'xxxxxxxx',
        img: require('../../assets/images/belt.svg'),
        description: '',
        blockchain: 'Rinkeby'
      }
    }
  },
  methods: {
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
  },
}
</script>

<style>
.edit-collection-box {
  padding: 10px 15px 100px 15px;
  background-color: #fff;
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
  cursor: pointer;
}
.edit-collection #Blockchain:hover {
  box-shadow: 0 0 5px #aaa;
}
@media screen and (max-width: 768px) {
  .edit-collection .ImageInput-input,
  .edit-collection .name-input,
  .edit-collection .CreateCollection-input,
  .edit-collection #Blockchain {
    width: 90%;
  }
}
</style>