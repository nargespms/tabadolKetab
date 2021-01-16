<template>
  <dataTableWrap :headers="headers" :module="'tickets'" />
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'ticketsList',
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
          text: 'sendDate',
          value: 'sendDate',
          filterable: true,
          align: 'center',
          body: 100,
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'status',
          value: 'status',
          filterable: true,
          align: 'center',
          body: 100,
          divider: true,
        },
        {
          text: 'client',
          value: 'client',
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
          icon: '👨‍💼',
        },
      ],
    };
  },
};
</script>
