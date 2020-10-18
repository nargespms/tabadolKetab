<template>
  <dataTableWrap :headers="headers" :module="'messages'" />
</template>


<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'messagesList',
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [

        { text: 'title', value: 'title', align: 'center', filterable:true ,divider: true },
        {
          text: 'summaryText',
          value: 'summaryText',
          align: 'center',
          body: 150,
          divider: true,
        },
        {
          text: 'sendDate',
          value: 'sendDate',
          filterable:true,
          align: 'center',
          body: 100,
          divider: true,
        },
        {
          text: 'reciever',
          value: 'reciever',
          filterable:true,
          align: 'center',
          divider: true,
        },
        {
          text: 'recieverNumber',
          value: 'recieverNumber',
          filterable:false,
          align: 'center',
          divider: true,
        },
        {
          text: 'attachments',
          value: 'attachments',
          filterable:false,
          align: 'center',
          divider: true,
        },
        {
          text: 'sender',
          value: 'sender',
          filterable:true,
          align: 'center',
          divider: true,
        },
        {
          text: 'messageType',
          value: 'messageType',
          filterable:true,
          align: 'center',
          divider: true,
        },
        {
          text: 'sendSms',
          value: 'sendSms',
          filterable:true,
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
