<template>
  <div class="pa-3 br-1-e8">
    <div class="d-flex rangeItem">
      <span> {{ $t('afterDate') }} </span>
      <v-text-field
        v-model="rangeDate[dateName]"
        :rules="requireRule"
        required
        outlined
        :hint="this.date ? `${date}${$t('day')}` : ''"
        :persistentHint="date ? true : false"
        v-mask="'######'"
        error-count="1"
        @input="setDate"
      >
      </v-text-field>
    </div>

    <div class="d-flex rangeItem">
      <span>
        {{ $t('discountPercent') }}
      </span>
      <v-text-field
        v-model.lazy="rangeDate[percentName]"
        outlined
        :hint="this.percent ? `${percent}${$t('%')}` : ''"
        :persistentHint="percent ? true : false"
        v-mask="'######'"
        error-count="1"
        @input="setPercent"
      >
      </v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rangeDateDiscount',
  props: {
    date: {
      type: Number,
    },
    percent: {
      type: Number,
    },
    dateName: {
      type: String,
    },
    percentName: {
      type: String,
    },
  },
  data() {
    return {
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      rangeDate: {},
    };
  },
  methods: {
    sendValue() {
      this.$emit('setDateRange', this.rangeDate);
    },
    reset() {
      this.rangeDate = {};
    },
    setDate() {
      // this.rangeDate[this.dateName] = rangeDate[this.dateName];
      this.sendValue();
      // console.log(this.rangeDate);
    },
    setPercent() {
      // this.rangeDate[this.percentName] = this.rangeDate.percent;
      this.sendValue();
      // console.log(this.rangeDate);
    },
  },
  watch: {
    date(newVal) {
      this.rangeDate[this.dateName] = newVal;
    },
    percent(newVal) {
      this.rangeDate[this.percentName] = newVal;
    },
  },
};
</script>
<style lang="scss">
.rangeItem {
  span {
    width: 40%;
  }
  .v-text-field {
    width: 60%;
  }
}
.br-1-e8 {
  border: 1px solid #e8e8e8;
}
</style>
