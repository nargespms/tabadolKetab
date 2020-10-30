<template>
  <div>
    <v-text-field
        v-model="mobilePhone"
        :label="$t('mobilephone')"
        :rules="mobilePhoneRules"
        required
        outlined
        @blur="checkTel"
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
        v => (v && v.length <= 11) || `${this.$t('minCharaters11')}`,
      ],
      mobilePhone : '',
    };
  },
   methods: {
     checkTel() {
        const number = phoneUtil.parseAndKeepRawInput(this.mobilePhone, 'IR');
        const completeNum = phoneUtil.format(number, PNF.E164);
        console.log(phoneUtil.isValidNumber(phoneUtil.parse(completeNum)));
     }
   }
};
</script>

<style lang="scss">
</style>
