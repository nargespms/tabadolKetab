<template>
  <div>
    <div class="d-flex flex-row-reverse ma-4">
      <!-- <v-btn
        color="light-blue darken-2"
        class="white--text"
        @click="printData"
        >{{ $t('print') }}</v-btn
      > -->
      <v-btn class="white--text" color="green" @click="excelFile">{{
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
      :mobile-breakpoint="100"
    >
      <template v-slot:top>
        <v-toolbar color="teal " flat height="48">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="white"
                @click="addPostRequest"
                v-bind="attrs"
                v-on="on"
                >fa fa-plus
              </v-icon>
            </template>
            <span>{{ $t('postRequest') }}</span>
          </v-tooltip>
          <span class="pr-4 font-weight-medium white--text">
            {{ $t('postList') }}
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
                :editData="options.filter ? options.filter : {}"
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
      <template v-slot:[`item.operation`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              medium
              class="ma-2"
              v-bind="attrs"
              @click="preview(item)"
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
              v-bind="attrs"
              @click="printForm(item)"
              v-on="on"
            >
              mdi-printer
            </v-icon>
          </template>
          {{ $t('print') }}
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              medium
              class="ma-2"
              color="grey darken-3"
              @click="deleteRecord(item)"
              v-on="on"
              v-bind="attrs"
            >
              mdi-delete
            </v-icon>
          </template>
          {{ $t('delete') }}
        </v-tooltip>
      </template>
      <template v-if="totalData > 0" v-slot:[`footer`]="{ props }">
        <v-pagination
          class="pa-3 float-left"
          @input="changePage"
          :value="options.page"
          :length="props.pagination.pageCount"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination>
      </template>
    </v-data-table>

    <v-dialog v-model="enableDelete" max-width="500px">
      <promptDialog
        :title="'deletePostRequest'"
        :message="'RUSureUWantToDeletThisPostRequest'"
        :data="deletingItem"
        @accept="acceptDelete"
        @reject="closeDelete"
      />
    </v-dialog>

    <notifMessage
      v-if="successNotif"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
      :type="'success'"
    />
  </div>
</template>

<script>
import notifMessage from '../structure/notifMessage.vue';
import promptDialog from '../structure/promptDialog.vue';
import tableHeaderCell from '../structure/tableHeaderCell.vue';

export default {
  name: 'postTable',
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
  components: {
    notifMessage,
    promptDialog,
    tableHeaderCell,
  },
  data() {
    return {
      innerOptions: { ...this.options },
      // delete
      enableDelete: false,
      deletingItem: {},
      successNotif: false,
      filter: {},
      // print item
      printtingItem: {},
      orderType: [
        { text: 'BUY', value: 'BUY' },
        { text: 'SELL', value: 'SELL' },
      ],
      status: [
        { text: 'PENDING', value: 'PENDING' },
        { text: 'SUBMITTED', value: 'SUBMITTED' },
        { text: 'ACCEPTED', value: 'ACCEPTED' },
        { text: 'CANCELED', value: 'CANCELED' },
        { text: 'IN_PROGRESS', value: 'IN_PROGRESS' },
        { text: 'ON_WAY', value: 'ON_WAY' },
        { text: 'RECEIVED', value: 'RECEIVED' },
        { text: 'FINISHED', value: 'FINISHED' },
      ],
    };
  },
  methods: {
    addPostRequest() {
      this.$router.push({
        name: 'postRequest',
      });
    },
    // methods for delete notif
    deleteRecord(item) {
      this.deletingItem = item;
      this.enableDelete = true;
    },
    acceptDelete(value) {
      console.log(`deleted ${value.name}`);
      this.successNotif = true;

      this.closeDelete();
    },
    closeDelete() {
      this.enableDelete = false;
      this.deletingItem = {};
    },
    hideNotif() {
      this.successNotif = false;
    },
    // methods for preview
    preview(item) {
      this.$router.push({
        path: `/ordersList/${item.id}`,
      });
    },
    // printForm(item) {
    //   this.printtingItem = item;
    //   const routeLink = this.$router.resolve({
    //     path: `print/postRequest/${item.id}`,
    //   });
    //   window.open(routeLink.href, '_blank');
    // },
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
      const pagination = this.options;
      const excelData = Object.assign(pagination, {
        filter: this.filter,
      });
      console.log(excelData);
    },
    printData() {
      // go to print page of this table
      const routeData = this.$router.resolve({
        name: 'printPostRequests',
      });
      window.open(routeData.href, '_blank');
    },
    changePage(page) {
      this.$emit('getData', {
        filter: this.filter,
        options: { ...this.options, page },
      });
    },
  },
};
</script>
