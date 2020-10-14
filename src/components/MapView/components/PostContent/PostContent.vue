<template>
  <div class="flex-column post-content">
    <img
      :src="src"
      :srcset="srcSet"
      :sizes="sizes"
      :alt="alt"
      :style="styles"
      :width="width"
      :height="height"
      loading="lazy"
      class="post-image"
    />
    <h3 class="post-header">
      {{ header }}
    </h3>
    <div class="post-body" v-html="body"></div>
  </div>
</template>

<script>
export default {
  name: 'post-content',
  props: {
    src: String,
    srcSet: String,
    sizes: String,
    alt: String,
    styles: Object,
    width: Number,
    height: Number,
    header: String,
    body: String,
  },
};
</script>
