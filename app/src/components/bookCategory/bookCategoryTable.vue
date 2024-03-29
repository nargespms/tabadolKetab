<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="tableData"
      :loading="loading"
      class="elevation-1 text-center ma-4 clear"
      :loading-text="$t('loadingText')"
      :no-data-text="$t('Nodataavailable')"
      :options.sync="innerOptions"
      :server-items-length="totalData"
      hide-default-header
      hide-default-footer
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
                  @click="addBookCategory"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-tag-plus
                </v-icon>
              </template>
              <span>{{ $t('AddBookCategory') }}</span>
            </v-tooltip>
            <span class="pr-4 font-weight-medium white--text">
              {{ $t('BookCategoryList') }}
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

      <template v-slot:[`item.active`]="{ item }">
        <span v-if="item.active">
          <v-icon color="success" class="pa-2"
            >mdi-checkbox-marked-circle-outline
          </v-icon>
          {{ $t('active') }}
        </span>
        <span v-else>
          <v-icon color="error" class="pa-2">
            mdi-minus-circle-outline
          </v-icon>
          {{ $t('inactive') }}
        </span>
      </template>

      <template v-slot:[`item.operation`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              medium
              class="ml-3"
              @click="editRecord(item)"
              v-bind="attrs"
              v-on="on"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>{{ $t('edit') }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              medium
              color="grey darken-3"
              @click="deleteRecord(item)"
              v-bind="attrs"
              v-on="on"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>{{ $t('delete') }}</span>
        </v-tooltip>
      </template>
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
    <v-dialog v-model="enableDelete" max-width="500px">
      <promptDialog
        :title="'deleteBookCategory'"
        :message="'RUSureUWantToDeletThisBookCategory'"
        :data="deletingItem"
        @accept="acceptDelete"
        @reject="closeDelete"
      />
    </v-dialog>
    <v-dialog v-model="enableEdit" content-class="sh-0">
      <addBookCategory
        :mode="'edit'"
        :data="edittingItem"
        @savedSuccessfully="editBookSuccess"
        @closeModal="closeModal"
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
import addBookCategory from './addBookCategory.vue';
import tableHeaderCell from '../structure/tableHeaderCell.vue';

export default {
  name: 'bookCategoryTable',
  components: {
    promptDialog,
    notifMessage,
    addBookCategory,
    tableHeaderCell,
  },
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

      // delete
      enableDelete: false,
      deletingItem: {},
      successNotif: false,
      // edit
      enableEdit: false,
      edittingItem: {},
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
    // methods for delete notif
    deleteRecord(item) {
      this.deletingItem = item;
      this.enableDelete = true;
    },
    acceptDelete(value) {
      this.$axios
        .delete(`/v1/api/tabaadol-e-ketaab/category/${value.id}`)
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
    hideNotif() {
      this.successNotif = false;
    },
    // methods for edit items
    editRecord(item) {
      console.log(item);
      this.enableEdit = true;
      this.edittingItem = item;
    },
    editBookSuccess() {
      this.reloadTable();
      this.enableEdit = false;
      this.successNotif = true;
      this.edittingItem = {};
    },
    closeModal() {
      this.enableEdit = false;
    },
    // add
    addBookCategory() {
      this.$router.push({
        name: 'addBookCat',
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
      console.log('111');
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
