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
import { Comic, ComicList } from "../pica-api/type";
import { favorite_item_title } from "../pica-reader-defs";
export default Vue.extend({
  data() {
    return {
      title: "",
      comics: [] as Comic[],
      page: 0,
      total: 0,
      loading: true,
    };
  },
  methods: {
    load_comics() {
      let promise: Promise<ComicList>;
      if (this.title === favorite_item_title) {
        promise = pica.favourite(uni.getStorageSync("token"), this.page + 1);
      } else {
        promise = pica.list_by_block(
          uni.getStorageSync("token"),
          this.title,
          this.page + 1,
          "ua"
        );
      }
      this.handle_data(promise);
    },
    handle_data(promise: Promise<ComicList>) {
      promise
        .then((result) => {
          this.comics = this.comics.concat(result.docs);
          this.total = result.pages;
          ++this.page;
          this.loading = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  onLoad(options: any) {
    if (!options.title) throw new Error("bad options");
    this.title = options.title;
    uni.setNavigationBarTitle({
      title: this.title,
    });
    this.load_comics();
  },
  onReachBottom() {
    if (this.loading) return;
    if (this.page === this.total) {
      alert("已经到最底端了");
      return;
    }
    this.loading = true;
    this.load_comics();
  },
  components: {
    comic,
  },
});
</script>
