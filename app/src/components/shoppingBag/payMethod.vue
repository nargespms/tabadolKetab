<template>
  <v-row class="justify-center">
    <v-col cols="12" lg="10">
      <div class="pa-3 d-flex align-center ">
        <span class="font-weight-black"> {{ $t('payMethod') }} : </span>
        <v-radio-group
          v-model="payMethod"
          row
          class="pr-6"
          :rules="requireRule"
        >
          <v-radio
            :label="$t('creditPay')"
            value="creditPay"
            class="pr-6"
          ></v-radio>
          <v-radio
            :label="$t('onlinePay')"
            value="onlinePay"
            class="pr-6"
          ></v-radio>
          <v-radio
            :label="$t('presentPay')"
            value="presentPay"
            class="pr-6"
          ></v-radio>
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
      payMethod:'',,
    };
  },
};
</script>
