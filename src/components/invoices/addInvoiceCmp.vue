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
              ></v-text-field
            ></v-col>
            <v-col cols="12" md="6">
              <usersAutocomplete
                ref="userAutocomplete"
                :validate="true"
                :height="32"
              />
            </v-col>
          </v-row>

          <div class="justify-center d-flex">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="addItem"
            >
              {{ $t('addBook') }}
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
      v-if="errorMsg"
      :msg="'someThingWentWrong'"
      @hideNotif="hideNotif"
      :type="'error'"
    />
  </v-row>
</template>

<script>
import usersAutocomplete from '../structure/usersAutoComplete.vue';
import notifMessage from '../structure/notifMessage.vue';

export default {
  name: 'addInvoiceCmp',
  components: {
    usersAutocomplete,
    notifMessage,
  },
  data() {
    return {
      valid: true,
      saveSuccess: false,
      errorMsg: false,
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      barcode: '',
    };
  },
  methods: {
    invoiceList() {
      this.$router.push({
        name: 'invoicesList',
      });
      // validate form
    },
    addItem() {
      this.$refs.form.validate();
      console.log(this.barcode);
      // the barcode should check via back and if it was successfull
      // it should add item to invoice item
      if (this.barcode.length === 9) {
        this.reset();
        this.saveSuccess = true;
      } else {
        this.errorMsg = true;
      }
      if (this.$refs.form.validate()) {
        this.saveSuccess = true;
      } else {
        this.valid = false;
      }
    },
    // reset form
    reset() {
      this.$refs.form.reset();
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
  },
};
</script>
