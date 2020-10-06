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
  @include size($width: 254px, $maxHeight: 600px);
  @include relative();
  z-index: zIndex('post');

  .more-actions-button {
    @include absolute($top: 6px, $right: 6px);
    @include size($width: 35px, $height: 30px);
    z-index: zIndex('post') + 1;
    border: 1px solid #24252c;
    border-radius: 6px;
    background-color: #24252c;
    transition: all 0.15s ease-out;

    svg {
      color: $white;
    }
  }

  svg {
    @include size($height: 15px);
  }

  .more-actions-list {
    @include absolute($top: 0, $right: 0);
    @include size($width: 90%);
    z-index: zIndex('post') + 2;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    text-align: left;
    padding: 3px 0;
    border-radius: 6px;
    background-color: $white;
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

  .post-header {
    font-size: 1rem;
    font-weight: 500;
    text-align: left;
    padding: 12px 12px 6px 12px;
    line-height: 1.5rem;
  }

  .post-image {
    @include size($width: 100%);
  }

  .post-content {
    @include size($height: calc(100% - 200px));
    overflow: auto;
    padding: 12px;
    margin-bottom: 12px;
    text-align: left;
    font-size: 0.875rem;
    line-height: 1.5rem;
  }

  @include desktop {
    .more-actions-button {
      visibility: hidden;
      opacity: 0;
    }

    &:hover {
      cursor: pointer;

      .more-actions-button {
        visibility: visible;
        opacity: 1;
      }
    }
  }
}
</style>
