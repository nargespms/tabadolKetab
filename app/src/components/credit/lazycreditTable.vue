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
            <v-icon color="white" @click="addCredit" v-bind="attrs" v-on="on"
              >mdi-credit-card-plus
            </v-icon>
          </template>
          <span>{{ $t('increaseCredit') }}</span>
        </v-tooltip>
        <span class="pr-4 font-weight-medium white--text">
          {{ $t('transactionsList') }}
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
            @filterCol="filterCol"
            :items="h.text === 'paidWay' ? paidMethod : []"
          />
        </th>
      </thead>
      <tbody v-if="tableData.length > 0">
        <tr v-for="item in tableData" :key="item.index">
          <td>
            {{ item.number }}
          </td>
          <td>
            {{ new Date(item.createdAt).toLocaleDateString('fa') }}
          </td>
          <td v-if="$store.state.bookShop.userInfo.role !== 'CLIENT'">
            <span v-if="item.client">
              {{ item.client.firstName }}
              {{ item.client.lastName }}
            </span>
          </td>
          <td>
            <span
              :class="item.total > 0 ? 'success--text' : 'error--text'"
              class="numberDir"
            >
              <span>
                {{ moneyFormat(item.total) }}
                <span class="float-left pr-2">
                  {{ $t('rial') }}
                </span>
              </span>
            </span>
          </td>
          <td v-if="$store.state.bookShop.userInfo.role !== 'CLIENT'">
            <span v-if="item.staff">
              {{ item.staff.firstName }}
              {{ item.staff.lastName }}
            </span>
          </td>
          <td>
            <span v-if="item.paymentId">
              {{ item.paymentId }}
            </span>
          </td>
          <td>
            {{ $t(item.paidWay) }}
          </td>
          <td>
            {{ item.description }}
          </td>
        </tr>
      </tbody>
      <tbody v-if="tableData.length === 0">
        <td :colspan="headers.length" class=" pa-4 ma-auto ">
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
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'lazycreditTable',
  mixins: [moneyFormat],

  components: {
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
      isLoading: true,
      loadingMore: false,
      enableLoadingMore: false,
      successNotif: false,
      filter: {},
      uploadMoreBut: 'uploadeMore',
      paidMethod: [
        { text: 'CASH', value: 'CASH' },
        { text: 'CARD', value: 'CARD' },
        { text: 'POZ', value: 'POZ' },
        { text: 'GIFT', value: 'GIFT' },
      ],
    };
  },
  methods: {
    addCredit() {
      this.$router.push({
        name: 'increaseCredit',
      });
    },
    hideNotif() {
      this.successNotif = false;
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
    //     name: 'printCredit',
    //   });
    //   window.open(routeData.href, '_blank');
    // },

    getMoreData() {
      this.loadingMore = true;
      this.enableLoadingMore = true;
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/transactions/list', {
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
};
</script>
