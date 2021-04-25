<template>
  <div>
    <div
      class="clientNumberWrap px-3 pt-3 d-flex align-center justify-space-between"
    >
      <div class="w250">
        <mobilePhone
          @setMobilePhone="setMobilePhone"
          :validate="true"
          :mode="'edit'"
          :isRequired="true"
          :phone="false"
          :key="mobileKey"
        />
      </div>
      <div>
        <v-btn color="success" @click="getClientInfo" class="d-block mb-3">
          <v-icon color="white" v-bind="attrs" v-on="on" class="pl-1">
            mdi-account-check
          </v-icon>
          {{ $t('getClient') }}
        </v-btn>
        <v-btn color="primary" @click="addUserModal" class="d-block mb-3">
          <v-icon color="white" v-bind="attrs" v-on="on" class="pl-2"
            >mdi-account-plus
          </v-icon>
          {{ $t('AddUser') }}
        </v-btn>
      </div>
    </div>
    <v-row class="justify-center" v-if="client.firstName">
      <v-col class="mt-2 text-center">
        <span class="font-weight-black fn13 "> {{ $t('fullname') }} : </span>
        <span>
          {{ client.firstName }}
          {{ client.lastName }}
        </span>
        <span class="font-weight-black fn13 mr-7">
          {{ $t('creditAmount') }} :
        </span>
        <span>{{ this.moneyFormat(client.credit) }} {{ $t('rial') }}</span>
      </v-col>
    </v-row>
    <v-dialog v-model="adduserModal" hide-overlay max-width="900px">
      <addUser :mode="'add'" @closeModal="closeModal" :colWidth="'12'" />
    </v-dialog>
  </div>
</template>

<script>
import mobilePhone from '../userControls/mobilePhone.vue';
import AddUser from './addUser.vue';
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'getClientByMobile',
  components: {
    mobilePhone,
    AddUser,
  },
  mixins: [moneyFormat],

  data() {
    return {
      mobile: '',
      client: {},
      mobileKey: 0,
      adduserModal: false,
    };
  },
  methods: {
    setMobilePhone(value) {
      this.mobile = value;
      console.log('ddd');
    },
    getClientInfo() {
      console.log(this.mobile);
      this.$axios
        .get(`/v1/api/tabaadol-e-ketaab/client/mobile/${this.mobile}`)
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            this.$emit('setUser', res.data.user.id);
            this.client = res.data.user;
            this.mobile = '';
            // this.mobileKey += 1;
          }
        })
        .catch(e => {
          if (e.response.status === 404) {
            this.$emit('clientError');
          }
        });
    },
    addUserModal() {
      this.adduserModal = true;
    },
    closeModal() {
      this.adduserModal = false;
    },
  },
};
</script>

<style lang="scss">
.w250 {
  width: 250px;
}
.clientNumberWrap {
  border: 1px solid #bfbfbf;
  border-radius: 2px;
  background-color: #f0efef;
}
</style>
