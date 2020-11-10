<template>
  <div id="app">
    <folk-me />
    <top-bar />
    <map-view />
  </div>
</template>

<script>
import { MapView, TopBar, FolkMe } from './components';

export default {
  name: 'app',
  components: {
    'map-view': MapView,
    'top-bar': TopBar,
    'folk-me': FolkMe,
  },
};
</script>

<style lang="scss">
// @import '@/assets/styles/index.scss';
</style>
