<template>
  <view class="gb-button-icon-label-wrapper">
    <!-- icon -->
    <img :src="imageSrc" />
    <!-- description label -->
    <div class="gb-button-icon-label-label-wrapper">
      <slot></slot>
    </div>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {};
  },
  props: {
    imageSrc: String,
  },
});
</script>

<style>
.gb-button-icon-label-wrapper > img {
  width: 100%;
}
.gb-button-icon-label-label-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 0.8rem;
}
</style>
