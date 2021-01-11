<template>
  <addForbiddenBookCmp :mode="'add'" />
</template>

<script>
import addForbiddenBookCmp from '../../components/forbiddenBook/addForbiddenBookCmp.vue';

export default {
  name: 'addForbiddenBook',
  components: {
    addForbiddenBookCmp,
  },
};
</script>
