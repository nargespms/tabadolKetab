<template>
  <div>
    <lazyMessagesTable />
  </div>
</template>

<script>
import lazyMessagesTable from '../../components/messages/lazyMessagesTable.vue';

export default {
  name: 'messagesList',
  components: {
    lazyMessagesTable,
  },
};
</script>
