<template>
  <view class="gb-reader-wrapper">
    <img class="gb-reader-image" :src="current_image_blob_url" />
    <div class="gb-reader-info-wrapper">
      <div class="gb-reader-info-page">{{ current }} / {{ total }}</div>
    </div>
    <div class="gb-reader-control-wrapper">
      <div @click="flip_left" class="gb-reader-control-left"></div>
      <div @click="flip_right" class="gb-reader-control-right"></div>
    </div>
  </view>
</template>

<script lang="ts">
import { pxy_img_url } from "@/pica-api/defs";
import { ComicDetail, Image } from "@/pica-api/type";
import Vue from "vue";
import * as pica from "../pica-api/pica";
import * as pica_image_delegate from "../pica-api/image_delegate";
export default Vue.extend({
  data() {
    return {
      id: "",
      ep_num: 1,
      current: 0,
      image_blob_urls: [] as string[],
      image_blobs: [new Blob()] as Blob[],
      images: [] as Image[],
      comic: {} as ComicDetail,
      total: 0,
      // TODO: optimize this ep shit
      ep_page: 0,
    };
  },
  onLoad(options: any) {
    if (!options.id || !options.ep_num) throw new Error("bad options");
    this.id = options.id;
    this.ep_num = options.ep_num;
    this.load_comic_info(true);
  },
  methods: {
    async load_images(start: number, end: number) {
      console.log("loading ", start);
      for (let i = start; i <= end; ++i) {
        if (!this.images[i - 1]) {
          this.load_image_urls(++this.ep_page, false);
        }
        let blob = await pica_image_delegate.load_pica_image(
          this.images[i - 1],
          uni.getStorageSync("token")
        );
        console.log("got " + start);
        this.image_blobs[i - 1] = blob;
        this.image_blob_urls[i - 1] = URL.createObjectURL(blob).toString();
      }
    },
    load_image_urls(page: number, flip: boolean) {
      pica
        .ep(uni.getStorageSync("token"), this.id, this.ep_num, page)
        .then((ep_arr) => {
          this.total = ep_arr.total;
          for (let item of ep_arr.docs) {
            this.images.push(item.media);
          }
          if (flip) ++this.current;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    load_comic_info(flip: boolean) {
      pica
        .detail(uni.getStorageSync("token"), this.id)
        .then((detail) => {
          this.comic = detail;
          uni.setNavigationBarTitle({ title: this.comic.title });
          this.load_image_urls(++this.ep_page, flip);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // TODO optimize logic
    flip_left() {
      if (this.current === 0) return;
      if (this.current === 1) {
        alert("已经是第一页了！");
        return;
      }
      --this.current;
    },
    flip_right() {
      if (this.current === 0) return;
      if (this.current === this.total) {
        alert("已经是最后一页了！");
        return;
      }
      ++this.current;
    },
  },
  asyncComputed: {
    async current_image_blob_url(): Promise<string> {
      // TODO loading image
      if (this.current === 0) return "";
      if (!this.image_blob_urls[this.current - 1]) {
        await this.load_images(this.current, this.current);
      }
      return this.image_blob_urls[this.current - 1];
    },
  },
});
</script>

<style>
page {
  height: 100%;
  background-color: #111;
}

.gb-reader-wrapper {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 100%;
}

.gb-reader-wrapper > img.gb-reader-image {
  max-height: 100%;
  max-width: 100%;
}

.gb-reader-control-wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.gb-reader-control-left,
.gb-reader-control-right {
  flex: 1;
}

.gb-reader-info-wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.gb-reader-info-page {
  color: lightgrey;
  align-self: center;
}
</style>
