<template>
  <dataTableWrap
    :headers="headers"
    :module="'requestedBooks'"
    :endpoint="'/v1/api/tabaadol-e-ketaab/requested-books/list'"
  />
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'requestedBooksList',
  metaInfo: {
    title: 'لیست کتاب های درخواستی',
  },
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
          text: 'shabak',
          value: 'shabak',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'createdAt',
          value: 'createdAt',
          align: 'center',
          filterable: true,
          filterType: 'date',
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'category',
          value: 'categoryId',
          align: 'center',
          filterable: true,
          filterType: 'bookCategory',
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'status',
          value: 'status',
          align: 'center',
          filterable: true,
          filterType: 'staticDropDown',
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'client',
          value: 'createdById',
          align: 'center',
          filterable: true,
          filterType: 'clientUsers',
          filterName: 'createdById',
          divider: true,
        },
        {
          text: 'mobile',
          value: 'mobile',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'operation',
          value: 'operation',
          align: 'center',
          filterable: false,
          divider: true,
          icon: '👨‍💼',
        },
      ],
    };
  },
};
</script>
