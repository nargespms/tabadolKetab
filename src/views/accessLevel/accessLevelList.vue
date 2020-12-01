<template>
  <dataTableWrap :headers="headers" :module="'accessLevelList'" />
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
          value: 'roleTitle',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'createdAt',
          value: 'createdAt',
          align: 'center',
          filterable: true,
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
