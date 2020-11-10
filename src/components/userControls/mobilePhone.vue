<template>
  <div>
    <v-text-field
      v-model="mobilePhone"
      :label="$t('mobilephone')"
      :rules="mobilePhoneRules"
      v-mask="'###########'"
      @input="checkTel"
      required
      outlined
      error-count="2"
    ></v-text-field>
  </div>
</template>

<script>
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

export default {
  name: 'mobilePhone',
  data() {
    return {
      mobilePhoneRules: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => (v && v.length >= 11) || `${this.$t('minCharaters11')}`,
        v => (v && this.valid) || `${this.$t('InvalidMobile')}`,
      ],
      mobilePhone: '',
      valid: false,
    };
  },
  methods: {
    checkTel() {
      const number = phoneUtil.parseAndKeepRawInput(this.mobilePhone, 'IR');
      const completeNum = phoneUtil.format(number, PNF.E164);
      this.valid = phoneUtil.isValidNumber(phoneUtil.parse(completeNum));
      this.$emit('setMobilePhone', this.mobilePhone);
    },
  },
};
</script>

<style lang="scss"></style>
