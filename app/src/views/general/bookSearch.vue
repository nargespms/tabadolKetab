<template>
  <div>
    <bookSearchForm @searchBook="searchBook" />
    <bookFilterSearch @filterSearch="filterSearch" class="mt-6" />
    <booksSearchResults
      v-if="searchResult.length > 0"
      :data="searchResult"
      class="mt-6"
    />
    <v-row no-gutters class="justify-center mt-6">
      <v-col cols="12" md="11">
        <v-card v-if="searchResult.length === 0">
          <div class="justify-center d-flex pa-5 flex-column  align-center">
            <p class="font-weight-black grey--text text--darken-2">
              <v-icon>
                mdi-database-search
              </v-icon>
              {{ $t('noResultsText') }}
            </p>
            <v-btn color="success" class="mr-4 px-8" @click="reqBook">
              {{ $t('addRequestedBooks') }}
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
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
    reqBook() {
      this.$router.push({
        name: 'addRequestedBooks',
      });
    },
    searchBook() {
      this.searchResult = [
        {
          id: 1,
          name: 'راز داوینچی',
          mainPrice: '۶۵۰۰۰',
          priceWithDiscount: '۶۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=19',
          barcode: '45678900',
        },
        {
          id: 2,
          name: ' جین ایر',
          mainPrice: '۴۰۰۰۰',
          priceWithDiscount: '۳۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=20',
          barcode: '45678900',
        },
        {
          id: 3,
          name: 'زنان کوچک ',
          mainPrice: '۵۰۰۰۰',
          priceWithDiscount: '۴۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=21',
          barcode: '45678900',
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
          barcode: '45678900',
        },
        {
          id: 6,
          name: 'عقل و احساس',
          mainPrice: '۴۰۰۰۰',
          priceWithDiscount: '۳۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=16',
          barcode: '45678900',
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
          barcode: '45678900',
        },
        {
          id: 6,
          name: 'عقل و احساس',
          mainPrice: '۴۰۰۰۰',
          priceWithDiscount: '۳۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=16',
          barcode: '45678900',
        },
        {
          id: 7,
          name: '۱۹۸۴',
          mainPrice: '۵۰۰۰۰',
          priceWithDiscount: '۴۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=17',
          barcode: '45678900',
        },
        {
          id: 8,
          name: 'مردی به نام اوه  ',
          mainPrice: '۶۵۰۰۰',
          image: 'https://picsum.photos/500/300?image=18',
          barcode: '45678900',
        },
        {
          id: 3,
          name: 'زنان کوچک ',
          mainPrice: '۵۰۰۰۰',
          priceWithDiscount: '۴۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=21',
          barcode: '45678900',
        },
        {
          id: 4,
          name: 'ملت عشق ',
          mainPrice: '۶۵۰۰۰',
          priceWithDiscount: '۶۰۰۰۰',
          image: 'https://picsum.photos/500/300?image=22',
          barcode: '45678900',
        },
      ];
    },
  },
};
</script>
