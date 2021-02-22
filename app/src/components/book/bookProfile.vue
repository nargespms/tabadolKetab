<template>
  <div>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row v-if="!isLoading">
      <v-col cols="12" lg="3">
        <v-img
          :src="book.image"
          lazy-src="../../assets/tabadollogo1.png"
          :aspect-ratio="1"
          max-height="134"
          max-width="195"
          class="grey lighten-2 ma-auto"
        >
        </v-img>
      </v-col>
      <v-col cols="12" lg="8" class="pr-3">
        <p>
          <span class="font-weight-bold fn20">
            {{ book.name }}
          </span>
        </p>
        <p v-if="book.publisher || book.writer">
          <span v-if="book.publisher" class="primary--text">
            {{ book.publisher.title }}
          </span>
          -
          <span v-if="book.writer" class="primary--text">
            {{ book.writer.title }}
          </span>
        </p>
        <div>
          <p
            class="my-3 grey--text"
            :class="
              book.discount > 0
                ? 'text-decoration-line-through  grey--text'
                : ''
            "
          >
            <span v-if="book.undergraduatePrice">
              {{ $t('mainPrice') }} :
            </span>
            <span v-if="book.undergraduatePrice">
              {{ book.undergraduatePrice }} {{ $t('rial') }}
            </span>
          </p>
          <p v-if="book.discount > 0" class="bookDiscount">
            {{ $t('discountAmount') }}: {{ book.discount }}
          </p>
          <p v-if="book.afterDiscount">
            <span> {{ $t('finalTotalBuy') }}: </span>
            <span class="success--text">
              {{ book.afterDiscount }} {{ $t('rial') }}
            </span>
          </p>
        </div>
        <v-btn color="blue lighten-1" class="px-6 d-block" @click="addToBag">
          <v-icon color="white">
            fas fa-shopping-cart
          </v-icon>
          <span class=" white--text">
            {{ $t('addToBag') }}
          </span>
        </v-btn>
        <div class="pa-3 mt-4" v-if="book.summary">
          <span class="font-weight-bold my-3 d-block">
            {{ $t('bookSummary') }} :
          </span>
          <p>{{ book.summary }}</p>
        </div>
        <div class="detailsBook mt-4">
          <bookDetails :data="book" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import bookDetails from './bookDetails.vue';

export default {
  name: 'bookProfile',
  components: {
    bookDetails,
  },
  data() {
    return {
      book: {},
      isLoading: true,
    };
  },
  methods: {
    getData() {
      this.$axios
        .get(`/v1/api/tabaadol-e-ketaab/book/${this.$route.params.bookId}`)
        .then(res => {
          if (res.status === 200) {
            this.book = res.data;
            this.isLoading = false;
          }
        });
    },
    addToBag() {
      if (this.$store.state.bookShop.userInfo === null) {
        this.$emit('loginProblem');
      } else if (this.$store.state.bookShop.userInfo.role !== 'CLIENT') {
        this.$emit('staffBuy');
      } else if (this.$store.state.bookShop.userInfo.role === 'CLIENT') {
        this.$store.commit('bookShop/addToBag', this.book, {
          module: 'bookShop',
        });
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style lang="scss">
.bookDiscount {
  border: 1px solid red;
  color: red;
  padding: 2px;
}
.v-btn,
.v-tab {
  letter-spacing: inherit;
}
.v-image__image--preload {
  filter: blur(1px);
}
.v-image__image--cover {
  background-size: auto;
}
</style>
