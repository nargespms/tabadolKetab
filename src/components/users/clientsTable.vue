<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="tableData"
      :options.sync="innerOptions"
      update:options
      :server-items-length="totalData"
      :loading="loading"
      class="elevation-1 text-center ma-4"
      hide-default-header
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
        </v-toolbar>
      </template>

      <template v-slot:header="{ props: { headers } }">
        <thead class="tableDataHead grey lighten-2">
          <tr>
            <th class="text-center" v-for="h in headers" :key="h.index">
              <v-icon v-if="h.sortable" :key="h.index" color="grey" @click="sort">
                mdi-menu-down
              </v-icon>
              {{ $t(h.text) }}
              <v-icon
                v-if="h.filterable"
                color="grey"
                size="11"
                class="pa-2"
                @click="filter"
                >fas fa-filter</v-icon
              >
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:[`item.operation`]="{ item }">
        <v-icon color="grey darken-3" @click="deleteRecord(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="enableDelete" max-width="500px">
      <promptDialog
        :title="'deleteUser'"
        :message="'RUSureUWantToDeletThisUser'"
        :data="deletingItem"
        @accept="acceptDelete"
        @reject="closeDelete"
      />
    </v-dialog>
    <successNotif
      v-if="deleteSuccess"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
    />
  </div>
</template>

<script>
import promptDialog from '../structure/promptDialog.vue';
import successNotif from '../structure/successNotif.vue';

export default {
  name: 'clientsTable',
  components: { promptDialog, successNotif },

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
      innerOptions: this.options,
      enableDelete: false,
      deletingItem: {},
      deleteSuccess: false,
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
      console.log(`deleted ${value.name}`);
      this.deleteSuccess = true;

      this.closeDelete();
    },
    closeDelete() {
      this.enableDelete = false;
      this.deletingItem = {};
    },
    hideNotif() {
      this.deleteSuccess = false;
    },
     // sort funcs
    sort(){
      console.log('sorted');
    },
    // filter
    filter(){
      console.log('filtered');
    }
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
