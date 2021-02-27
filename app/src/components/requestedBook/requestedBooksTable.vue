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
              <v-icon
                v-if="$store.state.bookShop.userInfo.role === 'CLIENT'"
                color="white"
                @click="addRequestedBook"
                v-bind="attrs"
                v-on="on"
                >mdi-book-open-variant
              </v-icon>
            </template>
            <span>{{ $t('addRequestedBooks') }}</span>
          </v-tooltip>
          <span class="pr-4 font-weight-medium white--text">
            {{ $t('requestedBooksList') }}
          </span>
        </v-toolbar>
      </template>

      <template v-slot:header="{ props: { headers } }">
        <thead class="tableDataHead grey lighten-2">
          <tr>
            <th class="text-center" v-for="h in headers" :key="h.index">
              <tableHeaderCell
                :data="h"
                :items="h.text === 'status' ? statusItems : []"
                @filterCol="filterCol"
              />
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:[`item.createdAt`]="{ item }">
        {{ new Date(item.createdAt).toLocaleDateString('fa') }}
      </template>

      <template v-slot:[`item.categoryId`]="{ item }">
        <span v-if="item.category">
          {{ item.category.title }}
        </span>
      </template>

      <template v-slot:[`item.createdById`]="{ item }">
        <span>
          {{ item.client.firstName }}
          {{ item.client.lastName }}
        </span>
      </template>

      <template v-slot:[`item.mobile`]="{ item }">
        <span class="numberDir">
          {{ item.client.mobile }}
        </span>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <span>
          {{ $t(item.status) }}
        </span>
      </template>

      <template v-slot:[`item.operation`]="{ item }">
        <v-icon medium class="ma-2" @click="preview(item)">
          mdi-eye
        </v-icon>
        <v-icon medium class="ma-2" @click="changeStatusEnable(item)"
          >mdi-book-open
        </v-icon>
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
    <v-dialog
      v-model="enablePreview"
      content-class="sh-0"
      @click:outside="closeDialog"
    >
      <showRequestedBook :id="previewItem.id" />
    </v-dialog>
    <v-dialog v-model="enableStatusChange" max-width="500px">
      <multipleChoiseDialog
        :title="'changeStatus'"
        :message="`${$t('chooseRequestedBookStatus')}\n`"
        :data="changingStatusItem"
        :buttons="changeStatusButs"
        @changeStatus="changeStatus"
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
import showRequestedBook from './showRequestedBook.vue';
import multipleChoiseDialog from '../structure/multipleChoiseDialog.vue';
import notifMessage from '../structure/notifMessage.vue';
import tableHeaderCell from '../structure/tableHeaderCell.vue';

export default {
  name: 'requestedBooksTable',
  components: {
    showRequestedBook,
    multipleChoiseDialog,
    notifMessage,
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
      // preview
      enablePreview: false,
      previewItem: {},
      // change status
      enableStatusChange: false,
      changingStatusItem: {},
      changeStatusButs: [
        {
          name: 'AVAILABLE',
          color: 'green',
        },
        {
          name: 'UNAVAILABLE',
          color: 'red',
        },
        {
          name: 'PENDING',
          color: 'purple',
        },
      ],
      filter: {},
      statusItems: [
        { text: 'AVAILABLE', value: 'AVAILABLE' },
        { text: 'UNAVAILABLE', value: 'UNAVAILABLE' },
        { text: 'PENDING', value: 'PENDING' },
      ],
    };
  },
  methods: {
    addRequestedBook() {
      this.$router.push({
        name: 'addRequestedBooks',
      });
    },
    // methods for preview
    preview(item) {
      this.enablePreview = true;
      this.previewItem = item;
    },
    // change status
    changeStatusEnable(item) {
      this.changingStatusItem = item;
      this.enableStatusChange = true;
    },
    changeStatus(value) {
      console.log(value);
      this.$axios
        .patch(
          `/v1/api/tabaadol-e-ketaab/requested-book/${this.changingStatusItem.id}`,
          { status: value }
        )
        .then(res => {
          if (res.status === 200) {
            this.enableStatusChange = false;
            this.changingStatusItem = {};
            this.successNotif = true;
            this.reloadTable();
          }
        });
    },
    hideNotif() {
      this.successNotif = false;
    },

    excelFile() {
      // getData as excel file with filtered included
    },
    printData() {
      // go to print page of this table
      const routeData = this.$router.resolve({
        name: 'printRequestedBooks',
      });
      window.open(routeData.href, '_blank');
    },
    closeDialog() {
      this.previewItem = {};
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
    innerOptions: {
      handler(newVal) {
        this.onRequest({
          options: newVal,
        });
      },
      deep: true,
    },
    enablePreview(newVal) {
      if (newVal === false) {
        this.previewItem = {};
      }
    },
  },
};
</script>
