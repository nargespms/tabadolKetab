<template>
  <div>
    signin
    {{ data }}
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'signIn',
  data() {
    return {
      data: {},
    };
  },
  mounted() {
    this.$axios
      .get(
        'http://www.omdbapi.com/?s=mummy&apikey=b76b385c&page=1&type=movie&Content-Type=application/json%27'
      )
      .then(res => {
        console.log(res);
        this.data = res.data;
      });
  },
};
</script>
