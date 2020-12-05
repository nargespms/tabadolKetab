<template>
  <v-card>
    <v-tabs v-model="tab" background-color="teal" dark grow>
      <v-tab v-for="item in items" :key="item.tab">
        <v-icon class="pl-3">
          {{ item.icon }}
        </v-icon>
        <span class="font-weight-bold">
          {{ $t(item.tab) }}
        </span>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <v-card flat class="pa-4">
          <usersStatusCards v-if="item.tab === 'users'" />
          <ticketsStatusCard v-if="item.tab === 'tickets'" />
          <booksStatusCard v-if="item.tab === 'book'" />
          <discountsStatusCard v-if="item.tab === 'discounts'" />
          <postsStatusCard v-if="item.tab === 'post'" />
          <billingStatusCard v-if="item.tab === 'billing'" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import usersStatusCards from './usersStatusCards.vue';
import ticketsStatusCard from './ticketsStatusCard.vue';
import discountsStatusCard from './discountsStatusCard.vue';
import postsStatusCard from './postsStatusCard.vue';
import billingStatusCard from './billingStatusCard.vue';
import booksStatusCard from './booksStatusCard.vue';

export default {
  name: 'dashboardTab',
  components: {
    usersStatusCards,
    ticketsStatusCard,
    discountsStatusCard,
    postsStatusCard,
    billingStatusCard,
    booksStatusCard,
  },
  data() {
    return {
      tab: null,
      items: [
        { tab: 'users', icon: 'mdi-account' },
        {
          tab: 'tickets',
          icon: 'mdi-ticket-account',
        },
        {
          tab: 'discounts',
          icon: ' mdi-ticket-percent',
        },
        { tab: 'post', content: 'Tab 4 Content', icon: 'fas fa-motorcycle' },
        {
          tab: 'billing',
          icon: 'fas fa-file-invoice-dollar',
        },
        {
          tab: 'book',
          icon: 'mdi-book-open-variant',
        },
      ],
    };
  },
};
</script>
