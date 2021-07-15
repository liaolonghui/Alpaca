<template>
  <div class="add-item">
    <div>
      <header>
        <h1 class="CollectionManager--header-title">Create new item</h1>
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
                  <i class="iconfont icon-img"></i>
                  <header class="MediaInput-header">Drag &amp; drop file</header>
                  <div>or <span class="text-blue">browse media on your device</span></div>
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
              </select>
            </div>
          </section>
          <!-- labels -->
          <section class="AssetForm-section label-section">
            <!-- Properties -->
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
                  <div @click="(e) => showAddDialog(e, 'Properties')" class="btn btn-default add-btn">
                    <i class="iconfont icon-add"></i>
                  </div>
                </div>
              </div>
              <!-- content -->
              <div v-if="Item.Properties" class="properties-content row">
                <div v-for="(p, i) in Object.keys(Item.Properties)" :key="i" class="col-xs-6 col-sm-3 col-md-3 col-lg-3 text-center property">
                  <p>{{p}}</p>
                  <p>{{Item.Properties[p]}}</p>
                </div>
              </div>
            </div>
            <!-- Levels -->
            <div class="label-item">
              <div class="AssetFormTraitSection--item">
                <div class="AssetFormTraitSection--content">
                  <i class="iconfont icon-star"></i>
                  <div class="AssetFormTraitSection--content-main">
                    <span class="AssetFormTraitSection-input-label">
                      Levels
                    </span>
                    <p class="AssetFormTraitSection--input-header">
                      Numerical traits that show as a progress bar
                    </p>
                  </div>
                </div>
                <div class="AssetFormTraitSection--side">
                  <div @click="(e) => showAddDialog(e, 'Levels')" class="btn btn-default add-btn">
                    <i class="iconfont icon-add"></i>
                  </div>
                </div>
              </div>
              <!-- content -->
              <div v-if="Item.Levels" class="levels-content row">
                <div v-for="(l, i) in Object.keys(Item.Levels)" :key="i" class="col-xs-12 col-sm-8 col-md-7 col-lg-7 levels">
                  <p style="display: flex; justify-content: space-between;">
                    <span>{{l}}</span>
                    <span>{{Item.Levels[l][0]}} of {{Item.Levels[l][1]}}</span>
                  </p>
                  <progress style="width: 100%;" :value="Item.Levels[l][0]" :max="Item.Levels[l][1]"></progress>
                </div>
              </div>
            </div>
            <!-- Stats -->
            <div class="label-item">
              <div class="AssetFormTraitSection--item">
                <div class="AssetFormTraitSection--content">
                  <i class="iconfont icon-chart"></i>
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
                  <div @click="(e) => showAddDialog(e, 'Stats')" class="btn btn-default add-btn">
                    <i class="iconfont icon-add"></i>
                  </div>
                </div>
              </div>
              <!-- content -->
              <div v-if="Item.Stats" class="stats-content row">
                <div v-for="(l, i) in Object.keys(Item.Stats)" :key="i" class="col-xs-12 col-sm-8 col-md-7 col-lg-7 stats">
                  <p style="display: flex; justify-content: space-between;">
                    <span>{{l}}</span>
                    <span>{{Item.Stats[l][0]}} of {{Item.Stats[l][1]}}</span>
                  </p>
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
                  <switches v-model="lock" theme="bootstrap" color="success"></switches>
                </div>
              </div>
              <textarea v-if="lock" v-model="Item.UnlockableContent" style="width: 100%; padding: 10px;" rows="6" id="description" name="description" placeholder="Enter content (access key, code to redeem, link to a file, etc.)"></textarea>
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
          <!-- Supply -->
          <section class="AssetForm-section">
            <label for="supply">Supply</label>
            <header class="AssetForm-input-header">
              The number of copies that can be minted. No gas cost to you! Quantities above one coming soon.
            </header>
            <div>
              <div class="supply-input-box">
                <input autocapitalize="off" autocomplete="off" autocorrect="off" class="browser-default Input--input" data-testid="Input" disabled="" inputmode="numeric" required="" spellcheck="false" type="text" value="1">
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
              <div class="label-box">
                To freeze your metadata, you must create your item first.
              </div>
            </div>
          </section>
          <hr />
          <!-- create -->
          <button @click="addItem" v-if="Item.media && Item.name" class="btn btn-primary btn-lg add-item-btn">Create</button>
          <button v-else class="btn btn-default add-item-btn" disabled>Create</button>
        </form>
      </div>
    </div>
    <!-- addLabel的dialog -->
    <div class="modal fade" id="labelModal" tabindex="-1" role="dialog" aria-labelledby="labelModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title text-center">
                      Add {{LabelType}}
                    </h4>
                </div>
                <div class="modal-body">在这里添加一些文本</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary">提交更改</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
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
        media: '',
        mediaType: '',
        name: '',
        externalLink: '',
        description: '',
        collection: this.name,
        // labels
        Properties: {}, // Properties
        Levels: {},
        Stats: {}, // Stats
        UnlockableContent: '',
        secret: false,
        // other
        supply: 1,
        blockchain: 'Rinkeby',
        freezemetadata: false
      },
      // label-type
      LabelType: '',
      // lock
      lock: false
    }
  },
  methods: {
    // showaddDialog
    showAddDialog(e, type) {
      e.preventDefault()
      this.LabelType = type
      $('#labelModal').modal('show')
    },
    // addLabels
    addLabels() {
      $('#labelModal').modal('show')
    },
    // getItemMedia
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
    // addItem
    addItem(e) {
      e.preventDefault()
      $('#AddItemModal').modal('show')
    },
    // visitItem
    visitItem() {
      alert('马上安排')
    },
    // editItem
    editItem() {
      alert('马上安排')
    }
  },
}
</script>

<style>
.AddItemModal-body {
  height: 300px;
  padding-top: 20px;
  text-align: center;
}
.AddItemModal-body video {
  max-width: 100%;
  max-height: 100%;
}
.AddItemModal-body img {
  max-width: 100%;
  max-height: 100%;
}
.AddItemModal-footer {
  text-align: center;
}
.AddItemModal-footer button {
  margin: 5px;
  width: 100px;
}
.add-item {
  background-color: #fff;
  padding: 20px 20px 150px 20px;
}
.add-item .text-blue {
  color: #039be5 !important;
}
.add-item .media-box {
  position: relative;
  width: 350px;
  height: 250px;
  padding: 40px;
  text-align: center;
  border-radius: 10px;
  border: 3px dashed #ccc;
}
.add-item .media-box .icon-img {
  font-size: 80px;
}
.MediaInput-header {
  font-size: 20px;
  color: #ccc;
}
.add-item .media-box input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.add-item .text-input {
  width: 60%;
  height: 50px;
  padding-left: 10px;
}
.add-item .textarea-input {
  width: 60%;
  padding: 10px;
}
.AssetForm-section select {
  width: 60%;
  height: 50px;
}
.add-item .supply-input-box input {
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
.add-item .add-item-btn {
  padding: 10px 45px;
  margin-top: 30px;
}
.AssetFormTraitSection--content i {
  font-size: 24px;
}
.AssetFormTraitSection--side .add-btn {
  border-color: #2081e2;
}
.AssetFormTraitSection--side .add-btn:hover {
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
.add-item .text-input:focus,
.add-item .textarea-input:focus,
.AssetForm-section select:focus,
.label-item>textarea:focus {
  box-shadow: 0 0 10px #aaa;
  outline: none;
  border: none;
}

@media screen and (max-width: 768px) {
  .add-item {
    padding: 10px 20px 70px 20px;
  }
  .add-item .text-input {
    width: 90%;
  }
  .add-item .textarea-input {
    width: 90%;
  }
  .AssetForm-section select {
    width: 90%;
  }
  .label-section {
    width: 100%;
  }
  .add-item .media-box {
    width: 320px;
    height: 240px;
  }
  .add-item .supply-input-box input {
    width: 90%;
  }
  .AssetForm-section .blockchain-box {
    width: 90%;
  }
  .AssetForm-section .label-box {
    white-space: wrap;
    width: 90%;
  }
}
/* label */
.properties-content .property {
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  border: 1px solid rgb(21, 178, 229);
  background-color: rgba(21, 178, 229, 0.06);
  cursor: pointer;
}
.properties-content .property>p:nth-of-type(1) {
  color: #039be5;
}
.levels-content .levels {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
.stats-content .stats {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
</style>