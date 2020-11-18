<template>
  <v-navigation-drawer
    v-model="localDrawer"
    app
    right
    color="blue-grey darken-4"
    class="mainRightMenuWrap"
    dark
    width="300"
  >
    <v-list color="teal">
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="fn18 pa-4">
              مدیر تبادل
            </v-list-item-title>
            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <!-- simple  -->
    <v-list-item
      v-for="item in simpleItems"
      :key="item.title"
      :to="item.link"
      exact
      active-class="teal--text text--lighten-2"
    >
      <v-list-item-icon>
        <v-icon>
          {{ item.action }}
        </v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>
          {{ $t(item.title) }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <!-- multiple  -->
    <v-list-group
      v-for="item in groupItems"
      :key="item.title"
      v-model="item.active"
      class="mt-2"
      no-action
      color="blue-grey lighten-3"
      append-icon="fas fa-caret-down"
    >
      <template v-slot:prependIcon>
        <v-badge
          v-if="item.badge"
          :content="item.badge"
          :color="item.badgeColor"
          overlap
        >
          <v-icon class="pl-3">
            {{ item.action }}
          </v-icon>
        </v-badge>
        <v-icon v-else class="pl-3">
          {{ item.action }}
        </v-icon>
      </template>

      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title
            class="font-weight-medium menuTitles fn15"
            v-text="$t(item.title)"
          ></v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item
        v-for="subItem in item.items"
        :key="subItem.title"
        :to="subItem.link"
        active-class="teal--text text--lighten-2"
        dark
      >
        <v-icon size="14" class="pl-3">
          {{ subItem.icon }}
        </v-icon>

        <v-list-item-content>
          <v-list-item-title
            class="pr3"
            v-text="$t(subItem.title)"
          ></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'mainRightMenu',
  props: ['state'],
  data() {
    return {
      localDrawer: this.state,
      simpleItems: [
        {
          title: 'Dashboard',
          action: 'mdi-view-dashboard',
          link: '/dashboard',
        },
      ],
      groupItems: [
        {
          action: 'mdi-account',
          title: 'Users',
          active: false,
          items: [
            { title: 'AddUser', link: '/users/addUser', icon: 'fas fa-plus' },
            {
              title: 'StaffsList',
              link: '/users/staffs',
              icon: 'fa fa-table',
            },
            {
              title: 'ClientsList',
              link: '/users/clients',
              icon: 'fa fa-table',
            },
          ],
        },
        {
          action: 'mdi-book-open-variant',
          title: 'book',
          active: false,
          items: [
            {
              title: 'addBook',
              link: '/addBook',
              icon: 'fas fa-plus',
            },
            {
              title: 'bookList',
              link: '/bookList',
              icon: 'fa fa-table',
            },
          ],
        },
        {
          action: 'mdi-card-account-details-outline',
          title: 'BookCategory',
          active: false,
          items: [
            {
              title: 'AddBookCategory',
              link: '/addBookCat',
              icon: 'fas fa-plus',
            },
            {
              title: 'BookCategoryList',
              link: '/bookCatList',
              icon: 'fa fa-table',
            },
          ],
        },
        {
          action: 'mdi-android-messages',
          title: 'messages',
          active: false,
          badge: '6',
          badgeColor: 'red',
          items: [
            {
              title: 'CreateMessage',
              link: '/createNewMsg',
              icon: 'fas fa-plus',
            },
            {
              title: 'MessagesList',
              link: '/messagesList',
              icon: 'fa fa-table',
            },
          ],
        },
        {
          action: 'mdi-ticket-account',
          title: 'tickets',
          active: false,
          badge: '1',
          badgeColor: 'red',
          items: [
            {
              title: 'AddTicket',
              link: '/createNewTicket',
              icon: 'fas fa-plus',
            },
            {
              title: 'TicketsList',
              link: '/ticketsList',
              icon: 'fa fa-table',
            },
          ],
        },
        {
          action: 'mdi-ticket-percent',
          title: 'discounts',
          active: false,
          items: [
            {
              title: 'addDiscount',
              link: '/addDiscount',
              icon: 'fas fa-plus',
            },
            {
              title: 'discountsList',
              link: '/discountsList',
              icon: 'fa fa-table',
            },
          ],
        },
        {
          action: 'mdi-book-open-page-variant',
          title: 'requestedBooks',
          active: false,
          badge: 2,
          badgeColor: 'green',
          items: [
            {
              title: 'addRequestedBooks',
              link: '/addRequestedBooks',
              icon: 'fas fa-plus',
            },
            {
              title: 'requestedBooksList',
              link: '/requestedBooksList',
              icon: 'fa fa-table',
            },
          ],
        },
        {
          action: 'mdi-credit-card-plus',
          title: 'credits',
          active: false,
          items: [
            {
              title: 'increaseCredit',
              link: '/increaseCredit',
              icon: 'fas fa-plus',
            },
            {
              title: 'creditList',
              link: '/creditList',
              icon: 'fas fa-table',
            },
          ],
        },
        {
          action: 'fas fa-motorcycle',
          title: 'post',
          active: false,
          items: [
            {
              title: 'postRequest',
              link: '/postRequest',
              icon: 'fas fa-plus',
            },
            {
              title: 'postList',
              link: '/postList',
              icon: 'fas fa-table',
            },
          ],
        },
        {
          action: 'fas fa-ban',
          title: 'forbiddenBook',
          active: false,
          items: [
            {
              title: 'addForbiddenBook',
              link: '/addForbiddenBook',
              icon: 'fas fa-plus',
            },
            {
              title: 'forbiddenBookList',
              link: '/forbiddenBookList',
              icon: 'fas fa-table',
            },
          ],
        },
        {
          action: 'mdi-history',
          title: 'logs',
          active: false,
          items: [
            {
              title: 'logsList',
              link: '/logsList',
              icon: 'fas fa-table',
            },
          ],
        },
        {
          action: 'fas fa-file-invoice-dollar',
          title: 'invoices',
          active: false,
          items: [
            {
              title: 'addInvoice',
              link: '/addInvoice',
              icon: 'fas fa-plus',
            },
            {
              title: 'invoicesList',
              link: '/invoicesList',
              icon: 'fas fa-table',
            },
          ],
        },
      ],
    };
  },
  watch: {
    state(newVal) {
      this.localDrawer = newVal;
    },
    localDrawer(newVal) {
      this.$emit('changeState', newVal);
    },
  },
};
</script>

<style lang="scss">
.fn15 {
  font-size: 15px !important;
}
</style>
