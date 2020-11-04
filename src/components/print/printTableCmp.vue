<template>
  <div class="A5 pa-6">
    <table class="generalTable sheet padding-25mm ">
      <thead>
        <th v-for="col in columns" :key="col.index">
          {{ $t(col.text) }}
        </th>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="row.index">
          <td v-for="item in row" :key="item.id">
            {{ item }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'printTableCmp',
  props: {
    data: {
      type: Array,
    },
    columns: {
      type: Array,
    },
  },
};
</script>
<style lang="scss">
.generalTable {
  border: thin solid rgba(0, 0, 0, 0.12);
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 8px;
  th,
  td {
    border: thin solid rgba(0, 0, 0, 0.12);
    font-weight: normal;
    text-align: center;
    padding: 8px;
  }
}
</style>
