<template>
  <dataTableWrap
    :headers="headers"
    :module="'books'"
    :endpoint="'/v1/api/tabaadol-e-ketaab/books/list'"
  />
</template>

<script>
import dataTableWrap from '../structure/dataTableWrap.vue';

export default {
  name: 'bookListCmp',
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: 'title',
          value: 'title',
          align: 'center',
          filterable: true,
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'registerDate',
          value: 'registerDate',
          align: 'center',
          filterable: true,
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'category',
          value: 'category',
          align: 'center',
          filterable: true,
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'status',
          value: 'status',
          align: 'center',
          filterable: true,
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'tags',
          value: 'tags',
          align: 'center',
          filterable: true,
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'mainPrice',
          value: 'mainPrice',
          align: 'center',
          filterable: true,
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'soldPrice',
          value: 'soldPrice',
          align: 'center',
          filterable: true,
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'confirmRegisterDate',
          value: 'confirmRegisterDate',
          align: 'center',
          filterable: true,
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'user',
          value: 'user',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'confirmerUser',
          value: 'confirmerUser',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'barcode',
          value: 'barcode',
          align: 'center',
          filterable: false,
          divider: true,
        },
        {
          text: 'operation',
          value: 'operation',
          align: 'center',
          filterable: false,
          divider: true,
        },
      ],
    };
  },
};
</script>
