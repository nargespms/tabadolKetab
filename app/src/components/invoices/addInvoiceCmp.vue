<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="6" md="8">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('addInvoice') }}
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
        <v-form
          class="pt-6"
          ref="form"
          v-model="valid"
          lazy-validation
          onSubmit="return false;"
        >
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="barcode"
                :label="$t('barcode')"
                required
                outlined
                error-count="2"
                @keydown.enter="addItem"
                autofocus
              >
                <!-- :rules="barcodeRules" -->
                <!-- v-mask="'#########'" -->
                <template v-slot:prepend-inner>
                  <span class="red--text">
                    *
                  </span>
                </template>
              </v-text-field></v-col
            >
          </v-row>

          <div class="justify-center d-flex mb-4">
            <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="addItem"
            >
              {{ $t('addBook') }}
            </v-btn>
          </div>
        </v-form>
        <v-divider class="ma-4" v-if="invoiceItems.length > 0"></v-divider>

        <v-row class="pa-2">
          <invoiceItems
            v-if="invoiceItems.length > 0"
            :data="invoiceItems"
            :deletable="true"
            @deleteItem="deleteItem"
            :name="'invoiceItems'"
          />
        </v-row>
        <v-row>
          <deliveryMethod
            v-if="invoiceItems.length > 0"
            @setDeliveryMethod="setDeliveryMethod"
          />
        </v-row>
        <v-form class="pt-6" ref="form2" v-model="valid2" lazy-validation>
          <v-row v-if="invoiceItems.length > 0" class="pa-2">
            <v-col cols="12" md="6">
              <v-textarea
                outlined
                name="input-7-4"
                :label="$t('description')"
                v-model="invoice.desc"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6">
              <getClientByMobile
                @setUser="setUser"
                @clientError="clientError"
              />
            </v-col>
          </v-row>
          <div
            v-if="invoiceItems.length > 0"
            class="justify-center d-flex mb-4"
          >
            <v-btn color="success" class="mr-4 px-16" @click="addInvoice">
              {{ $t('register') }}
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-col>
    <notifMessage
      v-if="saveSuccess"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
      :type="'success'"
    />
    <notifMessage
      v-if="errorEnable"
      :msg="errorMsg"
      @hideNotif="hideNotif"
      :type="'error'"
    />
  </v-row>
</template>

<script>
import notifMessage from '../structure/notifMessage.vue';
import invoiceItems from './invoiceItems.vue';
import deliveryMethod from '../shoppingBag/deliveryMethod.vue';
import getClientByMobile from '../users/getClientByMobile.vue';

export default {
  name: 'addInvoiceCmp',
  components: {
    notifMessage,
    invoiceItems,
    deliveryMethod,
    getClientByMobile,
  },
  data() {
    return {
      valid: true,
      valid2: true,
      saveSuccess: false,
      errorEnable: false,
      errorMsg: '',
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      barcodeRules: [
        v => (v && v.length === 9) || `${this.$t('Charaters9')}`,
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
      ],

      barcode: '',
      invoiceItems: [],
      invoice: {},
      // user validation
      userValidate: true,
      clientId: '',
      usersKey: 0,
      delivery: 'PRESENCE',
      booksId: [],
    };
  },
  methods: {
    clientError() {
      this.errorEnable = true;
      this.errorMsg = 'clientNotFound';
    },
    setUser(value) {
      this.clientId = value;
    },
    invoiceList() {
      this.$router.push({
        name: 'invoicesList',
      });
    },
    addItem() {
      this.$refs.form.validate();

      // it should add item to invoice item
      // if (this.$refs.form.validate() && this.barcode.length === 9 && this.clientId.length>0) {
      this.$axios
        .get(`/v1/api/tabaadol-e-ketaab/book-number/${this.barcode}`)
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            this.invoiceItems.push(res.data);
            this.booksId.push(res.data.id);
            console.log(this.booksId);
            this.reset();
          }
        })
        .catch(e => {
          console.log(e);
          if (e.response.status === 404) {
            this.errorEnable = true;
            this.errorMsg = 'bookNotFound';
          }
          if (e.response.status === 422) {
            this.errorEnable = true;
            this.errorMsg = 'unvalidCharacter';
          }
        });
      // } else {
      //   this.errorEnable = true;
      //   this.errorMsg = 'pleaseFillTheInput';
      // }
    },

    deleteItem(item) {
      this.invoiceItems.pop(item);
    },
    // reset form
    reset() {
      this.$refs.form.reset();
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
    setDeliveryMethod(value) {
      this.delivery = value;
    },
    addInvoice() {
      this.$refs.form2.validate();
      // user validation

      if (this.$refs.form2.validate()) {
        this.$axios
          .post('/v1/api/tabaadol-e-ketaab/order', {
            clientId: this.clientId,
            type: 'BUY',
            delivery: this.delivery,
            booksId: this.booksId,
          })
          .then(res => {
            if (res.status === 200) {
              console.log(res);
              this.saveSuccess = true;
              this.$router.push({
                path: `/ordersList/${res.data.id}`,
              });
            }
          });
      }
      console.log(this.invoiceItems, this.invoice);
      // this.$router.push({ path: `/invoicesList/${response.id}` });
    },
  },
};
</script>
