<template>
  <div class="pa-3 br-1-e8">
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
        v-model.lazy="rangeDate.percent"
        :rules="requireRule"
        required
        outlined
        v-mask="'######'"
        :hint="this.rangeDate.percent ? `${rangeDate.percent}${$t('%')}` : ''"
        :persistentHint="rangeDate.percent ? true : false"
        error-count="1"
      >
      </v-text-field>
    </div>
    <div class="d-flex justify-end">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="green" v-bind="attrs" v-on="on" @click="sendValue">
            <v-icon color="white"> mdi-checkbox-marked-outline</v-icon>
          </v-btn>
        </template>
        <span>
          {{ $t('save') }}
        </span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="red darken-1"
            class="mr-3"
            v-bind="attrs"
            v-on="on"
            @click="reset"
          >
            <v-icon color="white"> mdi-delete</v-icon>
          </v-btn>
        </template>
        {{ $t('delete') }}
      </v-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rangeDateDiscount',
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
