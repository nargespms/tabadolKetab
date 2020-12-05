<template>
  <div>
    <v-row>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'ticketsNumber'"
          :number="tickets.total"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'todayTicketsNumber'"
          :number="tickets.todayNumber"
          :color="color"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import statusCard from './statusCard.vue';

export default {
  name: 'ticketsStatusCard',
  components: {
    statusCard,
  },
  data() {
    return {
      color: '#43A047',
      tickets: {
        total: 150,
        todayNumber: 10,
      },
    };
  },
};
</script>
