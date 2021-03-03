import Vue from 'vue';
// import axios from 'axios';
import VueI18n from 'vue-i18n';
import JsBarcode from 'jsbarcode';

import persianDate from 'persian-date';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { axiosInstance } from './plugins/axios';
import './plugins/mask';
import { Router } from './router/index.js';
import messages from './i18n/vuetify';
import store from './store';
import 'leaflet/dist/leaflet.css';

// console.log(store);

Vue.use(VueI18n);
// Vue.use(JsBarcode);

const i18n = new VueI18n({
  locale: 'fa', // set locale
  messages, // set locale messages
});

Vue.use({
  // eslint-disable-next-line no-shadow
  install(Vue) {
    Vue.prototype.$axios = axiosInstance;
    Vue.prototype.$persianDate = persianDate;
    Vue.prototype.$jsbarcode = JsBarcode;
  },
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  i18n,
  router: Router,
  store,
  render: h => h(App),
}).$mount('#app');
