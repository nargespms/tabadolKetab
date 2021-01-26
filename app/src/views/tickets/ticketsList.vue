<template>
  <dataTableWrap
    :headers="headers"
    :module="'tickets'"
    :endpoint="'/v1/api/tabaadol-e-ketaab/tickets/list'"
  />
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
          filterType: 'text',
          divider: true,
          icon: '👨‍💼',
        },

        {
          text: 'createdAt',
          value: 'createdAt',
          filterable: true,
          filterType: 'date',
          align: 'center',
          body: 100,
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'status',
          value: 'status',
          filterable: true,
          filterType: 'staticDropDown',
          align: 'center',
          body: 100,
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
