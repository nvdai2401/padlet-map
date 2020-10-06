<template>
  <div class="flex-column post" @click.stop="actionListVisible = false">
    <img
      :src="postInfo.attachment + '?tr=w-518'"
      :alt="postInfo.headline"
      :style="{ backgroundColor: placeholer.bgColor }"
      :height="placeholer.height"
      width="254px"
      loading="lazy"
      class="post-image"
    />
    <h3 class="post-header">
      {{ postInfo.headline }}
    </h3>
    <div class="post-content" v-html="postInfo.body"></div>
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

export default {
  name: 'post',
  props: {
    postInfo: Object,
    onExpandPost: Function,
  },
  data() {
    return {
      actionListVisible: false,
      placeholer: {
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
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${this.postInfo.location_name}`,
        '_blank',
      );
    },
    updatePlaceholder() {
      const POST_WIDTH = 254;
      const placeholer = this.postInfo.preview_image;
      this.placeholer = {
        bgColor: `rgb(${placeholer.dominant_color.join(',')})`,
        height:
          Math.floor(placeholer.height / (placeholer.width / POST_WIDTH)) +
          'px',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Post.scss';
</style>
