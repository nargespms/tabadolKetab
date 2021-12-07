<template>
  <v-card min-height="130" :style="`border:1px solid ${color}`">
    <v-card-title class="justify-center flex-column">
      <p :style="`color:${color}`">
        {{ $t(lable) }}
      </p>
      <span>
        {{ moneyFormat(number) }}
        <span v-if="number !== 0">
          {{ $t('rial') }}
        </span>
      </span>
    </v-card-title>
  </v-card>
</template>

<script>
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'creditStatusCard',
  props: {
    lable: {
      type: String,
    },

    number: {
      type: Number,
    },

    color: {
      type: String,
    },
  },
  mixins: [moneyFormat],
};
</script>
