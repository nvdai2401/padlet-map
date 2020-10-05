<template>
  <div class="post-preview">
    <div class="post-count">{{ Object.keys(posts).length }} posts</div>
    <div class="post-list">
      <div
        v-for="(post, index) in Object.values(posts)"
        :key="post.id"
        class="post-list__container"
      >
        <mini-post
          :post="post"
          @mouseover.native="onMouseOver(post.id)"
          @mouseout.native="onMouseOut(post.id)"
          @click.native="onClick(post.id)"
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
    onClick: Function,
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
@import "src/assets/styles/variables.scss";

.post-preview {
  display: flex;
  width: 100vw;
  position: absolute;
  z-index: zIndex("post-preview");
  left: 0;
  bottom: 0;
  background-color: rgba(43, 43, 43, 0.8);
  backdrop-filter: blur(10px);

  .post-count {
    display: none;
  }

  .post-list {
    display: flex;
    flex-direction: row;
    overflow: auto;

    .post-list__container {
      display: flex;

      .divider {
        margin: 16px 0;
        border-left: 1px solid #333333;
      }
    }
  }

  @media screen and (min-width: 768px) {
    max-height: calc(100% - 96px);
    width: 320px;
    left: unset;
    right: 12px;
    bottom: 72px;
    flex-direction: column;
    padding-bottom: 16px;
    border-radius: 6px;

    .post-list {
      flex-direction: column;

      .post-list__container {
        flex-direction: column;
        .divider {
          margin: 0 16px;
          border-left: unset;
          border-top: 1px solid #333333;
        }
      }
    }

    .post-count {
      display: inline-block;
      color: hsla(0, 0%, 100%, 0.7);
      font-weight: 600;
      padding: 12px 16px;
      text-align: left;
      font-size: 0.875rem;
    }
  }
}
</style>
