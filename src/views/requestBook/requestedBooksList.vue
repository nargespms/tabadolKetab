<template>
  <dataTableWrap :headers="headers" :module="'requestedBooks'" />
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'requestedBooksList',
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: 'title',
          value: 'title',
          align: 'center',
          filterable: true,
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'shabak',
          value: 'shabak',
          align: 'center',
          filterable: true,
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'requestDate',
          value: 'requestDate',
          align: 'center',
          filterable: true,
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'category',
          value: 'category',
          align: 'center',
          filterable: true,
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'status',
          value: 'status',
          align: 'center',
          filterable: true,
          divider: true,
          icon: '👨‍💼',
        },
        {
          text: 'user',
          value: 'user',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'landLane',
          value: 'landLane',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'operation',
          value: 'operation',
          align: 'center',
          filterable: false,
          divider: true,
          icon: '👨‍💼',
        },
      ],
    };
  },
};
</script>
