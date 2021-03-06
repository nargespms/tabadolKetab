<template>
  <div>
    <signInCom />
    <p class="primary--text forgotPassword" @click="forgotPassword">
      آیا رمز عبور خود را فراموش کرده اید؟
    </p>
  </div>
</template>

<script>
import signInCom from '../../components/signInCom/signInCom.vue';

export default {
  name: 'admin-login',
  components: { signInCom },
  methods: {
    forgotPassword() {
      this.$router.push({ name: 'staff-forgot' });
    },
  },
};
</script>
