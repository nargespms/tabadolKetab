<template>
  <v-col cols="12" md="12">
    <p v-if="name" class="font-weight-black pr-1">
      {{ $t(name) }}
    </p>
    <table
      class="generalTable "
      :class="
        $vuetify.breakpoint.xl
          ? ''
          : $vuetify.breakpoint.lg
          ? ''
          : $vuetify.breakpoint.md
          ? ''
          : 'tableMobileScroll'
      "
    >
      <thead class="grey lighten-2">
        <th>
          {{ $t('radif') }}
        </th>
        <th>
          {{ $t('barcode') }}
        </th>
        <th>
          {{ $t('bookName') }}
        </th>
        <th>
          {{ $t('mainPrice') }}
        </th>
        <th>
          {{ $t('discount') }}
        </th>
        <th>
          {{ $t('priceWithDiscount') }}
        </th>

        <th v-if="deletable">
          {{ $t('operation') }}
        </th>
      </thead>
      <tbody>
        <tr v-if="items.length === 0">
          <td colspan="6" class="pa-4 grey--text">
            {{ $t('noBooksSelected') }}
          </td>
        </tr>
        <tr v-for="(item, index) in items" :key="index">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ item.number }}
          </td>
          <td>
            {{ item.name }}
          </td>
          <td>
            <span v-if="item.undergraduatePrice">
              {{ moneyFormat(item.undergraduatePrice) }} {{ $t('rial') }}
            </span>
          </td>

          <td>
            <span v-if="item.discount > 0">
              {{ moneyFormat(item.discount) }} {{ $t('rial') }}
            </span>
            <span v-else>
              <v-icon color="red" class="fn12">mdi-close</v-icon>
              {{ $t('noDiscount') }}
            </span>
          </td>
          <td>
            <span v-if="item.afterDiscount">
              {{ moneyFormat(item.afterDiscount) }} {{ $t('rial') }}
            </span>
          </td>

          <td v-if="deletable">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  medium
                  class="ma-2"
                  color="grey darken-3"
                  @click="deleteRecord(item)"
                  v-on="on"
                  v-bind="attrs"
                >
                  mdi-delete
                </v-icon>
              </template>
              {{ $t('delete') }}
            </v-tooltip>
          </td>
        </tr>
        <tr v-if="total">
          <td colspan="3"></td>
          <td>
            <span v-if="total">
              {{ moneyFormat(total) }} {{ $t('rial') }}
            </span>
          </td>
          <td></td>
          <td>
            <span v-if="finalTotal">
              {{ moneyFormat(finalTotal) }} {{ $t('rial') }}
            </span>
            <span else> </span>
          </td>
          <td v-if="deletable"></td>
        </tr>
      </tbody>
    </table>
    <v-dialog v-model="enableDelete" max-width="500px">
      <promptDialog
        :title="'deleteBook'"
        :message="'RUSureUWantToDeletThisBook'"
        :data="deletingItem"
        @accept="acceptDelete"
        @reject="closeDelete"
      />
    </v-dialog>
  </v-col>
</template>

<script>
import promptDialog from '../structure/promptDialog.vue';
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'invoiceItems',
  props: {
    data: {
      type: Array,
    },
    deletable: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
  },
  components: {
    promptDialog,
  },
  mixins: [moneyFormat],

  data() {
    return {
      items: this.data,
      // delete
      enableDelete: false,
      deletingItem: {},
    };
  },
  methods: {
    // methods for delete notif
    deleteRecord(item) {
      this.deletingItem = item;
      this.enableDelete = true;
    },
    acceptDelete(value) {
      console.log(`deleted ${value.name}`);
      this.$emit('deleteItem', this.deletingItem);

      this.closeDelete();
    },
    closeDelete() {
      this.enableDelete = false;
      this.deletingItem = {};
    },
  },
  watch: {
    data(newVal) {
      this.items = newVal;
    },
  },
  computed: {
    finalTotal() {
      if (this.items.length > 0) {
        return this.items
          .map(item => item.afterDiscount)
          .reduce((prev, next) => Number(prev) + Number(next));
      }
      return 0;
    },
    total() {
      if (this.items.length > 0) {
        return this.items
          .map(item => item.undergraduatePrice)
          .reduce((prev, next) => Number(prev) + Number(next));
      }
      return 0;
    },
  },
};
</script>
<style lang="scss">
.generalTable {
  border: thin solid #000;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 8px;
  th,
  td {
    border: thin solid #000;
    font-weight: normal;
    text-align: center;
    padding: 8px;
  }
}
.tableMobileScroll {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}
</style>
