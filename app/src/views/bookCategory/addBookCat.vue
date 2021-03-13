<template>
  <div>
    <addBookCategory :mode="'addPage'" />
  </div>
</template>

<script>
import addBookCategory from '../../components/bookCategory/addBookCategory.vue';

export default {
  name: 'addBookCat',
  metaInfo: {
    title: ' افزودن دسته بندی کتاب',
  },
  components: {
    addBookCategory,
  },
};
</script>
