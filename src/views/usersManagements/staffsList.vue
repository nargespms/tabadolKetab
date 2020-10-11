<template>
  <div>
    <dataTableWrap :headers="headers" :module="'staffsList'" />
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
          text: 'name',
          align: 'center',
          sortable: false,
          value: 'name',
          divider: true,
        },
        { text: 'username', value: 'username', align: 'center', divider: true },
        { text: 'email', value: 'email', align: 'center', divider: true },
        { text: 'phone', value: 'phone', align: 'left', divider: true },
        { text: 'website', value: 'website', align: 'center', divider: true },
        {
          text: 'company',
          value: 'company.name',
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
