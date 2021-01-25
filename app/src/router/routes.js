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
        meta: {
          requiresAuth: true,
          roles: [{ r_report: true }],
        },
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
        meta: {
          requiresAuth: true,
          roles: [{ cu_staff: true }, { cu_client: true }],
        },
      },
      {
        path: '/users/staffs',
        name: 'staffsList',
        component: () => import('../views/usersManagements/staffsList.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_staff: true }, { d_staff: true }, { r_staff: true }],
        },
      },
      {
        path: '/users/clients',
        name: 'clientsList',
        component: () => import('../views/usersManagements/clientsList.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ r_client: true }, { cu_client: true }],
        },
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
        meta: {
          requiresAuth: true,
          roles: [{ cu_book: true }],
        },
      },
      {
        path: '/bookList',
        name: 'bookList',
        component: () => import('../views/book/bookList.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ r_book: true }],
          access: 'BOTH',
          cRole: 'CLIENT',
        },
      },
      {
        path: '/addBookCat',
        name: 'addBookCat',
        component: () => import('../views/bookCategory/addBookCat.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_category: true }],
        },
      },
      {
        path: '/bookCatList',
        name: 'bookCatList',
        component: () => import('../views/bookCategory/bookCatList.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_category: true }, { d_category: true }],
        },
      },
      // messages
      {
        path: '/createNewMsg',
        name: 'createNewMsg',
        component: () => import('../views/messages/createNewMsg.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_message: true }],
        },
      },
      {
        path: '/messagesList',
        name: 'messagesList',
        component: () => import('../views/messages/messagesList.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_message: true }, { d_message: true }],
          access: 'BOTH',
          cRole: 'CLIENT',
        },
      },
      {
        path: '/messagesList/:messageId',
        name: 'message',
        component: () => import('../views/messages/message.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_message: true }, { r_message: true }],
          access: 'BOTH',
          cRole: 'CLIENT',
        },
      },
      // tickets
      {
        path: '/createNewTicket',
        name: 'createNewTicket',
        component: () => import('../views/tickets/createNewTicket.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_ticket: true }],
        },
      },
      {
        path: '/ticketsList',
        name: 'ticketsList',
        component: () => import('../views/tickets/ticketsList.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_ticket: true }, { d_ticket: true }],
        },
      },
      {
        path: '/ticketsList/:ticketId',
        name: 'ticketPage',
        component: () => import('../views/tickets/ticket.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_ticket: true }, { r_ticket: true }],
        },
      },
      // discounts
      {
        path: '/addDiscount',
        name: 'addDiscount',
        component: () => import('../views/discount/addDiscount.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cd_discount: true }],
        },
      },
      {
        path: '/discountsList',
        name: 'discountsList',
        component: () => import('../views/discount/discountsList.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cd_discount: true }, { r_discount: true }],
        },
      },
      // requested books
      {
        path: '/addRequestedBooks',
        name: 'addRequestedBooks',
        component: () => import('../views/requestBook/addRequestBook.vue'),
        meta: {
          requiresAuth: true,
          access: 'CLIENT',
          cRole: 'CLIENT',
        },
      },
      {
        path: '/requestedBooksList',
        name: 'requestedBooksList',
        component: () => import('../views/requestBook/requestedBooksList.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ r_requestedBook: true }],
          access: 'BOTH',
          cRole: 'CLIENT',
        },
      },
      {
        path: '/increaseCredit',
        name: 'increaseCredit',
        component: () => import('../views/credit/increaseCredit.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_credit: true }],
          access: 'BOTH',
          cRole: 'CLIENT',
        },
      },
      {
        path: '/creditList',
        name: 'creditList',
        component: () => import('../views/credit/creditList.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_credit: true }],
          access: 'BOTH',
          cRole: 'CLIENT',
        },
      },
      {
        path: '/postRequest',
        name: 'postRequest',
        component: () => import('../views/post/postRequest.vue'),
        meta: {
          requiresAuth: true,
          access: 'CLIENT',
          cRole: 'CLIENT',
        },
      },
      {
        path: '/postList',
        name: 'postList',
        component: () => import('../views/post/postList.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ r_post: true }],
          access: 'CLIENT',
          cRole: 'CLIENT',
        },
      },
      {
        path: '/addForbiddenBook',
        name: 'addForbiddenBook',
        component: () => import('../views/forbiddenBook/addForbiddenBook.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_forbiddenBook: true }],
        },
      },
      {
        path: '/forbiddenBookList',
        name: 'forbiddenBookList',
        component: () => import('../views/forbiddenBook/forbiddenBookList.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_forbiddenBook: true }, { d_forbiddenBook: true }],
        },
      },
      {
        path: '/logsList',
        name: 'logsList',
        component: () => import('../views/logs/logsList.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ r_log: true }],
        },
      },
      {
        path: '/addInvoice',
        name: 'addInvoice',
        component: () => import('../views/billing/addInvoice.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ c_invoice: true }],
        },
      },
      {
        path: '/invoicesList',
        name: 'invoicesList',
        component: () => import('../views/billing/invoicesList.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ c_invoice: true }, { r_invoice: true }],
          access: 'BOTH',
          cRole: 'CLIENT',
        },
      },
      {
        path: '/invoicesList/:invoiceId',
        name: 'invoice',
        component: () => import('../views/billing/invoice.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ c_invoice: true }, { r_invoice: true }],
          access: 'BOTH',
          cRole: 'CLIENT',
        },
      },
      {
        path: '/generalSettings',
        name: 'generalSettings',
        component: () => import('../views/general/settings.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ u_settings: true }],
        },
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
        meta: {
          requiresAuth: true,
          access: 'CLIENT',
          cRole: 'CLIENT',
        },
      },
      {
        path: '/tags',
        name: 'tags',
        component: () => import('../views/tags/tags.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ r_tag: true }, { cu_tag: true }, { d_tag: true }],
        },
      },
      {
        path: '/addAuthor',
        name: 'addAuthor',
        component: () => import('../views/author/addAuthor.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_author: true }],
        },
      },
      {
        path: '/authorsList',
        name: 'authorsList',
        component: () => import('../views/author/authorList.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_author: true }, { d_author: true }, { r_author: true }],
        },
      },
      {
        path: '/addPublisher',
        name: 'addPublisher',
        component: () => import('../views/publisher/addPublisher.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_publisher: true }],
        },
      },
      {
        path: '/publishersList',
        name: 'publishersList',
        component: () => import('../views/publisher/publishersList.vue'),
        meta: {
          requiresAuth: true,
          roles: [
            { cu_publisher: true },
            { d_publisher: true },
            { r_publisher: true },
          ],
        },
      },
      {
        path: '/ordersList',
        name: 'ordersList',
        component: () => import('../views/orders/ordersList.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ r_order: true }],
          access: 'BOTH',
          cRole: 'CLIENT',
        },
      },
      {
        path: '/ordersList/:orderId',
        name: 'orderPage',
        component: () => import('../views/orders/orderPage.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ r_order: true }],
          access: 'BOTH',
          cRole: 'CLIENT',
        },
      },
      {
        path: '/accessLevelCreation',
        name: 'accessLevelCreation',
        component: () => import('../views/accessLevel/accessLevelCreation.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_role: true }],
        },
      },
      {
        path: '/accessLevelList',
        name: 'accessLevelList',
        component: () => import('../views/accessLevel/accessLevelList.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_role: true }],
        },
      },
      {
        path: '/accessLevelList/:role',
        name: 'accessLevelPage',
        component: () => import('../views/accessLevel/accessLevel.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ cu_role: true }, { cu_staff: true }, { r_role: true }],
        },
      },
      {
        path: '/financialReport',
        name: 'financialReport',
        component: () => import('../views/billing/financialReport.vue'),
        meta: {
          requiresAuth: true,
          roles: [{ r_report: true }],
        },
      },
    ],
  },
];
export default routes;
