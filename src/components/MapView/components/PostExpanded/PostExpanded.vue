<template>
  <div class="flex-column align-center post-expanded">
    <div class="flex-row align-center justify-space-between toolbar">
      <div class="post-index">{{ currentIndex + 1 }}/{{ posts.length }}</div>
      <div class="nav-buttons">
        <button @click="moveToFirstPost" :disabled="currentIndex === 0">
          <font-awesome-icon :icon="['fas', 'step-backward']" />
        </button>
        <button @click="moveToPrevPost" :disabled="currentIndex === 0">
          <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </button>
        <button
          @click="moveToNextPost"
          :disabled="currentIndex === posts.length - 1"
        >
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </button>
        <button
          @click="moveToLastPost"
          :disabled="currentIndex === posts.length - 1"
        >
          <font-awesome-icon :icon="['fas', 'step-forward']" />
        </button>
      </div>
      <div>
        <button @click="onClose">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </div>
    </div>

    <div class="flex-column content">
      <spinner v-if="loading" />
      <template v-else>
        <img
          :src="postInfo.attachment + `?tr=w-${imgWidth * 2}`"
          :alt="postInfo.headline"
          :width="imgWidth"
          :height="placeholer.height"
          loading="lazy"
          :style="{ backgroundColor: placeholer.bgColor }"
          sizes="(max-width: 768px) 100vw, 720px"
          class="post-image"
        />
        <h3 class="post-header">
          {{ postInfo.headline }}
        </h3>
        <div class="post-body" v-html="postInfo.body"></div>
      </template>
    </div>
  </div>
</template>

<script>
import { getPostInfo } from '@/api';
import {
  POST_EXPANDED_WIDTH,
  calculatePlaceholderHeight,
} from '@/shares/utils';
import { Spinner } from './components';
import { keydown } from './mixins';

export default {
  name: 'post-expanded',
  props: {
    postId: Number,
    posts: Array,
    onClose: Function,
  },
  mixins: [keydown],
  components: {
    spinner: Spinner,
  },
  data() {
    return {
      postInfo: {},
      currentIndex: -1,
      placeholer: {
        bgColor: '#ffffff',
        height: '100%',
      },
      loading: true,
      imgWidth: POST_EXPANDED_WIDTH,
    };
  },
  watch: {
    async currentIndex(newValue) {
      if (newValue < 0 || newValue >= this.posts.length) return;
      this.currentIndex = newValue;
      this.loading = true;
      await this.fetchPost();
      this.updatePlaceholder();
      this.loading = false;
    },
  },
  mounted() {
    this.calculateImageWidth();
    this.currentIndex = this.posts.indexOf(String(this.postId));
  },
  methods: {
    async fetchPost() {
      const postData = await getPostInfo(this.posts[this.currentIndex]);
      this.postInfo = postData.attributes;
    },
    calculateImageWidth() {
      const screenWidth = window.innerWidth;
      const DESKTOP_MIN_WIDTH = 768;
      if (screenWidth < DESKTOP_MIN_WIDTH) {
        this.imgWidth = window.innerWidth;
      }
    },
    updatePlaceholder() {
      const placeholer = this.postInfo.preview_image;
      this.placeholer = {
        bgColor: `rgb(${placeholer.dominant_color.join(',')})`,
        height: calculatePlaceholderHeight(
          placeholer.width,
          placeholer.height,
          this.imgWidth,
        ),
      };
    },
    moveToNextPost() {
      this.currentIndex += 1;
    },
    moveToPrevPost() {
      this.currentIndex -= 1;
    },
    moveToFirstPost() {
      this.currentIndex = 0;
    },
    moveToLastPost() {
      this.currentIndex = this.posts.length - 1;
    },
    handleOnKeyDown(e) {
      const ARROW_LEFT_KEYCODE = 37,
        ARROW_RIGHT_KEYCODE = 39;
      if (e.keyCode == ARROW_LEFT_KEYCODE && this.currentIndex > 0) {
        this.moveToPrevPost();
      } else if (
        e.keyCode == ARROW_RIGHT_KEYCODE &&
        this.currentIndex < this.posts.length - 1
      ) {
        this.moveToNextPost();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './PostExpanded.scss';
</style>
