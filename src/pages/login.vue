<template>
  <view>
    <form action="#">
      <div class="form-group">
        <label for="username">用户名</label>
        <input
          id="username"
          class="form-control"
          v-model="username"
          type="text"
        />
      </div>

      <div class="form-group">
        <label for="password">密码</label>
        <input
          id="password"
          class="form-control"
          v-model="password"
          type="password"
        />
      </div>

      <button type="button" @click="login" class="btn btn-primary btn-block">
        登录
      </button>
    </form>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import * as pica from "../pica-api/pica";
export default Vue.extend({
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      pica
        .authorize(this.username, this.password)
        .then((token) => {
          uni.setStorageSync("token", token);
          console.log(token);
          uni.reLaunch({
            url: "/pages/index/index",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});
</script>
