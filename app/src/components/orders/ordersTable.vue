<template>
  <div>
    <div class="d-flex flex-row-reverse ma-4">
      <v-btn
        color="light-blue darken-2"
        class="white--text"
        @click="printData"
        >{{ $t('print') }}</v-btn
      >
      <v-btn class="ml-4 white--text" color="green" @click="excelFile">{{
        $t('filteredFileDl')
      }}</v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="tableData"
      :options.sync="innerOptions"
      update:options
      :server-items-length="totalData"
      :loading="loading"
      class="elevation-1 text-center ma-4"
      hide-default-header
      :loading-text="$t('loadingText')"
      :no-data-text="$t('Nodataavailable')"
    >
      <template v-slot:top>
        <v-toolbar color="teal " flat height="48">
          <span class="pr-4 font-weight-medium white--text">
            {{ $t('ordersList') }}
          </span>
        </v-toolbar>
      </template>

      <template v-slot:header="{ props: { headers } }">
        <thead class="tableDataHead grey lighten-2">
          <tr>
            <th class="text-center" v-for="h in headers" :key="h.index">
              <tableHeaderCell
                :data="h"
                @filterCol="filterCol"
                :items="
                  h.text === 'type'
                    ? orderType
                    : h.value === 'delivery'
                    ? delivery
                    : h.text === 'status'
                    ? status
                    : []
                "
              />
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:[`item.createdAt`]="{ item }">
        {{ new Date(item.createdAt).toLocaleDateString('fa') }}
      </template>

      <template v-slot:[`item.type`]="{ item }">
        <span>
          {{ $t(item.type) }}
        </span>
      </template>

      <template v-slot:[`item.clientId`]="{ item }">
        <span>
          {{ $t(item.client.firstName) }}
          {{ $t(item.client.lastName) }}
        </span>
      </template>

      <template v-slot:[`item.mobile`]="{ item }">
        <span class="numberDir">
          {{ $t(item.client.mobile) }}
        </span>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <span>
          {{ $t(item.status) }}
        </span>
      </template>

      <template v-slot:[`item.delivery`]="{ item }">
        <span>
          {{ $t(item.delivery) }}
        </span>
      </template>

      <template v-slot:[`item.operation`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              medium
              class="ma-2"
              @click="preview(item)"
              v-bind="attrs"
              v-on="on"
            >
              mdi-eye
            </v-icon>
          </template>
          {{ $t('preview') }}
        </v-tooltip>
        <v-tooltip bottom>
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
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              medium
              class="ma-2"
              color="grey darken-3"
              @click="printForm(item)"
            >
              mdi-printer
            </v-icon>
          </template>
          {{ $t('print') }}
        </v-tooltip>
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
import multipleChoiseDialog from '../structure/multipleChoiseDialog.vue';

export default {
  name: 'ordersTable',
  components: {
    tableHeaderCell,
    multipleChoiseDialog,
  },
  props: {
    headers: { type: Array },
    tableData: { type: Array },
    options: {
      type: Object,
      default: () => ({
        descending: false,
        page: 1,
        limit: 10,
      }),
    },
    totalData: { type: Number },
    loading: { type: Boolean },
  },
  data() {
    return {
      innerOptions: this.options,
      orderType: [
        { text: 'BUY', value: 'BUY' },
        { text: 'SELL', value: 'SELL' },
      ],
      delivery: [
        { text: 'TABADOL', value: 'TABADOL' },
        { text: 'TIPAX', value: 'TIPAX' },
        { text: 'POST', value: 'POST' },
        { text: 'PRESENCE', value: 'PRESENCE' },
      ],
      status: [
        { text: 'PENDING', value: 'PENDING' },
        { text: 'SUBMITTED', value: 'SUBMITTED' },
        { text: 'ACCEPTED', value: 'ACCEPTED' },
        { text: 'CANCELED', value: 'CANCELED' },
        { text: 'IN_PROGRESS', value: 'IN_PROGRESS' },
        { text: 'ON_WAY', value: 'ON_WAY' },
        { text: 'RECEIVED', value: 'RECEIVED' },
        { text: 'CLOSED', value: 'CLOSED' },
      ],
      filter: {},
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
      ],
      enableStatusChange: false,
      edittingItem: {},
    };
  },
  methods: {
    printForm(item) {
      this.printtingItem = item;
      const routeLink = this.$router.resolve({
        path: `print/postRequest/${item.id}`,
      });
      window.open(routeLink.href, '_blank');
    },
    preview(item) {
      this.$router.push({
        path: `/ordersList/${item.id}`,
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
    excelFile() {
      // getData as excel file with filtered included
    },
    printData() {
      // go to print page of this table
      const routeData = this.$router.resolve({
        name: 'printOrders',
      });
      window.open(routeData.href, '_blank');
    },
    reloadTable() {
      this.onRequest({
        options: this.innerOptions,
      });
    },
    filterCol(value, name) {
      this.filter[name] = value[name];
      this.onRequest({
        options: this.innerOptions,
        tableSearch: this.tableSearch,
      });
    },
    onRequest(props) {
      props.filter = this.filter;
      this.innerOptions = props.options;
      this.$emit('getData', props);
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
