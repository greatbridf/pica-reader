<template>
  <view style="margin: 0.3rem">
    <view class="detail-description-wrapper">
      <view class="detail-description-left">
        <image-view
          :image_obj="thumb"
          class="detail-description-image"
        ></image-view>
        <view class="detail-description-button-wrapper">
          <button-icon-label
            image-src="/static/icons/star.svg"
            class="detail-description-favo"
          >
            <text v-if="comic.isFavourite">已收藏</text>
            <text v-else>收藏</text>
          </button-icon-label>
          <button-icon-label
            image-src="/static/icons/heart.svg"
            class="detail-description-like"
          >
            <text>{{ comic.likesCount }}</text>
          </button-icon-label>
        </view>
      </view>
      <view class="detail-description-right">
        <view class="detail-description-title-wrapper">
          <text class="detail-description-title">{{ comic.title }}</text>
          <text class="detail-description-title-pages"
            >（{{ comic.pagesCount }}页）</text
          >
        </view>
        <text class="detail-description-author">{{ comic.author }}</text>
        <text class="detail-description-translation">{{
          comic.chineseTeam
        }}</text>
        <view class="detail-description-tags">
          <comic-tag v-for="(tag, index) in comic.tags" :key="index">{{
            tag
          }}</comic-tag>
        </view>
        <view class="detail-description-text-wrapper">
          <text class="detail-description-text">{{ comic.description }}</text>
          <!-- expand button goes here -->
        </view>
      </view>
    </view>
    <view class="detail-eps-wrapper">
      <text class="detail-eps-total">共{{ comic.epsCount }}话</text>
      <view class="detail-eps-list">
        <text class="detail-eps-item" v-for="(ep, index) in eps" :key="index">{{
          ep.title
        }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { ComicDetail, EpsItem, Image as ImageType } from "@/pica-api/type";
import * as pica from "../pica-api/pica";
import Vue from "vue";
import imageView from "../components/image-view.vue";
import buttonIconLabel from "../components/button-icon-label.vue";
import comicTag from "../components/comic-tag.vue";
export default Vue.extend({
  data() {
    return {
      comic_id: "",
      comic: {
        thumb: {},
        tags: [] as string[],
        categories: [] as string[],
      } as ComicDetail,
      thumb: {} as ImageType,
    };
  },
  methods: {
    load_comic() {
      pica
        .detail(uni.getStorageSync("token"), this.comic_id)
        .then((detail) => {
          this.comic = detail;
          this.thumb = this.comic.thumb;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  onLoad(options: any) {
    if (!options.id) throw new Error("bad options");
    this.comic_id = options.id;
    this.load_comic();
  },
  components: { imageView, buttonIconLabel, comicTag },
  asyncComputed: {
    async eps() {
      console.log("compute");
      let arr = [] as EpsItem[];
      let n_page = 1;
      while (true) {
        let result = await pica.eps(
          uni.getStorageSync("token"),
          this.comic_id,
          n_page++
        );
        arr = arr.concat(result.docs);
        if (result.page >= result.pages) break;
      }
      return arr;
    },
  },
});
</script>

<style>
.detail-description-left {
  flex: 1;
  min-width: 0;
}

.detail-description-image {
  width: 100%;
}

.detail-description-button-wrapper {
  display: flex;
  align-items: flex-start;
}

.detail-description-favo {
  flex: 1;
}

.detail-description-like {
  flex: 1;
}

.detail-description-wrapper {
  display: flex;
}

.detail-description-right {
  display: flex;
  flex-direction: column;
  flex: 2;
  min-width: 0;
  margin-left: 0.5rem;
}

.detail-description-title-wrapper {
  display: flex;
  min-width: 0;
  font-size: 0.85rem;
}

.detail-description-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-description-title-pages {
  flex-shrink: 0;
}

.detail-description-author {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: palevioletred;
  font-size: 0.7rem;
}

.detail-description-translation {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: deepskyblue;
  font-size: 0.7rem;
}

.detail-description-tags {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
}

.detail-description-text-wrapper {
  display: flex;
}

.detail-description-text {
  font-size: 0.6rem;
}

.detail-eps-wrapper {
  margin-top: 1.5rem;
}

.detail-eps-total {
  display: flex;
  font-size: 0.7rem;
}

.detail-eps-list {
  display: flex;
  flex-direction: row;
  padding: 0.4rem;
  flex-wrap: wrap;
}

.detail-eps-item {
  display: flex;
  flex: 0 0 20%;
  border: solid 1px darkgrey;
  justify-content: center;
  align-content: center;
  font-size: 0.5rem;
  margin: 2.5%;
  padding: 0.2rem 0 0.2rem 0;
}
</style>
