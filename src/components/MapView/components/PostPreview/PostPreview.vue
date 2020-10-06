<template>
  <div class="post-preview">
    <div class="post-count">{{ Object.keys(posts).length }} posts</div>
    <div class="flex-row post-list">
      <div
        v-for="(post, index) in Object.values(posts)"
        :key="post.id"
        class="flex-row post-list__container"
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
import { MiniPost } from './components';

export default {
  name: 'post-preview',
  props: {
    posts: Object,
    onMouseOver: Function,
    onMouseOut: Function,
    onClick: Function,
  },
  components: {
    'mini-post': MiniPost,
  },
};
</script>

<style lang="scss" scoped>
@import './PostPreview.scss';
</style>
