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
        <v-form class="pt-6" ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="barcode"
                :rules="requireRule"
                :label="$t('barcode')"
                required
                outlined
                v-mask="'#########'"
                error-count="1"
                @keydown.enter="addItem"
                autofocus
              ></v-text-field
            ></v-col>
            <v-col cols="12" md="6">
              <usersAutocomplete
                ref="userAutocomplete"
                :validate="userValidate"
                :height="32"
              />
            </v-col>
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
        <v-row v-if="invoiceItems.length > 0" class="pa-2">
          <v-col>
            <v-textarea
              outlined
              name="input-7-4"
              :label="$t('description')"
              v-model="invoice.desc"
            ></v-textarea>
          </v-col>
        </v-row>
        <div v-if="invoiceItems.length > 0" class="justify-center d-flex mb-4">
          <v-btn color="success" class="mr-4 px-16" @click="addInvoice">
            {{ $t('register') }}
          </v-btn>
        </div>
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
import usersAutocomplete from '../structure/usersAutoComplete.vue';
import notifMessage from '../structure/notifMessage.vue';
import invoiceItems from './invoiceItems.vue';

export default {
  name: 'addInvoiceCmp',
  components: {
    usersAutocomplete,
    notifMessage,
    invoiceItems,
  },
  data() {
    return {
      valid: true,
      saveSuccess: false,
      errorEnable: false,
      errorMsg: '',
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      barcode: '',
      invoiceItems: [],
      invoice: {},
      // user validation
      userValidate: true,
    };
  },
  methods: {
    invoiceList() {
      this.$router.push({
        name: 'invoicesList',
      });
    },
    addItem() {
      this.$refs.form.validate();
      console.log(this.barcode);
      // user validation
      if (
        this.$refs.userAutocomplete.users === null ||
        this.$refs.userAutocomplete.users.length < 1
      ) {
        this.userValidate = false;
      } else {
        this.userValidate = true;
      }
      // the barcode should check via back and if it was successfull
      // it should add item to invoice item
      if (
        this.$refs.form.validate() &&
        this.barcode.length === 9 &&
        this.userValidate
      ) {
        this.reset();
        const item = {
          bookName: 'ملت عشق',
          barcode: '121314156',
          mainPrice: '22000000',
          priceWithDiscount: '1100000',
        };
        this.invoiceItems.push(item);
      } else {
        this.errorEnable = true;
        this.errorMsg = 'pleaseFillTheInput';
      }
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
    addInvoice() {
      console.log(this.invoiceItems, this.invoice);
      this.invoice.desc = '';
      this.saveSuccess = true;
      // this.$router.push({ path: `/invoicesList/${response.id}` });
    },
  },
};
</script>
