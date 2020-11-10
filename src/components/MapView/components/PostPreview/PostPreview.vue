<template>
  <div class="c-post-preview">
    <div class="c-post-preview__count" data-testid="post-count">{{ posts.length }} posts</div>
    <div class="c-post-preview__list">
      <div
        v-for="(post, index) in posts"
        :key="post.id"
        data-testid="mini-post-list"
        class="c-post-preview__list__container"
      >
        <mini-post
          :post="post"
          @mouseover.native="onMouseOverPost(post.id)"
          @mouseout.native="onMouseOutPost(post.id)"
          @click.native="onClickPost(post.id)"
        />
        <div v-if="index !== posts.length - 1" class="divider"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { MiniPost } from './components';

export default {
  name: 'post-preview',
  props: {
    posts: Array,
    onMouseOverPost: Function,
    onMouseOutPost: Function,
    onClickPost: Function,
  },
  components: {
    'mini-post': MiniPost,
  },
};
</script>
