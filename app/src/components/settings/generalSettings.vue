<template>
  <v-row>
    <v-col cols="12" md="7" class="ma-auto">
      <v-card class="pa-3">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <v-icon color="white" class="pl-4">
              fas fa-cog
            </v-icon>
            <span>
              {{ $t('generalSettings') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-form lazy-validation class="pa-4" ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" md="6" class="pa-0">
              <span class="d-block mt-md-3 mb-3 mb-md-0">
                {{ $t('numberOfFreePostOfBook') }}
              </span>
            </v-col>
            <v-col cols="12" md="6" class="pa-0">
              <v-text-field
                v-model="settings.freeDelivery"
                :rules="requireRule"
                required
                outlined
                v-mask="'####'"
                :hint="
                  this.settings.freeDelivery
                    ? `${settings.freeDelivery}  عدد`
                    : ''
                "
                persistent-hint
                error-count="1"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0">
              <span class="d-block mt-md-3 mb-3 mb-md-0">
                {{ $t('postPrice') }}
              </span>
            </v-col>
            <v-col cols="12" md="6" class="pa-0">
              <v-text-field
                v-model="settings.deliveryPrice"
                :rules="requireRule"
                required
                outlined
                v-mask="'######'"
                error-count="1"
              >
                <template v-slot:append>
                  <span class="primary--text">
                    {{
                      settings.deliveryPrice
                        ? `${moneyFormat(settings.deliveryPrice)} ${$t('rial')}`
                        : ''
                    }}
                  </span>
                </template>
              </v-text-field></v-col
            >
          </v-row>

          <v-row>
            <v-col cols="12" md="6" class="pa-0">
              <span class="d-block mt-md-3 mb-3 mb-md-0">
                {{ $t('tabadolWageForSell') }}
              </span>
            </v-col>
            <v-col cols="12" md="6" class="pa-0">
              <v-text-field
                v-model="settings.wage"
                :rules="requireRule"
                required
                outlined
                :hint="this.settings.wage ? `${settings.wage}${$t('%')}` : ''"
                persistent-hint
                error-count="1"
                v-mask="'######'"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="8">
              <span class="font-weight-black">
                {{ $t('discountForRangeDate') }}
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="4">
              <rangeDateDiscount
                @setDateRange="setDateRange"
                :date="settings.firstDate"
                :dateName="'firstDate'"
                :percent="settings.firstDiscount"
                :percentName="'firstDiscount'"
              />
            </v-col>
            <v-col cols="12" lg="4" class="pr-5">
              <rangeDateDiscount
                @setDateRange="setDateRange"
                :date="settings.secondDate"
                :dateName="'secondDate'"
                :percent="settings.secondDiscount"
                :percentName="'secondDiscount'"
              />
            </v-col>
            <v-col cols="12" lg="4" class="pr-5">
              <rangeDateDiscount
                @setDateRange="setDateRange"
                :date="settings.thirdDate"
                :dateName="'thirdDate'"
                :percent="settings.thirdDiscount"
                :percentName="'thirdDiscount'"
              />
            </v-col>
          </v-row>
          <div class="justify-center d-flex ">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              {{ $t('save') }}
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
import rangeDateDiscount from './rangeDateDiscount.vue';
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'generalSettings',
  components: {
    notifMessage,
    rangeDateDiscount,
  },
  props: {
    data: {
      type: Object,
    },
  },
  mixins: [moneyFormat],

  data() {
    return {
      valid: true,
      saveSuccess: false,
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      settings: {},
      dateRange: [],
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();

      if (this.$refs.form.validate()) {
        this.$axios
          .put(`/v1/api/tabaadol-e-ketaab/setting/${this.data.id}`, {
            ...this.settings,
          })
          .then(res => {
            if (res.status === 200) {
              this.saveSuccess = true;
              this.$emit('reloadSetting');
            }
          });
      } else {
        this.valid = false;
      }
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },

    setDateRange(value) {
      Object.assign(this.settings, value);
    },
  },
  mounted() {
    this.settings = this.data;
  },
};
</script>
