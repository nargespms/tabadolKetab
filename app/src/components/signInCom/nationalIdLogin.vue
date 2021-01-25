<template>
  <v-form ref="form" v-model="valid">
    <nationalId
      :autofocus="true"
      @setNationalId="setNationalId"
      :isRequire="true"
    />
    <password @setPassword="setPassword" />
    <v-row>
      <v-col cols="12" md="12">
        <v-row>
          <v-col cols="12" md="12">
            <captcha @setCaptcha="setCaptcha" :key="captchaKey" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="justify-center d-flex">
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        {{ $t('enter') }}
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import nationalId from '../userControls/nationalId.vue';
import password from '../userControls/passwordsCom/password.vue';
import captcha from '../userControls/captcha.vue';

export default {
  name: 'nationalIdLogin',
  components: {
    nationalId,
    password,
    captcha,
  },
  props: {
    endpoint: {
      type: String,
    },
  },
  data() {
    return {
      captcha: {},
      login: {},
      valid: false,
      captchaKey: 0,
    };
  },
  methods: {
    setCaptcha(value) {
      this.captcha = value;
    },
    setNationalId(value) {
      this.login.nationalId = value;
    },
    setPassword(value) {
      this.login.password = value;
    },
    validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.$axios
          .post(this.endpoint, {
            ...this.login,
            captcha: this.captcha,
          })
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$store.commit('bookShop/userEnter', res.data.user, {
                module: 'bookShop',
              });
              this.$store.commit('bookShop/loggedIn', true, {
                module: 'bookShop',
              });
              this.$router.push({
                name: 'dashboard',
              });
            }
          })
          .catch(e => {
            if (e.response.status === 404) {
              this.captchaKey += 1;
              this.$emit('error404');
            }
            if (e.response.status === 406) {
              this.captchaKey += 1;
              this.$emit('error406');
            }
          });
      } else {
        this.valid = false;
      }
    },
  },
};
</script>
