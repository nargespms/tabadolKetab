<template>
  <v-card
    class="pa-3 mb-6 min-360h"
    :style="
      $vuetify.breakpoint.lg
        ? 'width:80%;'
        : $vuetify.breakpoint.md
        ? 'width:60%;'
        : $vuetify.breakpoint.sm
        ? 'width:90%;'
        : 'width:100%;'
    "
  >
    <router-link :to="`/books/${book.id}`">
      <v-img
        :src="book.image"
        lazy-src="../../assets/tabadollogo1.png"
        :aspect-ratio="1"
        max-height="134"
        max-width="195"
        class="grey lighten-2 ma-auto bg-auto"
      >
      </v-img>
    </router-link>
    <div class="d-flex flex-column align-center">
      <router-link :to="`/books/${book.id}`" class="black--text">
        <p class="py-2 font-weight-medium text-center">{{ book.name }}</p>
        <p class="py-2 my-0 fn13 text-center" v-if="book.publisher">
          {{ $t('publisher') }} : {{ book.publisher.title }}
        </p>
        <p class="py-2 my-0 fn13 text-center" v-if="book.writer">
          {{ $t('writer') }} : {{ book.writer.title }}
        </p>
      </router-link>
      <p
        v-if="book.discount > 0"
        :class="
          book.afterDiscount ? 'text-decoration-line-through  grey--text' : ''
        "
      >
        {{ this.moneyFormat(book.afterDiscount) }} {{ $t('rial') }}
      </p>
      <p v-if="book.undergraduatePrice" class=" primary--text">
        {{ this.moneyFormat(book.undergraduatePrice) }} {{ $t('rial') }}
      </p>
      <v-btn
        color="blue lighten-1"
        class="px-6"
        :disabled="bought"
        @click="addToBag(book)"
      >
        <v-icon color="white">
          fas fa-shopping-cart
        </v-icon>
        <span class=" white--text">
          {{ $t('buy') }}
        </span>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'bookCard',
  props: {
    book: {
      type: Object,
    },
  },

  mixins: [moneyFormat],

  data() {
    return {
      bought: false,
    };
  },

  computed: {
    bag() {
      return this.$store.state.bookShop.bag;
    },
  },

  created() {
    const findingItem = this.bag.findIndex(book => book.id === this.book.id);
    if (findingItem !== -1) {
      this.bought = true;
    }
  },

  watch: {
    bag() {
      const findingItem = this.bag.findIndex(book => book.id === this.book.id);
      if (findingItem !== -1) {
        this.bought = true;
      }
    },
  },

  methods: {
    addToBag(book) {
      if (this.$store.state.bookShop.userInfo === null) {
        this.$store.commit('bookShop/addToBag', book, {
          module: 'bookShop',
        });
        // this.$emit('loginProblem');
      } else if (this.$store.state.bookShop.userInfo.role === 'CLIENT') {
        this.$store.commit('bookShop/addToBag', book, {
          module: 'bookShop',
        });
      } else {
        this.$emit('staffBuy');
      }
    },
  },
};
</script>

<style lang="scss">
.v-image__image--preload {
  filter: blur(1px);
}
.v-image__image--cover {
  background-size: auto !important;
}
</style>
