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
            {{ item.user.fullName }}
          </td>
          <td>
            {{ moneyFormat(item.totalBuy) }}
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
            {{ item.category.name }}
          </td>
          <td>
            {{ item.number }}
          </td>
          <td>
            {{ moneyFormat(item.totalBuy) }}
            {{ $t('rial') }}
          </td>
        </tr>
      </tbody>
      <tbody v-if="this.module === 'cashierReport'">
        <tr v-for="(item, index) in data" :key="item.index">
          <td>
            {{ index + 1 }}
          </td>

          <td>
            {{ moneyFormat(item.finalTotal) }}
            {{ $t('rial') }}
          </td>
          <td>
            {{ item.invoiceCount }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'financeReportTable',
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
  },
  methods: {
    moneyFormat(value) {
      return new Intl.NumberFormat('es-ES').format(value);
    },
  },
};
</script>
