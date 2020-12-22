<template>
  <div>
    <v-text-field
      v-model="nationalId"
      :rules="nationalIdRules"
      :label="$t('nationalId')"
      v-mask="'##########'"
      @input="checkNationalId"
      required
      outlined
      :autofocus="autofocus"
      error-count="2"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: 'nationalId',
  props: {
    autofocus: {
      type: Boolean,
    },
  },
  data() {
    return {
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
};
</script>

<style lang="scss"></style>
