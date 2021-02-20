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
      <span class="pl-4">
        {{ $t('status') }} :
        <span v-for="s in status" :key="s.index"> {{ $t(s) }}, </span>
      </span>
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
              <v-icon
                color="white"
                @click="addRequestedBook"
                v-bind="attrs"
                v-on="on"
                >mdi-book-open-variant
              </v-icon>
            </template>
            <span>{{ $t('addBook') }}</span>
          </v-tooltip>
          <span class="pr-4 font-weight-medium white--text">
            {{ $t('booksList') }}
          </span>
        </v-toolbar>
      </template>

      <template v-slot:header="{ props: { headers } }">
        <thead class="tableDataHead grey lighten-2">
          <tr>
            <th class="text-center" v-for="h in headers" :key="h.index">
              <v-icon
                v-if="h.sortable"
                :key="h.index"
                color="grey"
                @click="sort"
              >
                mdi-menu-down
              </v-icon>
              {{ $t(h.text) }}
              <v-icon
                v-if="h.filterable"
                color="grey"
                size="11"
                class="pa-2"
                @click="filter"
                >fas fa-filter
              </v-icon>
              <span class="fn-25">
                {{ h.icon }}
              </span>
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:[`item.barcode`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon @click="printBarCode(item)" v-bind="attrs" v-on="on"
              >mdi-barcode-scan</v-icon
            >
          </template>
          {{ $t('barcodePrint') }}
        </v-tooltip>
      </template>
      <template v-slot:[`item.operation`]="{ item }">
        <div class="d-flex">
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
                color="grey darken-3"
                @click="deleteRecord(item)"
                v-bind="attrs"
                v-on="on"
              >
                mdi-delete
              </v-icon>
            </template>
            {{ $t('delete') }}
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="enablePreview" content-class="sh-0">
      <showBook :item="previewItem" />
    </v-dialog>
    <v-dialog v-model="enableDelete" max-width="500px">
      <promptDialog
        :title="'deleteBook'"
        :message="'RUSureUWantToDeletThisBook'"
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
import showBook from './showBook.vue';
import notifMessage from '../structure/notifMessage.vue';
import promptDialog from '../structure/promptDialog.vue';

export default {
  name: 'booksTable',
  components: {
    showBook,
    notifMessage,
    promptDialog,
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
      // delete
      enableDelete: false,
      deletingItem: {},
      status: ['CLIENTREGISTER', 'RECEIVED', 'CONFIRMED', 'SOLD'],
    };
  },
  methods: {
    addRequestedBook() {
      this.$router.push({
        name: 'addBook',
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
    // methods for preview
    preview(item) {
      this.enablePreview = true;
      this.previewItem = item;
    },

    hideNotif() {
      this.successNotif = false;
    },

    printData() {
      // go to print page of this table
      const routeData = this.$router.resolve({
        name: 'printBooks',
      });
      window.open(routeData.href, '_blank');
    },
    printBarCode(value) {
      const routeData = this.$router.resolve({
        path: `/print/barcode/${value.id}`,
      });
      window.open(routeData.href, '_blank');
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
