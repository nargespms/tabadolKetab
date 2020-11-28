<template>
  <div>
    <bookSearchForm @searchBook="searchBook" />
    <bookFilterSearch @filterSearch="filterSearch" class="mt-6" />
    <booksSearchResults
      v-if="searchResult.length > 0"
      :data="searchResult"
      class="mt-6"
    />
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
  data() {
    return {
      searchResult: [],
    };
  },
  methods: {
    searchBook() {
      this.searchResult = [
        {
          id: 1,
          name: 'راز داوینچی',
          mainPrice: '۶۵۰۰۰',
          priceWithDiscount: '۶۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=19',
        },
        {
          id: 2,
          name: ' جین ایر',
          mainPrice: '۴۰۰۰۰',
          priceWithDiscount: '۳۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=20',
        },
        {
          id: 3,
          name: 'زنان کوچک ',
          mainPrice: '۵۰۰۰۰',
          priceWithDiscount: '۴۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=21',
        },
        {
          id: 4,
          name: 'ملت عشق ',
          mainPrice: '۶۵۰۰۰',
          priceWithDiscount: '۶۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=22',
        },
        {
          id: 5,
          name: 'کیمیاگر ',
          mainPrice: '۶۵۰۰۰',
          priceWithDiscount: '۶۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=15',
        },
        {
          id: 6,
          name: 'عقل و احساس',
          mainPrice: '۴۰۰۰۰',
          priceWithDiscount: '۳۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=16',
        },
      ];
    },
    filterSearch() {
      this.searchResult = [
        {
          id: 5,
          name: 'کیمیاگر ',
          mainPrice: '۶۵۰۰۰',
          priceWithDiscount: '۶۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=15',
        },
        {
          id: 6,
          name: 'عقل و احساس',
          mainPrice: '۴۰۰۰۰',
          priceWithDiscount: '۳۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=16',
        },
        {
          id: 7,
          name: '۱۹۸۴',
          mainPrice: '۵۰۰۰۰',
          priceWithDiscount: '۴۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=17',
        },
        {
          id: 8,
          name: 'مردی به نام اوه  ',
          mainPrice: '۶۵۰۰۰',
          image: 'https://picsum.photos/500/300?image=18',
        },
        {
          id: 3,
          name: 'زنان کوچک ',
          mainPrice: '۵۰۰۰۰',
          priceWithDiscount: '۴۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=21',
        },
        {
          id: 4,
          name: 'ملت عشق ',
          mainPrice: '۶۵۰۰۰',
          priceWithDiscount: '۶۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=22',
        },
      ];
    },
  },
};
</script>
