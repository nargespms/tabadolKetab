<template>
  <v-row>
    <v-col>
      <div class="discountWrap pa-3 d-flex align-center justify-space-between">
        <div class="w250">
          <v-text-field
            v-model="discountCode"
            :label="$t('discountCode')"
            outlined
            hide-details
            class="white"
          ></v-text-field>
        </div>
        <v-btn
          :disabled="discountCode.length < 1 || this.usedCoupon"
          color="success"
          class="align-self-end"
          @click="setDiscount"
        >
          اعمال
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'discountCode',
  props: {
    invoiceId: {
      type: String,
    },
  },
  data() {
    return {
      discountCode: '',
      usedCoupon: false,
    };
  },
  methods: {
    setDiscount() {
      console.log(this.discountCode);
      this.$axios
        .patch(`/v1/api/tabaadol-e-ketaab/invoice/coupon/${this.invoiceId}`, {
          code: this.discountCode,
        })
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            this.$emit('changeOrderTotal', res.data.finalTotal);
            this.usedCoupon = true;
          }
        })
        .catch(e => {
          if (e.response.status === 400) {
            // unvalidDate or used or deleeted
            this.$emit('errorCoupon');
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
