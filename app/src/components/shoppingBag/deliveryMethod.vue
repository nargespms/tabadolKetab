<template>
  <div class="pa-3 d-flex align-center ">
    <span class="font-weight-black"> {{ $t('sendWay') }} : </span>
    <v-radio-group
      v-model="delivery"
      @change="setDelivery"
      row
      class="pr-6"
      :rules="requireRule"
      required
    >
      <v-radio :label="$t('PRESENCE')" value="PRESENCE" class="pr-6"></v-radio>
      <v-radio :label="$t('TABADOL')" value="TABADOL" class="pr-6"></v-radio>
      <v-radio :label="$t('TIPAX')" value="TIPAX" class="pr-6"></v-radio>
      <v-radio :label="$t('POST')" value="POST" class="pr-6"></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  name: 'deliveryMethod',
  data() {
    return {
      delivery: 'PRESENCE',
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
    };
  },
  methods: {
    setDelivery() {
      this.$emit('setDeliveryMethod', this.delivery);
    },
  },
};
</script>
