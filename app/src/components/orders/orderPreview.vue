<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="6" md="8">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('orderPreview') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-row>
          <v-col cols="12" class="px-5 py-3">
            <div class="d-flex justify-space-between flex-wrap">
              <p>
                <span class="font-weight-black"> {{ $t('fullname') }} : </span>
                <span>
                  {{ order.client.firstName }}
                  {{ order.client.lastName }}
                </span>
              </p>
              <p>
                <span class="font-weight-black"> {{ $t('address') }} : </span>
                <span>
                  {{ order.address.address }}
                </span>
              </p>
              <p>
                <span class="font-weight-black">
                  {{ $t('postalCode') }} :
                </span>
                <span>
                  {{ order.address.zipCode }}
                </span>
              </p>
              <p>
                <span class="font-weight-black"> {{ $t('mobile') }} : </span>
                <span class="numberDir">
                  {{ order.client.mobile }}
                </span>
              </p>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <table
              class="generalTable"
              :class="$vuetify.breakpoint.lg ? '' : 'tableMobileScroll'"
            >
              <thead class=" grey lighten-2">
                <th>
                  {{ $t('orderType') }}
                </th>
                <th>
                  {{ $t('orderNumber') }}
                </th>
                <th>
                  {{ $t('createdAt') }}
                </th>
              </thead>
              <tbody>
                <td>
                  {{ $t(order.type) }}
                </td>
                <td>
                  {{ order.number }}
                </td>
                <td>
                  {{ new Date(order.createdAt).toLocaleDateString('fa') }}
                </td>
              </tbody>
            </table>
          </v-col>
        </v-row>
        <v-row>
          <invoiceItems
            v-if="!isLoading"
            :data="orderItems"
            :deletable="false"
          />
        </v-row>
        <payMethod
          v-if="$store.state.bookShop.userInfo.role !== 'CLIENT'"
          :data="staffData"
        />
        <payMethod
          v-if="$store.state.bookShop.userInfo.role === 'CLIENT'"
          :data="clientData"
        />
        <v-form
          v-model="valid"
          lazy-validation
          v-if="this.$store.state.bookShop.userInfo.role !== 'CLIENT'"
        >
          <v-row no-gutters>
            <v-col cols="12" md="4">
              <v-select
                :items="status"
                :label="$t('status')"
                outlined
                required
                v-model="order.status"
              >
                <template v-slot:item="{ item }">
                  <span>
                    {{ $t(item) }}
                  </span>
                </template>
                <template v-slot:selection="{ item }">
                  <span>
                    {{ $t(item) }}
                  </span>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="4">
              <datePickerCmp
                class="d-flex align-self-baseline pr-4 flex-column"
                :placeHolderText="'sendorRecieveDate'"
                :validate="true"
                @setDate="setDate"
              />
            </v-col>
          </v-row>
          <div class="justify-center d-flex mt-4">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="update"
            >
              {{ $t('update') }}
            </v-btn>
            <v-btn
              :disabled="!valid"
              color="error"
              class="mr-4"
              @click="cancel"
            >
              {{ $t('cancelOrder') }}
            </v-btn>
          </div>
        </v-form>
        <v-form v-if="this.$store.state.bookShop.userInfo.role === 'CLIENT'">
          <div class="justify-center d-flex mt-4">
            <v-btn color="success" class="px-16 py-5" @click="pay">
              {{ $t('payment') }}
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import invoiceItems from '../invoices/invoiceItems.vue';
import payMethod from '../shoppingBag/payMethod.vue';
import datePickerCmp from '../structure/datePickerCmp.vue';

export default {
  name: 'orderPreview',
  components: {
    invoiceItems,
    datePickerCmp,
    payMethod,
  },
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      valid: true,
      isLoading: true,
      orderItems: [],
      status: [
        'INPROGRESS',
        'CANCEL',
        'READYTOSEND',
        'SENDING',
        'RECEIVED',
        'TAKEN',
      ],
      order: {},
      staffData: ['CASH', 'CARD', 'POZ', 'GIFT'],
      clientData: ['CREDIT', 'ONLINE'],
    };
  },
  methods: {
    setDate(value) {
      // this valu is persian date
      // it should convert to gregorian
      console.log(value);
    },
    update() {
      console.log('updated');
    },
    cancel() {
      console.log('updated');
    },
    pay() {
      this.$axios
        .patch(
          `/v1/api/tabaadol-e-ketaab/payment/invoice/${this.order.invoice.id}`
        )
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.$store.commit('bookShop/clearBag', {
              module: 'bookShop',
            });
          }
        })
        .catch(e => {
          if (e.response.status === 406) {
            // the credit is in response message
          }
        });
    },
  },
  mounted() {
    this.$axios
      .get(`/v1/api/tabaadol-e-ketaab/order/${this.$route.params.orderId}`)
      .then(res => {
        if (res.status === 200) {
          this.order = res.data;
          this.orderItems = res.data.invoice.books;
          this.isLoading = false;
        }
      });
  },
};
</script>
