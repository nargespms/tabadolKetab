<template>
  <div>
    <table
      class="generalTable"
      :class="$vuetify.breakpoint.lg ? '' : 'tableMobileScroll'"
    >
      <thead class="grey lighten-2">
        <th v-for="col in columns" :key="col.index">
          {{ $t(col.text) }}
        </th>
      </thead>
      <tbody v-if="this.module === 'mostBuyUser'">
        <tr v-for="(item, index) in data" :key="item.index">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ item.buyer.firstName }}
            {{ item.buyer.lastName }}
          </td>
          <td>
            {{ moneyFormat(item.total_amount) }}
            {{ $t('rial') }}
          </td>
        </tr>
      </tbody>
      <tbody v-if="this.module === 'mostCategoryBuy'">
        <tr v-for="(item, index) in data" :key="item.index">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ item.category.title }}
          </td>
          <td>
            {{ moneyFormat(item.total_amount) }}
            {{ $t('rial') }}
          </td>
        </tr>
      </tbody>
      <tbody v-if="this.module === 'cashierReport'">
        <tr>
          <td>
            {{ singleItem.count }}
          </td>
          <td>
            <span v-if="singleItem.sum">
              {{ moneyFormat(singleItem.sum) }}
              {{ $t('rial') }}
            </span>
          </td>
          <td>
            <span v-if="singleItem.creditByCash">
              {{ moneyFormat(singleItem.creditByCash) }}
              {{ $t('rial') }}
            </span>
            <span v-else>
              0
              {{ $t('rial') }}
            </span>
          </td>
          <td>
            <span v-if="singleItem.creditByGift">
              {{ moneyFormat(singleItem.creditByGift) }}
              {{ $t('rial') }}
            </span>
            <span else> </span>
          </td>
          <td>
            <span
              v-if="
                singleItem.credit &&
                  singleItem.creditByGift &&
                  singleItem.creditByCash
              "
            >
              {{
                moneyFormat(
                  singleItem.credit -
                    singleItem.creditByGift -
                    singleItem.creditByCash
                )
              }}
              {{ $t('rial') }}
            </span>
          </td>
          <td>
            <span v-if="singleItem.credit">
              {{ moneyFormat(singleItem.credit) }}
              {{ $t('rial') }}
            </span>
          </td>
        </tr>
      </tbody>
      <tbody v-if="this.module === 'booksTag'">
        <tr>
          <td>
            {{ singleItem.count }}
          </td>
          <td>
            {{ moneyFormat(singleItem.sum) }}
            {{ $t('rial') }}
          </td>
        </tr>
      </tbody>
    </table>
    <span class="pt-3 mt-3 d-block" v-if="this.module === 'cashierReport'">
      <v-icon class="red--text">mdi-alert-circle-outline</v-icon>
      افزایش اعتبار از طریق حساب بانکی: هر نوعی افزایش اعتباری که کارت به کارت
      یا از طریق کارت خوان صورت گرفته است
    </span>
  </div>
</template>

<script>
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'financeReportTable',
  mixins: [moneyFormat],
  props: {
    columns: {
      type: Array,
    },
    module: {
      type: String,
    },
    data: {
      type: Array,
    },
    singleItem: {
      type: Object,
    },
  },
};
</script>
