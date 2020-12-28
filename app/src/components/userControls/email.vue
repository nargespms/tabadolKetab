<template>
  <div>
    <v-text-field
      v-model="email"
      :rules="[rules.required, rules.email]"
      @input="submitEmail"
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
  props: {
    autofocus: {
      type: Boolean,
    },
  },
  data() {
    return {
      rules: {
        required: value => !!value || `${this.$t('thisFieldIsRequired')}`,
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || `${this.$t('InvalidEmail')}`;
        },
      },
      email: '',
      valid: false,
    };
  },
  methods: {
    submitEmail() {
      this.$emit('setEmail', this.email);
    },
  },
};
</script>
