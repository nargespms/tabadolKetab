<template>
  <v-card class="relative">
    <v-list two-line class="relative">
      <v-radio-group :mandatory="true" hide-details>
        <template v-for="item in addresses">
          <v-list-item :key="item.title" class="addressItem">
            <v-radio @click="itemSelect(item)" :value="item.id"></v-radio>

            <v-list-item-content class="text-right  ">
              <v-row>
                <v-col cols="12" lg="10">
                  <v-list-item-title class="pa-2">
                    <v-icon>mdi-google-maps</v-icon>
                    {{ item.address }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="pa-2">
                    <v-icon>mdi-mailbox</v-icon>
                    {{ item.postalCode }}
                  </v-list-item-subtitle>
                </v-col>
                <v-col cols="12" lg="2" class="d-flex align-self-center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        medium
                        class="ma-2"
                        color="grey darken-3"
                        @click="deleteRecord(item)"
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-delete
                      </v-icon>
                    </template>
                    {{ $t('delete') }}
                  </v-tooltip>
                </v-col>
              </v-row>
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
        <v-btn
          text
          :disabled="addresses.length >= 3"
          @click="addNewAddress"
          class="fn13 primary--text"
        >
          <v-icon color="primary" class="pl-4">mdi-map-marker-plus</v-icon>
          <span v-if="addresses.length < 3">
            {{ $t('addAddress') }}
          </span>
          <span class="fn13 " v-else>
            حداکثر تعداد آدرس ۳ میباشد
          </span>
        </v-btn>
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
          {{ $t('bookSendReq') }}
        </v-tooltip>
      </v-list-item>
    </v-list>
    <v-dialog v-model="enableDelete" max-width="500px">
      <promptDialog
        :title="'deleteAddress'"
        :message="'RUSureUWantToDeletThisAddress'"
        :data="deletingItem"
        @accept="acceptDelete"
        @reject="closeDelete"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import promptDialog from '../structure/promptDialog.vue';

export default {
  name: 'addressList',
  components: {
    promptDialog,
  },
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
      // delete
      enableDelete: false,
      deletingItem: {},
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

    // methods for delete notif
    deleteRecord(item) {
      this.deletingItem = item;
      this.enableDelete = true;
    },
    acceptDelete(value) {
      console.log(`deleted ${value.name}`);
      this.$emit('deleteAddress', value);

      this.closeDelete();
    },
    closeDelete() {
      this.enableDelete = false;
      this.deletingItem = {};
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
