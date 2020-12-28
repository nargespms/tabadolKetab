<template>
  <v-row>
    <v-col class="ma-auto" cols="12" md="6" align="center" justify="center">
      <div v-html="capImg"></div>
      <v-text-field
        v-model="captcha.value"
        :rules="captchaRules"
        :label="$t('captcha')"
        @input="submitCaptcha"
        required
        outlined
        error-count="2"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'captcha',
  data() {
    return {
      captchaRules: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => v === this.value || `${this.$t('captchaDoNotMatch')}`,
      ],
      captcha: {
        value: '',
        token: '',
      },
      captchaCode: '924636',
      capImg: '',
      value: '',
    };
  },
  methods: {
    submitCaptcha() {
      this.$emit('setCaptcha', this.captcha);
    },
    getCaptcha() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/captcha').then(res => {
        console.log(res);
        this.capImg = res.data.svg;
        this.captcha.token = res.data.token;
        this.value = res.data.value;
      });
    },
  },
  mounted() {
    this.getCaptcha();
  },
};
</script>
<style scoped lang="scss">
.v-input {
  padding-top: 18px;
}
</style>
