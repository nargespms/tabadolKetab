<template>
  <div>
    <v-row>
      <v-col cols="12" lg="4">
        <creditStatusCard
          :lable="'existedBooksCredit'"
          :number="billing.booksValue"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="4">
        <creditStatusCard
          :lable="'usersCreditSum'"
          :number="billing.usersCredit"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="4">
        <creditStatusCard
          :lable="'sumOfWage'"
          :number="billing.sumOfWage"
          :color="color"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4">
        <creditStatusCard
          :lable="'sumOfWageToday'"
          :number="billing.sumOfWageToday"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="4">
        <creditStatusCard
          :lable="'usersCreditSumFromboooksTrade'"
          :number="billing.usersCreditSumFromboooksTrade"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="4">
        <creditStatusCard
          :lable="'usersCreditSumCache'"
          :number="billing.totalDeposit"
          :color="color"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="4">
        <creditStatusCard
          :lable="'totalBuyToday'"
          :number="billing.totalBuy"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="4">
        <creditStatusCard
          :lable="'todayOnlineShop'"
          :number="billing.todayOnlineShop"
          :color="color"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import creditStatusCard from './creditStatusCard.vue';

export default {
  name: 'billingStatusCard',
  components: {
    creditStatusCard,
  },
  data() {
    return {
      color: '',
      billing: {
        booksValue: 0,
        usersCreditSumFromboooksTrade: 0,
        sumOfWage: 0,
        sumOfWageToday: 0,
        todayOnlineShop: 0,

        totalDeposit: 0,
        totalBuy: 0,
      },
    };
  },
  methods: {
    getBooksValue() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/books-value')
        .then(res => {
          if (res.status === 200) {
            this.billing.booksValue = res.data.sum;
          }
        });
    },
    usersCredit() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/clients-credit')
        .then(res => {
          if (res.status === 200) {
            this.billing.usersCredit = res.data.sum;
          }
        });
    },
    todayOnline() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/online-buy', {
          params: {
            filter: {
              createdAt: new Date(),
            },
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.billing.todayOnlineShop = res.data.sum;
          }
        });
    },
    sumOfWage() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/report/wage').then(res => {
        if (res.status === 200) {
          this.billing.sumOfWage = res.data.sum;
        }
      });
    },
    sumOfWageToday() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/wage', {
          params: {
            filter: {
              createdAt: new Date(),
            },
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.billing.sumOfWageToday = res.data.sum;
          }
        });
    },
    usersCreditSumFromboooksTrade() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/sell-credit')
        .then(res => {
          if (res.status === 200) {
            this.billing.usersCreditSumFromboooksTrade = res.data.sum;
          }
        });
    },
    totalDeposit() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/total-deposit')
        .then(res => {
          if (res.status === 200) {
            this.billing.totalDeposit = res.data.sum;
          }
        });
    },
    totalBuy() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/total-buy', {
          params: {
            filter: {
              createdAt: new Date(),
            },
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.billing.totalBuy = res.data.sum;
          }
        });
    },
  },
  mounted() {
    this.getBooksValue();
    this.usersCredit();
    this.todayOnline();
    this.sumOfWage();
    this.sumOfWageToday();
    this.usersCreditSumFromboooksTrade();
    this.totalDeposit();
    this.totalBuy();
  },
};
</script>
