<template>
  <dataTableWrap
    :headers="
      this.$store.state.bookShop.userInfo.role !== 'CLIENT'
        ? headers
        : clientHeaders
    "
    :module="'invoices'"
    :endpoint="'/v1/api/tabaadol-e-ketaab/invoice/list'"
  />
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'invoicesList',
  metaInfo: {
    title: 'لیست فاکتورها',
  },
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: 'invoiceNumber',
          value: 'number',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },

        {
          text: 'createdAt',
          value: 'createdAt',
          filterable: true,
          filterType: 'date',
          align: 'center',
          divider: true,
        },
        {
          text: 'staff',
          value: 'staffId',
          filterable: true,
          filterType: 'staffUsers',
          filterName: 'staffId',
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
        {
          text: 'finalTotal',
          value: 'finalTotal',
          filterable: true,
          filterType: 'text',
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
      clientHeaders: [
        {
          text: 'invoiceNumber',
          value: 'number',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },

        {
          text: 'createdAt',
          value: 'createdAt',
          filterable: true,
          filterType: 'date',
          align: 'center',
          divider: true,
        },
        {
          text: 'staff',
          value: 'staffId',
          filterable: true,
          filterType: 'staffUsers',
          filterName: 'staffId',
          align: 'center',
          divider: true,
        },

        {
          text: 'finalTotal',
          value: 'finalTotal',
          filterable: true,
          filterType: 'text',
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
