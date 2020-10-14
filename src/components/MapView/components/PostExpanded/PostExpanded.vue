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

      <post-content
        v-else
        :src="postInfo.attachment + `?tr=w-${imgWidth}`"
        :srcSet="srcSet"
        sizes="(min-width: 768px) 720px, 100vw"
        :alt="postInfo.headline"
        :width="imgWidth"
        :height="placeholder.height"
        :styles="{ backgroundColor: placeholder.bgColor }"
        :header="postInfo.headline"
        :body="postInfo.body"
      />
    </div>
  </div>
</template>

<script>
import { getPostInfo } from '@/api';
import {
  POST_EXPANDED_WIDTH,
  calculatePlaceholderHeight,
} from '@/shares/utils';
import PostContent from '../PostContent';
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
    'post-content': PostContent,
  },
  data() {
    return {
      postInfo: {},
      currentIndex: -1,
      placeholder: {
        bgColor: '',
        height: 0,
      },
      srcSet: '',
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
      this.generateSrcSet();
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
      const placeholder = this.postInfo.preview_image;

      this.placeholder = {
        bgColor: `rgb(${placeholder.dominant_color.join(',')})`,
        height: calculatePlaceholderHeight(
          placeholder.width,
          placeholder.height,
          this.imgWidth,
        ),
      };
    },
    generateSrcSet() {
      const breakPoints = [
        180,
        360,
        540,
        720,
        900,
        1080,
        1296,
        1512,
        1728,
        2048,
      ];
      let srcSet = '';

      for (let i = 0; i < breakPoints.length; i++) {
        srcSet += `${this.postInfo.attachment}?tr:w-${breakPoints[i]} ${breakPoints[i]}w`;
        srcSet += i < breakPoints.length - 1 ? ', ' : '';
      }
      this.srcSet = srcSet;
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
        ARROW_RIGHT_KEYCODE = 39,
        ESCAPE_KEYCODE = 27;

      switch (e.keyCode) {
        case ARROW_LEFT_KEYCODE:
          if (this.currentIndex > 0) {
            this.moveToPrevPost();
          }
          break;
        case ARROW_RIGHT_KEYCODE:
          if (this.currentIndex < this.posts.length - 1) {
            this.moveToNextPost();
          }
          break;
        case ESCAPE_KEYCODE:
          this.onClose();
          break;
        default:
          return;
      }
    },
  },
};
</script>
