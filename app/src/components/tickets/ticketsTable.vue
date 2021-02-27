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
      class="elevation-1 text-center ma-4 clear"
      hide-default-header
      hide-default-footer
      :loading-text="$t('loadingText')"
      :no-data-text="$t('Nodataavailable')"
    >
      <template v-slot:top>
        <v-toolbar color="teal " flat height="48">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="white" @click="addTicket" v-bind="attrs" v-on="on"
                >mdi-ticket-account
              </v-icon>
            </template>
            <span>{{ $t('AddTicket') }}</span>
          </v-tooltip>
          <span class="pr-4 font-weight-medium white--text">
            {{ $t('TicketsList') }}
          </span>
        </v-toolbar>
      </template>

      <template v-slot:header="{ props: { headers } }">
        <thead class="tableDataHead grey lighten-2">
          <tr>
            <th class="text-center" v-for="h in headers" :key="h.index">
              <tableHeaderCell
                :data="h"
                :items="
                  h.text === 'status'
                    ? statusItems
                    : h.text === 'department'
                    ? departmentItems
                    : []
                "
                @filterCol="filterCol"
                :editData="options.filter ? options.filter : {}"
              />
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:[`item.title`]="{ item }">
        <router-link :to="`/ticketsList/${item.id}`" class="black--text">
          {{ item.title }}</router-link
        >
      </template>
      <template v-slot:[`item.createdAt`]="{ item }">
        {{ new Date(item.createdAt).toLocaleDateString('fa') }}
      </template>
      <template v-slot:[`item.status`]="{ item }">
        {{ $t(item.status) }}
      </template>

      <template v-slot:[`item.department`]="{ item }">
        {{ $t(item.department) }}
      </template>

      <template
        v-if="$store.state.bookShop.userInfo.role !== 'CLIENT'"
        v-slot:[`item.clientId`]="{ item }"
      >
        <router-link
          :to="`/users/profile/${item.client.id}`"
          class="black--text"
        >
          {{ item.client.firstName }} &nbsp; {{ item.client.lastName }}
        </router-link>
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
      </template>
      <template v-if="totalData > 0" v-slot:[`footer`]="{ props }">
        <v-pagination
          class="pa-3 float-left"
          v-model="innerOptions.page"
          :length="props.pagination.pageCount"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import tableHeaderCell from '../structure/tableHeaderCell.vue';

export default {
  name: 'ticketsTable',
  components: {
    tableHeaderCell,
  },
  props: {
    headers: { type: Array },
    tableData: { type: Array },
    options: {
      type: Object,
    },
    totalData: { type: Number },
    loading: { type: Boolean },
  },
  data() {
    return {
      innerOptions: this.options,
      successNotif: false,
      statusItems: [
        { text: 'CLOSED', value: 'CLOSED' },
        { text: 'OPEN', value: 'OPEN' },
        { text: 'ANSWERED_BY_STAFF', value: 'ANSWERED_BY_STAFF' },
        { text: 'ANSWERED_BY_CLIENT', value: 'ANSWERED_BY_CLIENT' },
        { text: 'INPROGRESS', value: 'INPROGRESS' },
        { text: 'ONHOLD', value: 'ONHOLD' },
      ],
      departmentItems: [
        { text: 'INFO', value: 'INFO' },
        { text: 'TECH', value: 'TECH' },
        { text: 'BILLING', value: 'BILLING' },
      ],
      filter: {},
    };
  },
  methods: {
    addTicket() {
      this.$router.push({
        name: 'createNewTicket',
      });
    },

    // methods for preview
    preview(item) {
      this.$router.push({
        path: `/ticketsList/${item.id}`,
      });
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
    excelFile() {
      // getData as excel file with filtered included
    },
    printData() {
      // go to print page of this table
      const routeData = this.$router.resolve({
        name: 'printTickets',
      });
      window.open(routeData.href, '_blank');
    },
  },
  watch: {
    innerOptions: {
      handler(newVal) {
        this.onRequest({
          options: newVal,
        });
      },
      deep: true,
    },
  },
};
</script>
