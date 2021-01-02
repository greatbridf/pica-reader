<template>
  <view class="content">
    <text>{{ content }}</text>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import * as pica from "../../pica-api/pica";
export default Vue.extend({
  data() {
    return {
      content: "",
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
          this.content = JSON.stringify(result);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  methods: {},
});
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
