<template>
  <div>
    <v-text-field
      v-model="mobilePhone"
      :label="!phone ? $t('mobilephone') : $t('phone')"
      :rules="
        validate ? mobilePhoneRules : mobilePhone.length > 0 ? phoneRules : []
      "
      v-mask="'###########'"
      @update:error="checkTel"
      debounce="1500"
      :required="validate"
      outlined
      error-count="2"
      ref="phoneInput"
      :error-messages="
        !valid && mobilePhone.length > 0 ? `${this.$t('InvalidPhone')}` : ''
      "
    >
    </v-text-field>
  </div>
</template>

<script>
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

export default {
  name: 'mobilePhone',
  props: {
    phone: {
      type: Boolean,
    },
    validate: {
      type: Boolean,
    },
  },
  data() {
    return {
      mobilePhoneRules: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => (v && v.length >= 11) || `${this.$t('minCharaters11')}`,
      ],
      phoneRules: [
        v => (v && v.length >= 11) || `${this.$t('minCharaters11')}`,
      ],
      mobilePhone: '',
      valid: true,
    };
  },
  methods: {
    checkTel() {
      console.log('biroon');
      if (this.$refs.phoneInput.validate()) {
        const number = phoneUtil.parseAndKeepRawInput(this.mobilePhone, 'IR');
        const completeNum = phoneUtil.format(number, PNF.E164);
        this.valid = phoneUtil.isValidNumber(phoneUtil.parse(completeNum));
        console.log(this.valid);
        this.$emit('setMobilePhone', this.mobilePhone);
      }
    },
  },
};
</script>

<style lang="scss"></style>
