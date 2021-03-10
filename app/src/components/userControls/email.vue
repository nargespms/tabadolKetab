<template>
  <div>
    <v-text-field
      v-model="email"
      :rules="isRequire ? emailRules : email.length > 0 ? rules : []"
      @input="submitEmail"
      :required="isRequire ? true : false"
      outlined
      error-count="2"
      :label="$t('email')"
    >
      <template v-slot:prepend-inner v-if="isRequire">
        <span class="red--text">
          *
        </span>
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: 'email',
  props: {
    autofocus: {
      type: Boolean,
    },
    isRequire: {
      type: Boolean,
    },
    editData: {
      type: String,
    },
  },
  data() {
    return {
      emailRules: [
        value => !!value || `${this.$t('thisFieldIsRequired')}`,
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || `${this.$t('InvalidEmail')}`;
        },
      ],
      rules: [
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || `${this.$t('InvalidEmail')}`;
        },
      ],
      email: '',
      valid: false,
    };
  },
  methods: {
    submitEmail() {
      this.$emit('setEmail', this.email);
    },
  },

  mounted() {
    if (this.editData) {
      this.email = this.editData;
    }
  },
};
</script>
