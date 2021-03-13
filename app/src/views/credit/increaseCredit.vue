<template>
  <div>
    <addCredit />
  </div>
</template>

<script>
import addCredit from '../../components/credit/addCredit.vue';

export default {
  name: 'increaseCredit',
  metaInfo: {
    title: 'افزودن اعتبار',
  },
  components: {
    addCredit,
  },
};
</script>
