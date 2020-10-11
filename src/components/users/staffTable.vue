<template>
  <v-data-table
    :headers="headers"
    :items="tableData"
    :options.sync="innerOptions"
    update:options
    :server-items-length="totalData"
    :loading="loading"
    class="elevation-1 text-center ma-4"
    hide-default-header
  >
    <template v-slot:top>
      <v-toolbar color="teal " flat height="48">
        <v-icon color="white" @click="addStaff">mdi-account-plus </v-icon>
      </v-toolbar>
    </template>

    <template v-slot:header="{ props: { headers } }">
      <thead class="tableDataHead  grey lighten-2">
        <tr>
          <th class="text-center" v-for="h in headers" :key="h.index">
            {{ $t(h.text) }}
          </th>
        </tr>
      </thead>
    </template>
    <template v-slot:body="{ items }">
      <tbody>
        <tr v-for="item in items" :key="item.index">
          <td class="v-data-table__divider">
            {{ item.name }}
          </td>
          <td class="v-data-table__divider">
            {{ item.username }}
          </td>
          <td class="v-data-table__divider">
            {{ item.email }}
          </td>
          <td class="v-data-table__divider">
            {{ item.phone }}
          </td>
          <td class="v-data-table__divider">
            {{ item.website }}
          </td>
          <td class="v-data-table__divider">
            {{ item.company.name }}
          </td>
          <td class="v-data-table__divider">
            <v-icon color="grey darken-3" @click="deleteRecord">
              mdi-delete
            </v-icon>
          </td>
        </tr>
      </tbody>
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
  methods: {
    addStaff() {
      this.$router.push({
        path: `/users/addUser`,
      });
    },
    deleteRecord() {
      console.log('deleted');
    },
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

<style lang="scss">
.tableDataHead {
  tr {
    th {
      border-top: thin solid rgba(0, 0, 0, 0.12);
      border-right: thin solid rgba(0, 0, 0, 0.12);
    }
  }
}
</style>
