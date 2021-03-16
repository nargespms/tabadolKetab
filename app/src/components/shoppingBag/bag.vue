<template>
  <v-row class="justify-center">
    <v-col cols="12" lg="11">
      <v-card class="pb-3">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              <v-icon color="white">fas fa-shopping-basket</v-icon>
              {{ $t('shoppingBasket') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
        </v-card-actions>
        <div class=" mb-4">
          <v-row class="pa-2 justify-center">
            <v-col lg="10">
              <invoiceItems
                v-if="!isLoading"
                :data="items"
                :deletable="true"
                @deleteItem="deleteItem"
                :key="itemsKey"
              />
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-form v-model="valid" lazy-validation ref="form">
            <v-row class="justify-center">
              <v-col cols="12" lg="10" align-self="center">
                <deliveryMethod @setDeliveryMethod="setDeliveryMethod" />

                <div
                  class="primary--text  pointer px-2"
                  @click="addressModalEnable = true"
                  v-if="$store.state.bookShop.loggedIn"
                >
                  <v-icon color="primary" class="fn18"
                    >mdi-subdirectory-arrow-left</v-icon
                  >
                  <v-icon class="primary--text">mdi-google-maps</v-icon>
                  <span class="fn13">
                    {{ $t('selectAddress') }}
                  </span>
                  <span class="fn13 black--text pr-4">
                    {{ selectedAddress }}
                  </span>
                </div>
                <v-dialog v-model="addressModalEnable" max-width="500px">
                  <addressCmp
                    @hideAddressList="hideAddressList"
                    @setAddress="setAddress"
                    state="list"
                    :toolBar="true"
                    :selective="true"
                  />
                </v-dialog>
              </v-col>
            </v-row>
            <div class="justify-center d-flex mt-4">
              <v-btn
                :disabled="!valid"
                color="success"
                class="px-16 py-5"
                @click="pay"
              >
                {{ $t('saveOrder') }}
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-card>
    </v-col>
    <v-dialog v-model="loginMsgEnable" max-width="500px">
      <promptDialog
        :title="loginTitle"
        :message="loginMsg"
        @accept="acceptLogin"
        @reject="closeLogin"
      />
    </v-dialog>
    <notifMessage
      v-if="errorEnable"
      :msg="errorMsg"
      @hideNotif="hideError"
      :type="'error'"
    />
  </v-row>
</template>

<script>
import invoiceItems from '../invoices/invoiceItems.vue';
import addressCmp from '../address/addressCmp.vue';
import notifMessage from '../structure/notifMessage.vue';
import deliveryMethod from './deliveryMethod.vue';
import moneyFormat from '../../mixins/moneyFormat.js';
import promptDialog from '../structure/promptDialog.vue';

export default {
  name: 'bag',
  components: {
    invoiceItems,
    addressCmp,
    notifMessage,
    deliveryMethod,
    promptDialog,
  },
  mixins: [moneyFormat],

  data() {
    return {
      isLoading: true,
      items: [],
      delivery: ['PRESENCE', 'TABADOL', 'TIPAX', 'POST'],
      bag: {
        delivery: 'PRESENCE',
      },
      valid: true,
      addressModalEnable: false,
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      totalPrice: 12000000,
      itemsKey: 0,
      selectedAddress: '',
      orderLoading: false,
      // invoice
      orderLoaded: false,
      orderId: '',
      // error
      errorEnable: false,
      errorMsg: '',
      // login error
      loginProblem: false,
      loginMsgEnable: false,
      loginMsg: '',
      loginTitle: '',
    };
  },
  methods: {
    hideAddressList() {
      this.addressModalEnable = false;
    },
    setAddress(value) {
      this.selectedAddress = value.address;
      this.bag.addressId = value.id;
      console.log(value);
    },
    deleteItem(item) {
      this.$store.commit('bookShop/removeFromBag', item, {
        module: 'bookShop',
      });
      // this.itemsKey = +1;
      this.getItems();
    },

    setDeliveryMethod(value) {
      this.bag.delivery = value;
    },
    acceptLogin() {
      this.$router.push({
        name: 'login',
      });
    },
    closeLogin() {
      this.loginMsgEnable = false;
    },
    pay() {
      this.orderLoading = true;
      this.$refs.form.validate();

      if (!this.$store.state.bookShop.loggedIn) {
        this.loginProblem = true;
      }

      if (this.$refs.form.validate() && !this.loginProblem) {
        this.$axios
          .post('/v1/api/tabaadol-e-ketaab/order', { ...this.bag, type: 'BUY' })
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              this.orderId = res.data.id;
              this.orderLoaded = true;
              this.orderLoading = false;
              this.$emit('getOrderData', this.orderId);
            }
          })
          .catch(e => {
            this.orderLoading = false;
            if (e.response.status === 406) {
              this.orderLoading = false;
              this.errorEnable = true;
              this.errorMsg = 'selectYourAddress';
            }
            if (e.response.status === 404) {
              this.orderLoading = false;
              this.errorEnable = true;
              this.errorMsg = 'Thisbookissoldorreservedorregisteredbyclient';
            }
          });
      } else if (this.loginProblem) {
        this.loginMsgEnable = true;
        this.loginTitle = 'registerOrLogin';
        this.loginMsg = 'youShouldregisterOrloginFirst';
      } else {
        this.orderLoading = false;
        this.errorEnable = true;
        this.errorMsg = 'selectYourAddress';
      }
    },
    getItems() {
      this.items = [...this.$store.state.bookShop.bag];
      this.bag.booksId = this.$store.state.bookShop.bag.map(item => item.id);
      console.log(this.$store.state.bookShop.bag.map(item => item.id));
      this.isLoading = false;
    },
    hideError() {
      this.errorEnable = false;
    },
  },
  mounted() {
    this.getItems();
  },
};
</script>
