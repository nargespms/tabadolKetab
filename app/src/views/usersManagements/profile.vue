<template>
  <div>
    <profileCmp />
  </div>
</template>

<script>
import profileCmp from '../../components/users/profileCmp.vue';

export default {
  name: 'profile',
  components: { profileCmp },
  data() {
    return {
      endpoint: '',
    };
  },
  methods: {
    getData() {
      this.$axios.get(this.endpoint).then(res => {
        if (res.status === 200) {
          console.log(res.data);
        }
      });
    },
  },
  mounted() {
    if (this.$store.state.bookShop.userInfo.role === 'CLIENT') {
      this.endpoint = '/v1/api/tabaadol-e-ketaab/client/profile';
    } else {
      this.endpoint = '/v1/api/tabaadol-e-ketaab/staff/profile';
    }
    this.getData();
  },
};
</script>
