<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="6" md="8">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-card class="pa-4" v-if="!isLoading">
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
              :class="$vuetify.breakpoint.lg ? '' : 'tableMobileScroll'"
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
                  {{ moneyFormat(total) }}{{ $t('rial') }}
                </td>
              </tbody>
            </table>
          </v-col>
        </v-row>

        <v-row v-if="order.type !== 'SELL'">
          <v-col cols="12" md="7">
            <payMethod
              v-if="$store.state.bookShop.userInfo.role === 'CLIENT'"
              :data="clientData"
              @setMethod="setMethod"
              :initValue="paidWay"
          /></v-col>
          <v-col cols="12" md="5">
            <discountCode
              @changeOrderTotal="changeOrderTotal"
              @errorCoupon="errorCoupon"
              :invoiceId="order.type !== 'SELL' ? order.invoice.id : ''"
            />
          </v-col>
        </v-row>

        <v-form>
          <div class="justify-center d-flex mt-4">
            <v-btn
              color="success"
              class="px-16 py-5"
              @click="pay"
              :disabled="order.type !== 'SELL' ? order.invoice.paid : true"
            >
              {{ $t('payment') }}
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-col>
    <v-dialog v-model="enableCreditWarn" max-width="500px">
      <creditWarning
        :title="'notEnoughCredit'"
        :amount="creditAmount"
        @accept="acceptIncrease"
        @reject="closeWarn"
      />
    </v-dialog>
    <v-dialog v-model="submitPay" max-width="500px" persistent>
      <promptDialog
        :title="'orderSubmit'"
        :message="'orderHasBeenSubmitted'"
        @accept="accept"
        :cancelBut="false"
      />
    </v-dialog>
    <v-dialog v-model="addCreditModal" max-width="1000px">
      <addCredit
        :data="clientCredit"
        :mode="'modal'"
        @closeModal="closeAddCredit"
      />
    </v-dialog>
    <notifMessage
      v-if="saveSuccess"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
      :type="'success'"
    />
    <notifMessage
      v-if="error"
      :msg="errorMsg"
      @hideNotif="hideError"
      :type="'error'"
    />
  </v-row>
</template>

<script>
import invoiceItems from '../invoices/invoiceItems.vue';
import payMethod from '../shoppingBag/payMethod.vue';
import promptDialog from '../structure/promptDialog.vue';
import notifMessage from '../structure/notifMessage.vue';
import discountCode from '../discount/discountCode.vue';
import creditWarning from '../credit/creditWarning.vue';
import addCredit from '../credit/addCredit.vue';
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'orderPreview',
  components: {
    invoiceItems,
    payMethod,
    discountCode,
    creditWarning,
    promptDialog,
    addCredit,
    notifMessage,
  },
  props: {
    id: {
      type: String,
    },
  },
  mixins: [moneyFormat],
  data() {
    return {
      valid: true,
      isLoading: true,
      orderItems: [],
      status: [
        'INPROGRESS',
        'CANCEL',
        'READYTOSEND',
        'SENDING',
        'RECEIVED',
        'TAKEN',
      ],
      order: {},
      staffData: ['CREDIT'],
      clientData: ['CREDIT', 'ONLINE', 'PRESENCE'],
      // credit warn
      enableCreditWarn: false,
      creditAmount: '',
      paidWay: 'CREDIT',
      submitPay: false,
      addCreditModal: false,
      clientCredit: {},
      // notif
      error: false,
      errorMsg: '',
      saveSuccess: false,
      changeAmount: '',
      amountKey: 0,
    };
  },
  methods: {
    closeAddCredit() {
      this.addCreditModal = false;
      this.enableCreditWarn = false;
    },
    changeOrderTotal(value) {
      if (this.order.type !== 'SELL') {
        this.order.invoice.finalTotal = value;
      }
      this.saveSuccess = true;

      this.changeAmount = 'green lighten-1';
      this.amountKey += 1;

      setTimeout(
        function dynamicClass() {
          this.changeAmount = '';
        }.bind(this),
        2000
      );
    },
    errorCoupon() {
      this.error = true;
      this.errorMsg = 'invalidCoupon';
    },
    hideNotif() {
      this.saveSuccess = false;
    },
    hideError() {
      this.error = false;
    },
    setDate(value) {
      // this valu is persian date
      // it should convert to gregorian
      console.log(value);
    },
    update() {
      console.log('updated');
    },
    cancel() {
      console.log('updated');
    },
    setMethod(value) {
      this.paidWay = value;
    },
    pay() {
      if (this.paidWay === 'ONLINE') {
        this.$axios
          .post('/v1/api/tabaadol-e-ketaab/credit', {
            orderId: this.order.id,
            paidWay: this.paidWay,
          })
          .then(res => {
            if (res.status === 200) {
              console.log(res);
              window.open(res.data.link, '_blank');
              this.$store.commit('bookShop/clearBag', {
                module: 'bookShop',
              });
            }
          });
      } else if (this.paidWay === 'CREDIT') {
        this.$axios
          .patch(
            `/v1/api/tabaadol-e-ketaab/payment/invoice/${this.order.invoice.id}`
          )
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$store.commit('bookShop/clearBag', {
                module: 'bookShop',
              });
              this.$router.push({
                name: 'ordersList',
              });
            }
          })
          .catch(e => {
            if (e.response.status === 406) {
              this.enableCreditWarn = true;
              console.log(e.response);
              // the credit is in response message
              this.creditAmount = e.response.data.message;
            } else if (e.response.status === 404) {
              // should warn no book found
            }
          });
      } else if (this.paidWay === 'PRESENCE') {
        this.$axios
          .patch(`/v1/api/tabaadol-e-ketaab/order/${this.order.id}`, {
            status: 'SUBMITTED',
          })
          .then(res => {
            if (res.status === 200) {
              this.submitPay = true;
            }
          });
      }
    },
    acceptIncrease() {
      this.addCreditModal = true;
      this.clientCredit.credit = this.creditAmount;
      this.clientCredit.clientId = this.order.client.id;
      this.$store.commit('bookShop/clearBag', {
        module: 'bookShop',
      });
    },
    closeWarn() {
      this.enableCreditWarn = false;
    },
    accept() {
      this.$router.push({
        name: 'ordersList',
      });
      this.$store.commit('bookShop/clearBag', {
        module: 'bookShop',
      });
    },
    close() {
      this.submitPay = false;
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
    this.$axios
      .get(`/v1/api/tabaadol-e-ketaab/order/${this.$route.params.orderId}`)
      .then(res => {
        if (res.status === 200) {
          this.order = res.data;
          if (res.data.type !== 'SELL') {
            console.log('ss');
            this.finalTotal = res.data.invoice.finalTotal;
            this.orderItems = res.data.invoice.books;
          } else {
            this.orderItems = res.data.books;
          }

          this.isLoading = false;
        }
      });
  },
};
</script>
