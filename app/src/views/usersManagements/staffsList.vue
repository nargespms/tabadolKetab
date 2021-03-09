<template>
  <div>
    <dataTableWrap
      :headers="headers"
      :module="'staffsList'"
      :endpoint="'/v1/api/tabaadol-e-ketaab/staff/list'"
    />
  </div>
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'staffsList',
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
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'role',
          value: 'roleId',
          align: 'center',
          filterable: true,
          filterType: 'roles',
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
