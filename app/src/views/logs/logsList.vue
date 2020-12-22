<template>
  <lazyLogTable />
</template>

<script>
import lazyLogTable from '../../components/logs/lazyLogTable.vue';

export default {
  name: 'logsList',
  components: {
    lazyLogTable,
  },
};
</script>
