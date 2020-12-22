<template>
  <div>
    <v-row>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'discountsCodeNumber'"
          :number="discounts.codes"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'activeDiscountsCodeNumber'"
          :number="discounts.activeCodes"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'usedDiscountsCodeNumber'"
          :number="discounts.usedCodes"
          :color="color"
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
        codes: 1100,
        activeCodes: 150,
        usedCodes: 1040,
      },
    };
  },
};
</script>
