<template>
  <div id="app">
    <TopBar />
    <MapView />
  </div>
</template>

<script>
import { MapView, TopBar } from "./components";

export default {
  name: "App",
  components: {
    MapView,
    TopBar,
  },
};
</script>

<style lang="scss">
@import "src/assets/styles/reset";
@import "src/assets/styles/gmap_custom";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
