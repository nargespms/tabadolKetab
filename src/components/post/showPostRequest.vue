<template>
  <v-row no-gutters class="justify-center ">
    <v-col cols="12" sm="6" md="8">
      <v-card class="pa-8">
        {{ item }}
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'showPostRequest',
  props: {
    item: {
      type: Object,
    },
  },
};
</script>
