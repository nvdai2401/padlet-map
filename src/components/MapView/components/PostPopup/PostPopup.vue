<template>
  <div class="flex-column post-popup" @click.stop="actionListVisible = false">
    <post-content
      :src="post.attachment + '?tr=w-518'"
      :alt="post.headline"
      :styles="{ backgroundColor: placeholder.bgColor }"
      :height="placeholder.height"
      :width="254"
      :header="post.headline"
      :body="post.body"
    />
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
import PostContent from '../PostContent';

export default {
  name: 'post-popup',
  components: {
    'post-content': PostContent,
  },
  props: {
    post: Object,
    onExpandPost: Function,
  },
  data() {
    return {
      actionListVisible: false,
      placeholder: {
        bgColor: '',
        height: 0,
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
      const height = calculatePlaceholderHeight(
        placeholder.width,
        placeholder.height,
        POST_WIDTH,
      );
      this.placeholder = {
        bgColor: `rgb(${placeholder.dominant_color.join(',')})`,
        height,
      };
    },
  },
};
</script>
