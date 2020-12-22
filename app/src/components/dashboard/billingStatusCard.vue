<template>
  <div>
    <v-row>
      <v-col cols="12" lg="4">
        <creditStatusCard
          :lable="'existedBooksCredit'"
          :number="billing.existedBooksCredit"
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
          :number="billing.usersCreditSumCache"
          :color="color"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4">
        <creditStatusCard
          :lable="'todayOnlineShop'"
          :number="billing.todayOnlineShop"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="4">
        <creditStatusCard
          :lable="'todayExpiredSum'"
          :number="billing.todayExpiredSum"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="4">
        <creditStatusCard
          :lable="'usersCreditSumCache'"
          :number="billing.totalExpireSum"
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
        existedBooksCredit: 1200000,
        usersCreditSumFromboooksTrade: 2500000,
        usersCreditSumCache: 52680000,
        todayOnlineShop: 80000,
        todayExpiredSum: 56000,
        totalExpireSum: 1205000,
      },
    };
  },
};
</script>
