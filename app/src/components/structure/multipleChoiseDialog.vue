<template>
  <v-card class="pa-4">
    <v-card-title class="headline text-center justify-space-around">
      <span class="text-center"> {{ $t(title) }} &nbsp; </span>
    </v-card-title>
    <v-card-text class="text-center">
      {{ $t(message) }}
    </v-card-text>
    <v-card-actions class="d-flex justify-center flex-wrap">
      <template v-for="but in buttons">
        <v-btn
          :color="but.color"
          class="mb-3"
          :key="but.name"
          outlined
          @click="changeStatus(but.name)"
        >
          {{ $t(but.name) }}
        </v-btn>
      </template>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'multipleChoiseDialog',
  props: {
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    data: {
      type: Object,
    },
    buttons: {
      type: Array,
    },
  },
  methods: {
    changeStatus(status) {
      this.$emit('changeStatus', status);
    },
  },
};
</script>
