<template>
  <v-row no-gutters class="justify-center">
    <v-col>
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-card>
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('increaseCredit') }} / {{ $t('decreaseCredit') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="white" @click="transactionList">
                  fa fa-table</v-icon
                >
              </v-btn>
            </template>
            <span>
              {{ $t('creditList') }}
            </span>
          </v-tooltip>
        </v-card-actions>
        <v-form ref="form" v-model="valid" lazy-validation class="pa-4">
          <v-row>
            <v-col>
              <v-text-field
                v-if="queryGet"
                v-model="credit.credit"
                :rules="requireRule"
                :label="$t('cost')"
                required
                outlined
                error-count="1"
                :hint="
                  this.credit.credit
                    ? `${$t('costInRial')}${moneyFormat(credit.credit)}`
                    : ''
                "
                persistent-hint
              >
                <template v-slot:prepend-inner>
                  <span class="red--text">
                    *
                  </span>
                </template>
              </v-text-field>
              <div>
                <clientsAutoComplete
                  v-if="this.$store.state.bookShop.userInfo.role !== 'CLIENT'"
                  ref="userAutocomplete"
                  :isRequired="
                    this.$store.state.bookShop.userInfo.role !== 'CLIENT'
                      ? true
                      : false
                  "
                  @setUser="setClient"
                  :placeHolder="'clients'"
                  dynamicClass="pb-7"
                  :editDataId="clientId"
                />
              </div>
              <payMethod
                v-if="this.$store.state.bookShop.userInfo.role !== 'CLIENT'"
                @setMethod="setMethod"
                :data="payMethods"
              />
              <v-textarea
                outlined
                name="input-7-4"
                :label="$t('description')"
                v-model="credit.description"
                counter
                :rules="rules"
              ></v-textarea>
            </v-col>
          </v-row>
          <div class="justify-center d-flex">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              {{ $t('register') }}
            </v-btn>

            <v-btn color="error" class="mr-4" @click="reset"
              >{{ $t('resetForm') }}
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
  </v-row>
</template>

<script>
import notifMessage from '../structure/notifMessage.vue';
import clientsAutoComplete from '../structure/clientsAutoComplete.vue';
import payMethod from '../shoppingBag/payMethod.vue';
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'addCredit',
  components: {
    notifMessage,
    clientsAutoComplete,
    payMethod,
  },
  props: {
    data: {
      type: Object,
    },
    mode: {
      type: String,
    },
  },
  mixins: [moneyFormat],

  data() {
    return {
      valid: true,
      saveSuccess: false,
      credit: {},
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      rules: [v => (v && v.length >= 15) || `${this.$t('minCharaters15')}`],
      clientValidate: true,
      endpoint: '',
      method: '',
      clientId: '',
      isLoading: false,
      queryGet: false,
      payMethods: ['POZ', 'CARD', 'CASH', 'GIFT'],
    };
  },
  methods: {
    setClient(value) {
      this.clientId = value;
    },
    setMethod(value) {
      this.credit.paidWay = value;
    },
    transactionList() {
      this.$router.push({
        name: 'creditList',
      });
    },
    validate() {
      this.$refs.form.validate();
      // user validate
      if (this.$store.state.bookShop.userInfo.role !== 'CLIENT') {
        if (this.$refs.userAutocomplete.model === null) {
          this.clientValidate = false;
        } else {
          this.clientValidate = true;
        }
      }

      if (this.$store.state.bookShop.userInfo.role === 'CLIENT') {
        this.endpoint = '/v1/api/tabaadol-e-ketaab/credit';
        this.method = 'post';
      } else {
        this.endpoint = `/v1/api/tabaadol-e-ketaab/credit/${this.clientId}`;
        this.method = 'patch';
      }

      if (this.$refs.form.validate() && this.clientValidate) {
        this.isLoading = true;
        this.$axios[this.method](this.endpoint, { ...this.credit }).then(
          res => {
            if (res.status === 200) {
              if (this.$store.state.bookShop.userInfo.role === 'CLIENT') {
                window.open(res.data.link, '_blank');
              }
              if (this.mode === 'modal') {
                this.$emit('closeModal');
              }
              this.isLoading = false;
              this.saveSuccess = true;
              this.reset();
            }
          }
        );
      } else {
        this.valid = false;
      }
    },
    reset() {
      this.$refs.form.reset();
      this.userValidate = true;
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
      this.userValidate = true;
    },
  },
  watch: {
    credit(newVal) {
      this.credit = newVal;
    },
    data(newVal) {
      this.credit.credit = newVal.credit;
      this.clientId = newVal.clientId;
      this.queryGet = true;
    },
    clientId(newVal) {
      this.credit.clientId = newVal;
    },
  },
  mounted() {
    if (this.mode === 'modal') {
      this.credit.credit = this.data.credit;
      this.clientId = this.data.clientId;
      this.queryGet = true;
    }
    if (this.mode !== 'modal' && this.$route.query) {
      this.credit.credit = this.$route.query.credit;
      this.queryGet = true;
    } else {
      this.queryGet = true;
    }
  },
};
</script>
