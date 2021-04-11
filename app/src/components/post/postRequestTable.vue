<template>
  <div>
    <v-row class="px-2 justify-end">
      <v-col cols="12" md="4" align="center" class="pa-0">
        <div class="d-flex flex-row-reverse  pa-2">
          <v-btn
            color="green"
            class="white--text"
            @click="addressModal"
            :disabled="request.length < 1"
            >{{ $t('bookSendReq') }}</v-btn
          >
          <div v-if="request.length < 1" class="warnReq ml-3">
            <v-icon color="red"> fas fa-exclamation-triangle </v-icon>
            {{ $t('chooseAtLeastOneBook') }}
          </div>
        </div>
      </v-col>
    </v-row>
    <v-toolbar color="teal " flat height="48">
      <v-icon color="white">fas fa-motorcycle</v-icon>
      <span class="pr-4 font-weight-medium white--text">
        {{ $t('bookSendReq') }}
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
          <td class="d-flex justify-center">
            <v-checkbox :value="item" v-model="request"></v-checkbox>
          </td>
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ new Date(item.createdAt).toLocaleDateString('fa') }}
          </td>
          <td>
            {{ item.category.title }}
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
      <v-btn
        color="green"
        class="white--text ma-2"
        @click="addressModal"
        :disabled="request.length < 1"
        >{{ $t('postRequest') }}</v-btn
      >
    </div>
    <v-dialog v-model="addressModalEnable" max-width="500px">
      <addressCmp
        @hideAddressList="hideAddressList"
        @setAddress="setAddress"
        state="list"
        :toolBar="true"
        :selective="true"
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
import tableHeaderCell from '../structure/tableHeaderCell.vue';
import addressCmp from '../address/addressCmp.vue';

export default {
  name: 'postRequestTable',
  components: {
    addressCmp,
    notifMessage,
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
        limit: 20,
      }),
    },
  },
  data() {
    return {
      innerOptions: this.options,
      loadingMore: false,
      enableLoadingMore: false,
      request: [],
      successNotif: false,
      addressModalEnable: false,
      filter: {},
      uploadMoreBut: 'uploadeMore',
      // error
      error: false,
      errorMsg: '',
      booksId: [],
      order: {},
    };
  },
  methods: {
    setAddress(value) {
      this.order.addressId = value.id;
      this.order.booksId = this.request.map(book => {
        return book.id;
      });
      this.$axios
        .post('/v1/api/tabaadol-e-ketaab/order', {
          ...this.order,
          type: 'SELL',
          delivery: 'TABADOL',
        })
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            this.successNotif = true;
            this.request = [];
            this.$router.push({
              name: 'ordersList',
            });
          }
        });
    },
    postRequest(item) {
      this.booksId.push(item.id);
    },
    hideNotif() {
      this.successNotif = false;
    },
    getMoreData() {
      this.loadingMore = true;
      this.enableLoadingMore = true;
      this.$axios
        .get(
          '/v1/api/tabaadol-e-ketaab/books/list?filter[status]=CLIENTREGISTER',
          {
            params: {
              offset: this.tableData.length,
              limit: this.innerOptions.limit,
            },
          }
        )
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
    addressModal() {
      this.addressModalEnable = true;
    },
    hideAddressList() {
      this.addressModalEnable = false;
      this.postRequest();
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
.generalTable {
  border: thin solid rgba(0, 0, 0, 0.12);
  width: 100%;

  border-collapse: collapse;
  margin-bottom: 8px;

  th {
    border: thin solid rgba(0, 0, 0, 0.12);
    font-weight: normal;
    text-align: center;
    padding: 8px;
  }
  td {
    border: thin solid rgba(0, 0, 0, 0.12);
    font-weight: normal;
    text-align: center;
    padding: 4px;
  }
}
.tableMobileScroll {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}
.warnReq {
  padding: 8px;
  border: 1px solid red;
  border-radius: 3px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
</style>
