<template>
  <addAuthorCmp />
</template>

<script>
import addAuthorCmp from '../../components/author/addAuthorCmp.vue';

export default {
  name: 'addAuthor',
  metaInfo: {
    title: 'افزودن مولف',
  },
  components: {
    addAuthorCmp,
  },
};
</script>
