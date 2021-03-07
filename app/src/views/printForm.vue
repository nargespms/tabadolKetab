<template>
  <div>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <postPrintForm
      v-if="!isLoading && this.$route.name === 'printPostRequest'"
    />
    <orderPrintForm v-if="!isLoading && this.$route.name === 'printOrder'" />
    <invoicePrintForm
      v-if="!isLoading && this.$route.name === 'printInvoice'"
    />
  </div>
</template>

<script>
import postPrintForm from '../components/post/postPrintForm.vue';
import orderPrintForm from '../components/orders/orderPrintForm.vue';
import invoicePrintForm from '../components/invoices/invoicePrintForm.vue';

export default {
  name: 'printForm',
  components: {
    postPrintForm,
    invoicePrintForm,
    orderPrintForm,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    if (this.$route.name === 'printPostRequest') {
      this.isLoading = false;
    }
    if (this.$route.name === 'printInvoice') {
      this.isLoading = false;
    }
    if (this.$route.name === 'printOrder') {
      this.isLoading = false;
    }
  },
};
</script>
