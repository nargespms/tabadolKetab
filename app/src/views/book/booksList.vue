<template>
  <div>
    <booksListCmp />
  </div>
</template>

<script>
import booksListCmp from '../../components/book/booksListCmp.vue';

export default {
  name: 'booksList',
  components: {
    booksListCmp,
  },
};
</script>
