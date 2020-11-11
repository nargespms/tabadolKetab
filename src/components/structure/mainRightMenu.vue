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
      :prepend-icon="item.action"
      append-icon="fas fa-caret-down"
    >
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
