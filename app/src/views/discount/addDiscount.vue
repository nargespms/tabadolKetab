<template>
  <div>
    <addDiscountCmp />
  </div>
</template>

<script>
import addDiscountCmp from '../../components/discount/addDiscountCmp.vue';

export default {
  name: 'addDiscount',
  metaInfo: {
    title: 'افزودن تخفیف',
  },
  components: {
    addDiscountCmp,
  },
};
</script>
