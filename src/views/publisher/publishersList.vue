<template>
  <dataTableWrap :headers="headers" :module="'publishers'" />
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'publishersList',
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: 'fullName',
          value: 'fullName',
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
          text: 'registeredUser',
          value: 'registeredUser',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'phone',
          value: 'phone',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'status',
          value: 'status',
          filterable: true,
          align: 'center',
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
