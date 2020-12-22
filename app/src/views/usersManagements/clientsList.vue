<template>
  <div>
    <dataTableWrap :headers="headers" :module="'clientsList'" />
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
          text: 'fullName',
          align: 'center',
          sortable: true,
          filterable:true,
          value: 'fullName',
          divider: true,
        },
        { text: 'mobilephone', value: 'mobilephone', align: 'left', filterable:true, divider: true },
        { text: 'phone', value: 'phone', align: 'left', filterable:true, divider: true },
        { text: 'roll', value: 'roll', align: 'center', filterable:true, divider: true },
        { text: 'email', value: 'email', align: 'left', filterable:true, divider: true },
        { text: 'nationalId', value: 'nationalId', align: 'center', filterable:true, divider: true },
        { text: 'status', value: 'status', align: 'center', filterable:true, divider: true },
        { text: 'createdAt', value: 'createdAt', align: 'center', filterable:true, divider: true },
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
