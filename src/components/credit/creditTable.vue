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
    >
      <template v-slot:top>
        <v-toolbar color="teal " flat height="48">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="white" @click="addCredit" v-bind="attrs" v-on="on"
                >mdi-credit-card-plus
              </v-icon>
            </template>
            <span>{{ $t('addCredit') }}</span>
          </v-tooltip>
          <span class="pr-4 font-weight-medium white--text">
            {{ $t('creditList') }}
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
      <template v-slot:[`item.title`]="{ item }">
        {{ item.title }}
      </template>
      <template v-slot:[`item.operation`]="{ item }">
        <v-icon medium class="ma-2" @click="preview(item)">
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="enablePreview" content-class="sh-0">
      <showCredit :item="previewItem" />
    </v-dialog>

    <successNotif
      v-if="successNotif"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
    />
  </div>
</template>

<script>
import successNotif from '../structure/successNotif.vue';
import showCredit from './showCredit.vue';

export default {
  name: 'ticketsTable',
  components: {
    successNotif,
    showCredit,
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
    };
  },
  methods: {
    addCredit() {
      this.$router.push({
        name: 'addCredit',
      });
    },

    hideNotif() {
      this.successNotif = false;
    },
    // methods for preview
    preview(item) {
      this.enablePreview = true;
      this.previewItem = item;
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
        name: 'printCredit',
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
