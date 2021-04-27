<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="12" md="8">
      <addBookCmp :mode="'edit'" />
    </v-col>
  </v-row>
</template>

<script>
import addBookCmp from '../../components/book/addBookCmp.vue';

export default {
  name: 'book',
  components: {
    addBookCmp,
  },
};
</script>
