<template>
  <v-row no-gutters class="justify-center ">
    <v-col cols="12" sm="6" md="8">
      <v-card class="pa-8">
        {{ item }}
        <v-btn @click="replyTicketPage" color="primary">
          {{ $t('reply') }}
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'showTicket',
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    replyTicketPage() {
      this.$router.push({
        path: `/ticketsList/${this.item.id}`,
      });
    },
  },
};
</script>
