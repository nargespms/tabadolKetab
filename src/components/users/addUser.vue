<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="6" md="8">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('signUp') }}
            </span>
          </v-card-title>
        </v-card-actions>

        <v-form class="pt-6" ref="form" v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="register.firstName"
                  :rules="nameRules"
                  :label="$t('name')"
                  required
                  outlined
                  autofocus
                  error-count="2"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="register.lastName"
                  :rules="nameRules"
                  :label="$t('lastName')"
                  required
                  outlined
                  error-count="2"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <nationalId @setNationalId="setNationalId" />
              </v-col>
              <v-col cols="12" md="6">
                <mobilePhone @setMobilePhone="setMobilePhone" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="register.phone"
                  :rules="phoneRules"
                  :label="$t('phone')"
                  v-mask="'###########'"
                  required
                  outlined
                  error-count="2"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="register.introductionType"
                  :items="introductionType"
                  :label="$t('introduction')"
                  outlined
                  clearable
                  hide-selected
                >
                  <template v-slot:item="{ item }">
                    <span>
                      {{ $t(item) }}
                    </span>
                  </template>
                  <template v-slot:selection="{ item }">
                    <span>
                      {{ $t(item) }}
                    </span>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <email />
              </v-col>
              <v-col cols="12" md="6">
                adss
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                ad23
              </v-col>
              <v-col cols="12" md="6">
                adss44
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                ad235555
              </v-col>
              <v-col cols="12" md="6">
                adss44xxx
              </v-col>
            </v-row>
            <passwords />
            <v-row>
              <v-col cols="12" md="6">
                <v-checkbox
                  v-model="active"
                  :label="$t('activeinactive')"
                  required
                ></v-checkbox>
              </v-col>
            </v-row>
            <div class="justify-center d-flex">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                {{ $t('save') }}
              </v-btn>
              <v-btn color="error" class="mr-4" @click="reset"
                >{{ $t('resetForm') }}
              </v-btn>
            </div>
          </v-container>
        </v-form>
      </v-card>
    </v-col>
    <successNotif
      v-if="saveSuccess"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
    />
  </v-row>
</template>

<script>
import successNotif from '../structure/successNotif.vue';
import passwords from '../userControls/passwords.vue';
import mobilePhone from '../userControls/mobilePhone.vue';
import nationalId from '../userControls/nationalId.vue';
import email from '../userControls/email.vue';

export default {
  name: 'signUpCom',
  components: {
    successNotif,
    passwords,
    mobilePhone,
    nationalId,
    email,
  },
  data() {
    return {
      saveSuccess: false,
      valid: true,
      nameRules: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => (v && v.length >= 3) || `${this.$t('minCharaters3')}`,
      ],
      phoneRules: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => (v && v.length >= 11) || `${this.$t('minCharaters11')}`,
      ],
      checkRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      introductionType: [
        'website',
        'advertising',
        'friendsAndAcquaintances',
        'other',
      ],
      register: {
        firstName: '',
        lastName: '',
        phone: null,
        nationalId: null,
        mobilePhone: null,
        introductionType: null,
        rules: false,
      },
      captcha: '',
      active: '',
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
    setCaptcha(value) {
      this.captcha = value;
    },
    setNationalId(value) {
      this.register.nationalId = value;
    },
    setMobilePhone(value) {
      this.register.mobilePhone = value;
    },
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
