<template>
  <div>
    <v-text-field
      v-model="nationalId"
      :rules="isRequired ? nationalIdRules : notRequireRule"
      :label="$t('nationalId')"
      v-mask="'##########'"
      @input="checkNationalId"
      :required="isRequired"
      outlined
      :autofocus="autofocus"
      error-count="2"
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
export default {
  name: 'nationalId',
  props: {
    autofocus: {
      type: Boolean,
    },
    isRequire: {
      type: Boolean,
    },
  },
  data() {
    return {
      isRequired: this.isRequire,
      notRequireRule: [
        v => (v && v.length >= 10) || `${this.$t('minCharaters10')}`,
        v => (v && this.valid) || `${this.$t('InvalidNationalCode')}`,
      ],
      nationalIdRules: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => (v && v.length >= 10) || `${this.$t('minCharaters10')}`,
        v => (v && this.valid) || `${this.$t('InvalidNationalCode')}`,
      ],
      nationalId: null,
      valid: false,
    };
  },
  methods: {
    checkNationalId() {
      const check = +this.nationalId[9];
      const sum =
        Array(9)
          .fill()
          .map((_, i) => +this.nationalId[i] * (10 - i))
          .reduce((x, y) => x + y) % 11;
      this.valid =
        (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
      this.$emit('setNationalId', this.nationalId);
    },
  },
  watch: {
    isRequire(newVal) {
      this.isRequired = newVal;
    },
  },
};
</script>

<style lang="scss"></style>
