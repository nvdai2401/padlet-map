<template>
  <div class="flex-row justify-space-between mini-post">
    <div class="flex-column post-title">
      <span class="title" :style="{ color: post.color }">{{
        post.headline
      }}</span>
      <span class="subtitle" v-html="post.body"></span>
    </div>
    <div class="post-image">
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
