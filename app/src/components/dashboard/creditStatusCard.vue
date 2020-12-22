<template>
  <v-card min-height="130" :style="`border:1px solid ${color}`">
    <v-card-title class="justify-center flex-column">
      <p :style="`color:${color}`">
        {{ $t(lable) }}
      </p>
      <span v-if="number">
        {{ moneyFormat(number) }}
        {{ $t('rial') }}
      </span>
    </v-card-title>
  </v-card>
</template>

<script>
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
  methods: {
    moneyFormat(value) {
      return new Intl.NumberFormat('es-ES').format(value);
    },
  },
};
</script>
