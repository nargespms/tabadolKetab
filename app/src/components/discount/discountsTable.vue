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
      hide-default-header
      hide-default-footer
      :loading="loading"
      class="elevation-1 text-center ma-4 clear"
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
                  @click="addDiscount"
                  v-bind="attrs"
                  v-on="on"
                  >mdi-ticket-percent
                </v-icon>
              </template>
              <span>{{ $t('addDiscount') }}</span>
            </v-tooltip>
            <span class="pr-4 font-weight-medium white--text">
              {{ $t('categoryDiscountsList') }}
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
      <template v-slot:[`item.expireDate`]="{ item }">
        {{ new Date(item.expireDate).toLocaleDateString('fa') }}
      </template>

      <template v-slot:[`item.categoryId`]="{ item }">
        {{ item.category.title }}
      </template>

      <template v-slot:[`item.percent`]="{ item }">
        {{ item.percent }} %
      </template>

      <template v-slot:[`item.operation`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              medium
              class="ma-2"
              v-bind="attrs"
              v-on="on"
              @click="preview(item)"
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
    <v-dialog v-model="enablePreview" content-class="sh-0">
      <showDiscount :item="previewItem" />
    </v-dialog>
    <v-dialog v-model="enableDelete" max-width="500px">
      <promptDialog
        :title="'deleteDiscount'"
        :message="'RUSureUWantToDeletThisdiscount'"
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
import notifMessage from '../structure/notifMessage.vue';
import promptDialog from '../structure/promptDialog.vue';
import showDiscount from './showDiscount.vue';
import tableHeaderCell from '../structure/tableHeaderCell.vue';

export default {
  name: 'discountsTable',
  components: {
    notifMessage,
    promptDialog,
    showDiscount,
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
  },
  data() {
    return {
      innerOptions: { ...this.options },
      // delete
      enableDelete: false,
      deletingItem: {},
      successNotif: false,
      // preview
      enablePreview: false,
      previewItem: {},
      filter: {},
    };
  },
  methods: {
    addDiscount() {
      this.$router.push({
        name: 'addDiscount',
      });
    },
    // methods for delete notif
    deleteRecord(item) {
      this.deletingItem = item;
      this.enableDelete = true;
    },
    acceptDelete(value) {
      this.$axios
        .delete(`/v1/api/tabaadol-e-ketaab/category-discount/${value.id}`)
        .then(res => {
          if (res.status === 200) {
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
    // methods for preview
    preview(item) {
      this.enablePreview = true;
      this.previewItem = item;
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
    //     name: 'printDiscounts',
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
