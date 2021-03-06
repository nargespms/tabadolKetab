<template>
  <div>
    <dataTableWrap
      :headers="headers"
      :module="'postBooks'"
      :endpoint="
        `/v1/api/tabaadol-e-ketaab/books/list?filter[status]=CLIENTREGISTER`
      "
    />
  </div>
</template>

<script>
import dataTableWrap from '../structure/dataTableWrap.vue';

export default {
  name: 'postRequestCmp',
  components: {
    dataTableWrap,
  },

  data() {
    return {
      headers: [
        {
          text: 'select',
          value: 'select',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
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
      ],
    };
  },
};
</script>
