<template>
  <div>
    <signInCom />
    <p class="primary--text registerLink" @click="registerLink">
      آیا حساب کاربری ندارید؟ همین الان ثبت نام کنید
    </p>

    <p class="primary--text forgotPassword" @click="forgotPassword">
      آیا رمز عبور خود را فراموش کرده اید؟
    </p>
  </div>
</template>

<script>
import signInCom from '../../components/signInCom/signInCom.vue';

export default {
  name: 'signIn',
  components: { signInCom },
  methods: {
    data() {
      return {
        forgotPass: false,
      };
    },
    registerLink() {
      this.$router.push({ name: 'signup' });
    },
    forgotPassword() {
      this.$router.push({ name: 'forgot' });
    },
  },
};
</script>
