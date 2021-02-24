<template>
  <div>
    <v-toolbar color="teal " flat height="48">
      <span class="pr-4 font-weight-medium white--text">
        {{ $t('logsList') }}
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
        <th v-for="h in headers" :key="h.index">
          <tableHeaderCell :data="h" @filterCol="filterCol" />
        </th>
      </thead>
      <tbody v-if="tableData.length > 0">
        <tr v-for="item in tableData" :key="item.index">
          <td>
            {{ $t(item.action) }}
          </td>
          <td>
            {{ $t(item.appModule) }}
          </td>
          <td>
            <span
              v-if="item.code === '200' || item.code === '204'"
              class="http200"
            >
              {{ item.code }}
            </span>
            <span
              v-if="
                item.code === '400' ||
                  item.code === '404' ||
                  item.code === '406' ||
                  item.code === '412' ||
                  item.code === '403' ||
                  item.code === '422' ||
                  item.code === '409'
              "
              class="http400"
            >
              {{ item.code }}
            </span>
          </td>
          <td>
            {{ new Date(item.createdAt).toLocaleDateString('fa') }}
          </td>
          <td>
            {{ item.user.firstName }}
            {{ item.user.lastName }}
          </td>
          <td>
            {{ item.ip }}
          </td>
          <td>
            {{ item.ua }}
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
  </div>
</template>

<script>
import tableHeaderCell from '../structure/tableHeaderCell.vue';

export default {
  name: 'lazyLogTable',
  components: {
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
        limit: 10,
      }),
    },
  },
  data() {
    return {
      innerOptions: this.options,
      loadingMore: false,
      enableLoadingMore: false,
      filter: {},
      uploadMoreBut: 'uploadeMore',
      isLoading: true,
    };
  },
  methods: {
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

    getMoreData() {
      this.loadingMore = true;
      this.enableLoadingMore = true;
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/log/list', {
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
  },
};
</script>
<style lang="scss">
.generalTable {
  border: thin solid rgba(0, 0, 0, 0.12);
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 8px;
  th,
  td {
    border: thin solid rgba(0, 0, 0, 0.12);
    font-weight: normal;
    text-align: center;
    padding: 8px;
  }
}
.tableMobileScroll {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}
.http200 {
  background-color: #43a047;
  border-radius: 2px;
  padding: 0px 8px;
}
.http400 {
  background-color: #d50000;
  border-radius: 2px;
  padding: 0px 8px;
}
.http300 {
  background-color: #f57c00;
  border-radius: 2px;
  padding: 0px 8px;
}
</style>
