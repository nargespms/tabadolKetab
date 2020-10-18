<template>
  <div>
    <addMessageCmp :mode="'addPage'" />
  </div>
</template>


<script>
import addMessageCmp from '../../components/messages/addMessageCmp.vue';

export default {
  name: 'createNewMsg',
  components: {
    addMessageCmp,
  },
};
</script>
