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
                  {{ invoice.clientName }}
                </span>
              </p>
              <p>
                <span class="font-weight-black"> {{ $t('address') }} : </span>
                <span>
                  {{ invoice.address }}
                </span>
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <p>
              <span class="font-weight-black"> {{ $t('phone') }} : </span>
              <span>
                {{ invoice.phone }}
              </span>
            </p>
            <p>
              <span class="font-weight-black"> {{ $t('postalCode') }} : </span>
              <span>
                {{ invoice.postalCode }}
              </span>
            </p>
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
                <td>{{ invoice.booksPrice }}</td>
              </tr>
              <tr>
                <th class="text-right">{{ $t('cashier') }}</th>
                <td>{{ invoice.cashier }}</td>
              </tr>
              <tr>
                <th class="text-right">{{ $t('remainedCredit') }}</th>
                <td>{{ invoice.remainedCredit }}</td>
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
                  {{ invoice.booksPriceWithoutDiscount }}
                </td>
              </tr>
              <tr>
                <th class="text-right">{{ $t('clientName') }}</th>
                <td>{{ invoice.clientName }}</td>
              </tr>
              <tr>
                <th class="text-right">{{ $t('issueDate') }}</th>
                <td>
                  {{ new Date(invoice.issueDate).toLocaleDateString('fa') }}
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
  data() {
    return {
      isLoading: true,
      invoiceItems: [],
      invoice: {
        issueDate: '2020-11-24T20:30:00.000Z',
        clientName: 'علی مشتری',
        cashier: 'علی تبادلیان',
        phone: '۰۹۱۲۶۷۸۹۳۴۵',
        postalCode: '۱۴۷۵۲۳۶۸۶۳۴',
        booksPriceWithoutDiscount: '125000 ریال',
        remainedCredit: '20000 ریال',
        booksPrice: '20000 ریال',
        address: 'شهران خیابان طوقانی خیابان جهاد پلاک ۳۰ واحد ۷',
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
    this.invoiceItems = [
      {
        bookName: 'ملت عشق',
        barcode: '121314156',
        mainPrice: '22000000',
        priceWithDiscount: '1100000',
      },
      {
        bookName: ' جین ایر',
        barcode: '45678900',
        mainPrice: '7900000',
        priceWithDiscount: '560000',
      },
      {
        bookName: ' دیوانه ای بالای بام ',
        barcode: '678900342',
        mainPrice: '20000',
        priceWithDiscount: '15000',
      },
    ];
    this.isLoading = false;
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
