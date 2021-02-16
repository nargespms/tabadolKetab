<template>
  <div class="clientNumberWrap pa-3 d-flex align-center justify-space-between">
    <div class="w250">
      <mobilePhone
        @setMobilePhone="setMobilePhone"
        :validate="true"
        :mode="'edit'"
        :isRequired="true"
        :phone="false"
      />
    </div>
    <v-btn :disabled="mobile.length < 1" color="success" @click="getClientInfo">
      {{ $t('getClient') }}
    </v-btn>
    <div v-if="client">
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
    };
  },
  methods: {
    setMobilePhone(value) {
      console.log(value);
      this.mobile = value;
    },
    getClientInfo() {
      console.log(this.mobile);
      this.$axios.get('', {}).then(res => {
        if (res.status === 200) {
          console.log(res);
          this.$emit('setUser', res.data);
          this.client = res.data;
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
.discountWrap {
  border: 1px solid #bfbfbf;
  border-radius: 2px;
  background-color: #e6e4e4;
}
</style>
