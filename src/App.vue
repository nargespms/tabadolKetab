<template>
  <v-app>
    <v-app-bar class="header" app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <h3>tabadol</h3>

      <router-link class="red" to="/">Home</router-link> |
      <router-link class="red" to="/login"> signin</router-link>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
.header {
  h3,
  a {
    color: red;
  }
  .red {
    color: red;
  }
}
</style>
