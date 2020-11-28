<template>
  <v-card class="relative">
    <v-list two-line class="relative">
      <v-radio-group :mandatory="true" hide-details>
        <template v-for="item in addresses">
          <v-list-item :key="item.title" class="addressItem">
            <v-radio @click="itemSelect(item)" :value="item.id"></v-radio>

            <v-list-item-content class="text-right  ">
              <v-list-item-title class="pa-2">
                <v-icon>mdi-google-maps</v-icon>
                {{ item.address }}
              </v-list-item-title>
              <v-list-item-subtitle class="pa-2">
                <v-icon>mdi-mailbox</v-icon>
                {{ item.postalCode }}
              </v-list-item-subtitle>
              <div
                class="primary--text  pointer px-2"
                @click="editAddress(item)"
              >
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
      </v-radio-group>
      <v-list-item class=" ma-0 br-t-g">
        <div @click="addNewAddress" class="pointer ">
          <v-icon color="primary" class="pl-4">mdi-map-marker-plus</v-icon>
          <span class="fn13 primary--text">
            {{ $t('addAddress') }}
          </span>
        </div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              rounded
              color="green"
              left
              fab
              absolute
              class="pointer"
              v-bind="attrs"
              v-on="on"
              @click="confirmPostRequest"
            >
              <v-icon color="white"> mdi-checkbox-marked-outline</v-icon>
            </v-btn>
          </template>
          {{ $t('postRequest') }}
        </v-tooltip>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'addressList',

  data() {
    return {
      selectedAddress: {},
      addresses: [
        {
          id: '1',
          address: 'شهران خیابان طوقانی خیابان جهاد پلاک ۳۰ واحد ۷',
          postalCode: '1234567895236',
        },
        {
          id: '2',
          address: ' فاطمی خیابان زرتشت خیابان آزاددل کامبیز پلاک ۱۴',
          postalCode: '1234567895236',
        },
        {
          id: '3',
          address: 'شهران خیابان طوقانی خیابان جهاد پلاک ۳۰ واحد ۷',
          postalCode: '1234567895236',
        },
      ],
    };
  },
  methods: {
    itemSelect(item) {
      this.selectedAddress = item;
    },
    editAddress(item) {
      this.$emit('editAddress', item);
    },
    addNewAddress(item) {
      this.$emit('addNewAddress', item);
    },
    confirmPostRequest() {
      this.$emit('hideAddressList');
    },
  },
};
</script>
<style lang="scss">
.addressItem {
  .v-list-item__content {
    border-bottom: 1px solid #e1d6d6;
  }
  &:last-child {
    .v-list-item__content {
      border-bottom: none;
    }
  }
}
.br-t-g {
  border-top: 1px solid #e1d6d6;
}
.relative {
  position: relative;
}
</style>
