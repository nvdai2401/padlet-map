import Vue from 'vue';
import App from './App.vue';
import 'src/plugins/gmapVue';
import 'src/plugins/axios';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
