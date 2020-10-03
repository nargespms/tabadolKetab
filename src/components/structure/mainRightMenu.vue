<template>
  <v-navigation-drawer
    v-model="localDrawer"
    app
    right
    color="blue-grey darken-4"
    class=" mainRightMenuWrap"
  >
    <!-- simple  -->
    <v-list-item
      v-for="item in simpleItems"
      :key="item.title"
      :to="item.link"
      exact
      active-class="teal--text text--lighten-2"
      color="white"
    >
      <v-list-item-icon>
        <v-icon>
          {{ item.action }}
        </v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <!-- multiple  -->
    <v-list-group
      v-for="item in groupItems"
      :key="item.title"
      v-model="item.active"
      class="mt-2 white--text"
      :prepend-icon="item.action"
      no-action
      color="blue-grey lighten-3"
    >
      <template v-slot:activator>
        <v-list-item-content class=" white--text">
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item
        v-for="subItem in item.items"
        :key="subItem.title"
        :to="subItem.link"
        active-class="teal--text text--lighten-2"
        color="white"
      >
        <v-list-item-content>
          <v-list-item-title v-text="subItem.title"></v-list-item-title>
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
            { title: 'Add User', link: '/users/form/' },
            { title: 'User List', link: '/users/list' },
          ],
        },
        {
          action: 'mdi-card-account-details-outline',
          title: 'Card',
          active: false,
          items: [
            { title: 'Add Card', link: '/card/add/' },
            { title: 'Allocate Card', link: '/card/allocate' },
            { title: 'Card List', link: '/card/list' },
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

<style lang="scss"></style>
