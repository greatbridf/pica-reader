<template>
  <img :src="blob_url" :class="image_class" />
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Image as ImageType } from "../pica-api/type";
import { load_pica_image } from "../pica-api/image_delegate";
export default Vue.extend({
  asyncComputed: {
    async blob_url() {
      if (!this.image_obj || !this.image_obj.path) {
        return require("../static/icons/broken.svg");
      }
      let blob = await load_pica_image(
        this.image_obj,
        uni.getStorageSync("token")
      );
      let url = URL.createObjectURL(blob).toString();
      return url;
    },
  },
  props: {
    image_class: String,
    image_obj: Object as PropType<ImageType>,
  },
});
</script>
