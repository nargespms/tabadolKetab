<template>
  <div>
    <v-text-field
      v-model="password"
      :label="$t('password')"
      required
      outlined
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="passwordRules"
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: 'password',
  data() {
    return {
      show1: false,
      password: '',
      passwordRules: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => (v && v.length >= 8) || `${this.$t('minCharaters8')}`,
      ],
    };
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
