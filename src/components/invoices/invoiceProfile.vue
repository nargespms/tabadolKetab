<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="6" md="8">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('invoicePreview') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="white" @click="invoiceList"> fa fa-table</v-icon>
              </v-btn>
            </template>
            <span>
              {{ $t('invoicesList') }}
            </span>
          </v-tooltip>
        </v-card-actions>
        <v-row class="pa-2">
          <invoiceItems
            v-if="!isLoading"
            :data="invoiceItems"
            :deletable="false"
          />
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import invoiceItems from './invoiceItems.vue';

export default {
  name: 'invoiceProfile',
  components: {
    invoiceItems,
  },
  data() {
    return {
      isLoading: true,
      invoiceItems: [],
    };
  },
  methods: {
    invoiceList() {
      this.$router.push({
        name: 'invoicesList',
      });
    },
  },
  mounted() {
    this.invoiceItems = [
      {
        bookName: 'ملت عشق',
        barcode: '121314156',
        mainPrice: '22000000',
        priceWithDiscount: '1100000',
      },
      {
        bookName: ' جین ایر',
        barcode: '45678900',
        mainPrice: '7900000',
        priceWithDiscount: '560000',
      },
      {
        bookName: ' دیوانه ای بالای بام ',
        barcode: '678900342',
        mainPrice: '20000',
        priceWithDiscount: '15000',
      },
    ];
    this.isLoading = false;
  },
};
</script>
