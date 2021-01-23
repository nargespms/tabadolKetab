<template>
  <dataTableWrap
    :headers="headers"
    :module="'bookCats'"
    :endpoint="'/v1/api/tabaadol-e-ketaab/categories/list'"
  />
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'bookCatList',
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
        },
        {
          text: 'createdAt',
          value: 'createdAt',
          sortable: false,
          filterable: true,
          filterType: 'date',
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
          sortable: false,
          filterable: false,
          align: 'center',
          divider: true,
        },
      ],
    };
  },
};
</script>
