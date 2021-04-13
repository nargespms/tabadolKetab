<template>
  <div>
    <bookSearchForm @searchBook="searchBook" />
    <booksSearchResults
      v-if="searchResult.length > 0"
      class="mt-6"
      :data="searchResult"
      :enableLoadingMore="enableLoadingMore"
      :loadingMore="loadingMore"
      :uploadMoreBut="uploadMoreBut"
      @getMoreData="getMoreData"
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
            <v-btn
              color="success"
              class="mr-4 px-8"
              @click="reqBook"
              v-if="
                this.$store.state.bookShop.userInfo
                  ? this.$store.state.bookShop.userInfo.role === 'CLIENT'
                  : false
              "
            >
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
import bookSearchForm from '../../components/search/bookSearchForm.vue';

export default {
  name: 'bookSearch',
  metaInfo: {
    title: 'جستجو کتاب',
  },
  components: {
    booksSearchResults,
    bookSearchForm,
  },
  data() {
    return {
      searchResult: [],
      uploadMoreBut: 'uploadeMore',
      loadingMore: false,
      enableLoadingMore: false,
      filter: {},
    };
  },
  methods: {
    reqBook() {
      this.$router.push({
        name: 'addRequestedBooks',
      });
    },
    searchBook(value) {
      // console.log(value);
      this.filter = value;
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/books', {
          params: { filter: value, limit: 8 },
        })
        .then(res => {
          if (res.status === 200) {
            this.searchResult = res.data.result.docs;
          }
        });
    },

    getMoreData() {
      this.loadingMore = true;
      this.enableLoadingMore = true;
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/books', {
          params: {
            ...this.filter,
            offset: this.searchResult.length,
            limit: 8,
          },
        })
        .then(res => {
          if (res.status === 200) {
            if (res.data.result.docs.length > 0) {
              this.searchResult.push(...res.data.result.docs);
              console.log(res.data.result.docs);
              console.log(this.searchResult);
              this.enableLoadingMore = false;
            } else {
              this.uploadMoreBut = 'endOfList';
              this.enableLoadingMore = true;
            }
            this.loadingMore = false;
          }
        });
    },
  },
  mounted() {
    this.searchBook();
  },
};
</script>
