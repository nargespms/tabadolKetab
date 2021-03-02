<template>
  <v-form class="pt-6" ref="form" v-model="validMobile" lazy-validation>
    <mobilePhone :isRequired="true" @setMobilePhone="setMobilePhone" />
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
</template>

<script>
import mobilePhone from '../userControls/mobilePhone.vue';
import captcha from '../userControls/captcha.vue';

export default {
  name: 'verifyMobile',
  components: {
    mobilePhone,
    captcha,
  },
  data() {
    return {
      validMobile: false,
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
              this.validMobile = true;
              this.$emit('verifyMobile', this.mobile);
            }
          });
      } else {
        this.validMobile = false;
      }
    },

    setMobilePhone(value) {
      this.mobile = value;
    },
    setCaptcha(value) {
      this.captcha = value;
    },
  },
  mounted() {
    if (this.$route.name === 'staff-forgot') {
      this.endpoint = '/v1/api/tabaadol-e-ketaab/staff/verify-mobile';
    } else {
      this.endpoint = '/v1/api/tabaadol-e-ketaab/client/verify-mobile';
    }
  },
};
</script>
