<template>
  <div>
    <addRequestBookCmp />
  </div>
</template>

<script>
import addRequestBookCmp from '../../components/requestedBook/addRequstedBookCmp.vue';

export default {
  name: 'addRequestBook',
  metaInfo: {
    title: 'افزودن کتاب درخواستی',
  },
  components: {
    addRequestBookCmp,
  },
};
</script>
