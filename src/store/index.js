import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import  bookShop  from './bookShop';



Vue.use(Vuex);

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      bookShop,
    },

    plugins: [createPersistedState()],
    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV,
  });

  return Store;
}

