const routes = [
  {
    path: '/',
    component: () => import('../views/dashboard.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/signIn.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/dashboard.vue'),
  },
  {
    path: '/users/staffs',
    name: 'staffsList',
    component: () => import('../views/usersManagements/staffsList.vue'),
  },
  {
    path: '/users/clients',
    name: 'clientsList',
    component: () => import('../views/usersManagements/clientsList.vue'),
  },
];
export default routes;
