<template>
  <div>
    <div class="d-flex flex-row-reverse my-4">
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
    <v-toolbar color="teal " flat height="48">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="white" @click="addDiscount" v-bind="attrs" v-on="on"
            >mdi-ticket-percent
          </v-icon>
        </template>
        <span>{{ $t('addDiscount') }}</span>
      </v-tooltip>
      <span class="pr-4 font-weight-medium white--text">
        {{ $t('couponList') }}
      </span>
    </v-toolbar>

    <table
      class="generalTable "
      :class="
        $vuetify.breakpoint.xl
          ? ''
          : $vuetify.breakpoint.lg
          ? ''
          : 'tableMobileScroll'
      "
    >
      <thead class="grey lighten-2">
        <th class="text-center" v-for="h in headers" :key="h.index">
          <tableHeaderCell :data="h" @filterCol="filterCol" />
        </th>
      </thead>
      <tbody v-if="tableData.length > 0">
        <tr v-for="item in tableData" :key="item.index">
          <td>
            {{ item.title }}
          </td>
          <td>
            {{ new Date(item.createdAt).toLocaleDateString('fa') }}
          </td>
          <td>{{ item.percent }} %</td>
          <td>
            {{ item.description }}
          </td>
          <td>
            <div>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    medium
                    class="ma-2"
                    v-bind="attrs"
                    @click="preview(item)"
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
                    v-on="on"
                    v-bind="attrs"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                {{ $t('delete') }}
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    medium
                    class="ma-2"
                    color="grey darken-3"
                    v-on="on"
                    v-bind="attrs"
                    @click="excelDownloadRecord(item)"
                  >
                    mdi-download
                  </v-icon>
                </template>
                {{ $t('excelDl') }}
              </v-tooltip>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-if="tableData.length === 0">
        <td colspan="11" class=" pa-4 ma-auto ">
          <span class="text-center">
            {{ $t('noResultsText') }}
          </span>
        </td>
      </tbody>
    </table>
    <div class="d-flex justify-center">
      <v-btn
        class="ma-2 d-flex"
        :loading="loadingMore"
        :disabled="enableLoadingMore"
        color="teal white--text"
        @click="getMoreData"
      >
        {{ $t(uploadMoreBut) }}
      </v-btn>
    </div>

    <v-dialog v-model="enableDelete" max-width="500px">
      <promptDialog
        :title="'deleteCoupon'"
        :message="'RUSureUWantToDeletThisCoupon'"
        :data="deletingItem"
        @accept="acceptDelete"
        @reject="closeDelete"
      />
    </v-dialog>
    <v-dialog v-model="enablePreview" content-class="sh-0">
      <showDiscount :item="previewItem" />
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
import tableHeaderCell from '../structure/tableHeaderCell.vue';
import notifMessage from '../structure/notifMessage.vue';
import promptDialog from '../structure/promptDialog.vue';
import showDiscount from './showDiscount.vue';

export default {
  name: 'lazyCouponTable',

  components: {
    tableHeaderCell,
    notifMessage,
    promptDialog,
    showDiscount,
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
        limit: 20,
      }),
    },
  },
  data() {
    return {
      innerOptions: this.options,
      loadingMore: false,
      enableLoadingMore: false,
      successNotif: false,
      // delete
      enableDelete: false,
      deletingItem: {},

      filter: {},
      uploadMoreBut: 'uploadeMore',
      // error
      error: false,
      errorMsg: '',
      // preview
      enablePreview: false,
      previewItem: {},
    };
  },
  methods: {
    addDiscount() {
      this.$router.push({
        name: 'addDiscount',
      });
    },
    excelFile() {
      console.log('excel');
      // getData as excel file with filtered included
    },
    // excel download
    excelDownloadRecord(item) {
      console.log(item);
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
      });
    },
    onRequest(props) {
      props.filter = this.filter;
      this.innerOptions = props.options;
      this.$emit('getData', props);
    },
    // methods for preview
    preview(item) {
      this.enablePreview = true;
      this.previewItem = item;
    },
    // printData() {
    //   // go to print page of this table
    //   const routeData = this.$router.resolve({
    //     name: 'printBooks',
    //   });
    //   window.open(routeData.href, '_blank');
    // },
    // methods for delete notif
    deleteRecord(item) {
      this.deletingItem = item;
      this.enableDelete = true;
    },
    acceptDelete(value) {
      this.$axios
        .delete(`/v1/api/tabaadol-e-ketaab/coupon/${value.id}`)
        .then(res => {
          if (res.status === 200) {
            this.successNotif = true;
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
      this.successNotif = false;
    },
    hideError() {
      this.error = false;
    },
    getMoreData() {
      this.loadingMore = true;
      this.enableLoadingMore = true;
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/coupon/list', {
          params: {
            offset: this.tableData.length,
            limit: this.innerOptions.limit,
          },
        })
        .then(res => {
          if (res.status === 200) {
            if (res.data.result.docs.length > 0) {
              this.tableData.push(...res.data.result.docs);
              this.enableLoadingMore = false;
            } else {
              this.uploadMoreBut = 'endOfList';
              this.enableLoadingMore = true;
            }
            this.loadingMore = false;
          }
        });
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
