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

        <v-form class="pt-6" ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="register.firstName"
                  :rules="nameRules"
                  :label="$t('name')"
                  required
                  outlined
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
                <mobilePhone
                  @setMobilePhone="setMobilePhone"
                  :validate="true"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <mobilePhone
                  :phone="true"
                  @setMobilePhone="setPhone"
                  :validate="true"
                />
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
                <email @setEmail="setEmail" />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="register.roleType"
                  :items="roleType"
                  :label="$t('roll')"
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
                <v-textarea
                  outlined
                  required
                  name="input-7-4"
                  :label="$t('address')"
                  v-model="register.address"
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="6">
                <v-textarea
                  outlined
                  required
                  name="input-7-4"
                  :label="$t('description')"
                  v-model="register.description"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="register.postalCode"
                  :label="$t('postalCode')"
                  v-mask="'###########'"
                  :rules="postalCodeRules"
                  outlined
                  error-count="2"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-file-input
                  outlined
                  show-size
                  prepend-icon="mdi-image"
                  :label="$t('avatar')"
                ></v-file-input>
              </v-col>
            </v-row>
            <passwords />
            <v-row>
              <v-col cols="12" md="6">
                <v-checkbox
                  v-model="register.active"
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
import passwords from '../userControls/passwords.vue';
import mobilePhone from '../userControls/mobilePhone.vue';
import nationalId from '../userControls/nationalId.vue';
import email from '../userControls/email.vue';

export default {
  name: 'signUpCom',
  components: {
    notifMessage,
    passwords,
    mobilePhone,
    nationalId,
    email,
  },
  data() {
    return {
      valid: true,
      saveSuccess: false,
      nameRules: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => (v && v.length >= 3) || `${this.$t('minCharaters3')}`,
      ],
      postalCodeRules: [
        v => (v && v.length >= 10) || `${this.$t('minCharaters10')}`,
      ],
      checkRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      introductionType: [
        'website',
        'advertising',
        'friendsAndAcquaintances',
        'other',
      ],
      roleType: ['client', 'admin'],
      register: {},
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
    setEmail(value) {
      this.register.email = value;
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
    setPhone(value) {
      this.register.phone = value;
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
