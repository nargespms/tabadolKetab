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
      hide-default-header
      hide-default-footer
      :loading="loading"
      class="elevation-1 text-center ma-4 clear"
      :loading-text="$t('loadingText')"
      :no-data-text="$t('Nodataavailable')"
    >
      <template v-slot:top>
        <v-toolbar color="teal " flat height="48">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="white" @click="addClient" v-bind="attrs" v-on="on"
                >mdi-account-plus
              </v-icon>
            </template>
            <span>{{ $t('AddUser') }}</span>
          </v-tooltip>
          <span class="pr-4 font-weight-medium white--text">
            {{ $t('ClientsList') }}
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
                :items="h.text === 'status' ? statusItems : []"
                :editData="options.filter ? options.filter : {}"
              />
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:[`item.avatar`]="{ item }">
        <div class="pa-3 align-center">
          {{ item.avatar }}
          <v-avatar>
            <img
              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
              :alt="item.id"
            />
          </v-avatar>
        </div>
      </template>

      <template v-slot:[`item.createdAt`]="{ item }">
        {{ new Date(item.createdAt).toLocaleDateString('fa') }}
      </template>

      <template v-slot:[`item.mobile`]="{ item }">
        <span class="numberDir">
          {{ item.mobile }}
        </span>
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
              color="grey darken-3"
              @click="deleteRecord(item)"
              v-bind="attrs"
              v-on="on"
            >
              mdi-account-convert
            </v-icon>
          </template>
          {{ $t('changeStatus') }}
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
        :title="'changeStatus'"
        :message="'RUsureUwantChangeStatus'"
        :data="deletingItem"
        @accept="acceptDelete"
        @reject="closeDelete"
      />
    </v-dialog>
    <notifMessage
      v-if="deleteSuccess"
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

export default {
  name: 'clientsTable',
  components: { promptDialog, notifMessage, tableHeaderCell },

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
      innerOptions: { ...this.options },
      enableDelete: false,
      deletingItem: {},
      deleteSuccess: false,
      filter: {},
      // fiter
      statusItems: [
        { text: 'active', value: true },
        {
          text: 'inactive',
          value: false,
        },
      ],
    };
  },
  methods: {
    addClient() {
      this.$router.push({
        path: `/users/addUser`,
      });
    },
    // methods for delete notif
    deleteRecord(item) {
      this.deletingItem = item;
      this.enableDelete = true;
    },
    acceptDelete(value) {
      this.$axios
        .delete(`/v1/api/tabaadol-e-ketaab/client/${value.id}`)
        .then(res => {
          if (res.status === 200) {
            this.deleteSuccess = true;
            this.closeDelete();
            this.reloadTable();
          }
        });
    },
    closeDelete() {
      this.enableDelete = false;
      this.deletingItem = {};
    },
    hideNotif() {
      this.deleteSuccess = false;
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
        name: 'printClients',
      });
      window.open(routeData.href, '_blank');
    },
  },
  changePage(page) {
    this.$emit('getData', {
      filter: this.filter,
      options: { ...this.options, page },
    });
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
</style>
