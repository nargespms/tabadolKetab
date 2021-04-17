<template>
  <div>
    <v-row v-if="!isLoading" class="justify-center">
      <v-col cols="12" lg="4">
        <statusCard
          :lable="'allClientsNumber'"
          :number="users.clients"
          :color="color"
          :link="'/users/clients'"
        />
      </v-col>
      <v-col cols="12" lg="4">
        <statusCard
          :lable="'staffsNumber'"
          :number="users.staffs"
          :color="color"
          :link="'/users/staffs'"
        />
      </v-col>
      <v-col cols="12" lg="4">
        <statusCard
          :lable="'registeredClientTodayNumber'"
          :number="users.clientsReqister"
          :color="color"
          :link="`/users/clients?filter[createdAt]=${this.today}`"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import statusCard from './statusCard.vue';

export default {
  name: 'usersStatusCards',
  components: {
    statusCard,
  },
  data() {
    return {
      color: '#0277BD',
      isLoading: true,
      users: {
        clients: 0,
        clientsReqister: 0,
        staffs: 0,
      },
    };
  },
  computed: {
    today() {
      return new Date().toISOString();
    },
  },
  methods: {
    getClients() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/report/clients').then(res => {
        if (res.status === 200) {
          this.users.clients = res.data.count;
        }
      });
    },
    getStaffs() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/report/staffs').then(res => {
        if (res.status === 200) {
          this.users.staffs = res.data.count;
        }
      });
    },
    getTodayClients() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/clients', {
          params: {
            filter: {
              createdAt: new Date(),
            },
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.users.clientsReqister = res.data.count;
          }
        });
    },
  },
  mounted() {
    this.getClients();
    this.getStaffs();
    this.getTodayClients();
    this.isLoading = false;
  },
};
</script>
