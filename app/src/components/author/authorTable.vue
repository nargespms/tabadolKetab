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
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="white" @click="addAuthor" v-bind="attrs" v-on="on"
                >mdi-account-edit
              </v-icon>
            </template>
            <span>{{ $t('addAuthor') }}</span>
          </v-tooltip>
          <span class="pr-4 font-weight-medium white--text">
            {{ $t('authorsList') }}
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

      <template v-slot:[`item.createdBy`]="{ item }">
        <router-link
          :to="`/users/profile/${item.createdBy.id}`"
          class="black--text"
        >
          {{ item.createdBy.firstName }} &nbsp; {{ item.createdBy.lastName }}
        </router-link>
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
              color="grey darken-3"
              @click="editRecord(item)"
              v-bind="attrs"
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
              v-bind="attrs"
              v-on="on"
              :disabled="item.deleted"
            >
              mdi-delete
            </v-icon>
          </template>
          {{ $t('delete') }}
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog
      v-model="enableEdit"
      content-class="sh-0"
      @click:outside="closeDialog"
    >
      <addAuthorCmp
        :mode="'edit'"
        :data="edittingItem"
        @editAuthor="editAuthor"
      />
    </v-dialog>

    <notifMessage
      v-if="successNotif"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
      :type="'success'"
    />
    <v-dialog v-model="enableDelete" max-width="500px">
      <promptDialog
        :title="'deleteAuthor'"
        :message="'RUSureUWantToDeletThisAuthor'"
        :data="deletingItem"
        @accept="acceptDelete"
        @reject="closeDelete"
      />
    </v-dialog>
  </div>
</template>

<script>
import notifMessage from '../structure/notifMessage.vue';
import addAuthorCmp from './addAuthorCmp.vue';
import promptDialog from '../structure/promptDialog.vue';
import tableHeaderCell from '../structure/tableHeaderCell.vue';

export default {
  name: 'authorTable',
  components: {
    notifMessage,
    addAuthorCmp,
    promptDialog,
    tableHeaderCell,
  },
  props: {
    headers: { type: Array },
    tableData: { type: Array },
    totalData: { type: Number },
    loading: { type: Boolean },
    options: {
      type: Object,
      default: () => ({
        descending: false,
        page: 1,
        limit: 10,
      }),
    },
  },
  data() {
    return {
      innerOptions: this.options,
      successNotif: false,
      // edit
      enableEdit: false,
      edittingItem: {},
      // delete
      enableDelete: false,
      deletingItem: {},
      // fiter
      statusItems: [
        { text: 'active', value: true },
        {
          text: 'inactive',
          value: false,
        },
      ],
      filter: {},
    };
  },
  methods: {
    addAuthor() {
      this.$router.push({
        name: 'addAuthor',
      });
    },
    hideNotif() {
      this.successNotif = false;
    },
    editRecord(item) {
      this.edittingItem = item;
      this.enableEdit = true;
    },
    editAuthor() {
      this.enableEdit = false;
      this.successNotif = true;
      this.reloadTable();
    },
    // methods for preview
    preview(item) {
      this.enablePreview = true;
      this.previewItem = item;
    },
    // methods for delete notif
    deleteRecord(item) {
      this.deletingItem = item;
      this.enableDelete = true;
    },
    acceptDelete(value) {
      console.log(`deleted ${value.name}`);
      this.$axios
        .delete(`/v1/api/tabaadol-e-ketaab/author/${value.id}`)
        .then(res => {
          if (res.status === 200) {
            this.reloadTable();
            this.successNotif = true;
            this.closeDelete();
          }
        });
    },
    closeDelete() {
      this.enableDelete = false;
      this.deletingItem = {};
    },
    closeDialog() {
      this.enableEdit = false;
      this.reloadTable();
    },
    // sort funcs
    sort() {
      console.log('sorted');
    },

    excelFile() {
      // getData as excel file with filtered included
    },
    printData() {
      // go to print page of this table
      const routeData = this.$router.resolve({
        name: 'printAuthors',
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
    enablePreview(newVal) {
      if (newVal === false) {
        this.previewItem = {};
      }
    },
  },
};
</script>
