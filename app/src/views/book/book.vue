<template>
  <addBookCmp :mode="'edit'" />
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
