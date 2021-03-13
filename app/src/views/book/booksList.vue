<template>
  <div>
    <booksListCmp />
  </div>
</template>

<script>
import booksListCmp from '../../components/book/booksListCmp.vue';

export default {
  name: 'booksList',
  metaInfo: {
    title: 'لیست کتاب ها   ',
  },
  components: {
    booksListCmp,
  },
};
</script>
