const routes = [
  {
    path: '/',
    component: () => import('../views/home.vue'),
  },
  {
    path: '/login',
    component: () => import('../views/signIn.vue'),
  },
];
export default routes;
