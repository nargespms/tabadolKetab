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
    <ticketsTable
      v-if="this.module === 'tickets'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <discountsTable
      v-if="this.module === 'discounts'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <requestedBooksTable
      v-if="this.module === 'requestedBooks'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <booksTable
      v-if="this.module === 'books'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <creditTable
      v-if="this.module === 'credit'"
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
import ticketsTable from '../tickets/ticketsTable.vue';
import discountsTable from '../discount/discountsTable.vue';
import requestedBooksTable from '../requestedBook/requestedBooksTable.vue';
import booksTable from '../book/booksTable.vue';
import creditTable from '../credit/creditTable.vue';

export default {
  name: 'dataTableWrap',
  components: {
    staffTable,
    clientsTable,
    bookCategoryTable,
    ticketsTable,
    discountsTable,
    requestedBooksTable,
    booksTable,
    creditTable,
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
      endpoint: '',
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
      if (this.module === 'bookCats') {
        this.endpoint = 'http://jsonplaceholder.typicode.com/todos';
      } else if (
        this.module === 'messages' ||
        this.module === 'tickets' ||
        this.module === 'discounts'
      ) {
        this.endpoint = 'https://jsonplaceholder.typicode.com/posts';
      } else {
        this.endpoint = 'http://jsonplaceholder.typicode.com/posts';
      }
      this.$axios.get(this.endpoint).then(res => {
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
