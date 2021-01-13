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
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: 'avatar',
          align: 'center',
          sortable: false,
          value: 'avatar',
          divider: true,
        },
        {
          text: 'firstName',
          align: 'center',
          sortable: true,
          filterable: true,
          filterType: 'text',
          value: 'firstName',
          divider: true,
        },
        {
          text: 'lastName',
          align: 'center',
          sortable: true,
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
          text: 'landLane',
          value: 'phone',
          align: 'left',
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
          text: 'status',
          value: 'active',
          align: 'center',
          filterable: true,
          filterType: 'staticDropDown',
          divider: true,
        },
        {
          text: 'createdAt',
          value: 'createdAt',
          align: 'center',
          filterable: true,
          filtertype: 'date',
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
