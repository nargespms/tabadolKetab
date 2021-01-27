<template>
  <v-row no-gutters class="justify-center ">
    <v-col cols="12" sm="8" md="8" v-if="!isLoading">
      <v-card>
        <v-card-actions class="teal"> </v-card-actions>
        <div class="pa-4 clear">
          <div class="float-right">
            <v-icon>
              mdi-book-open-page-variant
            </v-icon>
            <span class="pr-4 font-weight-bold"> {{ ticket.title }}</span>
            <div>
              <span class="pb-2 pt-4 d-block">
                <span class="teal--text">{{ $t('status') }} :</span>
                {{ $t(ticket.status) }}
              </span>
              <span class="pb-2 d-block">
                <span class="teal--text"> {{ $t('department') }} : </span>
                {{ $t(ticket.department) }}
              </span>
            </div>
          </div>
          <div class="float-left">
            <p class="sendDateP">
              {{ $t('sendDate') }}
            </p>
            <span>
              {{ new Date(ticket.createdAt).toLocaleTimeString('fa') }}
              <v-icon small color="red">
                mdi-clock
              </v-icon>
              {{ new Date(ticket.createdAt).toLocaleDateString('fa') }}
              <v-icon small color="black">
                mdi-calendar
              </v-icon>
            </span>
          </div>
        </div>
      </v-card>
      <template v-for="item in ticket.threads">
        <threadEncapsule
          :key="item.index"
          :data="item"
          :userName="item.staff ? 'staff' : item.client ? 'client' : undefined"
        />
      </template>
      <ticketReply :key="componentKey" @replyTicket="replyTicket" />
    </v-col>
    <notifMessage
      v-if="successNotif"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
      :type="'success'"
    />
  </v-row>
</template>

<script>
import threadEncapsule from './threadEncapsule.vue';
import ticketReply from './ticketReply.vue';
import notifMessage from '../structure/notifMessage.vue';

export default {
  name: 'ticketCmp',
  components: {
    threadEncapsule,
    ticketReply,
    notifMessage,
  },
  data() {
    return {
      componentKey: 0,
      successNotif: false,
      isLoading: true,
      ticket: {},
    };
  },
  methods: {
    replyTicket(value) {
      console.log(value);
      this.$axios
        .post('/v1/api/tabaadol-e-ketaab/thread', {
          ticketId: this.ticket.id,
          description: value,
        })
        .then(res => {
          if (res.status === 200) {
            this.getTicketData();
            this.componentKey += 1;
            this.successNotif = true;
          }
        });
    },
    // notif
    hideNotif() {
      this.successNotif = false;
    },
    getTicketData() {
      this.$axios
        .get(`/v1/api/tabaadol-e-ketaab/ticket/${this.$route.params.ticketId}`)
        .then(res => {
          if (res.status === 200) {
            this.ticket = res.data.ticket;
            console.log(res.data.ticket);
            this.isLoading = false;
          }
        });
    },
  },
  mounted() {
    this.getTicketData();
  },
};
</script>

<style lang="scss">
.sendDateP {
  border-bottom: thin solid #bff7e9;
  padding: 6px;
  margin: 0;
  margin-bottom: 4px !important;
  text-align: center;
  font-size: 12px;
  color: #009572;
}
.ticketSender {
  width: 100%;
  float: right;
}
</style>
