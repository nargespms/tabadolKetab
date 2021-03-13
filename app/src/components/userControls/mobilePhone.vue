<template>
  <div>
    <v-text-field
      v-model="mobilePhone"
      :label="!phone ? $t('mobilephone') : $t('phone')"
      :rules="
        isRequired ? mobilePhoneRules : mobilePhone.length > 0 ? phoneRules : []
      "
      v-mask="'###########'"
      @update:error="checkTel"
      :required="isRequired ? true : false"
      outlined
      error-count="2"
      ref="phoneInput"
      :error-messages="
        !valid && mobilePhone.length > 0 ? `${this.$t('InvalidPhone')}` : ''
      "
    >
      <template v-if="isRequired" v-slot:prepend-inner>
        <span class="red--text">
          *
        </span>
      </template>
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
    isRequired: {
      type: Boolean,
    },
    editData: {
      type: String,
    },
    mode: {
      type: String,
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
      console.log('InCheckTel');
      if (this.$refs.phoneInput.validate()) {
        console.log('validate');
        const number = phoneUtil.parseAndKeepRawInput(this.mobilePhone, 'IR');
        const completeNum = phoneUtil.format(number, PNF.E164);
        this.valid = phoneUtil.isValidNumber(phoneUtil.parse(completeNum));
        this.$emit('setMobilePhone', this.mobilePhone);
      }
    },
  },
  watch: {
    editData(newVal) {
      this.mobilePhone = newVal;
    },
    mobilePhone() {
      this.checkTel();
    },
  },
  mounted() {
    if (this.mode === 'edit' && this.editData.length > 0) {
      this.mobilePhone = this.editData;
    }
  },
};
</script>

<style lang="scss"></style>
