<template>
  <v-snackbar
    v-model="activate"
    absolute
    top
    right
    app
    light
    :color="type === 'success' ? 'success' : 'error'"
    elevation="24"
    @input="hideNotif"
  >
    <v-icon v-if="type === 'success'" color="white">
      mdi-check-circle-outline
    </v-icon>
    <v-icon v-if="type === 'error'" color="white">
      fas fa-exclamation-triangle
    </v-icon>
    <span class="white--text">
      {{ $t(msg) }}
    </span>
  </v-snackbar>
</template>

<script>
export default {
  name: 'notifMessage',
  props: {
    msg: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  data() {
    return {
      activate: true,
    };
  },
  methods: {
    hideNotif() {
      this.$emit('hideNotif');
    },
  },
};
</script>
