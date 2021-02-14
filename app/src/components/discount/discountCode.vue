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
          :disabled="discountCode.length < 1"
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
  data() {
    return {
      discountCode: '',
    };
  },
  methods: {
    setDiscount() {
      console.log(this.discountCode);
      // this.$axios.post('', this.discountCode).then(res => {
      //   if (res.status === 200) {
      //     this.$emit('changeOrderTotal', res.data.total);
      //   }
      // });
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
