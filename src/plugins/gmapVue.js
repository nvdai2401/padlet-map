import Vue from 'vue';
import * as GmapVue from 'gmap-vue';

Vue.use(GmapVue, {
  load: {
    key: process.env.VUE_APP_GMAP_API_KEY,
  },
  installComponents: true,
});