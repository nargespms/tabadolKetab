<template>
  <div>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="changeDrawer"></v-app-bar-nav-icon>
      <h3>tabadol</h3>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'mainHeader',
  components: {},
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    changeDrawer() {
      this.drawer = !this.drawer;
      this.$emit('changeDraw', this.drawer);
    },
  },
};
</script>
