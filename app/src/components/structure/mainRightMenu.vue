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
    <template v-slot:prepend>
      <v-list color="teal">
        <v-list-item class="px-2">
          <v-list-item
            link
            :to="`/users/profile/${$store.state.bookShop.userInfo.id}`"
          >
            <v-list-item-content>
              <v-list-item-title class="fn18 my-5">
                {{ $store.state.bookShop.userInfo.firstName }}
                {{ $store.state.bookShop.userInfo.lastName }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <span
                  class="my-2"
                  v-if="$store.state.bookShop.userInfo.role === 'CLIENT'"
                >
                  {{ $t('creditAmount') }} &nbsp;: &nbsp;{{
                    moneyFormat(credit)
                  }}
                  &nbsp;{{ $t('rial') }}
                </span>
                <span class="my-2" v-else>
                  {{ $store.state.bookShop.userInfo.email }}
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item>
      </v-list>
    </template>
    <v-divider></v-divider>

    <!-- simple  -->
    <template v-for="item in simpleItems">
      <v-list-item
        v-if="item.condition === true"
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
    </template>
    <!-- multiple  -->
    <template v-for="item in groupItems">
      <v-list-group
        v-if="item.condition === true"
        :key="item.title"
        v-model="item.active"
        class="mt-2"
        no-action
        color="blue-grey lighten-3"
        append-icon="fas fa-caret-down"
      >
        <template v-slot:prependIcon>
          <!-- {{ unreadBookRequest }} -->
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

        <template v-for="subItem in item.items">
          <v-list-item
            v-if="subItem.condition === true"
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
        </template>
      </v-list-group>
    </template>
  </v-navigation-drawer>
</template>

<script>
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'mainRightMenu',
  mixins: [moneyFormat],
  props: {
    state: {
      type: Boolean,
    },
    unreadTickets: {
      type: String,
    },
    unreadBookRequest: {
      type: String,
    },
    unreadMessages: {
      type: String,
    },
  },
  methods: {
    getCreditAmount() {
      this.$axios.get(`/v1/api/tabaadol-e-ketaab/credit`).then(res => {
        if (res.status === 200) {
          this.credit = res.data.credit;
        }
      });
    },
  },
  data() {
    return {
      credit: 0,
      localDrawer: this.state,
      simpleItems: [
        {
          title: 'Dashboard',
          action: 'mdi-view-dashboard',
          link: '/dashboard',
          condition: this.$store.state.bookShop.userInfo.role.r_report === true,
        },
        {
          title: 'bookSearch',
          action: 'mdi-magnify',
          link: '/bookSearch',
          condition: true,
        },
      ],
      groupItems: [
        {
          action: 'mdi-account',
          title: 'Users',
          active: false,
          condition:
            this.$store.state.bookShop.userInfo.role !== 'CLIENT' &&
            (this.$store.state.bookShop.userInfo.role.cu_client === true ||
              this.$store.state.bookShop.userInfo.role.cu_staff === true),
          items: [
            {
              title: 'AddUser',
              link: '/users/addUser',
              icon: 'fas fa-plus',
              condition:
                this.$store.state.bookShop.userInfo.role.cu_staff === true ||
                this.$store.state.bookShop.userInfo.role.cu_client === true,
            },
            {
              title: 'StaffsList',
              link: '/users/staffs',
              icon: 'fa fa-table',
              condition:
                this.$store.state.bookShop.userInfo.role.cu_staff === true,
            },
            {
              title: 'ClientsList',
              link: '/users/clients',
              icon: 'fa fa-table',
              condition: true,
            },
            {
              title: 'roleCreation',
              link: '/accessLevelCreation',
              icon: 'fas fa-user-cog',
              condition:
                this.$store.state.bookShop.userInfo.role.cu_role === true,
            },
            {
              title: 'roleList',
              link: '/accessLevelList',
              icon: 'mdi-account-group',
              condition:
                this.$store.state.bookShop.userInfo.role.cu_role === true,
            },
          ],
        },
        {
          action: 'mdi-book-open-variant',
          title: 'book',
          active: false,
          condition: true,
          items: [
            {
              title: 'addBook',
              link: '/addBook',
              icon: 'fas fa-plus',
              condition: true,
            },
            {
              title: 'booksList',
              link: '/booksList',
              icon: 'fa fa-table',
              condition: true,
            },
          ],
        },
        {
          action: 'fas fa-object-group',
          title: 'BookCategory',
          active: false,
          condition:
            this.$store.state.bookShop.userInfo.role.cu_category === true,
          items: [
            {
              title: 'AddBookCategory',
              link: '/addBookCat',
              icon: 'fas fa-plus',
              condition: true,
            },
            {
              title: 'BookCategoryList',
              link: '/bookCatList',
              icon: 'fa fa-table',
              condition: true,
            },
          ],
        },
        {
          action: 'mdi-account-group',
          title: 'authors',
          active: false,
          condition:
            this.$store.state.bookShop.userInfo.role.cu_author === true,
          items: [
            {
              title: 'addAuthor',
              link: '/addAuthor',
              icon: 'mdi-account-edit',
              condition: true,
            },
            {
              title: 'authorsList',
              link: '/authorsList',
              icon: 'fas fa-table',
              condition: true,
            },
          ],
        },
        {
          action: 'fas fa-building ',
          title: 'publishers',
          active: false,
          condition:
            this.$store.state.bookShop.userInfo.role.cu_publisher === true,
          items: [
            {
              title: 'addPublisher',
              link: '/addPublisher',
              icon: 'mdi-account-edit',
              condition: true,
            },
            {
              title: 'publishersList',
              link: '/publishersList',
              icon: 'fas fa-table',
              condition: true,
            },
          ],
        },
        {
          action: 'mdi-android-messages',
          title: 'messages',
          active: false,
          condition:
            this.$store.state.bookShop.userInfo.role.cu_message === true,
          badge: this.unreadMessages !== '0' ? this.unreadMessages : '',
          badgeColor: 'red',
          items: [
            {
              title: 'CreateMessage',
              link: '/createNewMsg',
              icon: 'fas fa-plus',
              condition:
                this.$store.state.bookShop.userInfo.role.cu_message === true,
            },
            {
              title: 'MessagesList',
              link: '/messagesList',
              icon: 'fa fa-table',
              condition: true,
            },
          ],
        },
        {
          action: 'mdi-ticket-account',
          title: 'tickets',
          active: false,
          badge: this.unreadTickets !== '0' ? this.unreadTickets : '',
          badgeColor: 'red',
          condition:
            this.$store.state.bookShop.userInfo.role.cu_ticket === true ||
            this.$store.state.bookShop.userInfo.role === 'CLIENT',
          items: [
            {
              title: 'AddTicket',
              link: '/createNewTicket',
              icon: 'fas fa-plus',
              condition: true,
            },
            {
              title: 'TicketsList',
              link: '/ticketsList',
              icon: 'fa fa-table',
              condition: true,
            },
          ],
        },
        {
          action: 'mdi-ticket-percent',
          title: 'discounts',
          active: false,
          condition:
            this.$store.state.bookShop.userInfo.role.cd_discount === true,
          items: [
            {
              title: 'addDiscount',
              link: '/addDiscount',
              icon: 'fas fa-plus',
              condition: true,
            },
            {
              title: 'categoryDiscountsList',
              link: '/discountsList',
              icon: 'fa fa-table',
              condition: true,
            },
            {
              title: 'couponDiscountsList',
              link: '/couponList',
              icon: 'fa fa-table',
              condition: true,
            },
          ],
        },
        {
          action: 'fas fa-cart-arrow-down',
          title: 'orders',
          active: false,
          condition:
            this.$store.state.bookShop.userInfo.role === 'CLIENT' ||
            this.$store.state.bookShop.userInfo.role.r_order === true,
          items: [
            {
              title: 'ordersList',
              link: '/ordersList',
              icon: 'fa fa-table',
              condition:
                this.$store.state.bookShop.userInfo.role === 'CLIENT' ||
                this.$store.state.bookShop.userInfo.role.r_order === true,
            },
          ],
        },
        {
          action: 'mdi-book-open-page-variant',
          title: 'requestedBooks',
          active: false,
          badge: this.unreadBookRequest !== '0' ? this.unreadBookRequest : '',
          badgeColor: 'green',
          condition:
            this.$store.state.bookShop.userInfo.role === 'CLIENT' ||
            this.$store.state.bookShop.userInfo.role.r_requestedBook === true,

          items: [
            {
              title: 'addRequestedBooks',
              link: '/addRequestedBooks',
              icon: 'fas fa-plus',
              condition: this.$store.state.bookShop.userInfo.role === 'CLIENT',
            },
            {
              title: 'requestedBooksList',
              link: '/requestedBooksList',
              icon: 'fa fa-table',
              condition: true,
            },
          ],
        },
        {
          action: 'fas fa-ban',
          title: 'forbiddenBook',
          active: false,
          condition:
            this.$store.state.bookShop.userInfo.role.cu_forbiddenBook === true,
          items: [
            {
              title: 'addForbiddenBook',
              link: '/addForbiddenBook',
              icon: 'fas fa-plus',
              condition: true,
            },
            {
              title: 'forbiddenBookList',
              link: '/forbiddenBookList',
              icon: 'fas fa-table',
              condition: true,
            },
          ],
        },
        {
          action: 'fas fa-motorcycle',
          title: 'post',
          active: false,
          condition:
            this.$store.state.bookShop.userInfo.role === 'CLIENT' ||
            this.$store.state.bookShop.userInfo.role.r_post === true,
          items: [
            {
              title: 'postRequest',
              link: '/postRequest',
              icon: 'fas fa-plus',
              condition: this.$store.state.bookShop.userInfo.role === 'CLIENT',
            },
            {
              title: 'postList',
              link: '/postList',
              icon: 'fas fa-table',
              condition:
                this.$store.state.bookShop.userInfo.role === 'CLIENT' ||
                this.$store.state.bookShop.userInfo.role.r_post === true,
            },
          ],
        },
        // {
        //   action: 'fas fa-users-cog',
        //   title: 'accessLevel',
        //   active: false,
        //   condition: this.$store.state.bookShop.userInfo.role.cu_role === true,
        //   items: [
        //     {
        //       title: 'roleCreation',
        //       link: '/accessLevelCreation',
        //       icon: 'fas fa-user-cog',
        //     },
        //     {
        //       title: 'roleList',
        //       link: '/accessLevelList',
        //       icon: 'fas fa-table',
        //     },
        //   ],
        // },

        {
          action: 'mdi-credit-card-plus',
          title: 'credits',
          active: false,
          condition:
            this.$store.state.bookShop.userInfo.role === 'CLIENT' ||
            this.$store.state.bookShop.userInfo.role.cu_credit === true,
          items: [
            {
              title: 'increaseCredit',
              link: '/increaseCredit',
              icon: 'fas fa-plus',
              condition: true,
            },
            {
              title: 'transactionsList',
              link: '/creditList',
              icon: 'fas fa-table',
              condition: true,
            },
          ],
        },
        {
          action: 'fas fa-file-invoice-dollar',
          title: 'invoices',
          active: false,
          condition:
            this.$store.state.bookShop.userInfo.role === 'CLIENT' ||
            this.$store.state.bookShop.userInfo.role.c_invoice === true ||
            this.$store.state.bookShop.userInfo.role.r_invoice === true,
          items: [
            {
              title: 'addInvoice',
              link: '/addInvoice',
              icon: 'fas fa-plus',
              condition: this.$store.state.bookShop.userInfo.role !== 'CLIENT',
            },
            {
              title: 'invoicesList',
              link: '/invoicesList',
              icon: 'fas fa-table',
              condition: true,
            },
          ],
        },
        {
          action: 'mdi-cash-multiple',
          title: 'trades',
          active: false,
          condition:
            this.$store.state.bookShop.userInfo.role.r_invoices === true ||
            this.$store.state.bookShop.userInfo.role === 'CLIENT',
          items: [
            {
              title: 'tradesList',
              link: '/tradesList',
              icon: 'fas fa-table',
              condition: true,
            },
          ],
        },

        {
          action: 'fas fa-tags',
          title: 'tags',
          active: false,
          condition: this.$store.state.bookShop.userInfo.role.cu_tag === true,
          items: [
            {
              title: 'addANDlistTAGS',
              link: '/tags',
              icon: 'fas fa-tag',
              condition: true,
            },
          ],
        },
        {
          action: 'mdi-history',
          title: 'logs',
          active: false,
          condition: this.$store.state.bookShop.userInfo.role.r_log === true,
          items: [
            {
              title: 'logsList',
              link: '/logsList',
              icon: 'fas fa-table',
              condition: true,
            },
          ],
        },
        {
          action: 'fas fa-cogs',
          title: 'settings',
          active: false,
          condition:
            this.$store.state.bookShop.userInfo.role.ur_setting === true,
          items: [
            {
              title: 'generalSettings',
              link: '/generalSettings',
              icon: 'fas fa-cog',
              condition: true,
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
    unreadTickets(newVal) {
      this.unreadTickets = newVal;
    },
    unreadBookRequest(newVal) {
      this.unreadBookRequest = newVal;
    },
    unreadMessages(newVal) {
      this.unreadMessages = newVal;
    },
  },
  mounted() {
    if (this.$store.state.bookShop.userInfo.role === 'CLIENT') {
      this.getCreditAmount();
    }
  },
};
</script>

<style lang="scss">
.fn15 {
  font-size: 15px !important;
}
</style>
