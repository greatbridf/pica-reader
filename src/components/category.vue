<template>
  <div class="media" @click="navigate">
    <image-view
      image_class="rounded-circle"
      :image_obj="category_data.thumb"
    ></image-view>
    <span>{{ category_data.title }}</span>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import imageView from "../components/image-view.vue";
import * as pica from "../pica-api/pica";
import * as pica_types from "../pica-api/type";
export default Vue.extend({
  data() {
    return {
      token: uni.getStorageSync("token"),
    };
  },
  props: {
    category_data: {
      type: Object as PropType<pica_types.Category>,
    },
  },
  methods: {
    navigate(event: Event) {
      uni.navigateTo({
        url: "/pages/comic-list?title=" + this.category_data.title,
      });
    },
  },
  components: {
    imageView,
  },
});
</script>

<style>
.media {
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
  margin: 0.07rem;
}
.media:hover {
  filter: opacity(0.7);
}
img {
  width: 6rem;
  height: 6rem;
}
</style>
