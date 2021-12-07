<template>
  <div>
    <div class="d-flex flex-row-reverse ma-4"></div>
    <v-data-table
      :headers="headers"
      :items="tableData"
      :options.sync="innerOptions"
      update:options
      :server-items-length="totalData"
      hide-default-header
      hide-default-footer
      :loading="loading"
      class="elevation-1 text-center ma-4 clear"
      :loading-text="$t('loadingText')"
      :no-data-text="$t('Nodataavailable')"
      :mobile-breakpoint="100"
      expand-icon="mdi-menu-down"
      show-expand
      single-expand
      :expanded.sync="expanded"
      @update:expanded="getClientBooks(expanded)"
    >
      <template v-slot:top>
        <div
          class="teal py-2 px-4  d-flex justify-space-between"
          flat
          height="48"
        >
          <span class="pr-4 font-weight-medium white--text">
            {{ $t('UncompletedOrders') }}
          </span>

          <span class="white--text ">
            <span>
              تعداد رکوردهای یافت شده :
            </span>
            {{ totalData }}
          </span>
        </div>
      </template>

      <template v-slot:header="{ props: { headers } }">
        <!-- {{ headers }} -->
        <thead class="tableDataHead grey lighten-2">
          <tr>
            <th class="text-center" v-for="h in headers" :key="h.index">
              <tableHeaderCell
                :data="h"
                @filterCol="filterCol"
                :items="h.text === 'status' ? statusItems : []"
                :editData="options.filter ? options.filter : {}"
              />
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:[`item.mobile`]="{ item }">
        <span class="numberDir">
          {{ item.client.mobile }}
        </span>
      </template>

      <template v-slot:[`item.createdAt`]="{ item }">
        {{ new Date(item.createdAt).toLocaleDateString('fa') }}
      </template>

      <template v-slot:[`item.clientId`]="{ item }">
        <span> {{ item.client.firstName }} {{ item.client.lastName }} </span>
      </template>

      <template v-slot:[`item.credit`]="{ item }">
        <span> {{ moneyFormat(item.client.credit) }} {{ $t('rial') }} </span>
      </template>

      <template v-slot:[`item.email`]="{ item }">
        <span> {{ item.client.email }} </span>
      </template>

      <template v-slot:[`item.nationalId`]="{ item }">
        <span> {{ item.client.nationalId }} </span>
      </template>

      <template v-slot:[`item.delivery`]="{ item }">
        <span> {{ $t(item.delivery) }} </span>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <span> {{ $t(item.status) }} </span>
      </template>

      <template v-slot:[`item.operation`]="{ item }">
        <v-tooltip
          bottom
          v-if="$store.state.bookShop.userInfo.role !== 'CLIENT'"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              medium
              class="ma-2"
              @click="changeStatusOrder(item)"
              v-bind="attrs"
              v-on="on"
            >
              mdi-table-edit
            </v-icon>
          </template>
          {{ $t('changeStatus') }}
        </v-tooltip>
      </template>

      <!-- expanded rows for books  -->
      <template v-slot:expanded-item="{ headers }">
        <td :colspan="headers.length - 3" class="pa-0 pt-4 pr-4 pb-4">
          <table
            v-if="books.length > 0"
            class="generalTable"
            :class="
              $vuetify.breakpoint.xl
                ? ''
                : $vuetify.breakpoint.lg
                ? ''
                : 'tableMobileScroll'
            "
          >
            <thead class="teal lighten-2">
              <th>
                {{ $t('name') }}
              </th>

              <th>
                {{ $t('category') }}
              </th>
              <th>
                {{ $t('barcode') }}
              </th>
            </thead>
            <tbody class="grey lighten-4">
              <tr v-for="book in books" :key="book.id">
                <td>
                  {{ book.name }}
                </td>

                <td>
                  {{ book.category.title }}
                </td>
                <td>
                  {{ book.number }}
                </td>
              </tr>
            </tbody>
          </table>
          <span v-else>
            {{ $t('Nodataavailable') }}
          </span>
        </td>

        <td></td
      ></template>

      <template v-if="totalData > 0" v-slot:[`footer`]="{ props }">
        <v-pagination
          class="pa-3 flex-wrap d-flex"
          @input="changePage"
          :value="options.page"
          :length="props.pagination.pageCount"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination>
      </template>
    </v-data-table>
    <v-dialog v-model="enableStatusChange" max-width="500px">
      <multipleChoiseDialog
        :title="'changeStatus'"
        :message="`${$t('chooseOrderStatus')}`"
        :buttons="changeStatusButs"
        @changeStatus="changeStatus"
      />
    </v-dialog>
  </div>
</template>

<script>
import tableHeaderCell from '../structure/tableHeaderCell.vue';
import moneyFormat from '../../mixins/moneyFormat.js';
import multipleChoiseDialog from '../structure/multipleChoiseDialog.vue';

export default {
  name: 'uncompletedOrdersTable',
  components: { tableHeaderCell, multipleChoiseDialog },
  mixins: [moneyFormat],
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
      expanded: [],
      innerOptions: { ...this.options },
      filter: {},
      // edit
      enableStatusChange: false,
      edittingItem: {},
      // fiter
      statusItems: [
        { text: 'PENDING', value: 'PENDING' },
        { text: 'SUBMITTED', value: 'SUBMITTED' },
        { text: 'ACCEPTED', value: 'ACCEPTED' },
        { text: 'IN_PROGRESS', value: 'IN_PROGRESS' },
      ],
      books: [],
      status: [
        { text: 'PENDING', value: 'PENDING' },
        { text: 'SUBMITTED', value: 'SUBMITTED' },
        { text: 'ACCEPTED', value: 'ACCEPTED' },
        { text: 'CANCELED', value: 'CANCELED' },
        { text: 'IN_PROGRESS', value: 'IN_PROGRESS' },
        { text: 'ON_WAY', value: 'ON_WAY' },
        { text: 'RECEIVED', value: 'RECEIVED' },
        { text: 'CLOSED', value: 'CLOSED' },
        { text: 'POST', value: 'POST' },
      ],
      changeStatusButs: [
        {
          name: 'ACCEPTED',
          color: 'green darken-1',
        },
        {
          name: 'RECEIVED',
          color: 'blue-grey lighten-1',
        },
        {
          name: 'IN_PROGRESS',
          color: 'purple lighten-3',
        },
        {
          name: 'ON_WAY',
          color: 'grey darken-1',
        },
        {
          name: 'CANCELED',
          color: 'red',
        },
        {
          name: 'CLOSED',
          color: 'red',
        },
        {
          name: 'POST',
          color: 'blue-grey darken-3',
        },
        {
          name: 'PENDING',
          color: 'orange darken-3',
        },
      ],
    };
  },
  methods: {
    // filter
    reloadTable() {
      this.onRequest({
        options: this.innerOptions,
      });
    },
    changeStatusOrder(item) {
      this.enableStatusChange = true;
      this.edittingItem = item;
    },
    changeStatus(value) {
      this.$axios
        .patch(`/v1/api/tabaadol-e-ketaab/order/${this.edittingItem.id}`, {
          status: value,
        })
        .then(res => {
          if (res.status === 200) {
            this.reloadTable();
            this.edittingItem = {};
            this.enableStatusChange = false;
          }
        });
    },
    filterCol(value, name) {
      this.filter[name] = value[name];
      this.onRequest({
        options: this.innerOptions,
      });
    },
    onRequest(props) {
      props.filter = this.filter;
      this.innerOptions = props.options;
      this.$emit('getData', props);
    },
    changePage(page) {
      this.$emit('getData', {
        filter: this.filter,
        options: { ...this.options, page },
      });
    },
    excelFile() {
      // getData as excel file with filtered included
      const pagination = this.options;
      const excelData = Object.assign(pagination, {
        filter: this.filter,
      });
      console.log(excelData);
    },
    getClientBooks(expandedRow) {
      if (expandedRow.length > 0) {
        expandedRow.forEach(order => {
          this.books = order.books;
        });
      }
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
.v-pagination {
  display: flex;
  flex-wrap: wrap;
}
</style>
