<template>
  <div>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <profileCmp
      v-if="!isLoading"
      :data="userData"
      @reloadUserData="getData"
      @success="success"
    />

    <notifMessage
      v-if="saveSuccess"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
      :type="'success'"
    />
  </div>
</template>

<script>
import profileCmp from '../../components/users/profileCmp.vue';
import notifMessage from '../../components/structure/notifMessage.vue';

export default {
  name: 'profile',
  metaInfo: {
    title: 'پروفایل ',
  },
  components: { profileCmp, notifMessage },
  data() {
    return {
      isLoading: true,
      endpoint: '',
      userData: {},
      saveSuccess: false,
    };
  },
  methods: {
    getData() {
      this.$axios.get(this.endpoint).then(res => {
        if (res.status === 200) {
          this.userData = res.data.user;
          this.isLoading = false;
        }
      });
    },
    success() {
      console.log('jj');
      this.saveSuccess = true;
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
  },
  mounted() {
    if (this.$store.state.bookShop.userInfo.role === 'CLIENT') {
      this.endpoint = `/v1/api/tabaadol-e-ketaab/client/${this.$route.params.userId}`;
    } else {
      this.endpoint = `/v1/api/tabaadol-e-ketaab/staff/${this.$route.params.userId}`;
    }
    this.getData();
  },
};
</script>
