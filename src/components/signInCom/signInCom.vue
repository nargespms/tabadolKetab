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
        <v-form class="pt-6" ref="form" v-model="valid">
          <v-container>
            <nationalId :autofocus="true" @setNationalId="setNationalId" />
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

export default {
  name: 'signInCom',
  components: {
    notifMessage,
    password,
    nationalId,
    captcha,
  },
  data() {
    return {
      saveSuccess: false,
      nationalId: null,
      captcha: '',
      valid: false,
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
