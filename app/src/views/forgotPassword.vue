<template>
  <div>
    <forgot />
  </div>
</template>

<script>
import forgot from '../components/forgotPassword/forgot.vue';

export default {
  name: 'forgotPassword',
  components: { forgot },
  data() {
    return {
      data: [],
    };
  },
};
</script>
