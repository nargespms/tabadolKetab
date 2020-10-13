<template>
  <div>
    <staffTable
      v-if="this.module === 'staffsList'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <clientsTable
      v-if="this.module === 'clientsList'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <bookCategoryTable
      v-if="this.module === 'bookCats'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
  </div>
</template>

<script>
import staffTable from '../users/staffTable.vue';
import clientsTable from '../users/clientsTable.vue';
import bookCategoryTable from '../bookCategory/bookCategoryTable.vue';

export default {
  name: 'dataTableWrap',
  components: {
    staffTable,
    clientsTable,
    bookCategoryTable,
  },
  props: {
    headers: {
      type: Array,
    },
    module: {
      type: String,
    },
  },
  data() {
    return {
      totalData: 0,
      tableData: [],
      loading: true,
      options: {
        page: 1,
        sortBy: 'time',
      },
    };
  },
  methods: {
    getUsers() {
      console.log('getUserCalled');
      const { page, itemsPerPage, sortBy } = this.options;
      console.log(page);
      console.log(itemsPerPage);
      console.log(sortBy);
      this.$axios
        .get('http://jsonplaceholder.typicode.com/users')
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.tableData = res.data;
            this.totalData = this.tableData.length;
            this.loading = false;
            // if (itemsPerPage > 0) {
            //   this.tableData = this.tableData.slice(
            //     (page - 1) * itemsPerPage,
            //     page * itemsPerPage
            //   );
            // }
          }
        });
    },
  },
  // watch: {
  //   options: {
  //     handler() {
  //       this.getUsers().then(res => {
  //         this.tableData = res.items;
  //         this.totalData = res.total;
  //       });
  //     },
  //     deep: true,
  //   },
  // },
  mounted() {
    this.getUsers();
  },
};
</script>
