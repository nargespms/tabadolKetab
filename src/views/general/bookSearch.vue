<template>
  <div>
    <bookSearchForm />
    <bookFilterSearch class="mt-6" />
    <booksSearchResults />
  </div>
</template>

<script>
import booksSearchResults from '../../components/search/booksSearchResults.vue';
import bookFilterSearch from '../../components/search/bookFilterSearch.vue';
import bookSearchForm from '../../components/search/bookSearchForm.vue';

export default {
  name: 'bookSearch',
  components: {
    booksSearchResults,
    bookSearchForm,
    bookFilterSearch,
  },
};
</script>
