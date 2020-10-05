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
  name: 'App',
  components: {
    'map-view': MapView,
    'top-bar': TopBar,
    'folk-me': FolkMe,
  },
};
</script>

<style lang="scss">
@import 'src/assets/styles/reset';
@import 'src/assets/styles/base';
@import 'src/assets/styles/scrollbar_custom.scss';
@import 'src/assets/styles/gmap_custom';
</style>
