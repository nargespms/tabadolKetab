import Vue from 'vue';
// import axios from 'axios';
import VueI18n from 'vue-i18n';
import persianDate from 'persian-date';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { axiosInstance } from './plugins/axios';
import './plugins/mask';
import router from './router/index.js';
import messages from './i18n/vuetify';
import store from './store';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'fa', // set locale
  messages, // set locale messages
});

Vue.use({
  // eslint-disable-next-line no-shadow
  install(Vue) {
    Vue.prototype.$axios = axiosInstance;
    Vue.prototype.$persianDate = persianDate;
  },
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
