<template>
  <div>
    <dataTableWrap
      :headers="
        this.$store.state.bookShop.userInfo.role !== 'CLIENT'
          ? headers
          : clientHeaders
      "
      :module="'books'"
      :endpoint="'/v1/api/tabaadol-e-ketaab/books/list'"
    />
  </div>
</template>

<script>
import dataTableWrap from '../structure/dataTableWrap.vue';

export default {
  name: 'booksListCmp',
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: 'title',
          value: 'name',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'registerDate',
          value: 'createdAt',
          align: 'center',
          filterable: true,
          filterType: 'date',
          divider: true,
        },
        {
          text: 'category',
          value: 'categoryId',
          align: 'center',
          filterable: true,
          filterType: 'bookCategory',
          divider: true,
        },
        {
          text: 'status',
          value: 'status',
          align: 'center',
          filterable: true,
          filterType: 'staticDropDown',
          divider: true,
        },
        {
          text: 'tags',
          value: 'tagsId',
          align: 'center',
          filterable: true,
          filterType: 'tags',
          divider: true,
        },
        {
          text: 'undergraduatePrice',
          value: 'undergraduatePrice',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'afterDiscount',
          value: 'afterDiscount',
          align: 'center',
          // filterable: true,
          // filterType: 'text',
          divider: true,
        },
        {
          text: 'confirmDate',
          value: 'confirmDate',
          align: 'center',
          filterable: true,
          filterType: 'date',
          filterName: 'confirmDate',
          divider: true,
        },
        {
          text: 'soldDate',
          value: 'soldDate',
          align: 'center',
          filterable: true,
          filterType: 'dateRange',
          filterName: 'soldDate',
          divider: true,
        },
        {
          text: 'user',
          value: 'sellerId',
          align: 'center',
          filterable: true,
          filterType: 'clientUsers',
          filterName: 'sellerId',
          divider: true,
        },
        {
          text: 'confirmerUser',
          value: 'confirmedById',
          align: 'center',
          filterable: true,
          filterType: 'staffUsers',
          filterName: 'confirmedById',
          divider: true,
        },

        {
          text: 'barcode',
          value: 'barcode',
          align: 'center',
          filterable: false,
          divider: true,
        },
        {
          text: 'operation',
          value: 'operation',
          align: 'center',
          filterable: false,
          divider: true,
        },
      ],
      clientHeaders: [
        {
          text: 'title',
          value: 'name',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'registerDate',
          value: 'createdAt',
          align: 'center',
          filterable: true,
          filterType: 'date',
          divider: true,
        },
        {
          text: 'category',
          value: 'categoryId',
          align: 'center',
          filterable: true,
          filterType: 'bookCategory',
          divider: true,
        },
        {
          text: 'status',
          value: 'status',
          align: 'center',
          filterable: true,
          filterType: 'staticDropDown',
          divider: true,
        },
        {
          text: 'tags',
          value: 'tagsId',
          align: 'center',
          filterable: true,
          filterType: 'tags',
          divider: true,
        },
        {
          text: 'undergraduatePrice',
          value: 'undergraduatePrice',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'afterDiscount',
          value: 'afterDiscount',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'confirmDate',
          value: 'confirmDate',
          align: 'center',
          filterable: true,
          filterType: 'date',
          filterName: 'confirmDate',
          divider: true,
        },
        {
          text: 'soldDate',
          value: 'soldDate',
          align: 'center',
          filterable: true,
          filterType: 'dateRange',
          filterName: 'soldDate',
          divider: true,
        },

        {
          text: 'operation',
          value: 'operation',
          align: 'center',
          filterable: false,
          divider: true,
        },
      ],
    };
  },
};
</script>
