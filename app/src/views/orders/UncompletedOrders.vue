<template>
  <div>
    <dataTableWrap
      :headers="headers"
      :module="'UncompletedOrders'"
      :endpoint="'/v1/api/tabaadol-e-ketaab/online-order/list'"
    />
  </div>
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'UncompletedOrders',
  metaInfo: {
    title: 'سفارش های بررسی نشده ',
  },
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: '',
          align: 'center',
          value: 'data-table-expand',
          divider: true,
        },
        {
          text: 'orderNumber',
          value: 'number',
          align: 'center',
          filterable: false,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'client',
          value: 'clientId',
          filterable: false,
          filterType: 'clientUsers',
          align: 'center',
          divider: true,
        },
        {
          text: 'createdAt',
          value: 'createdAt',
          filterable: false,
          filterType: 'date',
          align: 'center',
          divider: true,
        },
        {
          text: 'booksCount',
          value: 'booksCount',
          filterable: false,
          filterType: 'text',
          align: 'center',
          divider: true,
        },
        {
          text: 'mobile',
          value: 'mobile',
          filterable: false,
          filterType: 'text',
          align: 'center',
          divider: true,
        },

        {
          text: 'deliveryMethod',
          value: 'delivery',
          filterable: false,
          filterType: 'staticDropDown',
          align: 'center',
          divider: true,
        },
        // {
        //   text: 'sendorRecieveDate',
        //   value: 'sendorRecieveDate',
        //   filterable: true,
        //   align: 'center',
        //   divider: true,
        // },
        {
          text: 'status',
          value: 'status',
          filterable: false,
          filterType: 'staticDropDown',
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
