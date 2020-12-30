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
        <v-form ref="form" v-model="valid">
          <v-container>
            <v-tabs v-model="tab" class="pb-3 mb-6" color="teal" grow>
              <v-tab v-for="item in items" :key="item.tab">
                {{ $t('via') }}
                {{ $t(item.tab) }}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in items" :key="item.tab">
                <nationalId
                  v-if="item.tab === 'nationalId'"
                  :autofocus="true"
                  @setNationalId="setNationalId"
                />
                <email
                  :autofocus="true"
                  :isRequire="true"
                  v-if="item.tab === 'email'"
                  @setEmail="setEmail"
                />
              </v-tab-item>
            </v-tabs-items>

            <password />
            <v-row>
              <v-col cols="12" md="12">
                <v-row>
                  <v-col cols="12" md="12">
                    <captcha @setCaptcha="setCaptcha" />
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
                {{ $t('enter') }}
              </v-btn>
            </div>
          </v-container>
        </v-form>
      </v-card>
      <p class="primary--text registerLink" @click="registerLink">
        آیا حساب کاربری ندارید؟ همین الان ثبت نام کنید
      </p>
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
import password from '../userControls/passwordsCom/password.vue';
import nationalId from '../userControls/nationalId.vue';
import captcha from '../userControls/captcha.vue';
import email from '../userControls/email.vue';

export default {
  name: 'signInCom',
  components: {
    notifMessage,
    password,
    nationalId,
    captcha,
    email,
  },
  data() {
    return {
      saveSuccess: false,
      nationalId: null,
      captcha: '',
      valid: false,
      tab: null,
      items: [
        { tab: 'nationalId', icon: 'mdi-account' },
        {
          tab: 'email',
          icon: 'mdi-ticket-account',
        },
      ],
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.saveSuccess = true;
        this.$router.push({
          name: 'dashboard',
        });
      } else {
        this.valid = false;
      }
    },
    setCaptcha(value) {
      this.captcha = value;
    },
    setNationalId(value) {
      this.nationalId = value;
    },
    setEmail(value) {
      this.email = value;
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
    registerLink() {
      this.$router.push({ name: 'signup' });
    },
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
