<template>
  <div class="invoicePrint">
    <v-row class="pa-2">
      <v-col cols="12" md="4" class="align-self-center">
        <span class="font-weight-black">
          {{ invoice.number }}
        </span>
      </v-col>
      <v-col cols="12" md="4" class="align-self-center">
        <span class="font-weight-black">
          {{ $t('changing') }} {{ $t('book') }}
        </span>
      </v-col>
      <v-col cols="12" md="4">
        <img src="../../assets/tabadollogo1.png" />
      </v-col>
    </v-row>
    <v-row class="pa-2">
      <invoiceItems v-if="!isLoading" :data="invoiceItems" :deletable="false" />
    </v-row>
    <v-row class="px-5">
      <v-col cols="12" md="6" class="pa-0">
        <table class="generalTable colaps">
          <tr>
            <th class="text-right minh-77">{{ $t('finalTotalBuy') }}</th>
            <td class="minh-77">
              {{ this.moneyFormat(invoice.finalTotal) }}{{ $t('rial') }}
            </td>
          </tr>
          <tr>
            <th class="text-right minh-77">{{ $t('cashier') }}</th>
            <td class="minh-77">
              {{ invoice.staff.firstName }} {{ invoice.staff.lastName }}
            </td>
          </tr>
          <tr>
            <th class="text-right minh-77">{{ $t('remainedCredit') }}</th>
            <td class="minh-77">
              {{ this.moneyFormat(invoice.credit) }} {{ $t('rial') }}
            </td>
          </tr>
        </table>
      </v-col>

      <v-col cols="12" md="6" class="pa-0"
        ><table class="generalTable colaps">
          <tr>
            <th class="text-right minh-77">
              {{ $t('booksPriceWithoutDiscount') }}
            </th>
            <td class="minh-77">
              <span>
                {{ this.moneyFormat(invoice.total) }}{{ $t('rial') }}
              </span>
            </td>
          </tr>
          <tr>
            <th class="text-right minh-77">{{ $t('clientName') }}</th>
            <td class="minh-77">
              {{ invoice.client.firstName }} {{ invoice.client.lastName }}
            </td>
          </tr>
          <tr>
            <th class="text-right minh-77">{{ $t('issueDate') }}</th>
            <td class="minh-77">
              {{ new Date(invoice.createdAt).toLocaleDateString('fa') }}
            </td>
          </tr>
        </table>
      </v-col>
    </v-row>
    <v-row>
      <tabadolInfo />
    </v-row>
  </div>
</template>

<script>
import invoiceItems from './invoiceItems.vue';
import tabadolInfo from '../structure/tabadolInfo.vue';
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'invoicePrintForm',
  components: {
    invoiceItems,
    tabadolInfo,
  },
  mixins: [moneyFormat],
  data() {
    return {
      invoiceItems: [],
      isLoading: true,
      invoice: {},
    };
  },
  methods: {
    getData() {
      console.log(this.$route.params.invoiceId);
      this.$axios
        .get(
          `/v1/api/tabaadol-e-ketaab/invoice/${this.$route.params.invoiceId}`
        )
        .then(res => {
          if (res.status === 200) {
            console.log(res.data);
            this.invoice = res.data;
            this.invoiceItems = res.data.books;
            this.isLoading = false;
          }
        });
    },
  },
  mounted() {
    this.getData();
    this.isLoading = false;
  },
};
</script>

<style lang="scss">
.invoicePrint {
  width: 8cm;
  margin: auto;
  font-size: 10px;
}
.minh-77 {
  min-height: 77px;
}
.colaps {
  /* display: inline-flex; */
  border-collapse: initial;
}
</style>
