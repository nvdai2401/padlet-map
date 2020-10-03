<template>
  <div class="post-expanded">
    <div class="toolbar">
      <div class="post-index">{{ currentIndex + 1 }}/{{ posts.length }}</div>
      <div class="nav-buttons">
        <button @click="currentIndex = 0" :disabled="currentIndex === 0">
          <font-awesome-icon :icon="['fas', 'step-backward']" />
        </button>
        <button @click="currentIndex -= 1" :disabled="currentIndex === 0">
          <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </button>
        <button
          @click="currentIndex += 1"
          :disabled="currentIndex === posts.length - 1"
        >
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </button>
        <button
          @click="currentIndex = posts.length - 1"
          :disabled="currentIndex === posts.length - 1"
        >
          <font-awesome-icon :icon="['fas', 'step-forward']" />
        </button>
      </div>
      <div class="close-button">
        <button @click="onClose">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </div>
    </div>

    <div class="content">
      <spinner v-if="loading" />
      <template v-else>
        <img
          :src="postInfo.attachment"
          :alt="postInfo.headline"
          width="720px"
          :height="previewImage.height"
          loading="lazy"
          :style="{ backgroundColor: previewImage.bgColor }"
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
      previewImage: {
        bgColor: '#ffffff',
        height: '100%',
      },
      loading: true,
    };
  },
  watch: {
    async currentIndex(newValue) {
      if (newValue < 0 || newValue >= this.posts.length) return;
      this.currentIndex = newValue;
      this.loading = true;
      await this.fetchPost();
      this.updatePreviewImage();
      this.loading = false;
    },
  },
  mounted() {
    this.currentIndex = this.posts.indexOf(String(this.postId));
  },
  methods: {
    async fetchPost() {
      const postData = await getPostInfo(this.posts[this.currentIndex]);
      this.postInfo = postData.attributes;
    },
    updatePreviewImage() {
      const previewImage = this.postInfo.preview_image;
      this.previewImage = {
        bgColor: `rgb(${previewImage.dominant_color.join(',')})`,
        height: previewImage.height / (previewImage.width / 720) + 'px',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.post-expanded {
  position: fixed;
  z-index: 3005;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(51, 51, 51, 0.9), rgba(51, 51, 51, 0.5));
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.4s;

  .toolbar {
    width: 100vw;
    height: 40px;
    padding: 0 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;

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
      color: #ffffff;
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
    width: 720px;
    height: 90%;
    background-color: #ffffff;
    border-radius: 12px;
    margin-top: 24px;
    display: flex;
    flex-direction: column;
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
      border-radius: 12px 12px 0 0;
      background-color: #ffffff;
    }

    .post-body {
      overflow: auto;
      padding: 0 24px;
      margin-bottom: 12px;
      font-size: 0.875rem;
      line-height: 1.5rem;
    }
  }
}
</style>
