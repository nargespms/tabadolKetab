<template>
  <dataTableWrap :headers="headers" :module="'credit'" />
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'creditList',
  components: {
    dataTableWrap,
  },
  data() {
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
          text: 'transactionDate',
          value: 'transactionDate',
          align: 'center',
          filterable: true,
          divider: true,
        },

        {
          text: 'amount',
          value: 'amount',
          filterable: true,
          align: 'center',
          body: 100,
          divider: true,
        },
        {
          text: 'trackingCode',
          value: 'trackingCode',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'payType',
          value: 'payType',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'description',
          value: 'description',
          filterable: false,
          align: 'center',
          divider: true,
        },
        {
          text: 'user',
          value: 'user',
          filterable: false,
          align: 'center',
          divider: true,
        },
        {
          text: 'expDateCredit',
          value: 'expDateCredit',
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
