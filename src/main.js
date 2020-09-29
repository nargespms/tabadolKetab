import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router/index.js';
// import axios from './plugins/axios.js';
import axios from 'axios';

Vue.use({
  install(Vue) {
    Vue.prototype.$axios = axios.create({});
  },
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  axios,
  router,
  render: h => h(App),
}).$mount('#app');
