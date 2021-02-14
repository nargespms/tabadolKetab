<template>
  <!-- <lazycreditTable /> -->
  <dataTableWrap
    :headers="
      this.$store.state.bookShop.userInfo.role !== 'CLIENT'
        ? headers
        : clientHeaders
    "
    :module="'tranactions'"
    :endpoint="'/v1/api/tabaadol-e-ketaab/transactions/list'"
  />
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
          text: 'transactionNumber',
          value: 'number',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'transactionDate',
          value: 'createdAt',
          align: 'center',
          filterable: true,
          filterType: 'date',
          divider: true,
        },
        {
          text: 'price',
          value: 'total',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'trackingCode',
          value: 'paymentId',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'paidWay',
          value: 'paidWay',
          align: 'center',
          filterable: true,
          filterType: 'staticDropDown',
          divider: true,
        },
        {
          text: 'description',
          value: 'description',
          align: 'center',
          divider: true,
        },
        {
          text: 'client',
          value: 'clientId',
          filterable: true,
          filterType: 'clientUsers',
          align: 'center',
          divider: true,
        },
      ],
      clientHeaders: [
        {
          text: 'transactionNumber',
          value: 'number',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'transactionDate',
          value: 'createdAt',
          align: 'center',
          filterable: true,
          filterType: 'date',
          divider: true,
        },
        {
          text: 'price',
          value: 'total',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'trackingCode',
          value: 'paymentId',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'paidWay',
          value: 'paidWay',
          align: 'center',
          filterable: true,
          filterType: 'staticDropDown',
          divider: true,
        },
        {
          text: 'description',
          value: 'description',
          align: 'center',
          divider: true,
        },
      ],
    };
  },
};
</script>
