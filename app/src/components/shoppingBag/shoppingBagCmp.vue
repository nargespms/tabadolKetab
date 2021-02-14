<template>
  <v-row class="justify-center">
    <v-col cols="12" lg="11">
      <v-overlay :value="orderLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <bag v-if="!orderLoaded" @getOrderData="getOrderData" />
    </v-col>
  </v-row>
</template>

<script>
import bag from './bag.vue';

export default {
  name: 'shoppingBagCmp',
  components: {
    bag,
  },
  data() {
    return {
      isLoading: true,
      items: [],
      delivery: ['PRESENCE', 'TABADOL', 'TIPAX', 'POST'],
      bag: {
        delivery: 'PRESENCE',
      },
      valid: true,
      addressModalEnable: false,
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      totalPrice: 12000000,
      itemsKey: 0,
      selectedAddress: '',
      orderLoading: false,
      // invoice
      orderLoaded: false,
      orderId: '',
    };
  },
  methods: {
    getOrderData(orderId) {
      this.orderId = orderId;
      this.orderLoaded = true;
      this.$router.push({
        path: `/ordersList/${orderId}`,
      });
    },
  },
};
</script>

<style lang="scss">
.br-rd-3 {
  border-radius: 3px;
}
</style>
