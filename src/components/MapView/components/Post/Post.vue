<template>
  <div class="flex-column post" @click.stop="actionListVisible = false">
    <img
      :src="post.attachment + '?tr=w-518'"
      :alt="post.headline"
      :style="{ backgroundColor: placeholder.bgColor }"
      :height="placeholder.height"
      width="254"
      loading="lazy"
      class="post-image"
    />
    <h3 class="post-header">
      {{ post.headline }}
    </h3>
    <div class="post-content" v-html="post.body"></div>
    <div
      class="flex-row align-center justify-center more-actions-button"
      @click.stop="actionListVisible = true"
    >
      <font-awesome-icon :icon="['fas', 'ellipsis-v']" />
    </div>

    <ul v-if="actionListVisible" class="more-actions-list">
      <li @click="onExpandPost">
        <font-awesome-icon :icon="['fas', 'expand']" />
        <span>Expand post</span>
      </li>
      <li @click="openLinkInGmap">
        <font-awesome-icon :icon="['far', 'map']" />
        <span>Open in Google Map</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  POST_WIDTH,
  calculatePlaceholderHeight,
  generateGmapSearchUrl,
} from '@/shares/utils';

export default {
  name: 'post',
  props: {
    post: Object,
    onExpandPost: Function,
  },
  data() {
    return {
      actionListVisible: false,
      placeholder: {
        bgColor: '#ffffff',
        height: '100%',
      },
    };
  },
  mounted() {
    this.updatePlaceholder();
  },
  methods: {
    openLinkInGmap() {
      window.open(generateGmapSearchUrl(this.post.location_name), '_blank');
    },
    updatePlaceholder() {
      const placeholder = this.post.preview_image;
      this.placeholder = {
        bgColor: `rgb(${placeholder.dominant_color.join(',')})`,
        height: calculatePlaceholderHeight(
          placeholder.width,
          placeholder.height,
          POST_WIDTH,
        ),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Post.scss';
</style>
