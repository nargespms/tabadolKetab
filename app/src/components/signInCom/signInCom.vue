<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="8" md="5">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('Login') }}
            </span>
          </v-card-title>
        </v-card-actions>

        <v-container>
          <v-tabs v-model="tab" class="pb-3 mb-6" color="teal" grow>
            <v-tab v-for="item in items" :key="item.tab">
              {{ $t('via') }}
              {{ $t(item.tab) }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.tab">
              <template v-if="item.tab === 'nationalId'">
                <nationalIdLogin
                  :endpoint="endpoint"
                  @error404="error404"
                  @error406="error406"
                />
              </template>

              <template v-if="item.tab === 'mobile'">
                <mobileLogin
                  :endpoint="endpoint"
                  @error406="error406"
                  @error404="mobileError404"
                />
              </template>
            </v-tab-item>
          </v-tabs-items>
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
import mobileLogin from './mobileLogin.vue';
import nationalIdLogin from './nationalIdLogin.vue';

export default {
  name: 'signInCom',
  components: {
    notifMessage,
    mobileLogin,
    nationalIdLogin,
  },
  data() {
    return {
      saveSuccess: false,
      nationalId: null,
      captcha: '',
      valid: false,
      tab: null,
      error: false,
      errorMsg: '',
      items: [
        { tab: 'nationalId', icon: 'mdi-account', require: true },
        {
          tab: 'mobile',
          icon: 'mdi-ticket-account',
          require: true,
        },
      ],
      endpoint: '',
    };
  },
  methods: {
    error404() {
      this.error = true;
      this.errorMsg = 'incorrectPasswordOrNationalId';
    },
    mobileError404() {
      this.error = true;
      this.errorMsg = 'incorrectPasswordOrmobile';
    },
    error406() {
      this.error = true;
      this.errorMsg = 'incorrectCaptcha';
    },

    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
    hideError() {
      this.error = false;
    },
  },
  mounted() {
    console.log(this.$route);
    if (this.$route.name === 'admin-login') {
      this.endpoint = '/v1/api/tabaadol-e-ketaab/staff/sign-in';
    } else {
      this.endpoint = '/v1/api/tabaadol-e-ketaab/client/sign-in';
    }
  },
};
</script>
<style lang="scss">
.registerLink {
  cursor: pointer;
  text-align: center;
  padding: 8px;
}
</style>
