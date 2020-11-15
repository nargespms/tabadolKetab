<template>
  <v-card>
    <v-toolbar color="teal " flat height="48">
      <span class="pr-4 font-weight-medium white--text">
        {{ $t('selectAddress') }}
      </span>
    </v-toolbar>
    <template v-for="item in addresses">
      <v-list-item class="addressItem" :key="item.title">
        <v-radio :value="true"></v-radio>

        <v-list-item-content>
          <v-list-item-title class="pa-2">
            <v-icon>mdi-google-maps</v-icon>
            {{ item.address }}
          </v-list-item-title>
          <v-list-item-subtitle class="pa-2">
            <v-icon>mdi-mailbox</v-icon>
            {{ item.postalCode }}
          </v-list-item-subtitle>
          <div class="primary--text  pointer">
            <v-icon color="primary" class="fn18"
              >mdi-subdirectory-arrow-left</v-icon
            >
            <span class="fn13">
              {{ $t('editAddress') }}
            </span>
          </div>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-card>
</template>

<script>
export default {
  name: 'addressCmp',
  data() {
    return {
      selectedAddress: {},
      addresses: [
        {
          address: 'شهران خیابان طوقانی خیابان جهاد پلاک ۳۰ واحد ۷',
          postalCode: '1234567895236',
        },
        {
          address: ' فاطمی خیابان زرتشت خیابان آزاددل کامبیز پلاک ۱۴',
          postalCode: '1234567895236',
        },
        {
          address: 'شهران خیابان طوقانی خیابان جهاد پلاک ۳۰ واحد ۷',
          postalCode: '1234567895236',
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.addressItem {
  border-bottom: 1px solid #e1d6d6;
}
</style>
