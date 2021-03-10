<template>
  <v-card
    class="attachments pa-2 d-flex justify-space-between flex-column"
    width="160"
    height="125"
  >
    <img :src="data.fullViewUrl" />
    <!-- <v-icon color="grey " x-large class="d-flex">
      mdi-file-document
    </v-icon> -->
    <v-card-actions class="grey lighten-2">
      <v-spacer></v-spacer>
      <span>
        {{ data.name }}
      </span>
      <v-icon left color="primary" medium class="pointer">mdi-download </v-icon>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'filePreview',
  props: {
    data: {
      type: Object,
    },
  },
};
</script>
