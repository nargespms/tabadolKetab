<template>
  <v-navigation-drawer
    v-model="localDrawer"
    app
    right
    color="blue-grey darken-4"
    class="white--text mainRightMenuWrap"
  >
    <v-list class="mainRightMenuList">
      <div class="grey darken-4 white--text">
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item class="white--text" link>
          <v-list-item-content>
            <v-list-item-title class="title">
              John Leider
            </v-list-item-title>
            <v-list-item-subtitle class="white--text"
              >john@vuetifyjs.com</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </div>

      <v-list-item>
        <v-list-item-icon>
          <v-icon small>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-title>
          <router-link to="/">
            {{ $t('dashboard') }}
          </router-link>
        </v-list-item-title>
      </v-list-item>

      <v-list-group
        color="teal"
        :value="true"
        prepend-icon="mdi-account-circle"
        append-icon="fas fa-caret-down"
      >
        <template v-slot:activator>
          <v-list-item-title color="grey" class="grey--text" link>
            <router-link to="/users">
              {{ $t('users') }}
            </router-link>
          </v-list-item-title>
        </template>

        <v-list-group color="teal" :value="true" no-action sub-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="([title, icon], i) in admins" :key="i" link>
            <v-list-item-icon>
              <v-icon small v-text="icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-title v-text="title"></v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group color="teal" no-action sub-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Actions</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="([title, icon], i) in cruds" :key="i" link>
            <v-list-item-icon>
              <v-icon small v-text="icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="title"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'mainRightMenu',
  props: ['state'],
  data() {
    return {
      localDrawer: this.state,
      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
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
.mainRightMenuWrap {
  .v-list-item__title {
    color: #d5d5d5;
    a {
      color: #d5d5d5;
      display: block;
    }
  }
  .v-list {
    .v-icon {
      color: #d5d5d5;
    }
  }
  .v-list-item--active {
    background-color: teal;
    color: white;
    .v-list-item__title {
      color: #fff !important;
    }
    .v-icon {
      color: #fff !important;
    }
  }
}
.mainRightMenuList {
  padding: 0 !important;
}
</style>
