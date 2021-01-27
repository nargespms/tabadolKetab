<template>
  <dataTableWrap
    :headers="
      this.$store.state.bookShop.userInfo.role !== 'CLIENT'
        ? headers
        : clientHeaders
    "
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
          condition: true,
        },

        {
          text: 'createdAt',
          value: 'createdAt',
          filterable: true,
          filterType: 'date',
          align: 'center',
          body: 100,
          divider: true,
          condition: true,
        },
        {
          text: 'status',
          value: 'status',
          filterable: true,
          filterType: 'staticDropDown',
          align: 'center',
          body: 100,
          divider: true,
          condition: true,
        },
        {
          text: 'client',
          value: 'clientId',
          filterable: true,
          filterType: 'clientUsers',
          align: 'center',
          divider: true,
          condition: this.$store.state.bookShop.userInfo.role !== 'CLIENT',
        },

        {
          text: 'operation',
          value: 'operation',
          align: 'center',
          width: 250,
          class: 'operationClass',
          divider: true,
          condition: true,
        },
      ],
      clientHeaders: [
        {
          text: 'title',
          value: 'title',
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
          body: 100,
          divider: true,
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
