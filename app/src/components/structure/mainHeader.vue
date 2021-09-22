<template>
  <div>
    <div>
      <v-app-bar
        app
        color="grey darken-4"
        class="white--text justify-space-between navBar"
      >
        <div>
          <v-app-bar-nav-icon
            v-if="$store.state.bookShop.loggedIn"
            class="white--text "
            @click="changeDrawer"
          ></v-app-bar-nav-icon>

          <span class="red--text text--darken-4 pa-3"
            >{{ $t('changing') }} &nbsp;
          </span>
        </div>

        <div class="pl-6 enterPannel d-flex">
          <div
            class="pl-3 shoppingBasket"
            @click="shoppingBag"
            v-if="
              !$store.state.bookShop.loggedIn ||
                ($store.state.bookShop.loggedIn &&
                  $store.state.bookShop.userInfo.role === 'CLIENT')
            "
          >
            <v-badge
              v-if="bagLength"
              :content="bagLength"
              color="red"
              bordered
              left
            >
              <v-icon color="white">fas fa-shopping-basket</v-icon>
            </v-badge>
            <v-icon v-if="!bagLength" color="white"
              >fas fa-shopping-basket</v-icon
            >

            <span class="white--text">
              {{ $t('shoppingBasket') }}
            </span>
          </div>

          <div
            @click="exitPannel"
            class="pr-4"
            v-if="$store.state.bookShop.loggedIn"
          >
            <v-icon color="white">mdi-exit-to-app</v-icon>
            <span class="white--text">
              {{ $t('exit') }}
            </span>
          </div>
          <div class="pr-6 enterPannel" @click="enterPannel" v-else>
            <v-icon color="white">mdi-account-key</v-icon>
            <span class="white--text">
              {{ $t('enter') }}
            </span>
          </div>
        </div>
      </v-app-bar>
    </div>
    <mainRightMenu
      v-if="this.$store.state.bookShop.loggedIn"
      :drawer="drawer"
      :state="drawer"
      @changeState="changeState"
      :unreadTickets="this.$store.state.bookShop.unreadTickets"
      :unreadBookRequest="this.$store.state.bookShop.unreadBookReq"
      :unreadMessages="this.$store.state.bookShop.unreadMessages"
      :key="menuKey"
    />
  </div>
</template>

<script>
import mainRightMenu from './mainRightMenu.vue';

export default {
  name: 'mainHeader',
  components: {
    mainRightMenu,
  },
  data() {
    return {
      drawer: true,
      menuKey: 0,
      emptyArray: [],
    };
  },
  methods: {
    shoppingBag() {
      this.$router.push({
        name: 'shoppingBag',
      });
    },
    changeDrawer() {
      this.drawer = !this.drawer;
      this.$emit('changeDraw', this.drawer);
    },
    changeState(value) {
      console.log(value);
      this.drawer = value;
    },
    enterPannel() {
      this.$router.push({
        name: 'login',
      });
    },
    exitPannel() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/log-out').then(res => {
        if (res.status === 204) {
          this.setStore();
        }
      });
    },
    setStore() {
      this.$store.commit('bookShop/userEnter', null, {
        module: 'bookShop',
      });
      this.$store.commit('bookShop/unreadBookReqCal', '', {
        module: 'bookShop',
      });
      this.$store.commit('bookShop/unreadTicketCal', '', {
        module: 'bookShop',
      });
      this.$store.commit('bookShop/unreadMessagesCal', '', {
        module: 'bookShop',
      });
      this.$store.commit('bookShop/loggedIn', false, {
        module: 'bookShop',
      });
      this.$store.commit('bookShop/clearBag', {
        module: 'bookShop',
      });
      this.changeRoute();
    },
    changeRoute() {
      this.$router.push({
        name: 'login',
      });
    },
    getUnreadTickets() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/unreadTickets').then(res => {
        this.$store.commit('bookShop/unreadTicketCal', res.data.toString(), {
          module: 'bookShop',
        });
        this.menuKey += 1;
      });
    },
    getUnreadMessages() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/unread-messages').then(res => {
        if (res.status === 200) {
          this.$store.commit(
            'bookShop/unreadMessagesCal',
            res.data.toString(),
            {
              module: 'bookShop',
            }
          );
          this.menuKey += 1;
        } else {
          this.$store.commit('bookShop/unreadMessagesCal', '', {
            module: 'bookShop',
          });
          this.menuKey += 1;
        }
      });
    },
    getUnreadBookRequest() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/unread-requested-book')
        .then(res => {
          this.$store.commit('bookShop/unreadBookReqCal', res.data.toString(), {
            module: 'bookShop',
          });
          this.menuKey += 1;
        });
    },

    getCreditAmount() {
      this.$axios.get(`/v1/api/tabaadol-e-ketaab/credit`).then(res => {
        if (res.status === 200) {
          this.$store.commit('bookShop/setClientCredit', res.data.credit, {
            module: 'bookShop',
          });
        }
      });
    },
  },
  computed: {
    bagLength() {
      if (this.$store.state.bookShop.bag) {
        return this.$store.state.bookShop.bag.length;
      }
      return false;
    },
  },

  created() {
    this.timer2 = setInterval(this.getUnreadBookRequest, 300000);
    this.timer = setInterval(this.getUnreadTickets, 300000);
    this.timer3 = setInterval(this.getUnreadMessages, 300000);
    this.timer4 = setInterval(this.getCreditAmount, 300000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
    clearInterval(this.timer3);
    clearInterval(this.timer4);
  },
};
</script>
<style lang="scss">
.enterPannel {
  cursor: pointer;
}
.navBar {
  .v-toolbar__content {
    justify-content: space-between;
  }
}
.shoppingBasket {
  border-left: 1px solid #888;
}
</style>
