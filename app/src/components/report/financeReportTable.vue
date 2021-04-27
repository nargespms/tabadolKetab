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
            <span v-if="singleItem.sum">
              {{ moneyFormat(singleItem.sum) }}
              {{ $t('rial') }}
            </span>
          </td>
          <td>
            {{ singleItem.count }}
          </td>
        </tr>
      </tbody>
      <tbody v-if="this.module === 'booksTag'">
        <tr>
          <td>
            booksTag
          </td>
        </tr>
      </tbody>
    </table>
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
