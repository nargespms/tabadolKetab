<template>
  <dataTableWrap :headers="headers" :module="'bookCats'" />
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'bookCatList',
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: 'id',
          align: 'center',
          sortable: false,
          value: 'id',
          divider: true,
        },
        { text: 'title', value: 'title', align: 'center', divider: true },
        {
          text: 'completed',
          value: 'completed',
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
