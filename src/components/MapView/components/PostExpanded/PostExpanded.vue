<template>
  <div class="post-expanded">
    PostExpanded
    <post-slider />
  </div>
</template>

<script>
import { PostSlider } from './components';

export default {
  name: 'post-expanded',
  components: {
    'post-slider': PostSlider,
  },
};
</script>

<style lang="scss" scoped>
.post-expanded {
  position: fixed;
  z-index: 3005;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(#333, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
}
</style>
