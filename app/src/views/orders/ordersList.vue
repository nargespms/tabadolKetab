<template>
  <dataTableWrap :headers="headers" :module="'orders'" />
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'ordersList',
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: 'orderType',
          value: 'orderType',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'orderNumber',
          value: 'orderNumber',
          align: 'center',
          filterable: true,
          divider: true,
        },

        {
          text: 'user',
          value: 'user',
          filterable: true,
          align: 'center',
          divider: true,
          icon: '🧑‍💻',
        },
        {
          text: 'createdAt',
          value: 'createdAt',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'bookNumber',
          value: 'bookNumber',
          filterable: false,
          align: 'center',
          divider: true,
        },
        {
          text: 'phone',
          value: 'phone',
          filterable: true,
          align: 'center',
          divider: true,
          icon: '🧑‍💻',
        },
        {
          text: 'price',
          value: 'price',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'post',
          value: 'post',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'sendorRecieveDate',
          value: 'sendorRecieveDate',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'status',
          value: 'status',
          filterable: true,
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
