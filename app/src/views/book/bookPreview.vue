<template>
  <div>
    <bookProfile
      @loginProblem="loginProblem"
      @staffBuy="staffBuy"
      @setBookName="setBookName"
    />
    <v-dialog v-model="loginMsgEnable" max-width="500px">
      <promptDialog
        :title="loginTitle"
        :message="loginMsg"
        @accept="acceptLogin"
        @reject="closeLogin"
      />
    </v-dialog>
    <notifMessage
      v-if="errorEnable"
      :msg="errorMsg"
      @hideNotif="hideError"
      :type="'error'"
    />
  </div>
</template>

<script>
import bookProfile from '../../components/book/bookProfile.vue';
import promptDialog from '../../components/structure/promptDialog.vue';
import notifMessage from '../../components/structure/notifMessage.vue';

export default {
  name: 'bookPreview',
  metaInfo: {
    title: 'مشاهده کتاب',
  },
  components: {
    bookProfile,
    promptDialog,
    notifMessage,
  },
  data() {
    return {
      // login error
      loginMsgEnable: false,
      loginMsg: '',
      loginTitle: '',
      // error
      errorEnable: false,
      errorMsg: '',
      pageTitle: '',
    };
  },
  methods: {
    loginProblem() {
      this.loginMsgEnable = true;
      this.loginTitle = 'registerOrLogin';
      this.loginMsg = 'youShouldregisterOrloginFirst';
    },
    acceptLogin() {
      this.$router.push({
        name: 'login',
      });
    },
    closeLogin() {
      this.loginMsgEnable = false;
    },
    staffBuy() {
      this.errorEnable = true;
      this.errorMsg = 'staffCantBuyBooks';
    },
    hideError() {
      this.errorEnable = false;
    },
    setBookName(value) {
      this.pageTitle = value;
    },
  },
};
</script>
