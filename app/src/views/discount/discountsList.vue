<template>
  <div>
    <dataTableWrap
      :headers="headers"
      :module="'discounts'"
      :endpoint="'/v1/api/tabaadol-e-ketaab/category-discount/list'"
    />
  </div>
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'discountsList',
  metaInfo: {
    title: 'لیست تخفیف های دسته بندی',
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
          text: 'expireDate',
          value: 'expireDate',
          filterName: 'expireDate',
          filterable: true,
          filterType: 'date',
          align: 'center',
          divider: true,
        },
        {
          text: 'category',
          value: 'categoryId',
          filterable: true,
          filterType: 'bookCategory',
          align: 'center',
          divider: true,
        },

        {
          text: 'percent',
          value: 'percent',
          filterable: true,
          filterType: 'text',
          align: 'center',
          divider: true,
        },
        {
          text: 'description',
          value: 'description',
          filterable: true,
          filterType: 'text',
          align: 'center',
          divider: true,
          body: 150,
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
