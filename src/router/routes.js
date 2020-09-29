const routes = [
  {
    path: '/',
    component: () => import('../views/home.vue'),
  },
  {
    path: '/users',
    component: () => import('../views/usersManagements.vue'),
  },
  {
    path: '/login',
    component: () => import('../views/signIn.vue'),
  },
];
export default routes;
