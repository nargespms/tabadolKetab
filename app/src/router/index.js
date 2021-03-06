import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '../store/index';

Vue.use(VueRouter);

export const Router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,
  mode: 'history',
});
console.log(store.state);

Router.beforeEach((to, from, next) => {
  // See if any of the matched routes has meta "requiresAuth"
  if (to.matched.some(route => route.meta.requiresAuth)) {
    // this route requires authentication. See if the user is not authenticated.
    if (!store.state.bookShop.loggedIn) {
      // User is not authenticated, so we lead him into login
      next();
    } else {
      // check permission level
      const data = JSON.parse(localStorage.getItem('vuex'));

      const userRole = data.bookShop.userInfo.role;
      const routeRules = to.meta.roles;

      if (to.meta.access === 'BOTH') {
        if (to.meta.cRole === userRole) {
          // console.log('Both & client HAPPY');
          next();
        } else if (to.meta.cRole !== userRole) {
          if (
            routeRules.some(role => userRole[Object.keys(role)[0]] === true)
          ) {
            // console.log('Both & staff HAPPY');

            next();
          } else {
            // console.log('Both & staff UNHAPPY');

            next({ name: 'accessDenied' });
          }
        } else {
          // console.log('Both & client UNHAPPY');

          next({ name: 'accessDenied' });
        }
      } else if (to.meta.access === 'CLIENT') {
        if (to.meta.cRole === userRole) {
          // console.log('ONLY client & happy');
          next();
        } else {
          // console.log('ONLY client & unhappy');
          next({ name: 'accessDenied' });
        }
      } else if (to.meta.access !== 'CLIENT' && to.meta.access !== 'BOTH') {
        if (routeRules.some(role => userRole[Object.keys(role)[0]] === true)) {
          // console.log('ONLY staff & happy');
          next();
        } else {
          // console.log('ONLY staff & unhappy');

          next({ name: 'accessDenied' });
        }
      }
    }
  } else {
    next();
  }
});
