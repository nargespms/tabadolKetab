<template>
  <v-app>
    <div>
      <mainHeader @changeDraw="changeDraw" />
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

export default {
  name: 'App',
  components: {
    mainFooter,
    mainHeader,
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
  },
};
</script>

<style lang="scss"></style>
