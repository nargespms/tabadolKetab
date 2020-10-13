<template>
  <v-card class="pa-4">
    <v-card-title class="headline text-center justify-space-around">
      <span class="text-center"> {{ $t(title) }} &nbsp; </span>
    </v-card-title>
    <v-card-text class="text-center">
      {{ $t(message) }}
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" outlined @click="accepted">
        {{ $t('accept') }}
      </v-btn>
      <v-btn color="red darken-3" outlined @click="rejected"
        >{{ $t('reject') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'promptDialog',
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
  },
  data() {
    return {
      dialog: true,
      item: this.data,
    };
  },
  methods: {
    accepted() {
      this.$emit('accept', this.item);
    },
    rejected() {
      this.$emit('reject', this.item);
    },
  },
  watch: {
    data(newVal) {
      this.item = newVal;
    },
  },
};
</script>
