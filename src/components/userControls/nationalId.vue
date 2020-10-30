<template>
  <div>
    <v-text-field
        v-model="nationalId"
        :rules="nationalIdRules"
        :label="$t('nationalId')"
        required
        outlined
        error-count="2"
      ></v-text-field>
  </div>
</template>

<script>

export default {
  name: 'nationalId',
  data() {
    return {
       nationalIdRules: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => (v && v.length >= 10) || `${this.$t('minCharaters10')}`,
      ],

      nationalId: null,
    };
  },
  mounted() {

  },
};
</script>

<style lang="scss">
</style>
