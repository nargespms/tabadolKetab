<template>
  <dataTableWrap :headers="headers" :module="'tickets'" />

</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'ticketsList',
  components: {
    dataTableWrap,
  },
  data () {
    return {
      headers: [
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
        {
          text: 'operation',
          value: 'operation',
          align: 'center',
          width: 250,
          class: 'operationClass',
          divider: true,
        },
      ],
    };
  },
};
</script>
