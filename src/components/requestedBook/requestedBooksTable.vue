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
              <v-icon
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
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:[`item.operation`]="{ item }">
        <v-icon medium class="ma-2" @click="preview(item)">
          mdi-eye
        </v-icon>
        <v-icon medium class="ma-2" @click="changeStatusEnable(item)"
          >mdi-book-open
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="enablePreview" content-class="sh-0">
      <showRequestedBook :item="previewItem" />
    </v-dialog>
    <v-dialog v-model="enableStatusChange" max-width="500px">
      <multipleChoiseDialog
        :title="'changeStatus'"
        :message="
          `${$t('chooseRequestedBookStatus')}\n${$t('bookNumber')}:${
            changingStatusItem.id
          }`
        "
        :data="changingStatusItem"
        :buttons="changeStatusButs"
        @changeStatus="changeStatus"
      />
    </v-dialog>
    <successNotif
      v-if="successNotif"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
    />
  </div>
</template>

<script>
import showRequestedBook from './showRequestedBook.vue';
import multipleChoiseDialog from '../structure/multipleChoiseDialog.vue';
import successNotif from '../structure/successNotif.vue';

export default {
  name: 'requestedBooksTable',
  components: {
    showRequestedBook,
    multipleChoiseDialog,
    successNotif,
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
          name: 'inprogress',
          color: 'purple',
        },
        {
          name: 'available',
          color: 'green',
        },
        {
          name: 'unavailable',
          color: 'red',
        },
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
      this.enableStatusChange = false;
      this.changingStatusItem = {};
      this.successNotif = true;
    },
    hideNotif() {
      this.successNotif = false;
    },
    // sort funcs
    sort() {
      console.log('sorted');
    },
    // filter
    filter() {
      console.log('filtered');
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
