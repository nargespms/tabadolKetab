<template>
  <div class="pa-3 br-1-e8">
    <div class="d-flex rangeItem">
      <span> {{ $t('afterDate') }} </span>
      <v-text-field
        v-model="date"
        :rules="requireRule"
        required
        outlined
        v-mask="'######'"
        :hint="this.date ? `${date}${$t('day')}` : ''"
        :persistentHint="date ? true : false"
        error-count="1"
      >
      </v-text-field>
    </div>

    <div class="d-flex rangeItem">
      <span>
        {{ $t('discountPercent') }}
      </span>
      <v-text-field
        v-model.lazy="percent"
        :rules="requireRule"
        required
        outlined
        v-mask="'######'"
        :hint="this.percent ? `${percent}${$t('%')}` : ''"
        :persistentHint="percent ? true : false"
        error-count="1"
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
      type: String,
    },
    percent: {
      type: String,
    }
  },
  data() {
    return {
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      rangeDate: {},
    };
  },
  methods: {
    sendValue() {
      console.log('chandbar inja miay?');
      this.$emit('setDateRange', this.rangeDate);
    },
    reset() {
      this.rangeDate = {};
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
