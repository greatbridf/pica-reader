<template>
  <img :src="blob_url" :class="image_class" />
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Image as ImageType } from "../pica-api/type";
import { pxy_img_url } from "../pica-api/defs";
export default Vue.extend({
  asyncComputed: {
    async blob_url() {
      if (!this.image_obj || !this.image_obj.path) {
        // TODO: return break image
        return new Blob();
      }
      let blob = await (
        await fetch(pxy_img_url + "/pic/" + this.image_obj.path, {
          headers: {
            authorization: uni.getStorageSync("token"),
          },
        })
      ).blob();
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
