<template>
  <view class="content">
    <div id="bef"></div>
    <view v-bind:key="index" v-for="(cate, index) in categories">
      <category :category_data="cate"></category>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import * as pica from "../../pica-api/pica";
import category from "../../components/category.vue";
import { Category } from "../../pica-api/type";
import { favorite_item_title } from "@/pica-reader-defs";

export default Vue.extend({
  data() {
    return {
      categories: [{ title: favorite_item_title }] as Category[],
      token: "",
    };
  },
  onLoad() {
    if (uni.getStorageInfoSync().keys.indexOf("token") < 0) {
      uni.reLaunch({
        url: "/pages/login",
      });
    } else {
      this.token = uni.getStorageSync("token");
      pica
        .categories(this.token)
        .then((result) => {
          this.categories = this.categories.concat(result);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  methods: {},
  components: {
    category,
  },
});
</script>

<style>
#bef {
  height: 1rem;
  width: 100%;
}
.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
