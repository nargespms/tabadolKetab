<template>
  <v-row no-gutters class="justify-center pt-4 ">
    <v-col cols="12" md="12">
      <v-textarea
        outlined
        name="input-7-4"
        :label="$t('messageText')"
        :v-model="description"
      ></v-textarea>
      <div class="d-flex justify-center">
        <v-btn color="primary " width="200" @click="replyTicket">
          {{ $t('reply') }}
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ticketReply',
  data() {
    return {
      description: '',
    };
  },
  methods: {
    replyTicket() {
      this.$emit('replyTicket', this.description);
    },
  },
};
</script>
