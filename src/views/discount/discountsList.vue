<template>
  <div>
    <dataTableWrap :headers="headers" :module="'discounts'" />
  </div>
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'discountsList',
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
          text: 'title',
          value: 'title',
          align: 'center',
          filterable: true,
          divider: true,
        },

        {
          text: 'createdAt',
          value: 'createdAt',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'category',
          value: 'category',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'type',
          value: 'type',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'amount',
          value: 'amount',
          filterable: true,
          align: 'left',
          divider: true,
        },
        {
          text: 'number',
          value: 'number',
          filterable: false,
          align: 'left',
          divider: true,
        },
        {
          text: 'usedNumber',
          value: 'usedNumber',
          filterable: false,
          align: 'left',
          divider: true,
        },
        {
          text: 'code',
          value: 'code',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'description',
          value: 'description',
          filterable: true,
          align: 'center',
          divider: true,
          body: 150,
        },
        {
          text: 'user',
          value: 'user',
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
