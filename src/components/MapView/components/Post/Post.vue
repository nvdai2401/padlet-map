<template>
  <div class="post" @click.stop="actionListVisible = false">
    <img
      :src="postInfo.attachment + '?tr=w-254'"
      :alt="postInfo.headline"
      width="254px"
      :height="placeholer.height"
      loading="lazy"
      :style="{ backgroundColor: placeholer.bgColor }"
      class="post-image"
    />
    <h3 class="post-header">
      {{ postInfo.headline }}
    </h3>
    <div class="post-content" v-html="postInfo.body"></div>
    <div class="more-actions-button" @click.stop="actionListVisible = true">
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
const POST_WIDTH = 254;

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
.post {
  width: 254px;
  max-height: 600px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;

  .more-actions-button {
    visibility: hidden;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 2;
    width: 35px;
    height: 30px;
    border: 1px solid #24252c;
    border-radius: 6px;
    background-color: #24252c;
    transition: all 0.15s ease-out;

    svg {
      color: #ffffff;
    }
  }

  svg {
    width: 20px !important;
    height: 15px;
  }

  .more-actions-list {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3000;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    width: 90%;
    text-align: left;
    padding: 3px 0;
    border-radius: 6px;
    background-color: #ffffff;
    transition: all 0.15s ease-out;

    li {
      padding: 12px;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      transition: all 0.1s ease-out;
      span {
        margin-left: 6px;
      }

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }
  }

  &:hover {
    cursor: pointer;

    .more-actions-button {
      visibility: visible;
      opacity: 1;
    }
  }
}

.post-header {
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  padding: 12px 12px 6px 12px;
  line-height: 1.5rem;
}

.post-image {
  width: 100%;
}

.post-content {
  height: calc(100% - 200px);
  overflow: auto;
  padding: 12px;
  margin-bottom: 12px;
  text-align: left;
  font-size: 0.875rem;
  line-height: 1.5rem;
}
</style>
