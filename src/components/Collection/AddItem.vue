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
              <div>
                <div>
                  <i class="iconfont icon-img"></i>
                  <header class="MediaInput-header">Drag &amp; drop file</header>
                  <div>or <span class="text-blue">browse media on your device</span></div>
                </div>
                <input id="media" name="media" type="file">
              </div>
            </div>
          </section>
          <!-- name -->
          <section class="AssetForm-section">
            <label for="name">Name *</label>
            <div>
              <div>
                <input class="text-input" autocapitalize="off" autocomplete="off" autocorrect="off" data-testid="Input" id="name" name="name" placeholder="Item Name" required="" spellcheck="false" type="text" value="">
              </div>
            </div>
          </section>
          <!-- External Link -->
          <section class="AssetForm-section">
            <label for="external_link">External Link</label>
            <header class="AssetForm-input-header">
              OpenSea will include a link to this URL on this item's detail page, so that users can click to learn more about it.
              You are welcome to link to your own webpage with more details.
            </header>
            <div>
              <div>
                <input class="text-input" autocapitalize="off" autocomplete="off" autocorrect="off" data-testid="Input" id="external_link" name="external_link" placeholder="https://yoursite.io/item/123" spellcheck="false" type="url" value="">
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
            <textarea class="textarea-input" rows="6" id="description" name="description" placeholder="Provide a detailed description of your item."></textarea>
          </section>
          <!-- Collection  -->
          <section class="AssetForm-section">
            <label for="collection">Collection *</label>
            <header class="AssetForm-input-header">
              This is the collection where your item will appear. 
            </header>
            <div>
              <div>
                <div>
                  <img src="https://lh3.googleusercontent.com/kUziKkTQ0j4HwOtO_3ICVBCuUaIGmGyDCW1fxLWalwofupjR6BMMcPwolsvH94bWU-rYtUa2IhItNBr5m7MejT92jltYn-opDYSIjQ=s48" size="24">
                </div>
              </div>
              <input placeholder="Select collection" value="namenotpppp" style="cursor: text;">
            </div>
          </section>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name']
}
</script>

<style>
.add-item {
  padding-bottom: 50px;
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
.AssetForm-section {
  margin-top: 20px;
}
.CollectionManager--header-title {
  font-size: 26px;
  font-weight: 500;
  margin-top: 16px;
  margin-right: 32px;
  margin-bottom: 6px;
}
.AssetForm-input-header {
  font-weight: normal;
  font-size: 14px;
  color: #353840;
}
@media screen and (max-width: 768px) {
  .add-item {
    padding: 0 10px 30px 10px;
  }
  .add-item .text-input {
    width: 80%;
  }
  .add-item .textarea-input {
    width: 80%;
  }
}
</style>