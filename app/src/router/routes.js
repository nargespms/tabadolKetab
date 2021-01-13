const routes = [
  {
    path: '/print',
    name: 'printLayout',
    component: () => import('../layouts/printLayout'),
    children: [
      {
        path: 'barcode/:bookId',
        name: 'bookBarcode',
        component: () => import('../views/barcodePage.vue'),
      },
      {
        path: 'discounts',
        name: 'printDiscounts',
        component: () => import('../views/print.vue'),
      },
      {
        path: 'staffs',
        name: 'printStaffs',
        component: () => import('../views/print.vue'),
      },
      {
        path: 'clients',
        name: 'printClients',
        component: () => import('../views/print.vue'),
      },
      {
        path: 'messages',
        name: 'printMessages',
        component: () => import('../views/print.vue'),
      },
      {
        path: 'tickets',
        name: 'printTickets',
        component: () => import('../views/print.vue'),
      },
      {
        path: 'requestedBooks',
        name: 'printRequestedBooks',
        component: () => import('../views/print.vue'),
      },
      {
        path: 'books',
        name: 'printBooks',
        component: () => import('../views/print.vue'),
      },
      {
        path: 'credit',
        name: 'printCredit',
        component: () => import('../views/print.vue'),
      },
      {
        path: 'postRequest',
        name: 'printPostRequests',
        component: () => import('../views/print.vue'),
      },
      {
        path: 'postRequest/:postId',
        name: 'printPostRequest',
        component: () => import('../views/printForm.vue'),
      },
      {
        path: 'forbiddenBook',
        name: 'printForbiddenBook',
        component: () => import('../views/print.vue'),
      },
      {
        path: 'invoices',
        name: 'printInvoices',
        component: () => import('../views/print.vue'),
      },
      {
        path: 'invoices/:invoiceId',
        name: 'printInvoice',
        component: () => import('../views/printForm.vue'),
      },
      {
        path: 'authors',
        name: 'printAuthors',
        component: () => import('../views/print.vue'),
      },
    ],
  },

  {
    path: '/',
    name: 'default',
    component: () => import('../layouts/default.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard.vue'),
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import('../views/signUp.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/signIn.vue'),
      },
      {
        path: '/admin-login',
        name: 'admin-login',
        component: () => import('../views/login/admin-login.vue'),
      },
      {
        path: '/users/adduser',
        name: 'adduser',
        component: () => import('../views/usersManagements/addUser.vue'),
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
        path: '/users/profile/:userId',
        name: 'profile',
        component: () => import('../views/usersManagements/profile.vue'),
      },
      {
        path: '/addBook',
        name: 'addBook',
        component: () => import('../views/book/addBook.vue'),
      },
      {
        path: '/bookList',
        name: 'bookList',
        component: () => import('../views/book/bookList.vue'),
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
      {
        path: '/messagesList/:messageId',
        name: 'message',
        component: () => import('../views/messages/message.vue'),
      },
      // tickets
      {
        path: '/createNewTicket',
        name: 'createNewTicket',
        component: () => import('../views/tickets/createNewTicket.vue'),
      },
      {
        path: '/ticketsList',
        name: 'ticketsList',
        component: () => import('../views/tickets/ticketsList.vue'),
      },
      {
        path: '/ticketsList/:ticketId',
        name: 'ticketPage',
        component: () => import('../views/tickets/ticket.vue'),
      },
      // discounts
      {
        path: '/addDiscount',
        name: 'addDiscount',
        component: () => import('../views/discount/addDiscount.vue'),
      },
      {
        path: '/discountsList',
        name: 'discountsList',
        component: () => import('../views/discount/discountsList.vue'),
      },
      // requested books
      {
        path: '/addRequestedBooks',
        name: 'addRequestedBooks',
        component: () => import('../views/requestBook/addRequestBook.vue'),
      },
      {
        path: '/requestedBooksList',
        name: 'requestedBooksList',
        component: () => import('../views/requestBook/requestedBooksList.vue'),
      },
      {
        path: '/increaseCredit',
        name: 'increaseCredit',
        component: () => import('../views/credit/increaseCredit.vue'),
      },
      {
        path: '/creditList',
        name: 'creditList',
        component: () => import('../views/credit/creditList.vue'),
      },
      {
        path: '/postRequest',
        name: 'postRequest',
        component: () => import('../views/post/postRequest.vue'),
      },
      {
        path: '/postList',
        name: 'postList',
        component: () => import('../views/post/postList.vue'),
      },
      {
        path: '/addForbiddenBook',
        name: 'addForbiddenBook',
        component: () => import('../views/forbiddenBook/addForbiddenBook.vue'),
      },
      {
        path: '/forbiddenBookList',
        name: 'forbiddenBookList',
        component: () => import('../views/forbiddenBook/forbiddenBookList.vue'),
      },
      {
        path: '/logsList',
        name: 'logsList',
        component: () => import('../views/logs/logsList.vue'),
      },
      {
        path: '/addInvoice',
        name: 'addInvoice',
        component: () => import('../views/billing/addInvoice.vue'),
      },
      {
        path: '/invoicesList',
        name: 'invoicesList',
        component: () => import('../views/billing/invoicesList.vue'),
      },
      {
        path: '/invoicesList/:invoiceId',
        name: 'invoice',
        component: () => import('../views/billing/invoice.vue'),
      },
      {
        path: '/generalSettings',
        name: 'generalSettings',
        component: () => import('../views/general/settings.vue'),
      },
      {
        path: '/bookSearch',
        name: 'bookSearch',
        component: () => import('../views/general/bookSearch.vue'),
      },
      {
        path: '/shoppingBag',
        name: 'shoppingBag',
        component: () => import('../views/general/shoppingBag.vue'),
      },
      {
        path: '/tags',
        name: 'tags',
        component: () => import('../views/tags/tags.vue'),
      },
      {
        path: '/addAuthor',
        name: 'addAuthor',
        component: () => import('../views/author/addAuthor.vue'),
      },
      {
        path: '/authorsList',
        name: 'authorsList',
        component: () => import('../views/author/authorList.vue'),
      },
      {
        path: '/addPublisher',
        name: 'addPublisher',
        component: () => import('../views/publisher/addPublisher.vue'),
      },
      {
        path: '/publishersList',
        name: 'publishersList',
        component: () => import('../views/publisher/publishersList.vue'),
      },
      {
        path: '/ordersList',
        name: 'ordersList',
        component: () => import('../views/orders/ordersList.vue'),
      },
      {
        path: '/ordersList/:orderId',
        name: 'orderPage',
        component: () => import('../views/orders/orderPage.vue'),
      },
      {
        path: '/accessLevelCreation',
        name: 'accessLevelCreation',
        component: () => import('../views/accessLevel/accessLevelCreation.vue'),
      },
      {
        path: '/accessLevelList',
        name: 'accessLevelList',
        component: () => import('../views/accessLevel/accessLevelList.vue'),
      },
      {
        path: '/accessLevelList/:role',
        name: 'accessLevelPage',
        component: () => import('../views/accessLevel/accessLevel.vue'),
      },
      {
        path: '/financialReport',
        name: 'financialReport',
        component: () => import('../views/billing/financialReport.vue'),
      },
    ],
  },
];
export default routes;
