<template>
  <div id="app">
    <TopBar />
    <MapView />
  </div>
</template>

<script>
import { MapView, TopBar } from './components';

export default {
  name: 'App',
  components: {
    MapView,
    TopBar,
  },
};
</script>

<style lang="scss">
@import 'src/assets/styles/reset';
@import 'src/assets/styles/base';
@import 'src/assets/styles/scrollbar_custom.scss';
@import 'src/assets/styles/gmap_custom';
</style>
