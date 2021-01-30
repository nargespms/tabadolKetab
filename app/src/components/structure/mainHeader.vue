<template>
  <div>
    <div>
      <v-app-bar
        app
        color="grey darken-4"
        class="white--text justify-space-between navBar "
      >
        <div>
          <v-app-bar-nav-icon
            v-if="$route.name !== 'login' && $route.name !== 'signup'"
            class="white--text "
            @click="changeDrawer"
          ></v-app-bar-nav-icon>

          <span class="red--text text--darken-4"
            >{{ $t('changing') }} &nbsp;
          </span>

          <span class="white--text">{{ $t('book') }} &nbsp; </span>
        </div>
        <!-- <div v-if="$route.name !== 'login' || $route.name !== 'signup'">

        </div> -->
        <div
          class=" pl-6 enterPannel"
          @click="enterPannel"
          v-if="$route.name === 'login' || $route.name === 'signup'"
        >
          <v-icon color="white">mdi-account-key</v-icon>
          <span class="white--text">
            {{ $t('enter') }}
          </span>
        </div>
        <div class="pl-6 enterPannel d-flex" v-else>
          <div
            class="pl-3 shoppingBasket"
            @click="shoppingBag"
            v-if="$store.state.bookShop.userInfo.role === 'CLIENT'"
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
          <div @click="exitPannel" class="pr-4">
            <v-icon color="white">mdi-exit-to-app</v-icon>
            <span class="white--text">
              {{ $t('exit') }}
            </span>
          </div>
        </div>
      </v-app-bar>
    </div>

    <mainRightMenu
      v-if="
        $route.name !== 'login' &&
          $route.name !== 'signup' &&
          $route.name !== 'admin-login'
      "
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
      this.$axios.get('/v1/api/tabaadol-e-ketaab/log-out');
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
  },
  computed: {
    bagLength() {
      if (this.$store.state.bookShop.bag.length) {
        return this.$store.state.bookShop.bag.length;
      }
      return false;
    },
  },

  created() {
    this.timer2 = setInterval(this.getUnreadBookRequest, 300000);
    this.timer = setInterval(this.getUnreadTickets, 300000);
    this.timer3 = setInterval(this.getUnreadMessages, 300000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
    clearInterval(this.timer3);
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
