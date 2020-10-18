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
  {
    path: '/addBookCat',
    name: 'addBookCat',
    component: () => import('../views/bookCategory/addBookCat.vue'),
  },
  {
    path: '/bookCatList',
    name: 'bookCatList',
    component: () => import('../views/bookCategory/bookCatList.vue'),
  },
  // messages
  {
    path: '/createNewMsg',
    name: 'createNewMsg',
    component: () => import('../views/messages/createNewMsg.vue'),
  },
  {
    path: '/messagesList',
    name: 'messagesList',
    component: () => import('../views/messages/messagesList.vue'),
  },
  // tickets
  {
    path: '/ticketsList',
    name: 'ticketsList',
    component: () => import('../views/tickets/ticketsList.vue'),
  },
];
export default routes;
