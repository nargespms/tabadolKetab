<template>
  <div>
    <userBuyReport />
    <categoryBuyReport class="mt-6" />
    <cashierFinanceReport class="mt-6" />
  </div>
</template>

<script>
import userBuyReport from './userBuyReport.vue';
import categoryBuyReport from './categoryBuyReport.vue';
import cashierFinanceReport from './cashierFinanceReport.vue';

export default {
  name: 'financialReportWrap',
  components: {
    userBuyReport,
    categoryBuyReport,
    cashierFinanceReport,
  },
};
</script>
