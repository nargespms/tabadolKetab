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
          <div class="pl-3 shoppingBasket" @click="shoppingBag">
            <v-badge
              v-if="bagLength"
              :content="bagLength"
              color="red"
              bordered
              left
            >
              <v-icon color="white">fas fa-shopping-basket</v-icon>
            </v-badge>
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
      v-if="$route.name !== 'login' && $route.name !== 'signup'"
      :drawer="drawer"
      :state="drawer"
      @changeState="changeState"
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
      this.$router.push({
        name: 'login',
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
