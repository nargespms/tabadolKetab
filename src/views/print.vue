<template>
  <div>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <printTableCmp v-if="!isLoading" :data="printData" :columns="columns" />
  </div>
</template>

<script>
import printTableCmp from '../components/print/printTableCmp.vue';

export default {
  name: 'print',
  components: {
    printTableCmp,
  },
  data() {
    return {
      endpoint: '',
      printData: '',
      isLoading: true,
      columns: [],
      discountCols: [
        {
          text: 'id',
          value: 'id',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'title',
          value: 'title',
          align: 'center',
          filterable: true,
          divider: true,
        },

        {
          text: 'createdAt',
          value: 'createdAt',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'category',
          value: 'category',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'type',
          value: 'type',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'amount',
          value: 'amount',
          filterable: true,
          align: 'left',
          divider: true,
        },
        {
          text: 'number',
          value: 'number',
          filterable: false,
          align: 'left',
          divider: true,
        },
        {
          text: 'usedNumber',
          value: 'usedNumber',
          filterable: false,
          align: 'left',
          divider: true,
        },
        {
          text: 'code',
          value: 'code',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'description',
          value: 'description',
          filterable: true,
          align: 'center',
          divider: true,
          body: 150,
        },
        {
          text: 'user',
          value: 'user',
          filterable: true,
          align: 'center',
          divider: true,
        },
      ],
      staffsCols: [
        {
          text: 'avatar',
          align: 'center',
          sortable: false,
          value: 'avatar',
          divider: true,
        },
        {
          text: 'fullName',
          align: 'center',
          sortable: true,
          filterable: true,
          value: 'fullName',
          divider: true,
        },
        {
          text: 'mobilephone',
          value: 'mobilephone',
          align: 'left',
          filterable: true,
          divider: true,
        },
        {
          text: 'phone',
          value: 'phone',
          align: 'left',
          filterable: true,
          divider: true,
        },
        {
          text: 'roll',
          value: 'roll',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'email',
          value: 'email',
          align: 'left',
          filterable: true,
          divider: true,
        },
        {
          text: 'nationalId',
          value: 'nationalId',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'status',
          value: 'status',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'createdAt',
          value: 'createdAt',
          align: 'center',
          filterable: true,
          divider: true,
        },
      ],
      clientsCols: [
        {
          text: 'avatar',
          align: 'center',
          sortable: false,
          value: 'avatar',
          divider: true,
        },
        {
          text: 'fullName',
          align: 'center',
          sortable: true,
          filterable: true,
          value: 'fullName',
          divider: true,
        },
        {
          text: 'mobilephone',
          value: 'mobilephone',
          align: 'left',
          filterable: true,
          divider: true,
        },
        {
          text: 'phone',
          value: 'phone',
          align: 'left',
          filterable: true,
          divider: true,
        },
        {
          text: 'roll',
          value: 'roll',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'email',
          value: 'email',
          align: 'left',
          filterable: true,
          divider: true,
        },
        {
          text: 'nationalId',
          value: 'nationalId',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'status',
          value: 'status',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'createdAt',
          value: 'createdAt',
          align: 'center',
          filterable: true,
          divider: true,
        },
      ],
      messagesCols: [
        {
          text: 'title',
          value: 'title',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'sendDate',
          value: 'sendDate',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'reciever',
          value: 'reciever',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'recieverNumber',
          value: 'recieverNumber',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'attachments',
          value: 'attachments',
          align: 'center',
          filterable: false,
          divider: true,
        },
        {
          text: 'sender',
          value: 'sender',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'messageType',
          value: 'messageType',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'sendSms',
          value: 'sendSms',
          align: 'center',
          filterable: true,
          divider: true,
        },
      ],
      ticketsCols: [
        {
          text: 'id',
          value: 'id',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'title',
          value: 'title',
          align: 'center',
          filterable: true,
          divider: true,
        },

        {
          text: 'sendDate',
          value: 'sendDate',
          filterable: true,
          align: 'center',
          body: 100,
          divider: true,
        },
        {
          text: 'reciever',
          value: 'reciever',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'summaryText',
          value: 'summaryText',
          align: 'center',
          body: 150,
          divider: true,
        },
        {
          text: 'sender',
          value: 'sender',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'senderNumber',
          value: 'senderNumber',
          filterable: false,
          align: 'center',
          divider: true,
        },
      ],
    };
  },
  methods: {
    getData() {
      this.$axios.get(this.endpoint).then(res => {
        this.printData = res.data;
        this.isLoading = false;
      });
    },
  },
  mounted() {
    console.log(this.$route.name);
    if (this.$route.name === 'printDiscounts') {
      this.endpoint = 'https://jsonplaceholder.typicode.com/users';
      this.columns = this.discountCols;
    }
    if (this.$route.name === 'printStaffs') {
      this.endpoint = 'https://jsonplaceholder.typicode.com/users';
      this.columns = this.staffsCols;
    }
    if (this.$route.name === 'printClients') {
      this.endpoint = 'https://jsonplaceholder.typicode.com/users';
      this.columns = this.clientsCols;
    }
    if (this.$route.name === 'printMessages') {
      this.endpoint = 'https://jsonplaceholder.typicode.com/users';
      this.columns = this.messagesCols;
    }
    if (this.$route.name === 'printRequestedBooks') {
      this.endpoint = 'https://jsonplaceholder.typicode.com/posts';
      this.columns = this.ticketsCols;
    }
    if (this.$route.name === 'printTickets') {
      this.endpoint = 'https://jsonplaceholder.typicode.com/posts';
      this.columns = this.ticketsCols;
    }
    this.getData();
    // if(this.$router)
  },
};
</script>
