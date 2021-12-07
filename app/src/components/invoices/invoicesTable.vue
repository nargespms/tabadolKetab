<template>
  <div>
    <div class="d-flex flex-row-reverse ma-4">
      <!-- <v-btn
        color="light-blue darken-2"
        class="white--text"
        @click="printData"
        >{{ $t('print') }}</v-btn
      > -->
      <!-- <v-btn class="white--text" color="green" @click="excelFile">{{
        $t('filteredFileDl')
      }}</v-btn> -->
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
        <div
          class="teal py-2 px-4  d-flex justify-space-between"
          flat
          height="48"
        >
          <div class="d-flex align-center">
            <span class="pr-4 font-weight-medium white--text ">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="white"
                    @click="addInvoice"
                    v-bind="attrs"
                    v-on="on"
                    >fas fa-file-invoice-dollar
                  </v-icon>
                </template>
                <span>{{ $t('addInvoice') }}</span>
              </v-tooltip>
              <span class="pr-2">
                {{ $t('invoicesList') }}
              </span>
            </span>
          </div>

          <div>
            <p class="white--text text-right">
              <span>
                تعداد رکوردهای یافت شده :
              </span>
              {{ totalData }}
            </p>
            <p class="white--text text-right">
              <span>
                مجموع مبلغ کل :
              </span>
              {{ moneyFormat(sumFinalTotal) }} {{ $t('rial') }}
            </p>
          </div>
        </div>
      </template>

      <template v-slot:header="{ props: { headers } }">
        <thead class="tableDataHead grey lighten-2">
          <tr>
            <th class="text-center" v-for="h in headers" :key="h.index">
              <tableHeaderCell :data="h" @filterCol="filterCol" />
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:[`item.createdAt`]="{ item }">
        {{ new Date(item.createdAt).toLocaleDateString('fa') }}
      </template>

      <template v-slot:[`item.clientId`]="{ item }">
        <span>
          {{ item.client.firstName }} &nbsp; {{ item.client.lastName }}
        </span>
      </template>

      <template v-slot:[`item.staffId`]="{ item }">
        <span v-if="item.staff">
          {{ item.staff.firstName }} &nbsp;
          {{ item.staff.lastName }}
        </span>
      </template>
      <template v-slot:[`item.finalTotal`]="{ item }">
        <span>
          {{ moneyFormat(item.finalTotal) }} &nbsp; {{ $t('rial') }}
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
        :title="'deleteInvoice'"
        :message="'RUSureUWantToDeletThisInvoice'"
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
import promptDialog from '../structure/promptDialog.vue';
import notifMessage from '../structure/notifMessage.vue';
import tableHeaderCell from '../structure/tableHeaderCell.vue';
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'invoicesTable',
  mixins: [moneyFormat],
  components: {
    promptDialog,
    notifMessage,
    tableHeaderCell,
  },
  props: {
    headers: { type: Array },
    tableData: { type: Array },
    options: {
      type: Object,
      default: () => ({
        descending: false,
        page: 1,
        limit: 20,
      }),
    },
    totalData: { type: Number },
    loading: { type: Boolean },
    sumFinalTotal: { type: Number },
  },
  data() {
    return {
      successNotif: false,
      innerOptions: { ...this.options },
      // delete
      enableDelete: false,
      deletingItem: {},
      filter: {},
    };
  },
  methods: {
    addInvoice() {
      this.$router.push({
        name: 'addInvoice',
      });
    },
    // methods for preview
    preview(item) {
      this.$router.push({
        path: `invoicesList/${item.id}`,
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

    excelFile() {
      // getData as excel file with filtered included
      const pagination = this.options;
      const excelData = Object.assign(pagination, {
        filter: this.filter,
      });
      console.log(excelData);
    },
    // printData() {
    //   // go to print page of this table
    //   const routeData = this.$router.resolve({
    //     name: 'printInvoices',
    //   });
    //   window.open(routeData.href, '_blank');
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
    changePage(page) {
      this.$emit('getData', {
        filter: this.filter,
        options: { ...this.options, page },
      });
    },
  },
  watch: {
    enablePreview(newVal) {
      if (newVal === false) {
        this.previewItem = {};
      }
    },
  },
};
</script>
