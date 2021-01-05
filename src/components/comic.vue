<template>
  <view class="comic-wrapper" @click="navigate_to_comic_detail">
    <image-view
      image_class="comic-image"
      :image_obj="comic_data.thumb"
    ></image-view>
    <view class="comic-detail">
      <view class="flex">
        <span class="comic-title">{{ comic_data.title }}</span>
        <span>（{{ comic_data.pagesCount }}页）</span>
      </view>
      <view class="comic-author">
        <text>{{ comic_data.author }}</text>
      </view>
      <view class="comic-description flex">
        <span v-if="comic_data.finished">已完结</span>
        <span v-else>未完结</span>
        <span>共{{ comic_data.epsCount }}话</span>
      </view>
      <view>
        <span> Likes: {{ comic_data.likesCount }} </span>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import imageView from "./image-view.vue";
import { Comic } from "../pica-api/type";
export default Vue.extend({
  data() {
    return {};
  },
  props: {
    comic_data: {
      type: Object as PropType<Comic>,
    },
  },
  mounted() {
    this.comic_data.categories;
  },
  components: {
    imageView,
  },
  methods: {
    navigate_to_comic_detail() {
      uni.navigateTo({
        url: "/pages/comic-detail?id=" + this.comic_data._id,
      });
    },
  },
});
</script>

<style>
.comic-wrapper {
  display: flex;
  margin: 0.2rem;
  border: solid black 1px;
}
/* .comic-wrapper:hover {
  filter: opacity(0.7);
} */
.comic-image {
  width: 3rem;
  height: 4rem;
  flex: none;
}
.comic-detail {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.5rem;
  margin: 10px;
  flex-direction: column;
  flex: 1;
}
.comic-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
}
.comic-author {
  font-size: 0.4rem;
  color: darkgrey;
}
.flex {
  display: flex;
}
.comic-description {
  justify-content: space-between;
}
</style>
