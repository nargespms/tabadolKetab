<template>
  <div>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="changeDrawer"></v-app-bar-nav-icon>
      <h3>tabadol</h3>
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
    },
  },
};
</script>
