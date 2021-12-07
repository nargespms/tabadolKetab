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
          <div>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="white"
                  @click="addForbiddenBook"
                  v-bind="attrs"
                  v-on="on"
                  >fa fa-plus
                </v-icon>
              </template>
              <span>{{ $t('addForbiddenBook') }}</span>
            </v-tooltip>
            <span class="pr-4 font-weight-medium white--text">
              {{ $t('forbiddenBookList') }}
            </span>
          </div>

          <span class="white--text ">
            <span>
              تعداد رکوردهای یافت شده :
            </span>
            {{ totalData }}
          </span>
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

      <template v-slot:[`item.active`]="{ item }">
        <span v-if="item.active">
          <v-icon color="success" class="pa-2">mdi-account-check </v-icon>
          {{ $t('active') }}
        </span>
        <span v-else>
          <v-icon color="error" class="pa-2">
            mdi-account-alert
          </v-icon>
          {{ $t('inactive') }}
        </span>
      </template>

      <template v-slot:[`item.operation`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              medium
              class="ma-2"
              v-bind="attrs"
              @click="editRecord(item)"
              v-on="on"
            >
              mdi-pencil
            </v-icon>
          </template>
          {{ $t('edit') }}
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
    <v-dialog v-model="enableEdit" content-class="sh-0">
      <addForbiddenBookCmp
        :mode="'edit'"
        :editData="edittingItem"
        @reloadTable="editSubmit"
        @closeModal="closeModal"
      />
    </v-dialog>
    <v-dialog v-model="enableDelete" max-width="500px">
      <promptDialog
        :title="'deleteForbiddenBook'"
        :message="'RUSureUWantToDeletThisForbiddenBook'"
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
    <notifMessage
      v-if="error"
      :msg="errorMsg"
      @hideNotif="hideError"
      :type="'error'"
    />
  </div>
</template>

<script>
import notifMessage from '../structure/notifMessage.vue';
import promptDialog from '../structure/promptDialog.vue';
import addForbiddenBookCmp from './addForbiddenBookCmp.vue';
import tableHeaderCell from '../structure/tableHeaderCell.vue';

export default {
  name: 'forbiddenBookTable',
  props: {
    headers: { type: Array },
    tableData: { type: Array },
    options: {
      type: Object,
    },
    totalData: { type: Number },
    loading: { type: Boolean },
  },
  components: {
    notifMessage,
    promptDialog,
    tableHeaderCell,
    addForbiddenBookCmp,
  },
  data() {
    return {
      innerOptions: { ...this.options },
      // delete
      enableDelete: false,
      deletingItem: {},
      successNotif: false,
      // preview
      enableEdit: false,
      edittingItem: {},
      filter: {},
      // error messages
      error: false,
      errorMsg: '',
    };
  },
  methods: {
    addForbiddenBook() {
      this.$router.push({
        name: 'addForbiddenBook',
      });
    },
    // methods for delete notif
    deleteRecord(item) {
      this.deletingItem = item;
      this.enableDelete = true;
    },
    acceptDelete(value) {
      console.log(`deleted ${value.name}`);
      this.$axios
        .delete(`/v1/api/tabaadol-e-ketaab/forbidden-book/${value.id}`)
        .then(res => {
          if (res.status === 200) {
            this.successNotif = true;
            this.closeDelete();
            this.reloadTable();
          }
        })
        .catch(e => {
          if (e.response.status === 403) {
            this.error = true;
            this.errorMsg = 'accessDenied';
            this.closeDelete();
          }
        });
    },
    closeDelete() {
      this.enableDelete = false;
      this.deletingItem = {};
    },
    hideNotif() {
      this.successNotif = false;
    },
    // methods for preview
    editRecord(item) {
      this.enableEdit = true;
      this.edittingItem = item;
    },
    closeModal() {
      this.enableEdit = false;
      this.reloadTable();
    },
    // sort funcs
    sort() {
      console.log('sorted');
    },
    editSubmit() {
      this.enableEdit = false;
      this.edittingItem = {};
      this.reloadTable();
    },
    // filter
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
    hideError() {
      this.error = false;
    },
    // printData() {
    //   // go to print page of this table
    //   const routeData = this.$router.resolve({
    //     name: 'printForbiddenBook',
    //   });
    //   window.open(routeData.href, '_blank');
    // },
    changePage(page) {
      this.$emit('getData', {
        filter: this.filter,
        options: { ...this.options, page },
      });
    },
  },
  watch: {
    enableEdit(newVal) {
      if (newVal === false) {
        this.edittingItem = {};
      }
    },
  },
};
</script>
