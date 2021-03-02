<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="8" md="5">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('forgotPassword') }}
            </span>
          </v-card-title>
        </v-card-actions>
        <v-container>
          <v-tabs fixed-tabs color="teal">
            <v-tab>
              از طریق پیامک
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-form
                    class="pt-6"
                    ref="form"
                    v-model="validMobile"
                    lazy-validation
                  >
                    <mobilePhone
                      :isRequired="true"
                      @setMobilePhone="setMobilePhone"
                    />
                    <captcha @setCaptcha="setCaptcha" :key="captchaKey" />

                    <div class="justify-center d-flex">
                      <v-btn
                        :disabled="!validMobile"
                        color="success"
                        class="mr-4"
                        @click="validateMobile"
                      >
                        {{ $t('enter') }}
                      </v-btn>
                    </div>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-container>
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
import mobilePhone from '../userControls/mobilePhone.vue';
import notifMessage from '../structure/notifMessage.vue';
import captcha from '../userControls/captcha.vue';

export default {
  name: 'forgot',
  components: {
    mobilePhone,
    notifMessage,
    captcha,
  },
  data() {
    return {
      saveSuccess: false,
      validMobile: false,
      forgotPass: false,
      endpoint: '',
      mobile: '',
      captcha: {},
      captchaKey: 0,
    };
  },
  methods: {
    validateMobile() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.$axios
          .post(this.endpoint, {
            mobile: this.mobile,
            captcha: this.captcha,
          })
          .then(res => {
            if (res.status === 200) {
              this.saveSuccess = true;
              this.validMobile = true;
              this.$emit('verifyMobile');
            }
          });
      } else {
        this.validMobile = false;
      }
    },

    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
    setMobilePhone(value) {
      this.mobile = value;
    },
    setCaptcha(value) {
      this.captcha = value;
    },
  },
  mounted() {
    console.log(this.$route.name);
    if (this.$route.name === 'staff-forgot') {
      this.endpoint = '/v1/api/tabaadol-e-ketaab/staff/verify-mobile';
    } else {
      this.endpoint = '/v1/api/tabaadol-e-ketaab/client/verify-mobile';
    }
  },
};
</script>
<style lang="scss">
.v-btn,
.v-tab {
  letter-spacing: inherit;
}
</style>
