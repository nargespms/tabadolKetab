<template>
  <div>
    <signUpCom state="register" />
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
};
</script>
