<template>
  <div>
    <dataTableWrap
      :headers="headers"
      :module="'clientsList'"
      :endpoint="'/v1/api/tabaadol-e-ketaab/client/list'"
    />
  </div>
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'clientsList',
  metaInfo: {
    title: 'لیست مشتری ها ',
  },
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: 'firstName',
          align: 'center',
          sortable: false,
          filterable: true,
          filterType: 'text',
          value: 'firstName',
          divider: true,
        },
        {
          text: 'lastName',
          align: 'center',
          sortable: false,
          filterable: true,
          filterType: 'text',
          value: 'lastName',
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
          text: 'landLane',
          value: 'landLane',
          align: 'left',
          filterable: false,
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
          text: 'status',
          value: 'active',
          align: 'center',
          filterable: true,
          filterType: 'staticDropDown',
          divider: true,
        },
        {
          text: 'creditAmount',
          value: 'credit',
          align: 'center',
          filterable: false,
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
