<template>
  <v-navigation-drawer v-model="localDrawer" app right>
    <div class="navigationBg flex">
      <v-list-item-avatar color="primary"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle>member</v-list-item-subtitle>
      </v-list-item-content>
    </div>
    <v-list dense>
      <v-list-item link>
        <router-link class="flex black--text" to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </router-link>
      </v-list-item>

      <v-list-item link>
        <router-link class="flex black--text" to="/login">
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </router-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'mainRightMenu',
  props: ['state'],
  data() {
    return { localDrawer: this.state };
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
