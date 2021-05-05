<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="6" md="8">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-card class="pa-4 mt-5" v-if="!isLoading">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('orderPreview') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-row>
          <v-col cols="12" class="px-5 py-3">
            <div class="d-flex justify-space-between flex-wrap">
              <p>
                <span class="font-weight-black"> {{ $t('fullname') }} : </span>
                <span>
                  {{ order.client.firstName }}
                  {{ order.client.lastName }}
                </span>
              </p>
              <p>
                <span class="font-weight-black"> {{ $t('address') }} : </span>
                <span v-if="order.address">
                  {{ order.address.address }}
                </span>
              </p>
              <p>
                <span class="font-weight-black">
                  {{ $t('postalCode') }} :
                </span>
                <span v-if="order.address">
                  {{ order.address.zipCode }}
                </span>
              </p>
              <p>
                <span class="font-weight-black"> {{ $t('mobile') }} : </span>
                <span class="numberDir">
                  {{ order.client.mobile }}
                </span>
              </p>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <invoiceItems
            v-if="!isLoading"
            :data="orderItems"
            :deletable="false"
          />
        </v-row>
        <v-row>
          <v-col>
            <table
              class="generalTable"
              :class="$vuetify.breakpoint.xl ? '' : 'tableMobileScroll'"
            >
              <thead class=" grey lighten-2">
                <th>
                  {{ $t('createdAt') }}
                </th>
                <th>
                  {{ $t('orderType') }}
                </th>
                <th>
                  {{ $t('orderNumber') }}
                </th>
                <th>
                  {{ $t('finalTotal') }}
                </th>
              </thead>
              <tbody>
                <td>
                  {{ new Date(order.createdAt).toLocaleDateString('fa') }}
                </td>
                <td>
                  {{ $t(order.type) }}
                </td>
                <td>
                  {{ order.number }}
                </td>
                <td
                  :key="amountKey"
                  :class="changeAmount"
                  transition="scale-transition"
                >
                  {{ this.moneyFormat(total) }}{{ $t('rial') }}
                </td>
              </tbody>
            </table>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import invoiceItems from '../invoices/invoiceItems.vue';
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'orderPrintForm',
  components: {
    invoiceItems,
  },
  mixins: [moneyFormat],

  data() {
    return {
      valid: true,
      isLoading: true,
      orderItems: [],

      order: {},
      staffData: ['CREDIT'],
      clientData: ['CREDIT', 'ONLINE', 'PRESENCE'],
      // credit warn
      paidWay: 'CREDIT',
      clientCredit: {},
      // notif
      changeAmount: '',
      amountKey: 0,
    };
  },
  methods: {
    setMethod(value) {
      this.paidWay = value;
    },
    getData() {
      this.$axios
        .get(`/v1/api/tabaadol-e-ketaab/order/${this.$route.params.orderId}`)
        .then(res => {
          if (res.status === 200) {
            this.order = res.data;
            if (res.data.type !== 'SELL') {
              this.finalTotal = res.data.invoice.finalTotal;
              this.orderItems = res.data.invoice.books;
            } else {
              this.orderItems = res.data.books;
            }

            this.isLoading = false;
          }
        });
    },
  },
  watch: {
    order(newVal) {
      if (this.order.type !== 'SELL') {
        this.finalTotal = newVal.invoice.finalTotal;
      } else {
        this.finalTotal = '';
      }
    },
  },
  computed: {
    total() {
      if (this.order.type !== 'SELL') {
        return this.order.invoice.finalTotal;
      }
      return 0;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
