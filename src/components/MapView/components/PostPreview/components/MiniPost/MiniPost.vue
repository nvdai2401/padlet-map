<template>
  <div class="mini-post">
    <div class="post-title">
      <span class="title" :style="{ color: post.color }">{{
        post.headline
      }}</span>
      <span class="subtitle" v-html="post.body"></span>
    </div>
    <div class="post-image">
      <img :src="post.attachment" :alt="post.subject" />
    </div>
  </div>
</template>

<script>
export default {
  name: "mini-post",
  props: {
    post: Object,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.mini-post {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.15s ease-out;

  .post-title {
    display: flex;
    flex-direction: column;
    width: calc(100% - 72px);

    span {
      overflow: hidden;
      text-transform: capitalize;
      text-align: left;
      text-overflow: ellipsis;
    }

    .subtitle {
      color: #ffffff;
      font-size: 0.75rem;
      margin-top: 3px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .title {
      font-size: 1rem;
      line-height: 1.25rem;
      font-weight: 600;
      white-space: nowrap;
    }
  }

  .post-image {
    width: 56px;
    height: 56px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 6px;
    }
  }

  &:hover {
    background-color: #000000;
  }
}
</style>