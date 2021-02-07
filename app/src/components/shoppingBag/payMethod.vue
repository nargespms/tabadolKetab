<template>
  <v-row class="justify-center">
    <v-col cols="12" lg="10">
      <div class="pa-3 d-flex align-center ">
        <span class="font-weight-black"> {{ $t('payMethod') }} : </span>
        <v-radio-group
          v-model="payMethod"
          @change="setMethod"
          row
          class="pr-6"
          :rules="requireRule"
        >
          <v-radio :label="$t('CASH')" value="CASH" class="pr-6"></v-radio>
          <v-radio :label="$t('CARD')" value="CARD" class="pr-6"></v-radio>
          <v-radio :label="$t('POZ')" value="POZ" class="pr-6"></v-radio>
          <v-radio :label="$t('GIFT')" value="GIFT" class="pr-6"></v-radio>
        </v-radio-group>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'payMethod',
  data() {
    return {
      payMethod: '',
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
    };
  },
  methods: {
    setMethod() {
      this.$emit('setMethod', this.payMethod);
    },
  },
};
</script>
