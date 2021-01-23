<template>
  <div>
    <addBookCmp :mode="'add'" />
  </div>
</template>

<script>
import addBookCmp from '../../components/book/addBookCmp.vue';

export default {
  name: 'addBook',
  components: {
    addBookCmp,
  },
};
</script>
