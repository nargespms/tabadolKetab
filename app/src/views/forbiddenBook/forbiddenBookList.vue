<template>
  <dataTableWrap
    :headers="headers"
    :module="'forbiddenBook'"
    :endpoint="'/v1/api/tabaadol-e-ketaab/forbidden-books/list'"
  />
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'forbiddenBookList',
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
          filterable: true,
          filterType: 'date',
          align: 'center',
          divider: true,
        },
        {
          text: 'author',
          value: 'author',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'shabak',
          value: 'shabak',
          filterable: true,
          filterType: 'text',
          align: 'center',
          divider: true,
        },
        {
          text: 'operation',
          value: 'operation',
          align: 'center',
          divider: true,
        },
      ],
    };
  },
};
</script>
