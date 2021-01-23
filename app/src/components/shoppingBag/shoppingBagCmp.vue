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
                <div class="pa-3 d-flex align-center ">
                  <span class="font-weight-black"> {{ $t('sendWay') }} : </span>
                  <v-radio-group
                    v-model="bag.recycle"
                    row
                    class="pr-6"
                    :rules="requireRule"
                  >
                    <v-radio
                      :label="$t('tabadolPost')"
                      value="tabadolPost"
                      class="pr-6"
                    ></v-radio>
                    <v-radio
                      :label="$t('post')"
                      value="post"
                      class="pr-6"
                    ></v-radio>
                    <v-radio
                      :label="$t('tipox')"
                      value="tipox"
                      class="pr-6"
                    ></v-radio>
                    <v-radio
                      :label="$t('recieveInPerson')"
                      value="recieveInPerson"
                      class="pr-6"
                    ></v-radio>
                  </v-radio-group>
                </div>
                <div
                  class="primary--text  pointer px-2"
                  @click="addressModalEnable = true"
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
                  />
                </v-dialog>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="justify-center">
              <v-col cols="12" lg="10">
                <div class="pa-3 grey lighten-2 br-rd-3 text-center">
                  <span class="font-weight-medium">
                    {{ $t('totalPrice') }} :
                    {{ moneyFormat(totalPrice) }}
                    {{ $t('rial') }}
                  </span>
                </div>
                <div class="pa-3 d-flex align-center ">
                  <span class="font-weight-black">
                    {{ $t('payMethod') }} :
                  </span>
                  <v-radio-group
                    v-model="bag.payMethod"
                    row
                    class="pr-6"
                    :rules="requireRule"
                  >
                    <v-radio
                      :label="$t('creditPay')"
                      value="creditPay"
                      class="pr-6"
                    ></v-radio>
                    <v-radio
                      :label="$t('onlinePay')"
                      value="onlinePay"
                      class="pr-6"
                    ></v-radio>
                    <v-radio
                      :label="$t('presentPay')"
                      value="presentPay"
                      class="pr-6"
                    ></v-radio>
                  </v-radio-group>
                </div>
              </v-col>
            </v-row>
            <div class="justify-center d-flex">
              <v-btn
                :disabled="!valid"
                color="success"
                class="px-16 py-5"
                @click="pay"
              >
                {{ $t('pay') }}
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import invoiceItems from '../invoices/invoiceItems.vue';
import addressCmp from '../userControls/addressCmp.vue';

export default {
  name: 'shoppingBagCmp',
  components: {
    invoiceItems,
    addressCmp,
  },
  data() {
    return {
      isLoading: true,
      items: [],
      bag: {},
      valid: true,
      addressModalEnable: false,
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      totalPrice: 12000000,
      itemsKey: 0,
      selectedAddress: '',
    };
  },
  methods: {
    hideAddressList() {
      this.addressModalEnable = false;
    },
    setAddress(value) {
      this.selectedAddress = value.address;
    },
    deleteItem(item) {
      this.$store.commit('bookShop/removeFromBag', item, {
        module: 'bookShop',
      });
      // this.itemsKey = +1;
      this.getItems();
    },
    moneyFormat(value) {
      return new Intl.NumberFormat('es-ES').format(value);
    },
    pay() {
      this.$refs.form.validate();
    },
    getItems() {
      this.items = [...this.$store.state.bookShop.bag];
      this.isLoading = false;
    },
  },
  mounted() {
    this.getItems();
  },
};
</script>

<style lang="scss">
.br-rd-3 {
  border-radius: 3px;
}
</style>
