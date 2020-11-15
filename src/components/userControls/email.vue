<template>
  <div>
    <v-text-field
      v-model="email"
      :rules="[rules.required, rules.email]"
      required
      outlined
      error-count="2"
      :label="$t('email')"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: 'email',
  data() {
    return {
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
      },
      email: '',
      valid: false,
    };
  },
  methods: {
    checkTel() {},
  },
};
</script>
