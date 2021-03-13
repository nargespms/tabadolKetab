<template>
  <v-card class="relative" v-if="!isLoading">
    <v-list two-line class="relative">
      <v-radio-group
        :mandatory="true"
        hide-details
        v-model="selectedAddress"
        class="px-3 my-0"
      >
        <template v-for="item in addresses">
          <v-list-item :key="item.title" class="addressItem pa-0">
            <v-radio
              @click="itemSelect(item)"
              :value="item"
              v-if="$store.state.bookShop.userInfo.role === 'CLIENT'"
            ></v-radio>

            <v-list-item-content class="text-right  ">
              <v-row class="justify-center clear ">
                <v-col cols="12" lg="9">
                  <v-list-item-title class="pa-2">
                    <v-icon>mdi-google-maps</v-icon>
                    {{ item.address }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="pa-2">
                    <v-icon>mdi-mailbox</v-icon>
                    {{ item.zipCode }}
                  </v-list-item-subtitle>
                </v-col>
                <v-col
                  cols="12"
                  lg="2"
                  class="d-flex justify-center align-self-center"
                  v-if="$store.state.bookShop.userInfo.role === 'CLIENT'"
                >
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
                class="pointer px-2"
                @click="editAddress(item)"
                v-if="$store.state.bookShop.userInfo.role === 'CLIENT'"
              >
                <v-icon class="fn18">mdi-subdirectory-arrow-left</v-icon>
                <span class="fn13">
                  {{ $t('editAddress') }}
                </span>
              </div>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-radio-group>
      <v-list-item
        class=" ma-0 br-t-g"
        v-if="this.$store.state.bookShop.userInfo.role === 'CLIENT'"
      >
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
              @click="confirmAddress"
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
  props: {
    clientId: {
      type: String,
    },
  },
  components: {
    promptDialog,
  },
  data() {
    return {
      selectedAddress: {},
      isLoading: true,
      addresses: [],
      // delete
      enableDelete: false,
      deletingItem: {},
    };
  },
  methods: {
    editAddress(item) {
      this.$emit('editAddress', item);
    },
    addNewAddress(item) {
      this.$emit('addNewAddress', item);
    },
    confirmAddress() {
      this.$emit('hideAddressList');
      this.$emit('setAddress', this.selectedAddress);
    },

    // methods for delete notif
    deleteRecord(item) {
      this.deletingItem = item;
      this.enableDelete = true;
    },
    acceptDelete(value) {
      this.$axios
        .delete(`/v1/api/tabaadol-e-ketaab/address/${value.id}`)
        .then(res => {
          if (res.status === 200) {
            this.$emit('deleteAddress', value);
            this.closeDelete();
            this.getAddress();
          }
        });
    },
    closeDelete() {
      this.enableDelete = false;
      this.deletingItem = {};
    },
    getAddress() {
      let endpoint;
      if (this.$store.state.bookShop.userInfo.role === 'CLIENT') {
        endpoint = `/v1/api/tabaadol-e-ketaab/addresses/${this.$store.state.bookShop.userInfo.id}`;
      } else {
        endpoint = `/v1/api/tabaadol-e-ketaab/addresses/${this.clientId}`;
      }

      this.$axios.get(endpoint).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.addresses = res.data.addresses;
          this.isLoading = false;
        }
      });
    },
  },
  mounted() {
    this.getAddress();
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
