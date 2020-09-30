<template>
  <div class="post-preview">
    <div class="post-count">{{ Object.keys(posts).length }} posts</div>
    <div class="post-list">
      <div v-for="(post, index) in Object.values(posts)" :key="post.id">
        <mini-post
          :post="post"
          @mouseover.native="onMouseOver(post.id)"
          @mouseout.native="onMouseOut(post.id)"
        />
        <div
          v-if="index !== Object.keys(posts).length - 1"
          class="divider"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { MiniPost } from "./components";

export default {
  name: "post-preview",
  props: {
    posts: Object,
    onMouseOver: Function,
    onMouseOut: Function,
  },
  components: {
    "mini-post": MiniPost,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/scrollbar_custom.scss";

.post-preview {
  max-height: calc(100% - 96px);
  width: 320px;
  position: absolute;
  z-index: 3001;
  right: 48px;
  bottom: 50px;
  background-color: rgba(33, 33, 33, 0.8);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;

  .post-count {
    color: hsla(0, 0%, 100%, 0.7);
    font-weight: 600;
    padding: 12px 16px;
    text-align: left;
    font-size: 0.875rem;
  }
}

.post-list {
  overflow: auto;
}
.divider {
  margin: 0 16px;
  border-top: 1px solid #333333;
}
</style>