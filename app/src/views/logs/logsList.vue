<template>
  <div>
    <dataTableWrap
      :headers="headers"
      :module="'logs'"
      :endpoint="'/v1/api/tabaadol-e-ketaab/log/list'"
    />
  </div>
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'logsList',
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
          filterable: false,
          divider: true,
        },
        {
          text: 'module',
          value: 'module',
          align: 'center',
          filterable: false,
          divider: true,
        },
        {
          text: 'status',
          value: 'code',
          align: 'center',
          filterable: true,
          filterType: 'text',
          filterName: 'code',
          divider: true,
        },
        {
          text: 'date',
          value: 'createdAt',
          align: 'center',
          filterable: true,
          filterType: 'date',
          filterName: 'createdAt',
          divider: true,
        },
        {
          text: 'user',
          value: 'user',
          align: 'left',
          class: 'ltr',
          filterable: false,
          divider: true,
        },
        {
          text: 'ip',
          value: 'ip',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'ua',
          value: 'ua',
          align: 'center',
          filterable: false,
          divider: true,
        },
      ],
    };
  },
};
</script>
