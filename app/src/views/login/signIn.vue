<template>
  <div>
    <signInCom />
    <p class="primary--text registerLink" @click="registerLink">
      آیا حساب کاربری ندارید؟ همین الان ثبت نام کنید
    </p>
  </div>
</template>

<script>
import signInCom from '../../components/signInCom/signInCom.vue';

export default {
  name: 'signIn',
  components: { signInCom },
  methods: {
    registerLink() {
      this.$router.push({ name: 'signup' });
    },
  },
};
</script>
