<template>
  <div>
    <barcodePrint />
  </div>
</template>

<script>
import barcodePrint from '../components/barcode/barcodePrint.vue';

export default {
  name: 'barcodePage',
  components: {
    barcodePrint,
  },
};
</script>
