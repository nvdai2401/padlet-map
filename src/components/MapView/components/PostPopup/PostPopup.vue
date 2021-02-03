<template>
  <div
    data-testid="post-popup"
    class="c-post-popup"
    @click.stop="actionListVisible = false"
  >
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
      data-testid="more-actions-button"
      class="more-actions-button pointer"
      @click.stop="actionListVisible = true"
    >
      <font-awesome-icon :icon="['fas', 'ellipsis-v']" />
    </div>

    <ul v-if="actionListVisible" class="more-actions-list pointer">
      <li class="more-actions-list__item" @click="onExpandPost">
        <font-awesome-icon :icon="['fas', 'expand']" />
        <span>Expand post</span>
      </li>
      <li class="more-actions-list__item" @click="openLinkInGmap">
        <font-awesome-icon :icon="['far', 'map']" />
        <span>Open in Google Map</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import {
  POST_WIDTH,
  calculatePlaceholderHeight,
  generateGmapSearchUrl,
} from "@/shares/utils";
import PostContent from "../PostContent";

const PostPopupProps = Vue.extend({
  props: {
    post: Object,
    onExpandPost: Function,
  },
  components: {
    "post-content": PostContent,
  },
});

@Component
export default class PostPopup extends mixins(Vue, PostPopupProps) {
  private actionListVisible = false;
  private placeholder = {
    bgColor: "",
    height: 0,
  };

  mounted(): void {
    this.updatePlaceholder();
  }

  openLinkInGmap(): void {
    window.open(generateGmapSearchUrl(this.post.location_name), "_blank");
  }

  updatePlaceholder(): void {
    const placeholder = this.post.preview_image;
    const height = calculatePlaceholderHeight(
      placeholder.width,
      placeholder.height,
      POST_WIDTH
    );
    this.placeholder = {
      bgColor: `rgb(${placeholder.dominant_color.join(",")})`,
      height,
    };
  }
}
</script>
