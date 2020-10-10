<template>
  <v-data-table
    :headers="headers"
    :items="tableData"
    :options.sync="innerOptions"
    :server-items-length="totalData"
    :loading="loading"
    class="elevation-1 text-center"
    hide-default-header
  >
    <template v-slot:top>
      <v-toolbar class="mb-2" color="teal " flat height="48"> </v-toolbar>
    </template>

    <template v-slot:header="{ props: { headers } }">
      <thead>
        <tr>
          <th class="text-center" v-for="h in headers" :key="h.index">
            {{ $t(h.text) }}
          </th>
        </tr>
      </thead>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'staffTable',
  props: {
    headers: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
    options: {
      type: Object,
    },
    totalData: {
      type: Number,
    },
    loading: {
      type: Boolean,
    },
  },
  data() {
    return {
      innerOptions: this.options,
    };
  },
  watch: {
    options: {
      handler(newVal) {
        this.innerOptions = newVal;
      },
    },
  },
};
</script>
