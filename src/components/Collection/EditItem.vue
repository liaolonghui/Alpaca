<template>
  <div class="edit-item-box">
    <div>
      <header>
        <h1 class="CollectionManager--header-title">Edit {{Item.name}}</h1>
      </header>
      <div>
        <form>
          <!-- media -->
          <section class="AssetForm-section">
            <label for="media">Image, Video, Audio, or 3D Model</label>
            <header class="AssetForm-input-header">
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 40 MB
            </header>
            <div class="media-box">
              <div style="height: 100%;">
                <div id="preview" style="height: 100%;">
                  <!-- 有media则显示 -->
                  <div v-if="Item.media" style="height: 100%;">
                    <img v-if="Item.mediaType === 'img'" :src="Item.media" />
                    <video v-else-if="Item.mediaType === 'video'" :src="Item.media"></video>
                  </div>
                  <div v-else>
                    <i class="iconfont icon-img"></i>
                    <header class="MediaInput-header">Drag &amp; drop file</header>
                    <div>or <span class="text-blue">browse media on your device</span></div>
                  </div>
                </div>
                <input @change="getItemMedia" id="media" name="media" type="file">
              </div>
            </div>
          </section>
          <!-- name -->
          <section class="AssetForm-section">
            <label for="name">Name *</label>
            <div>
              <div>
                <input v-model="Item.name" class="text-input" autocapitalize="off" autocomplete="off" autocorrect="off" data-testid="Input" id="name" name="name" placeholder="Item Name" required="" spellcheck="false" type="text" value="">
              </div>
            </div>
          </section>
          <!-- External Link -->
          <section class="AssetForm-section">
            <label for="external_link">External Link</label>
            <header class="AssetForm-input-header">
              OpenSea will include a link to this URL on this item's detail page, so that users can click to learn more about it.
              <br />You are welcome to link to your own webpage with more details.
            </header>
            <div>
              <div>
                <input v-model="Item.externalLink" class="text-input" autocapitalize="off" autocomplete="off" autocorrect="off" data-testid="Input" id="external_link" name="external_link" placeholder="https://yoursite.io/item/123" spellcheck="false" type="url" value="">
              </div>
            </div>
          </section>
          <!-- Description -->
          <section class="AssetForm-section">
            <label for="description">Description</label>
            <header class="AssetForm-input-header">
              The description will be included on the item's detail page underneath its image.
              <a class="text-blue" href="https://www.markdownguide.org/cheat-sheet/" rel="nofollow noopener" target="_blank">
                Markdown
              </a>
              syntax is supported.
            </header>
            <textarea v-model="Item.description" class="textarea-input" rows="6" id="description" name="description" placeholder="Provide a detailed description of your item."></textarea>
          </section>
          <!-- Collection  -->
          <section class="AssetForm-section">
            <label for="collection">Collection *</label>
            <header class="AssetForm-input-header">
              This is the collection where your item will appear. 
            </header>
            <div>
              <select v-model="Item.collection" name="collection">
                <option value="xxxx555555">
                  <img src="https://lh3.googleusercontent.com/kUziKkTQ0j4HwOtO_3ICVBCuUaIGmGyDCW1fxLWalwofupjR6BMMcPwolsvH94bWU-rYtUa2IhItNBr5m7MejT92jltYn-opDYSIjQ=s48" alt="" size="24">
                  <span>xxxx555555</span>
                </option>
                <option value="xxxxx">
                  <img src="https://lh3.googleusercontent.com/kUziKkTQ0j4HwOtO_3ICVBCuUaIGmGyDCW1fxLWalwofupjR6BMMcPwolsvH94bWU-rYtUa2IhItNBr5m7MejT92jltYn-opDYSIjQ=s48" alt="" size="24">
                  <span>xxxxx</span>
                </option>
              </select>
            </div>
          </section>
          <!-- labels -->
          <section class="AssetForm-section label-section">
            <!-- Levels -->
            <div class="label-item">
              <div class="AssetFormTraitSection--item">
                <div class="AssetFormTraitSection--content">
                  <i class="iconfont icon-list"></i>
                  <div class="AssetFormTraitSection--content-main">
                    <span class="AssetFormTraitSection-input-label">
                      Properties
                    </span>
                    <p class="AssetFormTraitSection--input-header">
                      Textual traits that show up as rectangles
                    </p>
                  </div>
                </div>
                <div class="AssetFormTraitSection--side">
                  <button class="btn btn-default add-btn">
                    <i class="iconfont icon-add"></i>
                  </button>
                </div>
              </div>
            </div>
            <!-- Stats -->
            <div class="label-item">
              <div class="AssetFormTraitSection--item">
                <div class="AssetFormTraitSection--content">
                  <i class="iconfont icon-star"></i>
                  <div class="AssetFormTraitSection--content-main">
                    <span class="AssetFormTraitSection-input-label">
                      Stats
                    </span>
                    <p class="AssetFormTraitSection--input-header">
                      Numerical traits that just show as numbers
                    </p>
                  </div>
                </div>
                <div class="AssetFormTraitSection--side">
                  <button class="btn btn-default add-btn">
                    <i class="iconfont icon-add"></i>
                  </button>
                </div>
              </div>
            </div>
            <!-- Unlockable Content -->
            <div class="label-item">
              <div class="AssetFormTraitSection--item">
                <div class="AssetFormTraitSection--content">
                  <i class="iconfont icon-lock"></i>
                  <div class="AssetFormTraitSection--content-main">
                    <span class="AssetFormTraitSection-input-label">
                      Unlockable Content
                    </span>
                    <p class="AssetFormTraitSection--input-header">
                      Include unlockable content that can only be revealed by the owner of the item.
                    </p>
                  </div>
                </div>
                <div class="AssetFormTraitSection--side">
                  <switches v-model="Item.secret" theme="bootstrap" color="success"></switches>
                </div>
              </div>
            </div>
            <!-- Explicit & Sensitive Content -->
            <div class="label-item">
              <div class="AssetFormTraitSection--item">
                <div class="AssetFormTraitSection--content">
                  <i class="iconfont icon-warning"></i>
                  <div class="AssetFormTraitSection--content-main">
                    <span class="AssetFormTraitSection-input-label">
                      Explicit & Sensitive Content
                    </span>
                    <p class="AssetFormTraitSection--input-header">
                      Set this item as explicit and sensitive content
                    </p>
                  </div>
                </div>
                <div class="AssetFormTraitSection--side">
                  <switches v-model="Item.secret" theme="bootstrap" color="success"></switches>
                </div>
              </div>
            </div>
          </section>
          <!-- blockchain -->
          <section class="AssetForm-section">
            <label for="Blockchain">Blockchain</label>
            <div>
              <div class="blockchain-box">
                <img src="../../assets/images/ethereum.png" />
                <span>{{Item.blockchain}}</span>
              </div>
            </div>
          </section>
          <!-- Freeze metadata -->
          <section class="AssetForm-section">
            <label for="Freezemetadata">Freeze metadata</label>
            <header class="AssetForm-input-header">
              Freezing your metadata will allow you to permanently lock and store all of this item's content in decentralized file storage.
            </header>
            <div>
              <switches v-model="Item.freezemetadata" theme="bootstrap" color="success"></switches>
            </div>
          </section>
          <hr />
          <!-- edit -->
          <button @click="editItem" v-if="Item.media && Item.name" class="btn btn-primary btn-lg edit-item-box-btn">Submit Changes</button>
          <button v-else class="btn btn-default edit-item-box-btn" disabled>Submit Changes</button>
          <!-- delete -->
          <button @click="deleteItem" class="btn btn-danger btn-lg delete-item-btn">Delete Item</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Switches from 'vue-switches'

export default {
  props: ['name'],
  components: {
    Switches
  },
  data() {
    return {
      Item: {
        media: 'https://testnets.opensea.io/static/images/no-history-data.svg',
        mediaType: 'img',
        name: 'xxxxxxxx',
        externalLink: '',
        description: '',
        collection: this.name,
        // labels
        secret: false,
        // other
        blockchain: 'Rinkeby',
        freezemetadata: false
      }
    }
  },
  methods: {
    getItemMedia() {
      const file = $('#media')[0]
      const fileObj = file.files[0]
      // 大于40M
      if (fileObj.size > 1024*1024*40) {
        return alert('Max size: 40 MB')
      }
      const windowURL = window.URL || window.webkitURL;
      const container = document.getElementById('preview');
      if(file && fileObj) {
        const dataURl = windowURL.createObjectURL(fileObj);
        // video
        if (fileObj.type.indexOf('video') !== -1) {
          const video = document.createElement('video')
          video.setAttribute('controls', 'controls')
          video.setAttribute('src', dataURl)
          video.style.maxWidth = '100%'
          video.style.maxHeight = '100%'
          video.style.position = 'relative'
          video.style.zIndex = 666
          this.Item.mediaType = 'video' // video
          container.innerHTML = ''
          container.append(video)
        } else if (fileObj.type.indexOf('image') !== -1) {
          const img = document.createElement('img')
          img.setAttribute('src', dataURl)
          img.style.maxWidth = '100%'
          img.style.maxHeight = '100%'
          this.Item.mediaType = 'img' // img
          container.innerHTML = ''
          container.append(img)
        }
        this.Item.media = dataURl
      }
    },
    // editItem
    editItem(e) {
      e.preventDefault()
      alert('提交修改。。。等后端')
    },
    // deleteItem
    deleteItem() {
      const isDelete = confirm('Are you sure you want to delete this item? This can only be done if you own all copies in circulation.')
      alert('你选了'+isDelete)
    }
  },
}
</script>

<style>
.editItemModal-body {
  height: 300px;
  padding-top: 20px;
  text-align: center;
}
.editItemModal-body video {
  max-width: 100%;
  max-height: 100%;
}
.editItemModal-body img {
  max-width: 100%;
  max-height: 100%;
}
.editItemModal-footer {
  text-align: center;
}
.editItemModal-footer button {
  margin: 5px;
  width: 100px;
}
.edit-item-box {
  background-color: #fff;
  padding: 20px 20px 150px 20px;
}
.edit-item-box .text-blue {
  color: #039be5 !important;
}
.edit-item-box .media-box {
  position: relative;
  width: 350px;
  height: 250px;
  padding: 40px;
  text-align: center;
  border-radius: 10px;
  border: 3px dashed #ccc;
}
.edit-item-box .media-box .icon-img {
  font-size: 80px;
}
.MediaInput-header {
  font-size: 20px;
  color: #ccc;
}
.edit-item-box .media-box input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.edit-item-box .text-input {
  width: 60%;
  height: 50px;
  padding-left: 10px;
}
.edit-item-box .textarea-input {
  width: 60%;
  padding: 10px;
}
.AssetForm-section select {
  width: 60%;
  height: 50px;
}
.edit-item-box .supply-input-box input {
  width: 60%;
  height: 50px;
  padding-left: 10px;
}
.AssetForm-section {
  margin-top: 20px;
}
.label-section {
  width: 60%;
  border-top: 1px solid #aaa;
}
.label-section .label-item {
  padding: 15px 0;
  border-bottom: 1px solid #aaa;
}
.AssetForm-section .blockchain-box {
  width: 60%;
  height: 50px;
  padding-left: 10px;
  line-height: 50px;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
}
.AssetForm-section .blockchain-box>span {
  margin-left: 15px;
}
.AssetForm-section .label-box {
  width: 60%;
  min-height: 50px;
  padding: 15px 10px 10px 10px;
  background-color: #fbfdff;
  border: 1px solid #ccc;
}
.edit-item-box .edit-item-box-btn {
  padding: 10px 20px;
  margin-top: 30px;
}
.AssetFormTraitSection--content i {
  font-size: 24px;
}
.AssetFormTraitSection--side .edit-btn {
  border-color: #2081e2;
}
.AssetFormTraitSection--side .edit-btn:hover {
  background-color: #fff;
  box-shadow: 0 0 10px #aaa;
}
.AssetFormTraitSection--side i {
  color: #2081e2;
}
.AssetFormTraitSection--content-main {
  margin-left: 10px;
}
.AssetFormTraitSection-input-label {
  font-weight: 700;
}
.AssetFormTraitSection--input-header {
  font-size: 14px;
  color: #353840;
}
.AssetFormTraitSection--item {
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: center;
}
.AssetFormTraitSection--content {
  display: flex;
}
.CollectionManager--header-title {
  font-size: 26px;
  font-weight: 500;
  margin-top: 16px;
  margin-right: 32px;
  margin-bottom: 6px;
}
.AssetForm-input-header {
  padding-bottom: 5px;
  font-weight: normal;
  font-size: 14px;
  color: #353840;
}
.icon-lock {
  color: #987df0;
}
.delete-item-btn {
  margin: 30px 0 0 300px;
}
@media screen and (max-width: 768px) {
  .edit-item-box {
    padding: 10px 20px 70px 20px;
  }
  .edit-item-box .text-input {
    width: 90%;
  }
  .edit-item-box .textarea-input {
    width: 90%;
  }
  .AssetForm-section select {
    width: 90%;
  }
  .label-section {
    width: 100%;
  }
  .edit-item-box .media-box {
    width: 320px;
    height: 240px;
  }
  .edit-item-box .supply-input-box input {
    width: 90%;
  }
  .AssetForm-section .blockchain-box {
    width: 90%;
  }
  .AssetForm-section .label-box {
    white-space: wrap;
    width: 90%;
  }
  .delete-item-btn {
    margin-left: 10px;
  }
}
</style>