<template>
  <div>
    <ticketCmp />
  </div>
</template>

<script>
import ticketCmp from '../../components/tickets/ticketCmp.vue';

export default {
  name: 'ticket',
  metaInfo: {
    title: 'مشاهده تیکت',
  },
  components: {
    ticketCmp,
  },
};
</script>
