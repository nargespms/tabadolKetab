<template>
  <div>
    <v-row class="justify-center">
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'messagesNumber'"
          :number="messages.total"
          :color="color"
          :link="'messagesList'"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'todayMessagesNumber'"
          :number="messages.todayNumber"
          :color="color"
          :link="`/messagesList?filter[createdAt]=${this.today}`"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import statusCard from './statusCard.vue';

export default {
  name: 'messagesStatusCard',

  components: {
    statusCard,
  },
  data() {
    return {
      color: '#43A047',
      messages: {
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
    getTotalMessages() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/report/messages').then(res => {
        if (res.status === 200) {
          console.log(res.data);
          this.messages.total = res.data.count;
        }
      });
    },
    getTodayMessages() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/messages', {
          params: {
            filter: {
              createdAt: new Date(),
            },
          },
        })
        .then(res => {
          if (res.status === 200) {
            console.log(res.data);
            this.messages.todayNumber = res.data.count;
          }
        });
    },
  },
  mounted() {
    this.getTotalMessages();
    this.getTodayMessages();
  },
};
</script>
