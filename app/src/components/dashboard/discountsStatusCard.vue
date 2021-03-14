<template>
  <div>
    <v-row class="justify-center">
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'discountsCodeNumber'"
          :number="discounts.coupons"
          :color="color"
          :link="'/couponList'"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'activeDiscountsCodeNumber'"
          :number="discounts.activeCodes"
          :color="color"
          :link="'/couponList'"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'usedDiscountsCodeNumber'"
          :number="discounts.usedCodes"
          :color="color"
          :link="'/couponList?filter[used]=true'"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import statusCard from './statusCard.vue';

export default {
  name: 'discountsStatusCard',
  components: {
    statusCard,
  },
  data() {
    return {
      color: '#5D4037',
      discounts: {
        coupons: 0,
        activeCodes: 0,
        usedCodes: 0,
      },
    };
  },
  methods: {
    getTotalCoupons() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/report/coupons').then(res => {
        if (res.status === 200) {
          this.discounts.coupons = res.data.count;
        }
      });
    },
    getActiveCoupons() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/coupons', {
          params: {
            filter: {
              active: true,
            },
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.discounts.activeCodes = res.data.count;
          }
        });
    },
    getUsedCoupons() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/coupons', {
          params: {
            filter: {
              used: true,
            },
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.discounts.usedCodes = res.data.count;
          }
        });
    },
  },
  mounted() {
    this.getTotalCoupons();
    this.getActiveCoupons();
    this.getUsedCoupons();
  },
};
</script>
