<template>
  <div>
    <div class="d-flex flex-row-reverse my-4">
      <v-btn class="white--text" color="green" @click="excelFile">{{
        $t('filteredFileDl')
      }}</v-btn>
    </div>
    <v-toolbar color="teal " flat height="48">
      <span class="pr-4 font-weight-medium white--text">
        {{ $t('tradesList') }}
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
          <tableHeaderCell
            :data="h"
            @filterCol="filterCol"
            :editData="options.filter ? options.filter : {}"
          />
        </th>
      </thead>
      <tbody v-if="tableData.length > 0">
        <tr v-for="item in tableData" :key="item.index">
          <td>
            {{ new Date(item.createdAt).toLocaleDateString('fa') }}
          </td>
          <td>{{ moneyFormat(item.wage) }}{{ $t('rial') }}</td>
          <td>
            {{ item.seller.firstName }}
            {{ item.seller.lastName }}
          </td>
          <td>
            {{ item.buyer.firstName }}
            {{ item.buyer.lastName }}
          </td>
          <td>{{ moneyFormat(item.total) }}{{ $t('rial') }}</td>
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
  </div>
</template>

<script>
import tableHeaderCell from '../structure/tableHeaderCell.vue';
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'lazyTradesTable',

  components: {
    tableHeaderCell,
  },
  mixins: [moneyFormat],

  props: {
    headers: { type: Array },
    tableData: { type: Array },
    options: {
      type: Object,
      default: () => ({
        descending: false,
        page: 1,
        limit: 10,
      }),
    },
    totalData: { type: Number },
    loading: { type: Boolean },
  },
  data() {
    return {
      innerOptions: this.options,
      loadingMore: false,
      enableLoadingMore: false,
      filter: {},
      uploadMoreBut: 'uploadeMore',
    };
  },
  methods: {
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
        tableSearch: this.tableSearch,
      });
    },
    onRequest(props) {
      props.filter = this.filter;
      this.innerOptions = props.options;
      this.$emit('getData', props);
    },
    getMoreData() {
      this.loadingMore = true;
      this.enableLoadingMore = true;
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/trade/list', {
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
};
</script>
