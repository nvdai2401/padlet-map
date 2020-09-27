<template>
  <div class="root">
    <img :src="postInfo.attachment" loading="lazy" class="post-image" />
    <h3 class="post-header ">
      {{ postInfo.headline }}
    </h3>
    <div class="post-content" v-html="postInfo.body"></div>
  </div>
</template>

<script>
export default {
  name: 'post',
  props: {
    postInfo: Object,
  },
};
</script>

<style lang="scss" scoped>
$max-post-height: 600px;
.root {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 600px;
  :hover {
    cursor: pointer;
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

<style lang="scss">
.gm-style .gm-style-iw-c {
  max-width: 254px !important;
  max-height: 600px !important;
  padding: 0 !important;
  border-radius: 12px;

  .gm-style-iw-d {
    overflow: hidden !important;
  }

  button[title='Close'] {
    display: none !important;
  }
}
</style>
