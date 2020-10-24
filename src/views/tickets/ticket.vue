<template>
  <div>
    ticketID {{ $route.params.ticketId }}
    <ticketCmp />
  </div>
</template>

<script>
import ticketCmp from '../../components/tickets/ticketCmp.vue';

export default {
  name: 'ticket',
  components: {
    ticketCmp,
  },
};
</script>
