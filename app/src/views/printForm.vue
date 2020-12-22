<template>
  <div>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <postPrintForm
      v-if="!isLoading && this.$route.name === 'printPostRequest'"
    />
    <invoicePrintForm
      v-if="!isLoading && this.$route.name === 'printInvoice'"
    />
  </div>
</template>

<script>
import postPrintForm from '../components/post/postPrintForm.vue';
import invoicePrintForm from '../components/invoices/invoicePrintForm.vue';

export default {
  name: 'printForm',
  components: {
    postPrintForm,
    invoicePrintForm,
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
  },
};
</script>
