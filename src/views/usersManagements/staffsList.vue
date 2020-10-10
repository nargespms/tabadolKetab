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
          value: 'qw',
        },
        { text: 'username', value: 'username', align: 'center' },
        { text: 'email', value: 'email', align: 'center' },
        { text: 'phone', value: 'phone', align: 'center' },
        { text: 'website', value: 'website', align: 'center' },
        { text: 'company', value: 'company.name', align: 'center' },
      ],
    };
  },
};
</script>
