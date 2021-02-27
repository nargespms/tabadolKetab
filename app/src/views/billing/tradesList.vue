<template>
  <dataTableWrap
    :headers="headers"
    :module="'trades'"
    :endpoint="'/v1/api/tabaadol-e-ketaab/trade/list'"
  />
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'tradesList',
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: 'tradesNumber',
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
          text: 'type',
          value: 'type',
          filterable: true,
          filterType: 'text',
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
          icon: ' 🧑‍💻',
        },
        {
          text: 'client',
          value: 'clientId',
          filterable: true,
          filterType: 'clientUsers',
          align: 'center',
          divider: true,
          icon: ' 🧑‍💻',
        },
        {
          text: 'finalTotal',
          value: 'finalTotal',
          filterable: true,
          filterType: 'text',
          align: 'center',
          divider: true,
        },
      ],
    };
  },
};
</script>
