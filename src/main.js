import Vue from 'vue';
import axios from 'axios';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import './plugins/mask';
import router from './router/index.js';
import messages from './i18n/vuetify';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'fa', // set locale
  messages, // set locale messages
});

Vue.use({
  // eslint-disable-next-line no-shadow
  install(Vue) {
    Vue.prototype.$axios = axios.create({});
  },
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  i18n,
  axios,
  router,
  render: h => h(App),
}).$mount('#app');
