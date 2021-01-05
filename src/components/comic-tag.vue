<template>
  <view class="gb-comic-tag-wrapper">
    <slot></slot>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {};
  },
});
</script>

<style>
.gb-comic-tag-wrapper {
  background-color: mistyrose;
  border-radius: 0.3rem;
  margin: 0.1rem;
  padding: 0.1rem 0.3rem 0.1rem 0.3rem;
  font-size: 0.6rem;
}
</style>
