<template>
  <div class="c-post-content">
    <img
      :src="src"
      :srcset="srcSet"
      :sizes="sizes"
      :alt="alt"
      :style="styles"
      :width="width"
      :height="height"
      loading="lazy"
      class="c-post-content__image"
    />
    <h4 class=" p-6 p-l-12 p-r-12">
      {{ header }}
    </h4>
    <div class="c-post-content__body p-b-12 p-l-12 p-r-12" v-html="body"></div>
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
