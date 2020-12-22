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
    <v-row>
      <tabadolInfo />
    </v-row>
  </div>
</template>

<script>
import invoiceItems from './invoiceItems.vue';
import tabadolInfo from '../structure/tabadolInfo.vue';

export default {
  name: 'invoicePrintForm',
  components: {
    invoiceItems,
    tabadolInfo,
  },
  data() {
    return {
      invoiceItems: [],
      isLoading: true,
      invoice: {
        number: 1213456,
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
  mounted() {
    this.invoiceItems = [
      {
        name: 'ملت عشق',
        barcode: '121314156',
        mainPrice: '22000000',
        priceWithDiscount: '1100000',
      },
      {
        name: ' جین ایر',
        barcode: '45678900',
        mainPrice: '7900000',
        priceWithDiscount: '560000',
      },
      {
        name: ' دیوانه ای بالای بام ',
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
.invoicePrint {
  width: 8cm;
  margin: auto;
  font-size: 10px;
}
</style>
