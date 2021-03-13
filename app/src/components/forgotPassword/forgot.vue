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
          <v-card flat>
            <verifyMobile v-if="!codeCheck" @verifyMobile="verifyMobile" />
            <verifyCode
              v-if="codeCheck"
              :mobile="mobile"
              @error="errorVerify"
              @enableMobileForgot="enableMobileForgot"
            />
            <v-card-text> </v-card-text>
          </v-card>
        </v-container>
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
import verifyMobile from './verifyMobile.vue';
import verifyCode from './verifyCode.vue';

export default {
  name: 'forgot',
  components: {
    notifMessage,
    verifyMobile,
    verifyCode,
  },
  data() {
    return {
      saveSuccess: false,
      validMobile: false,
      forgotPass: false,
      endpoint: '',
      codeCheck: false,
      mobile: '',
      error: false,
      errorMsg: '',
    };
  },
  methods: {
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
    errorVerify(value) {
      this.errorMsg = value;
      this.error = true;
    },
    verifyMobile(value) {
      this.codeCheck = true;
      this.mobile = value;
      console.log(value);
    },
    hideError() {
      this.error = false;
    },
    enableMobileForgot() {
      this.codeCheck = false;
    },
  },
};
</script>
<style lang="scss">
.v-btn,
.v-tab {
  letter-spacing: inherit;
}
</style>
