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
  metaInfo: {
    title: 'لیست معاملات',
  },
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: 'createdAt',
          value: 'createdAt',
          filterable: true,
          filterType: 'date',
          align: 'center',
          divider: true,
        },
        {
          text: 'wage',
          value: 'wage',
          filterable: true,
          filterType: 'text',
          align: 'center',
          divider: true,
        },
        {
          text: 'seller',
          value: 'sellerId',
          filterable: true,
          filterType: 'clientUsers',
          filterName: 'sellerId',
          align: 'center',
          divider: true,
          icon: ' 🧑‍💻',
        },
        {
          text: 'buyer',
          value: 'buyerId',
          filterable: true,
          filterType: 'clientUsers',
          filterName: 'buyerId',

          align: 'center',
          divider: true,
          icon: ' 🧑‍💻',
        },
        {
          text: 'total',
          value: 'total',
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
