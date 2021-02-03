<template>
  <div class="c-mini-post pointer" data-testid="mini-post">
    <div class="c-mini-post__content">
      <h5
        data-testid="mini-post-title"
        class="title"
        :style="{ color: post.color }"
      >
        {{ post.headline }}
      </h5>
      <span
        data-testid="mini-post-subtitle"
        class="subtitle"
        v-html="post.body"
      ></span>
    </div>
    <div class="c-mini-post__image">
      <img
        data-testid="mini-post-image"
        :src="post.attachment + '?tr=w-112'"
        :alt="post.subject"
        width="56px"
        height="56px"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";

const MiniPostProps = Vue.extend({
  props: {
    post: Object,
  },
});

@Component
export default class MiniPost extends mixins(Vue, MiniPostProps) {}
</script>
