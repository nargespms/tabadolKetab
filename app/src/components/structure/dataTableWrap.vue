<template>
  <div>
    <staffTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'staffsList'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <clientsTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'clientsList'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />

    <bookCategoryTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'bookCats'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <ticketsTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'tickets'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <discountsTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'discounts'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <lazyCouponTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'coupon'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <requestedBooksTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'requestedBooks'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />

    <lazyBookTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'books'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <lazyMessagesTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'messages'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <lazycreditTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'tranactions'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />

    <postTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'post'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <forbiddenBookTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'forbiddenBook'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <invoicesTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'invoices'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <tradesTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'trades'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <authorTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'authors'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <publishersTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'publishers'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <ordersTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'orders'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <accessLevelTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'accessLevelList'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <postRequestTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'postBooks'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />
    <lazyLogTable
      @reloadTable="getData"
      @getData="getData"
      v-if="this.module === 'logs'"
      :headers="headers"
      :tableData="tableData"
      :options="options"
      :totalData="totalData"
      :loading="loading"
    />

    <notifMessage
      v-if="errorEnable"
      :msg="errorMsg"
      @hideNotif="hideNotif"
      :type="'error'"
    />
  </div>
</template>

<script>
import postRequestTable from '../post/postRequestTable.vue';
import staffTable from '../users/staffTable.vue';
import clientsTable from '../users/clientsTable.vue';
import bookCategoryTable from '../bookCategory/bookCategoryTable.vue';
import ticketsTable from '../tickets/ticketsTable.vue';
import discountsTable from '../discount/discountsTable.vue';
import lazyCouponTable from '../discount/lazyCouponTable.vue';
import requestedBooksTable from '../requestedBook/requestedBooksTable.vue';
import lazyBookTable from '../book/lazyBookTable.vue';
import postTable from '../post/postTable.vue';
import forbiddenBookTable from '../forbiddenBook/forbiddenBookTable.vue';
import invoicesTable from '../invoices/invoicesTable.vue';
import tradesTable from '../trades/tradesTable.vue';
import authorTable from '../author/authorTable.vue';
import publishersTable from '../publisher/publishersTable.vue';
import ordersTable from '../orders/ordersTable.vue';
import accessLevelTable from '../accessLevel/accessLevelTable.vue';
import notifMessage from './notifMessage.vue';
import lazyMessagesTable from '../messages/lazyMessagesTable.vue';
import lazycreditTable from '../credit/lazycreditTable.vue';
import lazyLogTable from '../logs/lazyLogTable.vue';

export default {
  name: 'dataTableWrap',
  components: {
    staffTable,
    clientsTable,
    bookCategoryTable,
    ticketsTable,
    discountsTable,
    lazyCouponTable,
    requestedBooksTable,
    lazyBookTable,
    postTable,
    forbiddenBookTable,
    invoicesTable,
    tradesTable,
    authorTable,
    publishersTable,
    ordersTable,
    accessLevelTable,
    notifMessage,
    lazyMessagesTable,
    lazycreditTable,
    postRequestTable,
    lazyLogTable,
  },
  props: {
    headers: {
      type: Array,
    },
    module: {
      type: String,
    },
    endpoint: {
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
        // sortBy: 'time',
        limit: 10,
      },
      // error
      errorEnable: false,
      errorMsg: '',
      urlFilter: {},
    };
  },
  methods: {
    getData(props) {
      // const { page, limit } = props.options;
      // const { filter } = props;
      const {
        filter,
        options: { page, limit },
      } = props;

      this.$axios
        .get(this.endpoint, {
          params: {
            page,
            limit,
            filter,
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.result.docs;
            this.totalData = res.data.result.totalDocs;
            this.options = { ...this.options, page, limit };
            // console.log(this.tableData);
            // console.log(this.totalData);
            this.loading = false;
          }
        })
        .catch(e => {
          console.log(e);
          if (e.response.status === 403) {
            this.errorEnable = true;
            this.errorMsg = 'permissionDenied';
            this.loading = false;
          }
        });
    },
  },

  mounted() {
    if (this.$route.query) {
      Object.keys(this.$route.query)
        .filter(f => f.match(/^filter\[[a-z0-9]+\]/i))
        .forEach(f => {
          const v = this.$route.query[f].trim();
          const [, field] = f.match(/^filter\[([^\]]+)]$/);
          this.urlFilter[field] = v;
        });
      this.options.filter = this.urlFilter;
      this.getData({ options: this.options, filter: this.urlFilter });
    } else {
      this.getData({ options: this.options });
    }
  },
};
</script>
