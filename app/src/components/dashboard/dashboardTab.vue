<template>
  <v-card>
    <v-tabs v-model="tab" background-color="teal" dark grow>
      <template v-for="item in items">
        <v-tab v-if="item.condition" :key="item.tab">
          <v-icon class="pl-3">
            {{ item.icon }}
          </v-icon>
          <span class="font-weight-bold">
            {{ $t(item.tab) }}
          </span>
        </v-tab>
      </template>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <template v-for="item in items">
        <v-tab-item v-if="item.condition" :key="item.tab">
          <v-card flat class="pa-4">
            <usersStatusCards v-if="item.tab === 'users'" />
            <ticketsStatusCard v-if="item.tab === 'tickets'" />
            <messagesStatusCard v-if="item.tab === 'messages'" />
            <discountsStatusCard v-if="item.tab === 'discounts'" />
            <postsStatusCard v-if="item.tab === 'post'" />
            <booksStatusCard v-if="item.tab === 'book'" />
            <billingStatusCard v-if="item.tab === 'billing'" />
            <financialReportWrap class="mt-8" v-if="item.tab === 'billing'" />
          </v-card>
        </v-tab-item>
      </template>
    </v-tabs-items>
  </v-card>
</template>

<script>
import usersStatusCards from './usersStatusCards.vue';
import ticketsStatusCard from './ticketsStatusCard.vue';
import messagesStatusCard from './messagesStatusCard.vue';
import discountsStatusCard from './discountsStatusCard.vue';
import postsStatusCard from './postsStatusCard.vue';
import billingStatusCard from './billingStatusCard.vue';
import booksStatusCard from './booksStatusCard.vue';
import financialReportWrap from '../report/financialReportWrap.vue';

export default {
  name: 'dashboardTab',
  components: {
    usersStatusCards,
    ticketsStatusCard,
    discountsStatusCard,
    postsStatusCard,
    billingStatusCard,
    booksStatusCard,
    financialReportWrap,
    messagesStatusCard,
  },
  data() {
    return {
      tab: null,
      items: [
        {
          tab: 'users',
          icon: 'mdi-account',
          condition:
            this.$store.state.bookShop.userInfo.role !== 'CLIENT' &&
            this.$store.state.bookShop.userInfo.role.r_report === true,
        },
        {
          tab: 'tickets',
          icon: 'mdi-ticket-account',
          condition: true,
        },
        {
          tab: 'messages',
          icon: 'mdi-android-messages',
          condition: this.$store.state.bookShop.userInfo.role === 'CLIENT',
        },
        {
          tab: 'discounts',
          icon: ' mdi-ticket-percent',
          condition:
            this.$store.state.bookShop.userInfo.role !== 'CLIENT' &&
            this.$store.state.bookShop.userInfo.role.r_report === true,
        },
        {
          tab: 'post',
          icon: 'fas fa-motorcycle',
          condition:
            this.$store.state.bookShop.userInfo.role !== 'CLIENT' &&
            this.$store.state.bookShop.userInfo.role.r_report === true,
        },
        {
          tab: 'billing',
          icon: 'fas fa-file-invoice-dollar',
          condition:
            this.$store.state.bookShop.userInfo.role !== 'CLIENT' &&
            this.$store.state.bookShop.userInfo.role.r_report === true,
        },
        {
          tab: 'book',
          icon: 'mdi-book-open-variant',
          condition:
            this.$store.state.bookShop.userInfo.role !== 'CLIENT' &&
            this.$store.state.bookShop.userInfo.role.r_report === true,
        },
      ],
    };
  },
};
</script>
