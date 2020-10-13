<template>
  <v-snackbar
    v-model="activate"
    absolute
    top
    right
    app
    light
    color="success"
    elevation="24"
    @input="hideNotif"
  >
    <v-icon color="white"> mdi-check-circle-outline </v-icon>
    <span class="white--text">
      {{ $t(msg) }}
    </span>
  </v-snackbar>
</template>

<script>
export default {
  name: 'successNotif',
  props: {
    msg: {
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
