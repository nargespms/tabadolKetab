<template>
  <div>
    <div class="d-flex rangeItem">
      <span> {{ $t('rangeDate') }} {{ $t('from') }} </span>
      <v-text-field
        v-model="rangeDate.from"
        :rules="requireRule"
        required
        outlined
        v-mask="'######'"
        :hint="this.rangeDate.from ? `${rangeDate.from}${$t('day')}` : ''"
        :persistentHint="rangeDate.from ? true : false"
        error-count="1"
      >
      </v-text-field>
    </div>
    <div class="d-flex rangeItem">
      <span> {{ $t('rangeDate') }} {{ $t('to') }} </span>
      <v-text-field
        v-model="rangeDate.to"
        :rules="requireRule"
        required
        outlined
        v-mask="'######'"
        :hint="this.rangeDate.to ? `${rangeDate.to}${$t('day')}` : ''"
        :persistentHint="rangeDate.to ? true : false"
        error-count="1"
      >
      </v-text-field>
    </div>
    <div class="d-flex rangeItem">
      <span>
        {{ $t('discountPercent') }}
      </span>
      <v-text-field
        v-model="rangeDate.percent"
        :rules="requireRule"
        required
        outlined
        v-mask="'######'"
        :hint="this.rangeDate.percent ? `${rangeDate.percent}${$t('%')}` : ''"
        :persistentHint="rangeDate.percent ? true : false"
        error-count="1"
        @input="sendValue"
        debounce="2000"
      >
      </v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rangeDataDiscount',
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
</style>
