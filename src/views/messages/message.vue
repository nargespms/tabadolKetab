<template>
  <div>
    <span> messageId: {{ $route.params.messageId }} </span>
    <addMessageCmp :mode="'edit'" :cardName="'editMessage'" />
  </div>
</template>

<script>
import addMessageCmp from '../../components/messages/addMessageCmp.vue';

export default {
  name: 'message',
  components: {
    addMessageCmp,
  },
};
</script>
