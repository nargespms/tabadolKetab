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
                v-model="settings.bookNumberPost"
                :rules="requireRule"
                required
                outlined
                v-mask="'####'"
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
                v-model="settings.PostPrice"
                :rules="requireRule"
                required
                outlined
                v-mask="'######'"
                :hint="
                  this.settings.PostPrice
                    ? `${$t('costInRial')}${moneyFormat(settings.PostPrice)}`
                    : ''
                "
                :persistentHint="settings.PostPrice"
                error-count="1"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0">
              <span class="d-block mt-md-3 mb-3 mb-md-0">
                {{ $t('creditExpireTimeFromSellBook') }}
              </span>
            </v-col>
            <v-col cols="12" md="6" class="pa-0">
              <v-text-field
                v-model="settings.expireTime"
                :rules="requireRule"
                required
                outlined
                v-mask="'######'"
                :hint="
                  this.settings.expireTime
                    ? `${settings.expireTime}${$t('day')}`
                    : ''
                "
                :persistentHint="settings.expireTime"
                error-count="1"
              ></v-text-field
            ></v-col>
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
                v-mask="'######'"
                :hint="this.settings.wage ? `${settings.wage}${$t('%')}` : ''"
                :persistentHint="settings.wage"
                error-count="1"
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
              <rangeDateDiscount @setDateRange="setDateRange" />
            </v-col>
            <v-col cols="12" lg="4" class="pr-5">
              <rangeDateDiscount @setDateRange="setDateRange" />
            </v-col>
            <v-col cols="12" lg="4" class="pr-5">
              <rangeDateDiscount @setDateRange="setDateRange" />
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

export default {
  name: 'generalSettings',
  components: {
    notifMessage,
    rangeDateDiscount,
  },
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
        this.saveSuccess = true;
        this.reset();
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
    moneyFormat(value) {
      return new Intl.NumberFormat('es-ES').format(value);
    },

    setDateRange(value) {
      this.dateRange.push(value);
      console.log(value);
    },
  },
};
</script>
