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
        <div class=" pl-6 enterPannel" @click="exitPannel" v-else>
          <v-icon color="white">mdi-exit-to-app</v-icon>
          <span class="white--text">
            {{ $t('exit') }}
          </span>
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
</style>
