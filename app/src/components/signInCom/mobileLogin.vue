<template>
  <v-form ref="form" v-model="valid">
    <mobilePhone :validate="true" @setMobilePhone="setMobilePhone" />
    <password @setPassword="setPassword" />
    <v-row>
      <v-col cols="12" md="12">
        <v-row>
          <v-col cols="12" md="12">
            <captcha @setCaptcha="setCaptcha" :key="captchaKey" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="justify-center d-flex">
      <v-btn
        :disabled="!valid"
        color="success"
        class="px-5"
        @click="validate"
        width="200"
      >
        {{ $t('enter') }}
      </v-btn>
    </div>
    <v-row>
      <v-col class="text-center my-3">
        <router-link
          v-if="$route.name === 'login'"
          class="primary--text "
          :to="{ name: 'admin-login' }"
        >
          آیا کارمند هستید ؟ اینجا را کلیک کنید
        </router-link>
        <router-link v-else class="primary--text" :to="{ name: 'login' }">
          آیا عضو مشتریان تبادل هستید ؟ اینجا را کلیک کنید
        </router-link>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import password from '../userControls/passwordsCom/password.vue';
import captcha from '../userControls/captcha.vue';
import mobilePhone from '../userControls/mobilePhone.vue';

export default {
  name: 'mobileLogin',
  components: {
    password,
    captcha,
    mobilePhone,
  },
  props: {
    endpoint: {
      type: String,
    },
  },
  data() {
    return {
      captcha: {},
      valid: false,
      login: {},
      captchaKey: 0,
    };
  },
  methods: {
    setCaptcha(value) {
      this.captcha = value;
    },
    setMobilePhone(value) {
      this.login.mobile = value;
      console.log(value);
    },
    setPassword(value) {
      this.login.password = value;
    },
    getUnreadTickets() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/unreadTickets').then(res => {
        this.$store.commit('bookShop/unreadTicketCal', res.data.toString(), {
          module: 'bookShop',
        });
      });
    },
    getUnreadBookRequest() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/unread-requested-book')
        .then(res => {
          this.unreadBookRequest = res.data.toString();
          this.$store.commit('bookShop/unreadBookReqCal', res.data.toString(), {
            module: 'bookShop',
          });
        });
    },
    getUnreadMessages() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/unread-messages').then(res => {
        if (res.status === 200) {
          this.$store.commit(
            'bookShop/unreadMessagesCal',
            res.data.toString(),
            {
              module: 'bookShop',
            }
          );
          this.menuKey += 1;
        } else {
          this.$store.commit('bookShop/unreadMessagesCal', '', {
            module: 'bookShop',
          });
          this.menuKey += 1;
        }
      });
    },
    validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.$axios
          .post(this.endpoint, {
            ...this.login,
            captcha: this.captcha,
          })
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              this.getUnreadTickets();
              this.getUnreadBookRequest();
              this.getUnreadMessages();
              this.$store.commit('bookShop/userEnter', res.data.user, {
                module: 'bookShop',
              });
              this.$store.commit('bookShop/loggedIn', true, {
                module: 'bookShop',
              });
              this.$router.push({
                name: 'dashboard',
              });
            }
          })
          .catch(e => {
            if (e.response.status === 406) {
              this.captchaKey += 1;
              this.$emit('error406');
            }
            if (e.response.status === 404) {
              this.captchaKey += 1;
              this.$emit('error404');
            }
          });
      } else {
        this.valid = false;
      }
    },
  },
};
</script>
