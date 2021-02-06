<template>
  <v-row no-gutters class="justify-center ">
    <v-col cols="12" sm="6" md="8">
      <v-card color="white" class="pa-8 ma-auto" width="80%">
        <v-toolbar color="light-blue darken-1" flat height="32"> </v-toolbar>
        <v-card-title class="text-center justify-space-between">
          <span>
            {{ $t('bookName') }} :
            {{ book.title }}
          </span>
          <span>
            {{ new Date(book.createdAt).toLocaleDateString('fa') }}
            <v-icon color="red">
              mdi-clock
            </v-icon>
          </span>
        </v-card-title>
        <v-card-subtitle>
          <span v-if="book.shabak">
            {{ $t('shabak') }} : {{ book.shabak }}
          </span>
          <span v-if="book.publisher">
            {{ $t('publisher') }} : {{ book.publisher }}
          </span>
          <span v-if="book.searcher">
            {{ $t('searcher') }} : {{ book.searcher }}
          </span>
          <span v-if="book.author">
            {{ $t('author') }} : {{ book.author }}
          </span>
          <span v-if="book.author">
            {{ $t('author') }} : {{ book.author }}
          </span>
        </v-card-subtitle>
        {{ book }}
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'showRequestedBook',
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      book: {},
    };
  },
  methods: {
    getBookData() {
      this.$axios
        .get(`/v1/api/tabaadol-e-ketaab/requested-book/${this.id}`)
        .then(res => {
          if (res.status === 200) {
            this.book = res.data;
          }
        });
    },
  },
  watch: {
    id(newVal) {
      if (newVal) {
        this.getBookData();
      }
    },
  },
  mounted() {
    this.getBookData();
  },
};
</script>
