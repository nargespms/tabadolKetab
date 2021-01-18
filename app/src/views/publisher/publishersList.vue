<template>
  <dataTableWrap
    :headers="headers"
    :module="'publishers'"
    :endpoint="'/v1/api/tabaadol-e-ketaab/publishers/list'"
  />
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'publishersList',
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: 'fullName',
          value: 'title',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'createdAt',
          value: 'createdAt',
          align: 'center',
          filterable: true,
          filterType: 'date',
          divider: true,
        },

        {
          text: 'registeredUser',
          value: 'createdById',
          filterable: true,
          filterType: 'staffUsers',
          align: 'center',
          divider: true,
        },
        {
          text: 'phone',
          value: 'phone',
          filterable: true,
          filterType: 'text',
          align: 'center',
          divider: true,
        },
        {
          text: 'status',
          value: 'active',
          filterable: true,
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
