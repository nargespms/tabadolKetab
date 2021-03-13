<template>
  <div>
    <passwords :mode="'edit'" @setPass="setPass" :key="passwordKey" />
    <div class="justify-center d-flex">
      <v-btn color="success" class="mr-4" @click="changePass">
        {{ $t('save') }}
      </v-btn>
      <v-btn color="error" class="mr-4">{{ $t('resetForm') }} </v-btn>
    </div>
  </div>
</template>

<script>
import passwords from '../userControls/passwords.vue';

export default {
  name: 'changePassword',
  components: {
    passwords,
  },
  data() {
    return {
      password: '',
      endpoint: '',
      passwordKey: 0,
    };
  },
  methods: {
    setPass(value) {
      this.password = value;
    },
    changePass() {
      if (this.password.length > 0) {
        this.$axios
          .patch(this.endpoint, { password: this.password })
          .then(res => {
            if (res.status === 200) {
              this.passwordKey += 1;
              this.$emit('success');
            }
          });
      }
    },
  },
  mounted() {
    console.log(this.$route.name);
    if (
      (this.$route.name === 'profile' &&
        this.$store.state.bookShop.userInfo.role !== 'CLIENT') ||
      this.$route.name === 'staffProfile'
    ) {
      this.endpoint = `/v1/api/tabaadol-e-ketaab/staff/reset-password/${this.$route.params.userId}`;
    } else if (
      (this.$route.name === 'profile' &&
        this.$store.state.bookShop.userInfo.role === 'CLIENT') ||
      this.$route.name === 'clientProfile'
    ) {
      this.endpoint = `/v1/api/tabaadol-e-ketaab/client/reset-password/${this.$route.params.userId}`;
    }
  },
};
</script>
