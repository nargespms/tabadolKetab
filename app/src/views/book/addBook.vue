<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="12" xl="9" lg="10" md="11">
      <addBookCmp :mode="'add'" />
    </v-col>
  </v-row>
</template>

<script>
import addBookCmp from '../../components/book/addBookCmp.vue';

export default {
  name: 'addBook',
  metaInfo: {
    title: 'افزودن کتاب',
  },
  components: {
    addBookCmp,
  },
};
</script>
