<template>
  <div>
    signup
    <signUpCom />
  </div>
</template>

<script>
import signUpCom from '../components/signUpCom/signUpCom.vue';

export default {
  name: 'signUp',
  components: { signUpCom },
  data() {
    return {
      data: [],
    };
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
