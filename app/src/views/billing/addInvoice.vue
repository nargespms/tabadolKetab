<template>
  <addInvoiceCmp />
</template>

<script>
import addInvoiceCmp from '../../components/invoices/addInvoiceCmp.vue';

export default {
  name: 'invoices',
  metaInfo: {
    title: 'افزودن فاکتور',
  },
  components: {
    addInvoiceCmp,
  },
};
</script>
