<template>
  <dataTableWrap
    :headers="headers"
    :module="'authors'"
    :endpoint="'/v1/api/tabaadol-e-ketaab/authors/list'"
  />
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'authorList',
  metaInfo: {
    title: 'لیست مولف ها',
  },
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
          text: 'createdBy',
          value: 'createdById',
          filterable: true,
          filterType: 'staffUsers',
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
