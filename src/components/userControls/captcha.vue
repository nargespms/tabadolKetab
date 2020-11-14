<template>
  <div>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="captcha"
          :rules="captchaRules"
          :label="$t('captcha')"
          @input="submitCaptcha"
          required
          outlined
          error-count="2"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        123456
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'captcha',
  data() {
    return {
      captchaRules: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => v === this.captchaCode || `${this.$t('captchaDoNotMatch')}`,
      ],
      captcha: '',
      captchaCode: '123456',
    };
  },
  methods: {
    submitCaptcha() {
      this.$emit('setCaptcha', this.captcha);
    },
  },
};
</script>
