<template>
  <addTicket :mode="'addPage'"/>
</template>



<script>
import addTicket from '../../components/tickets/addTicket.vue';

export default {
  name:'createNewTicket',
  components:{
    addTicket
  },
}
</script>
