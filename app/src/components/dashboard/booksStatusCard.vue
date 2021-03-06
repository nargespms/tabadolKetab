<template>
  <div>
    <v-row>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'totalBookNumber'"
          :number="books.total"
          :color="color"
          :link="'/booksList'"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'confirmedBooksNumber'"
          :number="books.confirmedBooks"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'unconfirmedBooksNumber'"
          :number="books.unconfirmedBooks"
          :color="color"
          :link="'/booksList?filter[status]=CLIENTREGISTER'"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'todayRegisteredBookNumber'"
          :number="books.todayRegistered"
          :color="color"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'todayconfirmedBookNumber'"
          :number="books.todayConfirmed"
          :color="color"
          :link="`/booksList?filter[confirmDate]=${this.today}`"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'soldBooksNumber'"
          :number="books.soldBooks"
          :color="color"
          :link="'booksList?filter[status]=SOLD'"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'todaySoldBooksNumber'"
          :number="books.todaySoldBooks"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'requestedBooksNumber'"
          :number="books.requestedBooks"
          :color="color"
          :link="'/requestedBooksList'"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import statusCard from './statusCard.vue';

export default {
  name: 'bookStatusCard',
  components: {
    statusCard,
  },
  data() {
    return {
      color: '#546E7A',
      books: {
        total: 0,
        confirmedBooks: 0,
        unconfirmedBooks: 0,
        todayRegistered: 0,
        todayConfirmed: 0,
        soldBooks: 0,
        todaySoldBooks: 0,
        requestedBooks: 0,
      },
      isLoading: true,
    };
  },
  methods: {
    getTotalBooksNum() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/report/books').then(res => {
        if (res.status === 200) {
          this.books.total = res.data.count;
        }
      });
    },
    getConfirmedBooksNum() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/books', {
          params: {
            filter: {
              confirmed: true,
            },
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.books.confirmedBooks = res.data.count;
          }
        });
    },
    getUnconfirmedBooksNum() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/books', {
          params: {
            filter: {
              status: 'CLIENTREGISTER',
            },
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.books.unconfirmedBooks = res.data.count;
          }
        });
    },
    getTodayRegisterBooksNum() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/books', {
          params: {
            filter: {
              clientRegisterDate: new Date(),
            },
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.books.todayRegistered = res.data.count;
          }
        });
    },
    getTodayConfirmedBooksNum() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/books', {
          params: {
            filter: {
              confirmDate: new Date(),
            },
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.books.todayConfirmed = res.data.count;
          }
        });
    },
    getSoldBooksNum() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/books', {
          params: {
            filter: {
              status: 'SOLD',
            },
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.books.soldBooks = res.data.count;
          }
        });
    },
    getTodaySoldBooksNum() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/books', {
          params: {
            filter: {
              soldDate: new Date(),
            },
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.books.todaySoldBooks = res.data.count;
          }
        });
    },
    getRequestedBooksNum() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/requested-books')
        .then(res => {
          if (res.status === 200) {
            this.books.requestedBooks = res.data.count;
          }
        });
    },
  },
  computed: {
    today() {
      return new Date().toISOString();
    },
  },
  mounted() {
    this.getTotalBooksNum();
    this.getConfirmedBooksNum();
    this.getUnconfirmedBooksNum();
    this.getTodayRegisterBooksNum();
    this.getTodayConfirmedBooksNum();
    this.getSoldBooksNum();
    this.getTodaySoldBooksNum();
    this.getRequestedBooksNum();
  },
};
</script>
