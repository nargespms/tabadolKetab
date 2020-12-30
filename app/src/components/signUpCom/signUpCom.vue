<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="8" md="6">
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
                  ><template v-slot:prepend-inner>
                    <span class="red--text">
                      *
                    </span>
                  </template></v-text-field
                >
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="register.lastName"
                  :rules="nameRules"
                  :label="$t('lastName')"
                  required
                  outlined
                  error-count="2"
                  ><template v-slot:prepend-inner>
                    <span class="red--text">
                      *
                    </span>
                  </template></v-text-field
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <nationalId @setNationalId="setNationalId" />
              </v-col>
              <v-col cols="12" md="6">
                <mobilePhone
                  :validate="true"
                  @setMobilePhone="setMobilePhone"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="register.gender"
                  :items="gender"
                  :label="$t('gender')"
                  outlined
                  clearable
                  hide-selected
                  :rules="checkRule"
                  required
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
                  <template v-slot:prepend-inner>
                    <span class="red--text">
                      *
                    </span>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" md="6">
                <email :isRequire="false" @setEmail="setEmail" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <mobilePhone :phone="true" @setMobilePhone="setPhone" />
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
                  <template v-slot:prepend-inner>
                    <span class="red--text">
                      *
                    </span>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <passwords @setPass="setPass" />
            <v-row>
              <v-col cols="12" md="12">
                <v-checkbox
                  v-model="register.rules"
                  required
                  :rules="checkRule"
                  color="info"
                >
                  <template v-slot:label>
                    <div>
                      من
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <a
                            target="_blank"
                            href="http://vuetifyjs.com"
                            @click.stop
                            v-on="on"
                          >
                            قوانین
                          </a>
                        </template>
                        مطالعه قوانین سایت
                      </v-tooltip>
                      سایت را قبول می نمایم
                    </div>
                  </template>
                </v-checkbox>
              </v-col>
              <v-col cols="12" md="12">
                <v-row>
                  <v-col cols="12" md="12">
                    <captcha :key="captchaKey" @setCaptcha="setCaptcha" />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <div class="justify-center d-flex">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                {{ $t('registeration') }}
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
    <notifMessage
      v-if="error"
      :msg="errorMsg"
      @hideNotif="hideError"
      :type="'error'"
    />
  </v-row>
</template>

<script>
import notifMessage from '../structure/notifMessage.vue';
import passwords from '../userControls/passwords.vue';
import mobilePhone from '../userControls/mobilePhone.vue';
import nationalId from '../userControls/nationalId.vue';
import captcha from '../userControls/captcha.vue';
import email from '../userControls/email.vue';

export default {
  name: 'signUpCom',
  components: {
    notifMessage,
    passwords,
    mobilePhone,
    nationalId,
    captcha,
    email,
  },
  props: {
    state: {
      type: String,
    },
  },
  data() {
    return {
      saveSuccess: false,
      error: false,
      errorMsg: '',
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
      gender: ['MALE', 'FEMALE', 'OTHER'],
      register: {},
      captcha: {},
      captchaKey: 0,
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.$axios
          .post('/v1/api/tabaadol-e-ketaab/register', {
            captcha: this.captcha,
            ...this.register,
          })
          .then(res => {
            if (res.status === 200) {
              this.saveSuccess = true;
              console.log(res.data);
              this.$store.commit('bookShop/userEnter', res.data.user, {
                module: 'bookShop',
              });
              this.$router.push({
                name: 'dashboard',
              });
            }
            console.log(res);
          })
          .catch(e => {
            if (e.response.status === 409) {
              this.error = true;
              this.errorMsg = 'mobileOrNationalIdRegistered';
              this.captchaKey = +1;
            }
            if (e.response.status === 403) {
              this.error = true;
              this.errorMsg = 'invalidCaptcha';
              this.captchaKey = +2;
            }
          });
      } else {
        this.valid = false;
      }
    },
    setCaptcha(value) {
      console.log(value);
      this.captcha = value;
    },
    setNationalId(value) {
      this.register.nationalId = value;
    },
    setMobilePhone(value) {
      this.register.mobile = value;
    },
    setPhone(value) {
      this.register.phone = value;
    },
    setPass(value) {
      this.register.password = value;
    },
    setEmail(value) {
      this.register.email = value;
    },
    reset() {
      this.$refs.form.reset();
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
    hideError() {
      this.error = false;
    },
  },
};
</script>
