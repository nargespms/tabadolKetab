<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="6" md="8">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('invoicePreview') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="white" @click="invoiceList"> fa fa-table</v-icon>
              </v-btn>
            </template>
            <span>
              {{ $t('invoicesList') }}
            </span>
          </v-tooltip>
        </v-card-actions>
        <v-row>
          <v-col cols="12" md="8" class="px-5 py-3">
            <div>
              <p>
                <span class="font-weight-black"> {{ $t('fullname') }} : </span>
                <span>
                  {{ invoice.client.firstName }}
                  {{ invoice.client.lastName }}
                </span>
              </p>
              <p>
                <span class="font-weight-black"> {{ $t('status') }} : </span>
                <span v-if="invoice.paid">
                  {{ $t('paid') }}
                  <v-icon color="success">mdi-check</v-icon>
                </span>
                <span v-if="!invoice.paid">
                  {{ $t('unpaid') }}
                  <v-icon color="error">mdi-close</v-icon>
                </span>
              </p>
            </div>
          </v-col>
        </v-row>
        <v-row class="pa-2">
          <invoiceItems
            v-if="!isLoading"
            :data="invoiceItems"
            :deletable="false"
          />
        </v-row>
        <v-row class="pa-5">
          <v-col cols="12" md="6" class="pa-0">
            <table class="generalTable ">
              <tr>
                <th class="text-right">{{ $t('booksPrice') }}</th>
                <td>{{ invoice.finalTotal }}</td>
              </tr>
              <tr>
                <th class="text-right">{{ $t('cashier') }}</th>
                <td>
                  <span v-if="invoice.staff">
                    {{ invoice.staff.firstName }} {{ invoice.staff.lastName }}
                  </span>
                </td>
              </tr>
              <tr>
                <th class="text-right">{{ $t('remainedCredit') }}</th>
                <td>{{ invoice.client.credit }}</td>
              </tr>
            </table>
          </v-col>

          <v-col cols="12" md="6" class="pa-0"
            ><table class="generalTable ">
              <tr>
                <th class="text-right">
                  {{ $t('booksPriceWithoutDiscount') }}
                </th>
                <td>
                  {{ invoice.total }}
                </td>
              </tr>
              <tr>
                <th class="text-right">{{ $t('clientName') }}</th>
                <td>
                  {{ invoice.client.firstName }} {{ invoice.client.lastName }}
                </td>
              </tr>
              <tr>
                <th class="text-right">{{ $t('issueDate') }}</th>
                <td>
                  <span v-if="invoice.paidDate">
                    {{ new Date(invoice.paidDate).toLocaleDateString('fa') }}
                  </span>
                </td>
              </tr>
            </table>
          </v-col>
        </v-row>
        <!-- <v-row class="pa-5">
          <div class="postGuide">
            <span class="blue--text text--accent-3">
              <v-icon color="primary">fas fa-motorcycle</v-icon>
              هزینه پیک به صورت نقدی دریافت میشود و مبلغ آن
              <span>
                20000 تومان
              </span>
              میباشد.
            </span>
          </div>
        </v-row> -->
        <div class="justify-center d-flex mb-4">
          <v-btn color="primary" class="mr-4 px-16" @click="printInvoice">
            <v-icon> mdi-printer</v-icon>
            {{ $t('print') }}
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import invoiceItems from './invoiceItems.vue';

export default {
  name: 'invoiceProfile',
  components: {
    invoiceItems,
  },
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      isLoading: true,
      invoiceItems: [],
      invoice: {
        // issueDate: '2020-11-24T20:30:00.000Z',
        // clientName: 'علی مشتری',
        // cashier: 'علی تبادلیان',
        // phone: '۰۹۱۲۶۷۸۹۳۴۵',
        // postalCode: '۱۴۷۵۲۳۶۸۶۳۴',
        // booksPriceWithoutDiscount: '125000 ریال',
        // remainedCredit: '20000 ریال',
        // booksPrice: '20000 ریال',
        // address: 'شهران خیابان طوقانی خیابان جهاد پلاک ۳۰ واحد ۷',
      },
    };
  },
  methods: {
    invoiceList() {
      this.$router.push({
        name: 'invoicesList',
      });
    },
    printInvoice() {
      const routeData = this.$router.resolve({
        name: 'printInvoice',
      });
      console.log(routeData);
      window.open(routeData.href, '_blank');
    },
  },
  mounted() {
    this.$axios
      .get(`/v1/api/tabaadol-e-ketaab/invoice/${this.$route.params.invoiceId}`)
      .then(res => {
        if (res.status === 200) {
          this.invoice = res.data;
          this.invoiceItems = res.data.books;
          this.isLoading = false;
        }
      });
  },
};
</script>
<style lang="scss">
.generalTable {
  border: thin solid rgba(0, 0, 0, 0.12);
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 8px;
  th,
  td {
    border: thin solid rgba(0, 0, 0, 0.12);
    font-weight: normal;
    padding: 8px;
  }
}
.postGuide {
  border: 1px solid #2979ff;
  padding: 4px 12px;
  border-radius: 3px;
}
</style>
