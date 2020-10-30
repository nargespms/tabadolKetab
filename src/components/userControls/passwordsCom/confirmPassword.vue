<template>
  <div>
      <v-text-field
         v-model="confirmPassword"
        :label="$t('confirmPassword')"
        required
        outlined
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="confirmPasswordRules"
        :type="show1 ? 'text' : 'password'"
        @click:append="show1 = !show1"
      ></v-text-field>
  </div>
</template>

<script>

export default {
  name: 'confirmPassword',
  data() {
    return {
      show1: false,
      confirmPassword: '',
      confirmPasswordRules: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => (v && v.length >= 8) || `${this.$t('minCharaters8')}`,
      ],
    };
  },
  mounted() {

  },
};
</script>

<style lang="scss">
</style>
