<template>
  <div>
    <div
      class="clientNumberWrap px-3 pt-3 d-flex align-center justify-space-between"
    >
      <v-tabs light vertical background-color="transparent" v-model="tab">
        <v-tab
          v-for="tab in tabs"
          :key="tab.index"
          class="justify-space-between"
        >
          <v-icon class="pl-4">
            {{ tab.icon }}
          </v-icon>
          {{ $t(tab.text) }}
        </v-tab>

        <v-tab-item background-color="transparent" class="w250">
          <div class="w250 pr-8">
            <nationalId
              @setNationalId="setNationalId"
              :isRequire="true"
              :key="nationalIdKey"
            />
          </div>
        </v-tab-item>
        <v-tab-item>
          <div class="w250 pr-8">
            <mobilePhone
              @setMobilePhone="setMobilePhone"
              :validate="true"
              :mode="'edit'"
              :isRequired="true"
              :phone="false"
              :key="mobileKey"
            />
          </div>
        </v-tab-item>
      </v-tabs>
      <div>
        <v-btn color="success" @click="getClientInfo" class="d-block mb-3">
          <v-icon color="white" class="pl-1">
            mdi-account-check
          </v-icon>
          {{ $t('getClient') }}
        </v-btn>
        <v-btn color="primary" @click="addUserModal" class="d-block mb-3">
          <v-icon color="white" class="pl-2">mdi-account-plus </v-icon>
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
import nationalId from '../userControls/nationalId.vue';

import AddUser from './addUser.vue';
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'getClientByMobile',
  components: {
    mobilePhone,
    AddUser,
    nationalId,
  },
  mixins: [moneyFormat],

  data() {
    return {
      mobile: '',
      nationalId: '',
      client: {},

      mobileKey: 0,
      nationalIdKey: 0,

      adduserModal: false,

      tab: '',
      tabs: [
        { text: 'nationalId', icon: 'mdi-card-account-details-star-outline' },
        { text: 'mobile', icon: 'mdi-card-account-phone-outline' },
      ],
    };
  },
  methods: {
    setMobilePhone(value) {
      this.mobile = value;
    },
    setNationalId(value) {
      this.nationalId = value;
    },
    getClientInfo() {
      this.client = {};
      if (this.tab === 1) {
        this.getClientBymobile();
      } else if (this.tab === 0) {
        this.getClientByNationalId();
      }
    },

    getClientBymobile() {
      this.$axios
        .get(`/v1/api/tabaadol-e-ketaab/client/mobile/${this.mobile}`)
        .then(res => {
          if (res.status === 200) {
            this.$emit('setUser', res.data.user.id);
            this.client = res.data.user;
            this.mobile = '';
            this.nationalId = '';
            this.nationalIdKey += 1;
          }
        })
        .catch(e => {
          this.$emit('clientError');

          if (e.response.status === 404) {
            this.$emit('clientError');
          }
        });
    },

    getClientByNationalId() {
      this.$axios
        .get(`/v1/api/tabaadol-e-ketaab/client/nationalId/${this.nationalId}`)
        .then(res => {
          if (res.status === 200) {
            this.$emit('setUser', res.data.user.id);
            this.client = res.data.user;

            this.mobileKey += 1;
          }
        })
        .catch(e => {
          this.$emit('clientError');

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
  .v-tabs-items {
    background-color: transparent !important;
  }
}
</style>
