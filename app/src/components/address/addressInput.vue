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
        :height="32"
      ></v-text-field>
      <v-text-field
        v-model="localData.zipCode"
        :rules="postalCodeRule"
        :label="$t('postalCode')"
        v-mask="'############'"
        :hint="`${$t('numbersOnly')}`"
        required
        outlined
        error-count="1"
        :height="32"
      ></v-text-field>
      <mobilePhone
        :isRequired="false"
        @setMobilePhone="setMobilePhone"
        :phone="false"
        :editData="this.mode === 'edit' && data.mobile ? data.mobile : ''"
        :mode="mode"
      />
      <v-text-field
        v-model="localData.phone"
        :label="$t('landLane')"
        v-mask="'############'"
        :hint="`${$t('numbersOnly')}`"
        outlined
        :height="32"
      ></v-text-field>
      <div v-if="error">
        <p class=" error--text">
          <v-icon color="error">mdi-alert-octagon</v-icon>
          {{ $t(this.errorMsg) }}
        </p>
      </div>
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
import mobilePhone from '../userControls/mobilePhone.vue';

export default {
  name: 'addressInput',
  components: {
    mobilePhone,
  },

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
      error: false,
      valid: true,
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      postalCodeRule: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => (v && v.length >= 10) || `${this.$t('minCharaters10')}`,
      ],
      localData: this.mode === 'edit' ? this.data : {},
    };
  },
  methods: {
    setMobilePhone(mobile) {
      this.localData.mobile = mobile;
    },
    validate() {
      this.$refs.form.validate();

      if (this.$refs.form.validate()) {
        if (this.mode === 'add') {
          this.$axios
            .post('/v1/api/tabaadol-e-ketaab/address', {
              ...this.localData,
            })
            .then(res => {
              if (res.status === 200) {
                this.$emit('saveAddress', 'list');
              }
            })
            .catch(e => {
              if (e.response.status === 409) {
                this.error = true;
                this.errorMsg = 'repeatedZipCode';
              }
            });
        } else if (this.mode === 'edit') {
          this.$axios
            .put(`/v1/api/tabaadol-e-ketaab/address/${this.data.id}`, {
              ...this.localData,
            })
            .then(res => {
              if (res.status === 200) {
                this.$emit('saveAddress', 'list');
              }
            })
            .catch(e => {
              if (e.response.status === 409) {
                if (e.response.status === 409) {
                  this.error = true;
                  this.errorMsg = 'repeatedZipCode';
                }
              }
            });
        }
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
