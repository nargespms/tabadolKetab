<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" md="11">
      <v-card>
        <v-card-actions class="teal pointer" @click="show = !show">
          <v-card-title class="white--text pa-0">
            <span class="pointer">
              {{ $t('searchResult') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-expand-transition>
          <v-row v-show="show" no-gutters class="pa-4">
            <v-col
              cols="12"
              md="4"
              lg="3"
              sm="6"
              v-for="item in localData"
              :key="item.index"
            >
              <bookCard
                :book="item"
                @staffBuy="staffBuy"
                @loginProblem="loginProblem"
              />
            </v-col>
          </v-row>
        </v-expand-transition>
        <div class="d-flex justify-center" v-if="show">
          <v-btn
            class="ma-2 d-flex"
            :loading="loadingMore"
            :disabled="enableLoadingMore"
            color="teal white--text"
            @click="getMoreData"
          >
            {{ $t(uploadMoreBut) }}
          </v-btn>
        </div>
      </v-card>
    </v-col>
    <notifMessage
      v-if="errorEnable"
      :msg="errorMsg"
      @hideNotif="hideError"
      :type="'error'"
    />
    <v-dialog v-model="loginMsgEnable" max-width="500px">
      <promptDialog
        :title="loginTitle"
        :message="loginMsg"
        @accept="acceptLogin"
        @reject="closeLogin"
      />
    </v-dialog>
  </v-row>
</template>

<script>
import bookCard from '../book/bookCard.vue';
import notifMessage from '../structure/notifMessage.vue';
import promptDialog from '../structure/promptDialog.vue';

export default {
  name: 'booksSearchResults',
  components: {
    bookCard,
    notifMessage,
    promptDialog,
  },
  props: {
    data: {
      type: Array,
    },
    loadingMore: {
      type: Boolean,
    },
    enableLoadingMore: {
      type: Boolean,
    },
    uploadMoreBut: {
      type: String,
    },
  },
  data() {
    return {
      show: true,
      localData: this.data,
      // error
      errorEnable: false,
      errorMsg: '',
      // login error
      loginMsgEnable: false,
      loginMsg: '',
      loginTitle: '',
    };
  },
  methods: {
    hideError() {
      this.errorEnable = false;
    },
    staffBuy() {
      this.errorEnable = true;
      this.errorMsg = 'staffCantBuyBooks';
    },
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
    getMoreData() {
      this.$emit('getMoreData');
    },
  },
  watch: {
    data(newVal) {
      this.localData = newVal;
    },
  },
};
</script>
<style lang="scss">
.min-330h {
  min-height: 330px;
}
</style>
