<template>
  <div>
    <div
      class="clientNumberWrap pa-3 d-flex align-center justify-space-between"
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
      <v-btn
        :disabled="mobile.length < 1"
        color="success"
        @click="getClientInfo"
      >
        {{ $t('getClient') }}
      </v-btn>
    </div>
    <div v-if="client.firstName">
      <span class="font-weight-black"> {{ $t('fullname') }} : </span>
      <span>
        {{ client.firstName }}
        {{ client.lastName }}
      </span>
    </div>
  </div>
</template>

<script>
import mobilePhone from '../userControls/mobilePhone.vue';

export default {
  name: 'getClientByMobile',
  components: {
    mobilePhone,
  },
  data() {
    return {
      mobile: '',
      client: {},
      mobileKey: 0,
    };
  },
  methods: {
    setMobilePhone(value) {
      console.log(value);
      this.mobile = value;
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
