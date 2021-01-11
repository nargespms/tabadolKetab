<template>
  <dataTableWrap
    :headers="headers"
    :module="'accessLevelList'"
    :endpoint="'/v1/api/tabaadol-e-ketaab/roles/list'"
  />
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'accessLevelList',
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: 'roleTitle',
          value: 'title',
          align: 'center',
          filterable: true,
          filterType: 'text',
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
          width: 250,
          class: 'operationClass',
          divider: true,
        },
      ],
    };
  },
};
</script>
