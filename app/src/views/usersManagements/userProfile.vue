<template>
  <div>
    <profileCmp :data="userData" @reloadUserData="getData" />
  </div>
</template>

<script>
import profileCmp from '../../components/users/profileCmp.vue';

export default {
  name: 'userProfile',
  components: { profileCmp },
  data() {
    return {
      endpoint: '',
      userData: {},
    };
  },
  methods: {
    getData() {
      this.$axios.get(this.endpoint).then(res => {
        if (res.status === 200) {
          console.log(res.data);
          this.userData = res.data.user;
        }
      });
    },
  },
  mounted() {
    console.log(this.$route.name);
    if (this.$route.name === 'staffProfile') {
      this.endpoint = `/v1/api/tabaadol-e-ketaab/staff/${this.$route.params.userId}`;
    } else {
      this.endpoint = `/v1/api/tabaadol-e-ketaab/client/${this.$route.params.userId}`;
    }
    this.getData();
  },
};
</script>
