<template>
  <v-row class="justify-center ">
    <v-col cols="12" lg="8">
      <v-form class="pt-6" ref="form" v-model="validCode" lazy-validation>
        <div>
          <p class="mt-4  mb-6 text-center font-weight-black">
            {{ $t('sentCodeTo') }}
            {{ mobile }}
            {{ $t('writeTo') }}
          </p>
          <v-text-field
            v-model="code"
            :rules="requireRule"
            v-mask="'######'"
            :hint="`${$t('numbersOnly')}`"
            required
            outlined
            error-count="1"
            :height="32"
            class="w250 ma-auto my-4"
          ></v-text-field>
          <div class="d-flex">
            <v-btn
              :disabled="!validCode"
              color="success "
              class="px-6 d-flex ma-auto"
              @click="validateCode"
            >
              {{ $t('send') }}
            </v-btn>
            <v-btn
              color="primary "
              class="px-6 d-flex ma-auto"
              @click="returntoForgot"
            >
              {{ $t('resendRetriveCode') }}
            </v-btn>
          </div>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'verifyCode',
  props: {
    mobile: {
      type: String,
    },
  },
  data() {
    return {
      validCode: false,
      endpoint: '',
      code: '',
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
    };
  },
  methods: {
    validateCode() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.$axios
          .post(this.endpoint, {
            mobile: this.mobile,
            value: this.code,
          })
          .then(res => {
            if (res.status === 200) {
              this.$store.commit('bookShop/userEnter', res.data.user, {
                module: 'bookShop',
              });
              this.$store.commit('bookShop/loggedIn', true, {
                module: 'bookShop',
              });
              this.$router.push({
                name: 'dashboard',
              });
            }
          })
          .catch(e => {
            if (e.response.status === 400) {
              this.$emit('error', 'invalidCode');
            }
          });
      } else {
        this.validCode = false;
      }
    },
    returntoForgot() {
      this.$emit('enableMobileForgot');
    },
  },

  mounted() {
    if (this.$route.name === 'staff-forgot') {
      this.endpoint =
        '/v1/api/tabaadol-e-ketaab/staff/forgot-password/verify-code';
    } else {
      this.endpoint =
        '/v1/api/tabaadol-e-ketaab/client/forgot-password/verify-code';
    }
  },
};
</script>

<style lang="scss">
.w250 {
  width: 250px;
}
</style>
