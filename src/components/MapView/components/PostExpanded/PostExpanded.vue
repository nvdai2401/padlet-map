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
import { getPostInfo } from 'src/api';
import { Spinner } from './components';

export default {
  name: 'post-expanded',
  props: {
    postId: Number,
    posts: Array,
    onClose: Function,
  },
  components: {
    spinner: Spinner,
  },
  data() {
    return {
      postInfo: {},
      currentIndex: 0,
      placeholer: {
        bgColor: '#ffffff',
        height: '100%',
      },
      loading: true,
      imgWidth: 720,
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
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      this.imgWidth = window.innerWidth;
    }
    this.currentIndex = this.posts.indexOf(String(this.postId));
    window.addEventListener('keydown', this.handleOnKeyPress);
  },
  destroyed() {
    window.removeEventListener('keydown', this.handleOnKeyPress);
  },
  methods: {
    async fetchPost() {
      const postData = await getPostInfo(this.posts[this.currentIndex]);
      this.postInfo = postData.attributes;
    },
    updatePlaceholder() {
      const placeholer = this.postInfo.preview_image;
      this.placeholer = {
        bgColor: `rgb(${placeholer.dominant_color.join(',')})`,
        height: Math.floor(
          placeholer.height / (placeholer.width / this.imgWidth),
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
    handleOnKeyPress(e) {
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
@import 'src/assets/styles/variables.scss';

.post-expanded {
  position: fixed;
  z-index: zIndex('post-expanded');
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(51, 51, 51, 0.9), rgba(51, 51, 51, 0.5));
  backdrop-filter: blur(10px);
  transition: all 0.2s ease-out;

  .toolbar {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 54px;
    padding: 0 12px;
    color: $white;
    background-color: rgba(43, 43, 43, 0.5);

    .post-index {
      letter-spacing: 1px;
    }

    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
    }

    svg {
      width: 20px !important;
      height: 18px;
      color: $white;
    }

    .nav-buttons {
      button {
        margin-right: 12px;
        &:last-child {
          margin-right: 0;
        }

        &:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      }
    }
  }

  .content {
    width: 100vw;
    height: 100vh;
    background-color: $white;
    transition: all 0.15s ease-out;

    .post-header {
      font-size: 2rem;
      font-weight: 600;
      text-align: left;
      padding: 24px;
      line-height: 1.5rem;
    }

    .post-image {
      width: 100%;
      background-color: $white;
    }

    .post-body {
      overflow: auto;
      padding: 0 24px;
      margin-bottom: 60px;
      font-size: 0.875rem;
      line-height: 1.5rem;
    }
  }

  @media screen and (min-width: 768px) {
    .toolbar {
      position: relative;
      background-color: unset;
    }

    .content {
      width: 720px;
      height: 90vh;
      border-radius: 12px;
      margin-top: 24px;

      .post-image {
        border-radius: 12px 12px 0 0;
      }
    }
  }
}
</style>
