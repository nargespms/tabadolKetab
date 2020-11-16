<template>
  <div>
    <v-form v-model="valid" lazy-validation class="pa-8" ref="form">
      <v-text-field
        v-model="localData.address"
        :rules="requireRule"
        :label="$t('address')"
        required
        outlined
        error-count="1"
      ></v-text-field>
      <v-text-field
        v-model="localData.postalCode"
        :rules="requireRule"
        :label="$t('postalCode')"
        v-mask="'############'"
        :hint="`${$t('numbersOnly')}`"
        required
        outlined
        error-count="1"
      ></v-text-field>
      <div class="justify-center d-flex">
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          {{ $t('save') }}
        </v-btn>
        <v-btn color="error" class="mr-4" @click="returnToList">
          {{ $t('return') }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'addressInput',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    mode: {
      type: String,
    },
  },
  data() {
    return {
      valid: true,
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      localData: this.mode === 'edit' ? this.data : {},
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();

      if (this.$refs.form.validate()) {
        this.$emit('saveAddress', 'list');
      } else {
        this.valid = false;
      }
    },
    returnToList() {
      this.$emit('returnToList', 'list');
    },
  },
  watch: {
    data(newVal) {
      this.localData = newVal;
    },
  },
};
</script>
