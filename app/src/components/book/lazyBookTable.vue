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
    <div class="teal py-2 px-4  d-flex justify-space-between" flat height="48">
      <div>
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
      </div>

      <span class="white--text ">
        <span>
          تعداد رکوردهای یافت شده :
        </span>
        {{ totalData }}
      </span>
    </div>

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
          <tableHeaderCell
            :data="h"
            :items="h.text === 'status' ? status : []"
            @filterCol="filterCol"
            @filterColRange="filterColRange"
            :editData="options.filter ? options.filter : {}"
          />
        </th>
      </thead>
      <tbody v-if="tableData.length > 0">
        <tr v-for="item in tableData" :key="item.index">
          <td>
            {{ item.name }}
          </td>
          <td>
            <span v-if="item.createdAt">
              {{ new Date(item.createdAt).toLocaleDateString('fa') }}
            </span>
          </td>
          <td>
            {{ item.category.title }}
          </td>
          <td>
            {{ $t(item.status) }}
          </td>
          <td class="tag">
            <template v-for="tag in item.tags">
              <p class="pb-2 ma-0 " :key="tag.id">
                <span> {{ tag.title }} </span>
              </p>
            </template>
          </td>
          <td>
            <span v-if="item.undergraduatePrice">
              {{ moneyFormat(item.undergraduatePrice) }}
            </span>
          </td>
          <td>
            <span v-if="item.afterDiscount" class="d-block ltr">
              {{ moneyFormat(item.afterDiscount) }}
            </span>
          </td>

          <td>
            <span v-if="item.confirmDate.length > 0">
              {{ new Date(item.confirmDate).toLocaleDateString('fa') }}
            </span>
          </td>
          <td>
            <span v-if="item.soldDate.length > 0">
              {{ new Date(item.soldDate).toLocaleDateString('fa') }}
            </span>
          </td>
          <td v-if="$store.state.bookShop.userInfo.role !== 'CLIENT'">
            {{ item.seller.firstName }}
            {{ item.seller.lastName }}
          </td>
          <td v-if="$store.state.bookShop.userInfo.role !== 'CLIENT'">
            <span class="numberDir ">
              {{ item.seller.mobile }}
            </span>
          </td>
          <td v-if="$store.state.bookShop.userInfo.role !== 'CLIENT'">
            <span v-if="item.confirmedBy">
              {{ item.confirmedBy.firstName }}
              {{ item.confirmedBy.lastName }}
            </span>
          </td>
          <td v-if="$store.state.bookShop.userInfo.role !== 'CLIENT'">
            <span>
              {{ item.number }}
            </span>
          </td>
          <td v-if="$store.state.bookShop.userInfo.role !== 'CLIENT'">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon @click="printBarCode(item)" v-bind="attrs" v-on="on"
                  >mdi-barcode-scan</v-icon
                >
              </template>
              {{ $t('barcodePrint') }}
            </v-tooltip>
          </td>
          <td>
            <div class="d-flex">
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
                    @click="editRecord(item)"
                    v-on="on"
                    v-bind="attrs"
                    :disabled="
                      $store.state.bookShop.userInfo.role === 'CLIENT' &&
                        item.status !== 'CLIENTREGISTER'
                    "
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
                    :disabled="
                      ($store.state.bookShop.userInfo.role === 'CLIENT' &&
                        item.status !== 'CLIENTREGISTER') ||
                        ($store.state.bookShop.userInfo.role !== 'CLIENT' &&
                          !$store.state.bookShop.userInfo.role.d_book)
                    "
                  >
                    mdi-delete
                  </v-icon>
                </template>
                {{ $t('delete') }}
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
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'lazyBookTable',
  components: {
    tableHeaderCell,
    notifMessage,
    promptDialog,
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
  mixins: [moneyFormat],

  data() {
    return {
      innerOptions: this.options,
      loadingMore: false,
      enableLoadingMore: false,
      successNotif: false,
      // delete
      enableDelete: false,
      deletingItem: {},
      status: [
        { text: 'CLIENTREGISTER', value: 'CLIENTREGISTER' },
        { text: 'RECEIVED', value: 'RECEIVED' },
        { text: 'CONFIRMED', value: 'CONFIRMED' },
        { text: 'SOLD', value: 'SOLD' },
      ],
      filter: {},
      uploadMoreBut: 'uploadeMore',
      // error
      error: false,
      errorMsg: '',
    };
  },
  methods: {
    addRequestedBook() {
      this.$router.push({
        name: 'addBook',
      });
    },
    editRecord(item) {
      this.$router.push({
        path: `/booksList/${item.id}`,
      });
    },

    excelFile() {
      // getData as excel file with filtered included
      const pagination = this.options;
      const excelData = Object.assign(pagination, {
        filter: this.filter,
      });
      console.log(excelData);
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
    filterColRange(value, first, second) {
      this.filter[first] = value[first];
      this.filter[second] = value[second];

      this.onRequest({
        options: this.innerOptions,
      });
    },
    onRequest(props) {
      props.filter = this.filter;
      this.innerOptions = props.options;
      this.$emit('getData', props);
    },
    // printData() {
    //   // go to print page of this table
    //   const routeData = this.$router.resolve({
    //     name: 'printBooks',
    //   });
    //   window.open(routeData.href, '_blank');
    // },
    preview(item) {
      this.$router.push({
        path: `/books/${item.id}`,
      });
    },
    printBarCode(value) {
      console.log('inja');
      const routeData = this.$router.resolve({
        path: `/print/barcode/${value.id}`,
      });
      window.open(routeData.href, '_blank');
    },
    // methods for delete notif
    deleteRecord(item) {
      this.deletingItem = item;
      this.enableDelete = true;
    },
    acceptDelete(value) {
      this.$axios
        .delete(`/v1/api/tabaadol-e-ketaab/book/${value.id}`)
        .then(res => {
          if (res.status === 200) {
            this.reloadTable();
            this.successNotif = true;
            this.closeDelete();
          }
        })
        .catch(e => {
          if (e.response.status === 403) {
            this.error = true;
            this.errorMsg = 'permissionDenied';
            this.closeDelete();
          }
          if (e.response.status === 412) {
            this.error = true;
            this.errorMsg = 'thisBookCanNotBeDeleted';
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
    hideError() {
      this.error = false;
    },
    getMoreData() {
      this.loadingMore = true;
      this.enableLoadingMore = true;
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/books/list', {
          params: {
            offset: this.tableData.length,
            limit: this.innerOptions.limit,
            filter: this.filter,
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
<style lang="scss">
.tag {
  p {
    border-bottom: 1px solid #ddd;
    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>
