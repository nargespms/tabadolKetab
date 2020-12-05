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
                <th>
                  {{ $t('user') }}
                </th>
                <th>
                  {{ $t('phone') }}
                </th>
              </thead>
              <tbody>
                <td>
                  {{ $t(order.type) }}
                </td>
                <td>
                  {{ order.orderNumber }}
                </td>
                <td>
                  {{ new Date(order.createdAt).toLocaleDateString('fa') }}
                </td>
                <td>
                  {{ order.user }}
                </td>
                <td>
                  {{ order.phone }}
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

        <v-form v-model="valid" lazy-validation>
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
            <v-col cols="12" md="4" class="text-left">
              <span class=" primary--text">
                *این دو فیلد برای admin است
              </span>
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
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import invoiceItems from '../invoices/invoiceItems.vue';
import datePickerCmp from '../structure/datePickerCmp.vue';

export default {
  name: 'orderPreview',
  components: {
    invoiceItems,
    datePickerCmp,
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
      order: {
        type: 'buy',
        orderNumber: '223355',
        user: 'علی تبادلیان',
        phone: '02144556699 ',
        createdAt: '2020-11-14T07:57:56.171Z',
      },
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
  },
  mounted() {
    this.orderItems = [
      {
        name: 'ملت عشق',
        barcode: '121314156',
        mainPrice: '22000000',
        priceWithDiscount: '1100000',
      },
      {
        name: ' جین ایر',
        barcode: '45678900',
        mainPrice: '7900000',
        priceWithDiscount: '560000',
      },
      {
        name: ' دیوانه ای بالای بام ',
        barcode: '678900342',
        mainPrice: '20000',
        priceWithDiscount: '15000',
      },
    ];
    this.isLoading = false;
  },
};
</script>
