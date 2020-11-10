<template>
  <div class="c-mini-post pointer">
    <div class="c-mini-post__content">
      <h5 class="title" :style="{ color: post.color }">{{
        post.headline
      }}</h5>
      <span class="subtitle" v-html="post.body"></span>
    </div>
    <div class="c-mini-post__image">
      <img
        :src="post.attachment + '?tr=w-112'"
        :alt="post.subject"
        width="56px"
        height="56px"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'mini-post',
  props: {
    post: Object,
  },
};
</script>
