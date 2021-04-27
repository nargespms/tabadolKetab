<template>
  <div>
    <dataTableWrap
      :headers="headers"
      :module="'registeredBooks'"
      :endpoint="'/v1/api/tabaadol-e-ketaab/clients/register-book'"
    />
  </div>
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'registeredBooks',
  metaInfo: {
    title: 'لیست  کتاب های ثبت شده ',
  },
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: '',
          align: 'center',
          value: 'data-table-expand',
          divider: true,
        },
        {
          text: 'fullName',
          value: 'fullName',
          align: 'center',
          sortable: false,
          filterable: true,
          filterType: 'text',
          divider: true,
        },

        {
          text: 'mobile',
          value: 'mobile',
          align: 'left',
          class: 'ltr',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'email',
          value: 'email',
          align: 'left',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'nationalId',
          value: 'nationalId',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'bookCount',
          value: 'bookCount',
          align: 'center',

          divider: true,
        },
        {
          text: 'creditAmount',
          value: 'credit',
          align: 'center',
          filterable: false,
          divider: true,
        },
      ],
    };
  },
};
</script>
