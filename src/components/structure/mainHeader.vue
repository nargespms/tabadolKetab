<template>
  <div>
    <v-app-bar app color="grey darken-4" class="white--text">
      <v-app-bar-nav-icon
        class="white--text"
        @click="changeDrawer"
      ></v-app-bar-nav-icon>

      <span class="red--text text--darken-4">{{ $t('changing') }} &nbsp; </span>

      <span class="white--text">{{ $t('book') }} &nbsp; </span>
    </v-app-bar>
    <mainRightMenu
      :drawer="drawer"
      :state="drawer"
      @changeState="changeState"
    />
  </div>
</template>

<script>
import mainRightMenu from '../structure/mainRightMenu.vue';

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
  },
};
</script>
