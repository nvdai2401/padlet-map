<template>
  <div class="post-expanded">
    <div class="toolbar">
      <div class="post-index">{{ currentIndex + 1 }}/13</div>
      <div class="nav-buttons">
        <button @click="currentIndex = 0" :disabled="currentIndex === 0">
          <font-awesome-icon :icon="['fas', 'step-backward']" />
        </button>
        <button @click="currentIndex -= 1" :disabled="currentIndex === 0">
          <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </button>
        <button
          @click="currentIndex += 1"
          :disabled="currentIndex === postIds.length - 1"
        >
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </button>
        <button
          @click="currentIndex = postIds.length - 1"
          :disabled="currentIndex === postIds.length - 1"
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
      <img
        :src="postInfo.attachment"
        :alt="postInfo.headline"
        loading="lazy"
        class="post-image"
      />
      <h3 class="post-header">
        {{ postInfo.headline }}
      </h3>
      <div class="post-body" v-html="postInfo.body"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "post-expanded",
  props: {
    postId: Number,
    postList: Object,
    onClose: Function,
  },
  components: {},
  data() {
    return {
      postInfo: {},
      currentIndex: 0,
      postIds: [],
    };
  },
  watch: {
    currentIndex(newValue) {
      if (newValue < 0 || newValue >= this.postIds.length) return;
      this.postInfo = {};
      this.currentIndex = newValue;
      this.postInfo = this.postList[this.postIds[this.currentIndex]];
    },
  },
  mounted() {
    this.postInfo = this.postList[this.postId];
    this.postIds = Object.keys(this.postList);
    this.currentIndex = this.postIds.indexOf(String(this.postId));
  },
  methods: {},
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
