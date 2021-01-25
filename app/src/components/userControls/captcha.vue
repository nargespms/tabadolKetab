<template>
  <v-row>
    <v-col class="ma-auto" cols="12" md="6" align="center" justify="center">
      <div class="d-flex justify-center">
        <span v-html="capImg"></span>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="d-flex align-self-center"
              medium
              color="teal"
              @click="getCaptcha"
              v-bind="attrs"
              v-on="on"
            >
              fas fa-undo
            </v-icon>
          </template>
          {{ $t('getNewCaptcha') }}
        </v-tooltip>
      </div>
      <v-text-field
        v-model="captcha.value"
        :rules="captchaRules"
        :label="$t('captcha')"
        @input="submitCaptcha"
        required
        outlined
        error-count="2"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'captcha',
  data() {
    return {
      captchaRules: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => (v && v.length >= 6) || `${this.$t('minCharaters6')}`,
      ],
      captcha: {
        value: '',
        token: '',
      },
      captchaCode: '924636',
      capImg: '',
      value: '',
    };
  },
  methods: {
    submitCaptcha() {
      this.$emit('setCaptcha', this.captcha);
    },
    getCaptcha() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/captcha').then(res => {
        this.capImg = res.data.svg;
        this.captcha.token = res.data.token;
        this.value = res.data.value;
      });
    },
  },
  mounted() {
    this.getCaptcha();
  },
};
</script>
<style scoped lang="scss">
.v-input {
  padding-top: 18px;
}
</style>
