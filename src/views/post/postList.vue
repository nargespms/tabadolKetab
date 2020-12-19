<template>
  <dataTableWrap :headers="headers" :module="'post'" />
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'postList',
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: 'id',
          value: 'id',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'receivesend',
          value: 'receivesend',
          align: 'center',
          filterable: true,
          divider: true,
        },

        {
          text: 'registerDate',
          value: 'registerDate',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'sendDate',
          value: 'sendDate',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'price',
          value: 'price',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'number',
          value: 'number',
          filterable: false,
          align: 'center',
          divider: true,
        },
        {
          text: 'address',
          value: 'address',
          filterable: false,
          align: 'center',
          body: 100,
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
          text: 'userPhoneNumber',
          value: 'userPhoneNumber',
          filterable: true,
          align: 'center',
          divider: true,
          icon: ' 🧑‍💻',
        },
        {
          text: 'userLandLane',
          value: 'userLandLane',
          filterable: true,
          align: 'center',
          divider: true,
          icon: ' 🧑‍💻',
        },
        {
          text: 'description',
          value: 'description',
          filterable: false,
          align: 'center',
          body: 100,
          divider: true,
          icon: ' 🧑‍💻',
        },
        {
          text: 'user',
          value: 'user',
          filterable: true,
          align: 'center',
          body: 100,
          divider: true,
        },
        {
          text: 'operation',
          value: 'operation',
          align: 'center',
          width: 250,
          class: 'operationClass',
          divider: true,
          icon: ' 🧑‍💻',
        },
      ],
    };
  },
};
</script>
