<template>
  <dataTableWrap :headers="headers" :module="'bookCats'" />
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
          text: 'id',
          align: 'center',
          sortable: false,
          value: 'id',
          filterable:true,
          divider: true,
        },
        { text: 'title', value: 'title', align: 'center',filterable:true, divider: true },
        {
          text: 'createdAt',
          value: 'createdAt',
          sortable: false,
          filterable:true,
          align: 'center',
          divider: true,
        },
        {
          text: 'status',
          value: 'status',
          sortable: true,
          filterable:true,
          align: 'center',
          divider: true,
        },
        {
          text: 'operation',
          value: 'operation',
          sortable: false,
          filterable:false,
          align: 'center',
          divider: true,
        },
      ],
    };
  },
};
</script>
