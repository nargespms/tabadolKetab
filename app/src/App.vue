<template>
  <v-app>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      :duration="600"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  methods: {
    // refresh token
    refreshToken() {
      console.log('refresh token');
      this.$axios.get('/v1/api/tabaadol-e-ketaab/refresh-token').catch(e => {
        if (e.response.status === 403) {
          if (
            this.$store.state.bookShop.userInfo.role === 'CLIENT' ||
            this.$store.state.bookShop.userInfo === null
          ) {
            this.$router.push({
              name: 'login',
            });
          } else {
            this.$router.push({
              name: 'admin-login',
            });
          }

          this.$store.commit('bookShop/loggedIn', false, {
            module: 'bookShop',
          });
          this.$store.commit('bookShop/userEnter', null, {
            module: 'bookShop',
          });
        }
      });
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
  },
  //  refresh token
  created() {
    if (this.$store.state.bookShop.loggedIn) {
      this.refreshToken();
      this.timer = setInterval(this.refreshToken, 1800000);
    }
    console.log(process.env);
    console.log(process.env.NODE_ENV);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss">
@import '../node_modules/@aasaam/noto-font/dist/font-face.css';
@import '../node_modules/paper-css/paper.css';

$body-font-family: 'aasaam-Noto', sans-serif;

.v-application {
  font-family: $body-font-family;
  background: #fff !important;
}
button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-weight: normal;
}
.v-application .headline {
  font-family: $body-font-family !important;
  background: #fff !important;
}
a {
  text-decoration: none;
}
.sh-0 {
  box-shadow: none !important;
}
.fn13 {
  font-size: 13px;
}
.fn-25 {
  font-size: 25px;
}
.fn18 {
  font-size: 18px !important;
}
.fn12 {
  font-size: 12px !important;
}
.clear {
  overflow: auto;
}
.pointer {
  cursor: pointer;
}
.v-btn,
.v-tab {
  letter-spacing: 0 !important;
}
.numberDir {
  direction: ltr;
  float: left;
}
.v-snack__wrapper {
  position: fixed !important;
  left: 0 !important;
}
.v-pagination {
  display: flex !important;
  flex-wrap: wrap !important;
}
</style>
