<template>
  <view>
    <view :key="index" v-for="(comic, index) in comics">
      <comic :comic_data="comic"> </comic>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import comic from "../components/comic.vue";
import * as pica from "../pica-api/pica";
import { Comic } from "../pica-api/type";
export default Vue.extend({
  data() {
    return {
      title: "",
      comics: [] as Comic[],
    };
  },
  onLoad(options: any) {
    if (!options.title) throw new Error("bad options");
    this.title = options.title;
    uni.setNavigationBarTitle({
      title: this.title,
    });
    pica
      .list_by_block(uni.getStorageSync("token"), this.title, 1, "ua")
      .then((result) => {
        this.comics = result.docs;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  components: {
    comic,
  },
});
</script>
