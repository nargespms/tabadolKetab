<template>
  <v-card class="pa-4">
    <v-card-title class="headline text-center justify-space-around">
      <span class="text-center"> {{ $t(title) }} &nbsp; </span>
    </v-card-title>
    <v-card-text class="text-center">
      <span>
        مقدار اعتبار مورد نیاز برای تکمیل خرید :
      </span>
      {{ this.moneyFormat(amount) }} {{ $t('rial') }}
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" outlined @click="accepted">
        {{ $t('increaseCredit') }}
      </v-btn>
      <v-btn color="red darken-3" outlined @click="rejected"
        >{{ $t('onlinePay') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'creditWarning',
  props: {
    title: {
      type: String,
    },
    amount: {
      type: String,
    },
  },
  mixins: [moneyFormat],
  data() {
    return {
      dialog: true,
    };
  },
  methods: {
    accepted() {
      this.$emit('accept', this.item);
    },
    rejected() {
      this.$emit('reject', this.item);
    },
  },
};
</script>
