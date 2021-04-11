<template>
  <div>
    <v-row class="justify-center">
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'ticketsNumber'"
          :number="tickets.total"
          :color="color"
          :link="'ticketsList'"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'todayTicketsNumber'"
          :number="tickets.todayNumber"
          :color="color"
          :link="`/ticketsList?filter[createdAt]=${this.today}`"
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
        total: null,
        todayNumber: null,
      },
    };
  },
  computed: {
    today() {
      return new Date().toISOString();
    },
  },
  methods: {
    getTotalTickets() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/report/tickets').then(res => {
        if (res.status === 200) {
          console.log(res.data);
          this.tickets.total = res.data.count;
        }
      });
    },
    getTodayTickets() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/tickets', {
          params: {
            filter: {
              createdAt: new Date(),
            },
          },
        })
        .then(res => {
          if (res.status === 200) {
            console.log(res.data);
            this.tickets.todayNumber = res.data.count;
          }
        });
    },
  },
  mounted() {
    this.getTotalTickets();
    this.getTodayTickets();
  },
};
</script>
