<template>
  <orderPreview />
</template>

<script>
import orderPreview from '../../components/orders/orderPreview.vue';

export default {
  name: 'orderPage',
  metaInfo: {
    title: 'مشاهده سفارش',
  },
  components: {
    orderPreview,
  },
};
</script>
