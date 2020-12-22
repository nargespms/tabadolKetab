<template>
  <dataTableWrap :headers="headers" :module="'invoices'" />
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'invoicesList',
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: 'invoiceNumber',
          value: 'invoiceNumber',
          align: 'center',
          filterable: true,
          divider: true,
        },

        {
          text: 'createdAt',
          value: 'createdAt',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'registeredUser',
          value: 'registeredUser',
          filterable: true,
          align: 'center',
          divider: true,
          icon: ' 🧑‍💻',
        },
        {
          text: 'client',
          value: 'client',
          filterable: true,
          align: 'center',
          divider: true,
          icon: ' 🧑‍💻',
        },
        {
          text: 'totalPrice',
          value: 'totalPrice',
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
