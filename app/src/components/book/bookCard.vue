<template>
  <v-card
    class="pa-3 mb-6 min-330h"
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
    <v-img
      :src="book.image"
      :lazy-src="book.image"
      :aspect-ratio="1"
      max-height="134"
      max-width="195"
      class="grey lighten-2 ma-auto"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <div class="d-flex flex-column align-center">
      <p class="py-2 font-weight-medium">{{ book.name }}</p>
      <p
        v-if="book.discount > 0"
        :class="
          book.afterDiscount ? 'text-decoration-line-through  grey--text' : ''
        "
      >
        {{ book.afterDiscount }} {{ $t('rial') }}
      </p>
      <p v-if="book.undergraduatePrice" class=" primary--text">
        {{ book.undergraduatePrice }} {{ $t('rial') }}
      </p>
      <v-btn
        color="blue lighten-1"
        class="px-6"
        absolute
        bottom
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
export default {
  name: 'bookCard',
  props: {
    book: {
      type: Object,
    },
  },

  methods: {
    addToBag(book) {
      if (this.$store.state.bookShop.userInfo === null) {
        console.log('inji');
        this.$emit('loginProblem');
      } else if (this.$store.state.bookShop.userInfo.role !== 'CLIENT') {
        this.$emit('staffBuy');
      } else if (this.$store.state.bookShop.userInfo.role === 'CLIENT') {
        this.$store.commit('bookShop/addToBag', book, {
          module: 'bookShop',
        });
      }
    },
  },
};
</script>
