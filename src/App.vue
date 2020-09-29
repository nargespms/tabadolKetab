<template>
  <v-app>
    <div>
      <mainHeader @changeDraw="changeDraw" :drawer="drawer" />
      <mainRightMenu
        :drawer="drawer"
        :state="drawer"
        @changeState="changeState"
      />
    </div>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <mainFooter />
  </v-app>
</template>

<script>
import mainFooter from './components/structure/mainFooter.vue';
import mainHeader from './components/structure/mainHeader.vue';
import mainRightMenu from './components/structure/mainRightMenu.vue';

export default {
  name: 'App',
  components: {
    mainFooter,
    mainHeader,
    mainRightMenu,
  },
  data() {
    return {
      drawer: '', // Hide mobile side menu by default
    };
  },

  methods: {
    changeDraw(value) {
      this.drawer = value;
    },
    changeState(value) {
      this.drawer = value;
    },
  },
};
</script>

<style lang="scss"></style>
