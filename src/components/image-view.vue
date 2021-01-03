<template>
  <img :src="blob_path" :class="image_class" />
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Image as ImageType } from "../pica-api/type";
import { pxy_img_url } from "../pica-api/defs";
export default Vue.extend({
  data() {
    return {
      blob_path: "",
      blob_obj: new Blob(),
    };
  },
  methods: {
    load_image() {
      fetch(pxy_img_url + "/pic/" + this.image_obj.path, {
        headers: {
          authorization: uni.getStorageSync("token"),
        },
      })
        .then((resp) => resp.blob())
        .then((blob) => {
          this.blob_obj = blob;
          this.blob_path = URL.createObjectURL(this.blob_obj);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {
    if (!this.image_obj) {
      return;
    }
    this.load_image();
  },
  props: {
    image_class: String,
    image_obj: Object as PropType<ImageType>,
  },
});
</script>
